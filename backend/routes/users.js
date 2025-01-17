const { initializeApp, cert } = require('firebase-admin/app');
const { getAuth } = require('firebase-admin/auth');
const express = require("express");
const router = express.Router();

const serviceAccount = require('../admin.json')

initializeApp({
    credential: cert(serviceAccount)
})

router.get("/", async (req, res) => {
    const listAllUsers = (nextPageToken) => {
        // List batch of users, 1000 at a time.
        getAuth()
            .listUsers(1000, nextPageToken)
            .then((listUsersResult) => {
                const users = [];  // Array to hold users' email and displayName

                listUsersResult.users.forEach((userRecord) => {
                    // Extract email and displayName
                    const userData = {
                        email: userRecord.email,
                        displayName: userRecord.displayName
                    };
                    users.push(userData);  // Add to the users array
                });

                // If there are more users, fetch the next batch
                if (listUsersResult.pageToken) {
                    listAllUsers(listUsersResult.pageToken);
                } else {
                    // Send the list of users' email and display name as a response
                    res.json(users);
                }
            })
            .catch((error) => {
                console.log('Error listing users:', error);
                res.status(500).json({ error: 'Error fetching user data' });
            });
    };

    // Start listing users from the beginning, 1000 at a time
    listAllUsers();
});

module.exports = router;


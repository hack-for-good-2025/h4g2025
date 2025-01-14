const express = require('express');
const { db } = require('../firebase.js');
const { collection, query, where, getDocs, Timestamp } = require('firebase/firestore');
const router = express.Router();

// List upcoming meetings for a user
router.get('/:userId', async (req, res) => {
    try {
        const userId = req.params.userId;

        if (!userId) {
            return res.status(400).send({ message: 'Missing required userId parameter' });
        }

        const now = Timestamp.now();
        const meetingsQuery = query(
            collection(db, "meetings"),
            where("participants", "array-contains", userId),
            where("start_time", ">", now)
        );

        const snapshot = await getDocs(meetingsQuery);

        if (snapshot.empty) {
            return res.status(404).send({ message: 'No upcoming meetings found for this user' });
        }

        const upcomingMeetings = snapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
            created_at: doc.data().created_at.toDate(),
            start_time: doc.data().start_time.toDate(),
            end_time: doc.data().end_time.toDate(),
        }));

        res.send({ meetings: upcomingMeetings });
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve upcoming meetings', error: error.message });
    }
});

module.exports = router;

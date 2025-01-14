const express = require('express');
const { db } = require('../firebase.js')
const { collection, doc, addDoc, deleteDoc, getDoc, getDocs, updateDoc, serverTimestamp } = require('firebase/firestore'); 
const router = express.Router();

const convertTimestamp = (data) => {
    if (data.created_at) {
        data.created_at = data.created_at.toDate();
    }
    return data;
};

// Create a new meeting
router.post('/', async (req, res) => {
    try {
        const { title, description, start_time, end_time, organiser_id, participants } = req.body;

        if (!title || !start_time || !end_time || !organiser_id) {
            return res.status(400).send({ message: 'Missing required fields: title, start_time, end_time, or organiser_id' });
        }

        const newMeeting = {
            title,
            description: description || '',
            start_time,
            end_time,
            organiser_id,
            participants: participants || [],
            created_at: serverTimestamp()
        };
          
        const docRef = await addDoc(collection(db, "meetings"), newMeeting);
        res.status(201).send({ message: 'Meeting scheduled successfully', id: docRef.id });
    } catch (error) {
        res.status(500).send({ message: 'Failed to schedule meeting', error: error.message });
    }
});

// Retrieve all meetings
router.get('/', async (req, res) => {
    try {
        const snapshot = await getDocs(collection(db, "meetings"));
        const meetings = snapshot.docs.map(doc => {
            const data = convertTimestamp(doc.data());
            return { id: doc.id, ...data };
        });
        res.send({ meetings });
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve meetings', error: error.message });
    }
});

// Retrieve a meeting
router.get('/:id', async (req, res) => {
    try {
        const meetingId = req.params.id;
        const docSnapshot = await getDoc(doc(db, "meetings", meetingId));

        if (!docSnapshot.exists()) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
    
        const data = convertTimestamp(docSnapshot.data());
        res.send({ data })
    } catch (error) {
        res.status(500).send({ message: 'Failed to retrieve the meeting', error: error.message });
    }
});

// Update a meeting
router.put('/:id', async (req, res) => {
    try {
        const allowedFields = ['title', 'description', 'start_time', 'end_time', 'organiser_id', 'participants'];
        const filteredBody = Object.keys(req.body).reduce((filteredData, key) => {
            if (allowedFields.includes(key)) {
                filteredData[key] = req.body[key];
            }
            return filteredData;
        }, {});


        if (Object.keys(filteredBody).length === 0) {
            return res.status(400).send({ message: 'No valid fields to update' });
        }
        
        const meetingId = req.params.id;
        const docRef = doc(db, "meetings", meetingId);
        const docSnapshot = await getDoc(docRef);
        
        if (!docSnapshot.exists()) {
            return res.status(404).send({ message: 'Meeting not found' });
        }

        await updateDoc(docRef, filteredBody);
        res.send({ message: 'Meeting updated successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to update meeting', error: error.message });
    }
});

// Delete a meeting
router.delete('/:id', async (req, res) => {
    try {
        const meetingId = req.params.id;
        const docRef = doc(db, "meetings", meetingId);
        const docSnapshot = await getDoc(docRef);
        
        if (!docSnapshot.exists()) {
            return res.status(404).send({ message: 'Meeting not found' });
        }
    
        await deleteDoc(docRef)
        res.send({ message: 'Meeting deleted successfully' });
    } catch (error) {
        res.status(500).send({ message: 'Failed to delete meeting', error: error.message });
    }
});

module.exports = router;

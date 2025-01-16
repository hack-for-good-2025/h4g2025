const { db } = require('../firebase.js')
const { collection, doc, addDoc, deleteDoc, getDoc, getDocs, updateDoc, serverTimestamp } = require('firebase/firestore');
const Email = require("../utils/email");
const parseDateTime = require('./dateTime.js')

async function checkMeetings() {
    try {
      console.log("Checking for meetings")
      const meetingsSnapshot = await getDocs(collection(db, "meetings"));
      meetingsSnapshot.forEach(async (d) => {
        const meetingData = d.data();
        const meetingStartTime = parseDateTime(meetingData["start_time"]);
  
        // Calculate reminder time (15 minutes before meeting start time)
        const reminderTime = new Date(meetingStartTime.getTime() - 15 * 60 * 1000);
        const currentTime = new Date();

        // Check if the reminder time is within the next 5 minutes
        if (reminderTime <= currentTime && reminderTime > new Date(currentTime.getTime() - 5 * 60 * 1000)) {
          // If the reminder has not been sent yet, send it
          if (!meetingData["is_reminded"]) {
            if (meetingData.participants && meetingData.participants.length > 0) {
                const emailPromises = meetingData.participants.map(async (email) => {
                    // Extract name from email (before the '@')
                    const name = email.split('@')[0];
                    const emailInstance = new Email(email, name);
    
                    // Send the meeting confirmation email
                    await emailInstance.sendReminderEmail(meetingData.title, meetingData.description, meetingData.start_time, meetingData.end_time);

                });
    
                // Wait for all emails to be sent
                await Promise.all(emailPromises);
                const docRef = doc(db, "meetings", d.id);
                await updateDoc(docRef, { is_reminded: true});
                console.log("Reminders sent!")
            }
          }
        }
      });
    } catch (error) {
      console.error('Error checking meetings:', error);
    }
  }

module.exports = checkMeetings

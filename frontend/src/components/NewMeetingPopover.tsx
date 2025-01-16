import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import '../App.css';

interface NewMeetingPopoverProps {
  onSave: (meeting: Meeting) => void;
  onClose: () => void;
}

interface Meeting {
  id: string;
  title: string;
  startTime: Dayjs;
  endTime: Dayjs;
  description: string;
  organiserId: string;
  participants: string[];
}

const NewMeetingPopover: React.FC<NewMeetingPopoverProps> = ({ onSave, onClose }) => {
  const [title, setTitle] = useState('');
  const [startTime, setStartTime] = useState<Dayjs | null>(null);
  const [endTime, setEndTime] = useState<Dayjs | null>(null);
  const [description, setDescription] = useState('');
  const [organiserId, setOrganiserId] = useState('');
  const [participants, setParticipants] = useState<string[]>([]);

  const handleSave = () => {
    if (title && startTime && endTime && organiserId) {
      const newMeeting: Meeting = {
        id: Math.random().toString(36).substr(2, 9), // Generate a random ID
        title,
        startTime,
        endTime,
        description,
        organiserId,
        participants,
      };
      onSave(newMeeting);
      onClose();
    } else {
      alert('Please fill in all required fields.');
    }
  };

  return (
    <div className="popover">
      <h3>New Meeting</h3>
      <form>
        <div>
          <label>Title:</label>
          <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} required />
        </div>
        <div>
          <label>Start Time:</label>
          <input type="datetime-local" onChange={(e) => setStartTime(dayjs(e.target.value))} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" onChange={(e) => setEndTime(dayjs(e.target.value))} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Organiser ID:</label>
          <input type="text" value={organiserId} onChange={(e) => setOrganiserId(e.target.value)} required />
        </div>
        <div>
          <label>Participants:</label>
          <input type="text" value={participants.join(', ')} onChange={(e) => setParticipants(e.target.value.split(', '))} />
        </div>
        <div>
          <button type="button" onClick={handleSave}>Save</button>
          <button type="button" onClick={onClose}>Cancel</button>
        </div>
      </form>
    </div>
  );
};

export default NewMeetingPopover;
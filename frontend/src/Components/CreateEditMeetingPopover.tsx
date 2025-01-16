import React, { useState } from 'react';
import dayjs, { Dayjs } from 'dayjs';
import '../App.css';
import { Meeting } from '../Models/MeetingsModels';

interface CreateEditMeetingPopoverProps {
  onSave: (meeting: Meeting) => void;
  onClose: () => void;
  meeting?: Meeting;
}

const CreateEditMeetingPopover: React.FC<CreateEditMeetingPopoverProps> = ({ onSave, onClose, meeting }) => {
  const [title, setTitle] = useState(meeting?.title || '');
  const [start_time, setStartTime] = useState<Dayjs | null>(meeting?.start_time || null);
  const [end_time, setEndTime] = useState<Dayjs | null>(meeting?.end_time || null);
  const [description, setDescription] = useState(meeting?.description || '');
  const [organiser_id, setOrganiserId] = useState(meeting?.organiser_id || '');
  const [participants, setParticipants] = useState<string[]>(meeting?.participants || []);

  const handleSave = () => {
    if (title && start_time && end_time && organiser_id) {
      const newMeeting: Meeting = {
        title,
        start_time,
        end_time,
        description,
        organiser_id,
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
          <input type="datetime-local" value={start_time?.format("YYYY-MM-DDThh:mm")} onChange={(e) => setStartTime(dayjs(e.target.value))} required />
        </div>
        <div>
          <label>End Time:</label>
          <input type="datetime-local" value={end_time?.format("YYYY-MM-DDThh:mm")} onChange={(e) => setEndTime(dayjs(e.target.value))} required />
        </div>
        <div>
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
        <div>
          <label>Organiser ID:</label>
          <input type="text" value={organiser_id} onChange={(e) => setOrganiserId(e.target.value)} required />
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

export default CreateEditMeetingPopover;
import React, { useState } from 'react';
import MeetingPopover from './MeetingPopover';
import { Dayjs } from 'dayjs';
import { Meeting } from '../Models/MeetingsModels';

interface MeetingRendererProps {
  day: Dayjs | null;
  meetings: Meeting[];
}

const MeetingRenderer: React.FC<MeetingRendererProps> = ({ day, meetings }) => {
    const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
    const [selectedMeeting, setSelectedMeeting] = useState<Meeting | null>(null);

    // Sort meetings by start time
    const sortedMeetings = meetings.sort((a, b) => a.start_time.valueOf() - b.start_time.valueOf());
    const filteredMeetings = sortedMeetings.filter(meeting => meeting.start_time.isSame(day, 'day'));
    const handleClick = (event: React.MouseEvent<HTMLElement>, meeting: Meeting) => {
        setAnchorEl(event.currentTarget);
        setSelectedMeeting(meeting);
    };

    const handleClose = () => {
        setAnchorEl(null);
        setSelectedMeeting(null);
    };

    return (
        <div style={
            {
                display: 'grid',
                gridTemplateRows: 'repeat(auto-fill, 1fr)',
                alignItems: 'center',
                height: '100%',
                width: '100%',
            }
        }>
            {filteredMeetings.map(meeting => (
                <div 
                    key={meeting.id} 
                    className="meeting-bubble"
                    onClick={(event) => handleClick(event, meeting)}
                    style={{
                        margin: '5px',
                        padding: '0px 5px',
                        borderRadius: '5px',
                        backgroundColor: '#f0f0f0',
                        boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
                        cursor: 'pointer',
                        transition: 'background-color 0.3s ease',
                        textOverflow: 'ellipsis',
                        overflowY: 'auto',
                        overflowX: 'hidden',
                        whiteSpace: 'nowrap',
                    }}
                    onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = '#e0e0e0')}
                    onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = '#f0f0f0')}
                >
                    {meeting.title}
                </div>
            ))}
            {selectedMeeting && (
                <MeetingPopover 
                    meeting={selectedMeeting} 
                    anchorEl={anchorEl} 
                    onClose={handleClose} 
                />
            )}
        </div>
    );
};

export default MeetingRenderer;
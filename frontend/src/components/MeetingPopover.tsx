import React, { useState } from 'react';
import { Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Meeting } from '../Models/MeetingsModels';
import { useMeetings } from '../Contexts/Hooks/MeetingsContextHook';
import CreateEditMeetingPopover from './CreateEditMeetingPopover';


interface MeetingPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    meeting: Meeting;
}

const MeetingPopover: React.FC<MeetingPopoverProps> = ({ anchorEl, onClose, meeting }) => {
    const { putMeeting, deleteMeeting } = useMeetings();
    const [ isPopoverOpen, setIsPopoverOpen ] = useState(false);
    const open = Boolean(anchorEl);
    const handleEdit = () => {
        setIsPopoverOpen(true);
    }

    return (
        <div>
        {isPopoverOpen ? ( 
            <CreateEditMeetingPopover 
                onSave={putMeeting}
                onClose={onClose}
                meeting={meeting}
            />
            ) : (
                <Popover
                    open={open}
                    anchorEl={anchorEl}
                    onClose={onClose}
                    anchorOrigin={{
                        vertical: 'center',
                        horizontal: 'center',
                    }}
                    transformOrigin={{
                        vertical: 'top',
                        horizontal: 'center',
                    }}
                >
                    <div style={{ padding: 16, maxWidth: 300 }}>
                        <Typography variant="h6">{meeting.title}</Typography>
                        <Typography variant="body2" color="textSecondary">
                            {meeting.description}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Start Time:</strong> {meeting.start_time.format('YYYY-MM-DD HH:mm')}
                        </Typography>
                        <Typography variant="body2">
                            <strong>End Time:</strong> {meeting.end_time.format('YYYY-MM-DD HH:mm')}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Organiser ID:</strong> {meeting.organiser_id}
                        </Typography>
                        <Typography variant="body2">
                            <strong>Participants:</strong>
                        </Typography>
                        <List dense>
                            {meeting.participants.map((participant, index) => (
                                <ListItem key={index}>
                                    <ListItemText primary={participant} />
                                </ListItem>
                            ))}
                        </List>
                        <div style={{ display: 'flex', justifyContent: 'flex-end', marginTop: 16 }}>
                                <button onClick={handleEdit}>Edit</button>
                                <button onClick={() => deleteMeeting(meeting.id!)} style={{ marginLeft: 8 }}>Delete</button>
                            </div>
                        </div>
                </Popover>
            )
        }
        </div>
    );
};

export default MeetingPopover;
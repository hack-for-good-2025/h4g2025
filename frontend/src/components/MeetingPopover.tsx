import React from 'react';
import { Popover, Typography, List, ListItem, ListItemText } from '@mui/material';
import { Meeting } from './MeetingRenderer';

interface MeetingPopoverProps {
    anchorEl: HTMLElement | null;
    onClose: () => void;
    meeting: Meeting;
}

const MeetingPopover: React.FC<MeetingPopoverProps> = ({ anchorEl, onClose, meeting }) => {
    const open = Boolean(anchorEl);

    return (
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
                    <strong>Start Time:</strong> {meeting.startTime.format('YYYY-MM-DD HH:mm')}
                </Typography>
                <Typography variant="body2">
                    <strong>End Time:</strong> {meeting.endTime.format('YYYY-MM-DD HH:mm')}
                </Typography>
                <Typography variant="body2">
                    <strong>Organiser ID:</strong> {meeting.organiserId}
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
            </div>
        </Popover>
    );
};

export default MeetingPopover;
import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NewMeetingPopover from './NewMeetingPopover';
import { Meeting } from '../Models/MeetingsModels';

interface MenuBarProps {
    postMeeting: (meeting: Meeting) => void;
}

const MenuBar: React.FC<MenuBarProps> = ({ postMeeting }) => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const handleNewMeeting = () => {
        setIsPopoverOpen(true);
    };

    function handleSaveMeeting(meeting: Meeting){
        postMeeting(meeting);
        console.log(meeting);
        setIsPopoverOpen(false);
    };

    const handleClosePopover = () => {
        setIsPopoverOpen(false);
    };

    const handleLogout = () => {
        // Logic for logging out
        console.log('Logged out');
    };

    return (
        <>
            <AppBar position="fixed" enableColorOnDark>
                <Toolbar>
                    <Typography variant="h6" style={{ flexGrow: 1 }}>
                        My App
                    </Typography>
                    <Tooltip title="New Meeting" >
                        <IconButton edge="start" color="inherit" aria-label="new meeting" onClick={handleNewMeeting}>
                            <AddIcon />
                        </IconButton>
                    </Tooltip>
                    <Tooltip title="Log Out">
                        <Button color="inherit" onClick={handleLogout} startIcon={<ExitToAppIcon />}>
                            Log Out
                        </Button>
                    </Tooltip>
                </Toolbar>
            </AppBar>
            {isPopoverOpen && (
                <NewMeetingPopover onSave={handleSaveMeeting} onClose={handleClosePopover} />
            )}
        </>
    );
};

export default MenuBar;
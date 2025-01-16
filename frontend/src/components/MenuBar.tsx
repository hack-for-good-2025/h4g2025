import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import NewMeetingPopover from './NewMeetingPopover';

const MenuBar: React.FC = () => {
    const [isPopoverOpen, setIsPopoverOpen] = useState(false);
    
    const handleNewMeeting = () => {
        setIsPopoverOpen(true);
    };

    const handleSaveMeeting = (meeting: any) => {
        // Logic for saving the new meeting
        console.log('New meeting saved', meeting);
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
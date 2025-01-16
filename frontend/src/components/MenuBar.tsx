import React, { useState } from 'react';
import { AppBar, Toolbar, IconButton, Typography, Button, Tooltip } from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import CreateEditMeetingPopover from './CreateEditMeetingPopover';
import { Meeting } from '../Models/MeetingsModels';
import { useMeetings } from '../Contexts/Hooks/MeetingsContextHook';
import { useAuth } from '../Contexts/Hooks/AuthContextHook';
import { useNavigate } from 'react-router-dom';

const MenuBar: React.FC = ({}) => {
    const { postMeeting } = useMeetings();
    const { logout, loadingToggle } = useAuth();
    const navigate = useNavigate();
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
        loadingToggle();
        navigate('/');
        logout();
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
                <CreateEditMeetingPopover onSave={handleSaveMeeting} onClose={handleClosePopover} />
            )}
        </>
    );
};

export default MenuBar;
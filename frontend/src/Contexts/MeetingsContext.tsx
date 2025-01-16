import React, { createContext } from 'react';
import { Meeting, MeetingsContextType, State } from '../Models/MeetingsModels';
import dayjs, { Dayjs } from 'dayjs';
import { Action } from '../Models/MeetingsModels';

const initialState = {
    userSelectedDate: dayjs(new Date()),
    monthArray: [] as Dayjs[][],
    selectedMonthIndex: 0,
    meetings: [] as Meeting[],
    isLoading: false,
};

function reducer(state: State, action: Action): State {
    switch (action.type) {
        case 'postMeeting':
            return { ...state, meetings: [...state.meetings, action.payload] };
        case 'getAllMeetings':
            return { ...state, meetings: action.payload };
        case 'getMeeting':
            return { ...state, meetings: [action.payload] };
        case 'putMeeting':
            return { ...state, meetings: state.meetings.map(meeting => meeting.id === action.payload.id ? action.payload : meeting) };
        case 'deleteMeeting':
            return { ...state, meetings: state.meetings.filter(meeting => meeting.id !== action.payload) };
        case 'toggleLoading':
            return { ...state, isLoading: !state.isLoading };
        default:
            throw new Error('unknown action');
    }
}

const MeetingsContext = createContext<MeetingsContextType>({
    ...initialState,
    postMeeting: async () => {},
    getAllMeetings: async () => {},
    getMeeting: async () => {},
    putMeeting: async () => {},
    deleteMeeting: async () => {},
    toggleLoading: () => {},
});

function MeetingsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { userSelectedDate, monthArray, selectedMonthIndex, meetings, isLoading } = state;

    async function postMeeting(newMeeting: Meeting) {
        dispatch({ type: 'toggleLoading' });
        console.log(newMeeting);
        const data = await postMeetingDB(newMeeting);
        dispatch({ type: 'toggleLoading' });
        if (data?.status === 'success') {
            dispatch({ type: 'postMeeting', payload: newMeeting });
            alert('Successfully created meeting!');
        }
    }

    async function getAllMeetings() {
        dispatch({ type: 'toggleLoading' });
        const data = await getAllMeetingsDB();
        dispatch({ type: 'toggleLoading' });
        if (data?.status === 'success') {
            dispatch({ type: 'getAllMeetings', payload: data.meetings });
        }
    }

    async function getMeeting(meetingId: string) {
        dispatch({ type: 'toggleLoading' });
        const data = await getMeetingDB(meetingId);
        dispatch({ type: 'toggleLoading' });
        if (data?.status === 'success') {
            dispatch({ type: 'getMeeting', payload: data.meeting });
        }
    }

    async function putMeeting(meetingId: string, updatedMeeting: Meeting) {
        dispatch({ type: 'toggleLoading' });
        const data = await putMeetingDB(meetingId, updatedMeeting);
        dispatch({ type: 'toggleLoading' });
        if (data?.status === 'success') {
            dispatch({ type: 'putMeeting', payload: updatedMeeting });
            alert('Successfully updated meeting!');
        }
    }

    async function deleteMeeting(meetingId: string) {
        dispatch({ type: 'toggleLoading' });
        const data = await deleteMeetingDB(meetingId);
        dispatch({ type: 'toggleLoading' });
        if (data?.status === 'success') {
            dispatch({ type: 'deleteMeeting', payload: meetingId });
            alert('Successfully deleted meeting!');
        }
    }

    function toggleLoading() {
        dispatch({ type: 'toggleLoading' });
    }

    async function postMeetingDB(newMeeting: Meeting) {
        try {
            const res = await fetch('http://localhost:8000/meetings', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(newMeeting),
            });
            const data = await res.json();
            console.log(data);
            return data;
        } catch {
            alert('Failed to create meeting');
        }
    }

    async function getAllMeetingsDB() {
        try {
            const res = await fetch('http://localhost:8000/meetings', {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);
            return data;
        } catch {
            alert('Failed to fetch meetings data');
        }
    }

    async function getMeetingDB(meetingId: string) {
        try {
            const res = await fetch(`http://localhost:8000/meetings/${meetingId}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);
            return data;
        } catch {
            alert('Failed to fetch meeting data');
        }
    }

    async function putMeetingDB(meetingId: string, updatedMeeting: Meeting) {
        try {
            const res = await fetch(`http://localhost:8000/meetings/${meetingId}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(updatedMeeting),
            });

            const data = await res.json();
            console.log(data);
            return data;
        } catch {
            alert('Failed to update meeting');
        }
    }

    async function deleteMeetingDB(meetingId: string) {
        try {
            const res = await fetch(`http://localhost:8000/meetings/${meetingId}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            const data = await res.json();
            console.log(data);
            return data;
        } catch {
            alert('Failed to delete meeting');
        }
    }

    return (
        <MeetingsContext.Provider value={{ userSelectedDate, monthArray, selectedMonthIndex, meetings, isLoading, postMeeting, getAllMeetings, getMeeting, putMeeting, deleteMeeting, toggleLoading }}>
            {children}
        </MeetingsContext.Provider>
    );
}

export { MeetingsContext, MeetingsProvider };
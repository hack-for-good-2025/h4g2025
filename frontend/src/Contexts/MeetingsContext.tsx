import React, { createContext, useEffect } from 'react';
import { Action, Meeting, MeetingsContextType, State } from '../Models/MeetingsModels';
import dayjs, { Dayjs } from 'dayjs';

const initialState = {
    userSelectedDate: dayjs(new Date()),
    monthArray: [] as Dayjs[][],
    selectedMonthIndex: dayjs().month(),
    meetings: [] as Meeting[],
    isLoading: false,
};

function meetingMapper(meeting: Meeting) {
    return {
        id: meeting.id,
        title: meeting.title,
        description: meeting.description,
        start_time: dayjs(meeting.start_time),
        end_time: dayjs(meeting.end_time),
        organiser_id: meeting.organiser_id,
        participants: meeting.participants,
    };
}

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
        case 'setUserSelectedMonth':
            return { ...state, selectedMonthIndex: action.payload.index, monthArray: action.payload.monthArray };
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
    setUserSelectedMonth: () => {},
});

function MeetingsProvider({ children }: { children: React.ReactNode }) {
    const [state, dispatch] = React.useReducer(reducer, initialState);
    const { userSelectedDate, selectedMonthIndex, meetings, isLoading } = state;

    async function postMeeting(newMeeting: Meeting) {
        console.log(newMeeting);
        const data = await postMeetingDB(newMeeting);
        if (data) {
            dispatch({ type: 'postMeeting', payload: newMeeting });
            alert('Successfully created meeting!');
        }
    }

    async function getAllMeetings() {
        dispatch({ type: 'toggleLoading' });
        const data = await getAllMeetingsDB();
        dispatch({ type: 'toggleLoading' });
        if (data) {
            dispatch({ type: 'getAllMeetings', payload: data });
        }
    }

    async function getMeeting(meetingId: string) {
        dispatch({ type: 'toggleLoading' });
        const data = await getMeetingDB(meetingId);
        dispatch({ type: 'toggleLoading' });
        if (data) {
            dispatch({ type: 'getMeeting', payload: data.meeting });
        }
    }

    async function putMeeting(updatedMeeting: Meeting) {
        const data = await putMeetingDB(updatedMeeting);
        if (data) {
            dispatch({ type: 'putMeeting', payload: updatedMeeting });
            alert('Successfully updated meeting!');
        }
    }

    async function deleteMeeting(meetingId: string) {
        const data = await deleteMeetingDB(meetingId);
        if (data) {
            dispatch({ type: 'deleteMeeting', payload: meetingId });
            alert('Successfully deleted meeting!');
        }
    }

    function toggleLoading() {
        dispatch({ type: 'toggleLoading' });
    }

    const getMonth = (month = dayjs().month()) => {
        const year = dayjs().year();
        const firstDay = dayjs().set("month", month).set("year", year).startOf("month").day();
    
        let dayCounter = -firstDay;
    
        return Array.from({length: 5}, () => {
            return Array.from({length: 7}, () => dayjs(new Date(year, month, ++dayCounter)));
        });
    }

    function setUserSelectedMonth(index: number) {
        dispatch({ type: 'setUserSelectedMonth', payload: { index: index, monthArray: getMonth(index) } });
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
            const str = JSON.stringify(data.meetings);
            const meetings = JSON.parse(str).map(meetingMapper);
            return meetings;
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

    async function putMeetingDB(updatedMeeting: Meeting) {
        try {
            const res = await fetch(`http://localhost:8000/meetings/${updatedMeeting.id}`, {
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


    useEffect(() => {
        async function test() {
            await getAllMeetings();
        }
        test();
    }, []); 

    return (
        <MeetingsContext.Provider value={{
            userSelectedDate,
            monthArray: getMonth(selectedMonthIndex),
            selectedMonthIndex,
            meetings,
            isLoading,
            postMeeting,
            getAllMeetings,
            getMeeting,
            putMeeting,
            deleteMeeting,
            toggleLoading,
            setUserSelectedMonth,
        }}>
            {children}
        </MeetingsContext.Provider>
    );
}

export { MeetingsContext, MeetingsProvider };
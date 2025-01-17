import { Dayjs } from "dayjs";

export interface Meeting {
    id?: string;
    title: string;
    start_time: Dayjs;
    end_time: Dayjs;
    description: string;
    organiser_id: string;
    participants: string[];
}

export enum MonthNames {
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
}

export type State = {
    userSelectedDate: Dayjs | null;
    monthArray: Dayjs[][];
    selectedMonthIndex: number;
    meetings: Meeting[];
    isLoading: boolean;
}

export type Action = 
    | { type: "postMeeting"; payload: Meeting }
    | { type: "getAllMeetings"; payload: Meeting[] }
    | { type: "getMeeting"; payload: Meeting }
    | { type: "putMeeting"; payload: Meeting }
    | { type: "deleteMeeting"; payload: string }
    | { type: "toggleLoading" }
    | { type: "setUserSelectedMonth"; payload: { index: number, monthArray: Dayjs[][] } }

export type MeetingsContextType = State & {
    postMeeting: (meeting: Meeting) => Promise<void>;
    getAllMeetings: () => Promise<void>;
    getMeeting: (meetingId: string) => Promise<void>;
    putMeeting: (meeting: Meeting) => Promise<void>;
    deleteMeeting: (meetingId: string) => Promise<void>;
    toggleLoading: () => void;
    setUserSelectedMonth: (index: number) => void;
}
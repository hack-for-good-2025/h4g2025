import { Dayjs } from "dayjs";

export interface Meeting {
    id: string;
    title: string;
    startTime: Dayjs;
    endTime: Dayjs;
    description: string;
    organiserId: string;
    participants: string[];
  }

export type State = {
    userSelectedDate: Dayjs | null;
    monthArray: Dayjs[][];
    selectedMonthIndex: number | null;
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

export type MeetingsContextType = State & {
    postMeeting: (meeting: Meeting) => Promise<void>;
    getAllMeetings: () => Promise<void>;
    getMeeting: (meetingId: string) => Promise<void>;
    putMeeting: (meetingId: string, meeting: Meeting) => Promise<void>;
    deleteMeeting: (meetingId: string) => Promise<void>;
    toggleLoading: () => void;
}
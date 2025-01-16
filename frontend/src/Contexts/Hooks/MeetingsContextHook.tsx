import { useContext } from "react";
import { MeetingsContext } from "../MeetingsContext";

export function useMeetings() {
    const context = useContext(MeetingsContext);
    if (context === undefined)
        throw new Error("MeetingsContext was used outside MeetingsProvider");
    return context;
}
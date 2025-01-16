import { useEffect } from "react";
import MainView from "../Components/MainView";
import Spinner from "../Components/Spinner";
import { useMeetings } from "../Contexts/Hooks/MeetingsContextHook";

function CalenderPage() {
    const { postMeeting, getAllMeetings, isLoading } = useMeetings();
    if (isLoading) {
        return <Spinner />;
    }
    useEffect(() => {
        getAllMeetings();
    }, []);

    return (
        <div>
            <MainView postMeeting={postMeeting} />
        </div>
    );
}

export default CalenderPage;
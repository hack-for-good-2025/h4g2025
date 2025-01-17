import MainView from "../Components/MainView";
import Spinner from "../Components/Spinner";
import { useMeetings } from "../Contexts/Hooks/MeetingsContextHook";

function CalenderPage() {
    const { isLoading } = useMeetings();
    if (isLoading) {
        return <Spinner />;
    }

    return (
        <div>
            <MainView/>
        </div>
    );
}

export default CalenderPage;
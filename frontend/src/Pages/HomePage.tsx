import Spinner from "../Components/Spinner";
import { useAuth } from "../Contexts/Hooks/AuthContextHook";
function HomePage() {
    const { isLoginLoading } = useAuth();
    if (isLoginLoading) {
        return <Spinner />;
    }
    return (
        <div>Home page</div>
    );
}

export default HomePage;
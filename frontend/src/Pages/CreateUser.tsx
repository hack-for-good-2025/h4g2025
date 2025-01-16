import { useAuth } from "../Contexts/Hooks/AuthContextHook";
import LoginSignUp from "../Components/LoginSignUp";
import Spinner from "../Components/Spinner";

function CreateUser() {
    const { createUser, isLoginLoading } = useAuth();
    if (isLoginLoading) {
        return <Spinner />;
    }
    return (
        <section>
            <LoginSignUp
                message={"Create a new user now! 🥳"}
                onSubmit={createUser}
                type={"create"}
                ctaButton={"Create User!"}
            />
        </section>
    );
}

export default CreateUser;
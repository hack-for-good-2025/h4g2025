import { useAuth } from "../Contexts/Hooks/AuthContextHook";
import LoginSignUp from "../Components/LoginSignUp";
import Spinner from "../Components/Spinner";

function Login() {
    const { login, isLoginLoading } = useAuth();
    if (isLoginLoading) {
        return <Spinner />;
    }
    return (
        <section>
            <LoginSignUp
                message={"Login now!"}
                onSubmit={login}
                type={"login"}
                ctaButton={"Login"}
            />
        </section>
    );
}

export default Login;
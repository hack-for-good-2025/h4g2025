import { useNavigate } from "react-router-dom";
import { useAuth } from "../Contexts/Hooks/AuthContextHook";
import styles from "./LogoutUi.module.css";

function LogoutUi() {
  const { user, logout, loadingToggle } = useAuth();
  const navigate = useNavigate();

  function handleLogout() {
    loadingToggle();
    navigate("/");
    logout();
  }

  return (
    <div className={styles.user}>
      <span>Welcome, {user?.username}</span>
      <button onClick={handleLogout}>Logout</button>
    </div>
  );
}

export default LogoutUi;

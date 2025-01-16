import { useEffect, useState } from "react";
import { useAuth } from "../Contexts/Hooks/AuthContextHook";
import { Link, useNavigate } from "react-router-dom";
import Button from "./Button";
import styles from "./LoginSignUp.module.css";
import { User } from "../Models/AuthModels";

export default function Login({
  message,
  onSubmit,
  type,
  ctaButton,
}: {
  message: string;
  onSubmit: (user: User) => Promise<void>;
  type: string;
  ctaButton: string;
}) {
  const { isAuthenticated } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();

    if (type == "login" && email && password) {
      const user = { email, password };
      onSubmit(user);
      setEmail("");
      setPassword("");
    }
    if (type == "create" && email && password && username && passwordConfirm) {
      if (password === passwordConfirm) {
        const user = { email, password, username };
        onSubmit(user);
        setEmail("");
        setPassword("");
        setPasswordConfirm("");
        setUsername("");
      } else {
        alert("Passwords do not match");
      }
    }

    if (type == "forgotPassword" && email) {
      const user = { email };
      onSubmit(user);
      setEmail("");
    }
  }
  useEffect(
    function () {
      if (isAuthenticated) {
        navigate("/calender", { replace: true });
      }
    },
    [isAuthenticated, navigate]
  );
  return (
    <main className={styles.login}>
      <h1>{message}</h1>

      <form className={styles.form} onSubmit={(e) => handleSubmit(e)}>
        {type === "create" && (
          <div className={styles.row}>
            <label htmlFor="name">name</label>
            <input
              type="name"
              id="name"
              onChange={(e) => setUsername(e.target.value)}
              value={username}
            />
          </div>
        )}
        <div className={styles.row}>
          <label htmlFor="email">email</label>
          <input
            type="email"
            id="email"
            onChange={(e) => setEmail(e.target.value)}
            value={email}
          />
        </div>

        {type == "login" && (
          <div className={styles.row}>
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              onChange={(e) => setPassword(e.target.value)}
              value={password}
              minLength={8}
            />
          </div>
        )}
        {type === "create" && (
          <>
            <div className={styles.row}>
              <label htmlFor="password">Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPassword(e.target.value)}
                value={password}
                minLength={8}
              />
            </div>
            <div className={styles.row}>
              <label htmlFor="password">Confirm Password</label>
              <input
                type="password"
                id="password"
                onChange={(e) => setPasswordConfirm(e.target.value)}
                value={passwordConfirm}
              />
            </div>

            <div>
              <Link to="/login" className={styles.link}>
                Already have an account? Log in now!
              </Link>
            </div>
          </>
        )}

        {type === "login" && (
          <>
            <div>
              <Link to="/create" className={styles.link}>
                No account? Create one now!
              </Link>
            </div>
          </>
        )}
        <div>
          <Button className="" onClick={() => {}}>
            {ctaButton}
          </Button>
        </div>
      </form>
    </main>
  );
}

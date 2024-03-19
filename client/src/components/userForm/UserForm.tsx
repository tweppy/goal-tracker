import "./style.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiSubmission } from "../../interfaces";
import { useAuth } from "../../auth/AuthContext";
import { postUserToApi } from "../../services/api";
import { notifyError, notifySuccess } from "../../utils/notifications";

interface UserFormProps {
  heading: string;
}

export const UserForm = ({ heading }: UserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const { login } = useAuth();

  const handleLogin = async () => {
    login({ username, password });
  };

  const handleSignup = async () => {
    const apiSubmissionData: ApiSubmission = {
      data: {
        username,
        password,
        email,
      },
      method: "POST",
      link: "/signup",
    };

    const response = await postUserToApi(apiSubmissionData);

    if (response.success === true) {
      setUsername("");
      setPassword("");
      setEmail("");

      notifySuccess(response.message);

      setTimeout(() => {
        navigate("/");
      }, 2000);
    } else {
      notifyError(response.message);
    }
  };

  return (
    <section className="login-form">
      <h2>{heading}</h2>
      <input
        type="username"
        id="username"
        placeholder="username"
        value={username}
        onChange={e => setUsername(e.target.value)}
      />
      <input
        type="password"
        id="password"
        placeholder="password"
        value={password}
        onChange={e => setPassword(e.target.value)}
      />
      {location.pathname === "/signup" && (
        <input
          type="email"
          id="email"
          placeholder="email"
          value={email}
          onChange={e => setEmail(e.target.value)}
        />
      )}
      {location.pathname === "/login" && (
        <button disabled={!username || !password} onClick={handleLogin}>
          Login
        </button>
      )}
      {location.pathname === "/signup" && (
        <button disabled={!username || !password || !email} onClick={handleSignup}>
          Signup
        </button>
      )}
    </section>
  );
};

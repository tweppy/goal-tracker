import "./style.scss";

import { useState } from "react";
import { useNavigate } from "react-router-dom";

import { ApiSubmission } from "../../interfaces";
import { useAuth } from "../../auth/AuthContext";
import { postUserToApi } from "../../services/api";

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
    navigate("/today");
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
      console.log("User signed up");
      setUsername("");
      setPassword("");
      setEmail("");
      navigate("/");
    } else {
      console.log("Signup failed");
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
      {location.pathname === "/login" && <button onClick={handleLogin}>Login</button>}
      {location.pathname === "/signup" && <button onClick={handleSignup}>Signup</button>}
    </section>
  );
};

// import "./style.scss";

import { useState } from "react";
import { postUserToApi } from "../../services/api";
import { ApiSubmission } from "../../interfaces";
import { useNavigate } from "react-router-dom";

interface UserFormProps {
  heading: string;
}

interface UserFormData {
  username: string;
  password: string;
  email?: string;
}

interface UserSubmitParams {
  currentPath: string;
  userInputData: UserFormData;
  redirectLink: string;
}

export const UserForm = ({ heading }: UserFormProps) => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

  const handleLogin = async () => {
    const userInputData: UserFormData = {
      username,
      password,
    };

    await handleSubmit({ currentPath: "/login", userInputData, redirectLink: "/today" });
  };

  const handleSignup = async () => {
    const userInputData: UserFormData = {
      username,
      password,
      email,
    };

    await handleSubmit({ currentPath: "/signup", userInputData, redirectLink: "/login" });
  };

  const handleSubmit = async ({ currentPath, userInputData, redirectLink }: UserSubmitParams) => {
    const apiSubmissionData: ApiSubmission = {
      data: userInputData,
      method: "POST",
      link: currentPath,
    };

    const response = await postUserToApi(apiSubmissionData);

    if (response.success === true) {
      console.log("Successful");
      setUsername("");
      setPassword("");
      setEmail("");
      navigate(redirectLink);
    } else {
      console.log("Failed:", response.message);
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

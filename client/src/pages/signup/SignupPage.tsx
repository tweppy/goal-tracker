import "./style.scss";

import { useState } from "react";

import { UserForm } from "../../components/userForm/UserForm";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { ApiSubmission } from "../../interfaces";
import { postUserToApi } from "../../services/api";
import { useNavigate } from "react-router-dom";
import { notifySuccess, notifyError } from "../../utils/notifications";
import { Button, ButtonType } from "../../components/Button/Button";

export const SignupPage = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [email, setEmail] = useState<string>("");

  const navigate = useNavigate();

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
    <Layout type={LayoutType.default}>
      <main className="signup-page">
        <UserForm
          heading="Signup"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
          email={email}
          setEmail={setEmail}
        />
        <Button
          type={ButtonType.default}
          disabled={!username || !password || !email}
          onClick={handleSignup}
        >
          Signup
        </Button>
        <p className="redirect">
          Already have an account?{" "}
          <a href="/login" className="redirect__link">
            Login now!
          </a>
        </p>
      </main>
    </Layout>
  );
};

import "./style.scss";

import { useState } from "react";

import { useAuth } from "../../auth/AuthContext";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { UserForm } from "../../components/userForm/UserForm";
import { Button, ButtonType } from "../../components/Button/Button";

export const LoginPage = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const { login } = useAuth();

  const handleLogin = async () => {
    login({ username, password });
  };

  return (
    <Layout type={LayoutType.default}>
      <main className="login-page">
        <UserForm
          heading="Login"
          username={username}
          setUsername={setUsername}
          password={password}
          setPassword={setPassword}
        />
        <Button
          type={ButtonType.default}
          disabled={!username || !password}
          onClick={handleLogin}
        >
          Login
        </Button>
        <p className="redirect">
          Don't have an account?{" "}
          <a href="/signup" className="redirect__link">
            Sign up now!
          </a>
        </p>
      </main>
    </Layout>
  );
};

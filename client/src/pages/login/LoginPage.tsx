import "./style.scss";

import { UserForm } from "../../components/userForm/UserForm";
import { Layout } from "../../components/Layout/Layout";

export const LoginPage = () => {
  return (
    <Layout>
      <main className="login-page">
        <UserForm heading="Login" />
      </main>
    </Layout>
  );
};

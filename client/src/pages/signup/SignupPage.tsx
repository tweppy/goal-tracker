import "./style.scss";

import { UserForm } from "../../components/userForm/UserForm";
import { Layout } from "../../components/Layout/Layout";

export const SignupPage = () => {
  return (
    <Layout>
      <main className="signup-page">
        <UserForm heading="Signup" />
      </main>
    </Layout>
  );
};

import "./style.scss";

import { useNavigate } from "react-router-dom";

import { Layout } from "../../components/Layout/Layout";

export const HomePage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <Layout>
      <main className="home-page">
        {!token && (
          <section className="user/buttons">
            <button onClick={() => navigate("/login")}>login</button>
            <button onClick={() => navigate("/signup")}>signup</button>
          </section>
        )}
      </main>
    </Layout>
  );
};

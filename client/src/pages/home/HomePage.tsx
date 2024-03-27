import "./style.scss";

import { useNavigate } from "react-router-dom";

import { Layout, LayoutType } from "../../components/Layout/Layout";
import { Button, ButtonType } from "../../components/Button/Button";
import logoImg from "../../assets/Component 1.png";

export const HomePage = () => {
  const navigate = useNavigate();

  const token = localStorage.getItem("token");

  return (
    <Layout type={LayoutType.default}>
      <main className="home-page">
        <section className="home-view">
          {!token && (
            <>
              <div className="home-view__logo">
                <img className="home-view__logo-img" src={logoImg} alt="logo" />
                <p className="home-view__logo-text">Goal & Habit Tracker</p>
              </div>
              <div className="home-view__buttons">
                <Button type={ButtonType.default} onClick={() => navigate("/login")}>
                  Login
                </Button>
                <Button type={ButtonType.default} onClick={() => navigate("/signup")}>
                  Signup
                </Button>
              </div>
            </>
          )}
        </section>
      </main>
    </Layout>
  );
};

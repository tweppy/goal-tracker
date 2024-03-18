import "./style.scss";

import { Layout } from "../../components/Layout/Layout";

export const HomePage = () => {
  return (
    <Layout>
      <main className="home-page">
        <button>login</button>
        <button>signup</button>
      </main>
    </Layout>
  );
};

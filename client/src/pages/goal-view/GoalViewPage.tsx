import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GoalCard } from "../../components/GoalCard/GoalCard";
import { Goal } from "../../interfaces";
import { getGoalData } from "../../utils/helpers";
import { Layout } from "../../components/Layout/Layout";
import { submitToApi } from "../../services/api";

export const GoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await getGoalData(id as string);
      setGoal(result);
    }
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const result = await submitToApi({ method: "DELETE", link: `/goals/${id}` });

    if (result.success === true) {
      console.log("goal removed");
      setTimeout(() => {
        navigate("/goals");
        // add some notif that goal was marked as completed
      }, 2000);
    } else {
      console.log("Failed to remove goal");
    }
  };

  return (
    <Layout>
      <main className="goal-page">
        <header className="goal-page__header">
          <h1 className="goal-page__title">Goal</h1>
        </header>
        <section>{goal && <GoalCard key={goal.goalId} {...goal} />}</section>
        <section>
          <button onClick={handleDelete}>delete goal</button>
        </section>
      </main>
    </Layout>
  );
};

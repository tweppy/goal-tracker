import "./style.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { GoalCard } from "../../components/GoalCard/GoalCard";
import { Goal } from "../../interfaces";
import { getGoalData } from "../../utils/helpers";
import { Layout } from "../../components/Layout/Layout";

export const GoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();

  const { id } = useParams();

  useEffect(() => {
    async function fetchData() {
      const result = await getGoalData(id as string);
      setGoal(result);
    }
    fetchData();
  }, [id]);

  return (
    <Layout>
      <main className="goal-page">
        <header className="goal-page__header">
          <h1 className="goal-page__title">Goal</h1>
        </header>
        <section>{goal && <GoalCard key={goal.goalId} {...goal} />}</section>
      </main>
    </Layout>
  );
};

import "./style.scss";

import { useEffect, useState } from "react";

import { submitBodyToApi, submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";
import { GoalForm } from "../../components/GoalForm/GoalForm";
import { Layout } from "../../components/Layout/Layout";

export const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getUserGoals = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/goals" });
      setGoals(response.body.goals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    getUserGoals();
  }, []);

  const handleCreate = async (goal: Goal) => {
    await submitBodyToApi({ data: goal, method: "POST", link: '/goals' });
    console.log("Created goal:", goal);
  };

  return (
    <Layout>
      <main className="goals-page">
        <header className="goals-page__header">
          <h1 className="goals-page__title">Goals</h1>
        </header>
        <section className="goals-page__goals">
          {goals.map(goal => (
            <GoalCard
              key={goal.goalId}
              goalId={goal.goalId || ""}
              userId={goal.userId || ""}
              {...goal}
            />
          ))}

          {goals.length === 0 && <p className="empty">No goals found</p>}
        </section>

        <GoalForm onSubmit={handleCreate} />
      </main>
    </Layout>
  );
};

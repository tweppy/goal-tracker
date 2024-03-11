import { getApiData } from "../../services/api";
import { ApiSubmission, Goal } from "../../interfaces";

import { useEffect, useState } from "react";

import { GoalCard } from "../../components/GoalCard/GoalCard";

export const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getUserGoals = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/goals",
    };

    try {
      const response = await getApiData(apiSubmissionData);
      const foundGoals = response.body.goals;

      setGoals(foundGoals);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    getUserGoals();
  }, []);

  return (
    <main className="goals-page">
      <header className="goals-page__header">
        <h1 className="goals-page__title">Goals</h1>
      </header>
      <section className="goals-page__goals">
        {goals.map(goal => {
          return (
            <GoalCard
              key={goal.goalId}
              id={goal.goalId}
              title={goal.goalName}
              desc={goal.description}
            />
          );
        })}

        {goals.length === 0 && <p className="empty">No goals found</p>}
      </section>
    </main>
  );
};

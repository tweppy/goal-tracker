import { getApiData } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";

import { useEffect, useState } from "react";

export const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getUserGoals = async () => {
    try {
      const response = await getApiData({ method: "GET", link: "/goals" });
      setGoals(response.body.goals);
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
        {goals.map(goal => (
          <GoalCard key={goal.goalId} {...goal} />
        ))}
        
        {goals.length === 0 && <p className="empty">No goals found</p>}
      </section>
    </main>
  );
};

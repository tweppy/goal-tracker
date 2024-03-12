import "./style.scss";

import { useEffect, useState } from "react";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";

export const TodayPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getTodayGoalsData = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/today" });
      setGoals(response.body.goalsDueToday);
    } catch (error) {
      console.error("Error fetching goals due today:", error);
    }
  };

  useEffect(() => {
    getTodayGoalsData();
  }, []);

  return (
    <main className="today-page">
      <header className="today-page__header">
        <h1 className="today-page__title">Today</h1>
      </header>
      <section className="today-page__goals">
        {goals.map(goal => (
          <GoalCard key={goal.goalId} {...goal} />
        ))}

        {goals.length === 0 && <p className="empty">Nothing due today</p>}
      </section>
    </main>
  );
};

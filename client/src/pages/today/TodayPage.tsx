// import "./style.scss";
import { getApiData } from "../../services/api";
import { ApiSubmission, Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";

import { useEffect, useState } from "react";

export const TodayPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getTodayGoalsData = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/today",
    };

    try {
      const response = await getApiData(apiSubmissionData);
      const todayGoals = response.body.goalsDueToday;

      setGoals(todayGoals);
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

        {goals.length === 0 && <p className="empty">Nothing due today</p>}
      </section>
    </main>
  );
};

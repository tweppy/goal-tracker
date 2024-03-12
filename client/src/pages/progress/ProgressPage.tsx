import "./style.scss";

import { useEffect, useState } from "react";

import { submitToApi } from "../../services/api";
import { CompletedGoal } from "../../interfaces";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";

export const ProgressPage = () => {
  const [progressGoals, setProgressGoals] = useState<CompletedGoal[]>([]);

  const getUserGoalsProgress = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/progress" });
      setProgressGoals(response.body.progress);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    getUserGoalsProgress();
  }, []);

  const groupedProgressGoals: { [key: string]: CompletedGoal[] } = {};

  progressGoals.forEach(goal => {
    if (!groupedProgressGoals[goal.goalId]) {
      groupedProgressGoals[goal.goalId] = [];
    }
    groupedProgressGoals[goal.goalId].push(goal);
  });

  return (
    <main className="progress-page">
      <header className="progress-page__header">
        <h1 className="progress-page__title">Progress Goals</h1>
      </header>
      <section className="progress-page__goals">
        {Object.entries(groupedProgressGoals).map(([goalId, goal]) => (
          <ProgressCard key={goalId} {...goal[0]} completedOn={goal} showDetails={false} />
        ))}
        {progressGoals.length === 0 && (
          <p className="empty">Complete a goal to see your progress</p>
        )}
      </section>
    </main>
  );
};

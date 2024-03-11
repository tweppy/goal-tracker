// import "./style.scss";
import { getApiData } from "../../services/api";
import { ApiSubmission, Goal } from "../../interfaces";

import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export const TodayPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const navigate = useNavigate();

  const getTodayGoalsData = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/today",
    };

    const apiProgressSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/progress",
    };

    const todayGoalsResponse = await getApiData(apiSubmissionData);
    const completedGoalsResponse = await getApiData(apiProgressSubmissionData);

    const todayGoals = todayGoalsResponse.body.goalsDueToday;
    const completedGoalIds = completedGoalsResponse.body.progress.map((goal: Goal) => goal.goalId);

    const updatedGoals = todayGoals.filter((goal: Goal) => !completedGoalIds.includes(goal.goalId));

    console.log("updatedGoals: ", updatedGoals);

    setGoals(updatedGoals);
  };

  useEffect(() => {
    getTodayGoalsData();
  }, []);

  const handleGoalClick = (goalId: string) => {
    navigate(`/today/${goalId}`);
  };

  return (
    <main className="today-page">
      <header className="today-page__header">
        <h1 className="today-page__title">Today</h1>
      </header>

      <section className="today-page__goals">
        {goals.map(goal => {
          return (
            <section
              className="goal"
              key={goal.goalId}
              onClick={() => handleGoalClick(goal.goalId)}
            >
              <h2 className="goal__title">{goal.goalName}</h2>
              <p className="goal__description">desc: {goal.description}</p>
            </section>
          );
        })}

        {goals.length === 0 && <p className="empty">Nothing due today</p>}
      </section>
    </main>
  );
};

// import "./style.scss";
import { getApiData } from "../../services/api";
import { ApiSubmission, Goal } from "../../interfaces";

import { useEffect, useState } from "react";

export const TodayPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);

  const getTodayGoalsData = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/today",
    };

    const response = await getApiData(apiSubmissionData);
    const todayGoals = response.body.goalsDueToday;
    console.log(response.body.goalsDueToday);
    setGoals(todayGoals);
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
        {goals?.map(goal => {
          return (
            <section className="goal" key={goal.goalId}>
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

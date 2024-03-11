import dayjs from "dayjs";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getApiData } from "../../services/api";
import { ApiSubmission, Goal } from "../../interfaces";

export const TodayGoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [completed, setCompleted] = useState<boolean>(false);


  const { id } = useParams();

  // check if goal is in completedGoals db
  const isGoalCompleted = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/progress/" + id,
    };

    try {
      const response = await getApiData(apiSubmissionData);

      if (response.success === true) {
        setCompleted(true);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // get data to display the clicked goal
  const getTodayGoalsData = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "GET",
      link: "/goals/" + id,
    };

    try {
      const response = await getApiData(apiSubmissionData);
      setGoal(response.body.goal);
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  // mark goal as completed
  const handleCompleteGoal = async () => {
    const apiSubmissionData: ApiSubmission = {
      method: "POST",
      link: "/today/" + id,
    };

    try {
      await getApiData(apiSubmissionData);
      setCompleted(true);
    } catch (error) {
      console.error("Error marking goal as completed:", error);
    }
  };

  useEffect(() => {
    getTodayGoalsData();
    isGoalCompleted();
  }, [id]);

  const goalRepeats = () => {
    if (!goal) return;

    let repeatDayText = "";

    if (goal.repeatType === "weekly") {
      const repeatDayNumber = Array.isArray(goal.repeatDay)
        ? goal.repeatDay[0]
        : parseInt(goal.repeatDay);
      repeatDayText = dayjs().day(repeatDayNumber).format("dddd");
    } else {
      repeatDayText = goal.repeatType;
    }

    return repeatDayText;
  };

  return (
    <main className="today-goal-page">
      <section className="goal">
        <header className="goal__header">
          <h1 className="goal__title">{goal?.goalName}</h1>
        </header>
        <article className="goal__details">
          {goal?.description && <p className="goal__description">Desc: {goal?.description}</p>}

          {goal?.repeatType !== "none" && (
            <p className="goal__repeatDay">Repeats: {goalRepeats()}</p>
          )}

          {goal?.dueDate !== "none" && <p className="goal__dueDate">Due: {goal?.dueDate}</p>}
        </article>
        <button disabled={completed} onClick={handleCompleteGoal}>
          mark as completed
        </button>
      </section>
    </main>
  );
};

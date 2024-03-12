import "./style.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { CompletedGoal } from "../../interfaces";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";

export const ProgressGoalViewPage = () => {
  const [progressGoal, setProgressGoal] = useState<CompletedGoal[]>([]);

  const { id } = useParams();

  const getGoalProgress = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/progress/" + id });
      console.log(444, response.body);
      setProgressGoal(response.body.goalProgress);
    } catch (error) {
      console.error("Error fetching goals:", error);
    }
  };

  useEffect(() => {
    getGoalProgress();
  }, []);

  return (
    <main className="progress-goal-page">
      <section className="progress-goal-page__wrapper">
        {progressGoal.length > 0 ? (
          <ProgressCard {...progressGoal[0]} completedOn={progressGoal} showDetails={true} />
        ) : (
          <p className="empty">No progress found for this goal</p>
        )}
      </section>
    </main>
  );
};

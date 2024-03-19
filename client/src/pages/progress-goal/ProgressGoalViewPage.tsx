import "./style.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { CompletedGoal } from "../../interfaces";
import { ProgressCard } from "../../components/ProgressCard/ProgressCard";
import { Layout } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

export const ProgressGoalViewPage = () => {
  const [progressGoal, setProgressGoal] = useState<CompletedGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const getGoalProgress = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/progress/" + id });
      setProgressGoal(response.body.goalProgress);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getGoalProgress();
  }, []);

  return progressGoal && !loading ? (
    <Layout>
      <main className="progress-goal-page">
        <section className="progress-goal-page__wrapper">
          {progressGoal.length > 0 ? (
            <ProgressCard {...progressGoal[0]} completedOn={progressGoal} showDetails={true} />
          ) : (
            <p className="empty">No progress found for this goal</p>
          )}
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

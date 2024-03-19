import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";
import { getGoalData } from "../../utils/helpers";
import { Layout } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { notifyError, notifySuccess } from "../../utils/notifications";

export const TodayGoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [completed, setCompleted] = useState<boolean>(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleCompleteGoal = async () => {
    try {
      const result = await submitToApi({ method: "POST", link: "/today/" + id });
      setCompleted(true);
      notifySuccess(result.message);
      setTimeout(() => {
        navigate("/today");
      }, 2000);
    } catch (error) {
      notifyError("Error marking goal as completed");
      console.error("Error:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getGoalData(id as string);
      if (result) {
        setGoal(result);
        setLoading(false);
      }
    }
    fetchData();
  }, [id]);

  return goal && !loading ? (
    <Layout>
      <main className="today-goal-page">
        <section>
          {goal && <GoalCard key={goal.goalId} {...goal} goalId={goal.goalId || ""} />}
        </section>
        <button disabled={completed} onClick={handleCompleteGoal}>
          mark as completed
        </button>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

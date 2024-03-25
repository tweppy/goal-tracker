import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard, GoalCardType } from "../../components/GoalCard/GoalCard";
import { getGoalData } from "../../utils/helpers";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { notifyError, notifySuccess } from "../../utils/notifications";
import { Button, ButtonType } from "../../components/Button/Button";

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

  const handleEdit = () => {
    navigate("/goals/" + id);
  };

  const handleViewProgress = () => {
    navigate("/progress/" + id);
  };

  return goal && !loading ? (
    <Layout type={LayoutType.fullScreenNav}>
      <main className="today-goal-page">
        <header className="today-goal-page__header">
          <h1 className="header__title">{goal.goalName}</h1>
        </header>
        <section className="today-goal-page__goal">
          {goal && (
            <GoalCard
              type={GoalCardType.goalView}
              key={goal.goalId}
              goalId={goal.goalId || ""}
              {...goal}
            />
          )}
          <section className="goal__buttons">
            <Button type={ButtonType.default} disabled={completed} onClick={handleCompleteGoal}>
              Mark as completed
            </Button>
            <Button type={ButtonType.default} onClick={handleEdit}>
              Goal details
            </Button>
            <Button type={ButtonType.default} onClick={handleViewProgress}>
              View progress
            </Button>
          </section>
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

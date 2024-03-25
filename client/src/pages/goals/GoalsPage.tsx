import "./style.scss";

import { useEffect, useState } from "react";

import { submitBodyToApi, submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard, GoalCardType } from "../../components/GoalCard/GoalCard";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Button, ButtonType } from "../../components/Button/Button";
import { Modal } from "../../components/Modal/Modal";
import { GoalForm } from "../../components/GoalForm/GoalForm";
import { notifyError, notifySuccess } from "../../utils/notifications";

export const GoalsPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const getUserGoals = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/goals" });
      setGoals(response.body.goals);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching goals:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getUserGoals();
  }, []);

  const handleOpenModal = async () => {
    setShowModal(true);
  };

  if (showModal) {
    document.body.style.overflow = "hidden";
  } else {
    document.body.style.overflow = "auto";
  }

  const handleCreate = async (goal: Goal) => {
    const result = await submitBodyToApi({ data: goal, method: "POST", link: "/goals" });
    if (result.success === true) {
      notifySuccess(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      notifyError("Invalid goal form");
    }
  };

  return goals && !loading ? (
    <Layout
      type={!showModal ? LayoutType.default : LayoutType.fullScreen}
      title="Goals"
      description="All your goals"
    >
      <main className="goals-page">
        <Button type={ButtonType.default} onClick={handleOpenModal}>
          Create new goal
        </Button>
        <section className="goals-page__goals">
          {goals.map(goal => (
            <GoalCard
              type={GoalCardType.small}
              key={goal.goalId}
              goalId={goal.goalId || ""}
              goalName={goal.goalName}
            />
          ))}

          {goals.length === 0 && <p className="empty">No goals found</p>}
        </section>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <GoalForm heading="New Goal" onSubmit={handleCreate} />
          </Modal>
        )}
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

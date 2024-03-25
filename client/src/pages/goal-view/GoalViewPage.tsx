import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GoalCard, GoalCardType } from "../../components/GoalCard/GoalCard";
import { Goal } from "../../interfaces";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { submitToApi } from "../../services/api";
import { GoalForm } from "../../components/GoalForm/GoalForm";
import { notifyError, notifySuccess } from "../../utils/notifications";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { Modal } from "../../components/Modal/Modal";
import { Button, ButtonType } from "../../components/Button/Button";

export const GoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [loading, setLoading] = useState(true);
  const [showModal, setShowModal] = useState<boolean>(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getGoal = async () => {
      try {
        const result = await submitToApi({ method: "GET", link: "/goals/" + id });

        if (result) {
          setGoal(result.body.goal);
          setLoading(false);
        } else {
          notifyError("Goal not found");
          setTimeout(() => {
            navigate("/goals");
          }, 2000);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setLoading(false);
      }
    };

    getGoal();
  }, [id, navigate]);

  const handleDelete = async () => {
    const result = await submitToApi({ method: "DELETE", link: `/goals/${id}` });

    if (result) {
      notifySuccess(result.message);
      setTimeout(() => {
        navigate("/goals");
      }, 2000);
    } else {
      notifyError(result.message);
    }
  };

  const handleEdit = async (goal: Goal) => {
    const result = await submitToApi({ data: goal, method: "PUT", link: `/goals/${id}` });

    if (result) {
      notifySuccess(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      notifyError("Invalid goal form");
    }
  };

  const handleOpenModal = async () => {
    setShowModal(true);
  };

  const handleViewProgress = async () => {
    const link = "/progress/" + id;
    const result = await submitToApi({ method: "GET", link });

    if (!result) {
      notifyError("No progress found for this goal");
    } else {
      navigate("/progress/" + id);
    }
  };

  return goal && !loading ? (
    <Layout type={!showModal ? LayoutType.fullScreenNav : LayoutType.fullScreen}>
      <main className="goal-page">
        <header className="goal-page__header">
          <h1 className="goal-page__title">{goal.goalName}</h1>
        </header>
        <section className="goal-page__goal">
          {goal && (
            <GoalCard
              type={GoalCardType.goalView}
              key={goal.goalId}
              goalId={goal.goalId || ""}
              {...goal}
            />
          )}
          <section className="goal__buttons">
            <Button type={ButtonType.default} onClick={handleOpenModal}>
              Edit Goal
            </Button>
            <Button type={ButtonType.default} onClick={handleViewProgress}>
              View Progress
            </Button>
            <Button type={ButtonType.delete} onClick={handleDelete}>
              Delete Goal
            </Button>
          </section>
        </section>

        {showModal && (
          <Modal onClose={() => setShowModal(false)}>
            <GoalForm heading="Edit Goal" onSubmit={handleEdit} initialGoal={goal} />
          </Modal>
        )}
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

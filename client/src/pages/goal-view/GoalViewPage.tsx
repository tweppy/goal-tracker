import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GoalCard } from "../../components/GoalCard/GoalCard";
import { Goal } from "../../interfaces";
import { getGoalData } from "../../utils/helpers";
import { Layout } from "../../components/Layout/Layout";
import { submitBodyToApi, submitToApi } from "../../services/api";
import { GoalForm } from "../../components/GoalForm/GoalForm";
import { notifyError, notifySuccess } from "../../utils/notifications";

export const GoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [showEditForm, setShowEditForm] = useState<boolean>(false);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const result = await getGoalData(id as string);
      setGoal(result);
    }
    fetchData();
  }, [id]);

  const handleDelete = async () => {
    const result = await submitToApi({ method: "DELETE", link: `/goals/${id}` });

    if (result.success === true) {
      notifySuccess(result.message);
      setTimeout(() => {
        navigate("/goals");
      }, 2000);
    } else {
      notifyError(result.message);
    }
  };

  const handleEdit = async (goal: Goal) => {
    const result = await submitBodyToApi({ data: goal, method: "PUT", link: `/goals/${id}` });

    if (result.success === true) {
      notifySuccess(result.message);
      setTimeout(() => {
        window.location.reload();
      }, 2000);
    } else {
      notifyError("Invalid goal form");
    }
  };

  return (
    <Layout>
      <main className="goal-page">
        <header className="goal-page__header">
          <h1 className="goal-page__title">Goal</h1>
        </header>
        <section className="goal-page__goal">
          {goal && (
            <GoalCard
              key={goal.goalId}
              goalId={goal.goalId || ""}
              userId={goal.userId || ""}
              {...goal}
            />
          )}
          <button onClick={handleDelete}>Delete goal</button>
        </section>

        <section>
          <button onClick={() => setShowEditForm(!showEditForm)}>Edit goal</button>

          {showEditForm && <GoalForm onSubmit={handleEdit} initialGoal={goal} />}
        </section>
      </main>
    </Layout>
  );
};

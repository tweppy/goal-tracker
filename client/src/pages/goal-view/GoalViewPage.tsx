import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { GoalCard } from "../../components/GoalCard/GoalCard";
import { Goal } from "../../interfaces";
import { getGoalData } from "../../utils/helpers";
import { Layout } from "../../components/Layout/Layout";
import { submitBodyToApi, submitToApi } from "../../services/api";
import { GoalForm } from "../../components/GoalForm/GoalForm";

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
      console.log("goal removed");
      setTimeout(() => {
        navigate("/goals");
        // add some notif that goal was marked as completed
      }, 2000);
    } else {
      console.log("Failed to remove goal");
    }
  };

  // add some notif that goal was marked as completed
  const handleEdit = async (goal: Goal) => {
    await submitBodyToApi({ data: goal, method: "PUT", link: `/goals/${id}` });
    console.log("Submitted edited goal:", goal);
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
          <button onClick={handleDelete}>delete goal</button>
        </section>

        <section>
          <button onClick={() => setShowEditForm(!showEditForm)}>edit goal</button>

          {showEditForm && <GoalForm onSubmit={handleEdit} initialGoal={goal} />}
        </section>
      </main>
    </Layout>
  );
};

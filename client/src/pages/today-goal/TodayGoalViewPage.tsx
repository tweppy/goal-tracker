import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";
import { getGoalData } from "../../utils/helpers";

export const TodayGoalViewPage = () => {
  const [goal, setGoal] = useState<Goal>();
  const [completed, setCompleted] = useState<boolean>(false);

  const navigate = useNavigate();

  const { id } = useParams();

  const handleCompleteGoal = async () => {
    try {
      await submitToApi({ method: "POST", link: "/today/" + id });
      setCompleted(true);
      setTimeout(() => {
         navigate("/today");
         // add some notif that goal was marked as completed
      }, 2000);

    } catch (error) {
      console.error("Error marking goal as completed:", error);
    }
  };

  useEffect(() => {
    async function fetchData() {
      const result = await getGoalData(id as string);
      setGoal(result);
    }
    fetchData();
  }, [id]);

  return (
    <main className="today-goal-page">
      <section>{goal && <GoalCard key={goal.goalId} {...goal} />}</section>
      <button disabled={completed} onClick={handleCompleteGoal}>
        mark as completed
      </button>
    </main>
  );
};

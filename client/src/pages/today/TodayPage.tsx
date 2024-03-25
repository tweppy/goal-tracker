import "./style.scss";

import { useEffect, useState } from "react";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard, GoalCardType } from "../../components/GoalCard/GoalCard";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import dayjs from "dayjs";

export const TodayPage = () => {
  const [goals, setGoals] = useState<Goal[]>([]);
  const [loading, setLoading] = useState(true);

  const getTodayGoalsData = async () => {
    try {
      const response = await submitToApi({ method: "GET", link: "/today" });
      if (response) {
        setGoals(response.body.goalsDueToday);
        setLoading(false);
      }
    } catch (error) {
      console.error("Error fetching goals due today:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    getTodayGoalsData();
  }, []);

  const todayDate = dayjs().format("dddd YYYY-MM-DD");

  return goals && !loading ? (
    <Layout type={LayoutType.default} title="Today" description={todayDate}>
      <main className="today-page">
        <section className="today-page__goals">
          {goals.map(goal => (
            <GoalCard
              type={GoalCardType.full}
              key={goal.goalId}
              {...goal}
              goalId={goal.goalId || ""}
            />
          ))}

          {goals.length === 0 && <p className="empty">Nothing due today</p>}
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

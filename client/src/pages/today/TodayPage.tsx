import "./style.scss";

import { useEffect, useState } from "react";

import { submitToApi } from "../../services/api";
import { Goal } from "../../interfaces";
import { GoalCard } from "../../components/GoalCard/GoalCard";
import { Layout } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";

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

  return goals && !loading ? (
    <Layout>
      <main className="today-page">
        <header className="today-page__header">
          <h1 className="today-page__title">Today</h1>
        </header>
        <section className="today-page__goals">
          {goals.map(goal => (
            <GoalCard key={goal.goalId} {...goal} goalId={goal.goalId || ""} />
          ))}

          {goals.length === 0 && <p className="empty">Nothing due today</p>}
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

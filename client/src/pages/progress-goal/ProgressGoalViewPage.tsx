import "./style.scss";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { CompletedGoal } from "../../interfaces";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { ProgressCircle } from "../../components/ProgressCircle/ProgressCircle";
import { calculateProgress, calculateProgressForPreviousWeek } from "../../utils/progressHelpers";

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

  const repeatType = progressGoal[0]?.repeatType;
  const progress = calculateProgress(progressGoal, repeatType);
  const lastWeekProgress = calculateProgressForPreviousWeek(progressGoal, repeatType);
  console.log(lastWeekProgress)

  return progressGoal && !loading ? (
    <Layout
      type={LayoutType.default}
      title={progressGoal[0].goalName}
      description="Any progress is a step closer to your goal.
      Even if you miss days, keep going!"
    >
      <main className="progress-goal-page">
        <section className="progress-goal-page__wrapper">
          <section className="progress__this-week">
            <h2 className="this-week__title">This week</h2>
            <ProgressCircle progress={progress} />
            <p className="this-week__description">This week, you've completed {progress}% so far</p>
          </section>

          <section className="progress__last-week">
            <h2 className="last-week__title">Last week</h2>
            <ProgressCircle progress={lastWeekProgress} />
            <p className="last-week__description">Last week, you completed the goal {lastWeekProgress}%</p>
          </section>

          {/* <p className="empty">No progress found for this goal</p> */}
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

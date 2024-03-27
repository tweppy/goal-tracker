import "./style.scss";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { submitToApi } from "../../services/api";
import { CompletedGoal } from "../../interfaces";
import { Layout, LayoutType } from "../../components/Layout/Layout";
import { LoadingSpinner } from "../../components/LoadingSpinner/LoadingSpinner";
import { ProgressCircle } from "../../components/ProgressCircle/ProgressCircle";
import { calculateProgress, calculateProgressForPreviousWeek } from "../../utils/progressHelpers";
import { notifyError } from "../../utils/notifications";

export const ProgressGoalViewPage = () => {
  const [goalProgress, setGoalProgress] = useState<CompletedGoal[]>([]);
  const [loading, setLoading] = useState(true);

  const { id } = useParams();

  const navigate = useNavigate();

  useEffect(() => {
    const getGoalProgress = async () => {
      try {
        const response = await submitToApi({ method: "GET", link: "/progress/" + id });

        if (!response) {
          navigate("/progress");
          notifyError("Progress not found");
        } else {
          setGoalProgress(response.body.goalProgress);
          setLoading(false);
        }
      } catch (error) {
        console.error("Error fetching goals:", error);
        setLoading(false);
      }
    };

    getGoalProgress();
  }, [id, navigate]);

  const repeatType = goalProgress[0]?.repeatType;
  const progress = calculateProgress(goalProgress, repeatType);
  const lastWeekProgress = calculateProgressForPreviousWeek(goalProgress, repeatType);

  return goalProgress && !loading ? (
    <Layout
      type={LayoutType.default}
      title={goalProgress[0].goalName || "Goal Progress"}
      description="Any progress is a step closer to your goal.
      Even if you miss days, keep going!"
    >
      <main className="progress-goal-page">
        <section className="progress-goal-page__wrapper">
          <section className="this-week">
            <h2 className="this-week__title">This week</h2>
            <ProgressCircle progress={progress} />
            <p className="this-week__description">This week, you've completed {progress}% so far</p>
          </section>
          {lastWeekProgress !== 0 && (
            <section className="last-week">
              <h2 className="last-week__title">Last week</h2>
              <ProgressCircle progress={lastWeekProgress} />
              <p className="last-week__description">
                Last week, you completed the goal {lastWeekProgress}%
              </p>
            </section>
          )}
        </section>
      </main>
    </Layout>
  ) : (
    <LoadingSpinner />
  );
};

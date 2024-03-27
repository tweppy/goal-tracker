import "./style.scss";

import { useLocation, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import dayjs from "dayjs";

import { CompletedGoal } from "../../interfaces";
import { calculateProgress, filterDaysByRepeatType } from "../../utils/progressHelpers";

interface GroupedCompletedOn {
  [day: string]: string[];
}

interface ProgressCardProps {
  goalId: string;
  goalName: string;
  repeatType: string;
  completedOn: CompletedGoal[];
}

export const ProgressCard = ({ goalId, goalName, repeatType, completedOn }: ProgressCardProps) => {
  const [groupedCompletedOn, setGroupedCompletedOn] = useState<GroupedCompletedOn>({});
  const [progress, setProgress] = useState(0);

  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = () => {
    !pathname.includes(goalId) ? navigate(`${pathname}/${goalId}`) : "";
  };

  useEffect(() => {
    const initialGroupedCompletedOn: GroupedCompletedOn = {};
    const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

    days.forEach(day => {
      initialGroupedCompletedOn[day] = [];
    });

    const today = dayjs();
    const startOfWeek = today.startOf("isoWeek");
    const endOfWeek = today.endOf("isoWeek");

    completedOn.forEach(completedGoal => {
      const dateToString = completedGoal.completedOn.toString();
      const completedDate = dayjs(dateToString);

      if (completedDate.isBetween(startOfWeek, endOfWeek, "day", "[]")) {
        const dayOfWeek = completedDate.format("dddd");
        initialGroupedCompletedOn[dayOfWeek].push(dateToString);
      }
    });

    const calculatedProgress = calculateProgress(completedOn, repeatType);

    setGroupedCompletedOn(initialGroupedCompletedOn);
    setProgress(calculatedProgress);
  }, [completedOn, repeatType]);

  return (
    <section className="progress-card" key={goalId} onClick={handleClick}>
      <header className="progress-card__header">
        <h2 className="progress-card__title">{goalName}</h2>
        <p className="progress-card__repeatType">{repeatType}</p>
      </header>

      <div className="progress-bar">
        <div className="progress-bar__fill" style={{ width: `${progress}%` }}></div>
      </div>

      <section className="progress-card__completed-on">
        {Object.entries(groupedCompletedOn)
          .filter(([day]) => filterDaysByRepeatType(repeatType, day))
          .map(([day, dates]) => (
            <div key={day} className={`completed-on__day ${dates.length > 0 ? "done" : ""}`}>
              <p className="completed-on__day-text">{day.substring(0, 3)}</p>
            </div>
          ))}
      </section>
    </section>
  );
};

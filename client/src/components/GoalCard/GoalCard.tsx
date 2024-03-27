/* eslint-disable react-refresh/only-export-components */
import "./style.scss";

import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface GoalCardProps {
  goalId: string;
  goalName: string;
  description?: string;
  repeatType?: string;
  repeatDay?: number[] | string;
  type: GoalCardType;
}

export enum GoalCardType {
"full" = "full",
"small" = "small",
"goalView" = "goalView"
}

export const GoalCard = ({
  goalId,
  goalName,
  description,
  repeatType,
  repeatDay,
  type,
}: GoalCardProps) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();

  const handleClick = () => {
    !pathname.includes(goalId) ? navigate(`${pathname}/${goalId}`) : "";
  };

  const goalRepeats = () => {
    if (repeatType === "weekly" && repeatDay) {
      const repeatDayNumber = Array.isArray(repeatDay)
        ? repeatDay[0]
        : parseInt(repeatDay as string, 10);
      const dayName = dayjs().day(repeatDayNumber).format("dddd");
      return `${dayName}s`;
    }
    return repeatType;
  };

  return (
    <section className={`goal-card__${type}`} key={goalId} onClick={handleClick}>
      {type !== "goalView" && (
        <header className="goal-card__header">
          <h2 className="goal-card__title">{goalName}</h2>
        </header>
      )}
      {description && <p className="goal-card__description">{description}</p>}
      <article className="goal-card__repeatDay">{goalRepeats()}</article>
    </section>
  );
};

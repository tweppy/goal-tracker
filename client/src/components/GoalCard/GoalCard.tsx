import "./style.scss";

import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface GoalCardProps {
  goalId: string;
  goalName: string;
  description?: string;
  repeatType?: string;
  repeatDay?: number[] | string;
}

export const GoalCard = ({
  goalId,
  goalName,
  description,
  repeatType,
  repeatDay,
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
    <section className="goal-card" key={goalId} onClick={handleClick}>
      <header className="goal-card__header">
        <h2 className="goal-card__title">{goalName}</h2>
      </header>
      {description && <p className="goal-card__description">Desc: {description}</p>}
      {repeatType && repeatType !== "none" && (
        <p className="goal-card__repeatDay">Repeats: {goalRepeats()}</p>
      )}
    </section>
  );
};

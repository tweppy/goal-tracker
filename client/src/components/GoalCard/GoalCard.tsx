import { useLocation, useNavigate } from "react-router-dom";
import dayjs from "dayjs";

interface GoalCardProps {
  goalId: string;
  goalName: string;
  description?: string;
  dueDate?: string;
  repeatType?: string;
  repeatDay?: number[] | string;
}

export const GoalCard: React.FC<GoalCardProps> = ({
  goalId,
  goalName,
  description,
  dueDate,
  repeatType,
  repeatDay,
}) => {
  const navigate = useNavigate();
  
  const { pathname } = useLocation();

  const handleClick = () => {
    navigate(`${pathname}/${goalId}`);
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
    <section className="goal" key={goalId} onClick={handleClick}>
      <header className="goal__header">
        <h2 className="goal__title">{goalName}</h2>
      </header>
      {description && <p className="goal__description">Desc: {description}</p>}
      {repeatType && repeatType !== "none" && (
        <p className="goal__repeatDay">Repeats: {goalRepeats()}</p>
      )}
      {dueDate && dueDate !== "none" && <p className="goal__dueDate">Due: {dueDate}</p>}
    </section>
  );
};

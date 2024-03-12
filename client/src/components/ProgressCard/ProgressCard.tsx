import "./style.scss";

import { useLocation, useNavigate } from "react-router-dom";

import { CompletedGoal } from "../../interfaces";

interface ProgressCardProps {
  goalId: string;
  goalName: string;
  description?: string;
  completedOn: CompletedGoal[];
  showDetails: boolean;
}

export const ProgressCard = ({
  goalId,
  goalName,
  description,
  completedOn,
  showDetails,
}: ProgressCardProps) => {
  const navigate = useNavigate();

  const { pathname } = useLocation();
  console.log(pathname);

  const handleClick = () => {
    !pathname.includes(goalId) ? navigate(`${pathname}/${goalId}`) : "";
  };

  return (
    <section className="progress-card" key={goalId} onClick={handleClick}>
      <header className="progress-card__header">
        <h2 className="progress-card__title">{goalName}</h2>
      </header>
      {description && <p className="progress-card__description">Description: {description}</p>}
      {showDetails === true && completedOn && (
        <section className="progress-card__completed-on">
          <p className="completed-on__title">Completed On:</p>
          <ul className="completed-on__dates">
            {completedOn.map((goal, index) => (
              <li key={index}>{goal.completedOn}</li>
            ))}
          </ul>
        </section>
      )}
    </section>
  );
};

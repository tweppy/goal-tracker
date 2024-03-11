import { useLocation, useNavigate } from "react-router-dom";

interface Card {
  id: string;
  title: string;
  desc?: string;
}

export const GoalCard = ({ id, title, desc }: Card) => {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const handleClick = (id: string) => {
    navigate(`${pathname}/${id}`); 
  };

  return (
    <section className="goal" key={id} onClick={() => handleClick(id)}>
      <h2 className="goal__title">{title}</h2>
      <p className="goal__description">desc: {desc}</p>
    </section>
  );
};

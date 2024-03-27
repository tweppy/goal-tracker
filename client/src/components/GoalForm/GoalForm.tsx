/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";

import { useEffect, useState } from "react";

import { repeatDayOptions, repeatTypeOptions } from "./data/options";
import { Goal } from "../../interfaces";
import { Select } from "../Select/Select";
import { Input } from "../Input/Input";
import { Button, ButtonType } from "../Button/Button";

export interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
  initialGoal?: Goal;
  heading: string;
}

export const GoalForm = ({ onSubmit, initialGoal, heading }: GoalFormProps) => {
  const [goalData, setGoalData] = useState<Goal>({
    goalName: "",
    description: "",
    repeatType: "",
    repeatDay: [],
  });

  useEffect(() => {
    if (initialGoal) {
      const { userId, goalId, ...goalBodyWithoutIds } = initialGoal;
      setGoalData(goalBodyWithoutIds);
    }
  }, [initialGoal]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    let repeatDayArray: number[] = [...(goalData.repeatDay ?? [])];

    if (name === "repeatType" && value !== "weekly") {
      const selectedOption = repeatTypeOptions.find(option => option.value === value);
      repeatDayArray = selectedOption ? selectedOption.dayValue || [] : [];
    } else if (name === "repeatDay" && goalData.repeatType === "weekly") {
      repeatDayArray = [parseInt(value)];
    }

    const updatedGoalData = {
      ...goalData,
      [name]: value,
      repeatDay: repeatDayArray,
    };

    setGoalData(updatedGoalData);
  };

  const handleSubmit = async () => {
    try {
      onSubmit(goalData);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <section className="goal-form">
      <h2 className="goal-form__heading">{heading}</h2>
      <section className="goal-form__inputs">
        <Input
          label="Goal Name"
          type="text"
          id="goalName"
          name="goalName"
          placeholder="Goal name"
          value={goalData.goalName}
          onChange={handleChange}
        />

        <Input
          label="Description"
          type="text"
          id="description"
          name="description"
          placeholder="Description"
          value={goalData.description || ""}
          onChange={handleChange}
        />

        <Select
          id="repeatType"
          name="repeatType"
          label="Repeat Type"
          value={goalData.repeatType || "none"}
          selectOptions={repeatTypeOptions}
          onChange={handleChange}
        />

        <Select
          id="repeatDay"
          name="repeatDay"
          label="Repeat Day (weekly only)"
          value={goalData.repeatType !== "weekly" ? "" : goalData.repeatDay?.[0]}
          disabled={goalData.repeatType !== "weekly"}
          selectOptions={repeatDayOptions}
          onChange={handleChange}
        />
      </section>

      <Button type={ButtonType.default} onClick={handleSubmit}>
        {initialGoal ? "Update Goal" : "Create Goal"}
      </Button>
    </section>
  );
};

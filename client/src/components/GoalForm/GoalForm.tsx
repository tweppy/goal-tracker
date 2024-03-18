/* eslint-disable @typescript-eslint/no-unused-vars */
import "./style.scss";

import { useEffect, useState } from "react";

import { repeatDayOptions, repeatTypeOptions } from "./data/options";
import { Goal } from "../../interfaces";
import { Select } from "../Select/Select";
import { Input } from "../Input/Input";

export interface GoalFormProps {
  onSubmit: (goal: Goal) => void;
  initialGoal?: Goal;
}

export const GoalForm = ({ onSubmit, initialGoal }: GoalFormProps) => {
  const [showDate, setShowDate] = useState<boolean>(false);
  const [goalData, setGoalData] = useState<Goal>({
    goalName: "",
    description: "",
    dueDate: "",
    repeatType: "",
    repeatDay: [],
  });

  useEffect(() => {
    if (initialGoal) {
      const { userId, goalId, ...goalBodyWithoutIds } = initialGoal;
      setGoalData(goalBodyWithoutIds);
    }
  }, [initialGoal]);

  console.log(goalData);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;

    console.log(goalData);

    let repeatDayArray: number[] = [...(goalData.repeatDay ?? [])];

    if (name === "repeatType" && value !== "weekly") {
      const selectedOption = repeatTypeOptions.find(option => option.value === value);
      repeatDayArray = selectedOption ? selectedOption.dayValue || [] : [];
    } else if (name === "repeatDay" && goalData.repeatType === "weekly") {
      repeatDayArray = [parseInt(value)];
    }

    if (showDate) {
      goalData.dueDate = value;
      goalData.repeatType = "none";
      repeatDayArray = [];
    } else {
      goalData.dueDate = "none";
    }

    const updatedGoalData = {
      ...goalData,
      [name]: value,
      repeatDay: repeatDayArray,
    };

    setGoalData(updatedGoalData);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    try {
      e.preventDefault();
      onSubmit(goalData);
      setTimeout(() => {
        window.location.reload();
        // ughg
      }, 2000);
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <form className="goal-form" onSubmit={handleSubmit}>
      <Input
        type="text"
        id="goalName"
        name="goalName"
        placeholder="Goal name"
        value={goalData.goalName}
        onChange={handleChange}
      />

      <Input
        type="text"
        id="description"
        name="description"
        placeholder="Description"
        value={goalData.description || ""}
        onChange={handleChange}
      />

      <button type="button" onClick={() => setShowDate(prevShowDate => !prevShowDate)}>
        {showDate ? "Hide Due Date" : "Select Due Date"}
      </button>

      {showDate && (
        <Input
          type="date"
          id="dueDate"
          name="dueDate"
          value={goalData.dueDate}
          onChange={handleChange}
        />
      )}

      <Select
        id="repeatType"
        name="repeatType"
        label="Repeat Type"
        value={goalData.repeatType || 8}
        disabled={showDate}
        selectOptions={repeatTypeOptions}
        onChange={handleChange}
      />

      <Select
        id="repeatDay"
        name="repeatDay"
        label="Repeat Day"
        value={goalData.repeatDay?.[0] || ""}
        disabled={goalData.repeatType !== "weekly" || showDate}
        selectOptions={repeatDayOptions}
        onChange={handleChange}
      />

      <button type="submit">{initialGoal ? "Update Goal" : "Create Goal"}</button>
    </form>
  );
};

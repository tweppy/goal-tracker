import "./style.scss";

import { useState } from "react";
import { Select } from "../Select/Select";
import { submitBodyToApi } from "../../services/api";
import { repeatDayOptions, repeatTypeOptions } from "./data/options";
import { Input } from "../Input/Input";

export const GoalForm = () => {
  const [goalName, setGoalName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [dueDate, setDueDate] = useState<string>("");
  const [repeatType, setRepeatType] = useState<string>("");
  const [repeatDay, setRepeatDay] = useState<number[]>([]);
  const [showDate, setShowDate] = useState<boolean>(false);

  const createGoal = async () => {
    try {
      let repeatDayArray: number[] = [];

      if (repeatType === "weekly") {
        repeatDayArray = repeatDay;
      } else {
        const selectedOption = repeatTypeOptions.find(option => option.value === repeatType);
        repeatDayArray = selectedOption ? selectedOption.dayValue || [] : [];
      }

      const dataToSend = {
        goalName,
        description,
        dueDate: !showDate ? "none" : dueDate,
        repeatDay: repeatDayArray,
        repeatType,
      };

      const response = await submitBodyToApi({ data: dataToSend, method: "POST", link: "/goals" });

      if (response.success) {
        console.log("Success");
        setGoalName("");
        setDescription("");
        setDueDate("");
        setRepeatDay([]);
        setRepeatType("");
      } else {
        console.log("Failed:", response.message);
      }
    } catch (error) {
      console.error("Error creating goal:", error);
    }
  };

  return (
    <section className="login-form">
      <Input
        type="text"
        id="goalName"
        placeholder="Goal name"
        value={goalName}
        onChange={goalName => {
          setGoalName(goalName);
        }}
      />

      <Input
        type="text"
        id="description"
        placeholder="Description"
        value={description}
        onChange={description => {
          setDescription(description);
        }}
      />

      <button onClick={() => setShowDate(prevShowDate => !prevShowDate)}>
        {showDate ? "Hide Due Date" : "Select Due Date"}
      </button>

      {showDate && (
        <input
          type="date"
          name="dueDate"
          id="dueDate"
          value={dueDate}
          onChange={e => setDueDate(e.target.value)}
        />
      )}

      <Select
        id="repeatType"
        label="Repeat Type"
        disabled={showDate}
        selectOptions={repeatTypeOptions}
        onChange={option => setRepeatType(option.value as string)}
      />

      <Select
        id="repeatDay"
        label="Repeat Day"
        disabled={repeatType !== "weekly" || showDate}
        selectOptions={repeatDayOptions}
        onChange={option => setRepeatDay([Number(option.value)])}
      />

      <button onClick={createGoal}>submit</button>
    </section>
  );
};

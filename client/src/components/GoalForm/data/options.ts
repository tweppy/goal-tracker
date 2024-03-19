import { SelectOptionProps } from "../../Select/Select";

export const repeatDayOptions: SelectOptionProps[] = [
  {
    hidden: true,
    text: "Select a day",
    value: 8,
  },
  {
    text: "Mondays",
    value: 1,
  },
  {
    text: "Tuesdays",
    value: 2,
  },
  {
    text: "Wednesdays",
    value: 3,
  },
  {
    text: "Thursdays",
    value: 4,
  },
  {
    text: "Fridays",
    value: 5,
  },
  {
    text: "Saturdays",
    value: 6,
  },
  {
    text: "Sundays",
    value: 0,
  },
];

export const repeatTypeOptions: SelectOptionProps[] = [
  {
    hidden: true,
    text: "Select when to repeat",
    value: "none",
  },
  {
    text: "daily",
    value: "daily",
    dayValue: [0, 1, 2, 3, 4, 5, 6],
  },
  {
    text: "weekly",
    value: "weekly",
  },
  {
    text: "weekdays",
    value: "weekdays",
    dayValue: [1, 2, 3, 4, 5],
  },
  {
    text: "weekends",
    value: "weekends",
    dayValue: [0, 6],
  },
];

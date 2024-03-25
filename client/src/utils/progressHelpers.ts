import dayjs from "dayjs";
import isSameOrAfter from "dayjs/plugin/isSameOrAfter";
import isSameOrBefore from "dayjs/plugin/isSameOrBefore";
import isBetween from "dayjs/plugin/isBetween";
import IsoWeek from "dayjs/plugin/IsoWeek";
dayjs.extend(isSameOrBefore);
dayjs.extend(isSameOrAfter);
dayjs.extend(IsoWeek);
dayjs.extend(isBetween);

import { CompletedGoal } from "../interfaces";

export const days = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];

export const getWeekDates = () => {
  const today = dayjs();
  const startOfWeek = today.startOf("isoWeek");
  const endOfWeek = today.endOf("isoWeek");

  const formattedStartOfWeek = startOfWeek.format("ddd D MMMM");
  const formattedEndOfWeek = endOfWeek.format("ddd D MMMM");

  const currentWeekRange = `${formattedStartOfWeek} - ${formattedEndOfWeek}`;

  return currentWeekRange;
};

export const calculateProgress = (completedOn: CompletedGoal[], repeatType: string): number => {
  const weekStart = dayjs().startOf("isoWeek").format("YYYY-MM-DD");
  const weekEnd = dayjs().endOf("isoWeek").format("YYYY-MM-DD");

  const progressDates = completedOn
    .filter(goal => dayjs(goal.completedOn.toString()).isBetween(weekStart, weekEnd, "day", "[]"))
    .map(goal => dayjs(goal.completedOn.toString()).format("YYYY-MM-DD"));

  let totalDaysInWeek = 7;

  switch (repeatType) {
    case "weekly":
      totalDaysInWeek = 1;
      break;
    case "weekdays":
      totalDaysInWeek = 5;
      break;
    case "weekends":
      totalDaysInWeek = 2;
      break;
    case "daily":
      totalDaysInWeek = 7;
      break;
    default:
      break;
  }

  const progressPercentage = (progressDates.length / totalDaysInWeek) * 100;

  const roundedProgress = Math.round(progressPercentage);

  return roundedProgress;
};

export const calculateProgressForPreviousWeek = (
  completedOn: CompletedGoal[],
  repeatType: string,
): number => {
  const startOfPreviousWeek = dayjs().subtract(1, "week").startOf("isoWeek").format("YYYY-MM-DD");
  const endOfPreviousWeek = dayjs().subtract(1, "week").endOf("isoWeek").format("YYYY-MM-DD");

  const progressDates = completedOn
    .filter(goal =>
      dayjs(goal.completedOn.toString()).isBetween(
        startOfPreviousWeek,
        endOfPreviousWeek,
        "day",
        "[]",
      ),
    )
    .map(goal => dayjs(goal.completedOn.toString()).format("YYYY-MM-DD"));

  let totalDaysInWeek = 7;

  switch (repeatType) {
    case "weekly":
      totalDaysInWeek = 1;
      break;
    case "weekdays":
      totalDaysInWeek = 5;
      break;
    case "weekends":
      totalDaysInWeek = 2;
      break;
    case "daily":
      totalDaysInWeek = 7;
      break;
    default:
      break;
  }

  const progressPercentage = (progressDates.length / totalDaysInWeek) * 100;

  const roundedProgress = Math.round(progressPercentage);

  return roundedProgress;
};

export const filterDaysByRepeatType = (repeatType: string, day: string): boolean => {
  switch (repeatType) {
    case "weekdays":
      return days.slice(0, 5).includes(day);
    case "weekends":
      return days.slice(5).includes(day);
    case "daily":
      return true;
    case "weekly":
      return day === dayjs().format("dddd");
    default:
      return true;
  }
};

export interface ResponseBody {
  success: boolean;
  message: string;
  body?: object | string;
}

export interface User {
  userID: string;
  username: string;
  email: string;
  password: string;
}

export interface Goal {
  goalID: string;
  userID: string;
  goalName: string;
  description: string;
  dueDate?: string | null;
  repeatType: "daily" | "weekly" | "weekdays" | "weekends" | "none";
}

export interface CompletedGoal {
  completedGoalID: string;
  goalID: string;
  userID: string;
  completionDate: string;
}

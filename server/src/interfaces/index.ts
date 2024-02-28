export interface ResponseBody {
  success: boolean;
  message: string;
  body?: object | string;
}

export interface User {
  userId: string;
  username: string;
  email: string;
  password: string;
}

export interface Goal {
  goalId: string;
  userId: string;
  goalName: string;
  description: string;
  dueDate?: string | null;
  repeatType: "daily" | "weekly" | "weekdays" | "weekends" | "none";
}

export interface CompletedGoal {
  completedGoalId: string;
  goalId: string;
  userId: string;
  completionDate: string;
}

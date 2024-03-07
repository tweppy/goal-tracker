export interface ApiSubmission {
  data?: object;
  method: string;
  link: string;
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
  description?: string;
  dueDate: string;
  repeatType: string;
  repeatDay: number[] | string;
}

export interface CompletedGoal {
  goalId: string;
  userId: string;
  completionDate: string;
  goalName: string;
  description?: string;
}

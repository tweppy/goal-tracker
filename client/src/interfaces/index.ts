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

export interface UserCredentials {
  username: string;
  password: string;
}

export interface Goal {
  goalId?: string;
  userId?: string;
  goalName: string;
  description?: string;
  repeatType: string;
  repeatDay: number[];
}

export interface CompletedGoal {
  userId: string;
  goalId: string;
  goalName: string;
  repeatType: string;
  description?: string;
  completedOn: string[];
}

import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { GoalsPage } from "../pages/goals/GoalsPage";
import { GoalViewPage } from "../pages/goal-view/GoalViewPage";
import { LoginPage } from "../pages/login/LoginPage";
import { SignupPage } from "../pages/signup/SignupPage";
import { ProgressPage } from "../pages/progress/ProgressPage";
import { ProgressGoalViewPage } from "../pages/progress-goal/ProgressGoalViewPage";
import { TodayPage } from "../pages/today/TodayPage";
import { TodayGoalViewPage } from "../pages/today-goal/TodayGoalViewPage";
import { HomePage } from "../pages/home/HomePage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/login",
    element: <LoginPage />,
  },
  {
    path: "/signup",
    element: <SignupPage />,
  },
  {
    path: "/goals",
    element: <GoalsPage />,
  },
  {
    path: "/goals/:id",
    element: <GoalViewPage />,
  },
  {
    path: "/today",
    element: <TodayPage />,
  },
  {
    path: "/today/:id",
    element: <TodayGoalViewPage />,
  },
  {
    path: "/progress",
    element: <ProgressPage />,
  },
  {
    path: "/progress/:id",
    element: <ProgressGoalViewPage />,
  },
  {
    path: "*",
    element: <p>Page Not Found</p>,
  },
]);

export const AppRoutes = () => {
  return <RouterProvider router={router} />;
};

import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";

import { GoalViewPage } from "../pages/goal-view/GoalViewPage";
import { GoalsPage } from "../pages/goals/GoalsPage";
import { HomePage } from "../pages/home/HomePage";
import { LoginPage } from "../pages/login/LoginPage";
import { ProgressGoalViewPage } from "../pages/progress-goal/ProgressGoalViewPage";
import { ProgressPage } from "../pages/progress/ProgressPage";
import { SignupPage } from "../pages/signup/SignupPage";
import { TodayGoalViewPage } from "../pages/today-goal/TodayGoalViewPage";
import { TodayPage } from "../pages/today/TodayPage";

const PrivateWrapper = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

const LoggedInWrapper = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/today" /> : <Outlet />;
};

const NotFoundPage = () => {
  return <div>404 Not Found</div>;
};

export const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route element={<LoggedInWrapper />}>
          <Route path="/" element={<HomePage />} />
        </Route>
        <Route element={<LoggedInWrapper />}>
          <Route path="/signup" element={<SignupPage />} />
        </Route>
        <Route element={<LoggedInWrapper />}>
          <Route path="/login" element={<LoginPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/goals" element={<GoalsPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/goals" element={<GoalsPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/goals/:id" element={<GoalViewPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/today" element={<TodayPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/today/:id" element={<TodayGoalViewPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/goals" element={<GoalsPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/progress" element={<ProgressPage />} />
        </Route>
        <Route element={<PrivateWrapper />}>
          <Route path="/progress/:id" element={<ProgressGoalViewPage />} />
        </Route>
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </BrowserRouter>
  );
};

import "./App.scss";

import { BrowserRouter, Navigate, Outlet, Route, Routes } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { GoalsPage } from "./pages/goals/GoalsPage";
import { LoginPage } from "./pages/login/LoginPage";
import { SignupPage } from "./pages/signup/SignupPage";
import { HomePage } from "./pages/home/HomePage";
import { GoalViewPage } from "./pages/goal-view/GoalViewPage";
import { TodayPage } from "./pages/today/TodayPage";
import { TodayGoalViewPage } from "./pages/today-goal/TodayGoalViewPage";
import { ProgressPage } from "./pages/progress/ProgressPage";
import { ProgressGoalViewPage } from "./pages/progress-goal/ProgressGoalViewPage";

const PrivateWrapper = () => {
  const token = localStorage.getItem("token");
  return token ? <Outlet /> : <Navigate to="/" />;
};

const LoggedInWrapper = () => {
  const token = localStorage.getItem("token");
  return token ? <Navigate to="/today" /> : <Outlet />;
};

function App() {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<HomePage />} />
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
        </Routes>
      </BrowserRouter>
      <Toaster />
    </div>
  );
}

export default App;
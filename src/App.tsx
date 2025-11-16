import { Route, Routes } from "react-router";
import RootLayout from "./layouts/RootLayout";
import PublicLayout from "./layouts/PublicLayout";
import AdminLayout from "./layouts/AdminLayout";
import AuthLayout from "./layouts/AuthLayout";
import HomePage from "./pages/public/HomePage";
import DashboardPage from "./pages/admin/DashboardPage";
import ProfilePage from "./pages/admin/ProfilePage";
import ChatPage from "./pages/admin/ChatPage";
import LoginPage from "./pages/auth/LoginPage";
import RegisterPage from "./pages/auth/RegisterPage";
import NotFoundPage from "./pages/public/NotFoundPage";
import TasksPage from "./pages/admin/TasksPage";

const App = () => {
  return (
    <Routes>
      <Route element={<RootLayout />}>
        {/* Public */}
        <Route element={<PublicLayout />}>
          <Route index element={<HomePage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Route>

        {/* Admin */}
        <Route path="admin" element={<AdminLayout />}>
          <Route index element={<DashboardPage />} />
          <Route path="profile" element={<ProfilePage />} />
          <Route path="chat" element={<ChatPage />} />
          <Route path="tasks" element={<TasksPage />} />
        </Route>

        {/* Auth */}
        <Route path="auth" element={<AuthLayout />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Route>
    </Routes>
  );
};

export default App;

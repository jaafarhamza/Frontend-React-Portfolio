import { createBrowserRouter } from "react-router-dom";

// Public Pages
import HomePage from "@/pages/public/HomePage";
import ProjectsPage from "@/pages/public/ProjectsPage";
import SkillsPage from "@/pages/public/SkillsPage";
import ExperiencePage from "@/pages/public/ExperiencePage";

// Admin Pages
import LoginPage from "@/pages/admin/LoginPage";
import DashboardPage from "@/pages/admin/DashboardPage";
import ProfileManagementPage from "@/pages/admin/ProfileManagementPage";
import ProjectsManagementPage from "@/pages/admin/ProjectsManagementPage";
import SkillsManagementPage from "@/pages/admin/SkillsManagementPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { env } from "@/config/env";
import { ApolloJWTTest } from "@/components/test/ApolloJWTTest";

// Create router configuration
export const router = createBrowserRouter([
  // Public Routes
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/projects",
    element: <ProjectsPage />,
  },
  {
    path: "/skills",
    element: <SkillsPage />,
  },
  {
    path: "/experience",
    element: <ExperiencePage />,
  },

  // Admin Routes
  {
    path: "/admin/login",
    element: <LoginPage />,
  },
  {
    path: "/admin/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/profile",
    element: (
      <ProtectedRoute>
        <ProfileManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/projects",
    element: (
      <ProtectedRoute>
        <ProjectsManagementPage />
      </ProtectedRoute>
    ),
  },
  {
    path: "/admin/skills",
    element: (
      <ProtectedRoute>
        <SkillsManagementPage />
      </ProtectedRoute>
    ),
  },
  ...(env.isDevelopment
    ? [
        {
          path: "/test-apollo",
          element: <ApolloJWTTest />,
        },
      ]
    : []),

  // 404 Not Found
  {
    path: "*",
    element: (
      <div className="min-h-screen flex items-center justify-center bg-gray-50">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-gray-800 mb-4">404</h1>
          <p className="text-xl text-gray-600 mb-8">Page not found</p>
          <a
            href="/"
            className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-lg shadow-md transition-all inline-block"
          >
            Go Home
          </a>
        </div>
      </div>
    ),
  },
]);

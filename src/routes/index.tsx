import { createBrowserRouter } from "react-router-dom";
import { ScrollLayout } from "@/components/layout/ScrollLayout";

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
// Test Pages
import { ApolloJWTTest } from "@/components/test/ApolloJWTTest";
import TestStatesPage from "@/components/test/TestStatesPage";
import NotFoundPage from "@/pages/NotFoundPage";

// Create router configuration
export const router = createBrowserRouter([
  // Public Routes - Scroll Layout
  {
    path: "/",
    element: (
      <ScrollLayout>
        <div data-route="/"><HomePage /></div>
        <div data-route="/projects"><ProjectsPage /></div>
        <div data-route="/skills"><SkillsPage /></div>
        <div data-route="/experience"><ExperiencePage /></div>
      </ScrollLayout>
    ),
  },
  {
    path: "/projects",
    element: (
      <ScrollLayout>
        <div data-route="/"><HomePage /></div>
        <div data-route="/projects"><ProjectsPage /></div>
        <div data-route="/skills"><SkillsPage /></div>
        <div data-route="/experience"><ExperiencePage /></div>
      </ScrollLayout>
    ),
  },
  {
    path: "/skills",
    element: (
      <ScrollLayout>
        <div data-route="/"><HomePage /></div>
        <div data-route="/projects"><ProjectsPage /></div>
        <div data-route="/skills"><SkillsPage /></div>
        <div data-route="/experience"><ExperiencePage /></div>
      </ScrollLayout>
    ),
  },
  {
    path: "/experience",
    element: (
      <ScrollLayout>
        <div data-route="/"><HomePage /></div>
        <div data-route="/projects"><ProjectsPage /></div>
        <div data-route="/skills"><SkillsPage /></div>
        <div data-route="/experience"><ExperiencePage /></div>
      </ScrollLayout>
    ),
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
        {
          path: "/test-states",
          element: <TestStatesPage />,
        },
      ]
    : []),

  // 404 Not Found
  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

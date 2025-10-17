import { createFileRoute } from "@tanstack/react-router";
import DashboardPage from "../module/admin/pages/DashboardPage";

export const Route = createFileRoute("/")({
  component: DashboardPage,
});

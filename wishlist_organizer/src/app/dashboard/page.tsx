import { getSessionUser } from "../../../utils/auth";
import { redirect } from "next/navigation";
import DashboardView from "./DashboardView";

export default async function DashboardPage() {
  const user = await getSessionUser();

  if (!user) {
    redirect("/signin");
  }

  return <DashboardView user={user} />;
}

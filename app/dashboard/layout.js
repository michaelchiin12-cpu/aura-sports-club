import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabaseServer";
import Sidebar from "@/components/Sidebar";

export default async function DashboardLayout({ children }) {
  const supabase = createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) redirect("/login");

  return (
    <div className="min-h-screen bg-ink flex flex-col md:flex-row">
      <Sidebar email={user.email} />
      <main className="flex-1 bg-ink bg-aura-glow p-6 md:p-10">{children}</main>
    </div>
  );
}

import { redirect } from "next/navigation";
import { createServerSupabase } from "@/lib/supabase-server";
import Sidebar from "@/komponen/Sidebar";
import MenuMengambang from "@/komponen/MenuMengambang";

export default async function AppLayout({ children }) {
  const supabase = createServerSupabase();
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) redirect("/masuk");

  const nama = user.user_metadata?.full_name || "Member";

  return (
    <div className="min-h-screen bg-ink flex">
      <Sidebar nama={nama} />
      <main className="flex-1 bg-ink bg-aura-glow p-6 md:p-10 pb-24 md:pb-10">
        {children}
      </main>
      <MenuMengambang />
    </div>
  );
}

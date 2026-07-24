import PageHeader from "@/components/common/PageHeader";
import StatCard from "@/components/dashboard/StatCard";

export default function DashboardPage() {
  return (
    <>

      <PageHeader
        title="Dashboard"
        subtitle="Aura Sports Club Management System"
      />

      <div className="dashboard-grid">

        <StatCard
          title="Total Member"
          value="0"
        />

        <StatCard
          title="Absensi Hari Ini"
          value="0"
        />

        <StatCard
          title="Pertandingan"
          value="0"
        />

        <StatCard
          title="Turnamen"
          value="0"
        />

      </div>

    </>
  );
}
import Card from "../ui/Card";

export default function StatCard({
  title,
  value,
}) {
  return (
    <Card
      title={title}
      value={value}
    />
  );
}
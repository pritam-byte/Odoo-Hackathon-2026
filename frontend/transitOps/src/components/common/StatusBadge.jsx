const statusStyles = {
  Available: "bg-green-50 text-green-700",
  "On Trip": "bg-blue-50 text-blue-700",
  "In Shop": "bg-orange-50 text-orange-700",
  Retired: "bg-slate-100 text-slate-500",
};

const dotStyles = {
  Available: "bg-green-500",
  "On Trip": "bg-blue-500",
  "In Shop": "bg-orange-500",
  Retired: "bg-slate-400",
};

export default function StatusBadge({ status }) {
  const style = statusStyles[status] || "bg-slate-100 text-slate-600";
  const dot = dotStyles[status] || "bg-slate-400";

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-sm font-medium ${style}`}
    >
      <span className={`w-1.5 h-1.5 rounded-full ${dot}`} />
      {status}
    </span>
  );
}
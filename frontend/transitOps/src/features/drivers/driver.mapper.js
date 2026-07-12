const COLOR_OPTIONS = [
  "bg-blue-100 text-blue-700",
  "bg-purple-100 text-purple-700",
  "bg-green-100 text-green-700",
  "bg-amber-100 text-amber-700",
  "bg-teal-100 text-teal-700",
];

// must match your Prisma enum values exactly — check schema.prisma
const STATUS_LABELS = {
  AVAILABLE: "Available",
  ON_TRIP: "On Trip",
  SUSPENDED: "Suspended",
};

function getInitials(name) {
  return name
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((n) => n[0]?.toUpperCase())
    .join("");
}

export function apiDriverToUiDriver(apiDriver) {
  const expiry = apiDriver.licenseExpiryDate?.slice(0, 10);
  const warning = expiry
    ? new Date(expiry) < new Date(Date.now() + 90 * 24 * 60 * 60 * 1000)
    : false;

  return {
    id: apiDriver.id,
    initials: getInitials(apiDriver.name),
    name: apiDriver.name,
    license: apiDriver.licenseNumber,
    category: apiDriver.licenseCategory,
    expiry,
    score: apiDriver.safetyScore,
    status: STATUS_LABELS[apiDriver.status] || apiDriver.status,
    color: COLOR_OPTIONS[Math.floor(Math.random() * COLOR_OPTIONS.length)],
    warning,
  };
}
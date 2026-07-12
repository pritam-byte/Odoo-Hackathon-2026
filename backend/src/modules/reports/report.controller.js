const asyncHandler = require("../../utils/async-handler");
const reportService = require("./report.service");

const fuelEfficiency = asyncHandler(async (req, res) => {
  const report = await reportService.getFuelEfficiency();

  res.json({
    success: true,
    data: report,
  });
});

const vehicleCosts = asyncHandler(async (req, res) => {
  const vehicles = await reportService.getVehicleCosts();

  res.json({
    success: true,
    data: { vehicles },
  });
});

const exportVehicleCosts = asyncHandler(async (req, res) => {
  const rows = await reportService.getVehicleCosts();

  const keys = [
    "registrationNo",
    "name",
    "model",
    "status",
    "revenue",
    "fuelCost",
    "maintenanceCost",
    "otherExpenseCost",
    "operationalCost",
    "fuelEfficiency",
    "roi",
  ];

  const quote = (value) => {
    return `"${String(value ?? "").replaceAll('"', '""')}"`;
  };

  const csv = [
    keys.join(","),

    ...rows.map((row) => {
      return keys.map((key) => quote(row[key])).join(",");
    }),
  ].join("\n");

  res.header("Content-Type", "text/csv");
  res.attachment("vehicle-cost-report.csv");
  res.send(csv);
});

module.exports = {
  fuelEfficiency,
  vehicleCosts,
  exportVehicleCosts,
};
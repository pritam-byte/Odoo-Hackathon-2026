const vehicles = [
  { registrationNo: "TRN-9821", name: "Volvo 9700", model: "Volvo 9700", type: "Coach", region: "North", maxLoadCapacity: 5300, acquisitionCost: 150000 },
  { registrationNo: "TRN-7543", name: "Mercedes-Benz Sprinter", model: "Mercedes-Benz Sprinter", type: "Minibus", region: "South", maxLoadCapacity: 2500, acquisitionCost: 45000 },
  { registrationNo: "TRN-3317", name: "MAN Lion's City", model: "MAN Lion's City", type: "City Bus", region: "East", maxLoadCapacity: 8500, acquisitionCost: 220000 },
  { registrationNo: "TRN-6629", name: "DAF LF 250", model: "DAF LF 250", type: "Box Truck", region: "West", maxLoadCapacity: 7500, acquisitionCost: 85000 },
  { registrationNo: "TRN-1198", name: "Scania K280UB", model: "Scania K280UB", type: "City Bus", region: "North", maxLoadCapacity: 7300, acquisitionCost: 210000 },
  { registrationNo: "TRN-5572", name: "Ford Transit", model: "Ford Transit", type: "Minibus", region: "South", maxLoadCapacity: 1600, acquisitionCost: 35000 }
];

const drivers = [
  { name: "John Davis", licenseNumber: "D1234567", licenseCategory: "Class B", licenseExpiryDate: "2026-06-15", contactNumber: "555-0101" },
  { name: "Sarah Martinez", licenseNumber: "D2345678", licenseCategory: "Class B", licenseExpiryDate: "2025-08-02", contactNumber: "555-0102" },
  { name: "Robert Wilson", licenseNumber: "D3456789", licenseCategory: "Class A", licenseExpiryDate: "2025-06-05", contactNumber: "555-0103" },
  { name: "Jessica Lee", licenseNumber: "D4567890", licenseCategory: "Class B", licenseExpiryDate: "2025-06-01", contactNumber: "555-0104" },
  { name: "David Miller", licenseNumber: "D5678901", licenseCategory: "Class A", licenseExpiryDate: "2025-05-25", contactNumber: "555-0105" },
  { name: "Karen White", licenseNumber: "D6789012", licenseCategory: "Class B", licenseExpiryDate: "2026-07-20", contactNumber: "555-0106" }
];

async function seed() {
  for (const v of vehicles) {
    const res = await fetch("http://localhost:5001/api/vehicles", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(v)
    });
    const text = await res.text();
    console.log("Seeded vehicle", v.registrationNo, res.status, text);
  }
  for (const d of drivers) {
    const res = await fetch("http://localhost:5001/api/drivers", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(d)
    });
    const text = await res.text();
    console.log("Seeded driver", d.name, res.status, text);
  }
}

seed().then(() => console.log("Done seeding."));

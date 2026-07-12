const fetch = require('node-fetch');
async function test() {
  const res = await fetch('http://localhost:5000/api/drivers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json', 'Cookie': 'token=test' },
    body: JSON.stringify({
      name: 'John Doe',
      licenseNumber: 'D123456',
      licenseCategory: 'Class A',
      licenseExpiryDate: '2026-06-15',
      contactNumber: '1234567890',
      safetyScore: 100
    })
  });
  console.log(await res.text());
}
test();

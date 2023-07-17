const liabilities = [
  {
    _id: "6386b48e68e317cc562b89e3",
    branchId: "637097f0535529a3a57e933e",
    userId: "626d37e0187c30ab0f611ce5",
    fsId: 16,
    vendorId: "637097f0535529a3a57e952e", // who received the paymeny
    amount: 5000,
    due: "12/15/2022",
    isCash: false,
    range: ["10/1/2023", "10/30/2022"],
    remark: "SOA sample",
  },
  {
    _id: "6386b48e68e317cc562b89e2",
    branchId: "637097f0535529a3a57e933e",
    userId: "626d37e0187c30ab0f611ce5",
    fsId: 3,
    particular: "626d37e0187c30ab0f611ce5", // who received the paymeny
    amount: 500,
    due: "12/15/2023",
    isCash: true,
    remark: "cash Advance sample",
  },
];

module.exports = liabilities;

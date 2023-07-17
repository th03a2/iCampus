const payments = [
  {
    branchId: "637097f0535529a3a57e933e",
    userId: "636d37e0187c30ab0f611ce2",
    particular: "636d37e0187c30ab0f611ce2",
    fsId: "6386b53299b1f47016967944",
    category: "salary", //Pay Slip
    issue: "12/2/2022",
    issueId: "636d37e0187c30ab0f611ce2",
    amount: 5500,
    isCash: true,
    breakdown: {
      income: {
        overtime: { number: 1, type: "Days" },
        rate: 0,
        holiday: 500,
        bonus: 5000,
        cola: 0,
      },
      Deduction: {
        absent: 0,
        ca: 0,
        sss: 0,
        philhealth: 0,
        loan: 0,
      },
      net: 5500,
    },
    remarks: "salary payment sample",
  },
  {
    branchId: "637097f0535529a3a57e933e",
    userId: "636d37e0187c30ab0f611ce2",
    vendorId: "63868f9eb794e1250ea6e3d3",
    liabilityId: "63868f9eb794e1250ea6e3d3",
    fsId: "6386b53299b1f47016967944",
    category: "liability",
    cheque: 500,
    issue: "12/2/2022",
    issueId: "636d37e0187c30ab0f611ce2",
    amount: 5500,
    isCash: false,
    remarks: "liability payment sample",
  },
];

module.exports = payments;

const sales = [
  {
    // inhouse only
    _id: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "638dbb343d534df590afca50", // Peter Juan
    cashierId: "636d37e0187c30ab0f611ce4",
    category: "opd",
    payment: "cash",
    amount: 900,
    cash: 1000,
    discount: 0,
    isPickup: true,
    hasResult: true,
    hasArrived: true, // sent
    renderedAt: "12/9/2022, 8:32:56 AM",
    renderedBy: "636d37e0187c30ab0f611ce4",
  },
  {
    // inhouse with sendout
    _id: "6391ae45e64c3135fd1815ff",
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "636d37e0187c30ab0f611ce0", // PAJARILLAGA, Benedict Earle Gabriel Alexander R.
    cashierId: "636d37e0187c30ab0f611ce4", // add subcon with new ID once submitted
    category: "opd",
    payment: "cash",
    amount: 2900,
    cash: 3000,
    discount: 0,
    isPickup: true,
    hasArrived: false, // sent
  },
  {
    // inhouse only
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "638dbb343d534df590afca50", // Peter Juan
    cashierId: "636d37e0187c30ab0f611ce4",
    category: "opd",
    payment: "cash",
    amount: 900,
    cash: 1000,
    discount: 0,
    isPickup: true,
    hasResult: true,
    hasArrived: true, // sent
    createdAt: "12/9/2022, 8:32:56 AM",
    renderedAt: "12/9/2022, 8:32:56 AM",
    renderedBy: "636d37e0187c30ab0f611ce4",
  },
  {
    // inhouse with sendout
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "636d37e0187c30ab0f611ce0", // PAJARILLAGA, Benedict Earle Gabriel Alexander R.
    cashierId: "636d37e0187c30ab0f611ce4", // add subcon with new ID once submitted
    category: "opd",
    payment: "cash",
    amount: 2900,
    cash: 3000,
    discount: 0,
    isPickup: true,
    hasArrived: false, // sent
    createdAt: "6/9/2022, 8:32:56 AM",
  },
  {
    _id: "6391ae45e64c3135fd1816ff",
    branchId: "637097f0535529a3a57e936e", // branch : SC-Carranglan
    customerId: "636d37e0187c30ab0f611ce0", // PAJARILLAGA, Benedict Earle Gabriel Alexander R.
    cashierId: "636d37e0187c30ab0f611ce4", // add subcon with new ID once submitted
    category: "opd",
    payment: "cash",
    amount: 2900,
    cash: 3000,
    discount: 0,
    isPickup: true,
    hasArrived: false, // sent
    createdAt: "5/9/2023, 8:32:56 AM",
  },
  {
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "638dbb343d534df590afca51", // King Kerby Dela Cruz
    cashierId: "636d37e0187c30ab0f611ce4",
    source: "637097f0535529a3a57e936e", // branch : SC-Carranglan
    subcon: "6391ae45e64c3135fd1816ff", // source :sales id
    category: "sc",
    payment: "credit",
    amount: 900,
    isPickup: true,
    hasResult: true,
    createdAt: "4/9/2023, 8:32:56 AM",
  },
  {
    branchId: "637097f0535529a3a57e936e", // branch : SC-Carranglan
    customerId: "636d37e0187c30ab0f611ce0", // PAJARILLAGA, Benedict Earle Gabriel Alexander R.
    cashierId: "636d37e0187c30ab0f611ce4", // add subcon with new ID once submitted
    category: "opd",
    payment: "cash",
    amount: 2900,
    cash: 3000,
    discount: 0,
    isPickup: true,
    hasArrived: false, // sent
  },
  {
    // sendout only
    _id: "63fd9fbcf2ca91bdc98cf93f",
    branchId: "637097f0535529a3a57e933e", // General tinio
    customerId: "638dbb343d534df590afca51", // King Kerby Dela Cruz
    cashierId: "636d37e0187c30ab0f611ce4",
    source: "637097f0535529a3a57e936e", // branch : SC-Carranglan
    subcon: "6391ae45e64c3135fd1816ff", // source :sales id
    category: "sc",
    payment: "credit",
    amount: 900,
    isPickup: true,
    hasResult: true,
  },
  {
    _id: "6391ae45e64c3135fd1815fd",
    branchId: "637097f0535529a3a57e937e", // Saint vincent -selected partner
    customerId: "638dbb343d534df590afca93", // ROMERO, JERWIN
    cashierId: "636d37e0187c30ab0f611ce4",
    source: "637097f0535529a3a57e933e", // General tinio -own branchId
    subcon: "63fd9fbcf2ca91bdc98cf93f", // sales id
    category: "sc", // sub contract
    payment: "credit",
    amount: 2000,
    hasResult: true,
    hasArrived: true,
    renderedAt: "3/1/2023, 8:32:56 AM",
    renderedBy: "636d37e0187c30ab0f611ce4",
  },
];

module.exports = sales;

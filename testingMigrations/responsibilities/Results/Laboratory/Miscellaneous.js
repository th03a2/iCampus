const miscellaneous = [
  {
    saleId: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e936e",
    customerId: "636d37e0187c30ab0f611ce0",
    packages: [77],
    specimen: "serum",
    results: { ns1: false, igg: false, igm: false },
    troupe: {
      method: "Immunochromatography",
      kit: "WONDFO Dengue IgG/IgM/NS1 Rapid Test (Colloidal Gold)",
      lot: "W11120402",
      expiry: "2024-02",
    },
  },
  {
    saleId: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e936e",
    customerId: "636d37e0187c30ab0f611ce0",
    packages: [120], // Typhoid
  },
  {
    saleId: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e936e",
    customerId: "636d37e0187c30ab0f611ce0",
    packages: [66], // Blood Typing
  },
  {
    saleId: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e936e",
    customerId: "636d37e0187c30ab0f611ce0",
    packages: [67], // Pregnancy Test
  },
  {
    saleId: "6391ae45e64c3135fd1815fe",
    branchId: "637097f0535529a3a57e936e",
    customerId: "636d37e0187c30ab0f611ce0",
    packages: [70, 68, 69], // cluster [HIV ,HBsAg , RPR]
  },
];

module.exports = miscellaneous;

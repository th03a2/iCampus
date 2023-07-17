const Liability = require("../../models/Finance/Liability"),
  liabilities = require("./Liabilities"),
  Payment = require("../../models/Finance/Payment"),
  payments = require("./Payment"),
  Receivable = require("../../models/Finance/Receivable"),
  receivables = require("./Receivable");

const finance = [
  {
    entity: Receivable,
    collections: receivables,
    name: "receivables",
  },
  {
    entity: Liability,
    collections: liabilities,
    name: "liabilities",
  },
  {
    entity: Payment,
    collections: payments,
    name: "payments",
  },
];
module.exports = finance;

const Liabilities = require("./Liabilities"),
  Payments = require("./Payments"),
  Payables = require("./Payables"),
  Receivables = require("./Receivables"),
  Soa = require("./Soa");

const finance = {
  root: "finance",
  branches: [
    {
      root: "liabilities",
      routes: Liabilities,
    },
    {
      root: "payments",
      routes: Payments,
    },
    {
      root: "payables",
      routes: Payables,
    },
    {
      root: "receivables",
      routes: Receivables,
    },
    {
      root: "soa",
      routes: Soa,
    },
  ],
};

module.exports = finance;

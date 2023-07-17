export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "POS", // Transactions || Point Of Sales
    path: "transactions",
    icon: "cogs",
    children: [
      {
        name: "Bills",
        icon: "cash-register",
        path: "patients",
      },
      {
        name: "Ledgers",
        icon: "money-bill",
        path: "sales",
      },
    ],
  },
  {
    name: "Purchase",
    path: "purchase",
    icon: "money-bill",
    children: [
      {
        name: "Request",
        icon: "note",
        path: "request",
      },
      {
        name: "Ledgers",
        icon: "money-bill",
        path: "sales",
      },
    ],
  },

  {
    name: "Accrued",
    path: "accrued",
    icon: "tv",
    children: [
      {
        name: "Payables",
        icon: "list",
        path: "payables",
      },
      {
        name: "Receivables",
        icon: "list",
        path: "receivables",
      },
    ],
  },
  {
    name: "Liability",
    path: "liability",
    icon: "tv",
    children: [
      {
        name: "Supply",
        title: "stocks",
        icon: "boxes",
        path: "supply",
      },
    ],
  },
  {
    name: "Merchandise",
    path: "offers",
    icon: "list",
    children: [
      {
        name: "Products",
        icon: "cogs",
        path: "menus",
      },
      {
        name: "Stocks",
        icon: "tools",
        path: "stocks",
      },
    ],
  },
];

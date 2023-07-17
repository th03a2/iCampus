export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "POS", // Point Of Sales
    path: "pos",
    icon: "cogs",
    children: [
      {
        name: "Cashier",
        icon: "cash-register",
        path: "patients",
      },
      {
        name: "Sales",
        icon: "money-bill",
        path: "sales",
      },
      {
        name: "Ledger",
        icon: "cogs",
        path: "ledger",
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
        icon: "cogs",
        path: "payables",
      },
      {
        name: "Receivables",
        icon: "list",
        path: "receivables",
      },
      {
        name: "SOA",
        icon: "tools",
        path: "soa",
      },
    ],
  },
  {
    name: "Offers",
    path: "offers",
    icon: "list",
    children: [
      {
        name: "Menus",
        icon: "cogs",
        path: "menus",
      },
      {
        name: "Services",
        icon: "tools",
        path: "services",
      },
    ],
  },
];

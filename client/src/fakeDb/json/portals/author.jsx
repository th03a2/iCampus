export default [
  {
    name: "POS", // Transactions || Point Of Sales
    path: "transactions",
    icon: "cogs",
    children: [
      {
        name: "Menus",
        icon: "cash-register",
        path: "patients",
      },
      {
        name: "Preferences",
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
        name: "Temperature",
        icon: "thermometer",
        path: "temperature",
      },
      {
        name: "Supply",
        title: "stocks",
        icon: "boxes",
        path: "supply",
      },
      {
        name: "Machine",
        title: "Preventive Maintenance",
        icon: "money-bill",
        path: "machine",
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

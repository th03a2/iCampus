export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "Transactions",
    path: "transactions",
    icon: "cogs",
    children: [
      {
        name: "Sales",
        icon: "money-bill",
        path: "sales",
      },
      {
        name: "Tasks",
        icon: "vials",
        path: "task",
      },
      {
        name: "Tracker",
        icon: "chart-line",
        path: "tracker",
      },
    ],
  },
  {
    name: "Liability",
    icon: "tv",
    path: "liability",
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
    name: "Purchases",
    path: "purchases",
    icon: "cogs",
    children: [
      {
        name: "Request",
        path: "request",
        icon: "money-bill",
      },
      {
        name: "Recieved",
        path: "received",
        icon: "vials",
      },
      {
        name: "Completed",
        path: "completed",
        icon: "chart-line",
      },
    ],
  },
  {
    name: "Market",
    path: "market/items",
    icon: "list",
  },
  {
    name: "Merchandise",
    path: "merchandise",
    icon: "list",
    children: [
      {
        name: "Products",
        path: "products",
        icon: "cogs",
      },
      {
        name: "Machines",
        path: "machines",
        icon: "cogs",
      },
      {
        name: "Stocks",
        path: "stocks",
        icon: "tools",
      },
    ],
  },
  {
    name: "Utilities",
    path: "utilities",
    icon: "tools",
    children: [
      {
        name: "Bills",
        path: "liabilities",
        icon: "cogs",
      },
      {
        name: "Voucher",
        path: "vouchers",
        icon: "tools",
      },
      {
        name: "Temperature",
        path: "temperature",
        icon: "tools",
      },
      {
        name: "Quality Control",
        path: "qc",
        icon: "tools",
      },
    ],
  },
];

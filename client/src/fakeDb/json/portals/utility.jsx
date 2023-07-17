export default [
  {
    name: "Housekeeper", // Transactions || Point Of Sales
    path: "housekeeper",
    icon: "cogs",
    children: [
      {
        name: "Request",
        icon: "cash-register",
        path: "request",
      },
      {
        name: "Trackers",
        icon: "money-bill",
        path: "trackers",
      },
    ],
  },
  {
    name: "Liability",
    path: "liability",
    icon: "tv",
    children: [
      {
        name: "Purchase Order",
        title: "stocks",
        icon: "boxes",
        path: "order",
      },
    ],
  },
  {
    name: "Supply",
    path: "supply",
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

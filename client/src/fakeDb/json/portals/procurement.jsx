export default [
  {
    name: "Purchases",
    path: "purchases",
    icon: "cogs",
    children: [
      {
        name: "Request",
        icon: "cash-register",
        path: "request",
      },
      {
        name: "Approved",
        icon: "cash-register",
        path: "approved",
      },
      {
        name: "Completed",
        icon: "cash-register",
        path: "purchase",
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

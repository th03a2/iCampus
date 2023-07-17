export default [
  {
    name: "Human Resources",
    path: "hr",
    icon: "code-branch",
    children: [
      {
        name: "Branches",
        path: "branches",
        icon: "code-branch",
      },
      {
        name: "Menus",
        path: "menus",
        icon: "list",
      },
      {
        name: "Top Branch",
        path: "top/branch",
        icon: "list",
      },
      {
        name: "Best Employee's",
        path: "employee",
        icon: "list",
      },
    ],
  },
  {
    name: "Commerce",
    path: "commerce",
    icon: "tv",
    children: [
      {
        name: "Sales", // daily
        icon: "list",
        path: "sales",
      },
      {
        name: "Ledger", // daily
        path: "ledger",
        icon: "list",
      },
      {
        name: "Census", // services avail
        path: "census",
        icon: "list",
      },
      {
        name: "Duty", // daily duty
        path: "duty",
        icon: "list",
      },
      {
        name: "Products",
        path: "products",
        icon: "list",
      },
    ],
  },
  {
    name: "procurement's",
    path: "duty",
    icon: "code-branch",
    children: [
      {
        name: "Supplier's",
        path: "suppliers",
        icon: "list",
      },
      {
        name: "stock",
        path: "stock",
        icon: "list",
      },
      {
        name: "Merchandise",
        path: "merchandise",
        icon: "list",
      },
      {
        name: "Equipments",
        path: "equipments",
        icon: "list",
      },
      {
        name: "Preventive Maintenance",
        path: "maintenance",
        icon: "code-branch",
      },
    ],
  },
  {
    name: "Mortality",
    icon: "code-branch",
    path: "mortality",
  },
];

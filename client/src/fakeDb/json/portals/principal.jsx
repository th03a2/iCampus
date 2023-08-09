export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "Purchase Order",
    path: "po",
    icon: "book-open",
    children: [
      {
        name: "Process", // 1. Pending, 2. Approved 3. Dennied
        icon: "cash-register",
        path: "process",
      },
      {
        name: "Delivered",
        icon: "money-bill",
        path: "delivered",
      },
      {
        name: "Approved",
        icon: "money-bill",
        path: "approved",
      },
    ],
  },
  {
    name: "Responsibilities",
    path: "liability",
    icon: "wrench",
    children: [
      {
        name: "Supplies",
        icon: "money-bill",
        path: "reagents",
      },
      {
        name: "Preventive Maintenance",
        purpose: "Preventive Maintenance",
        icon: "cogs",
        path: "preventive/maintenenace",
      },
      {
        name: "Results QA",
        purpose: "Preventive Maintenance",
        icon: "cog",
        path: "preventive/results",
      },
    ],
  },
  {
    name: "File 201",
    path: "file201",
    icon: "book-open",
    children: [
      {
        name: "Staff",
        icon: "users",
        path: "staff",
      },
      {
        name: "Heads",
        purpose: "Department Heads",
        icon: "book-open",
        path: "heads",
      },
      {
        name: "Physicians",
        purpose: "Tag Physicians",
        icon: "user",
        path: "physicians",
      },
      {
        name: "Applicans",
        icon: "user-tie",
        path: "petitioners",
      },
      {
        name: "Employees",
        icon: "user-tie",
        path: "employees",
      },
      {
        name: "Equipments",
        purpose: "Equipments",
        icon: "users",
        path: "equipments",
      },
      {
        name: "Procurement",
        purpose: "All Puchases",
        icon: "cog",
        path: "procurement",
      },
    ],
  },
  {
    name: "Settings",
    path: "settings",
    icon: "cogs",
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
      {
        name: "Banner",
        purpose: "Crop Images",
        icon: "book-open",
        path: "banners",
      },
      {
        name: "Logos",
        purpose: "Crop Images",
        icon: "book-open",
        path: "logos",
      },
      {
        name: "Sourcing",
        purpose: "",
        icon: "book-open",
        path: "sourcing",
      },
    ],
  },
  {
    name: "Scheduler",
    icon: "calendar",
    path: "schedulers",
  },
];

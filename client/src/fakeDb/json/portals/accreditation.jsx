export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "Assessment Tools r2021",
    path: "assessment",
    descriptions: "assessment tools",
    icon: "cogs",
    children: [
      {
        name: "1. ORGANIZATION and MANAGEMENT",
        icon: "cash-register",
        path: "organization",
      },
      {
        name: "2. HUMAN RESOURCES MANAGEMANT",
        icon: "money-bill",
        path: "manpower",
      },
      {
        name: "3. PHYSICAL PLANT and ENVIRONMENT MANAGEMENT",
        icon: "money-bill",
        path: "environment",
      },
      {
        name: "4. EQUIPMENT, INSTRUMENTS, GLASWARES, REAGENTS and SUPPLIES",
        icon: "money-bill",
        path: "supplies",
      },
      {
        name: "5. INFORMATION MANAGEMENTS",
        icon: "money-bill",
        path: "information",
      },
      {
        name: "6. QUALITY IMPROVEMENT ACTIVITIES",
        icon: "money-bill",
        path: "improvement",
      },
      {
        name: "7. REFERRAL and OUTSOURCING OF LABORATORY EXAMINATIONS",
        icon: "money-bill",
        path: "manpower",
      },
    ],
  },
  {
    name: "Documents",
    path: "documents",
    icon: "cogs",
    children: [
      {
        name: "Temperature",
        icon: "cash-register",
        path: "temperature",
      },
      {
        name: "Services Offers",
        icon: "money-bill",
        path: "services",
      },
      {
        name: "Employees",
        icon: "money-bill",
        path: "employees",
      },
      {
        name: "Quality Controll",
        icon: "money-bill",
        path: "quality",
      },
      {
        name: "Machines",
        icon: "money-bill",
        path: "machines",
      },
      {
        name: "Services Statistics",
        icon: "money-bill",
        path: "statistics",
      },
      {
        name: "Reagent Inventory",
        icon: "money-bill",
        path: "reagents",
      },
      {
        name: "Preventive Mentainance",
        icon: "money-bill",
        path: "maintenance",
      },
    ],
  },
];

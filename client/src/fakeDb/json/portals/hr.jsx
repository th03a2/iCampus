export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "File 201",
    path: "file",
    icon: "tv",
    children: [
      {
        name: "Employee's",
        title: "stocks",
        icon: "boxes",
        path: "employees",
      },
      {
        name: "Applicant",
        title: "stocks",
        icon: "boxes",
        path: "apllicants",
      },
    ],
  },
  {
    name: "Accrued",
    path: "accrued",
    icon: "tv",
    children: [
      {
        name: "Payroll",
        icon: "list",
        path: "payroll",
      },
      {
        name: "Check",
        icon: "list",
        path: "checks",
      },
    ],
  },
];

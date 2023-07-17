export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "e-chart",
    path: "echart",
    icon: "user-tag",
    children: [
      {
        name: "Laboratory",
        icon: "cash-register",
        path: "laboratory",
      },
      {
        name: "Radiology",
        icon: "money-bill",
        path: "radiology",
      },
      {
        name: "Admission",
        icon: "money-bill",
        path: "admission",
      },
    ],
  },
  {
    name: "Application",
    path: "apply",
    icon: "user-tie",
  },
  {
    name: "History",
    path: "history",
    icon: "user-tie",
  },
];

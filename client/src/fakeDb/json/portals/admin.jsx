export default [
  {
    name: "Companies",
    icon: "code-branch",
    path: "admin/companies",
  },
  {
    name: "Applications",
    icon: "user-tie",
    path: "admin/applications",
  },
  {
    name: "Patrons",
    icon: "users",
    path: "admin/patrons",
  },
  {
    name: "Suggestions",
    icon: "list",
    path: "admin/suggestions",
  },
  {
    name: "Users",
    path: "users",
    icon: "users",
    children: [
      {
        name: "List",
        icon: "user",
        path: "list",
      },
      {
        name: "Representatives",
        icon: "user-friends",
        path: "patron",
      },
      {
        name: "Banned",
        icon: "user-alt-slash",
        path: "banned",
      },
    ],
  },
];

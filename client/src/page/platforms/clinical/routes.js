import Dashboard from "./dashboard";

const routes = {
  name: "clinical",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "cashier",
      grandsons: [
        {
          path: "menus",
          // element: <Menus />,
        },
        {
          path: "services",
          // element: <Services />,
        },
      ],
    },
  ],
};

export default routes;

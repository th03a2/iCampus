import Dashboard from "./dashboard";

const routes = {
  name: "accounting",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "cashier",
      children: [
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

import Dashboard from "./dashboard";

const routes = {
  name: "auditor",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "offers",
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

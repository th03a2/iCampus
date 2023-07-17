import Dashboard from "./dashboard";

const routes = {
  name: "hr",
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

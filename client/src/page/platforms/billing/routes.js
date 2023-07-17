import Dashboard from "./dashboard";

const routes = {
  name: "billing",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "offers",
      grandsons: [
        // {
        //   path: "sales",
        //   // element: <Payables />,
        // },
        // {
        //   path: "admission",
        //   // element: <Receivables />,
        // },
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

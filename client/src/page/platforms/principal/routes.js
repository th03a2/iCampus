import Dashboard from "./dashboard";
import Scheduler from "./scheduler";

const routes = {
  name: "principal", // Administrator Officer
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "schedulers",
      element: <Scheduler />,
    },
  ],
};

export default routes;

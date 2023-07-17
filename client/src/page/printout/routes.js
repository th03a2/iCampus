import Stub from "./pos";
import Task from "./task";

const routes = {
  name: "printout",
  children: [
    {
      path: "stub",
      element: <Stub />,
    },
    {
      path: "task",
      element: <Task />,
    },
  ],
};

export default routes;

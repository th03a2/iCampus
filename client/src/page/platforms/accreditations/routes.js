import Dashboard from "./dashboard";
import { Organization, Manpower } from "./assessment";
import { Employees } from "./documents/employees";
import { Services } from "./documents/services";
import { Machines } from "./documents/machines";
import { Temperature } from "./documents/temperature";
import { Maintenance } from "./documents/maintenance";
import { Statistics } from "./documents/statistics";
import { Reagents } from "./documents/reagents";
import { Quality } from "./documents/assurance";

const routes = {
  name: "accreditations",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "assessment",
      grandsons: [
        {
          path: "organization",
          element: <Organization />,
        },
        {
          path: "manpower",
          element: <Manpower />,
        },
      ],
    },
    {
      path: "documents",
      grandsons: [
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "machines",
          element: <Machines />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "temperature",
          element: <Temperature />,
        },
        {
          path: "maintenance",
          element: <Maintenance />,
        },
        {
          path: "statistics",
          element: <Statistics />,
        },
        {
          path: "reagents",
          element: <Reagents />,
        },
        {
          path: "quality",
          element: <Quality />,
        },
      ],
    },
  ],
};

export default routes;

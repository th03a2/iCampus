import Dashboard from "./dashboard";
import UsersList from "./users/list";
import UsersArchive from "./users/archive";
import CompaniesList from "./companies/list";
import CompaniesArchive from "./companies/archive";
import RubricsList from "./surnames/list";
import RubricsArchive from "./surnames/archive";
import RubricsUnresolved from "./surnames/unresolved";

const routes = {
  name: "administrative",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "users",
      grandsons: [
        {
          path: "list",
          element: <UsersList />,
        },
        {
          path: "archive",
          element: <UsersArchive />,
        },
      ],
    },
    {
      path: "companies",
      grandsons: [
        {
          path: "list",
          element: <CompaniesList />,
        },
        {
          path: "archive",
          element: <CompaniesArchive />,
        },
      ],
    },
    {
      path: "surnames",
      grandsons: [
        {
          path: "list",
          element: <RubricsList />,
        },
        {
          path: "unresolved",
          element: <RubricsUnresolved />,
        },
        {
          path: "archive",
          element: <RubricsArchive />,
        },
      ],
    },
  ],
};

export default routes;

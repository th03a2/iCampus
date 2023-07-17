import Dashboard from "./dashboard";
import UsersList from "../users/list";
import UsersArchive from "../users/archive";
import RubricsList from "../surnames/list";
import RubricsArchive from "../surnames/archive";
import RubricsUnresolved from "../surnames/unresolved";

const routes = [
  {
    path: "dashboard",
    element: <Dashboard />,
  },
  {
    path: "users",
    children: [
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
    path: "surnames",
    children: [
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
];

export default routes;

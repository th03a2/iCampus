import Owner from "./dashboard";
import Branches from "./branches";
import Petitioners from "./petitioners";
import Employees from "./employees";
import Services from "./offers/menus";
import Menus from "./offers/menus";

const routes = {
  name: "headquarter",
  children: [
    {
      path: "dashboard",
      element: <Owner />,
    },
    {
      path: "hr",
      grandsons: [
        {
          path: "branches",
          element: <Branches />,
        },
        {
          path: "petitioners",
          element: <Petitioners />,
        },
        {
          path: "employees",
          element: <Employees />,
        },
        {
          path: "menus/:branchId/:menuId",
          element: <Menus />,
        },
        {
          path: "services",
          element: <Services />,
        },
      ],
    },
  ],
};

export default routes;

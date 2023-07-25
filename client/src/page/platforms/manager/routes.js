import Dashboard from "./dashboard";
import {
  Petitioners,
  Staffs,
  Physicians,
  Heads,
  Employees,
  Procurements,
  Equipments,
} from "./file201";
import Menus from "./settings/offers/menus";
import Services from "./settings/offers/services";
import Banners from "./settings/banners";
import Logos from "./settings/logos";
import Process from "./po/process";
import Sourcing from "./settings/sourcing";
import DTR from "./dtr";

const routes = {
  name: "principal", // Administrator Officer
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "monitoring",
      grandsons: [
        // {
        //   path: "temperature",
        //   element: <Temperature />,
        // },
      ],
    },
    {
      path: "po",
      grandsons: [
        {
          path: "process",
          element: <Process />,
        },
        // {
        //   path: "supply",
        //   element: <Supply />,
        // },
      ],
    },
    {
      path: "dtr",
      element: <DTR />,
    },
    {
      path: "file201",
      grandsons: [
        {
          path: "staff",
          element: <Staffs />,
        },
        {
          path: "heads",
          element: <Heads />, // Signatories
        },
        {
          path: "physicians",
          element: <Physicians />,
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
          path: "procurement",
          element: <Procurements />,
        },
        {
          path: "equipments",
          element: <Equipments />,
        },
      ],
    },
    {
      path: "settings",
      grandsons: [
        {
          path: "menus",
          element: <Menus />,
        },
        {
          path: "services",
          element: <Services />,
        },
        {
          path: "banners",
          element: <Banners />,
        },
        {
          path: "logos",
          element: <Logos />,
        },
        {
          path: "sourcing",
          element: <Sourcing />,
        },
      ],
    },
  ],
};

export default routes;

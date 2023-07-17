import Dashboard from "./dashboard";
import { Tasks, Sales } from "./tasks";
import { Liabilities, Vouchers, Temperature } from "./utilities";
import { Menus, Service } from "./offers";
import { Products } from "./merchandise";
import Printout from "../../printout/task";
import { QControll } from "./utilities/qc";
import { Items } from "./market";
import { Request, Received } from "./purchases";

const routes = {
  name: "frontdesk",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "transactions",
      grandsons: [
        {
          path: "sales",
          element: <Sales />,
        },
        {
          path: "task",
          element: <Tasks />,
        },
        {
          path: "tracker",
          element: <Tasks />,
        },
      ],
    },
    {
      path: "offers",
      grandsons: [
        {
          path: "menus",
          element: <Menus />,
        },
        {
          path: "services",
          element: <Service />,
        },
      ],
    },
    {
      path: "results",
      grandsons: [
        {
          path: "printout",
          element: <Printout />,
        },
      ],
    },
    {
      path: "utilities",
      grandsons: [
        {
          path: "liabilities",
          element: <Liabilities />,
        },
        {
          path: "vouchers",
          element: <Vouchers />,
        },
        {
          path: "temperature",
          element: <Temperature />,
        },
        {
          path: "qc",
          element: <QControll />,
        },
      ],
    },
    {
      path: "market",
      grandsons: [
        {
          path: "items",
          element: <Items />,
        },
      ],
    },
    {
      path: "merchandise",
      grandsons: [
        {
          path: "products",
          element: <Products />,
        },
      ],
    },
    {
      path: "purchases",
      grandsons: [
        {
          path: "request",
          element: <Request />,
        },
        {
          path: "received",
          element: <Received />,
        },
      ],
    },
  ],
};

export default routes;

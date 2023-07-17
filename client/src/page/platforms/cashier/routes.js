import Dashboard from "./dashboard";
import Patrons from "./pos/patrons";
import Sales from "./pos/sales";
import Ledger from "./pos/ledger";
import Menus from "./offers/menus";
import Services from "./offers/services";
import { Payables, Receivables, Soa } from "./finance";

const routes = {
  name: "cashier",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "pos",
      grandsons: [
        {
          path: "patients",
          element: <Patrons />,
        },
        {
          path: "sales",
          element: <Sales />,
        },
        {
          path: "ledger",
          element: <Ledger />,
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
          element: <Services />,
        },
      ],
    },
    {
      path: "finance",
      grandsons: [
        {
          path: "payables",
          element: <Payables />,
        },
        {
          path: "receivables",
          element: <Receivables />,
        },
        {
          path: "soa",
          element: <Soa />,
        },
      ],
    },
  ],
};

export default routes;

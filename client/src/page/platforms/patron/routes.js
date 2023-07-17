import Dashboard from "./dashboard";
import Represent from "./represent";
import Apply from "./apply";
import History from "./history";
import Laboratory from "./echart/Laboratory";
import Radiology from "./echart/Radiology";
import Admission from "./echart/Admission";
import Blank from "./blank";

const routes = {
  name: "patron",
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "echart",
      grandsons: [
        {
          path: "laboratory",
          element: <Laboratory />,
        },
        {
          path: "radiology",
          element: <Radiology />,
        },
        {
          path: "admission",
          element: <Admission />,
        },
      ],
    },
    {
      path: "represent",
      element: <Represent />,
    },
    {
      path: "apply",
      element: <Apply />,
    },
    {
      path: "history",
      element: <History />,
    },
    {
      path: "blank",
      element: <Blank />,
    },
  ],
};

export default routes;

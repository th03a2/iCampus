import Dashboard from "./dashboard";
import Represent from "./represent";
import Apply from "./apply";
import History from "./history";
import Laboratory from "./echart/Laboratory";
import Radiology from "./echart/Radiology";
import Admission from "./echart/Admission";
import Blank from "./blank";
import Levels from "./mapping/levels";
import Sections from "./mapping/sections";
import Books from "./mapping/books";
import Strands from "./mapping/strands";
import Companies from "./mapping/companies";
import Specializations from "./mapping/specialization";
import Schools from "./mapping/schools";
import Subjects from "./mapping/subjects";
import Banks from "./mapping/banks";
import Articles from "./mapping/articles";
import Batch from "./batch";
import Enrollment from "./enrollment";

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
    {
      path: "batch",
      element: <Batch />,
    },
    {
      path: "enrollment",
      element: <Enrollment />,
    },
    {
      path: "mapping",
      grandsons: [
        {
          path: "level",
          element: <Levels />,
        },
        {
          path: "schools",
          element: <Schools />,
        },
        {
          path: "sections",
          element: <Sections />,
        },
        {
          path: "books",
          element: <Books />,
        },
        {
          path: "strands",
          element: <Strands />,
        },
        {
          path: "companies",
          element: <Companies />,
        },
        {
          path: "specializations",
          element: <Specializations />,
        },
        {
          path: "subjects",
          element: <Subjects />,
        },
        {
          path: "banks",
          element: <Banks />,
        },
        {
          path: "articles",
          element: <Articles />,
        },
      ],
    },
  ],
};

export default routes;

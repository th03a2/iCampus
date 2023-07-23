export default [
  {
    name: "Dashboard",
    icon: "tachometer-alt",
    path: "dashboard",
  },
  {
    name: "e-chart",
    path: "echart",
    icon: "user-tag",
    children: [
      {
        name: "Laboratory",
        icon: "cash-register",
        path: "laboratory",
      },
      {
        name: "Radiology",
        icon: "money-bill",
        path: "radiology",
      },
      {
        name: "Admission",
        icon: "money-bill",
        path: "admission",
      },
    ],
  },
  {
    name: "Application",
    path: "apply",
    icon: "user-tie",
  },
  {
    name: "History",
    path: "history",
    icon: "user-tie",
  },
  {
    name: "Mapping",
    path: "mapping",
    icon: "user-tie",
    children: [
      {
        name: "Grade Level",
        icon: "user-graduate",
        path: "level",
      },
      {
        name: "Schools",
        icon: "school",
        path: "schools",
      },
      {
        name: "Sections",
        icon: "chalkboard-teacher",
        path: "sections",
      },
      {
        name: "Books",
        icon: "book",
        path: "books",
      },
      {
        name: "Strands",
        icon: "archway",
        path: "strands",
      },
      {
        name: "Companies",
        icon: "building",
        path: "companies",
      },
      {
        name: "Specializations",
        icon: "quidditch",
        path: "specializations",
      },
      {
        name: "Subjects",
        icon: "suitcase-rolling",
        path: "subjects",
      },
      {
        name: "Banks",
        icon: "university",
        path: "banks",
      },
      {
        name: "Articles",
        icon: "newspaper",
        path: "articles",
      },
    ],
  },
  {
    name: "Batch",
    icon: "restroom",
    path: "batch",
  },
];

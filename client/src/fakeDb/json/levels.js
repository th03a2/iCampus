const levels = [
  {
    id: 1,
    stage: "prep",
    name: "nur",
    description: "Nursery",
    lvl: "nursery",
    category: "prep",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 2,
    stage: "prep",
    name: "k1",
    description: "Kinder 1",
    lvl: "kindergarden 1",
    category: "prep",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 3,
    stage: "primary",
    name: "g1",
    description: "Grade 1",
    lvl: "1",
    category: "elementary",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 4,
    stage: "primary",
    name: "g2",
    description: "Grade 2",
    lvl: "2",
    category: "elementary",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 5,
    stage: "primary",
    name: "g3",
    description: "Grade 3",
    lvl: "3",
    category: "elementary",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 6,
    stage: "primary",
    name: "g4",
    description: "Grade 4",
    lvl: "4",
    category: "elementary",
    subjects: [1, 2, 3, 4, 5],
  },
  {
    id: 7,
    stage: "primary",
    name: "g5",
    description: "Grade 5",
    lvl: "5",
    category: "elementary",
    subjects: [1, 2, 3, 4, 5, 8],
  },
  {
    id: 9,
    stage: "primary",
    name: "g6",
    description: "Grade 6",
    lvl: "6",
    category: "elementary",
    subjects: [1, 2, 3, 7, 8],
  },
  {
    id: 10,
    stage: "secondary",
    name: "jhs 7",
    description: "Junior High School 7",
    lvl: "7",
    category: "jhs",
    strand: [
      {
        specifications: "SPS", //special program sports
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "SPA", //special program arts
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "STE", //science technology and engineering
        subject: [4, 6, 7, 8],
      },
      {
        specifications: "TLE", //technical livelihood education
        subject: [5, 6, 7, 8],
      },
    ],
  },
  {
    id: 11,
    stage: "secondary",
    name: "jhs 8",
    description: "Junior High School 8",
    lvl: "8",
    category: "jhs",
    strand: [
      {
        specifications: "SPS", //special program sports
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "SPA", //special program arts
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "STE", //science technology and engineering
        subject: [4, 6, 7, 8],
      },
      {
        specifications: "TLE", //technical livelihood education
        subject: [5, 6, 7, 8],
      },
    ],
  },
  {
    id: 12,
    stage: "secondary",
    name: "jhs 9",
    description: "Junior High School 9",
    lvl: "9",
    category: "jhs",
    strand: [
      {
        specifications: "SPS",
        description: "special program sports",
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "SPA",
        description: "special program arts",
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "STE",
        description: "science technology and engineering",
        subject: [4, 6, 7, 8],
      },
      {
        specifications: "TLE",
        description: "technical livelihood education",
        subject: [5, 6, 7, 8],
      },
    ],
  },
  {
    id: 13,
    stage: "secondary",
    name: "jhs 10",
    description: "Junior High School 10",
    lvl: "10",
    category: "jhs",
    strand: [
      {
        specifications: "SPS", //special program sports
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "SPA", //special program arts
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "STE", //science technology and engineering
        subject: [4, 6, 7, 8],
      },
      {
        specifications: "TLE", //technical livelihood education
        subject: [5, 6, 7, 8],
      },
    ],
  },
  {
    id: 14,
    stage: "secondary",
    name: "shs 11",
    description: "Senior High School 11",
    lvl: "11",
    category: "shs",
    strand: [
      {
        specifications: "TVL",
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "STEM",
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "ABM",
        subject: [12, 13, 14, 15, 16, 17, 18, 19, 20],
      },
      {
        specifications: "AGRI",
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "HUMS",
        subject: [5, 6, 7, 8],
      },
    ],
  },
  {
    id: 15,
    stage: "secondary",
    name: "shs 12",
    description: "Senior High School 12",
    lvl: "12",
    category: "shs",
    strand: [
      {
        specifications: "TVL",
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "STEM",
        subject: [5, 6, 2, 8],
      },
      {
        specifications: "ABM",
        subject: [21, 22, 23, 24, 25, 26, 27, 28],
      },
      {
        specifications: "AGRI",
        subject: [5, 6, 7, 8],
      },
      {
        specifications: "HUMS",
        subject: [4, 6, 7, 8],
      },
    ],
  },
];

export default levels;

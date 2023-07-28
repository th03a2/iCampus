const batch = [
  {
    _id: "64c2a2b55d8087987ab0eb39",
    schoolId: "637097f0535529a3a57e933e",
    semester: 1,
    SY: "2022-2023",
    e_start: "2021-05-1", // ENROLLMENT START AT
    e_end: "2019-06-1", // ENROLLMENT END AT
    c_start: "2019-06-11", // CLASS START AT
    c_end: "2020-03-31", // CLASS END AT
    status: "done",
  },
  {
    _id: "64c2a2b55d8087987ab0ec2e",
    schoolId: "637097f0535529a3a57e933e",
    semester: 2,
    SY: "2022-2023",
    e_start: "2021-05-1", // ENROLLMENT START AT
    e_end: "2019-06-1", // ENROLLMENT END AT
    c_start: "2019-06-11", // CLASS START AT
    c_end: "2020-03-31", // CLASS END AT
    status: "done", //red
  },
  {
    _id: "64c2519211d7bf196b503d9a",
    schoolId: "637097f0535529a3a57e933e",
    semester: 1,
    SY: "2023-2024",
    e_start: "2021-05-1", // ENROLLMENT START AT
    e_end: "2019-06-1", // ENROLLMENT END AT
    c_start: "2019-06-11", // CLASS START AT
    c_end: "2020-03-31", // CLASS END AT
    status: "active", //green
  },
  {
    _id: "64c2a2b55d8087987ab0ec42",
    schoolId: "637097f0535529a3a57e933e",
    semester: 2,
    SY: "2023-2024",
    e_start: "2021-05-1", // ENROLLMENT START AT
    e_end: "2019-06-1", // ENROLLMENT END AT
    c_start: "2019-06-11", // CLASS START AT
    c_end: "2020-03-31", // CLASS END AT
    status: "pending", //orange
  },
];
module.exports = batch;

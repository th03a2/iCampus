const Tinio = require("./tinio"),
  CitiLife = require("./citiLife"),
  Carranglan = require("./carranglan"),
  Vincent = require("./saintVincent"),
  Student = require("./student"),
  Physicians = require("./pathologist"),
  Users = require("../../../../models/Assets/Persons/Users");

const collections = [
  {
    _id: "636d37e0187c30ab0f611ce0",
    fullName: {
      fname: "Benedict Earle Gabriel",
      mname: "ROMERO",
      lname: "PAJARILLAGA",
    },
    address: {
      region: 3, //"REGION III (CENTRAL LUZON)"
      province: 349, // "NUEVA ECIJA",
      city: 34903, // "CABANATUAN CITY",
      barangay: "Mabini Extension",
      street: "#25 molave",
    },
    dob: "2000-09-08",
    mobile: "9510706841",
    email: "benedictearle@gmail.com",
    username: "beg",
    password: "password",
    hea: "College",
    isDev: true,
  },
  ...Tinio,
  ...CitiLife,
  ...Carranglan,
  ...Vincent,
  ...Student,
  ...Physicians,
];

const users = {
  entity: Users,
  collections,
  name: "users",
};

module.exports = users;

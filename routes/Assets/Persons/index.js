const Auth = require("./Auth");
const Users = require("./Users");
const Attendances = require("./Attendances");
const Surnames = require("./Surnames");
const Physicians = require("./Physicians");
const Personnels = require("./Personnels");
const Heads = require("./Heads");
const Mailer = require("./Mailer");

const persons = [
  {
    root: "auth",
    routes: Auth,
  },
  {
    root: "users",
    routes: Users,
  },
  {
    root: "attendances",
    routes: Attendances,
  },
  {
    root: "surnames",
    routes: Surnames,
  },
  {
    root: "physicians",
    routes: Physicians,
  },
  {
    root: "personnels",
    routes: Personnels,
  },
  {
    root: "heads",
    routes: Heads,
  },
  {
    root: "mailer",
    routes: Mailer,
  },
];

module.exports = persons;

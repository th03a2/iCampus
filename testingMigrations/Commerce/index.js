const Sale = require("../../models/Commerce/Sales"),
  sales = require("./Sales"),
  Services = require("../../models/Assets/Services"),
  services = require("./Services"),
  Deals = require("../../models/Commerce/SaleItems"),
  deals = require("./Deals"),
  // menus
  Tinio = require("./menus/tinio"),
  Carranglan = require("./menus/carranglan"),
  Vincent = require("./menus/saintVincent"),
  CitiLife = require("./menus/citiLife"),
  Menus = require("../../models/Commerce/Menus");

const collections = [...Tinio, ...Carranglan, ...Vincent, ...CitiLife];

const commerce = [
  {
    entity: Menus,
    collections,
    name: "menus",
  },
  {
    entity: Services,
    collections: services,
    name: "services",
  },
  {
    entity: Sale,
    collections: sales,
    name: "sales",
  },
  {
    entity: Deals,
    collections: deals,
    name: "saleitems",
  },
];
module.exports = commerce;

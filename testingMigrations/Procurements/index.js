const Product = require("../../models/Procurements/Product"),
  products = require("./products"),
  Maintenance = require("../../models/Procurements/Maintenance"),
  maintenance = require("./Maintenance"),
  Inventories = require("../../models/Procurements/Inventory"),
  inventories = require("./Inventories"),
  Expense = require("../../models/Procurements/Expense"),
  expense = require("./Expense"),
  Purchase = require("../../models/Procurements/Purchase"),
  purchase = require("./Purchase"),
  Merchandise = require("../../models/Procurements/Merchandise"),
  merchandise = require("./Merchandise");

const procurements = [
  {
    entity: Product,
    collections: products,
    name: "products",
  },
  {
    entity: Maintenance,
    collections: maintenance,
    name: "maintenances",
  },
  {
    entity: Expense,
    collections: expense,
    name: "expense",
  },
  {
    entity: Inventories,
    collections: inventories,
    name: "inventories",
  },
  {
    entity: Inventories,
    collections: inventories,
    name: "inventories",
  },
  {
    entity: Purchase,
    collections: purchase,
    name: "purchases",
  },
  {
    entity: Merchandise,
    collections: merchandise,
    name: "merchandises",
  },
];
module.exports = procurements;

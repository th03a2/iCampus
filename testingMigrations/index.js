const mongoose = require("mongoose"),
  Commerce = require("./Commerce"),
  Finance = require("./Finance"),
  Procurements = require("./Procurements"),
  Assets = require("./Assets"), // HR
  Responsibilities = require("./responsibilities");

const migrations = [
  ...Assets,
  ...Finance,
  ...Procurements,
  ...Responsibilities,
];

exports.save = (req, res) => {
  migrations.map(migration => {
    mongoose.connection.db.dropCollection(
      migration.name,
      async function (_, result) {
        if (result) {
          if (migration.collections.length > 0) {
            for (let index = 0; index < migration.collections.length; index++) {
              const collection = migration.collections[index];

              await migration.entity.create(collection);
            }
          }
        }
      }
    );
  });

  res.json("Seeder Migrations successfully done...");
};

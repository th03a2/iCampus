// module.exports = app => {
//   require("./Assets")(app);
// };

// const middleware = require("../middleware");
const accreditations = require("./Accreditations");
const assets = require("./Assets");
const results = require("./Results");
const commerce = require("./Commerce");
const finance = require("./Finance");
const procurements = require("./Procurments");
const monitorings = require("./Monitorings");
const responsibilities = require("./Responsibilities");

const APIS = [
  accreditations,
  assets,
  commerce,
  finance,
  monitorings,
  results,
  procurements,
  responsibilities,
];

const routers = (app) => {
  // List of available Routes
  app.use("/notifications", require("./Notifications"));
  //remove in deployment
  app.use("/migrations", require("./Migrations"));
  app.use("/mailer", require("./Mailer"));

  // app.use(middleware.notFound);
  // app.use(middleware.errorHandler);

  APIS?.map((api) => {
    api?.branches?.map((branch) =>
      branch.routes
        ? app.use(`/${api.root}/${branch.root}`, branch.routes)
        : branch?.children?.map((child) =>
            app.use(`/${api.root}/${branch.root}/${child.root}`, child.routes)
          )
    );
  });
};

module.exports = routers;

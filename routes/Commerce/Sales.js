const router = require("express").Router(),
  {
    browse,
    // find,
    task,
    save,
    update,
    destroy,
    yearly,
    monthly,
    testQuery,
  } = require("../../controllers/Commerce/Sales"),
  { protect } = require("../../middleware");

router
  .get("/browse", browse)
  .get("/test", testQuery)
  .get("/statistic/yearly", yearly)
  .get("/statistic/monthly", monthly)

  .get("/task/daily", task)
  // .get("/find", protect, find)
  .post("/save", save)
  .put("/update", update)
  .delete("/destroy", protect, destroy);

module.exports = router;

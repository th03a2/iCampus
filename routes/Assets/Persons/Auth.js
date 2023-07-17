const router = require("express").Router(),
  {
    login,
    validateRefresh,
    save,
    changePassword,
    file,
    branchSwitcher,
    logout,
    attendance,
  } = require("../../../controllers/Assets/Persons/Auth"),
  { protect } = require("../../../middleware");

router
  .get("/login", login)
  .get("/logout", logout)
  .get("/attendance", attendance)
  .get("/validateRefresh", validateRefresh)
  .get("/branchSwitcher", branchSwitcher)
  .post("/save", save)
  .put("/changePassword", changePassword)
  .post("/file", file);

module.exports = router;

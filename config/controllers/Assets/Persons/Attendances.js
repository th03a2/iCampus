const Entity = require("../../../models/Responsibilities/Attendances"),
  User = require("../../../models/Assets/Persons/Users");

// entity/:id/find
exports.find = (req, res) =>
  Entity.find()
    .byUser(req.query.id)
    .select("-createdAt -updatedAt -__v")
    .then(items =>
      User.findById(req.query.id)
        .select("-password -address -alias -verified -isMale -bio")
        .populate({
          path: "fullName.mname fullName.lname",
          select: "-createdAt -updatedAt -approved -__v",
        })
        .then(user =>
          res.json({
            attendances: items?.map(item => {
              const newObj = { ...item._doc };
              newObj.user = undefined;
              return newObj;
            }),
            user: user || {},
          })
        )
        .catch(error => res.status(400).json({ error: error.message }))
    )
    .catch(error => res.status(400).json({ error: error.message }));

// entity/:id/logout
exports.logout = (req, res) =>
  Entity.findOne({ user: req.query.id })
    .sort({ createdAt: -1 })
    .then(item => {
      if (item.out) {
        res.status(400).json({ error: "Already logged out!" });
      } else {
        Entity.findByIdAndUpdate(item._id, {
          out: new Date().toLocaleTimeString(),
        })
          .then(() => res.json("Success"))
          .catch(error => res.status(400).json({ error: error.message }));
      }
    })
    .catch(error => res.status(400).json({ error: error.message }));

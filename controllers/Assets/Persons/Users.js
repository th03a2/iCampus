const User = require("../../../models/Assets/Persons/Users"),
  Personnel = require("../../../models/Assets/Persons/Personnels"),
  Logs = require("../../../models/Logs");

// users
exports.browse = (req, res) =>
  User.find()
    .select("-password -createdAt -updatedAt -__v -address")
    .populate({
      path: "fullName.mname fullName.lname",
      select: "-createdAt -updatedAt -approved -__v",
    })
    .sort({ createdAt: -1 })
    .then((users) =>
      Personnel.find({ isDefault: true })
        .select("-createdAt -updatedAt -__v")
        .then((roles) => {
          const available = users.filter((user) => !user.deletedAt);

          var newArr = [];

          for (let index = 0; index < available.length; index++) {
            const user = available[index];

            var _role = {
              roleId: 1,
            };

            roles.find((role) => {
              if (role?.user.equals(user._id)) {
                _role = role;
              }
            });

            var _user = { ...available[index]._doc, onDuty: _role };

            newArr.push(_user);
          }

          res.json(newArr);
        })
        .catch((error) => res.status(400).json({ error: error.message }))
    )
    .catch((error) => res.status(400).json({ error: error.message }));

exports.saveSiblings = (req, res) => {
  User.find({ _id: req.query.id })
    .then((datas) => {
      if (!datas || datas.length === 0) {
        return res.status(404).json({ error: "No matching user found." });
      }

      const siblingsArray = datas.flatMap((data) => data.siblings);

      User.create({
        fullName: {
          fname: req.query.fname,
          mname: req.query.mname,
          lname: req.query.lname,
        },
        isMale: req.query.isMale,
        dob: req.query.dob,
        email: `${req.query.fname}${req.query.mname}${req.query.lname}@gmail.com`,
        password: "password",
      })
        .then((newUser) => {
          siblingsArray.push(newUser._id); // Push the ID directly to siblingsArray

          User.findByIdAndUpdate(datas[0]._id, {
            siblings: siblingsArray,
          })
            .then(() => {
              res.json({ message: "Siblings updated successfully." });
            })
            .catch((error) => {
              res.status(500).json({ error: "Failed to update siblings." });
            });
        })
        .catch((error) => {
          res.status(500).json({ error: "Failed to create user." });
        });
    })
    .catch((error) => {
      res.status(500).json({ error: "Failed to fetch user." });
    });
};

exports.addSiblings = (req, res) => {
  User.find({ _id: req.query.id })
    .then((datas) => {
      const users = datas.filter((user) => !user.deletedAt);
      const siblingsArray = users.flatMap((user) => user.siblings);
      siblingsArray.push(req.query.siblingsId);

      User.findByIdAndUpdate(users[0]._id, {
        siblings: siblingsArray,
      })
        .then((data) => {
          res.json(data);
        })
        .catch((err) => res.status(400).json({ err: error }));
    })
    .catch((error) => res.status(400).json({ error }));
};

exports.search = (req, res) => {
  User.find({
    // dob: req.query.dob,
    // Remarks: its a case sensitive
    "fullName.fname": { $regex: req.query.fname },
    "fullName.mname": { $regex: req.query.mname },
    "fullName.lname": { $regex: req.query.lname },
    // "fullName.suffix": req.query.suffix,
  })
    // .select("-password -createdAt -updatedAt -__v -address")
    .then((datas) =>
      res.json(
        datas
          .filter((data) => !data.deletedAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )

    .catch((error) => {
      // Catch any error that occurred during User.find
      res.status(500).json({ error: "Failed to fetch user data." });
    });
};

exports.parents = (req, res) =>
  User.find({
    ismale: req.query.gender,
    // dob: req.query.dob,
    // Remarks: its a case sensitive
    "fullName.fname": { $regex: req.query.name },
    "fullName.mname": { $regex: req.query.mname },
    "fullName.lname": { $regex: req.query.lname },
    // "fullName.suffix": req.query.suffix,
  })
    // not included in the query string
    .select("-password -createdAt -updatedAt -__v -address")
    .then((datas) =>
      res.json(
        datas
          .filter((data) => !data.deletedAt)
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      )
    )
    .catch((error) => res.status(400).json({ error: error.message }));
// users/physicians
exports.physicians = (req, res) =>
  // User.find({ fullName: { $elemMatch: { title: "Dr." } } })
  // User.find({ "fullName.title": { $ne: "Dr." } })

  User.find({ "fullName.title": "Dr." })
    .select("-password -createdAt -updatedAt -__v -address")
    .populate({
      path: "fullName.mname fullName.lname",
      select: "-createdAt -updatedAt -approved -__v",
    })
    .sort({ createdAt: -1 })
    .then((users) =>
      Personnel.find({ isDefault: true })
        .select("-createdAt -updatedAt -__v")
        .then((roles) => {
          const available = users.filter((user) => !user.deletedAt);

          var newArr = [];

          for (let index = 0; index < available.length; index++) {
            const user = available[index];

            var _role = {
              roleId: 1,
            };

            roles.find((role) => {
              if (role?.user.equals(user._id)) {
                _role = role;
              }
            });

            var _user = { ...available[index]._doc, onDuty: _role };

            newArr.push(_user);
          }

          res.json(newArr);
        })
        .catch((error) => res.status(400).json({ error: error.message }))
    )
    .catch((error) => res.status(400).json({ error: error.message }));
exports.affiliated = (req, res) =>
  User.find({ "fullName.title": "Dr." })
    .select("-password -createdAt -updatedAt -__v -address")
    .populate({
      path: "fullName.mname fullName.lname",
      select: "-createdAt -updatedAt -approved -__v",
    })
    .sort({ createdAt: -1 })
    .then((users) =>
      Personnel.find({ isDefault: true })
        .select("-createdAt -updatedAt -__v")
        .then((roles) => {
          const available = users.filter((user) => !user.deletedAt);

          var newArr = [];

          for (let index = 0; index < available.length; index++) {
            const user = available[index];

            var _role = {
              roleId: 1,
            };

            roles.find((role) => {
              if (role?.user.equals(user._id)) {
                _role = role;
              }
            });

            var _user = { ...available[index]._doc, onDuty: _role };

            newArr.push(_user);
          }

          res.json(newArr);
        })
        .catch((error) => res.status(400).json({ error: error.message }))
    )
    .catch((error) => res.status(400).json({ error: error.message }));
// entity/archive
exports.archive = (req, res) =>
  User.find()
    .select(
      "-password -createdAt -updatedAt -__v -address -dob -alias -verified -isMale -rate -bio"
    )
    // .populate({
    //   path: "fullName.mname fullName.lname",
    //   select: "-createdAt -updatedAt -approved -__v",
    // })
    .sort({ createdAt: -1 })
    .then((items) => res.json(items.filter((item) => item.deletedAt)))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/find
exports.find = (req, res) =>
  User.findById(req.query.id)
    .select("-password -__v")
    // .populate({
    //   path: "fullName.mname fullName.lname",
    //   select: "-createdAt -updatedAt -approved -__v",
    // })
    .then((user) => res.json(user.deletedAt ? "No user found" : user))
    .catch((error) => res.status(400).json({ error: error.message }));

// entity/:id/update
exports.update = (req, res) => {
  User.findByIdAndUpdate(req.query.id, req.body, {
    new: true,
  })
    .select("-password")
    .then((item) => res.json(item))
    .catch((error) => res.status(400).json({ error: error.message }));
};

// entity/:id/restore
exports.restore = (req, res) => {
  User.findByIdAndUpdate(
    req.query.id,
    { deletedAt: "" },
    {
      new: true,
      populate: "fullName.mname fullName.lname",
    }
  )
    .select("-password")
    .then(() =>
      Logs.create({
        model: "users",
        itemId: req.query.id,
        action: "restore",
        user: res.locals.callerId,
      }).then(() => res.json(req.query.id))
    )
    .catch((error) => res.status(400).json({ error: error.message }));
};

// entity/:id/destroy
exports.destroy = (req, res) =>
  Entity.findByIdAndUpdate(req.query.id, {
    deletedAt: new Date().toLocaleString(),
  })
    .then(() =>
      Logs.create({
        model: "users",
        itemId: req.query.id,
        action: "delete",
        user: res.locals.callerId,
      }).then(() => res.json(req.query.id))
    )
    .catch((error) => res.status(400).json({ error: error.message }));

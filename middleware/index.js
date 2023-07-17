const { log } = require("handlebars");
const jwt = require("jsonwebtoken"),
  User = require("../models/Assets/Persons/Users"),
  policy = require("../config/access/policy");

exports.protect = (req, res, proceed) => {
  let token = req.headers.authorization;

  if (!token) {
    res.status(401).json("Not authorized, no token");
  } else {
    if (token.startsWith("QTracy")) {
      // decode token
      jwt.verify(
        token.split(" ")[1],
        process.env.JWT_SECRET,
        async (error, response) => {
          if (error && error.name) {
            res.status(401).json({ expired: "Not authorized, token expired" });
          } else {
            const _user = await User.findById(response.id);
            if (_user) {
              res.locals.callerId = response.id;
              proceed();
              // commented you to undefine role in token
              // const _base = req.baseUrl.slice(1, req.baseUrl.length).split("/");
              // const _path = req.path.slice(1, req.baseUrl.path);
              // console.log("base", _base);

              // console.log("Check your access policy, its not included");
              // console.log("_base :", _base[_base.length - 1]);
              // console.log("_path :", _path);
              // console.log("_role :", response.role);
              // const _access = policy[_base[_base.length - 1]][_path];
              // console.log("_access :", _access);

              // if (_access.includes(response.role)) {
              //   res.locals.callerId = response.id;
              //   proceed();
              // } else {
              //   res.status(403).json({
              //     error:
              //       "Not authorized, invalid access!, you don't have access on the policy",
              //   });
              // }
            } else {
              res.status(403).json({
                expired:
                  "Not authorized, invalid access, you don't have access on the policy",
              });
            }
          }
        }
      );
    } else {
      res.status(401).json({ error: "Not authorized, invalid token" });
    }
  }
};

exports.notFound = (req, res, proceed) => {
  const error = new Error(`Not found - ${req.originalUrl}`);
  res.status(400);
  proceed(error);
};

exports.errorHandler = (err, req, res, proceed) => {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === "production" ? null : err.stack,
  });
};

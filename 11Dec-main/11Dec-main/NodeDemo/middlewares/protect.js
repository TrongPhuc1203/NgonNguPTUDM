var jwt = require('jsonwebtoken');
const configs = require('../helper/configs');

module.exports = {
  checkLogin: async function (req, res, next) {
    var result = {};
    var token = req.headers.authorization;

    if (!token || !token.startsWith("Bearer")) {
      return res.status(401).json({ error: "Vui long dang nhap" });
    }

    token = token.split(" ")[1];

    try {
      var userID = await jwt.verify(token, configs.SECRET_KEY);
      req.userID = userID.id;
      next();
    } catch (error) {
      return res.status(401).json({ error: "Vui long dang nhap" });
    }
  },

  checkRole: function (requiredRoles) {
    return async function (req, res, next) {
      var user = await modelUser.getOne(req.userID);
      var role = user.role;

      if (requiredRoles.includes(role)) {
        next();
      } else {
        res.status(403).json({ error: "Ban khong du quyen" });
      }
    };
  },
};

// var jwt = require('jsonwebtoken');
// const configs = require('../helper/configs');

// module.exports = {
//     checkLogin:
//         async function (req) {
//             var result = {}
//             var token = req.headers.authorization;
//             if (!token) {
//                 return result.err = "Vui long dang nhap";
//             }
//             if (token.startsWith("Bearer")) {
//                 token = token.split(" ")[1];
//                 try {
//                     var userID = await jwt.verify(token, configs.SECRET_KEY);
//                     return userID.id;
//                 } catch (error) {
//                     return result.err = "Vui long dang nhap";
//                 }
//             } else {
//                 return result.err = "Vui long dang nhap";
//             }
//         },
    
// }
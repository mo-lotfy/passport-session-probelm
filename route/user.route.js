const express = require("express");
const auth = require("../config/auth");
const userRoute = express.Router();
const bcrypt = require('bcrypt');
const saltRounds = 10;
const myPlaintextPassword = 's0/\/\P4$$w0rD';
const someOtherPlaintextPassword = 'not_bacon';

// Require Post model in our routes module
let User = require("../model/user.model");

// Defined get data(index or listing) route
userRoute.get("/",(req, res) => {
  console.log(req.user);
  User.find(function(err, users) {
    if (err) {
      res.json(err);
    } else {
      res.json(users);
    }
  });
});

// Defined store route

userRoute.route("/add").post( async (req, res)=>{

  // const one = ;
  // const two = ;

  bcrypt.compare(await bcrypt.hashSync(req.body.password, 10), await bcrypt.hashSync(req.body.password, 10), function(err, result) {
    console.log(result);
  });

  // const userData = {
  //   username: req.body.username,
  //   email: req.body.email,
  //   password: one
  // };

  // let user = new User(userData);
  // user
  //   .save()
  //   .then(() => {
  //     res.status(200).json({ business: "business in added successfully" });
  //   })
  //   .catch(() => {
  //     res.status(400).send("unable to save to database");
  //   });


});

module.exports = userRoute;

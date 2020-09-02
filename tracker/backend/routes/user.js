const express = require("express");
const router = express.Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const keys = require("../config/keys");
const passport = require("passport");

// Load input validation
const validateRegisterInput = require("../validation/register");
const validateLoginInput = require("../validation/login");

// Load User model
const User = require('../models/user.model');
const Account = require('../models/account.model');


// @route POST api/users/register
// @desc Register user
// @access Public
router.post("/register", (req, res) => {
  // Form validation
  const { errors, isValid } = validateRegisterInput(req.body);
  
  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }
  console.log(req.body);
  User.findOne({ email: req.body.email }).then(user => {
    if (user) {
      return res.status(400).json({ msg: "Email already exists" });
    } else {
      const date = Date.parse(req.body.date);
      const newUser = new User({
        name: req.body.name,
        email: req.body.email,
        password: req.body.password,
        date
      });

      // Hash password before saving in database
      bcrypt.genSalt(10, (err, salt) => {
        bcrypt.hash(newUser.password, salt, (err, hash) => {
          if (err) throw err;
          newUser.password = hash;
          newUser
            .save()
            .then(user => res.json(user))
            .catch(err => console.log(err));
        });
      });
    }
  });
});
router.route('/add').post((req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const user = req.body.user;
  const password = req.body.password;
  const date = Date.parse(req.body.date);

  const newAccount = {
    name,
    user,
    password,
    date
};

  User.findOne({_id: id}, (err, user) => {
    if (err) return console.log(err);
    user.accounts.push(newAccount);
    user.save( (err) => {
      if (err) return console.log(err)
    })
  })
    
  
    
});
// @route POST api/users/login
// @desc Login user and return JWT token
// @access Public
router.post("/login", (req, res) => {
  // Form validation

  const { errors, isValid } = validateLoginInput(req.body);

  // Check validation
  if (!isValid) {
    return res.status(400).json(errors);
  }

  const email = req.body.email;
  const password = req.body.password;

  // Find user by email
  User.findOne({ email }).then(user => {
    // Check if user exists
    if (!user) {
      return res.status(404).json({ emailnotfound: "Email not found" });
    }

    // Check password
    bcrypt.compare(password, user.password).then(isMatch => {
      if (isMatch) {
        // User matched
        // Create JWT Payload
        const payload = {
          id: user.id,
          name: user.name
        };

        // Sign token
        jwt.sign(
          payload,
          keys.secretOrKey,
          {
            expiresIn: 31556926 // 1 year in seconds
          },
          (err, token) => {
            res.json({
              success: true,
              token: "Bearer " + token,
              payload
            });
          }
        );
      } else {
        return res
          .status(400)
          .json({ passwordincorrect: "Password incorrect" });
      }
    });
  });
});

module.exports = router;
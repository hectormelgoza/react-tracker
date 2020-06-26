const router = require('express').Router();

let User = require('../models/user.model');

router.route('/').get((req, res) => {
    User.find()
      .then(user => res.json(user))
      .catch(err => res.status(400).json('Error: Did not find anything!' + err));
  });

  router.route('/').post((req, res) => {
    const name = req.body.name;
    const password = req.body.password;
    const date = Date.parse(req.body.date);
  
  
    const newUser = new User({
      name,
      password,
      date
    });
  
    newUser.save()
    .then(() => res.json('User added!!!'))
    .catch(err => res.status(400).json('Error: ' + err));
  });
module.exports = router; 
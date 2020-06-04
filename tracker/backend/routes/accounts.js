const router = require('express').Router();

const Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(accounts => {
      return res.json(accounts);
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const user = req.body.user;
  const password = req.body.password;
  const date = Date.parse(req.body.date);

  const newAccount = new Account({
    name,
    user,
    password,
    date
    
  });

  newAccount.save()
  .then(() => res.json('account added!!!'))
  .catch(err => res.status(400).json('Error: ' + err));
});

/*  router.route('/:id').get((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => res.json(exercise))
    .catch(err => res.status(400).json('Error: ' + err));
}); */

router.route('/:id').delete((req, res) => {
  Account.findByIdAndDelete(req.params.id)
    .then(() => res.json('Account deleted!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

/* router.route('/update/:id').post((req, res) => {
  Exercise.findById(req.params.id)
    .then(exercise => {
      exercise.username = req.body.username;
      exercise.description = req.body.description;
      exercise.duration = Number(req.body.duration);
      exercise.date = Date.parse(req.body.date);

      exercise.save()
        .then(() => res.json('Exercise updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
}); */

module.exports = router; 
const router = require('express').Router();

let Account = require('../models/account.model');

router.route('/').get((req, res) => {
  Account.find()
    .then(acc => res.json(acc))
    .catch(err => res.status(400).json('Error: Did not find anything!' + err));
});

router.route('/:id').get((req, res) => {
  Account.findById(req.params.id)
    .then(acc => res.json(acc))
    .catch(err => res.status(400).json('Error: Did not find anything!' + err));
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



router.route('/delete/:id').delete((req, res) => {
  Account.findByIdAndDelete(req.params.id)
    .then(() => res.json('Account deleted!!'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').post((req, res) => {
  Account.findById(req.params.id)
    .then(acc => {
      acc.name = req.body.name;
      acc.user = req.body.user;
      acc.password = req.body.password;
      acc.date = Date.parse(req.body.date); 

      acc.save()
        .then(() => res.json('Account updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});

module.exports = router; 
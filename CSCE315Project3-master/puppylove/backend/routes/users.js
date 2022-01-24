const express = require("express");
const router = express.Router();
let User = require("../models/user.model");

router.route('/').get((req, res) => {
  User.find()
    .then(users => res.json(users))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/browse/:id/:city/:USstate').get((req, res) => {
  User.find({_id: {$ne: req.params.id},
            city: req.params.city,
            USstate: req.params.USstate},
            {_id: 1, name: 1, email: 1, city: 1, USstate: 1})
            .then(users => res.json(users))
            .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  const name = req.body.name;
  const email = req.body.email;
  const password = req.body.password;
  const street = req.body.street;
  const city = req.body.city;
  const USstate = req.body.USstate;
  const zip = req.body.zip;
  const newUser = new User({
    name,
    email,
    password,
    street,
    city,
    USstate,
    zip
  });

  newUser.save()
    .then((user) => res.json(user))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/login').post((req, res) => {
  const email = req.body.email;
  const password = req.body.password;

  console.log(email, password);
  User.find( {email: email, 
              password: password}, 
              {_id: 1, name: 1, city: 1, USstate: 1, dog_id: 1} )
              .then(users => res.json(users))
              .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:id').get((req, res) => {
  User.findById(req.params.id)
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/matches_user/:id').get((req, res) => {
  User.findById(req.params.id,
                {matches: 1, _id: 0, email: 1, name: 1})
    .then(user => res.json(user))
    .catch(err => res.status(400).json('Error: ' + err))
})

router.route('/:email').delete((req, res) => {
  User.findOneAndDelete({email: req.params.email})
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/update/:id').post((req, res) => {
  User.findByIdAndUpdate(req.params.id)
    .then(users => {
      if (req.body.name){
        users.name = req.body.name;
      }
      if (req.body.email){
        users.email = req.body.email;
      }
      if (req.body.password){
        users.password = req.body.password;
      }
      if (req.body.dog_id){
        users.dog_id = req.body.dog_id;
      }
      if (req.body.matches){
        if (req.body.push == "true") {
          users.matches.addToSet(req.body.matches);
        }
        else {
          users.matches.pull(req.body.matches);
        }
      }
      users.save()
        .then(() => res.json('User updated!'))
        .catch(err => res.status(400).json('Error: ' + err));
    })
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;

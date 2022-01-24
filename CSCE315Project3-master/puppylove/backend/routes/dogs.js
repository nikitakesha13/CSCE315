// const multer = require('multer');
const express = require("express");
const router = express.Router();
let Dog = require("../models/dog.model");

// const storage = multer.diskStorage({
//   destination: (req, file, cb) => {
//       cb(null, './public/');
//   },
//   filename: (req, file, cb) => {
//       // cb(null, Date.now() + file.originalname);
//       cb(null, Date.now() + file.originalname);
//   }
// });

// const upload = multer({
//   storage: storage,
//   fileFilter: (req, file, cb) => {
//       if (file.mimetype == "image/png" || file.mimetype == "image/jpg" || file.mimetype == "image/jpeg") {
//           cb(null, true);
//           console.log("I reched the if in multer");
//       } else {
//           cb(null, false);
//           return cb(new Error('Only .png, .jpg and .jpeg format allowed!'));
//       }
//   }
// });


router.route('/').get((req, res) => {
  Dog.find()
    .then(dogs => res.json(dogs))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/add').post((req, res) => {
  console.log("i am adding a dog");
  const name = req.body.name;
  const user_id = req.body.user_id;
  const fixed = req.body.fixed;
  const age = req.body.age;
  const size = req.body.size;
  const breed = req.body.breed;
  const activity = req.body.activity;
  const aggression = req.body.aggression;
  const potty = req.body.potty;
  const vaccine = req.body.vaccine;
  const bio = req.body.bio;
  // const image = req.file.filename;

  const newDog = new Dog({
    name,
    user_id,
    fixed,
    age,
    size,
    breed,
    activity,
    aggression,
    potty,
    vaccine,
    bio
    // image
  });

  console.log(newDog);

  newDog.save()
    .then((dog) => res.json(dog))
    .catch((err) => res.status(400).json('Error: ' + err));
});

router.route('/:user_id').get((req, res) => {
  Dog.find({user_id: req.params.user_id})
    .then(dog => res.json(dog))
    .catch(err => res.status(400).json('Error: ' + err));
});

router.route('/:user_id/:name').delete((req, res) => {
  Dog.findOneAndDelete({email: req.params.user_id, 
                        name: req.params.name})
    .then(() => res.json('User deleted'))
    .catch(err => res.status(400).json('Error: ' + err));
});
module.exports = router;
const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const dogSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  user_id: {
      type: String,
      required: true,
  },
  fixed: {
      type: String,
      required: true,
  },
  age: {
    type: String,
    required: true,
  }, 
  size: {
    type: String,
    required: true,
  },
  breed: {
      type: String,
      required: true,
  },
  activity: {
      type: String,
      required: true,
  },
  aggression: {
      type: String,
      required: true,
  },
  potty: {
      type: String,
      required: true,
  },
  vaccine: {
      type: String,
      required: true,
  },
  bio: {
      type: String,
      required: false,
  },
  // image: {
  //   type: String,
  //   required: false
  // }
}, {
    timestamps: true,
});

const Dog = mongoose.model('Dog', dogSchema);
module.exports = Dog;
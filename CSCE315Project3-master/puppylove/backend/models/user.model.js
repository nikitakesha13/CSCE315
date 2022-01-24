const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userSchema = new Schema({
  name: {
    type: String,
    required: true,
    minlength: 3
  },
  email: {
    type: String,
    required: true,
    unique: true
  }, 
  password: {
    type: String,
    required: true,
  },
  dog_id: {
    type: String,
    required: false,
  },
  matches: {
    type: [{
      _id: false,
      user_id: {
        type: String,
        required: true
      }, 
      dog_id: {
        type: String,
        required: true
      }
    }],
    required: false
  },
  street: {
    type: String,
    required: true
  },
  city: {
    type: String,
    required: true
  },
  USstate: {
    type: String,
    required: true
  },
  zip: {
    type: String,
    required: true
  },
}, {
    timestamps: true,
});

const User = mongoose.model('User', userSchema);
module.exports = User;

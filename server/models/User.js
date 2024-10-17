const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  phone: {type: String, required: true},
  password: { type: String, required: true }, 
  location: { 
    latitude: { type: Number }, 
    longitude: { type: Number } 
  }, 
  profile: { type: String },
  bio: { type: String },
  googleId: { type: String, unique: true }  
}, { timestamps: true });

const User = mongoose.model('User', userSchema);
module.exports = User;

const bcrypt = require('bcryptjs');
const User = require('../models/User');
const jwt = require('jsonwebtoken');
require('dotenv').config();

const generateToken = (user) => {
  const payload = {
      id: user._id,
      email: user.email,
  };
  return jwt.sign(payload, process.env.JWT_SECRET, { expiresIn: '1h' });
};

exports.userLogin = async (req, res) => {
  const { username, password } = req.body;
  
  try {
    const user = await User.findOne({
      $or: [{ username: username }, { email: username }]
    });
    
    if (!user) {
      console.log('User does not exist!');
      return res.status(400).json({ message: 'User does not exist!' });
    }
    
    //password comparison
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }
    
    const token = generateToken(user);
    // If login is successful, create a session
    req.session.user = {
      id: user._id,
      username: user.username,
      email: user.email,
      token: token
    };
    return res.status(200).json({success: true, data: req.session.user, message: 'User login successful!'})

  } catch (error) {
    console.error(error.message);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.registerUser = async (req,res) => {
  const { username, email, phone, password  } = req.body;
  if(!username || !email || !phone || !password) return res.status(400).json({success: false, message: 'Bad request'});

  try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      
      if(hashedPassword){
        const userData = new User({
            username: username,
            email: email,
            phone: phone,
            password: hashedPassword
        })
        await userData.save()
        console.log('New user created', userData);
        return res.status(201).json({success: true, data: userData, message: 'New user created successfully!'})
     }
  } catch(err){
      console.log('Error while creating user', err);
      return res.status(500).json({success: false, message: 'Internal server error'});
  }
}

exports.userLogout = (req, res) => {
    req.session.destroy(err => {
      if (err) {
        return res.status(500).json({success:false, message: 'Logout failed' });
      }
      res.clearCookie('connect.sid');
      res.json({ success:true, message: 'Logged out successfully' });
      console.log("A user just logged out!")
    });
  }
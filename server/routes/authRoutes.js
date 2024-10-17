const express = require('express');
const router = express.Router()
const {registerUser, userLogin, userLogout} = require('../controllers/authController');


// Default Route
router.get('/',(req,res) => res.json("Welcome to the Auth Route"))

//my other routes
router.post('/v2/register', registerUser);
router.post('/v2/login', userLogin);
router.post('/logout', userLogout);
  
module.exports = router;
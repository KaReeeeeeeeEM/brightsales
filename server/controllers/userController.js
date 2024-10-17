const User = require('../models/User');
const bcrypt = require('bcryptjs');

// Get all users
exports.getAllUsers = async (req, res) => {
    try {
      const users = await User.find();
      res.status(200).json({success: true, data: users, message: 'Fetched all users'});
    } catch (error) {
      res.status(500).json({ error: 'Error fetching users', error });
    }
  };

exports.getUser = async (req,res) =>{
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message: 'Bad request' });

    try{
        const user = await User.findById(id);
        if (!user) {
            return res.status(404).json({ success: false, message: 'User not found' });
          }
          res.status(200).json({success: true, data: user, message: 'User found!'});
        }catch (error) {
          res.status(500).json({ message: 'Error fetching user', error });
      }
}

exports.createUser = async (req,res) => {
    const { username, email, phone, password  } = req.body;
  if(!username || !email || !phone || !password) return res.status(400).json({success: false, message: 'Bad request'});

  try{
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password,salt);
      
      if(hashedPassword){
        const userData = {
            username: username,
            email: email,
            phone: phone,
            password: hashedPassword
        }
        const newUser = await userData.save();

        if(newUser){
            console.log('New user created', newUser);
            return res.status(201).json({success: true, data: newUser, message: 'New user created successfully!'})
        }
     }
  } catch(err){
      return res.status(500).json({success: false, message: 'Internal server error'});
  }
}

exports.updateUser = async (req,res) => {
    const { userUpdates } = req.body;
    const { id } = req.params;

    if(!id || !userUpdates) return res.status(400).json({success: false, message: 'Bad request' });
    try{
        const updatedUser = await User.findByIdAndUpdate(id, userUpdates, { new: true});
        if(updatedUser){
            console.log('User updated', updatedUser);
            res.status(200).json({success:true ,data: updatedUser, message: 'User updated successfully!'})
        }else{
            res.status(400).json({success: false, message: 'Invalid credentials!'});
        }
    } catch(err){
        console.log('Error while updating user', err);
        res.status(500).json({success: false, message: 'Internal server error!'});
    }
}


exports.deleteUser = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message: 'Bad request' });

    try{
        const deleteUser = await User.findByIdAndDelete(id);
        if(deleteUser){
            console.log('User deleted successfully');
            return res.status(200).json({ success: true, data: '' , message: 'User deleted successfully!'});
        }
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}


exports.deleteAllUsers = async (req,res) => {
    try{
        const allUsers = await User.find();
        if(allUsers){
            console.log('All users deleted successfully!');
            return res.status(200).json({ success: true, data: '' , message: 'User deleted successfully!'});
        }
    }catch(err){
        return res.status(500).json({success: false, message: 'Internal server error'});
    }
}
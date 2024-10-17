const express = require('express');
const router = express.Router();
const { getAllUsers, getUser, createUser, updateUser, deleteUser, deleteAllUsers } = require('../controllers/userController');

router.get('/',getAllUsers);
router.get('/:id',getUser);
router.post('/',createUser);
router.put('/:id',updateUser);
router.delete('/:id',deleteUser);
router.delete('/:id',deleteAllUsers);

module.exports = router;
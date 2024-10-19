const express = require('express');
const router = express.Router()
const {createActivity, getActivities} = require('../controllers/activityController');

router.get('/',getActivities)
router.post('/', createActivity);

  
module.exports = router;
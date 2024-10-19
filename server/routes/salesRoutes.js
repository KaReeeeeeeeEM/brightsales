const express = require('express');
const router = express.Router()
const {getSales, createSales,updateSales, deleteSales} = require('../controllers/salesController');

router.get('/', getSales);
router.post('/', createSales);
router.put('/:id', updateSales);
router.delete('/:id', deleteSales);

  
module.exports = router;
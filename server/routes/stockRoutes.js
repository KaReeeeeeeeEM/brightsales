const express = require('express');
const router = express.Router();
const { getAllStock, getStockById, createStock, updateStock, deleteStock } = require('../controllers/stockController');

router.get('/',getAllStock);
router.get('/:id',getStockById);
router.post('/',createStock);
router.put('/:id',updateStock);
router.delete('/:id',deleteStock);

module.exports = router;
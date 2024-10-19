const Stock = require('../models/Stock');

// Get all stock
exports.getAllStock = async (req, res) => {
  try {
    const stock = await Stock.find().populate('seller');
    res.json({success:true, data:stock , message:'Stock found!'});
  } catch (error) {
    res.status(500).json({success:false, message: 'Failed to get stock' });
  }
};

// Get a specific stock by ID
exports.getStockById = async (req, res) => {
  try {
    const stock = await Stock.findById(req.params.id).populate('seller');
    if (stock) {
      res.json({success:true, data: stock , message:'Stock found!'});
    } else {
      res.status(404).json({ success:false, messge: 'Stock not found' });
    }
  } catch (error) {
    res.status(500).json({ success:false, messge: 'Failed to get Stock' });
  }
};

// Create a new stock
exports.createStock = async (req, res) => {  
  const {name, type, quantity, seller, date} = req.body;
  if(!name || !type || !quantity || !seller || !date ) return res.status(400).json({success: false, message: 'Bad request!'});

  try {
    const newStock = new Stock(
      req.body
    );
    await newStock.save();
    console.log({success: true, data: newStock, message: 'New stock added!'});
    res.status(201).json({success: true, data: newStock, message: 'New stock recorded!'});
  } catch (error) {
    console.log('Failed to add stock',error)
    res.status(500).json({success: false ,message: 'Failed to create stock' });
  }
};

// Update a stock by ID
exports.updateStock = async (req, res) => {
  const { id } = req.params;
    if(id){
      try {
          const updatedStock = await Stock.findByIdAndUpdate(id, req.body, { new: true });
          if (updatedStock) {
            res.json({success:true, data: updatedStock, message: 'Stock updated successfully!'});
          } else {
            res.status(404).json({success: false, message: 'Stock not found' });
          }
        } catch (error) {
          res.status(500).json({success: false, message: `Failed to update stock, ${error}` });
        }
      } else {
        res.status(400).json({ success: false, message: 'Stock ID is required.' });
      }
}

// Delete a stock by ID
exports.deleteStock = async (req, res) => {
  try {
    const deletedStock = await Stock.findByIdAndDelete(req.params.id);
    if (deletedStock) {
      res.json({ success: true, data:'', message: 'Stock deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Stock not found' });
    }
  } catch (error) {
    res.status(500).json({ success: false, message: 'Failed to delete stock' });
  }
};

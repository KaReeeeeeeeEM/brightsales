const Sales = require('../models/Sales');

exports.getSales = async (req,res) => {
    try{
        const allSales = await Sales.find().populate('stock seller');
        console.log({success: true, data: allSales, message: 'Sales fetched successfully!', results: allSales.length})
        return res.status(200).json({success: true, data: allSales, message: 'Sales fetched successfully!', results: allSales.length})
    }catch(err){
        console.log({success: false, message: 'Failed to fetch sales'})
        return res.status(500).json({success: false, message: 'Failed to fetch sales'});
    }
}

exports.createSales = async (req,res) => {
    const { stock, amount, seller, date } = req.body;
    if(!stock || !amount || !seller || !date) return res.status(400).json({success: false, message: 'Bad request!'});

    try{
        const payload = {
            stock: stock,
            amount: amount,
            seller: seller,
            date: date
        }
        const newSale = new Sales(payload);
        await newSale.save();
        console.log({success: true, data: newSale, message: 'New sale added!' })
        res.status(201).json({success: true, data: newSale, message: 'New sale added!' })
    }catch(err){
        console.log({success: false, message: 'Error creating sale', err})
        return res.status(500).json({success: false, data: err, message: 'Error creating sale!' })
    }
}

exports.updateSales = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Sales.findByIdAndUpdate(id, req.body);
        console.log({success: true, data: '', message: 'Sale updated successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Sale updated successfully!' })
    }catch(err){
        console.log({success: false, data: err, message: 'Error updating sale!'})
        return res.status(500).json({success: false, data: err, message: 'Error updating sale!' })
    }
}

exports.deleteSales = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Sales.findByIdAndDelete(id);
        console.log({success: true, data: '', message: 'Sale deleted successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Sale deleted successfully!' })
    }catch(err){
        console.log({success: false, data: err, message: 'Error deleting sale!'})
        return res.status(500).json({success: false, data: err, message: 'Error deleting sale!' })
    }
}
const Expense = require('../models/Expense');

exports.getExpenses = async (req,res) => {
    try{
        const allExpenses = await Expense.find().populate('seller');
        console.log({success: true, data: allExpenses, message: 'Expenses fetched successfully!', results: allExpenses.length})
        return res.status(200).json({success: true, data: allExpenses, message: 'Expenses fetched successfully!', results: allExpenses.length})
    }catch(err){
        console.log({success: false, message: 'Failed to fetch Expenses'})
        return res.status(500).json({success: false, message: 'Failed to fetch Expenses'});
    }
}

exports.createExpense = async (req,res) => {
    const { name, cost, seller, date } = req.body;
    if(!name || !cost || !seller || !date) return res.status(400).json({success: false, message: 'Bad request!'});

    try{
        const payload = {
            name: name,
            cost: cost,
            seller: seller,
            date: date
        }
        const newExpense = new Expense(payload);
        await newExpense.save();
        console.log({success: true, data: newExpense, message: 'New expense added!' })
        res.status(201).json({success: true, data: newExpense, message: 'New expense added!' })
    }catch(err){
        console.log({success: false, message: 'Error creating expense', err})
        return res.status(500).json({success: false, data: err, message: 'Error creating expense!' })
    }
}

exports.updateExpense = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Expense.findByIdAndUpdate(id, req.body);
        console.log({success: true, data: '', message: 'Expense updated successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Expense updated successfully!' })
    }catch(err){
        console.log({success: false, data: err, message: 'Error updating expense!'})
        return res.status(500).json({success: false, data: err, message: 'Error updating expense!' })
    }
}

exports.deleteExpense = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Expense.findByIdAndDelete(id);
        console.log({success: true, data: '', message: 'Expense deleted successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Expense deleted successfully!' })
    }catch(err){
        console.log({success: false, data: err, message: 'Error deleting expense!'})
        return res.status(500).json({success: false, data: err, message: 'Error deleting expense!' })
    }
}
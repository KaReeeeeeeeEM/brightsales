const Category = require('../models/Category');

exports.getCategories = async (req,res) => {
    try{
        const allCategories = await Category.find().populate('seller');
        console.log({success: true, data: allCategories, message: 'Categories fetched successfully!', results: allCategories.length})
        return res.status(200).json({success: true, data: allCategories, message: 'Categories fetched successfully!', results: allCategories.length})
    }catch(err){
        console.log({success: false, message: 'Failed to fetch categories'})
        return res.status(500).json({success: false, message: 'Failed to fetch categories'});
    }
}

exports.createCategory = async (req,res) => {
    const { name, seller } = req.body;
    if(!name || !seller) return res.status(400).json({success: false, message: 'Bad request!'});

    try{
        const existingCategory = await Category.findOne({name: name})
        console.log(existingCategory)
        if(existingCategory) return res.status(500).json({success: false, message: 'Category already exists!' });

        const payload = {
            name: name,
            seller: seller
        }
        const newCategory = new Category(payload);
        await newCategory.save();
        console.log({success: true, data: newCategory, message: 'New category added!' })
        res.status(201).json({success: true, data: newCategory, message: 'New category added!' })
    }catch(err){
        console.log({success: false, message: 'Error creating category', err})
        return res.status(500).json({success: false, data: err, message: 'Error creating category!' })
    }
}

exports.updateCategory = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Category.findByIdAndUpdate(id, req.body);
        console.log({success: true, data: '', message: 'Category updated successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Category updated successfully!' })
    }catch(err){
        console.log({success: false, message: 'Error updating category', err})
        return res.status(500).json({success: false, data: err, message: 'Error updating category!' }) 
    }
}

exports.deleteCategory = async (req,res) => {
    const { id } = req.params;
    if(!id) return res.status(400).json({success: false, message:'Bad request' });

    try{
        await Category.findByIdAndDelete(id);
        console.log({success: true, data: '', message: 'Category deleted successfully!' })
        return res.status(200).json({success: true, data: '', message: 'Category deleted successfully!' })
    }catch(err){
        console.log({success: false, data: err, message: 'Error adding category!'})
        return res.status(500).json({success: false, data: err, message: 'Error deleting category!' })
    }
}
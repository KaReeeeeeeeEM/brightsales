const Activity = require('../models/Activity');

exports.getActivities = async (req,res) => {
    try{
        const allActivities = await Activity.find().populate('seller');
        console.log({success: true, data: allActivities, message: 'Activities fetched successfully!', results: allActivities.length})
        return res.status(200).json({success: true, data: allActivities, message: 'Activities fetched successfully!', results: allActivities.length})
    }catch(err){
        console.log({success: false, message: 'Failed to fetch activities'})
        return res.status(500).json({success: false, message: 'Failed to fetch activities'});
    }
}

exports.createActivity = async (req,res) => {
    const { name , seller, details } = req.body;
    if(!name || !seller || !details) return res.status(400).json({success: false, message: 'Bad request!'});

    try{
        const payload = {
            name: name,
            seller: seller,
            details: details
        }
        const newActivity = new Activity(payload);
        await newActivity.save();
        console.log({success: true, data: newActivity, message: 'New activity added!' })
        res.status(201).json({success: true, data: newActivity, message: 'New activity added!' })
    }catch(err){
        console.log({success: false, message: 'Error creating activity', err})
        return res.status(500).json({success: false, data: err, message: 'Error creating activity!' })
    }
}
const express = require('express')
const router = express.Router()
const {AdminModel , ProjectModel } = require('../db/schema.js')
const mongoose  = require('mongoose')

router.get('/projects' ,async(req, res)=>{
    ProjectModel.find({}).then((r) =>{
        console.log(r);
        res.status(200).json({
            projects : r
        })
    }).catch((error ) => {
        res.status(401).json({
            msg : "Something went wrong"
        })
    })
})

router.get('/projects/:id' ,async(req, res)=>{
    if (!mongoose.isValidObjectId(req.params.id))
    {
        return res.status(401).json({
            msg : "Not a valid Id"
        })
    }
    let id = new mongoose.Types.ObjectId(req.params.id)
    ProjectModel.findOne({_id : id}).then((r) =>{
        console.log(r);
        res.status(200).json({
            project : r
        })
    }).catch((error ) => {
        res.status(401).json({
            msg : "Something went wrong"
        })
    })
})

module.exports = router;
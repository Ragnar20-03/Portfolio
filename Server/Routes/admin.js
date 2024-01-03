const express = require('express');
const router = express.Router()
const adminMiddleware = require('../Middlewares/adminMiddleware')
const { AdminModel, ProjectModel, zodProject } = require('../db/schema');
const jwt = require('jsonwebtoken')
const JWT_SECRET = require('../config.js')
const mongoose = require('mongoose')
router.post('/login', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    AdminModel.findOne({ username: username, password: password }).then(async (response) => {
        if (response) {

            let token = jwt.sign({ username: username, id: response._id, isAdmin: true }, JWT_SECRET)
            res.status(200).json({
                msg: "Login Success",
                token: token
            })
        }
        else {
            res.status(401).json({
                msg: "Admin Account Not Found !"
            })
        }
    }).catch((error) => {
        console.log(error);
        res.status(401).json({
            msg: "Something went wrong"
        })
    })


})

router.post('/signin', async (req, res) => {
    let username = req.body.username;
    let password = req.body.password;
    let email = req.body.email
    AdminModel.find({ username: username }).then(async (response) => {
        if (response.length > 0) {
            res.status(401).json({
                msg: "Admin Already Registerd"
            })
        }
        else {
            let query = await AdminModel.create({
                username,
                password,
                email
            })
            if (query._id) {
                let token = jwt.sign({ username: username, id: query._id, isAdmin: true }, JWT_SECRET)
                res.status(200).json({
                    msg: "Signup Success",
                    token: token
                })
            }
            else {
                res.status(401).json({
                    msg: "Registreation Failed"
                })
            }
        }
    }).catch((error) => {
        res.status(401).json({
            msg: "Something wwent wrong"
        })
    })


})

router.post('/projects', adminMiddleware, async (req, res) => {
    let adminUsername = req.username;
    // console.log(adminUsername);

    let parsing = zodProject.safeParse({
        projectName: req.body.projectName,
        projectDescription: req.body.desc,
        srcLink: req.body.srcLink,
        imageLink: req.body.imageLink,
        liveLink: req.body.liveLink,
    })
    if (parsing.success == true) {
        ProjectModel.create({
            projectName: req.body.projectName,
            projectDescription: req.body.desc,
            srcLink: req.body.srcLink,
            imageLink: req.body.imageLink,
            liveLink: req.body.liveLink,
            projects: []
        }).then(async (response) => {
            console.log("response is :::: ", response);
            let query = await AdminModel.updateOne({ username: adminUsername }, {
                $push: {
                    projects: response._id
                }
            })
            if (query.acknowledged) {
                if (response != null) {
                    res.status(200).json({
                        msg: "Project Added Succesfully",
                    })
                }
            }
        }).catch((error) => {
            res.status(401).json({
                msg: "Something wwent wrong"
            })
        })
    }
})


router.get('/projects', adminMiddleware, async (req, res) => {
    AdminModel.findOne({ username: req.username }).then(async (response) => {
        console.log(await response);

        let projects = await ProjectModel.find({
            _id: {
                $in: response.projects
            }
        })
        res.status(200).json({
            projects: projects
        })
    }).catch((error) => {
        console.log(error, " errro");
    })
})
router.get('/projects/:id', adminMiddleware, async (req, res) => {
    const id = new mongoose.Types.ObjectId(req.params.id);

    ProjectModel.findOne({ _id: id }).then((response) => {
        res.status(200).json({
            projects: response
        })
    }).catch((error) => {
        res.status(401).json({
            msg: "Somthing went wrong"
        })
    })
})

router.post('/updateProject', async (req, res) => {

})


router.post('/deleteProject/:id', async (req, res) => {
    let id = new mongoose.Types.ObjectId(req.params.id)
    ProjectModel.findOneAndDelete({ _id: id }).then((resX) => {
        if (resX != null) {
            res.status(401).json({
                msg: "Project Deleted succefully!"
            })
        }
        else {
            res.status(401).json({
                msg: "Project Not Found"
            })
        }
    }).catch((error) => {

        res.status(401).json({

            msg: "Somthing went wrong"
        })
    })
})


module.exports = router
const express = require('express');
const router = express.Router();
const cors = require('cors')
router.use(cors())

const projects = [{
    projectName : "CVFS" , 
    description : "System Programming in C",
    link: "https://github.com/KaushalKapadnis/CVFS",
     img: "assets/cvfs.png"
},
{
    projectName : "MEAN Stack " , 
    description : "Developed in Angular",
    link: "https://github.com/KaushalKapadnis/CVFS",
     img: "assets/cvfs.png"
},
{
    projectName : "Packer -UnPacker" , 
    description : "Zip Application using java",
    link: "https://github.com/KaushalKapadnis/CVFS",
     img: "assets/cvfs.png"
}]

router.get('/projects', async (req, res) => {
    res.status(200).json({
         projects
    })
})

module.exports = router;
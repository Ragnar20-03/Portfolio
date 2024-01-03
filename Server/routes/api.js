const express = require('express');
const router = express.Router();

router.get('/projects',async (req, res) => {

    console.log("Here");
    res.send({"Projects":[{name:"CVFS", description:"Develpoed in C",link:"https://github.com/KaushalKapadnis/CVFS",img:"assets/cvfs.png"},
                            {name:"Scientefic Calculator",description:"Develpoed in java",link:"https://github.com/KaushalKapadnis/Project",img:"../assets/calc.png"},
                            {name:"Packer-Unpacker",description:"Develpoed in java",link:"https://github.com/KaushalKapadnis/Project",img:"../assets/packer.png"}
                           ]});
})

module.exports = router;
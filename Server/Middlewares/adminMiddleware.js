const mongoose = require('mongoose');

const jwt = require('jsonwebtoken');
const JWT_SECRET = require('../config.js');
const { AdminModel } = require('../db/schema.js');

function adminMiddleware (req ,res , next)
{
    try
    {
        console.log("inside Middleware");
    if (!req.headers.authorization)
    {
        res.status(401).json({
            msg  :"Unauthorized Request"
        })
    }
    let token = req.headers.authorization.split(' ')[1]
    if (!token)
    {
        res.status(401).json({
            msg  :"Unauthorized Request"
        })
    }
    let decodedToken = jwt.verify(token , JWT_SECRET);
    if (!decodedToken)
    {
        res.status(401).json({
            msg  :"Unauthorized Request"
        })
    }
    if (!decodedToken.isAdmin )
    {
        res.status(401).json({
            msg  :"Unauthorized Request"
        })
    }
    req.username = decodedToken.username;
    AdminModel.find({username : req.username}).then((response) => {
        if (response.length < 1)
        {
            return res.status(401).json({
                msg  :"Unauthorized Request"
            })
        }
        else 
        {
            next();

        }
    })
    }
    catch(error)
    {
        res.status(401).json({
            msg  :"Admin Not Found"
        })
    }
}

module.exports = adminMiddleware
import express from 'express';
import UserModel from '../model/user';
import jwt from 'jsonwebtoken';
import { JWT_SECRETE } from '../config/config';
const router = express.Router();

import userMiddleware from "../Middleware/UserMiddleware"

router.post('/login' , async (req, res) => {
    // Implement your login logic here
    const email = req.body.email 
    const password = req.body.password

try { 
    const isExist = await UserModel.findOne({email }) ; 
    console.log("isExist is : " , isExist);
    if (!isExist) {
        return res.status(400).json({
            msg : " Account Not Found !"
        })
    }
    else 
    {
        if ( isExist.password == password )
        {
            let token = jwt.sign({uid : isExist._id } , JWT_SECRETE , {
                expiresIn : "1d"
            } )
            return res.status(200).json({
                msg : "Login Successful" , 
                token
            })
        }
    }
}catch(error ) { 
    console.log("Something Went Wrong ! " , error);
    
}
    

});

router.post('/register', async (req, res) => {
    const { fname, lname, ph, email, address, gitLink, linkdein, threads } = req.body;

    try {
        // Check if the user already exists by email
        const existingUser = await UserModel.findOne({ email });
        if (existingUser) {
            return res.status(400).json({ msg: "User already registered" });
        }

        // Create a new user
        const newUser = await UserModel.create({ fname, lname, ph, email, address, gitLink, linkdein, threads });


        return res.status(201).json({ msg: "Registered successfully!" });
    } catch (error) {

        return res.status(500).json({ msg: "Something went wrong!" });
    }
});

export default router;

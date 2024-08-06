import express from "express"
const router = express.Router() ; 

router.post('/login' , async (req , res) => {
    console.log("inside user");
})  

router.post('/register' , async (req ,res ) => {
    
})

export default  router  
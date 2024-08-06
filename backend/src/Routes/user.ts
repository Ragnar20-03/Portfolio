import express from "express"
const router = express.Router() ; 

router.get('/' , async (req , res) => {
    res.json({
        msg : " connected.."
    })
})  

router.post('/register' , async (req ,res ) => {
    
})

export default  router  
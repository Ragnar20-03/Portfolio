import mongoose, {Schema , model , connect, mongo} from 'mongoose'
import { MONGO_URL } from '../config/config'

mongoose.connect(MONGO_URL  ).then((res) => {
    console.log("Mongodb Atlas Connection Succesfull !");
}).catch((e) => {
    console.log("error in connecting with Mongodb Atlas" , e);
})

interface User 
{
    fname : string , 
    lname : string , 
    ph : string , 
    email : string, 
    address : string  , 
    gitLink : string , 
    linkdein : string , 
    threads : string , 
    profileUrl ?: string , 
    password : string
}


const userSchema  = new  mongoose.Schema< User > ({
    fname : { type : String  , required : true},
    lname : { type : String  , required : true},
    ph : { type : String  , required : true},
    email : { type : String  , required : true},
    password : { type : String  , required : true},
    threads : { type : String  , required : true},
    address : { type : String  , required : true},
    gitLink : { type : String  , required : true},
    linkdein : { type : String  , required : true},
    profileUrl : { type : String  }
})

const UserModel = mongoose.model('user' , userSchema)

 export default UserModel 
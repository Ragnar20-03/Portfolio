const mongoose = require('mongoose');
const zod = require('zod')
mongoose.connect("mongodb+srv://ragnar20-03:Rshn_mongodbatlast@mycluster.iqg3hbo.mongodb.net/PortFollio")
const adminSchema = new mongoose.Schema({
    username : String , 
    password : String , 
    email : String,
    projects : [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "projects"
    }]
})

const projectSchema = new mongoose.Schema({
    projectName : String ,
    projectDescription :String,
    srcLink : String , 
    imageLink : String,
    liveLink : String,

})
const AdminModel = mongoose.model('Admin' , adminSchema);
const ProjectModel = mongoose.model(  "Projects" , projectSchema )

const zodProject = zod.object({
    projectName : zod.string() ,
    projectDescription :zod.string(),
    srcLink : zod.string() , 
    imageLink : zod.string(),
    liveLink : zod.string()
})

module.exports = {
    AdminModel , 
    ProjectModel,
    zodProject
}

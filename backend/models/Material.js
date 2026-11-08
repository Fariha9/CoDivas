import mongoose from "mongoose";


const materialSchema = new mongoose.Schema({

    title:{
        type:String,
        required:true
    },


    file:{
        type:String,
        required:true
    },


    course:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"Course",
        required:true
    },


    uploadedBy:{
        type:mongoose.Schema.Types.ObjectId,
        ref:"User"
    }


});


const Material = mongoose.model(
"Material",
materialSchema
);


export default Material;
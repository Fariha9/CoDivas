import mongoose from "mongoose";


//1-create a schema
//2- model based off of that schema

const noteSchema = new mongoose.Schema({
    title:{
        type: String,
        required:true
    },

    content:{
        type:String,
        required: true,
    }, 
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true
    }, 
},
{timestamp:true}//createdAt, updatedAt

);


const Note = mongoose.model("Note", noteSchema)

export default Note
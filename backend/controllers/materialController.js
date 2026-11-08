import Material from "../models/Material.js";


// upload material

export const uploadMaterial = async(req,res)=>{

try{


const {title,courseId}=req.body;


const material = await Material.create({

title,

file:req.file.filename,

course:courseId,

uploadedBy:req.user._id

});


res.status(201).json({

message:"Material uploaded",
material

});


}catch(error){

res.status(500).json({
message:error.message
});

}


};




// get course materials

export const getMaterials = async(req,res)=>{


try{


const materials = await Material.find({

course:req.params.courseId

});


res.json(materials);


}catch(error){

res.status(500).json({
message:error.message
});

}

};
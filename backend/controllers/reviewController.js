import Review from "../models/Review.js";


// add review

export const addReview = async(req,res)=>{

try{

const {
courseId,
rating,
comment
}=req.body;


const review = await Review.create({

course:courseId,

student:req.user._id,

rating,

comment

});


res.status(201).json({

message:"Review added",
review

});


}catch(error){

res.status(500).json({

message:error.message

});

}

};




// get reviews

export const getReviews = async(req,res)=>{

try{


const reviews = await Review.find({

course:req.params.courseId

})
.populate(
"student",
"name"
);



res.json(reviews);


}catch(error){

res.status(500).json({

message:error.message

});

}


};
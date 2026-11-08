import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { FaStar } from "react-icons/fa";

const CourseReview = ({ courseId }) => {

  const [reviews, setReviews] = useState([]);
  const [rating, setRating] = useState(0);
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);


  // get reviews
  const fetchReviews = async () => {

    try {

      const res = await fetch(
        `http://localhost:5001/api/reviews/${courseId}`
      );

      const data = await res.json();

      setReviews(data);

    } catch(error){

      console.log(error);

    }

  };


  useEffect(()=>{

    fetchReviews();

  },[courseId]);



  // submit review

  const submitReview = async(e)=>{

    e.preventDefault();


    if(rating === 0){
      toast.error("Please select rating");
      return;
    }


    try{

      setLoading(true);

      const token = localStorage.getItem("token");


      const res = await fetch(
        "http://localhost:5001/api/reviews",
        {

          method:"POST",

          headers:{
            "Content-Type":"application/json",
            Authorization:`Bearer ${token}`
          },


          body:JSON.stringify({

            courseId,
            rating,
            comment

          })

        }
      );


      const data = await res.json();


      if(!res.ok)
        throw new Error(data.message);



      toast.success("Review added");


      setRating(0);
      setComment("");

      fetchReviews();


    }catch(error){

      toast.error(error.message);

    }
    finally{

      setLoading(false);

    }

  };



return (

<div className="mt-12 bg-[#18181c] p-6 rounded-2xl border border-white/10">


<h2 className="text-2xl font-bold text-white mb-6">
⭐ Course Reviews
</h2>



{/* Add Review */}

<form 
onSubmit={submitReview}
className="space-y-4 mb-8"
>


<div className="flex gap-2">


{
[1,2,3,4,5].map(num=>(

<FaStar

key={num}

size={28}

onClick={()=>setRating(num)}

className={`cursor-pointer ${
num <= rating 
? "text-yellow-400"
:"text-gray-600"
}`}

/>

))
}


</div>



<textarea

value={comment}

onChange={(e)=>setComment(e.target.value)}

placeholder="Write your review..."

className="w-full bg-black text-white p-3 rounded-lg border border-white/10"

/>



<button

disabled={loading}

className="bg-purple-600 hover:bg-purple-500 px-5 py-2 rounded-lg text-white"

>

{
loading ? "Submitting..." : "Submit Review"
}

</button>



</form>





{/* Reviews list */}


<div className="space-y-4">


{
reviews.length===0 ? (

<p className="text-gray-500">
No reviews yet
</p>

):

(

reviews.map(review=>(


<div

key={review._id}

className="bg-black p-4 rounded-xl"

>


<div className="flex items-center gap-1 mb-2">

{

[1,2,3,4,5].map(star=>(

<FaStar

key={star}

size={15}

className={
star <= review.rating
?
"text-yellow-400"
:
"text-gray-700"
}

/>

))

}

</div>



<p className="text-gray-300">
{review.comment}
</p>


<p className="text-gray-500 text-sm mt-2">

By {review.user?.name || "Student"}

</p>



</div>


))

)

}


</div>



</div>

);


};


export default CourseReview;
import React,{useState} from "react";
import toast from "react-hot-toast";
import {useNavigate} from "react-router-dom";


const AddCourse =()=>{


const navigate=useNavigate();


const [course,setCourse]=useState({
id:"",
pic:"",
name:"",
page:""
});


const handleChange=(e)=>{

setCourse({
...course,
[e.target.name]:e.target.value
});

};



const submit=async(e)=>{

e.preventDefault();


try{


const token=localStorage.getItem("token");


const res=await fetch(
"http://localhost:5001/api/courses",
{
method:"POST",

headers:{
"Content-Type":"application/json",
Authorization:`Bearer ${token}`
},

body:JSON.stringify(course)

});


const data=await res.json();


if(!res.ok)
throw new Error(data.message);


toast.success("Course Added");


navigate("/instructor/courses");



}catch(error){

toast.error(error.message);

}



};



return(

<div className="min-h-screen bg-[#0d0d0f] p-8 text-white">


<h1 className="text-3xl font-black mb-8">
Add <span className="text-purple-400">
Course
</span>
</h1>



<form
onSubmit={submit}
className="bg-[#18181c] border border-white/10 p-8 rounded-2xl max-w-xl space-y-5"
>



<input

name="id"
placeholder="Course ID"

onChange={handleChange}

className="w-full p-3 rounded-xl bg-black border border-white/10"

/>



<input

name="name"
placeholder="Course Name"

onChange={handleChange}

className="w-full p-3 rounded-xl bg-black border border-white/10"

/>



<input

name="pic"
placeholder="Image URL"

onChange={handleChange}

className="w-full p-3 rounded-xl bg-black border border-white/10"

/>




<input

name="page"
placeholder="Course Page"

onChange={handleChange}

className="w-full p-3 rounded-xl bg-black border border-white/10"

/>



<button

className="bg-purple-600 px-6 py-3 rounded-xl font-bold"

>

Create Course

</button>


</form>


</div>


)

}


export default AddCourse;
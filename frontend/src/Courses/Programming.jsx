import React from 'react';
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CourseReview from "../components/CourseReview";
import { BsCartCheckFill } from "react-icons/bs";
const Programming = ({ addToCart }) => {
  const navigate = useNavigate();

  const course = {
    id: "6a35733f46e43d524df13df9",
    name: "Introduction To Programming (C/C++)",
    price: 30,
    lessonLink: "/Courses/ProgLesson",
  };

  // Enforces authentication tracking logic before opening the modal
  const handlePurchaseClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // If not logged in, trigger global login modal
      const loginModal = document.getElementById("login");
      if (loginModal) {
        loginModal.showModal();
      } else {
        console.warn("Global login modal not found. Navigating to fallback routing.");
        navigate("/login"); 
      }
    } else {
      // If logged in, open the confirmation purchase flow
      const purchaseModal = document.getElementById('my_modal_1');
      if (purchaseModal) {
        purchaseModal.showModal();
      }
    }
  };

  return (
    <div className="bg-[#0d0d0f] text-white">
      <div className="min-h-screen">
        <div className='container mx-auto px-4 sm:px-6 lg:px-8 py-10'>
          <div className="card bg-black w-full max-w-5xl mx-auto shadow-xl">
            <div className="card-body">
              <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4">
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Introduction To Programming (C/C++)</h3>
                <span>
                  <div className='card-actions justify-center '>
                    <button 
                      className="btn bg-purple-700 text-white hover:bg-purple-500 font-bold btn-md sm:btn-lg w-full md:w-auto" 
                      onClick={handlePurchaseClick}
                    >
                      Add To Cart
                    </button>
                  </div>

                  {/* Modal 1: Confirmation Form */}
                  <dialog id="my_modal_1" className="modal">
                    <div className="modal-box bg-purple-200 w-300 text-black">
                      <form method="dialog">
                        <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">✕</button>
                      </form>
                      <h3 className="font-bold text-lg text-center mt-4">Would you like to add this course to your cart?</h3>
                      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6'>
                        <form method="dialog">
                          <button className="btn w-full sm:w-auto">No</button>
                        </form>
                        
                        {/* CHANGED: Added asynchronous API call to save to database */}
                        <button
  className="btn bg-purple-700 text-white hover:bg-purple-500 w-full sm:w-auto"
  onClick={() => {
    addToCart(course);

    document.getElementById("my_modal_1").close();
    document.getElementById("my_modal_2").showModal();
  }}
>
  Yes
</button>
                      </div>
                    </div>
                  </dialog>

                  {/* Modal 2: Success Prompt */}
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box bg-purple-200 text-center w-250 max-w-md">
                      <BsCartCheckFill size={60} className="mx-auto text-purple-800" />
                      <h3 className="font-bold text-black text-lg mt-4">This course is added to your cart!</h3>
                      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6'>
                        <form method="dialog">
                          <button className="btn w-full sm:w-auto">Close</button>
                        </form>
                        {/* <Link to="/Courses/ProgLesson" className="btn bg-purple-700 text-white hover:bg-purple-500 w-full sm:w-auto">
                          View Lessons
                        </Link> */}
                      </div>
                    </div>
                  </dialog>
                </span>
              </div>

              {/* Syllabus Data */}
              <section className="space-y-6 mt-2">
                <h2 className='text-3xl font-bold mt-10'>🔹 What is this course about?</h2>
                <p className='text-lg mt-5'>Introduction to Programming is a beginner-level course designed to teach you how computers think and how to communicate with them using code. You will learn the fundamental concepts of programming through simple explanations and hands-on examples. No prior programming knowledge is required.</p>
                
                <h2 className='text-3xl font-bold mt-8'>🔹 What will you learn from this course?</h2>
                <p className='text-lg mt-5'>By the end of this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Understand how programs work</li>
                  <li className='text-lg'>Write basic programs using a programming language</li>
                  <li className='text-lg'>Use variables, data types, and operators</li>
                  <li className='text-lg'>Apply decision-making using conditions (if-else)</li>
                  <li className='text-lg'>Use loops to repeat tasks efficiently</li>
                  <li className='text-lg'>Create and use functions</li>
                  <li className='text-lg'>Solve simple real-world problems using logic</li>
                  <li className='text-lg'>Develop problem-solving and logical thinking skills</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 Why should you learn programming?</h2>
                <p className='text-lg mt-5'>Programming is a core skill in Computer Science and technology. Learning programming helps you:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Think logically and solve problems efficiently</li>
                  <li className='text-lg'>Build software, websites, and applications</li>
                  <li className='text-lg'>Understand how technology works behind the scenes</li>
                  <li className='text-lg'>Prepare for advanced CSE subjects like Data Structures, AI, and Software Engineering</li>
                  <li className='text-lg'>Increase career opportunities in tech-related fields</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What do you need before starting?</h2>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Basic computer knowledge</li>
                  <li className='text-lg'>Curiosity and willingness to learn</li>
                  <li className='text-lg'>No prior programming experience required</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What will you be able to do after completing this course?</h2>
                <p className='text-lg mt-5'>After completing this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Write simple programs confidently</li>
                  <li className='text-lg'>Understand and read basic code</li>
                  <li className='text-lg'>Continue learning advanced programming topics</li>
                  <li className='text-lg'>Build a strong foundation for your CSE career</li>
                </ul>
                <h2 className='text-3xl font-bold mt-8 mb-10'>🔹 Course Price: 30 TK</h2>
               <CourseReview courseId={course.id}/>
              </section>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default Programming;
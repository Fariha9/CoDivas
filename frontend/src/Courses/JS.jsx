import React from 'react';
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CourseReview from "../components/CourseReview";
import { BsCartCheckFill } from "react-icons/bs";
const JS = ({ addToCart }) => {
  const navigate = useNavigate();

  const course = {
    id: "6a3566fd46e43d524df13df5",
    name: "Javascript",
    price: 30,
    lessonLink: "/Courses/JSLesson",
  };

  // HANDLER: Controls modal behavior based on user auth status
  const handlePurchaseClick = () => {
    const token = localStorage.getItem("token");

    if (!token) {
      // IF NOT LOGGED IN: Target and reveal the global Login Modal
      const loginModal = document.getElementById("login");
      if (loginModal) {
        loginModal.showModal();
      } else {
        console.warn("Login modal with id='login' not found in DOM. Falling back to routing.");
        navigate("/login"); 
      }
    } else {
      // IF LOGGED IN: Reveal the Course Purchase Confirmation Modal
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
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Javascript</h3>
                <span>
                  <div className='card-actions justify-center '>
                    <button 
                      className="btn bg-purple-700 text-white hover:bg-purple-500 font-bold btn-md sm:btn-lg w-full md:w-auto" 
                      onClick={handlePurchaseClick}
                    >
                      Add To Cart
                    </button>
                  </div>

                  {/* Modal 1: Purchase Confirmation Options */}
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
                        
                        {/* UPDATED: Integrated Async Database Call */}
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

                  {/* Modal 2: Success Confirmation Feedback */}
                  <dialog id="my_modal_2" className="modal">
                    <div className="modal-box bg-purple-200 text-center w-250 max-w-md">
                      <BsCartCheckFill size={60} className="mx-auto text-purple-800" />
                      <h3 className="font-bold text-black text-lg mt-4">This course is added to your cart!</h3>
                      <div className='flex flex-col sm:flex-row justify-center gap-4 mt-6'>
                        <form method="dialog">
                          <button className="btn w-full sm:w-auto">Close</button>
                        </form>
                        {/* <Link to="/Courses/JSLesson" className="btn bg-purple-700 text-white hover:bg-purple-500 w-full sm:w-auto">
                          View Lessons
                        </Link> */}
                      </div>
                    </div>
                  </dialog>
                </span>
              </div>

              {/* Course Syllabus & Context Information */}
              <section className="space-y-6 mt-2">
                <h2 className='text-3xl font-bold mt-10'>🔹 What is this course about?</h2>
                <p className='text-lg mt-5'>JavaScript is the programming language of the web. This course teaches you how to make websites dynamic, interactive, and user-friendly. You will learn how to add logic to web pages and create real-world applications using JavaScript.</p>
                
                <h2 className='text-3xl font-bold mt-8'>🔹 What will you learn from this course?</h2>
                <p className='text-lg mt-5'>By the end of this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Understand JavaScript syntax and core concepts</li>
                  <li className='text-lg'>Work with variables, data types, operators, and functions</li>
                  <li className='text-lg'>Manipulate the Document Object Model (DOM) to update web pages dynamically</li>
                  <li className='text-lg'>Handle events like clicks, form submissions, and keyboard input</li>
                  <li className='text-lg'>Use arrays, objects, and loops to manage data</li>
                  <li className='text-lg'>Implement basic frontend interactivity and simple web apps</li>
                  <li className='text-lg'>Debug and test your JavaScript code</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 Why should you learn JavaScript?</h2>
                <p className='text-lg mt-5'>JavaScript is essential for modern web development. Learning it allows you to:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Make websites interactive and responsive</li>
                  <li className='text-lg'>Work as a frontend or full-stack developer</li>
                  <li className='text-lg'>Build web applications, games, and tools</li>
                  <li className='text-lg'>Understand frameworks like React, Angular, or Vue</li>
                  <li className='text-lg'>Open doors to a variety of tech career paths</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What do you need before starting?</h2>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Basic understanding of computers</li>
                  <li className='text-lg'>HTML and CSS basics (recommended but not mandatory)</li>
                  <li className='text-lg'>Curiosity and willingness to practice coding</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What will you be able to do after completing this course?</h2>
                <p className='text-lg mt-5'>After completing this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5 space-y-1'>
                  <li className='text-lg'>Write JavaScript code confidently</li>
                  <li className='text-lg'>Make websites interactive and dynamic</li>
                  <li className='text-lg'>Handle data and user interactions effectively</li>
                  <li className='text-lg'>Prepare for frontend frameworks and advanced web development</li>
                  <li className='text-lg'>Build small web applications and projects</li>
                </ul>
                <h2 className='text-3xl font-bold mt-8'>🔹 Course Price: 30 TK</h2>
                <h2 className='text-3xl font-bold mt-8 mb-10'>🔹 Instructor: Shradha Khapra</h2>
                <CourseReview courseId={course.id}/>
              </section>
            </div>
          </div>
        </div> 
      </div>
    </div>
  );
};

export default JS;
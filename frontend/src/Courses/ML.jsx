import React from 'react';
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { Link, useNavigate } from 'react-router-dom';
import CourseReview from "../components/CourseReview";
import { BsCartCheckFill } from "react-icons/bs";
const ML = ({ addToCart }) => {
  const navigate = useNavigate();

  const course = {
    id: "6a357fd246e43d524df13dfd",
    name: "Machine Learning",
    price: 30,
    lessonLink: "/Courses/MLLesson",
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
                <h3 className="text-2xl sm:text-3xl lg:text-4xl font-bold">Machine Learning</h3>
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
                        {/* <Link to="/Courses/MLLesson" className="btn bg-purple-700 text-white hover:bg-purple-500 w-full sm:w-auto">
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
                <p className='text-lg mt-5'>Machine Learning (ML) is a branch of Artificial Intelligence that enables computers to learn patterns from data and make predictions or decisions without being explicitly programmed. This course introduces you to the concepts, techniques, and tools needed to build your own ML models.</p>
                
                <h2 className='text-3xl font-bold mt-8'>🔹 What will you learn from this course?</h2>
                <p className='text-lg mt-5'>By the end of this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5'>
                  <li className='text-lg'>Understand the fundamentals of Machine Learning and its applications</li>
                  <li className='text-lg'>Work with supervised and unsupervised learning algorithms</li>
                  <li className='text-lg'>Build models for regression, classification, and clustering tasks</li>
                  <li className='text-lg'>Use Python libraries such as scikit-learn, NumPy, and pandas</li>
                  <li className='text-lg'>Preprocess and analyze real-world datasets</li>
                  <li className='text-lg'>Evaluate and optimize ML models for accuracy and performance</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 Why should you learn Machine Learning?</h2>
                <p className='text-lg mt-5'>Machine Learning is revolutionizing industries like healthcare, finance, and technology. Learning ML allows you to:</p>
                <ul className='mx-15 list-disc pl-5'>
                  <li className='text-lg'>Automate data-driven decision-making</li>
                  <li className='text-lg'>Analyze and predict patterns from large datasets</li>
                  <li className='text-lg'>Work on exciting projects like recommendation systems, image recognition, and predictive analytics</li>
                  <li className='text-lg'>Enhance career opportunities in AI, data science, and analytics</li>
                  <li className='text-lg'>Understand the foundations for advanced AI and deep learning</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What do you need before starting?</h2>
                <ul className='mx-15 list-disc pl-5'>
                  <li className='text-lg'>Basic programming skills, preferably in Python</li>
                  <li className='text-lg'>Understanding of high school mathematics (linear algebra, probability, statistics)</li>
                  <li className='text-lg'>Curiosity to experiment with data and models</li>
                </ul>

                <h2 className='text-3xl font-bold mt-8'>🔹 What will you be able to do after completing this course?</h2>
                <p className='text-lg mt-5'>After completing this course, you will be able to:</p>
                <ul className='mx-15 list-disc pl-5'>
                  <li className='text-lg'>Build and deploy simple Machine Learning models</li>
                  <li className='text-lg'>Analyze datasets and extract meaningful insights</li>
                  <li className='text-lg'>Implement regression, classification, and clustering algorithms</li>
                  <li className='text-lg'>Prepare for advanced AI and deep learning courses</li>
                  <li className='text-lg'>Solve real-world problems using ML techniques</li>
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

export default ML;
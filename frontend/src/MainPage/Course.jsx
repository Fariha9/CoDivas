import React from 'react';
import { Link } from 'react-router-dom';

const Course = ({ Courses }) => {

    return (
        <div className="card w-full bg-purple-200 shadow-sm">
          <figure className="h-60 overflow-hidden">
            <img src={Courses.pic} alt="Courses" className="w-full h-full object-cover"/>
          </figure>
          <div className="card-body items-center text-center">
            <h2 className="card-title font-bold text-xl">{Courses.name}</h2>
            
            <Link 
              to={Courses.page} 
              className="btn bg-purple-700 text-white hover:bg-purple-500 font-bold w-full sm:w-auto"
            >
              View Details
            </Link>

      
          </div>
        </div>
    );
};

export default Course;
import React from 'react';
import { Route, Routes } from 'react-router';
import Home from './Home';
import Dashboard from './Dashboard';
import About from './About';
import Courses from './Courses';
import Login from './Login';
import Signup from './Signup';
import Assignments from './Assignments';
import GradingPanel from './GradingPanel';
import CertificateGenerator from './CertificateGenerator';

// মেইন রুট ডিরেক্টরি থেকে অ্যাসেসমেন্ট ইমপোর্ট
import Assessments from './Assessments'; 

const Main = () => {
  return (
    <div>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/dashboard' element={<Dashboard />} />
        <Route path='/about' element={<About />} />
        <Route path='/courses' element={<Courses />} />
        <Route path='/login' element={<Login />} />
        <Route path='/signup' element={<Signup />} />
        
       
        <Route path='/assessments' element={<Assessments />} />
        
        <Route path='/instructor/grading' element={<GradingPanel />} />
        <Route path='/certificate' element={<CertificateGenerator />} />
      </Routes>
    </div>
  );
};

export default Main;
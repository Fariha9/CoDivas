import { BrowserRouter, Routes, Route } from 'react-router-dom'; 
import './App.css';

import Navbar from './Navbar/Navbar';
import Main from './MainPage/Main';
import Footer from './Footer/Footer';
import Login from './MainPage/Login';
import Forget from './MainPage/ForgetPass';
import About from'./MainPage/About';
import Dashboard from './MainPage/Dashboard';
import AdminLayout from "./layout/AdminLayout";
import InstructorLayout from "./layout/InstructorLayout";
import AdminDashboard from './MainPage/AdminDashboard';
import InstructorDashboard from './MainPage/InstructorDashboard';
import InstructorCourses from './MainPage/instructor/InstructorCourses';
import AddCourse from "./MainPage/instructor/AddCourse";
import Progress from './MainPage/Progress'; 
import Settings from './MainPage/Settings';
import Users from './MainPage/Admin/Users';
import Signup from './MainPage/Signup';
import Courses from './MainPage/Courses';
import Programming from './Courses/Programming'
import ProgLesson from './Courses/ProgLesson'
import DS from './Courses/DS'
import DSLesson from './Courses/DSLesson'
import Web from './Courses/Web'
import WebLesson from './Courses/WebLesson'
import JS from './Courses/JS'
import JSLesson from './Courses/JSLesson'
import AI from './Courses/AI'
import AILesson from './Courses/AILesson'
import ML from './Courses/ML'
import MLLesson from './Courses/MLLesson'
import Blogs from './MainPage/Blogs'; 
import AddBlog from './MainPage/AddBlog'; 
import Contact from './MainPage/Contact'
import { useState } from "react";
import { Toaster } from "react-hot-toast";
import GradingPanel from './MainPage/GradingPanel';
import CertificateGenerator from './MainPage/CertificateGenerator';
import Assessments from './MainPage/Assessments'; 
import MyCourses from './MainPage/MyCourses';
import UploadMaterial from "./MainPage/instructor/UploadMaterial";
import LiveClassForm from './MainPage/Instructor/LiveClassForm';
import InstructorStudents from './MainPage/instructor/InstructorStudents'
import PaymentCancelled from "./payment/PaymentCancelled";
import PaymentSuccess from "./payment/PaymentSuccess";
import PaymentFailed from "./payment/PaymentFailed";
import PaymentHistory from "./Mainpage/PaymentHistory";
import VoiceAssistant from "./components/VoiceAssistant/VoiceAssistant";

function App() {

  const [cart, setCart] = useState([]);
  const addToCart = (course) => {
    setCart((prev) => [...prev, course]);
  };

  return (
    <BrowserRouter>
      {/* Navbar  */}
      <Navbar cart={cart}/>
      <Toaster position="top-center" reverseOrder={false} />
      <VoiceAssistant />
      <main className="min-h-[80vh]">
        <Routes>
          
          <Route path="/" element={<Main />} />
          
         <Route
  path="/payment-success"
  element={<PaymentSuccess />}
/>
<Route
  path="/payment-history"
  element={<PaymentHistory />}
/>

<Route
  path="/payment-failed"
  element={<PaymentFailed />}
/>

<Route
  path="/payment-cancelled"
  element={<PaymentCancelled />}
/>
          <Route path="/assessments" element={<Assessments />} />
        
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/admin" element={<AdminLayout />}>
          <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/admin/users" element={<Users />} />
        <Route path="/admin/courses" element={<Courses />} />
        <Route path="/admin/assessments" element={<Assessments />} />
        <Route path="/admin/settings" element={<Settings />} />
        </Route>
        <Route path="/instructor" element={<InstructorLayout />}>
    <Route index element={<InstructorDashboard />} />
    <Route path="courses" element={<InstructorCourses />} />
    <Route path="students" element={<InstructorStudents />} />
    <Route path="/instructor/courses/new" element={<AddCourse/>}/>
<Route path="/instructor/courses/:courseId/materials"element={<UploadMaterial />}/>
<Route path="/instructor/courses/:courseId/live-class" element={<LiveClassForm />} />
<Route path="/instructor/settings" element={<Settings />} />
</Route>

          <Route path="/about" element={<About />} />
          <Route path="/dashboard/courses" element={<MyCourses/>}/>
          <Route path="/progress" element={<Progress />} />

          <Route path="/settings" element={<Settings />} />

          <Route path="/signup" element={<Signup />} />
         
          <Route path="/blogs" element={<Blogs />} />
          <Route path="/contact" element={<Contact />} />
          
          <Route path="/add-blog" element={<AddBlog />} />

          <Route path='/courses' element={<Courses></Courses>}></Route>
          <Route path='/Courses/Programming' element={<Programming addToCart={addToCart}></Programming>}></Route>
          <Route path='/Courses/ProgLesson' element={<ProgLesson></ProgLesson>}></Route>
          <Route path='/Courses/DS' element={<DS addToCart={addToCart}></DS>}></Route>
          <Route path='/Courses/DSLesson' element={<DSLesson></DSLesson>}></Route>
          <Route path='/Courses/Web' element={<Web addToCart={addToCart}></Web>}></Route>
          <Route path='/Courses/WebLesson' element={<WebLesson></WebLesson>}></Route>
          <Route path='/Courses/JS' element={<JS addToCart={addToCart}></JS>}></Route>
          <Route path='/Courses/JSLesson' element={<JSLesson></JSLesson>}></Route>
          <Route path='/Courses/AI' element={<AI addToCart={addToCart}></AI>}></Route>
          <Route path='/Courses/AILesson' element={<AILesson></AILesson>}></Route>
          <Route path='/Courses/ML' element={<ML addToCart={addToCart}></ML>}></Route>
          <Route path='/Courses/MLLesson' element={<MLLesson></MLLesson>}></Route>
          <Route path='/instructor/grading' element={<GradingPanel />} />
          <Route path='/certificate' element={<CertificateGenerator />} />
        </Routes>
      </main>

      <Footer />
      <Login />
      <Forget />
    </BrowserRouter>
  );
}

export default App;
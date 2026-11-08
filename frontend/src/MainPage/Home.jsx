import React, { useEffect, useState } from 'react';
import { Link,useNavigate } from 'react-router';
import AOS from 'aos';
import 'aos/dist/aos.css';
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Zap, BookOpen, ClipboardList, Monitor, GraduationCap, Users } from 'lucide-react';

AOS.init();




const featureIconMap = {
  "Interactive Learning": <Monitor className="w-10 h-10 text-purple-400" />,
  "Beginner-Friendly": <GraduationCap className="w-10 h-10 text-blue-400" />,
  "Real CS Content": <BookOpen className="w-10 h-10 text-green-400" />,
  "Community Driven": <Users className="w-10 h-10 text-orange-400" />,
};

const Home = () => {
  const navigate = useNavigate();
  const [features, setFeatures] = useState([]);
  const [reviews, setReviews] = useState([]);
  const [current, setCurrent] = useState(0);
  const [courses, setCourses] = useState([]);

  useEffect(() => {
    fetch("/popular.json").then(res => res.json()).then(data => setCourses(data)).catch(err => console.error(err));
  }, []);

  useEffect(() => {
    fetch("/features.json").then(res => res.json()).then(data => setFeatures(data));
  }, []);

  useEffect(() => {
    fetch("/reviews.json").then(res => res.json()).then(data => setReviews(data));
  }, []);

  useEffect(() => {
    if (reviews.length === 0) return;
    const interval = setInterval(() => {
      setCurrent(prev => (prev + 1) % reviews.length);
      window.location.hash = `slide${(current + 1) % reviews.length}`;
    }, 3000);
    return () => clearInterval(interval);
  }, [current, reviews.length]);

  const handleStartLearning = () => {
  const token = localStorage.getItem("token");
  if (token) {
    navigate("/dashboard");
  } else {
    document.getElementById("login").showModal();
  }
};
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1500,
    swipeToSlide: true,
    responsive: [
      { breakpoint: 1024, settings: { slidesToShow: 2 } },
      { breakpoint: 640, settings: { slidesToShow: 1 } }
    ]
  };
  

  return (
    <div className="bg-[#0d0d0f] text-white">

      {/* HERO */}
      <div
        className="min-h-[75vh] flex items-center px-6 lg:px-20 relative overflow-hidden"
        data-aos="fade-up"
        data-aos-easing="linear"
        data-aos-anchor-placement="top-center"
        data-aos-duration="1000"
      >
        <div className="absolute -top-32 -left-32 w-(500px) h-(500px) bg-purple-700/20 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-(400px) h-(400px) bg-purple-900/20 rounded-full blur-[100px] pointer-events-none" />

        <div className="grid lg:grid-cols-2 gap-10 w-full items-center relative z-10">
          <div>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-5">
              ✦ Learn. Build. Grow.
            </span>
            <h1 className="text-5xl font-extrabold leading-tight text-white">
              Learn Computer Science
              <span className="block text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">
                The Smart Way
              </span>
            </h1>
            <p className="mt-5 text-gray-400 text-lg max-w-md leading-relaxed">
              Interactive lessons, clean visuals, and beginner-friendly explanations
              to help you master coding, algorithms, and real CS concepts.
            </p>
            <div className="flex gap-4 mt-8">
              <button
              onClick={handleStartLearning}
              className="btn bg-purple-600 hover:bg-purple-500 text-white border-0 shadow-lg shadow-purple-900/40 transition-all"
              >
              Start Learning
              </button>
              <Link
              to="/courses" className="btn btn-outline border-purple-600/50 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 transition-all">
                Browse Courses
              </Link>
            </div>
          </div>

          <div className="flex justify-center">
            <div className="relative">
              <div className="absolute inset-0 bg-purple-600/10 rounded-2xl mix-blend-multiply pointer-events-none" />
              <img
                src="https://i.ibb.co.com/20Lp1YbJ/undraw-typing-code-6t2b.png"
                alt="Learning"
                className="max-w-sm opacity-90 drop-shadow-[0_0_40px_rgba(168,85,247,0.25)]"
                style={{ filter: 'hue-rotate(220deg) saturate(0.7) brightness(0.9)' }}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <section className="py-20 bg-[#0d0d0f] relative">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(109,40,217,0.08) 0%, transparent 70%)' }} />
        <div className="container mx-auto text-center relative z-10">
          <h2 className="text-4xl font-bold text-white mb-4" data-aos="fade-up">
            Why Choose <span className="text-purple-400">CoDivas?</span>
          </h2>
          <p className="text-gray-500 mb-12 max-w-2xl mx-auto" data-aos="fade-up" data-aos-delay="100">
            CoDivas makes computer science learning interactive, easy, and fun for students of all levels.
          </p>

          <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 px-6">
            {features.map((feature, index) => (
              <div
                key={index}
                className="bg-white/(0.03) border border-white/10 p-6 rounded-2xl hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 200}
              >
                <div className="mb-4 flex justify-center group-hover:scale-110 transition-transform duration-300">
                  {featureIconMap[feature.title] || <Zap className="w-10 h-10 text-purple-400" />}
                </div>
                <h3 className="text-lg font-semibold text-purple-300 mb-2">{feature.title}</h3>
                <p className="text-gray-500 text-sm leading-relaxed">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-20 bg-[#111114]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-14">
            <h2 className="text-4xl font-bold text-white" data-aos="fade-up">
              Popular <span className="text-purple-400">Courses</span>
            </h2>
            <p className="text-gray-500 mt-3" data-aos="fade-up" data-aos-delay="100">
              Explore our most loved computer science courses
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8" data-aos="fade-up">
            {courses.map((course) => (
              <div
                key={course.id}
                className="bg-[#18181c] border border-white/[0.07] rounded-2xl overflow-hidden hover:border-purple-500/30 hover:shadow-xl hover:shadow-purple-900/20 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={course.id * 200}
              >
                <figure className="overflow-hidden">
                  <img
                    src={course.image}
                    alt={course.title}
                    className="w-full h-48 object-cover group-hover:scale-105 transition-transform duration-500 opacity-80"
                  />
                </figure>
                <div className="p-6 flex flex-col items-center text-center gap-2">
                  <h2 className="font-bold text-xl text-white">{course.title}</h2>
                  <div className="text-purple-400 text-lg tracking-wider">
                    {"★".repeat(course.rating)}
                  </div>
                  <button className="mt-4 btn bg-purple-600 hover:bg-purple-500 text-white border-0 w-full font-bold transition-all shadow-lg shadow-purple-900/30">
                    Enroll Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link
              to="/courses"
              className="btn bg-transparent border border-purple-500/50 text-purple-400 hover:bg-purple-600 hover:text-white hover:border-purple-600 font-bold px-8 transition-all"
            >
              Browse More Courses
            </Link>
          </div>
        </div>
      </section>

      {/* Assessments */}
      <section className="py-16 px-10 lg:px-20 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute right-0 top-0 w-(400px) h-(400px) bg-purple-700/10 rounded-full blur-[100px] pointer-events-none" />
        <div className="max-w-7xl mx-auto px-6 flex flex-col lg:flex-row items-center gap-10 relative z-10">
          <div className="lg:w-1/2 text-center lg:text-left" data-aos="fade-up">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-5">
              ✦ Challenge Yourself
            </span>
            <h2 className="text-4xl font-bold text-white mb-4">
              Test Your Knowledge<br />
              <span className="text-purple-400">with Assessments</span>
            </h2>
            <p className="text-gray-500 mb-6 max-w-md leading-relaxed">
              Reinforce your learning with interactive assessments on DSA, Python, SQL, and more.
              Challenge yourself and see how much you've learned!
            </p>
            <Link
              to="/assessments"
              className="btn bg-purple-600 hover:bg-purple-500 text-white border-0 font-bold px-6 shadow-lg shadow-purple-900/40 transition-all"
            >
              Explore Assessments
            </Link>
          </div>

          <div className="lg:w-1/2 flex justify-center" data-aos="fade-up" data-aos-delay="200">
            <img
              src="https://i.ibb.co.com/4gfTRW94/undraw-writing-online-x665.png"
              alt="Assessments"
              className="max-w-sm opacity-80 drop-shadow-[0_0_40px_rgba(168,85,247,0.2)]"
              style={{ filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.85)' }}
            />
          </div>
        </div>
      </section>

      {/* Reviews */}
      <section className="bg-[#111114] py-16 px-4">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-center text-white mb-3" data-aos="fade-up">
            What <span className="text-purple-400">Students Say</span>
          </h2>
          <p className="text-center text-gray-500 mb-12" data-aos="fade-up" data-aos-delay="100">
            Honest feedback from CoDivas learners
          </p>

          <Slider {...settings}>
            {reviews.map(review => (
              <div key={review.id} className="px-3">
                <div
                  className="bg-[#18181c] border border-white/[0.07] p-6 rounded-2xl h-full flex flex-col justify-between hover:border-purple-500/30 transition-all duration-300"
                  data-aos="fade-up"
                  data-aos-delay={review.id * 200}
                >
                  <p className="text-gray-400 mb-4 text-sm leading-relaxed">
                    "{review.review}"
                  </p>
                  <div>
                    <div className="mb-2 text-purple-400 text-lg tracking-wider">
                      {"★".repeat(review.rating)}
                    </div>
                    <h4 className="font-semibold text-white">{review.name}</h4>
                    <span className="text-sm text-gray-600">{review.role}</span>
                  </div>
                </div>
              </div>
            ))}
          </Slider>
        </div>
      </section>

    </div>
  );
};

export default Home;
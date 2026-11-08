import React from 'react';
import AOS from "aos";
import "aos/dist/aos.css";

AOS.init();

const About = () => {
  return (
    <div className="bg-[#0d0d0f] text-white">

      {/* Hero */}
      <section className="py-24 px-6 relative overflow-hidden">
        <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700/15 rounded-full blur-[120px] pointer-events-none" />
        <div className="absolute -bottom-20 right-0 w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10" data-aos="fade-up">
          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-6">
            ✦ Our Story
          </span>
          <h1 className="text-5xl font-extrabold text-white mb-4">
            About <span className="text-transparent bg-clip-text bg-linear-to-r from-purple-400 to-purple-600">CoDivas</span>
          </h1>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto leading-relaxed">
            An interactive learning platform built to simplify computer science
            for students — from beginners to future engineers.
          </p>
        </div>
      </section>

      {/* Who We Are */}
      <section className="py-20 px-6 bg-[#111114]">
        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-14 items-center">

          <div data-aos="fade-right">
            <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-5">
              ✦ Who We Are
            </span>
            <h2 className="text-3xl font-bold text-white mb-4">
              Built for <span className="text-purple-400">Learners</span>
            </h2>
            <p className="text-gray-400 leading-relaxed mb-5">
              CoDivas is designed for students who struggle with traditional
              learning methods. We focus on clarity, structure, and interaction
              so learning computer science feels achievable and enjoyable.
            </p>
            <p className="text-gray-500 leading-relaxed">
              From programming fundamentals to advanced topics like DSA and
              AI, CoDivas supports learners at every step.
            </p>
          </div>

          <div className="flex justify-center" data-aos="fade-left">
            <img
              src="https://i.ibb.co.com/20Lp1YbJ/undraw-educator-re-ju47.png"
              alt="Who we are"
              className="max-w-sm opacity-80"
              style={{ filter: 'hue-rotate(220deg) saturate(0.6) brightness(0.85)' }}
            />
          </div>

        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 px-6 bg-[#0d0d0f] relative overflow-hidden">
        <div className="absolute inset-0 pointer-events-none" style={{ background: 'radial-gradient(ellipse at top, rgba(109,40,217,0.06) 0%, transparent 70%)' }} />

        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8 relative z-10">

          <div
            className="bg-[#18181c] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300"
            data-aos="fade-up"
          >
            <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-5">
              <span className="text-purple-400 text-lg font-black">M</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Our <span className="text-purple-400">Mission</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              To make computer science education accessible, interactive,
              and beginner-friendly through structured content and practical
              learning.
            </p>
          </div>

          <div
            className="bg-[#18181c] border border-white/10 rounded-2xl p-8 hover:border-purple-500/30 transition-all duration-300"
            data-aos="fade-up"
            data-aos-delay="100"
          >
            <div className="w-10 h-10 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center mb-5">
              <span className="text-purple-400 text-lg font-black">V</span>
            </div>
            <h3 className="text-2xl font-bold text-white mb-3">
              Our <span className="text-purple-400">Vision</span>
            </h3>
            <p className="text-gray-400 leading-relaxed">
              To empower students with strong problem-solving skills and
              confidence to succeed in technology-driven careers.
            </p>
          </div>

        </div>
      </section>

      {/* Why CoDivas */}
      <section className="py-20 px-6 bg-[#111114]">
        <div className="max-w-6xl mx-auto text-center">

          <span className="inline-block text-xs font-semibold uppercase tracking-widest text-purple-400 bg-purple-400/10 border border-purple-400/20 rounded-full px-4 py-1 mb-6" data-aos="fade-up">
            ✦ Why Us
          </span>
          <h2 className="text-3xl font-bold text-white mb-12" data-aos="fade-up">
            Why Choose <span className="text-purple-400">CoDivas?</span>
          </h2>

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { title: "Student-focused learning approach", icon: "01" },
              { title: "Interactive quizzes & real practice", icon: "02" },
              { title: "Clean and distraction-free UI", icon: "03" },
              { title: "Structured learning paths", icon: "04" },
              { title: "Beginner to advanced coverage", icon: "05" },
              { title: "Built by learners, for learners", icon: "06" },
            ].map((item, index) => (
              <div
                key={index}
                className="bg-[#18181c] border border-white/10 rounded-2xl p-6 text-left hover:border-purple-500/30 hover:bg-purple-500/5 transition-all duration-300 group"
                data-aos="fade-up"
                data-aos-delay={index * 100}
              >
                <span className="text-xs font-black text-purple-500/50 group-hover:text-purple-400 transition-colors">
                  {item.icon}
                </span>
                <p className="text-gray-300 font-medium mt-3 group-hover:text-white transition-colors">
                  {item.title}
                </p>
              </div>
            ))}
          </div>

        </div>
      </section>

    </div>
  );
};

export default About;
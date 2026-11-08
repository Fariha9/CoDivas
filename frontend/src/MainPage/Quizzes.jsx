import React, { useEffect, useState } from "react";
import { useLocation } from "react-router";
import QuizCard from "../components/QuizCard";
import { Flame, Calendar, BookOpen, Lock, ArrowRight, Trophy, Sparkles, Target, X } from "lucide-react";



const Quizzes = () => {
  const location = useLocation();
  const [quizList, setQuizList] = useState([]);
  const [visibleCount, setVisibleCount] = useState(3);
  const [selectedQuiz, setSelectedQuiz] = useState(null);
  const [selectedLesson, setSelectedLesson] = useState(null);

  
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState("");
  const [isCurrentQuestionSubmitted, setIsCurrentQuestionSubmitted] = useState(false);
  const [score, setScore] = useState(0);
  const [submitted, setSubmitted] = useState(false); 

  const currentUserEmail = localStorage.getItem("user_email");
  const [streak, setStreak] = useState(
    Number(localStorage.getItem(`streak_${currentUserEmail}`)) || 0
  );
  const [showCalendar, setShowCalendar] = useState(false);

  const saveResultToDB = async (finalScore) => {
    try {
      await fetch("http://localhost:5001/api/quiz-submissions/submit", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          userEmail: currentUserEmail,
          quizId: selectedLesson.quizId,
          score: finalScore,
          totalQuestions: selectedLesson.questions.length,
        }),
      });
    } catch (err) {
      console.error("Database save failed:", err);
    }
  };

  useEffect(() => {
    fetch("/quiz.json")
      .then(res => res.json())
      .then(data => {
        setQuizList(data);
        const params = new URLSearchParams(location.search);
        const quizId = params.get("id");
        if (quizId) {
          setSelectedQuiz(Number(quizId));
          setSelectedLesson(null);
          resetQuiz();
        }
      })
      .catch(err => console.error("Error fetching quiz data:", err));
  }, [location.search]);

  useEffect(() => {
    if (currentUserEmail) {
      const savedStreak = localStorage.getItem(`streak_${currentUserEmail}`) || 0;
      setStreak(Number(savedStreak));
    }
  }, [currentUserEmail]);

  const resetQuiz = () => {
    setCurrentQuestionIndex(0);
    setSelectedOption("");
    setIsCurrentQuestionSubmitted(false);
    setScore(0);
    setSubmitted(false);
  };

  const handleBackToMain = () => {
    setSelectedQuiz(null);
    setSelectedLesson(null);
    resetQuiz();
  };

  const isLessonUnlocked = (quizId, lessonIndex) => {
    if (lessonIndex === 0) return true;
    const prevKey = `quiz_${quizId}_lesson_${lessonIndex - 1}_${currentUserEmail}`;
    return localStorage.getItem(prevKey) === "completed";
  };

  const handleConfirmAnswer = (e) => {
    e.preventDefault();
    if (!selectedOption) return;

    const currentQuestion = selectedLesson.questions[currentQuestionIndex];
    if (selectedOption === currentQuestion.answer) {
      setScore((prev) => prev + 1);
    }
    setIsCurrentQuestionSubmitted(true);
  };

  const handleNextQuestion = () => {
    const totalQuestions = selectedLesson.questions.length;
    
    if (currentQuestionIndex + 1 < totalQuestions) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption("");
      setIsCurrentQuestionSubmitted(false);
    } else {
      setSubmitted(true);
      
      saveResultToDB(score);

      const completionKey = `quiz_${selectedLesson.quizId}_lesson_${selectedLesson.index}_${currentUserEmail}`;
      localStorage.setItem(completionKey, "completed");

      const today = new Date().toDateString();
      const lastDateKey = `lastQuizDate_${currentUserEmail}`;
      const lastDate = localStorage.getItem(lastDateKey);
      if (lastDate !== today) {
        const newStreak = streak + 1;
        setStreak(newStreak);
        localStorage.setItem(`streak_${currentUserEmail}`, newStreak);
        localStorage.setItem(lastDateKey, today);
      }
    }
  };

  const getScoreFeedback = () => {
    const total = selectedLesson?.questions.length || 5;
    const percentage = (score / total) * 100;
    
    if (percentage >= 80) {
      return { 
        title: "Brilliant!", 
        subtitle: "You have completely mastered this lesson.", 
        icon: Trophy, 
        bgGradient: "from-purple-950/40 via-indigo-950/30 to-[#141417]", 
        borderColor: "border-purple-500/40 shadow-[0_0_20px_rgba(147,51,234,0.15)]" 
      };
    }
    if (percentage >= 50) {
      return { 
        title: "Good Job!", 
        subtitle: "Keep improving your coding skills.", 
        icon: Sparkles, 
        bgGradient: "from-blue-950/40 via-slate-900/30 to-[#141417]", 
        borderColor: "border-blue-500/30 shadow-[0_0_20px_rgba(59,130,246,0.1)]" 
      };
    }
    return { 
      title: "Keep Practicing!", 
      subtitle: "Review the topic and try again to unlock next.", 
      icon: Target, 
      bgGradient: "from-amber-950/30 via-slate-950/20 to-[#141417]", 
      borderColor: "border-amber-500/20 shadow-[0_0_20px_rgba(245,158,11,0.05)]" 
    };
  };

  const feedback = getScoreFeedback();
  const FeedbackIcon = feedback.icon;
  const currentQuestion = selectedLesson?.questions?.[currentQuestionIndex];
  const totalQuestions = selectedLesson?.questions?.length || 0;

  return (
    <div className="relative min-h-screen bg-[#0d0d0f] text-white py-8 overflow-hidden">
      
      {/* Background Blobs */}
      <div className="absolute -top-32 -left-32 w-[500px] h-[500px] bg-purple-700/10 rounded-full blur-[120px] pointer-events-none" />
      <div className="absolute top-1/2 right-[-10%] w-[400px] h-[400px] bg-purple-900/10 rounded-full blur-[100px] pointer-events-none" />

      <div className="max-w-6xl mx-auto p-5 w-full relative z-10">

        {!selectedQuiz && !selectedLesson && (
          <>
            <header className="text-center mt-2 mb-10 flex flex-col items-center relative">
              <button
                className="bg-white/(0.05) border border-white/10 px-6 py-2 rounded-full shadow-md flex items-center gap-2 mb-6 cursor-pointer hover:scale-105 active:scale-95 hover:border-purple-500/40 hover:bg-purple-500/5 transition-all duration-300"
                onClick={() => setShowCalendar(true)}
              >
                <Flame className="w-5 h-5 text-orange-400" />
                <span className="text-sm font-bold text-purple-300">Streak: {streak}</span>
              </button>

              {showCalendar && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/70 backdrop-blur-sm">
                  <div className="bg-[#18181c] border border-white/10 p-8 rounded-[32px] shadow-2xl w-full max-w-sm relative animate-fadeIn">
                    <button onClick={() => setShowCalendar(false)} className="absolute top-4 right-4 text-gray-400 hover:text-white font-bold"> <X className="w-4 h-4" /> </button>
                    <h3 className="font-black text-2xl text-center mb-6 text-white flex items-center justify-center gap-2">
                      <Calendar className="w-6 h-6 text-purple-400" /> Activity
                    </h3>
                    <div className="grid grid-cols-7 gap-2">
                      {['S', 'M', 'T', 'W', 'T', 'F', 'S'].map(day => (
                        <div key={day} className="text-center text-xs font-bold text-gray-500 mb-2">{day}</div>
                      ))}
                      {Array.from({ length: 28 }, (_, i) => {
                        const dayNum = i + 1;
                        const isCompleted = dayNum <= streak;
                        return (
                          <div key={i} className={`h-9 w-9 rounded-xl flex items-center justify-center text-sm font-bold transition-all ${isCompleted ? 'bg-purple-600 text-white shadow-md' : 'bg-white/(0.03) border border-white/5 text-gray-600'}`}>
                            {isCompleted ? '✓' : dayNum}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                </div>
              )}

              <div className="flex items-center justify-center gap-3 mb-2">
                <BookOpen className="w-9 h-9 text-purple-400" />
                <h1 className="text-4xl font-black text-white">Quiz Practice</h1>
              </div>
              <p className="text-gray-400 text-sm font-medium">Learn something new every day!</p>
            </header>

            <div className="grid md:grid-cols-3 gap-6 text-left mt-10">
              {quizList.slice(0, visibleCount).map(q => (
                <QuizCard key={q.id} quiz={{ ...q, onStart: (id) => setSelectedQuiz(id) }} />
              ))}
            </div>

            {quizList.length > visibleCount && (
              <div className="text-center mt-12">
                <button onClick={() => setVisibleCount(quizList.length)} className="px-12 py-3.5 bg-purple-600 hover:bg-purple-500 text-white border-0 rounded-full shadow-lg shadow-purple-900/40 transition-all font-bold text-sm">
                  Load More Quizzes
                </button>
              </div>
            )}
          </>
        )}

        {selectedQuiz && !selectedLesson && (() => {
          const quiz = quizList.find(q => q.id === selectedQuiz);
          return (
            <div className="bg-[#111114] border border-white/[0.08] p-8 rounded-[32px] shadow-2xl max-w-md mx-auto text-left mt-4">
              <p className="text-[10px] font-bold text-purple-400 uppercase tracking-widest mb-1">Pick a Topic</p>
              <h2 className="text-2xl font-black mb-6 text-white border-b border-white/5 pb-4">{quiz?.title}</h2>
              <div className="space-y-3">
                {quiz?.lessons.map((lesson, i) => {
                  const unlocked = isLessonUnlocked(quiz.id, i);
                  return (
                    <button key={i} disabled={!unlocked} onClick={() => { setSelectedLesson({ ...lesson, quizId: quiz.id, index: i }); resetQuiz(); }}
                      className={`w-full py-3.5 flex justify-between items-center px-6 border text-sm font-bold rounded-xl transition-all ${
                        unlocked
                          ? "bg-white/(0.02) border-white/10 text-purple-300 hover:border-purple-500/40 hover:bg-purple-500/5"
                          : "bg-white/(0.01) border-white/5 text-gray-600 cursor-not-allowed"
                      }`}
                    >
                      <span className="truncate pr-2">{lesson.title}</span>
                      {!unlocked ? <Lock className="w-4 h-4" /> : <ArrowRight className="w-4 h-4" />}
                    </button>
                  );
                })}
              </div>
              <button className="text-gray-500 hover:text-purple-400 transition-colors mt-8 font-bold text-xs uppercase tracking-wider flex items-center justify-center gap-1 w-full" onClick={handleBackToMain}>
                <ArrowRight className="w-3 h-3 rotate-180" /> Back to Courses
              </button>
            </div>
          );
        })()}

        {selectedLesson && (
          <div className="max-w-2xl mx-auto bg-[#111114] border border-white/[0.08] p-6 rounded-[24px] shadow-2xl mt-4 text-left animate-fadeIn">
            
            <div className="flex justify-between items-center mb-6 border-b border-white/5 pb-3">
              <div>
                <h2 className="text-lg font-bold text-purple-400">{selectedLesson.title}</h2>
                {!submitted && (
                  <p className="text-xs text-gray-500 font-semibold mt-0.5">
                    Question {currentQuestionIndex + 1} of {totalQuestions}
                  </p>
                )}
              </div>
              <div className="bg-orange-500/10 text-orange-400 border border-orange-500/20 font-bold py-1 px-3 rounded-full text-xs flex items-center gap-1">
                <Flame className="w-3.5 h-3.5" /> Streak: {streak}
              </div>
            </div>

            {!submitted ? (
              <div className="space-y-5">
                <div className="p-4 rounded-xl bg-white/(0.01) border border-white/5">
                  
                  {/* সিঙ্গেল প্রশ্ন টেক্সট */}
                  <p className="font-semibold text-base mb-4 text-gray-200">
                    {currentQuestionIndex + 1}. {currentQuestion?.q}
                  </p>

                  {/* অপশনস লিস্ট */}
                  <div className="grid gap-2">
                    {currentQuestion?.options.map((opt, oIndex) => {
                      const isSelected = selectedOption === opt;
                      const isCorrect = opt === currentQuestion.answer;
                      
                      let labelStyle = "bg-[#18181c] border-white/5 text-gray-400 hover:border-white/10";
                      
                      if (isCurrentQuestionSubmitted) {
                        if (isCorrect) {
                          labelStyle = "bg-green-500/10 border-green-500 text-green-400 font-semibold";
                        } else if (isSelected) {
                          labelStyle = "bg-red-500/10 border-red-500 text-red-400";
                        } else {
                          labelStyle = "bg-[#18181c] border-white/5 text-gray-600 opacity-50 cursor-not-allowed";
                        }
                      } else if (isSelected) {
                        labelStyle = "border-purple-500 bg-purple-500/10 text-white";
                      }

                      return (
                        <label key={oIndex} className={`flex items-center gap-3 p-3 rounded-xl border cursor-pointer transition-all text-sm ${labelStyle}`}>
                          <input 
                            type="radio" 
                            className="radio radio-xs radio-primary" 
                            name={`single-q-${currentQuestionIndex}`} 
                            disabled={isCurrentQuestionSubmitted}
                            checked={isSelected} 
                            onChange={() => setSelectedOption(opt)} 
                          />
                          <span className="font-medium">{opt}</span>
                        </label>
                      );
                    })}
                  </div>
                </div>

                {/* নেভিগেশন অ্যাকশন কন্ট্রোল (নো ব্যাকট্র্যাক) */}
                <div className="flex gap-3 pt-2">
                  {!isCurrentQuestionSubmitted ? (
                    <button 
                      onClick={handleConfirmAnswer} 
                      disabled={!selectedOption}
                      className={`flex-1 py-3 rounded-xl font-bold text-xs shadow-lg transition-all ${
                        selectedOption 
                          ? "bg-purple-600 hover:bg-purple-500 text-white shadow-purple-900/30" 
                          : "bg-white/5 border border-white/5 text-gray-500 cursor-not-allowed"
                      }`}
                    >
                      Confirm Answer
                    </button>
                  ) : (
                    <button 
                      onClick={handleNextQuestion} 
                      className="bg-purple-600 hover:bg-purple-500 text-white flex-1 py-3 rounded-xl font-bold text-xs shadow-lg shadow-purple-900/30 transition-all animate-fadeIn flex items-center justify-center gap-1.5"
                    >
                      {currentQuestionIndex + 1 === totalQuestions ? "Finish Quiz & View Score" : (
                        <>Next Question <ArrowRight className="w-3.5 h-3.5" /></>
                      )}
                    </button>
                  )}
                  
                  <button type="button" className="border border-white/10 bg-white/(0.02) text-gray-400 hover:text-white hover:bg-white/(0.05) px-6 rounded-xl font-bold text-xs transition-all" onClick={handleBackToMain}>
                    Exit
                  </button>
                </div>
              </div>
            ) : (
              // কুইজ শেষ হওয়ার পর মেইন স্ক্রিন
              <div className="space-y-6 animate-fadeIn">
                <div className="flex gap-3">
                  <button type="button" className="bg-purple-600 hover:bg-purple-500 text-white flex-1 py-3.5 rounded-xl font-bold text-xs shadow-lg shadow-purple-900/30 transition-all" onClick={() => setSelectedLesson(null)}>
                    Complete Lesson
                  </button>
                  <button type="button" className="border border-white/10 bg-white/(0.02) text-gray-400 hover:text-white hover:bg-white/(0.05) px-8 rounded-xl font-bold text-xs transition-all" onClick={handleBackToMain}>
                    Back to Courses
                  </button>
                </div>

                {/* PREMIUM RE-DESIGNED SCORE FEEDBACK BOX */}
                <div className={`p-5 rounded-2xl bg-gradient-to-br ${feedback.bgGradient} border ${feedback.borderColor} text-white shadow-2xl relative overflow-hidden backdrop-blur-md transition-all duration-500`}>
                  <div className="absolute -right-10 -bottom-10 w-32 h-32 bg-white/5 rounded-full blur-2xl pointer-events-none" />
                  
                  <div className="flex flex-col sm:flex-row items-center justify-between gap-4 relative z-10">
                    <div className="flex flex-col sm:flex-row items-center gap-3.5 text-center sm:text-left">
                      <div className="bg-white/(0.07) p-3 rounded-xl border border-white/10 shadow-lg transform -rotate-3">
                        <FeedbackIcon className="w-6 h-6 text-white filter drop-shadow-[0_0_10px_rgba(255,255,255,0.2)]" />
                      </div>
                      <div>
                        <h3 className="text-base font-black tracking-wider text-white uppercase drop-shadow-sm">
                          {feedback.title}
                        </h3>
                        <p className="text-purple-300 text-xs font-semibold mt-0.5 opacity-90 tracking-wide">
                          {feedback.subtitle}
                        </p>
                      </div>
                    </div>

                    {/* Glassmorphism Split Scoring Box */}
                    <div className="flex items-center gap-3 bg-black/40 backdrop-blur-xl py-2.5 px-5 rounded-xl border border-white/[0.08] min-w-[130px] justify-center shadow-[inner_0_2px_4px_rgba(0,0,0,0.5)]">
                      <div className="flex flex-col items-center">
                        <span className="text-3xl font-black bg-gradient-to-b from-yellow-300 to-amber-500 bg-clip-text text-transparent drop-shadow-[0_0_15px_rgba(245,158,11,0.4)] animate-pulse">
                          {score}
                        </span>
                        <span className="text-[8px] text-gray-400 font-black uppercase tracking-[0.15em] mt-0.5">
                          Obtained
                        </span>
                      </div>

                      <div className="h-8 w-[1px] bg-white/10 mx-0.5" />

                      <div className="flex flex-col items-center">
                        <span className="text-lg font-bold text-gray-300 pt-0.5">
                          {totalQuestions}
                        </span>
                        <span className="text-[8px] text-gray-500 font-black uppercase tracking-[0.15em] mt-1.5">
                          Total
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default Quizzes;
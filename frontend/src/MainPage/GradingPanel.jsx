import React, { useState } from "react";

const GradingPanel = () => {
  // ডামি স্টুডেন্ট সাবমিশন ডেটা (টেস্টিং এর জন্য)
  const [submissions, setSubmissions] = useState([
    {
      id: "sub-1",
      studentName: "Anika Rahman",
      topic: "Data Structures & Algorithms",
      assignmentTitle: "Queue Implementation",
      submittedText: "Implemented queue using two stacks. Enqueue is O(1) and Dequeue is amortized O(1).",
      answers: {
        0: "Quick sort is O(n^2) in worst case when pivot is worst, Merge sort is always O(n log n).",
        1: "Linked list is better because array resizing takes O(n) time."
      },
      fileName: "queue_implementation.zip",
      fileSize: "1.2 MB",
      maxMarks: 40,
      givenMarks: "",
      status: "Pending"
    },
    {
      id: "sub-2",
      studentName: "Fariha Islam",
      topic: "Intro to Programming",
      assignmentTitle: "Logic Building",
      submittedText: "Used a single loop with two variables to track largest and second largest elements.",
      answers: {
        0: "Compiler translates whole code at once, Interpreter does line by line.",
        1: "Each recursive call pushes a stack frame with local variables."
      },
      fileName: "second_largest.py",
      fileSize: "4 KB",
      maxMarks: 30,
      givenMarks: "28",
      status: "Graded"
    }
  ]);

  const handleMarkChange = (id, val) => {
    setSubmissions(prev =>
      prev.map(sub => sub.id === id ? { ...sub, givenMarks: val } : sub)
    );
  };

  const handleGradeSubmit = (id) => {
    setSubmissions(prev =>
      prev.map(sub => {
        if (sub.id === id) {
          if (!sub.givenMarks || sub.givenMarks > sub.maxMarks) {
            alert(`Please enter valid marks between 0 and ${sub.maxMarks}`);
            return sub;
          }
          alert(`Marks updated for ${sub.studentName}!`);
          return { ...sub, status: "Graded" };
        }
        return sub;
      })
    );
  };

  return (
    <div className="min-h-screen bg-[#0d0d0f] text-white p-6 md:p-12">
      <div className="max-w-6xl mx-auto">
        <div className="mb-8">
          <h1 className="text-3xl font-black text-white">👩‍🏫 CoDivas Instructor Grading Hub</h1>
          <p className="text-sm text-gray-400 mt-1">Review student file submissions, conceptual answers, and input manual grades.</p>
        </div>

        <div className="space-y-6">
          {submissions.map((sub) => (
            <div key={sub.id} className={`bg-[#141417] border rounded-2xl p-6 transition-all ${sub.status === "Graded" ? "border-green-500/30" : "border-white/10"}`}>
              {/* Header */}
              <div className="flex flex-wrap justify-between items-start gap-4 border-b border-white/5 pb-4 mb-4">
                <div>
                  <span className={`text-[10px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-full ${sub.status === "Graded" ? "bg-green-500/10 text-green-400" : "bg-amber-500/10 text-amber-400"}`}>
                    {sub.status}
                  </span>
                  <h3 className="text-xl font-bold mt-2">{sub.studentName}</h3>
                  <p className="text-xs text-gray-400">{sub.topic} • {sub.assignmentTitle}</p>
                </div>
                <div className="bg-[#18181c] border border-white/5 px-4 py-2 rounded-xl text-center">
                  <p className="text-xs text-gray-400 uppercase font-bold">Max Marks</p>
                  <p className="text-xl font-black text-purple-400">{sub.maxMarks}</p>
                </div>
              </div>

              {/* Submission Content */}
              <div className="grid md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">💻 Submitted Code/Notes:</h4>
                    <p className="text-sm bg-[#0d0d0f] p-3 rounded-xl border border-white/5 text-gray-300 font-mono whitespace-pre-line">{sub.submittedText}</p>
                  </div>

                  <div>
                    <h4 className="text-xs font-bold text-purple-400 uppercase tracking-wider mb-1">📝 Conceptual Questions Answers:</h4>
                    <div className="space-y-2">
                      {Object.entries(sub.answers).map(([qIdx, ans]) => (
                        <div key={qIdx} className="bg-[#0d0d0f] p-3 rounded-xl border border-white/5 text-xs text-gray-300">
                          <p className="text-gray-400 font-semibold mb-1">Question {parseInt(qIdx)+1}:</p>
                          <p>{ans}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {/* File Attachment & Grading Action */}
                <div className="flex flex-col justify-between bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <div>
                    <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">📂 Attached Project File:</h4>
                    <div className="flex items-center justify-between p-3 bg-[#0d0d0f] border border-white/10 rounded-xl">
                      <div className="flex items-center gap-3">
                        <span className="text-xl">📁</span>
                        <div>
                          <p className="text-xs font-medium text-white truncate max-w-[180px]">{sub.fileName}</p>
                          <p className="text-[10px] text-gray-500">{sub.fileSize}</p>
                        </div>
                      </div>
                      <a href="#" onClick={(e) => {e.preventDefault(); alert("Downloading file...");}} className="text-xs text-purple-400 font-bold hover:underline">Download</a>
                    </div>
                  </div>

                  {/* Grading Input Form */}
                  <div className="mt-6 border-t border-white/5 pt-4">
                    <label className="text-xs font-bold text-gray-400 uppercase tracking-wider block mb-2">Assign Grade / Marks</label>
                    <div className="flex gap-3">
                      <input 
                        type="number" 
                        value={sub.givenMarks}
                        onChange={(e) => handleMarkChange(sub.id, e.target.value)}
                        disabled={sub.status === "Graded"}
                        placeholder="Enter score"
                        className="w-full bg-[#0d0d0f] border border-white/10 rounded-xl p-3 text-sm text-white focus:outline-none focus:border-purple-500 disabled:opacity-50"
                      />
                      <button 
                        onClick={() => handleGradeSubmit(sub.id)}
                        disabled={sub.status === "Graded"}
                        className="px-6 py-3 bg-purple-600 hover:bg-purple-700 text-white font-bold text-sm rounded-xl transition-all whitespace-nowrap disabled:bg-white/10 disabled:text-gray-500"
                      >
                        {sub.status === "Graded" ? "Saved" : "Submit Mark"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default GradingPanel;
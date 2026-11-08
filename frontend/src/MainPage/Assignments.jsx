import React, { useState, useEffect } from "react";
import Swal from 'sweetalert2';

const Badge = ({ label }) => {
  return (
    <span className="text-[10px] font-bold uppercase tracking-widest px-3 py-1 rounded-full bg-purple-500/10 text-purple-300 border border-purple-500/20">
      {label}
    </span>
  );
};

const Assignments = () => {
  const [assignments, setAssignments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const [selectedAssignment, setSelectedAssignment] = useState(null);
  const [textAnswer, setTextAnswer] = useState("");
  const [questionAnswers, setQuestionAnswers] = useState({});
  const [selectedFile, setSelectedFile] = useState(null);

  useEffect(() => {
    fetch('https://codivas.onrender.com/api/assignments')
      .then(res => {
        if (!res.ok) throw new Error("Failed to fetch assignments from database");
        return res.json();
      })
      .then(data => {
        setAssignments(data);
        setLoading(false);
      })
      .catch(err => {
        setError(err.message);
        setLoading(false);
      });
  }, []);

  const handleQAnswerChange = (qIdx, value) => {
    setQuestionAnswers(prev => ({ ...prev, [qIdx]: value }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setSelectedFile(file);
  };

  const isFormValid = () => {
    if (!selectedAssignment) return false;
    if (!textAnswer || textAnswer.trim() === "") return false;
    if (!selectedFile) return false;
    
    if (selectedAssignment.questions && selectedAssignment.questions.length > 0) {
      return selectedAssignment.questions.every((_, idx) => 
        questionAnswers[idx] && questionAnswers[idx].trim() !== ""
      );
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!isFormValid()) {
      Swal.fire({
        icon: 'warning',
        title: 'Incomplete',
        text: 'Please fill all answers and attach a file before submitting!',
        background: '#18181c',
        color: '#fff',
        confirmButtonColor: '#7c3aed'
      });
      return;
    }
    
    const formData = new FormData();
    formData.append("assignmentId", selectedAssignment.id);
    formData.append("textAnswer", textAnswer);
    formData.append("questionAnswers", JSON.stringify(questionAnswers));
    formData.append("file", selectedFile);

    try {
      const response = await fetch('https://codivas.onrender.com/api/submissions', {
        method: 'POST',
        body: formData,
      });

      if (response.ok) {
        Swal.fire({
          icon: 'success',
          title: 'Submitted successfully!',
          text: 'Your assignment has been recorded.',
          background: '#18181c',
          color: '#fff',
          confirmButtonColor: '#7c3aed',
          timer: 2000
        });
        
        setSelectedAssignment(null);
        setTextAnswer("");
        setQuestionAnswers({});
        setSelectedFile(null);
      } else {
        Swal.fire({ icon: 'error', title: 'Submission failed!', background: '#18181c', color: '#fff' });
      }
    } catch (error) {
      console.error("Error submitting:", error);
      Swal.fire({ icon: 'error', title: 'Error connecting to server!', background: '#18181c', color: '#fff' });
    }
  };

  return (
    <div className="w-full text-white p-4">
      {loading && <p className="text-center text-gray-500">Loading assignments...</p>}
      {error && <p className="text-center text-red-400">Error: {error}</p>}
      
      {!loading && !error && (
        <>
          {!selectedAssignment ? (
            <div className="grid md:grid-cols-2 gap-4">
              {assignments.map(a => (
                <div 
                  key={a._id} 
                  onClick={() => setSelectedAssignment(a)}
                  className="bg-[#18181c] border border-white/10 p-5 rounded-xl cursor-pointer hover:border-purple-500 transition-all group shadow-md"
                >
                  <div className="flex justify-between items-center mb-2">
                    <Badge label={a.topic} />
                    <span className="text-xs text-purple-400 font-bold">Solve Task →</span>
                  </div>
                  <h3 className="font-bold text-lg text-white">{a.title}</h3>
                  <p className="text-xs text-gray-400 mt-1">{a.totalMarks} Marks • Task Hub</p>
                </div>
              ))}
            </div>
          ) : (
            <div className="bg-[#141417] border border-white/[0.08] p-6 rounded-2xl max-w-3xl mx-auto shadow-2xl">
              <button onClick={() => setSelectedAssignment(null)} className="text-xs text-gray-400 mb-6 hover:text-purple-400">← Back</button>
              
              <div className="border-b border-white/10 pb-4 mb-6">
                <Badge label={selectedAssignment.topic} />
                <h2 className="text-2xl font-black mt-2">{selectedAssignment.title}</h2>
                <p className="text-sm text-gray-400 mt-1">Total Marks: {selectedAssignment.totalMarks}</p>
              </div>

              <div className="space-y-6">
                <div className="bg-[#18181c] p-4 rounded-xl border border-white/5">
                  <p className="text-sm text-purple-300 font-bold mb-2">💻 Task Description:</p>
                  <p className="text-sm text-gray-300">{selectedAssignment.prompt}</p>
                </div>

                <div>
                  <label className="text-xs font-bold text-gray-400 uppercase">Solution Overview *</label>
                  <textarea 
                    className="w-full bg-[#0d0d0f] border border-white/10 rounded-xl p-4 mt-2 text-sm"
                    value={textAnswer}
                    onChange={(e) => setTextAnswer(e.target.value)}
                    placeholder="Enter code or notes..."
                  />
                </div>

                {selectedAssignment.questions?.map((q, idx) => (
                  <div key={idx}>
                    <p className="text-sm text-gray-200 mb-2">{q}</p>
                    <input 
                      className="w-full bg-[#0d0d0f] border border-white/10 rounded-xl p-3 text-sm"
                      value={questionAnswers[idx] || ""}
                      onChange={(e) => handleQAnswerChange(idx, e.target.value)}
                      placeholder="Your answer..."
                    />
                  </div>
                ))}

                <div className="border-t border-white/5 pt-4">
                  <label className="text-xs font-bold text-gray-400 uppercase tracking-wider">Upload Project Files *</label>
                  <div className="mt-2 mb-4 p-3 bg-white/[0.03] rounded-lg border border-white/5">
                     <ul className="text-[11px] text-gray-400 list-disc list-inside">
                       <li>Accepted: .zip, .pdf, .py, .cpp, .js</li>
                     </ul>
                  </div>
                  
                  {!selectedFile ? (
                    <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-white/10 rounded-xl cursor-pointer bg-[#0d0d0f]">
                      <span className="text-xl mb-1">📤</span>
                      <p className="text-sm text-gray-300 font-semibold">Click to attach file</p>
                      <input type="file" className="hidden" onChange={handleFileChange} />
                    </label>
                  ) : (
                    <div className="flex items-center justify-between p-4 bg-purple-950/20 border border-purple-500/30 rounded-xl">
                      <p className="text-sm text-white">{selectedFile.name}</p>
                      <button onClick={() => setSelectedFile(null)} className="text-red-400">Remove</button>
                    </div>
                  )}
                </div>
              </div>

              <button 
                onClick={handleSubmit}
                disabled={!isFormValid()}
                className={`w-full py-3 rounded-xl font-bold mt-8 transition-all ${
                  isFormValid() ? "bg-purple-600 hover:bg-purple-700" : "bg-gray-800 text-gray-500 cursor-not-allowed"
                }`}
              >
                Submit Assignment
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default Assignments;
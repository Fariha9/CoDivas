import { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mic, X, Loader2, Bot, Radio, GraduationCap } from "lucide-react";
import { askAssistant } from "../assistantService";

const SpeechRecognition =
  window.SpeechRecognition || window.webkitSpeechRecognition;

const VoiceAssistant = () => {
  const navigate = useNavigate();

  const [open, setOpen] = useState(false);
  const [listening, setListening] = useState(false);
  const [loading, setLoading] = useState(false);
  const [messages, setMessages] = useState([]);

  const recognitionRef = useRef(null);
  const isProcessing = useRef(false);

  useEffect(() => {
    if (!SpeechRecognition) return;

    const recognition = new SpeechRecognition();

    recognition.lang = "en-US";
    recognition.continuous = false;
    recognition.interimResults = false;
    recognition.maxAlternatives = 1;

    recognition.onstart = () => {
      setListening(true);
    };

    recognition.onend = () => {
      setListening(false);
    };

    recognition.onerror = (e) => {
      console.log(e.error);
      setListening(false);
      isProcessing.current = false;
    };

    recognition.onresult = (event) => {
      if (isProcessing.current) return;

      const speech =
        event.results[event.resultIndex][0].transcript.trim();

      if (!speech) return;

      recognition.stop();

      handleUserMessage(speech);
    };

    recognitionRef.current = recognition;

    return () => {
      recognition.stop();
      window.speechSynthesis.cancel();
    };
  }, []);

  const speak = (text, callback) => {
    window.speechSynthesis.cancel();

    const utterance = new SpeechSynthesisUtterance(text);

    utterance.lang = "en-US";
    utterance.rate = 1;
    utterance.pitch = 1;

    utterance.onend = () => {
      callback?.();
    };

    window.speechSynthesis.speak(utterance);
  };

  const executeIntent = (data) => {
    if (data.intent === "navigate") {
      navigate(data.route);
      return;
    }

    if (data.intent === "search_course") {
      navigate(
        `/courses?search=${encodeURIComponent(data.keyword)}`
      );
      return;
    }
  };

  const handleUserMessage = async (message) => {
    if (isProcessing.current) return;

    isProcessing.current = true;

    setMessages((prev) => [
      ...prev,
      {
        role: "user",
        text: message,
      },
    ]);

    setLoading(true);

    try {
      const data = await askAssistant(message);

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: data.reply,
        },
      ]);

      setLoading(false);

      if (
        data.intent === "navigate" ||
        data.intent === "search_course"
      ) {
        speak(data.reply, () => {
          executeIntent(data);
          isProcessing.current = false;
        });
      } else {
        speak(data.reply, () => {
          isProcessing.current = false;
        });
      }
    } catch (err) {
      console.error(err);

      setLoading(false);

      isProcessing.current = false;

      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          text: "Sorry, something went wrong.",
        },
      ]);
    }
  };

  const startListening = () => {
    if (!recognitionRef.current) return;

    if (listening) return;

    recognitionRef.current.start();
  };

  return (    <>
      {/* Floating Button */}
      <button
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 rounded-full bg-purple-600 p-4 text-white shadow-xl hover:bg-purple-700 transition-colors"
      >
        <Mic size={30} />
      </button>

      {open && (
        <div className="fixed bottom-28 right-6 z-50 flex h-[500px] w-[380px] flex-col rounded-2xl bg-[#18181c] shadow-2xl border border-white/10">

          {/* Header */}
          <div className="flex items-center justify-between border-b border-white/10 p-4">
            <div className="flex items-center gap-3">
              <div className="w-9 h-9 bg-purple-600/20 border border-purple-500/30 rounded-xl flex items-center justify-center shrink-0">
                <GraduationCap className="w-5 h-5 text-purple-400" />
              </div>

              <div>
                <h2 className="text-lg font-bold text-white">
                  CoDivas Learning Assistant
                </h2>

                <p className="text-xs text-gray-400">
                  AI Powered Voice Assistant
                </p>
              </div>
            </div>

            <button
              onClick={() => setOpen(false)}
              className="text-gray-400 hover:text-white"
            >
              <X size={18} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4">

            {messages.map((msg, index) => (
              <div
                key={index}
                className={`flex items-end gap-2 ${
                  msg.role === "user"
                    ? "justify-end"
                    : "justify-start"
                }`}
              >
                {msg.role === "assistant" && (
                  <div className="w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center shrink-0">
                    <Bot className="w-3.5 h-3.5 text-purple-400" />
                  </div>
                )}

                <div
                  className={`max-w-[80%] rounded-xl px-4 py-2 text-sm ${
                    msg.role === "user"
                      ? "bg-purple-600 text-white"
                      : "bg-white/5 border border-white/10 text-gray-300"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}

            {loading && (
              <div className="flex items-center gap-2">
                <div className="w-6 h-6 bg-purple-600/20 border border-purple-500/30 rounded-lg flex items-center justify-center shrink-0">
                  <Bot className="w-3.5 h-3.5 text-purple-400" />
                </div>

                <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-xl px-4 py-2">
                  <Loader2 className="w-4 h-4 animate-spin text-purple-400" />
                  <span className="text-sm text-gray-400">
                    Thinking...
                  </span>
                </div>
              </div>
            )}

          </div>

          {/* Footer */}
          <div className="border-t border-white/10 p-4">
            <button
              onClick={startListening}
              disabled={listening}
              className={`w-full rounded-xl py-3 font-semibold text-white flex items-center justify-center gap-2 transition-colors ${
                listening
                  ? "bg-red-500 animate-pulse"
                  : "bg-purple-600 hover:bg-purple-700"
              }`}
            >
              {listening ? (
                <>
                  <Radio className="w-4 h-4" />
                  Listening...
                </>
              ) : (
                <>
                  <Mic className="w-4 h-4" />
                  Speak
                </>
              )}
            </button>
          </div>

        </div>
      )}
    </>
  );
};

export default VoiceAssistant;
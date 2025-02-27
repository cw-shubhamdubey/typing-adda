import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import ConfettiExplosion from "react-confetti-explosion";

export default function TypingSpeedTracker() {
  const [text, setText] = useState("");
  const [notes, setNotes] = useState("");
  const [displayText, setDisplayText] = useState("");
  const [typedIndex, setTypedIndex] = useState(0);
  const [startTime, setStartTime] = useState(null);
  const [wpm, setWpm] = useState(0);
  const [finalWpm, setFinalWpm] = useState(null);
  const [showConfetti, setShowConfetti] = useState(false);
  const [showSplash, setShowSplash] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setShowSplash(false), 4000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (text.length === 1 && !startTime) {
      setStartTime(Date.now());
    }
    
    if (text.length > 0 && startTime) {
      const elapsedMinutes = (Date.now() - startTime) / 60000;
      const words = text.split(/\s+/).filter(word => word.length > 0);
      setWpm(Math.round(words.length / elapsedMinutes));
    }
  }, [text]);
  
  const getFinalSpeed = () => {
    setFinalWpm(wpm);
    setShowConfetti(true);
    setTimeout(() => setShowConfetti(false), 4000);
  };

  const insertNotes = () => {
    setDisplayText(notes);
    setText("");
    setTypedIndex(0);
    setStartTime(null);
  };
  
  const handleTyping = (e) => {
    const input = e.target.value;
    setText(input);
    setTypedIndex(input.length);
  };
  
  const resetTest = () => {
    setText("");
    setNotes("");
    setDisplayText("");
    setTypedIndex(0);
    setWpm(0);
    setFinalWpm(null);
    setShowConfetti(false);
    setStartTime(null);
  };

  if (showSplash) {
    return (
      <motion.div 
        className="flex flex-col justify-center items-center h-screen bg-black text-white"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 1 }}
      >
        <motion.h1 
          className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-red-500 via-yellow-500 to-blue-500 animate-pulse"
          initial={{ scale: 0.8 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, type: "spring", stiffness: 100 }}
        >
          Typing Adda
        </motion.h1>
        <motion.p 
          className="text-xl mt-2 text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1 }}
        >
          By Shubham Dubey
        </motion.p>
      </motion.div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      transition={{ duration: 1 }}
      className="flex flex-col items-center p-6 bg-gradient-to-br from-black via-red-600 to-blue-400 min-h-screen text-white"
    >
      {showConfetti && <ConfettiExplosion />}
      <motion.div 
        initial={{ scale: 0.8, rotate: -5 }} 
        animate={{ scale: 1, rotate: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 100 }}
        className="bg-black p-6 rounded-lg shadow-2xl max-w-lg w-full text-white border border-red-600"
      >
        <motion.h1 
          className="text-4xl font-extrabold mb-4 text-center text-light-blue-400"
          initial={{ y: -20 }}
          animate={{ y: 0 }}
          transition={{ duration: 0.5 }}
        >
          🚀 Typing Adda - Typing Speed Tracker 🎯
        </motion.h1>
        <motion.div 
          className="border-2 border-red-500 p-3 w-full h-40 text-lg rounded-lg bg-black relative font-mono text-xl leading-relaxed tracking-wide shadow-inner shadow-blue-400"
        >
          {displayText.split("").map((char, index) => (
            <motion.span 
              key={index} 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: index * 0.02 }}
              className={
                index < typedIndex
                  ? text[index] === char
                    ? "text-blue-400"
                    : "text-red-500 bg-red-900"
                  : "text-gray-500"
              }
            >
              {char}
            </motion.span>
          ))}
        </motion.div>
        <p className="text-xl mt-2">Live Typing Speed: {wpm} WPM</p>
        <motion.textarea
          className="border-2 border-red-500 p-3 w-full h-12 text-lg rounded-lg focus:outline-none focus:ring-4 focus:ring-blue-400 transition-all mt-4 bg-black text-white"
          placeholder="Paste your notes here..."
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          whileFocus={{ scale: 1.02 }}
        />
        <motion.button 
          className="mt-2 bg-red-600 hover:bg-red-700 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={insertNotes}
          whileHover={{ scale: 1.1, rotate: 3 }}
          whileTap={{ scale: 0.9 }}
        >
          Insert Notes into Typing Area
        </motion.button>
        <motion.input
          className="border-2 border-blue-400 p-3 w-full mt-4 h-24 text-lg rounded-lg focus:outline-none focus:ring-4 focus:ring-red-400 transition-all bg-black text-white"
          placeholder="Start typing here..."
          value={text}
          onChange={handleTyping}
        />
        <motion.button 
          className="mt-4 bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded-lg shadow-lg transition-transform transform hover:scale-105"
          onClick={resetTest}
        >
          Reset Test
        </motion.button>
      </motion.div>
    </motion.div>
  );
}

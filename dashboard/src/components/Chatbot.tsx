import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { X, Sparkles, MessageCircle } from 'lucide-react';

const botResponses = [
  "Yay! I'm checkin' your websites... they look happy!",
  "Ooh, your sites are super fast! Good job!",
  "Uh-oh, I see a couple oopsies! Wanna fix 'em?",
  "Wanna see a fun report of your websites? I can make one!",
  "Your websites are up 99.8%! That's like, super awesome!",
  "Some pages are a bit slow. I can help make 'em faster!",
  "Hmm, one website needs a little love. Let's check it!",
  "All your sites are dancin' and workin' great!",
  "Something went whoops a while ago, but it's okay now!",
  "Want me to tell you if a website takes a nap? I can do that!"
];

const welcomeMessage = {
  text: "Hi! I'm Nova, your cosmic assistant. Ready to boost your websites? 🌌",
  sender: 'bot' as const
};

const Chatbot: React.FC = () => {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [messages, setMessages] = useState<Array<{ text: string, sender: 'user' | 'bot' }>>([welcomeMessage]);
  const [inputMessage, setInputMessage] = useState('');
  const [isBotTyping, setIsBotTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = () => {
    if (inputMessage.trim() === '') return;
    
    const newMessage = { text: inputMessage, sender: 'user' as const };
    setMessages(prev => [...prev, newMessage]);
    setInputMessage('');
    setIsBotTyping(true);
    
    setTimeout(() => {
      const randomResponse = botResponses[Math.floor(Math.random() * botResponses.length)];
      setMessages(prev => [...prev, { text: randomResponse, sender: 'bot' }]);
      setIsBotTyping(false);
    }, 1000 + Math.random() * 2000);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  const avatarVariants = {
    animate: {
      rotateY: [0, 360],
      rotateX: [0, 360],
      y: [0, -10, 0],
      scale: [1, 1.05, 1],
      transition: {
        repeat: Infinity,
        duration: 7,
        ease: 'easeInOut',
      },
    },
  };

  const glowVariants = {
    animate: {
      scale: [1, 1.3, 1],
      opacity: [0.3, 0.5, 0.3],
      transition: {
        repeat: Infinity,
        duration: 3,
        ease: 'easeInOut',
      },
    },
  };

  const particleVariants = {
    animate: {
      y: [0, Math.random() * 60 - 30],
      x: [0, Math.random() * 60 - 30],
      opacity: [0, 0.6, 0],
      scale: [0.5, 1.4, 0.5],
      transition: {
        duration: Math.random() * 3 + 2,
        repeat: Infinity,
        ease: 'easeInOut',
        delay: Math.random() * 1,
      },
    },
  };

  return (
    <div className="fixed bottom-8 right-8 z-50">
      {isChatOpen ? (
        <motion.div
          className="relative w-[400px] h-[550px] flex flex-col"
          initial={{ opacity: 0, scale: 0.8, y: 80 }}
          animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0, rotateY: 0 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ type: 'spring', damping: 22, stiffness: 350 }}
        >
          {/* Main Chat Container */}
          <div className="flex-1 rounded-3xl bg-gradient-to-br from-indigo-950/50 to-purple-950/50 backdrop-blur-3xl border border-indigo-400/30 shadow-3xl overflow-hidden flex flex-col">
            {/* Header */}
            <div className="p-4 bg-gradient-to-r from-indigo-800/70 to-purple-800/70 text-white flex items-center justify-between border-b border-indigo-400/40">
              <div className="flex items-center space-x-4">
                <motion.div
                  className="relative w-10 h-10"
                  variants={avatarVariants}
                  animate="animate"
                  style={{ transformStyle: 'preserve-3d' }}
                >
                  <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 flex items-center justify-center overflow-hidden">
                    {/* Celestial Orb Logo (Smaller) */}
                    <svg viewBox="0 0 100 100" className="w-8 h-8">
                      <circle cx="50" cy="50" r="40" fill="url(#orbGradient)" stroke="#fff" strokeWidth="3" />
                      <path d="M20 50 C30 30, 70 30, 80 50" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
                      <path d="M20 50 C30 70, 70 70, 80 50" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
                      <circle cx="50" cy="50" r="10" fill="#FFD700" />
                      <circle cx="30" cy="30" r="4" fill="#fff" opacity="0.9" />
                      <circle cx="70" cy="30" r="4" fill="#fff" opacity="0.9" />
                      <circle cx="30" cy="70" r="4" fill="#fff" opacity="0.9" />
                      <circle cx="70" cy="70" r="4" fill="#fff" opacity="0.9" />
                      <defs>
                        <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
                          <stop offset="0%" style={{ stopColor: '#4B0082', stopOpacity: 1 }} />
                          <stop offset="100%" style={{ stopColor: '#9400D3', stopOpacity: 1 }} />
                        </radialGradient>
                      </defs>
                    </svg>
                    <motion.div
                      className="absolute inset-0 rounded-full bg-indigo-600/40 blur-xl"
                      variants={glowVariants}
                      animate="animate"
                    />
                  </div>
                </motion.div>
                <span className="font-bold text-lg tracking-wider text-white drop-shadow-xl">
                  Nova, Cosmic Ally
                </span>
              </div>
              <motion.button
                onClick={() => setIsChatOpen(false)}
                className="p-2 rounded-full bg-indigo-600/40 hover:bg-indigo-600/60 transition-colors"
                whileHover={{ scale: 1.2 }}
                whileTap={{ scale: 0.8 }}
              >
                <X size={22} className="text-white" />
              </motion.button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 p-6 overflow-y-auto space-y-5 bg-gradient-to-b from-transparent to-indigo-950/40">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
                  initial={{ opacity: 0, y: 30, rotateX: -30 }}
                  animate={{ opacity: 1, y: 0, rotateX: 0 }}
                  transition={{ duration: 0.5, type: 'spring', stiffness: 120 }}
                >
                  <div
                    className={`max-w-[70%] rounded-xl px-4 py-3 transition-all ${
                      message.sender === 'user'
                        ? 'bg-gradient-to-r from-indigo-700 to-blue-700 text-white shadow-2xl'
                        : 'bg-gradient-to-r from-purple-700/70 to-indigo-700/70 text-white shadow-2xl backdrop-blur-lg'
                    }`}
                  >
                    <span className="text-sm font-medium drop-shadow-md">{message.text}</span>
                    <motion.div
                      className="absolute inset-0 rounded-xl bg-indigo-600/30 blur-xl -z-10"
                      variants={glowVariants}
                      animate="animate"
                    />
                  </div>
                </motion.div>
              ))}
              {isBotTyping && (
                <motion.div
                  className="flex justify-start"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.4 }}
                >
                  <div className="bg-purple-700/70 rounded-xl px-4 py-2 flex space-x-2 items-center backdrop-blur-lg">
                    <motion.div
                      className="w-2 h-2 bg-indigo-500 rounded-full"
                      animate={{ y: [-8, 8, -8], scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-indigo-500 rounded-full"
                      animate={{ y: [-8, 8, -8], scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: 0.2 }}
                    />
                    <motion.div
                      className="w-2 h-2 bg-indigo-500 rounded-full"
                      animate={{ y: [-8, 8, -8], scale: [1, 1.3, 1] }}
                      transition={{ duration: 0.7, repeat: Infinity, delay: 0.4 }}
                    />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Input Area */}
            <div className="p-4 border-t border-indigo-400/40 bg-indigo-950/50 backdrop-blur-3xl">
              <div className="flex space-x-3">
                <motion.input
                  type="text"
                  value={inputMessage}
                  onChange={(e) => setInputMessage(e.target.value)}
                  onKeyPress={handleKeyPress}
                  placeholder="Chat with Nova..."
                  className="flex-1 rounded-full bg-indigo-900/70 border border-indigo-400/60 focus:border-indigo-200 focus:ring-2 focus:ring-indigo-200/50 px-5 py-3 text-sm text-white outline-none transition-all placeholder-indigo-100/60"
                  whileFocus={{ scale: 1.04 }}
                  transition={{ type: 'spring', stiffness: 500 }}
                />
                <motion.button
                  onClick={handleSendMessage}
                  disabled={inputMessage.trim() === ''}
                  className={`w-12 h-12 rounded-full flex items-center justify-center text-white hover:shadow-3xl transition-all ${
                    inputMessage.trim() === ''
                      ? 'bg-indigo-700/50 cursor-not-allowed'
                      : 'bg-gradient-to-r from-indigo-600 to-purple-600'
                  }`}
                  whileHover={{ scale: 1.2, rotate: 15 }}
                  whileTap={{ scale: 0.85 }}
                >
                  <MessageCircle size={22} />
                </motion.button>
              </div>
            </div>
          </div>

          {/* Background Effects */}
          <motion.div
            className="absolute -inset-3 rounded-3xl bg-indigo-600/20 blur-3xl -z-10"
            animate={{ scale: [1, 1.15, 1], opacity: [0.4, 0.6, 0.4] }}
            transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
          />
          <motion.div
            className="absolute -inset-5 rounded-3xl bg-purple-600/15 blur-3xl -z-20"
            animate={{ scale: [1, 1.1, 1], opacity: [0.3, 0.5, 0.3] }}
            transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
          />
          {[...Array(12)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-indigo-500/50"
              style={{
                width: `${Math.random() * 8 + 4}px`,
                height: `${Math.random() * 8 + 4}px`,
                top: `${Math.random() * 100}%`,
                left: `${Math.random() * 100}%`,
              }}
              variants={particleVariants}
              animate="animate"
            />
          ))}
          {/* Light Rays */}
          {[...Array(2)].map((_, i) => (
            <motion.div
              key={`ray-${i}`}
              className="absolute w-full h-1 bg-gradient-to-r from-transparent via-white/20 to-transparent"
              style={{
                top: `${40 + i * 20}%`,
                left: '-100%',
              }}
              animate={{ x: ['-100%', '100%'] }}
              transition={{
                duration: 7 + i * 2,
                repeat: Infinity,
                ease: 'linear',
                delay: i * 0.5,
              }}
            />
          ))}
        </motion.div>
      ) : (
        <motion.div
          className="relative"
          whileHover={{ scale: 1.25 }}
          whileTap={{ scale: 0.9 }}
          animate={{
            y: [0, -20, 0],
            transition: { duration: 4, repeat: Infinity, ease: 'easeInOut' },
          }}
        >
          {/* Floating Particles */}
          {[...Array(10)].map((_, i) => (
            <motion.div
              key={i}
              className="absolute rounded-full bg-purple-500/70 pointer-events-none"
              style={{
                width: `${Math.random() * 6 + 4}px`,
                height: `${Math.random() * 6 + 4}px`,
                top: `${Math.random() * 100 - 50}px`,
                left: `${Math.random() * 100 - 50}px`,
              }}
              animate={{
                scale: [0.5, 1.8, 0.5],
                opacity: [0, 0.9, 0],
              }}
              transition={{
                duration: Math.random() * 2.5 + 1.5,
                repeat: Infinity,
                ease: 'easeInOut',
              }}
            />
          ))}

          {/* Glow Background */}
          <motion.div
            className="absolute inset-0 rounded-full bg-indigo-600/40 blur-3xl animate-pulse"
            animate={{ scale: [1, 1.2, 1] }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          />

          {/* Avatar Button */}
          <motion.div
            className="relative w-20 h-20 cursor-pointer"
            onClick={() => setIsChatOpen(true)}
            style={{ transformStyle: 'preserve-3d' }}
          >
            <div className="absolute inset-0 rounded-full bg-gradient-to-br from-indigo-500 to-purple-500 border border-indigo-200/70 shadow-3xl overflow-hidden">
              <motion.div
                className="absolute inset-1 rounded-full bg-gradient-to-br from-indigo-600 to-purple-600 flex items-center justify-center"
                variants={avatarVariants}
                animate="animate"
              >
                <div className="relative w-14 h-14">
                  {/* Celestial Orb Logo (Smaller) */}
                  <svg viewBox="0 0 100 100" className="w-12 h-12">
                    <circle cx="50" cy="50" r="40" fill="url(#orbGradient)" stroke="#fff" strokeWidth="3" />
                    <path d="M20 50 C30 30, 70 30, 80 50" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
                    <path d="M20 50 C30 70, 70 70, 80 50" fill="none" stroke="#fff" strokeWidth="4" opacity="0.8" />
                    <circle cx="50" cy="50" r="10" fill="#FFD700" />
                    <circle cx="30" cy="30" r="4" fill="#fff" opacity="0.9" />
                    <circle cx="70" cy="30" r="4" fill="#fff" opacity="0.9" />
                    <circle cx="30" cy="70" r="4" fill="#fff" opacity="0.9" />
                    <circle cx="70" cy="70" r="4" fill="#fff" opacity="0.9" />
                    <defs>
                      <radialGradient id="orbGradient" cx="50%" cy="50%" r="50%">
                        <stop offset="0%" style={{ stopColor: '#4B0082', stopOpacity: 1 }} />
                        <stop offset="100%" style={{ stopColor: '#9400D3', stopOpacity: 1 }} />
                      </radialGradient>
                    </defs>
                  </svg>
                  <motion.div
                    className="absolute inset-0 rounded-full bg-white/50 blur-lg"
                    animate={{ scale: [1, 1.3, 1] }}
                    transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  />
                </div>
              </motion.div>
            </div>

            {/* Orbiting Rings */}
            <motion.div
              className="absolute -inset-4 rounded-full border border-indigo-500/50 pointer-events-none"
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: 'linear' }}
            />
            <motion.div
              className="absolute -inset-6 rounded-full border border-purple-500/40 pointer-events-none"
              animate={{ rotate: -360 }}
              transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
            />
            {/* Sparkle Effects */}
            {[...Array(2)].map((_, i) => (
              <motion.div
                key={i}
                className="absolute w-4 h-4 text-white"
                style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                }}
                animate={{ rotate: [0, 360], scale: [1, 1.5, 1] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut', delay: i * 0.5 }}
              >
                <Sparkles size={14} />
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      )}
    </div>
  );
};

export default Chatbot;

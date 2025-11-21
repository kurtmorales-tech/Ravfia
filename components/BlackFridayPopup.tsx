import React, { useState, useEffect } from 'react';
import { X, Tag } from 'lucide-react';

const BlackFridayPopup: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [timeLeft, setTimeLeft] = useState({ days: 0, hours: 0, minutes: 0, seconds: 0 });
  const [email, setEmail] = useState('');
  const [isSubmitted, setIsSubmitted] = useState(false);

  useEffect(() => {
    // Delay opening to simulate user settling in
    const timer = setTimeout(() => {
      const hasSeen = sessionStorage.getItem('ravfia_bf_popup');
      if (!hasSeen) {
        setIsOpen(true);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    // Set a deadline 4 days from now
    const deadline = new Date();
    deadline.setDate(deadline.getDate() + 4);
    deadline.setHours(23, 59, 59);

    const timer = setInterval(() => {
      const now = new Date();
      const difference = deadline.getTime() - now.getTime();

      if (difference <= 0) {
        clearInterval(timer);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        setTimeLeft({
          days: Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
          minutes: Math.floor((difference / 1000 / 60) % 60),
          seconds: Math.floor((difference / 1000) % 60),
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    sessionStorage.setItem('ravfia_bf_popup', 'true');
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
    // Simulate API call and auto close
    setTimeout(() => {
      handleClose();
    }, 2500);
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
      <div 
        className="absolute inset-0 bg-black/80 backdrop-blur-sm transition-opacity" 
        onClick={handleClose}
      ></div>
      
      <div className="relative bg-slate-900 w-full max-w-md rounded-2xl overflow-hidden shadow-2xl border border-slate-700 animate-in zoom-in-95 duration-300">
        {/* Decorative Elements */}
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-yellow-400 via-red-500 to-purple-500"></div>
        <div className="absolute -top-20 -right-20 w-40 h-40 bg-yellow-500/10 rounded-full blur-3xl pointer-events-none"></div>
        <div className="absolute -bottom-20 -left-20 w-40 h-40 bg-purple-500/10 rounded-full blur-3xl pointer-events-none"></div>

        <button 
          onClick={handleClose}
          className="absolute top-4 right-4 text-slate-400 hover:text-white transition-colors z-10 bg-white/5 rounded-full p-1"
        >
          <X size={20} />
        </button>

        <div className="p-8 flex flex-col items-center text-center relative z-10">
          <div className="w-16 h-16 bg-gradient-to-br from-yellow-400 to-orange-600 rounded-2xl rotate-3 flex items-center justify-center mb-6 shadow-lg shadow-orange-500/20">
            <Tag className="text-white" size={32} />
          </div>

          <h2 className="text-3xl font-black text-white uppercase tracking-tight mb-2">
            Black Friday <span className="text-transparent bg-clip-text bg-gradient-to-r from-yellow-400 to-orange-500">Deal</span>
          </h2>
          
          <p className="text-slate-300 mb-8 text-sm leading-relaxed">
            Don't miss out! Get <span className="text-white font-bold">50% OFF</span> your first bin cleaning service. Offer expires soon.
          </p>

          {/* Countdown Timer */}
          <div className="grid grid-cols-4 gap-3 w-full mb-8">
            {[
              { label: 'DAYS', value: timeLeft.days },
              { label: 'HRS', value: timeLeft.hours },
              { label: 'MIN', value: timeLeft.minutes },
              { label: 'SEC', value: timeLeft.seconds },
            ].map((item, idx) => (
              <div key={idx} className="bg-slate-800/50 border border-slate-700 rounded-lg p-2 flex flex-col items-center">
                <span className="text-2xl font-mono font-bold text-white">{String(item.value).padStart(2, '0')}</span>
                <span className="text-[10px] font-bold text-slate-500">{item.label}</span>
              </div>
            ))}
          </div>

          {!isSubmitted ? (
            <form onSubmit={handleSubmit} className="w-full space-y-3">
              <input 
                type="email" 
                placeholder="Enter your email address" 
                className="w-full px-4 py-3 bg-slate-800 border border-slate-600 rounded-xl text-white placeholder-slate-400 focus:outline-none focus:border-yellow-500 focus:ring-1 focus:ring-yellow-500 transition-all text-sm"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <button 
                type="submit"
                className="w-full bg-gradient-to-r from-yellow-500 to-orange-600 hover:from-yellow-400 hover:to-orange-500 text-white font-bold py-3 rounded-xl shadow-lg shadow-orange-500/25 transition-all transform hover:scale-[1.02] active:scale-95 uppercase text-sm tracking-wide"
              >
                Claim 50% Off
              </button>
              <p className="text-xs text-slate-500 mt-3">
                Valid for new customers only. Limit one per household.
              </p>
            </form>
          ) : (
            <div className="w-full bg-green-500/10 border border-green-500/20 rounded-xl p-4 animate-in fade-in slide-in-from-bottom-2">
              <p className="text-green-400 font-medium text-sm">Success! Check your inbox for your coupon code.</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default BlackFridayPopup;
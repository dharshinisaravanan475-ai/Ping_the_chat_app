import { useState, useEffect } from "react";

const AuthImagePattern = ({ title, subtitle }) => {
  const [activeMessages, setActiveMessages] = useState([]);
  const [typingDots, setTypingDots] = useState(false);
  const [securityLevel, setSecurityLevel] = useState(0);

  useEffect(() => {
    // Message bubble animation sequence - slower timing
    const messageSequence = [
      { id: 1, delay: 0, side: 'left' },
      { id: 2, delay: 2800, side: 'right' },
      { id: 3, delay: 5500, side: 'left' },
      { id: 4, delay: 8200, side: 'right' },
    ];

    messageSequence.forEach(({ id, delay, side }) => {
      setTimeout(() => {
        setActiveMessages(prev => [...prev, { id, side }]);
      }, delay);
    });

    // Typing indicator - slower and longer
    setTimeout(() => setTypingDots(true), 4200);
    setTimeout(() => setTypingDots(false), 7000);

    // Security level animation - slower progression
    const securityInterval = setInterval(() => {
      setSecurityLevel(prev => (prev + 1) % 4);
    }, 1500);

    // Reset animation cycle - longer cycle
    const resetInterval = setInterval(() => {
      setActiveMessages([]);
      setTypingDots(false);
      setSecurityLevel(0);
      
      // Restart sequence
      messageSequence.forEach(({ id, delay, side }) => {
        setTimeout(() => {
          setActiveMessages(prev => [...prev, { id, side }]);
        }, delay);
      });
      
      setTimeout(() => setTypingDots(true), 4200);
      setTimeout(() => setTypingDots(false), 7000);
    }, 10000);

    return () => {
      clearInterval(securityInterval);
      clearInterval(resetInterval);
    };
  }, []);

  const MessageBubble = ({ side, id }) => (
    <div
      className={`flex ${side === 'right' ? 'justify-end' : 'justify-start'} mb-2 animate-fadeInUp`}
      style={{ animationDelay: `${id * 0.4}s` }}
    >
      <div
        className={`max-w-xs px-3 py-2 rounded-2xl text-xs ${
          side === 'right'
            ? 'bg-primary text-primary-content rounded-br-sm'
            : 'bg-base-300 text-base-content rounded-bl-sm'
        } transform animate-bounceIn`}
      >
        <div className="w-8 h-2 bg-current opacity-30 rounded animate-pulse"></div>
      </div>
    </div>
  );

  const TypingIndicator = () => (
    <div className="flex justify-start mb-2 animate-fadeInUp">
      <div className="bg-base-300 px-4 py-3 rounded-2xl rounded-bl-sm">
        <div className="flex space-x-1">
          {[0, 1, 2].map((i) => (
            <div
              key={i}
              className="w-2 h-2 bg-base-content opacity-50 rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.4}s` }}
            ></div>
          ))}
        </div>
      </div>
    </div>
  );

  const SecurityBadge = ({ level }) => (
    <div className="absolute -top-1 -right-1">
      <div className={`w-3 h-3 rounded-full ${
        level >= 3 ? 'bg-success animate-ping' : 
        level >= 2 ? 'bg-warning animate-pulse' : 
        level >= 1 ? 'bg-error animate-bounce' : 'bg-base-content opacity-30'
      }`}></div>
    </div>
  );

  return (
    <div className="hidden lg:flex items-center justify-center bg-base-200 p-12 min-h-screen">
      <div className="max-w-md text-center mt-16">
        <div className="grid grid-cols-3 gap-4 mb-8">
          {/* Chat Interface Animation */}
          <div className="col-span-2 aspect-square rounded-2xl bg-base-100 p-3 shadow-lg overflow-hidden relative">
            <div className="h-full flex flex-col justify-end">
              {activeMessages.map((msg) => (
                <MessageBubble key={msg.id} side={msg.side} id={msg.id} />
              ))}
              {typingDots && <TypingIndicator />}
            </div>
            <div className="absolute top-2 left-2 w-2 h-2 bg-success rounded-full animate-pulse"></div>
            <div className="absolute top-2 right-2 text-xs opacity-50">💬</div>
          </div>

          {/* Security Lock Animation */}
          <div className="aspect-square rounded-2xl bg-gradient-to-br from-primary/20 to-secondary/20 flex items-center justify-center relative">
            <div className="text-2xl transform animate-pulse">
              {securityLevel >= 3 ? '🔒' : securityLevel >= 1 ? '🔓' : '🔐'}
            </div>
            <SecurityBadge level={securityLevel} />
          </div>

          {/* Notification Bell */}
          <div className="aspect-square rounded-2xl bg-accent/10 flex items-center justify-center relative overflow-hidden">
            <div className="text-2xl animate-swing">🔔</div>
            <div className="absolute inset-0 bg-accent/20 rounded-full animate-ping opacity-0 animate-pulse"></div>
          </div>

          {/* Message Counter */}
          <div className="aspect-square rounded-2xl bg-info/10 flex items-center justify-center">
            <div className="text-center">
              <div className="text-lg font-bold animate-countUp">{activeMessages.length}</div>
              <div className="text-xs opacity-60">msgs</div>
            </div>
          </div>

          {/* Connection Status */}
          <div className="aspect-square rounded-2xl bg-success/10 flex items-center justify-center">
            <div className="flex space-x-1">
              {[0, 1, 2].map((i) => (
                <div
                  key={i}
                  className="w-1 h-4 bg-success rounded-full animate-wave"
                  style={{ animationDelay: `${i * 0.2}s` }}
                ></div>
              ))}
            </div>
          </div>

          {/* Typing Animation */}
          <div className="col-span-3 h-16 rounded-2xl bg-base-100 flex items-center px-4 shadow-lg">
            <div className="flex-1 h-8 bg-base-200 rounded-full px-3 flex items-center">
              <div className="w-full h-2 bg-base-300 rounded animate-pulse"></div>
            </div>
            <div className="ml-3 w-8 h-8 bg-primary rounded-full flex items-center justify-center text-white animate-bounce">
              ➤
            </div>
          </div>
        </div>
        
        <h2 className="text-2xl font-bold mb-4">{title}</h2>
        <p className="text-base-content/60">{subtitle}</p>

        <style jsx>{`
          @keyframes fadeInUp {
            from {
              opacity: 0;
              transform: translateY(15px);
            }
            to {
              opacity: 1;
              transform: translateY(0);
            }
          }
          
          @keyframes bounceIn {
            0% {
              transform: scale(0.3);
              opacity: 0;
            }
            50% {
              transform: scale(1.05);
              opacity: 0.8;
            }
            70% {
              transform: scale(0.9);
              opacity: 1;
            }
            100% {
              transform: scale(1);
              opacity: 1;
            }
          }
          
          @keyframes swing {
            0%, 100% { transform: rotate(0deg); }
            25% { transform: rotate(8deg); }
            75% { transform: rotate(-8deg); }
          }
          
          @keyframes wave {
            0%, 100% { height: 16px; opacity: 0.7; }
            50% { height: 8px; opacity: 1; }
          }
          
          @keyframes countUp {
            from { transform: scale(0.5); opacity: 0; }
            to { transform: scale(1); opacity: 1; }
          }
          
          .animate-fadeInUp {
            animation: fadeInUp 1.2s ease-out forwards;
          }
          
          .animate-bounceIn {
            animation: bounceIn 1.5s cubic-bezier(0.68, -0.55, 0.265, 1.55) forwards;
          }
          
          .animate-swing {
            animation: swing 3s ease-in-out infinite;
          }
          
          .animate-wave {
            animation: wave 2.5s ease-in-out infinite;
          }
          
          .animate-countUp {
            animation: countUp 0.8s ease-out forwards;
          }
        `}</style>
      </div>
    </div>
  );
};

export default AuthImagePattern;
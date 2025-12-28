'use client';
import { useState, useRef, useEffect } from 'react';

interface ChatWidgetProps {
  userRole?: string;
}

export default function ChatWidget({ userRole = 'visitor' }: ChatWidgetProps) {
  const role = userRole || 'visitor';
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setLoading(true);

    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ 
        message: userInput, 
        role 
      })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { role: 'bot' as const, content: data.reply }]);
    setLoading(false);
  };

  // Welcome message on role change
  useEffect(() => {
    if (messages.length === 0) {
      const welcomeMsg = `Welcome to Bentacars, ${role.toUpperCase()}! Ano pong need natin, Ma'am/Sir? 😊`;
      setMessages([{ role: 'bot' as const, content: welcomeMsg }]);
    }
  }, [role]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="fixed bottom-6 right-6 z-[1000] w-80 md:w-96 h-[500px] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col overflow-hidden">
      {/* Header with Role Badge */}
      <div className="p-4 bg-gradient-to-r from-orange-500 to-yellow-500 text-white flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 bg-white/20 rounded-xl flex items-center justify-center">
            <span className="text-lg">🤖</span>
          </div>
          <div>
            <div className="font-bold text-sm">Zharaine Assistant</div>
            <div className="text-xs bg-white/20 px-2 py-1 rounded-full capitalize">
              {role}
            </div>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-gradient-to-b from-orange-50/50 to-transparent">
        {messages.map((msg, idx) => (
          <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
            <div className={`max-w-[90%] px-3 py-2 rounded-2xl shadow-sm ${
              msg.role === 'user'
                ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-black text-sm'
                : 'bg-white border border-orange-100/50 text-sm text-black'
            }`}>
              {msg.content}
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-white/50 border border-orange-100 px-3 py-2 rounded-2xl animate-pulse">
              <div className="h-4 bg-orange-100 rounded w-20"></div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 border-t bg-white/80">
        <div className="flex gap-2">
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage()}
            placeholder={`Ask ${role === 'visitor' ? 'anything' : role} questions...`}
            className="flex-1 px-3 py-2 border border-orange-200 rounded-xl focus:border-orange-400 focus:ring-1 focus:ring-orange-200 focus:outline-none text-sm text-black"
            disabled={loading}
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="w-10 h-10 bg-gradient-to-r from-orange-500 to-yellow-500 text-white rounded-xl flex items-center justify-center hover:from-orange-600 hover:to-yellow-600 shadow-md disabled:opacity-50"
          >
            ➤
          </button>
        </div>
      </div>
    </div>
  );
}

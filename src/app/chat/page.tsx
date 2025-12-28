// app/chat/page.tsx
'use client';
import { useState, useRef, useEffect } from 'react';

export default function ChatPage() {
  const [messages, setMessages] = useState<{role: string, content: string}[]>([]);
  const [input, setInput] = useState('');
  const [role, setRole] = useState('visitor');
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;
    
    // Add user message
    const userMsg = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMsg]);
    const userInput = input;
    setInput('');
    setLoading(true);

    // Call API
    const res = await fetch('/api/chat', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userInput, role })
    });

    const data = await res.json();
    setMessages(prev => [...prev, { role: 'bot' as const, content: data.reply }]);
    setLoading(false);
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 to-yellow-100 flex items-center justify-center p-4">
      <div className="w-full max-w-lg bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-orange-200/50">
        
        {/* Header */}
        <div className="p-6 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-t-3xl text-white text-center">
          <h1 className="text-2xl font-bold mb-1">🚗 BentaCars Chatbot</h1>
          <p className="text-orange-100">Production Demo - All Roles</p>
        </div>

        {/* Role Selector */}
        <div className="p-5 bg-gradient-to-r from-orange-50 to-yellow-50 border-b border-orange-100">
          <label className="block text-sm font-semibold text-gray-700 mb-3">
            Switch Role:
          </label>
          <select 
            value={role}
            onChange={e => setRole(e.target.value)}
            className="w-full p-3 bg-white border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 transition-all"
          >
            <option value="visitor">👋 Visitor (Landing Page)</option>
            <option value="buyer">🛒 Buyer (DP/Monthly)</option>
            <option value="seller">💰 Seller (List Car)</option>
            <option value="agent">👨‍💼 Agent (Dashboard)</option>
          </select>
        </div>

        {/* Messages */}
        <div className="h-96 overflow-y-auto p-5 space-y-4 bg-gradient-to-b from-white/70 to-orange-50/50">
          {messages.length === 0 && (
            <div className="text-center text-gray-500 py-12">
              <div className="w-20 h-20 bg-orange-100 rounded-2xl mx-auto mb-4 flex items-center justify-center">
                <span className="text-2xl">🤖</span>
              </div>
              <p>Try: "DP sedan 2020" or "List Vios 2020"</p>
            </div>
          )}
          
          {messages.map((msg, idx) => (
            <div key={idx} className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}>
              <div className={`max-w-[85%] px-4 py-3 rounded-2xl shadow-sm ${
                msg.role === 'user'
                  ? 'bg-gradient-to-r from-orange-500 to-yellow-500 text-white'
                  : 'bg-white/80 border border-orange-100'
              }`}>
                <p className="text-sm">{msg.content}</p>
              </div>
            </div>
          ))}
          
          {loading && (
            <div className="flex justify-start">
              <div className="bg-white/80 border border-orange-100 px-4 py-3 rounded-2xl animate-pulse">
                <div className="h-4 bg-orange-100 rounded w-24"></div>
              </div>
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Input */}
        <div className="p-5 bg-white/80 border-t border-orange-100 rounded-b-3xl">
          <div className="flex gap-3">
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && !e.shiftKey && sendMessage()}
              placeholder="Ask about DP, monthly, or list a car..."
              className="flex-1 px-4 py-3 bg-white/50 border-2 border-orange-200 rounded-xl focus:border-orange-400 focus:ring-2 focus:ring-orange-200 focus:outline-none transition-all placeholder-gray-500"
              disabled={loading}
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="px-6 py-3 bg-gradient-to-r from-orange-500 to-yellow-500 text-white font-semibold rounded-xl hover:from-orange-600 hover:to-yellow-600 shadow-lg transform hover:-translate-y-0.5 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? '⏳' : '➤'}
            </button>
          </div>
          <p className="text-xs text-gray-500 mt-2 text-center">
            Role: <span className="font-semibold text-orange-600">{role}</span>
          </p>
        </div>
      </div>
    </div>
  );
}

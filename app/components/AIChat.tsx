'use client';

import { useState, useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant' | 'system';
  content: string;
  timestamp: Date;
}

interface CompanyProfile {
  industry: string;
  orgSize: string;
  location: string;
}

const industries = [
  'Manufacturing & Industrial',
  'Healthcare & Medical',
  'Retail & Hospitality',
  'Construction & Trades',
  'Technology & Software',
  'Financial Services',
  'Logistics & Transportation',
  'Other',
];

const orgSizes = [
  '1-50 employees',
  '51-200 employees',
  '201-500 employees',
  '501-1000 employees',
  '1000+ employees',
];

const locations = [
  'Northeast (NY, NJ, PA, MA, CT)',
  'Southeast (FL, GA, NC, SC, VA)',
  'Midwest (IL, OH, MI, IN, WI)',
  'Southwest (TX, AZ, NM, OK)',
  'West Coast (CA, WA, OR)',
  'Mountain (CO, UT, NV)',
];

const demoPrompts = [
  'Which employees are ready for a promotion?',
  'Who deserves a wage increase based on skill progression?',
  'Show me team optimization opportunities',
  'What skills gaps should we address?',
];

export default function AIChat() {
  const [step, setStep] = useState<'industry' | 'size' | 'location' | 'chat'>('industry');
  const [profile, setProfile] = useState<CompanyProfile>({
    industry: '',
    orgSize: '',
    location: '',
  });
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [followUpQuestions, setFollowUpQuestions] = useState<string[]>([]);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleProfileSelect = (value: string) => {
    if (step === 'industry') {
      setProfile((prev) => ({ ...prev, industry: value }));
      setStep('size');
    } else if (step === 'size') {
      setProfile((prev) => ({ ...prev, orgSize: value }));
      setStep('location');
    } else if (step === 'location') {
      setProfile((prev) => ({ ...prev, location: value }));
      setStep('chat');
      // Add welcome message
      setMessages([
        {
          role: 'assistant',
          content: `Welcome! I'm REIGNOS AI, your workforce intelligence assistant.\n\nI see you're in **${value}** running a **${profile.orgSize}** organization in **${profile.industry}**.\n\nI can help you with:\n• Identifying promotion-ready employees\n• Data-driven wage increase recommendations\n• Team optimization insights\n• Skills gap analysis\n\nWhat would you like to explore?`,
          timestamp: new Date(),
        },
      ]);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage: Message = {
      role: 'user',
      content: input,
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    const query = input;
    setInput('');
    setIsTyping(true);
    setFollowUpQuestions([]); // Clear old follow-ups while waiting for new response

    try {
      const response = await fetch('/api/ai-query', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: query,
          profile,
        }),
      });

      const data = await response.json();

      const aiResponse: Message = {
        role: 'assistant',
        content: data.response,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, aiResponse]);

      // Store follow-up questions if provided
      if (data.followUpQuestions && data.followUpQuestions.length > 0) {
        setFollowUpQuestions(data.followUpQuestions);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: 'Sorry, I encountered an error. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  const handlePromptClick = (prompt: string) => {
    setInput(prompt);
  };

  // Qualification step UI
  if (step !== 'chat') {
    return (
      <div className="flex flex-col h-[600px] bg-black/50 backdrop-blur-sm rounded-2xl border-2 border-purple-500/10 overflow-hidden shadow-xl shadow-black/70">
        {/* Header */}
        <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 border-b border-purple-500/10">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse bg-green-400"></div>
            <div>
              <h3 className="text-white font-light tracking-wide">
                REIGN<span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent font-medium">OS</span> AI
              </h3>
              <p className="text-purple-100 text-xs">Powered by Claude AI</p>
            </div>
          </div>
        </div>

        {/* Qualification Questions */}
        <div className="flex-1 flex flex-col items-center justify-center p-8">
          <div className="w-full max-w-md">
            {/* Progress indicator */}
            <div className="flex items-center justify-center gap-2 mb-8">
              {['industry', 'size', 'location'].map((s, i) => (
                <div
                  key={s}
                  className={`w-3 h-3 rounded-full transition-all ${
                    s === step
                      ? 'bg-purple-500 scale-125'
                      : ['industry', 'size', 'location'].indexOf(step) > i
                      ? 'bg-purple-500'
                      : 'bg-slate-600'
                  }`}
                />
              ))}
            </div>

            <h2 className="text-2xl font-bold text-white text-center mb-2">
              {step === 'industry' && "What's your industry?"}
              {step === 'size' && 'How large is your organization?'}
              {step === 'location' && 'Where are you located?'}
            </h2>
            <p className="text-gray-400 text-center mb-8 text-sm">
              {step === 'industry' && "We'll tailor insights to your sector"}
              {step === 'size' && "Helps us provide relevant benchmarks"}
              {step === 'location' && "For regional compliance and market context"}
            </p>

            <div className="grid gap-3">
              {step === 'industry' &&
                industries.map((ind) => (
                  <button
                    key={ind}
                    onClick={() => handleProfileSelect(ind)}
                    className="w-full px-4 py-3 bg-slate-800/50 hover:bg-purple-600/30 border border-slate-700 hover:border-purple-500/50 rounded-xl text-white text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {ind}
                  </button>
                ))}
              {step === 'size' &&
                orgSizes.map((size) => (
                  <button
                    key={size}
                    onClick={() => handleProfileSelect(size)}
                    className="w-full px-4 py-3 bg-slate-800/50 hover:bg-purple-600/30 border border-slate-700 hover:border-purple-500/50 rounded-xl text-white text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {size}
                  </button>
                ))}
              {step === 'location' &&
                locations.map((loc) => (
                  <button
                    key={loc}
                    onClick={() => handleProfileSelect(loc)}
                    className="w-full px-4 py-3 bg-slate-800/50 hover:bg-purple-600/30 border border-slate-700 hover:border-purple-500/50 rounded-xl text-white text-left transition-all hover:scale-[1.02] active:scale-[0.98]"
                  >
                    {loc}
                  </button>
                ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Chat UI
  return (
    <div className="flex flex-col h-[600px] bg-black/50 backdrop-blur-sm rounded-2xl border-2 border-purple-500/10 overflow-hidden shadow-xl shadow-black/70">
      {/* Chat Header */}
      <div className="bg-gradient-to-r from-purple-600 to-blue-600 p-4 border-b border-purple-500/10">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-3 h-3 rounded-full animate-pulse bg-green-400"></div>
            <div>
              <h3 className="text-white font-light tracking-wide">
                REIGN<span className="bg-gradient-to-r from-purple-200 to-blue-200 bg-clip-text text-transparent font-medium">OS</span> AI
              </h3>
              <p className="text-purple-100 text-xs">
                {profile.industry} • {profile.orgSize}
              </p>
            </div>
          </div>
          <button
            onClick={() => {
              setStep('industry');
              setProfile({ industry: '', orgSize: '', location: '' });
              setMessages([]);
              setFollowUpQuestions([]);
            }}
            className="text-xs text-purple-200 hover:text-white transition-colors"
          >
            Reset
          </button>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${message.role === 'user' ? 'justify-end' : 'justify-start'} animate-fade-in`}
          >
            <div
              className={`max-w-[80%] rounded-2xl px-4 py-3 ${
                message.role === 'user'
                  ? 'bg-gradient-to-r from-purple-600 to-blue-600 text-white'
                  : message.role === 'system'
                  ? 'bg-cyan-900/30 backdrop-blur-sm text-cyan-200 border border-cyan-500/30'
                  : 'bg-slate-700/50 backdrop-blur-sm text-gray-200 border border-slate-600/50'
              }`}
            >
              <p className="text-sm whitespace-pre-line leading-relaxed">{message.content}</p>
              <p className="text-xs opacity-60 mt-2">
                {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
              </p>
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-slate-700/50 backdrop-blur-sm text-gray-200 border border-slate-600/50 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-purple-400 rounded-full animate-bounce"></div>
                <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                <div className="w-2 h-2 bg-violet-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Suggested Prompts / Follow-up Questions */}
      {!isTyping && (
        <div className="px-6 pb-3">
          <p className="text-xs text-gray-400 mb-2">
            {messages.length <= 1 ? 'Try asking:' : 'Continue exploring:'}
          </p>
          <div className="flex flex-wrap gap-2">
            {(followUpQuestions.length > 0 ? followUpQuestions : demoPrompts).map((prompt, index) => (
              <button
                key={index}
                onClick={() => handlePromptClick(prompt)}
                className="text-xs px-3 py-1.5 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 rounded-full border border-purple-500/30 transition-all hover:scale-105"
              >
                {prompt}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Input */}
      <form onSubmit={handleSubmit} className="p-4 bg-slate-900/50 border-t border-slate-700/50">
        <div className="flex gap-2">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="Ask about promotions, skills, team performance..."
            className="flex-1 px-4 py-3 bg-slate-700/50 border border-slate-600/50 rounded-lg text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
          />
          <button
            type="submit"
            disabled={!input.trim() || isTyping}
            className="px-6 py-3 bg-gradient-to-r from-purple-600 to-blue-600 hover:from-purple-700 hover:to-blue-700 text-white rounded-lg font-semibold transition-all transform hover:scale-105 active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Send
          </button>
        </div>
      </form>
    </div>
  );
}

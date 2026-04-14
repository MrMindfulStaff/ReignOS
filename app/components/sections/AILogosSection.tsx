'use client';

import Section from '../Section';

const OpenAIIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg xmlns="http://www.w3.org/2000/svg" className={className} preserveAspectRatio="xMidYMid" viewBox="0 0 256 260">
    <path fill="currentColor" d="M239.184 106.203a64.716 64.716 0 0 0-5.576-53.103C219.452 28.459 191 15.784 163.213 21.74A65.586 65.586 0 0 0 52.096 45.22a64.716 64.716 0 0 0-43.23 31.36c-14.31 24.602-11.061 55.634 8.033 76.74a64.665 64.665 0 0 0 5.525 53.102c14.174 24.65 42.644 37.324 70.446 31.36a64.72 64.72 0 0 0 48.754 21.744c28.481.025 53.714-18.361 62.414-45.481a64.767 64.767 0 0 0 43.229-31.36c14.137-24.558 10.875-55.423-8.083-76.483Zm-97.56 136.338a48.397 48.397 0 0 1-31.105-11.255l1.535-.87 51.67-29.825a8.595 8.595 0 0 0 4.247-7.367v-72.85l21.845 12.636c.218.111.37.32.409.563v60.367c-.056 26.818-21.783 48.545-48.601 48.601Zm-104.466-44.61a48.345 48.345 0 0 1-5.781-32.589l1.534.921 51.722 29.826a8.339 8.339 0 0 0 8.441 0l63.181-36.425v25.221a.87.87 0 0 1-.358.665l-52.335 30.184c-23.257 13.398-52.97 5.431-66.404-17.803ZM23.549 85.38a48.499 48.499 0 0 1 25.58-21.333v61.39a8.288 8.288 0 0 0 4.195 7.316l62.874 36.272-21.845 12.636a.819.819 0 0 1-.767 0L41.353 151.53c-23.211-13.454-31.171-43.144-17.804-66.405v.256Zm179.466 41.695-63.08-36.63L161.73 77.86a.819.819 0 0 1 .768 0l52.233 30.184a48.6 48.6 0 0 1-7.316 87.635v-61.391a8.544 8.544 0 0 0-4.4-7.213Zm21.742-32.69-1.535-.922-51.619-30.081a8.39 8.39 0 0 0-8.492 0L99.98 99.808V74.587a.716.716 0 0 1 .307-.665l52.233-30.133a48.652 48.652 0 0 1 72.236 50.391v.205ZM88.061 139.097l-21.845-12.585a.87.87 0 0 1-.41-.614V65.685a48.652 48.652 0 0 1 79.757-37.346l-1.535.87-51.67 29.825a8.595 8.595 0 0 0-4.246 7.367l-.051 72.697Zm11.868-25.58 28.138-16.217 28.188 16.218v32.434l-28.086 16.218-28.188-16.218-.052-32.434Z"/>
  </svg>
);

const GrokIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 1024 1024" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M395.479 633.828L735.91 381.105C752.599 368.715 776.454 373.548 784.406 392.792C826.26 494.285 807.561 616.253 724.288 699.996C641.016 783.739 525.151 802.104 419.247 760.277L303.556 814.143C469.49 928.202 670.987 899.995 796.901 773.282C896.776 672.843 927.708 535.937 898.785 412.476L899.047 412.739C857.105 231.37 909.358 158.874 1016.4 10.6326C1018.93 7.11771 1021.47 3.60279 1024 0L883.144 141.651V141.212L395.392 633.916" fill="currentColor"/>
    <path d="M325.226 695.251C206.128 580.84 226.662 403.776 328.285 301.668C403.431 226.097 526.549 195.254 634.026 240.596L749.454 186.994C728.657 171.88 702.007 155.623 671.424 144.2C533.19 86.9942 367.693 115.465 255.323 228.382C147.234 337.081 113.244 504.215 171.613 646.833C215.216 753.423 143.739 828.818 71.7385 904.916C46.2237 931.893 20.6216 958.87 0 987.429L325.139 695.339" fill="currentColor"/>
  </svg>
);

const ClaudeIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="24" height="24" rx="4" fill="#CC9B7A"/>
    <path d="M8 17L12 7L16 17" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M9.5 13H14.5" stroke="white" strokeWidth="2" strokeLinecap="round"/>
  </svg>
);

const GeminiIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="12" cy="12" r="10" fill="url(#gemini-gradient)"/>
    <path d="M7 12L10 15L17 8" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    <defs>
      <linearGradient id="gemini-gradient" x1="0" y1="0" x2="24" y2="24">
        <stop offset="0%" stopColor="#4285F4"/>
        <stop offset="100%" stopColor="#EA4335"/>
      </linearGradient>
    </defs>
  </svg>
);

const MetaAIIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M12 2L2 7L12 12L22 7L12 2Z" fill="url(#meta-gradient)"/>
    <path d="M2 17L12 22L22 17V7L12 12L2 7V17Z" fill="url(#meta-gradient)" opacity="0.7"/>
    <defs>
      <linearGradient id="meta-gradient" x1="2" y1="2" x2="22" y2="22">
        <stop offset="0%" stopColor="#0081FB"/>
        <stop offset="100%" stopColor="#0064E0"/>
      </linearGradient>
    </defs>
  </svg>
);

const MistralIcon: React.FC<{ className?: string }> = ({ className = "w-16 h-16" }) => (
  <svg className={className} viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <rect width="8" height="8" x="2" y="2" fill="#F2A73B" rx="1"/>
    <rect width="8" height="8" x="14" y="2" fill="#F2A73B" rx="1"/>
    <rect width="8" height="8" x="2" y="14" fill="#F2A73B" rx="1"/>
    <rect width="8" height="8" x="14" y="14" fill="#F2A73B" rx="1"/>
  </svg>
);

export default function AILogosSection() {
  const aiProviders = [
    { name: 'ChatGPT', Icon: OpenAIIcon },
    { name: 'Claude', Icon: ClaudeIcon },
    { name: 'Grok', Icon: GrokIcon },
    { name: 'Gemini', Icon: GeminiIcon },
    { name: 'Meta AI', Icon: MetaAIIcon },
    { name: 'Mistral', Icon: MistralIcon },
  ];

  return (
    <Section 
      className="py-24 border-y border-white/10"
      background={{
        gradient: 'bg-slate-950',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 bg-gradient-to-r from-purple-400 via-blue-400 to-cyan-400 bg-clip-text text-transparent">
            Powered by Leading AI Models
          </h2>
          <p className="text-xl text-gray-400 max-w-3xl mx-auto">
            R.E.I.G.N. integrates with the world's most advanced AI systems to deliver unparalleled insights
          </p>
        </div>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-8 md:gap-12">
          {aiProviders.map(({ name, Icon }) => (
            <div
              key={name}
              className="flex flex-col items-center justify-center gap-4 p-6 rounded-xl bg-slate-900/50 border border-white/5 hover:border-purple-500/30 hover:bg-slate-900/80 transition-all duration-300 group"
            >
              <Icon className="w-16 h-16 text-gray-400 group-hover:text-white transition-colors duration-300" />
              <span className="text-sm font-medium text-gray-400 group-hover:text-white transition-colors duration-300">
                {name}
              </span>
            </div>
          ))}
        </div>

        <div className="mt-16 text-center">
          <p className="text-gray-500 text-sm">
            Choose your preferred AI model or let R.E.I.G.N. automatically select the best one for your task
          </p>
        </div>
      </div>
    </Section>
  );
}


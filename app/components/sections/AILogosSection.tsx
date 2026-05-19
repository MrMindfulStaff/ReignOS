import Section from '../Section';

export default function AILogosSection() {
  return (
    <Section
      className="py-24 border-y border-white/10"
      background={{
        gradient: 'bg-slate-950',
      }}
    >
      <div className="max-w-7xl mx-auto px-6">
        <img
          src="/reign-integrations.png"
          alt="Connect. Integrate. Elevate. — R.E.I.G.N. AI's MCP server architecture connects with leading payroll, AI, and project management platforms"
          className="w-full h-auto rounded-2xl"
        />
      </div>
    </Section>
  );
}

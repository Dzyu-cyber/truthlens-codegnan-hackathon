// components/dashboard/ForensicPipelineLog.tsx — A gorgeous terminal-style OSINT pipeline logger with typing animations

'use client';

import { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const logSequences = [
  { text: 'SYSTEM: Initializing TruthLens Forensic Ingestion Core...', type: 'sys' },
  { text: 'CRYPTO: Hashing file binary stream... Calculated SHA-256 fingerprint.', type: 'crypto' },
  { text: 'OSINT: Spawning 4 autonomous crawlers across Tavily Search indexes...', type: 'osint' },
  { text: 'CRAWLER: Connected to PIB, AltNews, and regional debunk databases.', type: 'osint' },
  { text: 'RAG: Scraping verified news consensus matrix and parsing HTML bodies...', type: 'rag' },
  { text: 'RAG: Splicing textual chunks; computing semantic cosine distance.', type: 'rag' },
  { text: 'COGNITIVE: Running natural language model for cognitive framing & bias detection...', type: 'cognitive' },
  { text: 'COGNITIVE: Exposing fear amplification variables and urgency loops.', type: 'cognitive' },
  { text: 'FORENSICS: Splicing checks complete. Compiling final JSON manifest...', type: 'sys' },
  { text: 'SYSTEM: Report compiled successfully. Launching Intelligence Dashboard.', type: 'sys' }
];

export default function ForensicPipelineLog() {
  const [logs, setLogs] = useState<typeof logSequences>([]);
  const [currentIdx, setCurrentIdx] = useState(0);
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (currentIdx >= logSequences.length) return;

    const delay = 800 + Math.random() * 800; // Realistic random timing between logs
    const timer = setTimeout(() => {
      setLogs((prev) => [...prev, logSequences[currentIdx]]);
      setCurrentIdx((prev) => prev + 1);
    }, delay);

    return () => clearTimeout(timer);
  }, [currentIdx]);

  useEffect(() => {
    if (containerRef.current) {
      containerRef.current.scrollTop = containerRef.current.scrollHeight;
    }
  }, [logs]);

  const getColorClass = (type: string) => {
    switch (type) {
      case 'sys': return 'text-primary-container font-black';
      case 'crypto': return 'text-secondary font-bold';
      case 'osint': return 'text-[#00ff88]';
      case 'rag': return 'text-tertiary-fixed-dim';
      case 'cognitive': return 'text-error-container';
      default: return 'text-on-surface-variant';
    }
  };

  return (
    <div className="glass-panel p-6 rounded-3xl border border-outline-variant/30 bg-surface-container-lowest/90 backdrop-blur-xl max-w-2xl mx-auto mt-6 shadow-[0_0_50px_rgba(0,255,136,0.08)]">
      {/* Terminal Title Bar */}
      <div className="flex items-center justify-between border-b border-outline-variant/20 pb-3 mb-4">
        <div className="flex items-center gap-2">
          <span className="w-3 h-3 rounded-full bg-red-500/80" />
          <span className="w-3 h-3 rounded-full bg-yellow-500/80" />
          <span className="w-3 h-3 rounded-full bg-green-500/80" />
        </div>
        <div className="text-[10px] font-mono tracking-widest text-on-surface-variant/60 uppercase select-none">
          OSINT_FORENSICS_TERMINAL_LOGS v2.5
        </div>
      </div>

      {/* Terminal Content Panel */}
      <div 
        ref={containerRef}
        className="h-60 overflow-y-auto font-mono text-[12px] leading-relaxed space-y-2 p-2 rounded-2xl bg-black/40 border border-outline-variant/10 scrollbar-thin scrollbar-thumb-outline-variant"
      >
        {logs.map((log, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.2 }}
            className="flex items-start gap-2"
          >
            <span className="text-on-surface-variant/40 select-none">[{new Date().toLocaleTimeString()}]</span>
            <span className={getColorClass(log.type)}>
              {log.text}
            </span>
          </motion.div>
        ))}

        {currentIdx < logSequences.length && (
          <div className="flex items-center gap-1 text-primary-container/80 pl-2">
            <span className="w-2 h-4 bg-primary-container animate-[pulse_0.8s_infinite]" />
            <span className="text-[11px] italic tracking-wider">Injecting pipeline packets...</span>
          </div>
        )}
      </div>
    </div>
  );
}

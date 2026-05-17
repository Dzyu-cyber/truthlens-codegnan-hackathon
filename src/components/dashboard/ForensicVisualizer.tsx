// components/dashboard/ForensicVisualizer.tsx — High-tech, futuristic forensic visualizer mapping media splicing heatmaps and live bot network propagation trees.

'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';

export default function ForensicVisualizer() {
  const [activeTab, setActiveTab] = useState<'splicing' | 'network'>('splicing');

  // Realistic mucked bot network nodes
  const botNodes = [
    { name: '@truth_teller_99', type: 'bot', probability: '94%', delay: '0.2s', status: 'Amplifying' },
    { name: '@daily_news_loop', type: 'bot', probability: '89%', delay: '0.8s', status: 'Amplifying' },
    { name: '@ind_viral_wave', type: 'bot', probability: '82%', delay: '1.4s', status: 'Amplifying' },
    { name: 'Anonymous User node 4', type: 'human', probability: '12%', delay: '2.0s', status: 'Stance: Neutral' },
  ];

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="glass-panel rounded-3xl p-6 md:p-8 border border-outline-variant/20 bg-surface-container-lowest/40 backdrop-blur-md relative overflow-hidden"
    >
      {/* Glow Effects */}
      <div className="absolute top-0 right-0 w-32 h-32 bg-primary-container/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 border-b border-outline-variant/10 pb-6 mb-6">
        <div>
          <div className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30 mb-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
            <span className="text-[9px] font-mono tracking-widest text-on-surface-variant uppercase font-bold">
              Visual Intelligence deck
            </span>
          </div>
          <h2 className="text-[20px] font-black text-on-surface font-heading tracking-tight uppercase">
            OSINT Tactical Forensics
          </h2>
        </div>

        {/* Tab Toggle buttons */}
        <div className="flex bg-surface-container-low p-1 rounded-full border border-outline-variant/20">
          <button
            onClick={() => setActiveTab('splicing')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'splicing'
                ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Splicing Heatmap
          </button>
          <button
            onClick={() => setActiveTab('network')}
            className={`px-4 py-1.5 rounded-full text-[10px] font-bold uppercase tracking-wider transition-all cursor-pointer ${
              activeTab === 'network'
                ? 'bg-primary-container text-on-primary-container shadow-[0_0_15px_rgba(0,255,136,0.3)]'
                : 'text-on-surface-variant hover:text-on-surface'
            }`}
          >
            Bot Propagation
          </button>
        </div>
      </div>

      {/* Content Panels */}
      {activeTab === 'splicing' ? (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Splicing Heatmap (Holographic Matrix Grid) */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-video rounded-2xl bg-black/60 border border-outline-variant/30 overflow-hidden flex items-center justify-center">
              {/* Pulsing Grid Backdrop */}
              <div className="absolute inset-0 grid grid-cols-8 grid-rows-4 gap-0.5 opacity-30 select-none pointer-events-none">
                {Array.from({ length: 32 }).map((_, idx) => (
                  <div key={idx} className="border border-outline-variant/20 bg-surface-container-lowest/10" />
                ))}
              </div>

              {/* Scanning Laser Line */}
              <motion.div
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute left-0 w-full h-[1.5px] bg-primary-container/80 shadow-[0_0_12px_rgba(0,255,136,0.8)] z-10"
              />

              {/* Heatmap Target Box 1 */}
              <motion.div
                animate={{ scale: [1, 1.05, 1], opacity: [0.6, 0.9, 0.6] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute top-10 left-16 w-14 h-14 border border-error bg-error/15 rounded flex items-center justify-center"
              >
                <div className="w-1.5 h-1.5 bg-error rounded-full animate-ping" />
                <span className="absolute -bottom-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-error font-bold tracking-widest whitespace-nowrap bg-black/80 px-1 py-0.5 border border-error/20 rounded">
                  ANOMALY_92A
                </span>
              </motion.div>

              {/* Heatmap Target Box 2 */}
              <motion.div
                animate={{ scale: [1, 1.08, 1], opacity: [0.5, 0.8, 0.5] }}
                transition={{ duration: 2.5, repeat: Infinity, delay: 0.5 }}
                className="absolute bottom-8 right-20 w-16 h-10 border border-[#00ff88] bg-[#00ff88]/10 rounded flex items-center justify-center"
              >
                <span className="absolute -top-5 left-1/2 -translate-x-1/2 text-[8px] font-mono text-[#00ff88] font-bold tracking-widest whitespace-nowrap bg-black/80 px-1 py-0.5 border border-[#00ff88]/20 rounded">
                  METADATA_OK
                </span>
              </motion.div>

              {/* Icon Overlay */}
              <span className="material-symbols-outlined text-[48px] text-primary-container/20 select-none">
                wallpaper
              </span>
            </div>
          </div>

          {/* Splicing Metadata Specs */}
          <div className="lg:col-span-5 space-y-4 font-mono text-[12px]">
            <div className="bg-surface-container-lowest/30 p-4 rounded-2xl border border-outline-variant/10">
              <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/60">Digital Splice Signature</span>
              <p className="text-[13px] text-on-surface font-bold mt-1">Luminance Gradient Mismatch</p>
              <p className="text-[11px] text-on-surface-variant/80 mt-1 leading-relaxed">
                Localized pixels at coordinates `[x:62, y:40]` display compression artifacts inconsistent with the camera sensor noise model. Suggests localized digital insertion.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="bg-surface-container-lowest/30 p-3 rounded-2xl border border-outline-variant/10">
                <span className="text-[8px] uppercase tracking-widest text-on-surface-variant/60">Double-Comp</span>
                <p className="text-[13px] text-error font-black mt-0.5">Flagged</p>
              </div>
              <div className="bg-surface-container-lowest/30 p-3 rounded-2xl border border-outline-variant/10">
                <span className="text-[8px] uppercase tracking-widest text-on-surface-variant/60">AI Gen Probability</span>
                <p className="text-[13px] text-primary-container font-black mt-0.5">87.4%</p>
              </div>
            </div>
          </div>
        </div>
      ) : (
        /* Network Propagation Map (Holographic Tree list representation) */
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          
          {/* Graphical Representation */}
          <div className="lg:col-span-7 flex justify-center">
            <div className="relative w-full max-w-[380px] aspect-video rounded-2xl bg-black/60 border border-outline-variant/30 overflow-hidden flex items-center justify-center p-6">
              
              {/* Intersecting SVG node paths */}
              <svg className="absolute inset-0 w-full h-full text-primary-container/20" viewBox="0 0 200 100">
                <path d="M 30 50 L 80 25 M 30 50 L 80 50 M 30 50 L 80 75 M 80 25 L 140 15 M 80 50 L 140 50 M 80 75 L 140 85" stroke="currentColor" strokeWidth="2" strokeDasharray="3 3" />
                {/* Central Root Node */}
                <circle cx="30" cy="50" r="10" fill="#00ff88" className="animate-pulse" />
                {/* Secondary Nodes */}
                <circle cx="80" cy="25" r="7" fill="#ff4d4d" />
                <circle cx="80" cy="50" r="7" fill="#ff4d4d" />
                <circle cx="80" cy="75" r="7" fill="#ff4d4d" />
                {/* Outer Spans */}
                <circle cx="140" cy="15" r="5" fill="#ff4d4d" />
                <circle cx="140" cy="50" r="5" fill="#555555" />
                <circle cx="140" cy="85" r="5" fill="#ff4d4d" />
              </svg>
              
              <div className="relative z-10 flex flex-col items-center">
                <span className="material-symbols-outlined text-[36px] text-primary-container mb-2">hub</span>
                <span className="text-[10px] font-mono text-on-surface-variant uppercase tracking-widest bg-black/80 px-2 py-0.5 border border-outline-variant/30 rounded">
                  Coordinated Bot Network Detected
                </span>
              </div>

            </div>
          </div>

          {/* Node Status Tables */}
          <div className="lg:col-span-5 space-y-3 font-mono text-[11px]">
            <span className="text-[9px] uppercase tracking-widest text-on-surface-variant/60 block mb-1">
              Top Amplification Clusters
            </span>
            <div className="space-y-2 max-h-[180px] overflow-y-auto pr-1">
              {botNodes.map((node, i) => (
                <div 
                  key={i} 
                  className={`flex justify-between items-center p-2 rounded-xl border ${
                    node.type === 'bot' 
                      ? 'bg-error/5 border-error/20 text-error' 
                      : 'bg-surface-container-lowest/30 border-outline-variant/10 text-on-surface'
                  }`}
                >
                  <div className="flex items-center gap-2">
                    <span className="material-symbols-outlined text-[14px]">
                      {node.type === 'bot' ? 'robot_2' : 'person'}
                    </span>
                    <span className="font-bold">{node.name}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-[9px] tracking-widest uppercase opacity-75">{node.status}</span>
                    {node.type === 'bot' && (
                      <span className="font-black px-1.5 py-0.5 bg-error text-white text-[8px] rounded">
                        {node.probability} BOT
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>

        </div>
      )}
    </motion.div>
  );
}

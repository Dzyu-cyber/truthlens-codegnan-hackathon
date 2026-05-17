// components/dashboard/AboutSection.tsx — Beautiful OSINT forensic capabilities grid with green neon aesthetic

'use client';

import { motion } from 'framer-motion';

const features = [
  {
    icon: 'center_focus_weak',
    title: 'Multimodal Visual Forensics',
    desc: 'Examines image noise patterns, compression levels, metadata consistency, and digital splicing indicators to flag Deepfakes and synthesized creations.'
  },
  {
    icon: 'psychology',
    title: 'Cognitive Manipulation Check',
    desc: 'Identifies fear amplification, emotional framing biases, urgency loops, and propaganda heuristics mathematically coded within the content context.'
  },
  {
    icon: 'travel_explore',
    title: 'Semantic RAG Verification',
    desc: 'Autonomously queries premium databases, maps fact-checking consensus matrices, and scrapes direct evidence vectors to isolate truth from noise.'
  },
  {
    icon: 'timeline',
    title: 'Viral Amplification Analysis',
    desc: 'Tracks origin uploads, modification milestones, spread velocity and bot networking clusters to forecast narrative risks across networks.'
  }
];

export default function AboutSection() {
  return (
    <section id="about" className="py-20 px-4 max-w-5xl mx-auto">
      {/* ── Title ── */}
      <div className="text-center mb-16 relative">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="inline-flex items-center gap-2 bg-surface-container px-3 py-1 rounded-full border border-outline-variant/30 mb-4"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
          <span className="text-[10px] font-bold tracking-[0.12em] uppercase text-on-surface-variant">
            Technical Framework
          </span>
        </motion.div>
        <h2 className="text-[32px] md:text-[40px] leading-[48px] font-black text-on-surface font-heading tracking-tight">
          How TruthLens <span className="text-primary-container">Exposes Deception</span>
        </h2>
        <p className="text-[14px] md:text-[15px] leading-relaxed text-on-surface-variant max-w-xl mx-auto mt-3">
          Our underlying engine operates as a full-suite digital forensics intelligence deck, merging real-time OSINT scanning with semantic models.
        </p>
      </div>

      {/* ── Grid ── */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.1, ease: 'easeOut' }}
            whileHover={{ y: -6 }}
            className="relative group overflow-hidden rounded-3xl"
          >
            {/* Neon Border Glow */}
            <div className="absolute inset-0 bg-gradient-to-br from-primary-container/20 to-transparent rounded-3xl opacity-0 group-hover:opacity-100 transition-all duration-300 blur-sm pointer-events-none" />
            
            <div className="relative glass-panel p-8 rounded-3xl border border-outline-variant/20 group-hover:border-primary-container/40 transition-all duration-300 bg-surface-container-lowest/40 backdrop-blur-md h-full flex flex-col justify-between">
              <div>
                {/* Icon Container */}
                <div className="w-12 h-12 rounded-2xl bg-surface-container-high flex items-center justify-center border border-outline-variant/30 group-hover:scale-110 group-hover:rotate-3 transition-transform duration-300 shadow-[0_0_20px_rgba(0,255,136,0.05)] group-hover:shadow-primary-container/20 mb-6">
                  <span className="material-symbols-outlined text-[24px] text-primary-container">{feature.icon}</span>
                </div>
                
                <h3 className="text-[18px] md:text-[20px] font-bold text-on-surface mb-3 group-hover:text-primary-container transition-colors">
                  {feature.title}
                </h3>
                <p className="text-[13px] md:text-[14px] leading-relaxed text-on-surface-variant">
                  {feature.desc}
                </p>
              </div>

              {/* Decorative Tag */}
              <div className="mt-8 flex items-center justify-between border-t border-outline-variant/10 pt-4 opacity-50 group-hover:opacity-100 transition-opacity">
                <span className="text-[10px] font-mono tracking-widest text-on-surface-variant uppercase">DECK_MOD_{i + 1}</span>
                <span className="material-symbols-outlined text-[14px] text-primary-container">arrow_forward</span>
              </div>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}

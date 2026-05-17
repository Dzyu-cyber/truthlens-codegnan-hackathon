// app/page.tsx — High-tech fact-checking landing page with floating oval Navbar, orbital hero, About/Pricing, and OSINT terminal logs during loading and cryptographic file metadata extraction in report dashboard.

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useAnalysis } from '@/hooks/useAnalysis';
import Navbar from '@/components/ui/Navbar';
import AboutSection from '@/components/dashboard/AboutSection';
import PricingSection from '@/components/dashboard/PricingSection';
import UniversalInputBox from '@/components/dashboard/UniversalInputBox';
import VerdictBanner from '@/components/dashboard/VerdictBanner';
import SourceCards from '@/components/dashboard/SourceCards';
import CredibilityGauge from '@/components/dashboard/CredibilityGauge';
import KeyClaims from '@/components/dashboard/KeyClaims';
import RedFlags from '@/components/dashboard/RedFlags';
import EvidenceBreakdown from '@/components/dashboard/EvidenceBreakdown';
import Conclusion from '@/components/dashboard/Conclusion';
import PriyaPanel from '@/components/journalist/PriyaPanel';
import RealityMetrics from '@/components/dashboard/RealityMetrics';
import TruthTimeline from '@/components/dashboard/TruthTimeline';
import ManipulationRadar from '@/components/dashboard/ManipulationRadar';
import ForensicPipelineLog from '@/components/dashboard/ForensicPipelineLog';
import ForensicMetadata from '@/components/dashboard/ForensicMetadata';

export default function DashboardPage() {
  const { analysis, isLoading, error, analyze, reset } = useAnalysis();
  const [activeSection, setActiveSection] = useState('verify');

  const handleScrollTo = (sectionId: string) => {
    setActiveSection(sectionId);
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth', block: 'start' });
    }
  };

  // Listen to scrolling to update active navbar links
  useEffect(() => {
    if (analysis) return; // Navbar states differ in analysis mode

    const handleScroll = () => {
      const scrollPos = window.scrollY + 200;
      const verifySec = document.getElementById('verify');
      const aboutSec = document.getElementById('about');
      const pricingSec = document.getElementById('pricing');

      if (pricingSec && scrollPos >= pricingSec.offsetTop) {
        setActiveSection('pricing');
      } else if (aboutSec && scrollPos >= aboutSec.offsetTop) {
        setActiveSection('about');
      } else if (verifySec) {
        setActiveSection('verify');
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [analysis]);

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-surface-container-lowest">
        <div className="glass-panel rounded-3xl p-8 max-w-md text-center border border-error-container/30">
          <span className="material-symbols-outlined text-[48px] text-error mb-4 block">error</span>
          <h2 className="text-[20px] leading-[28px] font-bold text-on-surface mb-2">Analysis Failed</h2>
          <p className="text-[14px] leading-[20px] text-on-surface-variant mb-6">{error}</p>
          <button
            onClick={reset}
            className="px-6 py-3 bg-error-container text-on-error-container font-semibold rounded-2xl hover:opacity-90 transition-opacity"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-surface-container-lowest overflow-x-hidden relative selection:bg-primary-container selection:text-on-primary-container">
      {/* ── Background Mesh Glows ── */}
      <div className="absolute top-0 left-0 w-full h-full pointer-events-none overflow-hidden z-0">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.15, 0.25, 0.15],
          }}
          transition={{ duration: 10, repeat: Infinity, ease: 'linear' }}
          className="absolute -top-[10%] -left-[10%] w-[50%] h-[50%] bg-primary-container/20 rounded-full blur-[120px]"
        />
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{ duration: 8, repeat: Infinity, ease: 'linear', delay: 2 }}
          className="absolute top-[40%] -right-[10%] w-[40%] h-[40%] bg-primary-container/10 rounded-full blur-[100px]"
        />
      </div>

      {/* ── Floating Navbar ── */}
      <Navbar
        hasAnalysis={!!analysis}
        onNewAnalysis={reset}
        onScrollTo={handleScrollTo}
        activeSection={activeSection}
      />

      {/* ── Main Content Area ── */}
      <main className="flex-1 w-full flex flex-col relative z-10 pt-28">
        
        {/* ── LANDING VIEW (No Active Analysis) ── */}
        {!analysis ? (
          <div className="w-full">
            {/* Hero / Verification Intake Section */}
            <section id="verify" className="max-w-5xl mx-auto px-4 pt-8 pb-16">
              {isLoading ? (
                /* Dynamic Cyberpunk Terminal Loader Log Screen */
                <div className="space-y-6 text-center pt-8">
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
                    className="w-16 h-16 border-t-2 border-primary-container border-r-2 border-transparent rounded-full mx-auto"
                  />
                  <div className="space-y-1">
                    <h2 className="text-[20px] font-black text-on-surface font-heading tracking-tight uppercase">
                      Running OSINT Forensics Protocol
                    </h2>
                    <p className="text-[12px] text-on-surface-variant/80 font-mono tracking-wider">
                      Orchestrating computational pipelines in parallel...
                    </p>
                  </div>
                  <ForensicPipelineLog />
                </div>
              ) : (
                <>
                  <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center mb-12">
                    {/* Left Column: Copywriting */}
                    <div className="lg:col-span-7 text-left space-y-6">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-primary-container/20 bg-primary-container/5 text-primary-container text-[10px] font-bold tracking-widest uppercase backdrop-blur-md"
                      >
                        <span className="w-1.5 h-1.5 rounded-full bg-primary-container animate-pulse" />
                        Cognitive Forensic OSINT // V2.5
                      </motion.div>
                      
                      <div className="space-y-2">
                        <h1 className="text-[42px] sm:text-[60px] leading-[1.05] font-black text-on-surface font-heading tracking-tight">
                          Verify Reality. <br />
                          <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary-container via-white to-primary-container drop-shadow-[0_0_15px_rgba(0,255,136,0.1)]">
                            Expose Splicing.
                          </span>
                        </h1>
                        <div className="w-20 h-1 bg-gradient-to-r from-primary-container to-transparent rounded-full" />
                      </div>

                      <p className="text-[14px] md:text-[16px] leading-relaxed text-on-surface-variant max-w-lg font-light pl-4 border-l border-outline-variant/30">
                        TruthLens acts as an autonomous digital forensics engine. Ingest claims, analyze deepfakes, inspect metadata, and extract contextual truth metrics instantly.
                      </p>

                      {/* Impact Stats */}
                      <div className="flex items-center gap-12 pt-4">
                        {[
                          { label: 'Verifications', value: '140K+' },
                          { label: 'Deepfake Accuracy', value: '99.4%' },
                          { label: 'Analysis Time', value: '< 10s' }
                        ].map((stat, idx) => (
                          <div key={idx} className="group cursor-default">
                            <div className="text-[24px] sm:text-[30px] font-black text-on-surface group-hover:text-primary-container transition-colors tracking-tight">
                              {stat.value}
                            </div>
                            <div className="text-[9px] uppercase tracking-[0.15em] text-on-surface-variant font-bold mt-0.5">
                              {stat.label}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Right Column: Dynamic Spinning Holographic Mascot Orbit */}
                    <motion.div
                      initial={{ opacity: 0, scale: 0.8 }}
                      animate={{ opacity: 1, scale: 1 }}
                      transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
                      className="lg:col-span-5 flex items-center justify-center relative h-64 lg:h-80"
                    >
                      <div className="absolute inset-0 bg-primary-container/20 rounded-full blur-[80px] animate-pulse" />
                      <div className="absolute inset-0 bg-surface-container-high/30 rounded-full blur-[40px] animate-pulse" style={{ animationDelay: '1.5s' }} />
                      
                      {/* Floating Central Core (The Lens Radar) */}
                      <motion.div
                        animate={{
                          y: [0, -12, 0],
                          rotate: [0, 2, 0, -2, 0]
                        }}
                        transition={{
                          duration: 5,
                          repeat: Infinity,
                          ease: 'easeInOut'
                        }}
                        className="relative w-44 h-44 flex items-center justify-center"
                      >
                        {/* Ring 1 */}
                        <div className="absolute inset-0 border border-primary-container/30 rounded-full animate-[spin_15s_linear_infinite]" />
                        {/* Ring 2 */}
                        <div className="absolute inset-4 border border-outline-variant/40 rounded-full animate-[spin_20s_linear_infinite]" style={{ animationDirection: 'reverse' }} />
                        {/* Ring 3 */}
                        <div className="absolute inset-8 border border-primary-container/10 rounded-full animate-[spin_30s_linear_infinite]" />
                        
                        {/* Inner core radar sweep */}
                        <div className="absolute inset-10 rounded-full border border-primary-container/40 overflow-hidden">
                          <div className="w-full h-full bg-gradient-to-tr from-primary-container/10 to-transparent animate-pulse" />
                        </div>
                        
                        {/* Central Glowing Shield Icon */}
                        <div className="relative z-10 w-16 h-16 rounded-full bg-surface-container-highest border border-primary-container/50 flex items-center justify-center shadow-[0_0_30px_rgba(0,255,136,0.3)]">
                          <span className="material-symbols-outlined text-[36px] text-primary-container animate-pulse">fingerprint</span>
                        </div>

                        {/* Nodes on rings */}
                        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-primary-container shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                        <div className="absolute bottom-4 left-4 w-1.5 h-1.5 rounded-full bg-primary-container/60 shadow-[0_0_6px_rgba(0,255,136,0.6)]" />
                        <div className="absolute right-4 top-10 w-2 h-2 rounded-full bg-[#00ff88] shadow-[0_0_8px_rgba(0,255,136,0.8)]" />
                        
                        {/* Laser scanning beam */}
                        <motion.div
                          animate={{ top: ['5%', '95%', '5%'] }}
                          transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut' }}
                          className="absolute left-1/2 -translate-x-1/2 w-[115%] h-[1.5px] bg-gradient-to-r from-transparent via-primary-container to-transparent z-20 shadow-[0_0_10px_rgba(0,255,136,0.6)]"
                        />
                      </motion.div>
                    </motion.div>
                  </div>

                  {/* Ingestion Console Box */}
                  <UniversalInputBox onAnalyze={analyze} isLoading={isLoading} />
                </>
              )}
            </section>

            {/* About Capabilities Grid Section */}
            <AboutSection />

            {/* Pricing Section */}
            <PricingSection />
          </div>
        ) : (
          
          // ── ANALYSIS REPORT VIEW (Dashboard Mode) ──
          <div id="verdict-top" className="max-w-[1200px] w-full mx-auto px-4 md:px-8 space-y-8 pb-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            {/* Hero Verdict Banner */}
            <VerdictBanner analysis={analysis} />

            {/* 3 Column Layout: Sources + Gauge/Flags */}
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              <SourceCards sources={analysis.sources} />

              <div className="space-y-6">
                <CredibilityGauge score={analysis.overallCredibilityScore} />
                <RealityMetrics scores={analysis.realityScores} />
                
                {/* Structural/Cryptographic Manifest inspector */}
                <ForensicMetadata 
                  claimText={analysis.originalClaim} 
                  mediaType={analysis.sources[0]?.sourceUrl ? 'application/octet-stream' : 'text/plain'} 
                />

                <RedFlags flags={analysis.redFlags} bias={analysis.biasAnalysis} />
                <ManipulationRadar tactics={analysis.biasAnalysis?.psychologicalTactics} />
              </div>
            </div>

            {/* Evidence Breakdown */}
            {analysis.evidenceStructure && (
              <EvidenceBreakdown evidence={analysis.evidenceStructure} />
            )}

            {/* Key Claims */}
            <KeyClaims claims={analysis.keyClaims} />

            {/* Truth Timeline */}
            {analysis.truthTimeline && analysis.truthTimeline.length > 0 && (
              <TruthTimeline events={analysis.truthTimeline} />
            )}

            {/* Conclusion */}
            <Conclusion conclusion={analysis.conclusion} />

            {/* Priya Chat Panel Inline */}
            <div id="priya-panel">
              <PriyaPanel analysis={analysis} />
            </div>
          </div>
        )}
      </main>

      {/* ── Sleek Professional Footer ── */}
      <footer className="w-full border-t border-outline-variant/10 bg-surface-container-lowest/60 backdrop-blur-md py-12 px-6 z-10 relative">
        <div className="max-w-5xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
          <div>
            <div className="flex items-center gap-3 mb-3">
              <div className="w-6 h-6 text-primary-container">
                <svg viewBox="0 0 100 100" fill="none" className="w-full h-full">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="10" strokeDasharray="30 15" />
                  <circle cx="50" cy="50" r="15" fill="currentColor" />
                </svg>
              </div>
              <span className="text-[16px] font-black text-on-surface">TruthLens</span>
            </div>
            <p className="text-[12px] text-on-surface-variant max-w-sm">
              Empowering digital environments with computational forensics and deep trust metrics to verify online media credibility.
            </p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[12px] text-on-surface-variant font-medium">Privacy</span>
            <span className="text-[12px] text-on-surface-variant font-medium">Terms of Use</span>
            <span className="text-[12px] text-on-surface-variant font-medium">OSINT API</span>
          </div>

          <div className="text-[11px] text-on-surface-variant/50 font-mono">
            &copy; {new Date().getFullYear()} TRUTHLENS INC. ALL RIGHTS RESERVED.
          </div>
        </div>
      </footer>
    </div>
  );
}

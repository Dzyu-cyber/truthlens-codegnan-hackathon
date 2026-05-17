// app/page.tsx — Main dashboard page composing all sections

'use client';

import { useAnalysis } from '@/hooks/useAnalysis';
import VerdictBanner from '@/components/dashboard/VerdictBanner';
import SourceCards from '@/components/dashboard/SourceCards';
import CredibilityGauge from '@/components/dashboard/CredibilityGauge';
import KeyClaims from '@/components/dashboard/KeyClaims';
import RedFlags from '@/components/dashboard/RedFlags';
import UniversalInputBox from '@/components/dashboard/UniversalInputBox';
import EvidenceBreakdown from '@/components/dashboard/EvidenceBreakdown';
import Conclusion from '@/components/dashboard/Conclusion';
import PriyaPanel from '@/components/journalist/PriyaPanel';
import RealityMetrics from '@/components/dashboard/RealityMetrics';
import TruthTimeline from '@/components/dashboard/TruthTimeline';
import ManipulationRadar from '@/components/dashboard/ManipulationRadar';
import LanguageSwitcher from '@/components/ui/LanguageSwitcher';

export default function DashboardPage() {
  const { analysis, isLoading, error, analyze, reset } = useAnalysis();

  if (error) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="glass-panel rounded-xl p-8 max-w-md text-center">
          <span className="material-symbols-outlined text-[48px] text-error mb-4 block">error</span>
          <h2 className="text-[20px] leading-[28px] font-semibold text-on-surface mb-2">Analysis Failed</h2>
          <p className="text-[14px] leading-[20px] text-on-surface-variant">{error}</p>
          <button onClick={reset} className="mt-4 px-4 py-2 bg-surface-bright text-on-surface rounded-lg">Try Again</button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen items-center">
      {/* ── Main Content ── */}
      <main className="flex-1 w-full max-w-[1200px] flex flex-col relative pb-12">
        {/* Top App Bar */}
        <header className="flex justify-between items-center w-full px-4 md:px-8 h-16 sticky top-0 z-40 bg-surface/80 backdrop-blur-xl border-b border-outline-variant/20">
          <div className="flex items-center gap-4">
            <h2 className="text-[20px] leading-[28px] font-bold text-primary tracking-wide">
              TruthLens
            </h2>
            <div className="hidden md:flex items-center gap-2 border-l border-outline-variant/30 pl-4 ml-2">
              <span className="material-symbols-outlined text-primary-fixed">search</span>
              <span className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant">
                Powered by AI · Built for Truth
              </span>
            </div>
          </div>

          <div className="flex items-center gap-6">
            {analysis && (
              <button
                onClick={reset}
                className="hidden md:flex items-center gap-2 text-[12px] font-bold tracking-[0.05em] uppercase text-on-surface hover:text-primary-container transition-colors"
              >
                <span className="material-symbols-outlined text-[18px]">add_circle</span>
                New Analysis
              </button>
            )}
            <LanguageSwitcher />
          </div>
        </header>

        {/* Main Area */}
        <div className="flex-1 p-4 md:p-8 w-full space-y-8">
          {!analysis && !isLoading ? (
            <UniversalInputBox onAnalyze={analyze} isLoading={isLoading} />
          ) : analysis ? (
            <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
              {/* Hero Verdict Banner */}
              <VerdictBanner analysis={analysis} />

              {/* 3 Column Layout: Sources + Gauge/Flags */}
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <SourceCards sources={analysis.sources} />

                <div className="space-y-6">
                  <CredibilityGauge score={analysis.overallCredibilityScore} />
                  <RealityMetrics scores={analysis.realityScores} />
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
              <PriyaPanel analysis={analysis} />
            </div>
          ) : null}
        </div>
      </main>
    </div>
  );
}

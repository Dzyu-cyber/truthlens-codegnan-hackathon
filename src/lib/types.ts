// lib/types.ts — All TypeScript interfaces matching the Prompt 1 analysis JSON schema

// ─── Verdict & Status Enums ───
export type Verdict = 'TRUE' | 'FALSE' | 'MISLEADING' | 'UNVERIFIED';
export type ClaimStatus = 'VERIFIED' | 'DISPUTED' | 'UNVERIFIED';
export type Stance = 'SUPPORTS' | 'CONTRADICTS' | 'NEUTRAL';
export type EmotionalTone = 'NEUTRAL' | 'SENSATIONAL' | 'FEAR_BASED' | 'OPTIMISTIC' | 'ALARMIST';
export type Language = 'en' | 'hi' | 'te';

// ─── Source ───
export interface Source {
  sourceName: string;
  sourceUrl: string | null;
  credibilityScore: number; // 0-100
  stance: Stance;
  keyTakeaway: string;
  publishedDate: string; // date string or 'Unknown'
}

// ─── Key Claim ───
export interface KeyClaim {
  claim: string;
  status: ClaimStatus;
  explanation: string;
}

// ─── Red Flag ───
export interface RedFlag {
  flag: string;
  detail: string;
}

// ─── Bias Analysis ───
export interface BiasAnalysis {
  biasScore: number; // -100 to 100 (-100 = extreme negative, 0 = neutral, 100 = extreme positive)
  biasLabel: string;
  emotionalTone: EmotionalTone;
  biasExplanation: string;
  psychologicalTactics: string[];
}

export interface RealityScores {
  manipulationProbability: number; // 0-100
  narrativeRisk: number; // 0-100
}

export interface TimelineEvent {
  date: string;
  description: string;
  type: 'ORIGIN' | 'EDIT' | 'SPREAD';
}

export interface EvidenceStructure {
  directEvidence: string[];
  contextualSignals: string[];
}

// ─── Full Analysis Result (matches Prompt 1 output schema) ───
export interface AnalysisResult {
  verdict: Verdict;
  verdictReason: string;
  confidenceScore: number; // 0-100
  overallCredibilityScore: number; // 0-100
  realityScores: RealityScores;

  originalClaim: string;

  keyClaims: KeyClaim[]; // 4-6 items
  sources: Source[]; // exactly 5 items
  redFlags: RedFlag[]; // 2-5 items

  biasAnalysis: BiasAnalysis;
  evidenceStructure: EvidenceStructure;
  truthTimeline: TimelineEvent[];

  conclusion: string; // 3-4 sentence paragraph

  analyzedAt: string; // ISO timestamp
  totalSourcesAnalyzed: number;
}

// ─── Chat / Journalist ───
export interface ChatMessage {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

export interface PriyaContext {
  analysisResult: AnalysisResult | null;
  conversationHistory: ChatMessage[];
}

// ─── API Integration Types ───
export interface TranslationResult {
  translatedText: string;
  targetLanguage: Language;
}

export interface TTSResult {
  audioBase64: string;
  language: Language;
}

export interface DIDTalkResult {
  videoUrl: string;
  status: 'created' | 'started' | 'done' | 'error';
}

// ─── Submission Input ───
export interface ClaimSubmission {
  originalClaim: string;
  submittedAs: 'text' | 'url' | 'image';
  rawBlob: string;
}

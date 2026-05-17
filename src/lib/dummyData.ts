// lib/dummyData.ts — Dummy analysis data for development (matches Prompt 1 output schema)

import { AnalysisResult } from './types';

export const DEV_MODE = process.env.NEXT_PUBLIC_DEV_MODE === 'true';

export const dummyAnalysis: AnalysisResult = {
  verdict: 'MISLEADING',
  verdictReason:
    'The claim exaggerates the scope of India\'s rice export policy by stating a total ban on all varieties, when only non-basmati white rice was restricted.',
  confidenceScore: 83,
  overallCredibilityScore: 61,
  realityScores: {
    manipulationProbability: 85,
    narrativeRisk: 75,
  },

  originalClaim:
    'The Indian government has banned the export of all rice varieties effective immediately to control rising domestic prices, causing a global food crisis.',

  evidenceStructure: {
    directEvidence: [
      'Government notifications and ministers confirm that basmati rice and other varieties remain freely exportable.',
      'Reuters and The Hindu report that the restrictions only apply to non-basmati white rice.'
    ],
    contextualSignals: [
      'Claims often exaggerate partial policy changes into absolute bans for sensationalism.',
      'The assertion of a "global food crisis" lacks any corroborating evidence from international markets.'
    ]
  },

  keyClaims: [
    {
      claim: 'India has banned ALL rice export varieties',
      status: 'DISPUTED',
      explanation:
        'Only non-basmati white rice was restricted. Basmati and other varieties remain freely exportable.',
    },
    {
      claim: 'India did restrict non-basmati white rice exports in 2023',
      status: 'VERIFIED',
      explanation:
        'Multiple credible sources confirm the restriction was introduced in August 2023.',
    },
    {
      claim: 'Basmati rice exports remain unrestricted',
      status: 'VERIFIED',
      explanation:
        'Government officials and Reuters confirmed basmati exports continue without restrictions.',
    },
    {
      claim: 'This caused a global food crisis',
      status: 'UNVERIFIED',
      explanation:
        'While there was temporary market disruption, no source confirms a full-blown global food crisis.',
    },
    {
      claim: 'The ban was described as "immediate and total"',
      status: 'DISPUTED',
      explanation:
        'The restriction was selective and has been evolving with recent relaxations of some curbs.',
    },
  ],

  sources: [
    {
      sourceName: 'Reuters',
      sourceUrl: 'https://www.reuters.com/world/india/',
      credibilityScore: 82,
      stance: 'CONTRADICTS',
      keyTakeaway:
        'No blanket ban exists; only non-basmati white rice restricted with recent relaxations.',
      publishedDate: '2024-10-12',
    },
    {
      sourceName: 'The Hindu',
      sourceUrl: 'https://www.thehindu.com/',
      credibilityScore: 78,
      stance: 'CONTRADICTS',
      keyTakeaway:
        'Government clarified selective restrictions, not total ban.',
      publishedDate: '2024-10-11',
    },
    {
      sourceName: 'Al Jazeera',
      sourceUrl: 'https://www.aljazeera.com/',
      credibilityScore: 71,
      stance: 'NEUTRAL',
      keyTakeaway:
        'India\'s evolving export policy caused temporary market disruption but was not a complete ban.',
      publishedDate: '2024-10-10',
    },
    {
      sourceName: 'NDTV',
      sourceUrl: 'https://www.ndtv.com/',
      credibilityScore: 85,
      stance: 'CONTRADICTS',
      keyTakeaway:
        'Union Minister confirmed basmati exports remain freely allowed.',
      publishedDate: '2024-10-13',
    },
    {
      sourceName: 'BBC',
      sourceUrl: 'https://www.bbc.com/news/',
      credibilityScore: 79,
      stance: 'CONTRADICTS',
      keyTakeaway:
        'Complete ban claim inaccurate per latest government circulars.',
      publishedDate: '2024-10-14',
    },
  ],

  redFlags: [
    {
      flag: 'Absolute Language',
      detail:
        'The claim uses "all rice varieties" and "total ban" — absolute terms not supported by any credible source.',
    },
    {
      flag: 'Missing Timeline',
      detail:
        'No specific dates or government notification numbers are cited, making verification harder.',
    },
    {
      flag: 'Unverified Impact Claim',
      detail:
        'The assertion of a "global food crisis" is not substantiated by any of the analyzed sources.',
    },
    {
      flag: 'Sensational Framing',
      detail:
        'The language is designed to provoke alarm rather than inform, using emotionally charged phrasing.',
    },
  ],

  biasAnalysis: {
    biasScore: -22,
    biasLabel: 'Slight Negative Bias',
    emotionalTone: 'SENSATIONAL',
    biasExplanation:
      'The original claim skews toward negative sensationalism by framing a selective policy as an absolute crisis. The sources analyzed present a more balanced view, but the claim itself amplifies fear without proportional evidence.',
    psychologicalTactics: ['Fear Amplification', 'Sensationalism'],
  },

  truthTimeline: [
    {
      date: '2023-08-01T00:00:00Z',
      description: 'India imposes restrictions on non-basmati white rice exports.',
      type: 'ORIGIN',
    },
    {
      date: '2024-10-10T00:00:00Z',
      description: 'Misleading claim about a total ban surfaces on social media.',
      type: 'SPREAD',
    },
  ],

  conclusion:
    'The claim that India has imposed a complete ban on all rice exports is MISLEADING. While India did introduce restrictions on non-basmati white rice exports in August 2023 to control domestic prices, basmati rice and several other varieties continue to be exported freely. Multiple credible sources including Reuters, NDTV, and BBC confirm that no blanket ban exists. Readers should be cautious of absolute language in headlines and verify with official government notifications before sharing such claims.',

  analyzedAt: new Date().toISOString(),
  totalSourcesAnalyzed: 5,
};

// Raw blob for testing the analysis submission flow
export const dummyRawBlob = `Article 1 - Reuters: India announced restrictions on non-basmati white rice exports last year but has recently relaxed some curbs. Current policy allows basmati exports freely. Domestic rice prices have stabilized. Article 2 - The Hindu: Government clarified no blanket ban exists. Only specific varieties under temporary restriction. Article 3 - Al Jazeera: India's rice export policy has been evolving. The 2023 restrictions were partial, not a full ban. Global markets saw temporary disruption but have since adjusted. Article 4 - NDTV: Union Minister denied claims of total ban, confirmed selective restrictions on non-basmati white rice remain but basmati fully exportable. Article 5 - BBC: India's rice export decisions have global impact but current claim of complete ban is inaccurate based on latest government circulars.`;

export const dummyClaim =
  'The Indian government has banned the export of all rice varieties effective immediately to control rising domestic prices, causing a global food crisis.';

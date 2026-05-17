import * as cheerio from 'cheerio';
import { DEV_MODE, dummyRawBlob } from './dummyData';

const GEMINI_MODEL = 'gemini-2.5-flash';
const GEMINI_BASE = `https://generativelanguage.googleapis.com/v1beta/models`;

// Helper: Ask Gemini to summarize a claim into a search query
export async function generateSearchQuery(claim: string): Promise<string> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return claim.slice(0, 50); // Fallback

  const url = `${GEMINI_BASE}/${GEMINI_MODEL}:generateContent?key=${apiKey}`;
  
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        contents: [{
          role: 'user',
          parts: [{ text: `Convert the following claim into a concise, 3-5 word Google Search query to find news articles fact-checking it. Reply ONLY with the query, no quotes or extra text.\n\nClaim: ${claim}` }],
        }],
      }),
    });

    if (response.ok) {
      const data = await response.json();
      const query = data.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
      if (query) return query.replace(/["']/g, '');
    }
  } catch (error) {
    console.error('Error generating search query:', error);
  }
  
  return claim.slice(0, 50);
}

// Helper: Fetch search results from Tavily API
async function fetchTavilyResults(query: string): Promise<{ url: string; content: string }[]> {
  const apiKey = process.env.TAVILY_API_KEY;
  if (!apiKey) {
    console.error('TAVILY_API_KEY is not configured');
    return [];
  }

  try {
    const res = await fetch('https://api.tavily.com/search', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        api_key: apiKey,
        query: query,
        search_depth: 'advanced',
        max_results: 5,
        include_raw_content: false
      }),
    });

    if (!res.ok) {
      console.error('Tavily API error:', await res.text());
      return [];
    }

    const data = await res.json();
    return data.results || [];
  } catch (error) {
    console.error('Tavily search failed:', error);
    return [];
  }
}

// Main orchestrated flow
export async function buildContextBlob(claim: string): Promise<{ rawBlob: string, usedQuery: string }> {
  if (DEV_MODE) {
    return { rawBlob: dummyRawBlob, usedQuery: 'mock search query' };
  }

  console.log(`Generating search query for claim: "${claim}"`);
  const query = await generateSearchQuery(claim);
  console.log(`Query generated: "${query}"`);

  // 1. Search with Tavily
  console.log('Fetching top articles from Tavily...');
  const results = await fetchTavilyResults(query);
  
  if (results.length === 0) {
    return { rawBlob: 'No external sources could be found.', usedQuery: query };
  }

  // 2. Format results
  const scrapedResults = results.map((result, index) => {
    return `Article ${index + 1} - Source URL: ${result.url}\nContent: ${result.content}\n`;
  });

  const rawBlob = scrapedResults.join('\n---\n\n');

  console.log('Blob construction complete.');
  return { rawBlob: rawBlob || 'Could not extract content from sources.', usedQuery: query };
}

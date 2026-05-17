// app/api/extract/route.ts
// Extracts content from YouTube / Instagram links before analysis

import { NextRequest, NextResponse } from 'next/server';
import { YoutubeTranscript } from 'youtube-transcript';

// ─── YouTube ─────────────────────────────────────────────────────────────────
function extractYouTubeVideoId(url: string): string | null {
  try {
    const u = new URL(url);
    // youtu.be/<id>
    if (u.hostname === 'youtu.be') return u.pathname.slice(1);
    // youtube.com/watch?v=<id> or /shorts/<id>
    if (u.hostname.includes('youtube.com')) {
      if (u.searchParams.get('v')) return u.searchParams.get('v');
      const shortMatch = u.pathname.match(/\/shorts\/([^/?]+)/);
      if (shortMatch) return shortMatch[1];
    }
    return null;
  } catch {
    return null;
  }
}

async function fetchYouTubeContent(url: string): Promise<{ text: string; title: string }> {
  const videoId = extractYouTubeVideoId(url);
  if (!videoId) throw new Error('Could not extract YouTube video ID from URL');

  try {
    const transcript = await YoutubeTranscript.fetchTranscript(videoId, { lang: 'en' });
    const text = transcript.map((t) => t.text).join(' ');
    return {
      text: text || 'No transcript available for this video.',
      title: `YouTube Video (ID: ${videoId})`,
    };
  } catch {
    // If transcript fails (disabled captions etc.) give Gemini the URL to describe
    return {
      text: `YouTube video URL: ${url}. No transcript is available. Analyze based on URL context.`,
      title: `YouTube Video (ID: ${videoId}) — No Transcript`,
    };
  }
}

// ─── Instagram ───────────────────────────────────────────────────────────────
// Instagram is heavily locked down. We use a simple oEmbed fallback to
// at least get the title/caption of a post. For richer analysis the user
// is prompted to also upload the media directly.
// ─── Instagram ───────────────────────────────────────────────────────────────
// Instagram is heavily locked down. We use a simple oEmbed fallback to
// at least get the title/caption of a post. For richer analysis the user
// is prompted to also upload the media directly.
async function fetchInstagramContent(url: string): Promise<{ text: string; title: string }> {
  try {
    const oEmbedUrl = `https://api.instagram.com/oembed/?url=${encodeURIComponent(url)}&omitscript=true`;
    const res = await fetch(oEmbedUrl, { cache: 'no-store' });

    if (res.ok) {
      const data = await res.json();
      const caption = data.title || 'No caption available';
      const author = data.author_name || 'Unknown';
      return {
        text: `Instagram post by @${author}. Caption: "${caption}". URL: ${url}`,
        title: `Instagram Post by @${author}`,
      };
    }
  } catch {
    // oEmbed failed — Instagram might have blocked it. Graceful degradation.
  }

  // Fallback: tell Gemini what we know
  return {
    text: `Instagram post/reel URL: ${url}. Instagram restricts direct access to its content. Analyze the URL and any available context. The user has shared this as potentially misleading content.`,
    title: 'Instagram Post (Limited Data)',
  };
}

// ─── Generic Link ───────────────────────────────────────────────────────────
async function fetchGenericContent(url: string): Promise<{ text: string; title: string }> {
  try {
    const res = await fetch(url, { signal: AbortSignal.timeout(5000) });
    if (!res.ok) throw new Error('Failed to fetch');
    const html = await res.text();

    // Extract title
    const titleMatch = html.match(/<title>([^<]+)<\/title>/i);
    const title = titleMatch ? titleMatch[1].trim() : 'External Link';

    // Extract meta description
    const descMatch = html.match(/<meta name="description" content="([^"]+)"/i) ||
                     html.match(/<meta property="og:description" content="([^"]+)"/i);
    const description = descMatch ? descMatch[1].trim() : '';

    return {
      text: `Content from ${url}.${description ? ` Description: ${description}` : ''} Please analyze based on the available metadata and URL context.`,
      title: title,
    };
  } catch {
    return {
      text: `URL submitted for analysis: ${url}. Could not extract page content. Analyze based on URL context.`,
      title: 'External Link',
    };
  }
}

// ─── Route Handler ────────────────────────────────────────────────────────────
export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const { url, platform } = body as { url: string; platform: string };

    if (!url) {
      return NextResponse.json({ error: 'Missing url field' }, { status: 400 });
    }

    let result: { text: string; title: string };

    if (platform === 'youtube') {
      result = await fetchYouTubeContent(url);
    } else if (platform === 'instagram') {
      result = await fetchInstagramContent(url);
    } else {
      result = await fetchGenericContent(url);
    }

    return NextResponse.json(result);
  } catch (error) {
    console.error('Extract API error:', error);
    const message = error instanceof Error ? error.message : 'Extraction failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}

// lib/didApi.ts — D-ID talking head video generation (optional layer)

export async function generateTalkingHead(
  audioUrl: string,
  imageUrl: string
): Promise<string> {
  const apiKey = process.env.DID_API_KEY;
  if (!apiKey) {
    console.warn('DID_API_KEY not configured, falling back to SVG avatar');
    return '';
  }

  try {
    // Step 1: Create the talk
    const createResponse = await fetch('https://api.d-id.com/talks', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Basic ${apiKey}`,
      },
      body: JSON.stringify({
        source_url: imageUrl,
        script: {
          type: 'audio',
          audio_url: audioUrl,
        },
        config: {
          fluent: true,
          pad_audio: 0.5,
        },
      }),
    });

    if (!createResponse.ok) {
      throw new Error(`D-ID create error: ${createResponse.status}`);
    }

    const createData = await createResponse.json();
    const talkId = createData.id;

    if (!talkId) {
      throw new Error('No talk ID returned from D-ID');
    }

    // Step 2: Poll for result
    const maxAttempts = 30;
    for (let i = 0; i < maxAttempts; i++) {
      await new Promise((resolve) => setTimeout(resolve, 2000));

      const pollResponse = await fetch(`https://api.d-id.com/talks/${talkId}`, {
        headers: {
          Authorization: `Basic ${apiKey}`,
        },
      });

      if (!pollResponse.ok) continue;

      const pollData = await pollResponse.json();

      if (pollData.status === 'done' && pollData.result_url) {
        return pollData.result_url;
      }

      if (pollData.status === 'error') {
        throw new Error(`D-ID processing error: ${pollData.error?.description}`);
      }
    }

    throw new Error('D-ID polling timeout');
  } catch (error) {
    console.error('D-ID generation failed:', error);
    return ''; // Gracefully fall back to SVG avatar
  }
}

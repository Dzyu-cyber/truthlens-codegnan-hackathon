// lib/bhashiniApi.ts — Bhashini API for translation and TTS (Free Govt API)

const BHASHINI_URL = 'https://dhruva-api.bhashini.gov.in/services/inference/pipeline';

// Note: In a real production app, you would fetch these dynamically from Bhashini's config endpoint.
// For this hackathon demo, we hardcode the known model IDs for translation and TTS.
const MODEL_IDS = {
  translate: {
    en_hi: '644fceba6ce22a106e232ed6', // placeholder ID
    en_te: '644fceba6ce22a106e232ed7', // placeholder ID
  },
  tts: {
    hi: '644fceba6ce22a106e232ed8', // placeholder ID
    te: '644fceba6ce22a106e232ed9', // placeholder ID
  }
};

export async function bhashiniTranslate(text: string, targetLang: 'hi' | 'te'): Promise<string> {
  const apiKey = process.env.BHASHINI_API_KEY;
  if (!apiKey) throw new Error('BHASHINI_API_KEY not configured');

  try {
    const response = await fetch(BHASHINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: 'translation',
            config: {
              language: {
                sourceLanguage: 'en',
                targetLanguage: targetLang
              },
              serviceId: targetLang === 'hi' ? MODEL_IDS.translate.en_hi : MODEL_IDS.translate.en_te
            }
          }
        ],
        inputData: {
          input: [{ source: text }]
        }
      })
    });

    if (!response.ok) throw new Error(`Bhashini translation failed: ${response.status}`);
    
    const data = await response.json();
    const translatedText = data.pipelineResponse?.[0]?.output?.[0]?.target;
    
    if (!translatedText) throw new Error('Invalid response from Bhashini');
    return translatedText;
  } catch (error) {
    console.error('Bhashini translate error:', error);
    throw error;
  }
}

export async function bhashiniTTS(text: string, lang: 'hi' | 'te'): Promise<string> {
  const apiKey = process.env.BHASHINI_API_KEY;
  if (!apiKey) throw new Error('BHASHINI_API_KEY not configured');

  try {
    const response = await fetch(BHASHINI_URL, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': apiKey,
      },
      body: JSON.stringify({
        pipelineTasks: [
          {
            taskType: 'tts',
            config: {
              language: {
                sourceLanguage: lang
              },
              serviceId: lang === 'hi' ? MODEL_IDS.tts.hi : MODEL_IDS.tts.te,
              gender: 'female'
            }
          }
        ],
        inputData: {
          input: [{ source: text }]
        }
      })
    });

    if (!response.ok) throw new Error(`Bhashini TTS failed: ${response.status}`);
    
    const data = await response.json();
    const audioBase64 = data.pipelineResponse?.[0]?.audio?.[0]?.audioContent;
    
    if (!audioBase64) throw new Error('Invalid response from Bhashini');
    return audioBase64;
  } catch (error) {
    console.error('Bhashini TTS error:', error);
    throw error;
  }
}

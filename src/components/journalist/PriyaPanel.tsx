// components/journalist/PriyaPanel.tsx — Priya AI journalist inline panel

'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'framer-motion';
import { ChatMessage, AnalysisResult } from '@/lib/types';
import { chatWithPriya } from '@/lib/geminiApi';
import { PRIYA_SYSTEM_PROMPT } from '@/lib/analysisPrompt';
import { DEV_MODE } from '@/lib/dummyData';
import { useLanguage } from '@/hooks/useLanguage';
import JournalistAvatar from './JournalistAvatar';
import ChatBubble from './ChatBubble';
import AvatarDisplay from './AvatarDisplay';

interface PriyaPanelProps {
  analysis: AnalysisResult | null;
}

const PRIYA_INTRO = `Namaste! 🙏 I'm Priya, your AI investigative journalist at TruthLens.

I've just completed my analysis of this claim. It's an important topic, but the original framing can be misleading.

Feel free to ask me anything about the sources, methodology, or how this kind of misinformation typically spreads. The truth has no language barrier. ✨`;

export default function PriyaPanel({ analysis }: PriyaPanelProps) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [didVideoUrl, setDidVideoUrl] = useState<string | null>(null);
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const { language } = useLanguage();
  const introPlayed = useRef(false);

  // Play audio function
  const playAudio = async (base64Audio: string) => {
    try {
      const audio = new Audio(`data:audio/wav;base64,${base64Audio}`);
      await audio.play();
    } catch (e) {
      console.error('Failed to play audio', e);
    }
  };

  // Process a message (translate + TTS)
  const processMessageOutputs = async (text: string) => {
    let displayText = text;
    let audioBase64 = null;

    if (language !== 'en') {
      try {
        // 1. Translate
        const transRes = await fetch('/api/translate', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text, targetLang: language }),
        });
        if (transRes.ok) {
          const transData = await transRes.json();
          displayText = transData.translatedText || text;
        }

        // 2. TTS
        const ttsRes = await fetch('/api/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ text: displayText, lang: language }),
        });
        if (ttsRes.ok) {
          const ttsData = await ttsRes.json();
          audioBase64 = ttsData.audioBase64;
        }
      } catch (err) {
        console.error('Error processing translation/TTS:', err);
      }
    }

    return { displayText, audioBase64 };
  };

  // Send intro message on first render
  useEffect(() => {
    if (messages.length === 0 && !introPlayed.current && analysis) {
      introPlayed.current = true;
      setIsTyping(true);

      const triggerIntro = async () => {
        const { displayText, audioBase64 } = await processMessageOutputs(PRIYA_INTRO);
        
        // If we have audio, try D-ID once
        if (audioBase64) {
          try {
            const didRes = await fetch('/api/did', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              // In production, imageUrl needs to be a hosted public URL
              body: JSON.stringify({ audioBase64, imageUrl: 'https://cdn.pixabay.com/photo/2021/06/15/16/11/woman-6339069_1280.jpg' }),
            });
            if (didRes.ok) {
              const didData = await didRes.json();
              if (didData.videoUrl) setDidVideoUrl(didData.videoUrl);
              else playAudio(audioBase64); // fallback to just audio
            } else {
              playAudio(audioBase64);
            }
          } catch (e) {
            playAudio(audioBase64);
          }
        }

        setMessages([{
          id: 'intro',
          role: 'assistant',
          content: displayText,
          timestamp: new Date(),
        }]);
        setIsTyping(false);
      };

      triggerIntro();
    }
  }, [messages.length, language, analysis]);

  // Scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || isTyping) return;

    const userMessage: ChatMessage = {
      id: `user-${Date.now()}`,
      role: 'user',
      content: input.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsTyping(true);

    try {
      let rawResponse: string;

      if (DEV_MODE) {
        await new Promise((resolve) => setTimeout(resolve, 1500));
        rawResponse = `Great question! The key finding here is that the claim about India's rice export ban significantly overstates the scope. Only non-basmati white rice was restricted, while basmati exports continue normally. The truth has no language barrier. ✨`;
      } else {
        const contextPrompt = `${PRIYA_SYSTEM_PROMPT}\n\n## Current Analysis Context:\n${JSON.stringify(analysis, null, 2)}`;
        const apiMessages = [...messages, userMessage].map((m) => ({
          role: m.role,
          content: m.content,
        }));
        rawResponse = await chatWithPriya(apiMessages, contextPrompt);
      }

      // Process for translated text and TTS audio
      const { displayText, audioBase64 } = await processMessageOutputs(rawResponse);

      if (audioBase64 && !didVideoUrl) {
        // If we don't have a D-ID video running, just play audio
        playAudio(audioBase64);
      }

      setMessages((prev) => [
        ...prev,
        {
          id: `assistant-${Date.now()}`,
          role: 'assistant',
          content: displayText,
          timestamp: new Date(),
        },
      ]);
    } catch (error) {
      console.error('Chat error:', error);
      setMessages((prev) => [
        ...prev,
        {
          id: `error-${Date.now()}`,
          role: 'assistant',
          content: 'I apologize, but I encountered an error processing your question. Please try again.',
          timestamp: new Date(),
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  }, [input, messages, isTyping, analysis, language, didVideoUrl]);

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="w-full h-[600px] glass-panel rounded-2xl border border-outline-variant/30 flex flex-col shadow-2xl overflow-hidden shadow-primary-container/10 mt-8">
      {/* Top Avatar Area */}
      <div className="relative h-48 md:h-56 bg-surface-container-highest shrink-0">
        {didVideoUrl ? (
          <video src={didVideoUrl} autoPlay playsInline className="w-full h-full object-cover" />
        ) : (
          <div className="w-full h-full flex items-center justify-center bg-gradient-to-b from-surface-container-highest to-surface">
            <JournalistAvatar />
          </div>
        )}
        
        {/* Overlay Header Controls */}
        <div className="absolute top-0 left-0 w-full p-4 flex justify-between items-start bg-gradient-to-b from-black/70 via-black/40 to-transparent">
          <div className="flex flex-col">
            <span className="text-white font-bold text-[18px] drop-shadow-lg">Priya AI</span>
            <span className="text-primary-fixed text-[13px] font-semibold drop-shadow-md">
              {isTyping ? 'Analyzing...' : 'Investigative Journalist'}
            </span>
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4 md:p-6 space-y-4 bg-surface-container-lowest/50">
        {messages.map((msg) => (
          <ChatBubble key={msg.id} message={msg} />
        ))}

        {isTyping && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-3">
            <AvatarDisplay size="sm" />
            <div className="bg-surface-container-high p-4 rounded-xl rounded-tl-none border border-outline-variant/20 shadow-sm">
              <div className="flex gap-1.5">
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                <span className="w-2 h-2 bg-primary rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
              </div>
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Input */}
      <div className="p-4 bg-surface-container-lowest border-t border-outline-variant/20">
        <div className="flex gap-3 max-w-4xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Ask Priya about the findings..."
            className="flex-1 bg-surface-container-high rounded-full px-5 py-3 text-[15px] leading-[20px] text-on-surface placeholder:text-on-surface-variant/50 border border-outline-variant/30 focus:border-primary-container focus:outline-none transition-colors shadow-inner"
          />
          <button
            onClick={sendMessage}
            disabled={!input.trim() || isTyping}
            className="bg-primary-container text-on-primary-container w-12 h-12 rounded-full flex items-center justify-center hover:bg-primary-fixed transition-colors disabled:opacity-50 disabled:cursor-not-allowed shrink-0 shadow-md hover:shadow-primary-fixed/30"
          >
            <span className="material-symbols-outlined text-[20px]">send</span>
          </button>
        </div>
      </div>
    </div>
  );
}

// components/dashboard/Conclusion.tsx — Conclusion section

'use client';

import { motion } from 'framer-motion';
import { useState } from 'react';
import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from '@/components/ui/Skeleton';
import { useLanguage } from '@/hooks/useLanguage';

interface ConclusionProps {
  conclusion: string;
}

export default function Conclusion({ conclusion }: ConclusionProps) {
  const { translated, isLoading } = useTranslation(conclusion);
  const { language } = useLanguage();
  const [isPlaying, setIsPlaying] = useState(false);
  const [audioError, setAudioError] = useState(false);

  const handlePlayAudio = async () => {
    if (isPlaying) return; // simple prevention of concurrent plays
    setIsPlaying(true);
    setAudioError(false);

    try {
      const response = await fetch('/api/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text: translated, lang: language }),
      });

      if (!response.ok) throw new Error('TTS failed');
      const data = await response.json();
      
      if (data.audioBase64) {
        const audio = new Audio(`data:audio/wav;base64,${data.audioBase64}`);
        audio.onended = () => setIsPlaying(false);
        audio.onerror = () => {
          setIsPlaying(false);
          setAudioError(true);
        };
        await audio.play();
      } else {
        setIsPlaying(false);
      }
    } catch (err) {
      console.error(err);
      setIsPlaying(false);
      setAudioError(true);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.7 }}
      className="glass-panel rounded-xl p-6 relative"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-[20px] leading-[28px] font-semibold text-on-surface flex items-center gap-2">
          <span className="material-symbols-outlined text-primary-fixed">summarize</span>
          Conclusion
        </h3>
        
        {language !== 'en' && !isLoading && (
          <button
            onClick={handlePlayAudio}
            disabled={isPlaying}
            title={audioError ? 'Audio failed' : 'Play Audio'}
            className={`p-2 rounded-full transition-colors flex items-center justify-center ${
              audioError ? 'text-error' : isPlaying ? 'bg-primary-container text-on-primary-container' : 'bg-surface-bright text-on-surface hover:bg-surface-container-high'
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">
              {isPlaying ? 'graphic_eq' : audioError ? 'volume_off' : 'volume_up'}
            </span>
          </button>
        )}
      </div>

      <div className="text-[16px] leading-[24px] text-on-surface-variant min-h-[72px]">
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-3/4" />
          </div>
        ) : (
          <p>{translated}</p>
        )}
      </div>
    </motion.div>
  );
}

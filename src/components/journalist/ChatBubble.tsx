// components/journalist/ChatBubble.tsx — Chat message bubble

'use client';

import { motion } from 'framer-motion';
import { ChatMessage } from '@/lib/types';
import AvatarDisplay from './AvatarDisplay';

interface ChatBubbleProps {
  message: ChatMessage;
  videoUrl?: string;
}

export default function ChatBubble({ message, videoUrl }: ChatBubbleProps) {
  const isAssistant = message.role === 'assistant';

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
      className={`flex gap-3 ${isAssistant ? '' : 'flex-row-reverse'}`}
    >
      {isAssistant && <AvatarDisplay videoUrl={videoUrl} size="sm" />}

      <div
        className={`max-w-[80%] p-3 rounded-xl text-[14px] leading-[20px] ${
          isAssistant
            ? 'bg-surface-container-high text-on-surface rounded-tl-none'
            : 'bg-primary-container/20 text-on-surface rounded-tr-none'
        }`}
      >
        <p className="whitespace-pre-wrap">{message.content}</p>
        <span className="text-[10px] leading-[12px] text-on-surface-variant mt-1 block opacity-60">
          {message.timestamp.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
        </span>
      </div>
    </motion.div>
  );
}

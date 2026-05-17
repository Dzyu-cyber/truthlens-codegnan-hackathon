// components/journalist/AvatarDisplay.tsx — SVG journalist avatar or D-ID video

'use client';

import { motion } from 'framer-motion';

interface AvatarDisplayProps {
  videoUrl?: string;
  size?: 'sm' | 'lg';
}

export default function AvatarDisplay({ videoUrl, size = 'sm' }: AvatarDisplayProps) {
  const sizeClasses = size === 'lg' ? 'w-24 h-24' : 'w-10 h-10';

  if (videoUrl) {
    return (
      <div className={`${sizeClasses} rounded-full overflow-hidden bg-surface-container-high`}>
        <video
          src={videoUrl}
          autoPlay
          loop
          muted
          playsInline
          className="w-full h-full object-cover"
        />
      </div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.8, opacity: 0 }}
      animate={{ scale: 1, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 200 }}
      className={`${sizeClasses} rounded-full bg-surface-container-high overflow-hidden`}
    >
      <svg
        className="w-full h-full text-primary-fixed"
        fill="currentColor"
        viewBox="0 0 100 100"
      >
        <circle cx="50" cy="40" r="20" />
        <path
          d="M20 90 Q 50 60 80 90"
          fill="none"
          stroke="currentColor"
          strokeWidth="8"
        />
      </svg>
    </motion.div>
  );
}

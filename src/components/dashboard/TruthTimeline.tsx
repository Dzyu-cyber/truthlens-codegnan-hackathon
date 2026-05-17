// components/dashboard/TruthTimeline.tsx — Visual timeline showing upload, edits, and viral spread

'use client';

import { motion } from 'framer-motion';
import { TimelineEvent } from '@/lib/types';
import { TranslatedText } from '@/components/ui/TranslatedText';

interface TruthTimelineProps {
  events?: TimelineEvent[];
}

export default function TruthTimeline({ events }: TruthTimelineProps) {
  if (!events || events.length === 0) return null;

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'ORIGIN': return 'trip_origin';
      case 'EDIT': return 'edit_square';
      case 'SPREAD': return 'share';
      default: return 'event';
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'ORIGIN': return 'text-primary-container border-primary-container bg-primary-container/10';
      case 'EDIT': return 'text-[#ffaa00] border-[#ffaa00] bg-[#ffaa00]/10';
      case 'SPREAD': return 'text-[#ff3b5c] border-[#ff3b5c] bg-[#ff3b5c]/10';
      default: return 'text-on-surface-variant border-outline-variant';
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
      className="glass-panel rounded-xl p-6"
    >
      <h3 className="text-[12px] leading-[16px] tracking-[0.05em] font-semibold text-on-surface-variant uppercase mb-6 flex items-center gap-2">
        <span className="material-symbols-outlined text-[16px] text-primary">timeline</span>
        Viral Spread Timeline
      </h3>

      <div className="relative border-l border-outline-variant/30 ml-3 space-y-6">
        {events.map((event, i) => {
          const colorClass = getEventColor(event.type);
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.6 + i * 0.2 }}
              className="relative pl-6"
            >
              <div className={`absolute -left-[13px] top-1 w-6 h-6 rounded-full border flex items-center justify-center bg-surface ${colorClass}`}>
                <span className="material-symbols-outlined text-[12px]">{getEventIcon(event.type)}</span>
              </div>
              
              <div className="flex flex-col gap-1">
                <span className="text-[11px] font-bold tracking-[0.05em] text-on-surface-variant uppercase">
                  {event.type} • {event.date !== 'Unknown' ? new Date(event.date).toLocaleDateString() : 'Unknown Date'}
                </span>
                <p className="text-[14px] text-on-surface leading-relaxed">
                  <TranslatedText text={event.description} skeletonClass="w-full h-4" />
                </p>
              </div>
            </motion.div>
          );
        })}
      </div>
    </motion.div>
  );
}

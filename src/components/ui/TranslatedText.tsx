// components/ui/TranslatedText.tsx — Helper component for inline translations

'use client';

import { useTranslation } from '@/hooks/useTranslation';
import { Skeleton } from './Skeleton';
import React from 'react';

interface TranslatedTextProps {
  text: string;
  skeletonClass?: string;
  as?: React.ElementType;
  className?: string;
}

export function TranslatedText({ 
  text, 
  skeletonClass = 'h-4 w-full', 
  as: Component = 'span', 
  className = '' 
}: TranslatedTextProps) {
  const { translated, isLoading } = useTranslation(text);

  if (isLoading) {
    return <Skeleton className={`inline-block ${skeletonClass}`} />;
  }

  return <Component className={className}>{translated}</Component>;
}

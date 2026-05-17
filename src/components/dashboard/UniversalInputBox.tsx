// components/dashboard/UniversalInputBox.tsx
// The "Universal Truth Box" — handles text, image/video upload, and link inputs

'use client';

import { useState, useRef, useCallback, DragEvent, ChangeEvent } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { DEV_MODE, dummyClaim } from '@/lib/dummyData';

// ─── Types ───────────────────────────────────────────────────────────────────
export type InputMode = 'text' | 'upload' | 'link';

export interface UniversalInput {
  mode: InputMode;
  text?: string;
  file?: File;
  fileBase64?: string;
  fileMimeType?: string;
  link?: string;
  linkPlatform?: 'youtube' | 'instagram' | 'unknown';
}

interface UniversalInputBoxProps {
  onAnalyze: (input: UniversalInput) => void;
  isLoading: boolean;
}

// ─── Helpers ─────────────────────────────────────────────────────────────────
function detectPlatform(url: string): 'youtube' | 'instagram' | 'unknown' {
  if (/youtube\.com|youtu\.be/.test(url)) return 'youtube';
  if (/instagram\.com/.test(url)) return 'instagram';
  return 'unknown';
}

function isValidUrl(url: string): boolean {
  try {
    new URL(url);
    return true;
  } catch {
    return false;
  }
}

async function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as string;
      // Strip the data: prefix, e.g. "data:image/jpeg;base64,..."
      resolve(result.split(',')[1]);
    };
    reader.onerror = reject;
    reader.readAsDataURL(file);
  });
}

// ─── Sub-components ──────────────────────────────────────────────────────────

function TabButton({ active, onClick, icon, label }: {
  active: boolean;
  onClick: () => void;
  icon: string;
  label: string;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`flex items-center gap-2 px-4 py-2.5 rounded-xl text-[13px] font-bold tracking-[0.03em] transition-all duration-200 ${
        active
          ? 'bg-primary-container text-on-primary-container shadow-[0_0_20px_rgba(0,255,136,0.2)]'
          : 'text-on-surface-variant hover:text-on-surface hover:bg-surface-container-high'
      }`}
    >
      <span className="material-symbols-outlined text-[18px]">{icon}</span>
      {label}
    </button>
  );
}

function PlatformBadge({ platform }: { platform: 'youtube' | 'instagram' | 'unknown' }) {
  if (platform === 'unknown') return null;
  const isYT = platform === 'youtube';
  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[11px] font-bold tracking-[0.05em] uppercase ${
        isYT
          ? 'bg-[rgba(255,0,0,0.15)] text-[#ff4444] border border-[rgba(255,0,0,0.3)]'
          : 'bg-[rgba(200,60,190,0.15)] text-[#e040e0] border border-[rgba(200,60,190,0.3)]'
      }`}
    >
      <span className="material-symbols-outlined text-[14px]">
        {isYT ? 'smart_display' : 'photo_camera'}
      </span>
      {isYT ? 'YouTube' : 'Instagram'}
    </span>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
export default function UniversalInputBox({ onAnalyze, isLoading }: UniversalInputBoxProps) {
  const [mode, setMode] = useState<InputMode>('text');
  const [text, setText] = useState('');
  const [link, setLink] = useState('');
  const [file, setFile] = useState<File | null>(null);
  const [filePreviewUrl, setFilePreviewUrl] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const linkPlatform = isValidUrl(link) ? detectPlatform(link) : 'unknown';

  // ── Can Submit Logic ──────────────────────────────────────────────────────
  const canSubmit = !isLoading && (
    (mode === 'text' && text.trim().length > 5) ||
    (mode === 'upload' && file !== null) ||
    (mode === 'link' && isValidUrl(link))
  );

  // ── File Handlers ─────────────────────────────────────────────────────────
  const processFile = useCallback((f: File) => {
    const isImage = f.type.startsWith('image/');
    const isVideo = f.type.startsWith('video/');
    const isAudio = f.type.startsWith('audio/');
    const isPdf = f.type === 'application/pdf';
    
    if (!isImage && !isVideo && !isAudio && !isPdf) return;
    
    setFile(f);
    if (isImage) {
      setFilePreviewUrl(URL.createObjectURL(f));
    } else {
      setFilePreviewUrl(null); // non-images show icon only
    }
  }, []);

  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    const f = e.target.files?.[0];
    if (f) processFile(f);
  };

  const handleDrop = (e: DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragging(false);
    const f = e.dataTransfer.files?.[0];
    if (f) processFile(f);
  };

  const clearFile = () => {
    setFile(null);
    setFilePreviewUrl(null);
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  // ── Submit ────────────────────────────────────────────────────────────────
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmit) return;

    if (mode === 'text') {
      onAnalyze({ mode: 'text', text: text.trim() });
    } else if (mode === 'link') {
      onAnalyze({ mode: 'link', link: link.trim(), linkPlatform });
    } else if (mode === 'upload' && file) {
      const base64 = await fileToBase64(file);
      onAnalyze({
        mode: 'upload',
        file,
        fileBase64: base64,
        fileMimeType: file.type,
      });
    }
  };

  const fillDemo = () => {
    setMode('text');
    setText(dummyClaim);
  };

  // ── Mode switching helpers ─────────────────────────────────────────────────
  const switchMode = (m: InputMode) => {
    setMode(m);
    setText('');
    setLink('');
    clearFile();
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className="max-w-3xl mx-auto w-full mt-12 md:mt-20 px-4"
    >
      {/* ── Hero Title ─────────────────────────────────────────────────────── */}
      <div className="text-center mb-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.1, duration: 0.5 }}
          className="inline-flex items-center gap-2 bg-surface-container px-4 py-2 rounded-full border border-outline-variant/30 mb-6"
        >
          <span className="w-2 h-2 rounded-full bg-primary-container animate-pulse" />
          <span className="text-[11px] font-bold tracking-[0.1em] uppercase text-on-surface-variant">
            AI Fact Verification Engine
          </span>
        </motion.div>

        <h1 className="text-[40px] leading-[48px] font-bold text-on-surface mb-3">
          What&apos;s the{' '}
          <span
            className="text-primary-container"
            style={{ textShadow: '0 0 30px rgba(0,255,136,0.4)' }}
          >
            Truth?
          </span>
        </h1>
        <p className="text-[15px] leading-[24px] text-on-surface-variant max-w-xl mx-auto">
          Submit any claim, image, video, or link — TruthLens will perform a forensic AI analysis
          and deliver a verdict.
        </p>
      </div>

      {/* ── Main Card ──────────────────────────────────────────────────────── */}
      <div className="glass-panel rounded-2xl border border-outline-variant/20 shadow-[0_0_60px_rgba(0,255,136,0.05)] relative overflow-hidden">
        {isLoading && (
          <motion.div
            initial={{ top: '-10%' }}
            animate={{ top: '110%' }}
            transition={{ duration: 2.5, repeat: Infinity, ease: 'linear' }}
            className="absolute left-0 right-0 h-1 bg-primary-container/50 shadow-[0_0_20px_rgba(0,255,136,0.8)] z-50 pointer-events-none"
          />
        )}
        
        {/* Subtle glow top */}
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-2/3 h-32 bg-primary-container/5 blur-3xl pointer-events-none" />

        <form onSubmit={handleSubmit} className="relative z-10">
          {/* ── Tab Switcher ─────────────────────────────────────────────────── */}
          <div className="flex items-center gap-2 p-4 border-b border-outline-variant/20">
            <TabButton active={mode === 'text'} onClick={() => switchMode('text')} icon="edit_note" label="Ask / Text" />
            <TabButton active={mode === 'upload'} onClick={() => switchMode('upload')} icon="upload_file" label="Upload" />
            <TabButton active={mode === 'link'} onClick={() => switchMode('link')} icon="link" label="Paste Link" />
          </div>

          {/* ── Input Area ───────────────────────────────────────────────────── */}
          <div className="p-6 md:p-8">
            <AnimatePresence mode="wait">

              {/* TEXT MODE */}
              {mode === 'text' && (
                <motion.div
                  key="text"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-on-surface-variant mb-3">
                    Your Question or Claim
                  </label>
                  <textarea
                    id="universal-text-input"
                    value={text}
                    onChange={e => setText(e.target.value)}
                    placeholder="E.g. &quot;Is it true that eating carrots improves your night vision?&quot; or paste a news headline..."
                    rows={5}
                    disabled={isLoading}
                    className="w-full bg-surface-container-lowest/60 border border-outline-variant/40 rounded-xl px-4 py-3.5 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/40 transition-all resize-none"
                  />
                  <p className="text-[12px] text-on-surface-variant/60 mt-2">
                    Tip: Be specific. Include names, dates, or the exact claim you want verified.
                  </p>
                </motion.div>
              )}

              {/* UPLOAD MODE */}
              {mode === 'upload' && (
                <motion.div
                  key="upload"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-on-surface-variant mb-3">
                    Upload Image or Video
                  </label>
                  <input
                    ref={fileInputRef}
                    id="file-upload-input"
                    type="file"
                    accept="image/*,video/*,audio/*,application/pdf"
                    onChange={handleFileChange}
                    className="hidden"
                  />

                  {!file ? (
                    <div
                      onDragOver={e => { e.preventDefault(); setIsDragging(true); }}
                      onDragLeave={() => setIsDragging(false)}
                      onDrop={handleDrop}
                      onClick={() => fileInputRef.current?.click()}
                      className={`relative flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl px-8 py-12 cursor-pointer transition-all duration-200 ${
                        isDragging
                          ? 'border-primary-container/80 bg-primary-container/5 scale-[1.01]'
                          : 'border-outline-variant/40 hover:border-outline-variant/80 hover:bg-surface-container/40'
                      }`}
                    >
                      <div className={`w-16 h-16 rounded-full flex items-center justify-center transition-all ${isDragging ? 'bg-primary-container/20' : 'bg-surface-container-high'}`}>
                        <span className="material-symbols-outlined text-[32px] text-primary-container">cloud_upload</span>
                      </div>
                      <div className="text-center">
                        <p className="text-[15px] font-semibold text-on-surface mb-1">
                          Drag & drop or click to browse
                        </p>
                        <p className="text-[13px] text-on-surface-variant/60">
                          Supports JPG, PNG, GIF, MP4, MOV, MP3, PDF · Max 20MB
                        </p>
                      </div>
                    </div>
                  ) : (
                    <div className="relative rounded-xl overflow-hidden border border-outline-variant/30 bg-surface-container">
                      {/* Preview */}
                      {filePreviewUrl ? (
                        <img src={filePreviewUrl} alt="Preview" className="w-full max-h-64 object-cover" />
                      ) : (
                        <div className="flex items-center justify-center gap-4 p-8">
                          <div className="w-14 h-14 rounded-full bg-surface-container-high flex items-center justify-center">
                            <span className="material-symbols-outlined text-[28px] text-primary-container">
                              {file.type.startsWith('audio/') ? 'audio_file' : file.type === 'application/pdf' ? 'picture_as_pdf' : 'videocam'}
                            </span>
                          </div>
                          <div>
                            <p className="text-[14px] font-semibold text-on-surface">{file.name}</p>
                            <p className="text-[12px] text-on-surface-variant">{(file.size / 1024 / 1024).toFixed(2)} MB · {file.type.startsWith('audio/') ? 'Audio' : file.type === 'application/pdf' ? 'Document' : 'Video'}</p>
                          </div>
                        </div>
                      )}
                      {/* File name overlay */}
                      {filePreviewUrl && (
                        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/70 to-transparent px-4 py-3">
                          <p className="text-[13px] font-medium text-white truncate">{file.name}</p>
                        </div>
                      )}
                      {/* Remove button */}
                      <button
                        type="button"
                        onClick={clearFile}
                        className="absolute top-3 right-3 w-8 h-8 rounded-full bg-black/60 flex items-center justify-center hover:bg-black/80 transition-colors"
                      >
                        <span className="material-symbols-outlined text-[16px] text-white">close</span>
                      </button>
                    </div>
                  )}
                  <p className="text-[12px] text-on-surface-variant/60 mt-2">
                    Gemini AI will analyze the uploaded file for claims, deepfakes, and misleading content.
                  </p>
                </motion.div>
              )}

              {/* LINK MODE */}
              {mode === 'link' && (
                <motion.div
                  key="link"
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -8 }}
                  transition={{ duration: 0.2 }}
                >
                  <label className="block text-[12px] font-bold tracking-[0.08em] uppercase text-on-surface-variant mb-3">
                    YouTube or Instagram Link
                  </label>
                  <div className="relative">
                    <span className="absolute left-4 top-1/2 -translate-y-1/2 material-symbols-outlined text-[20px] text-on-surface-variant/50">
                      link
                    </span>
                    <input
                      id="link-input"
                      type="url"
                      value={link}
                      onChange={e => setLink(e.target.value)}
                      placeholder="https://youtube.com/watch?v=... or https://instagram.com/reel/..."
                      disabled={isLoading}
                      className="w-full bg-surface-container-lowest/60 border border-outline-variant/40 rounded-xl pl-11 pr-4 py-3.5 text-[15px] text-on-surface placeholder:text-on-surface-variant/40 focus:outline-none focus:border-primary-container/60 focus:ring-1 focus:ring-primary-container/40 transition-all"
                    />
                  </div>

                  {/* Platform Badge */}
                  <div className="mt-3 flex items-center gap-2 min-h-[28px]">
                    <AnimatePresence>
                      {isValidUrl(link) && linkPlatform !== 'unknown' && (
                        <motion.div
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          exit={{ opacity: 0, scale: 0.8 }}
                        >
                          <PlatformBadge platform={linkPlatform} />
                        </motion.div>
                      )}
                    </AnimatePresence>
                    <p className="text-[12px] text-on-surface-variant/60">
                      {linkPlatform === 'youtube'
                        ? 'We will fetch the video transcript for AI analysis.'
                        : linkPlatform === 'instagram'
                        ? 'We will extract the post caption and visuals for analysis.'
                        : 'Paste a YouTube or Instagram link to get started.'}
                    </p>
                  </div>

                  {/* Supported platforms info */}
                  <div className="mt-4 flex items-center gap-3 p-3 bg-surface-container/60 rounded-xl border border-outline-variant/20">
                    <span className="material-symbols-outlined text-[18px] text-on-surface-variant/60">info</span>
                    <p className="text-[12px] text-on-surface-variant/70">
                      <strong className="text-on-surface-variant">YouTube:</strong> Full transcript analysis.{' '}
                      <strong className="text-on-surface-variant">Instagram:</strong> Caption + image/reel analysis via AI.
                    </p>
                  </div>
                </motion.div>
              )}

            </AnimatePresence>
          </div>

          {/* ── Footer Actions ────────────────────────────────────────────────── */}
          <div className="flex items-center justify-between px-6 md:px-8 pb-6 pt-2 gap-4">
            {DEV_MODE && (
              <button
                type="button"
                onClick={fillDemo}
                disabled={isLoading}
                className="text-on-surface-variant text-[13px] font-semibold hover:text-on-surface transition-colors flex items-center gap-1.5"
              >
                <span className="material-symbols-outlined text-[16px]">magic_button</span>
                Fill Demo
              </button>
            )}
            {!DEV_MODE && <div />}

            <button
              id="analyze-submit-btn"
              type="submit"
              disabled={!canSubmit}
              className="relative flex items-center justify-center gap-2.5 bg-primary-container text-on-primary-container text-[14px] font-bold px-8 py-3.5 rounded-xl transition-all duration-200 disabled:opacity-40 disabled:cursor-not-allowed hover:enabled:bg-[#00e67a] hover:enabled:shadow-[0_0_24px_rgba(0,255,136,0.4)] active:enabled:scale-95"
            >
              {isLoading ? (
                <>
                  <div className="w-4 h-4 border-2 border-on-primary-container/30 border-t-on-primary-container rounded-full animate-spin" />
                  Analyzing...
                </>
              ) : (
                <>
                  <span className="material-symbols-outlined text-[20px]">
                    {mode === 'text' ? 'search' : mode === 'upload' ? 'document_scanner' : 'travel_explore'}
                  </span>
                  {mode === 'text' ? 'Verify This Claim' : mode === 'upload' ? 'Analyze Media' : 'Analyze Link'}
                </>
              )}
            </button>
          </div>
        </form>
      </div>

      {/* ── DEV MODE Badge ────────────────────────────────────────────────────── */}
      {DEV_MODE && (
        <div className="mt-4 text-center">
          <span className="inline-flex items-center gap-1.5 bg-surface-bright/50 px-3 py-1 rounded-full text-[10px] uppercase tracking-widest text-on-surface-variant font-bold border border-outline-variant/30">
            <span className="w-2 h-2 rounded-full bg-status-verified animate-pulse" />
            DEV MODE — No API Keys Required
          </span>
        </div>
      )}
    </motion.div>
  );
}

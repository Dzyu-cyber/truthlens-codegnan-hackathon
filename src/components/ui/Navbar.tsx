// components/ui/Navbar.tsx — Sleek, oval-shaped floating navbar with glowing logo and dynamic states

'use client';

import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

import LanguageSwitcher from './LanguageSwitcher';

interface NavbarProps {
  hasAnalysis: boolean;
  onNewAnalysis: () => void;
  onScrollTo: (sectionId: string) => void;
  activeSection: string;
}

export default function Navbar({ hasAnalysis, onNewAnalysis, onScrollTo, activeSection }: NavbarProps) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 40);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = hasAnalysis
    ? [
        { label: 'Verdict Report', id: 'verdict-top', icon: 'analytics' },
        { label: 'Priya AI Chat', id: 'priya-panel', icon: 'forum' },
      ]
    : [
        { label: 'Verify', id: 'verify', icon: 'fact_check' },
        { label: 'About OSINT', id: 'about', icon: 'fingerprint' },
        { label: 'Pricing', id: 'pricing', icon: 'payments' },
      ];

  return (
    <nav
      className={`fixed top-6 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 w-[calc(100%-2rem)] max-w-4xl rounded-full border border-outline-variant/30 backdrop-blur-xl px-6 md:px-8 h-14 flex items-center justify-between ${
        isScrolled
          ? 'bg-surface-container-lowest/80 shadow-[0_10px_40px_rgba(0,0,0,0.6)] border-primary-container/20'
          : 'bg-surface/5'
      }`}
    >
      {/* ── Floating Logo ── */}
      <div 
        onClick={() => {
          if (hasAnalysis) onNewAnalysis();
          else onScrollTo('verify');
        }}
        className="flex items-center gap-3 cursor-pointer group relative h-full"
      >
        <div className="relative w-9 h-9 flex items-center justify-center">
          {/* Neon Ring Glow */}
          <div className="absolute inset-0 bg-primary-container/30 rounded-full blur-md group-hover:bg-primary-container/50 transition-all duration-500 pointer-events-none scale-125" />
          
          {/* Dynamic Laser Radar Logo */}
          <svg className="w-7 h-7 relative z-10 text-primary-container group-hover:rotate-90 transition-transform duration-700" viewBox="0 0 100 100" fill="none">
            <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="6" strokeDasharray="30 15" />
            <circle cx="50" cy="50" r="22" stroke="currentColor" strokeWidth="8" />
            <circle cx="50" cy="50" r="8" fill="currentColor" className="animate-pulse" />
            <path d="M 50 10 L 50 35" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
            <path d="M 50 65 L 50 90" stroke="currentColor" strokeWidth="6" strokeLinecap="round" />
          </svg>
        </div>
        <span className="text-[18px] md:text-[20px] font-bold tracking-tight text-on-surface select-none">
          Truth<span className="text-primary-container font-black drop-shadow-[0_0_10px_rgba(0,255,136,0.3)]">Lens</span>
        </span>
      </div>

      {/* ── Navigation Links (Desktop) ── */}
      <div className="hidden md:flex items-center gap-6">
        {navLinks.map((link) => {
          const isActive = activeSection === link.id;
          return (
            <button
              key={link.id}
              onClick={() => onScrollTo(link.id)}
              className={`text-[12px] font-bold tracking-[0.12em] uppercase transition-all duration-200 relative py-1 flex items-center gap-1.5 hover:text-primary-container ${
                isActive ? 'text-primary-container font-black' : 'text-on-surface-variant'
              }`}
            >
              <span className="material-symbols-outlined text-[15px]">{link.icon}</span>
              {link.label}
              {isActive && (
                <motion.span
                  layoutId="activeNavIndicator"
                  className="absolute bottom-0 left-0 w-full h-[2px] bg-primary-container rounded-full"
                  transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                />
              )}
            </button>
          );
        })}
      </div>

      {/* ── Right-Side CTA / Action ── */}
      <div className="flex items-center gap-4">
        <LanguageSwitcher />
        {hasAnalysis ? (
          <button
            onClick={onNewAnalysis}
            className="btn-primary py-2 px-5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] transition-all bg-primary-container text-on-primary-container hover:bg-[#00ff88]"
          >
            New Analysis
          </button>
        ) : (
          <button
            onClick={() => onScrollTo('pricing')}
            className="hidden sm:block btn-primary py-2 px-5 text-[10px] font-bold uppercase tracking-wider rounded-full shadow-[0_0_20px_rgba(0,255,136,0.2)] hover:shadow-[0_0_35px_rgba(0,255,136,0.5)] transition-all bg-primary-container text-on-primary-container hover:bg-[#00ff88]"
          >
            Access OSINT Pro
          </button>
        )}

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden text-on-surface p-1 rounded-full hover:bg-surface-container-high transition-colors"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
        >
          <span className="material-symbols-outlined">{mobileMenuOpen ? 'close' : 'menu'}</span>
        </button>
      </div>

      {/* ── Mobile Menu Dropdown ── */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -20, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute top-full left-0 right-0 mt-4 md:hidden bg-surface-container-lowest/95 backdrop-blur-2xl border border-outline-variant/30 rounded-3xl overflow-hidden shadow-2xl p-6"
          >
            <div className="flex flex-col gap-4">
              {navLinks.map((link) => (
                <button
                  key={link.id}
                  onClick={() => {
                    onScrollTo(link.id);
                    setMobileMenuOpen(false);
                  }}
                  className="flex items-center gap-3 text-[14px] font-semibold text-on-surface hover:text-primary-container py-2 text-left"
                >
                  <span className="material-symbols-outlined text-[18px] text-primary-container">{link.icon}</span>
                  {link.label}
                </button>
              ))}
              {!hasAnalysis && (
                <button
                  onClick={() => {
                    onScrollTo('pricing');
                    setMobileMenuOpen(false);
                  }}
                  className="mt-2 w-full py-3 bg-primary-container text-on-primary-container font-bold rounded-2xl text-[12px] uppercase tracking-wider text-center"
                >
                  Access OSINT Pro
                </button>
              )}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}

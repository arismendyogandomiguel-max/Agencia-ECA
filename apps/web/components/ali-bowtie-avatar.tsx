'use client';

import React from 'react';

interface AlihasTuxedoAvatarProps {
  size?: number;
  active?: boolean;
  glow?: boolean;
  className?: string;
  onClick?: () => void;
  title?: string;
}

export const AlihasTuxedoAvatar: React.FC<AlihasTuxedoAvatarProps> = ({
  size = 48,
  active = false,
  glow = false,
  className = '',
  onClick,
  title = 'Alihas — Identidad Soberana',
}) => {
  return (
    <div
      onClick={onClick}
      title={title}
      className={`relative inline-flex items-center justify-center cursor-pointer select-none transition-transform hover:scale-105 active:scale-95 ${className}`}
      style={{ width: size, height: size }}
    >
      <svg
        viewBox="0 0 240 260"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full drop-shadow-md"
      >
        <defs>
          {/* Visible Spectrum Gradient for Bowtie (Alihas Spectrum) */}
          <linearGradient id="alihasSpectrum" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#ef4444" />
            <stop offset="20%" stopColor="#f97316" />
            <stop offset="40%" stopColor="#eab308" />
            <stop offset="60%" stopColor="#10b981" />
            <stop offset="80%" stopColor="#06b6d4" />
            <stop offset="100%" stopColor="#8b5cf6" />
          </linearGradient>

          {/* Active Glow Filter */}
          <filter id="bowGlow" x="-20%" y="-20%" width="140%" height="140%">
            <feGaussianBlur stdDeviation="6" result="blur" />
            <feComposite in="SourceGraphic" in2="blur" operator="over" />
          </filter>

          <linearGradient id="tuxedoBlack" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1f1f23" />
            <stop offset="100%" stopColor="#09090b" />
          </linearGradient>

          <linearGradient id="lapelGloss" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#27272a" />
            <stop offset="100%" stopColor="#141417" />
          </linearGradient>
        </defs>

        {/* ─── WHITE FORMAL SHIRT & COLLAR (NO FACE) ─── */}
        {/* Shirt body */}
        <path
          d="M 65 24 Q 120 48 175 24 L 160 140 L 120 248 L 80 140 Z"
          fill="#fafafa"
        />
        {/* Shirt Collar Bands */}
        <path
          d="M 65 22 Q 120 50 175 22 L 180 38 Q 120 68 60 38 Z"
          fill="#e4e4e7"
        />

        {/* ─── TUXEDO JACKET & PEAK LAPELS (ESMOQUIN) ─── */}
        {/* Left Lapel */}
        <path
          d="M 62 20 L 22 68 L 40 94 L 120 248 L 106 130 L 78 40 Z"
          fill="url(#tuxedoBlack)"
          stroke="#3f3f46"
          strokeWidth="1.5"
        />
        <path
          d="M 22 68 L 40 94 L 120 248"
          stroke="url(#lapelGloss)"
          strokeWidth="2"
        />

        {/* Right Lapel */}
        <path
          d="M 178 20 L 218 68 L 200 94 L 120 248 L 134 130 L 162 40 Z"
          fill="url(#tuxedoBlack)"
          stroke="#3f3f46"
          strokeWidth="1.5"
        />
        <path
          d="M 218 68 L 200 94 L 120 248"
          stroke="url(#lapelGloss)"
          strokeWidth="2"
        />

        {/* ─── THREE FORMAL BUTTONS (BOTONES NEGROS) ─── */}
        <circle cx="120" cy="112" r="3.5" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
        <circle cx="120" cy="148" r="3.5" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />
        <circle cx="120" cy="184" r="3.5" fill="#18181b" stroke="#71717a" strokeWidth="0.8" />

        {/* ─── THE METAMORPHIC BOWTIE (CORBATÍN ALIHAS) ─── */}
        <g
          filter={active || glow ? 'url(#bowGlow)' : undefined}
          className={active ? 'animate-pulse' : ''}
        >
          {/* Left Wing */}
          <path
            d="M 112 60 C 95 44 72 46 64 52 C 58 60 62 74 68 80 C 80 84 98 78 112 68 Z"
            fill={active ? 'url(#alihasSpectrum)' : '#18181b'}
            stroke={active ? '#ffffff' : '#52525b'}
            strokeWidth={active ? '2' : '1.5'}
          />
          {/* Right Wing */}
          <path
            d="M 128 60 C 145 44 168 46 176 52 C 182 60 178 74 172 80 C 160 84 142 78 128 68 Z"
            fill={active ? 'url(#alihasSpectrum)' : '#18181b'}
            stroke={active ? '#ffffff' : '#52525b'}
            strokeWidth={active ? '2' : '1.5'}
          />
          {/* Center Knot */}
          <rect
            x="110"
            y="56"
            width="20"
            height="16"
            rx="5"
            fill={active ? '#ffffff' : '#27272a'}
            stroke={active ? 'url(#alihasSpectrum)' : '#71717a'}
            strokeWidth="2"
          />
        </g>
      </svg>
    </div>
  );
};

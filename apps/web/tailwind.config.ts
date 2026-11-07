import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b',
        foreground: '#fafafa',
        card: {
          DEFAULT: '#18181b',
          hover: '#1f1f23',
        },
        border: {
          DEFAULT: '#27272a',
          subtle: '#1e1e22',
        },
        muted: {
          DEFAULT: '#a1a1aa',
          foreground: '#71717a',
        },
        accent: {
          DEFAULT: '#8b5cf6',
          dim: 'rgba(139, 92, 246, 0.15)',
        },
      },
    },
  },
  plugins: [],
};

export default config;

import type { Config } from 'tailwindcss';
import plugin from 'tailwindcss/plugin';

const config: Config = {
  content: ['./src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        // 昼の部 (Sunday Bowls) パレット
        day: {
          bg: '#FAF5EC',
          primary: '#3FA9A1',
          accent: '#E89B6C',
          secondary: '#7BA88B',
          text: '#2B3E3B',
        },
        // 夜の部 (Moonday Bar) パレット
        night: {
          bg: '#1A2030',
          primary: '#D17B4A',
          accent: '#E8B85C',
          secondary: '#4A6B5F',
          text: '#F2E8D5',
        },
      },
      fontFamily: {
        sans: ['var(--font-noto-sans-jp)', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'serif'],
        // モード別アクセント英字フォント
        'day-accent': ['var(--font-caveat)', 'cursive'],
        'night-accent': ['var(--font-cinzel)', 'serif'],
      },
      borderRadius: {
        // 昼=カジュアルな丸み (8–12px) / 夜=格式ある控えめな丸み (4–6px)
        'mode-sm': 'var(--mode-radius-sm)',
        'mode-md': 'var(--mode-radius-md)',
        'mode-lg': 'var(--mode-radius-lg)',
      },
      transitionDuration: {
        // モード切替クロスフェード時間
        'mode': '500ms',
      },
      keyframes: {
        'fade-in-up': {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-in-up': 'fade-in-up 0.6s ease-out forwards',
      },
    },
  },
  plugins: [
    plugin(({ addVariant }) => {
      // html[data-mode="..."] を祖先に持つ要素にスタイルを適用するカスタムバリアント
      addVariant('day', 'html[data-mode="day"] &');
      addVariant('night', 'html[data-mode="night"] &');
    }),
  ],
};

export default config;

import { Moon, Sun } from 'lucide-react';
import { useTheme } from '../../context/ThemeContext';

export default function ThemeToggle() {
  const { theme, toggleTheme } = useTheme();

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={theme === 'dark' ? 'Passer en mode clair' : 'Passer en mode nuit'}
      className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-medium
        text-slate-600 dark:text-white/60
        hover:text-slate-900 dark:hover:text-white
        hover:bg-slate-100 dark:hover:bg-white/5
        border border-slate-200 dark:border-white/10
        transition-colors"
    >
      {theme === 'dark' ? (
        <>
          <Sun size={14} className="text-orange-500" />
          <span className="hidden sm:inline">Mode clair</span>
        </>
      ) : (
        <>
          <Moon size={14} className="text-green-600" />
          <span className="hidden sm:inline">Mode nuit</span>
        </>
      )}
    </button>
  );
}

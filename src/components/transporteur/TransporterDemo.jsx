import { Link } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

import logoOcpv from '../../assets/logo_ocpv.png';
import ThemeToggle from '../agrilink/ThemeToggle';
import TransporterPhoneMockup from './TransporterPhoneMockup';
import TransporterInfoPanel from './TransporterInfoPanel';

export default function TransporterDemo() {
  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#121212] dark:text-white transition-colors">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50/95 dark:bg-[#121212]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link to="/" className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-orange-500 transition-colors">
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Cartographie</span>
          </Link>
          <img src={logoOcpv} alt="OCPV" className="h-7 w-auto rounded bg-white px-1 hidden sm:block" draggable={false} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-orange-500">Démo · Transporteur</p>
        <ThemeToggle />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-start">
          <div className="flex flex-col items-center w-full">
            <TransporterPhoneMockup />
            <p className="mt-4 text-[10px] text-center text-slate-400 dark:text-white/30 max-w-xs">
              Maquette Flutter · bourse logistique · paiement fret hors plateforme
            </p>
          </div>

          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-hidden flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 shadow-sm">
            <TransporterInfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

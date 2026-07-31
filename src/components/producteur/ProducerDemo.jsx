import { useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import { ArrowLeft, MessageCircle, Smartphone, Signal } from 'lucide-react';

import logoOcpv from '../../assets/logo_ocpv.png';
import ThemeToggle from '../agrilink/ThemeToggle';
import ProducerPhoneMockup from './ProducerPhoneMockup';
import UssdMockup from './UssdMockup';
import WhatsappVoiceMockup from './WhatsappVoiceMockup';
import ProducerInfoPanel from './ProducerInfoPanel';

export default function ProducerDemo() {
  const [searchParams] = useSearchParams();
  const requestedChannel = searchParams.get('channel');
  const [channel, setChannel] = useState(
    ['app', 'whatsapp', 'ussd'].includes(requestedChannel) ? requestedChannel : 'app',
  );

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#121212] dark:text-white transition-colors">
      <header className="sticky top-0 z-20 flex items-center justify-between px-4 sm:px-6 py-3 border-b border-slate-200 dark:border-white/5 bg-slate-50/95 dark:bg-[#121212]/95 backdrop-blur-sm">
        <div className="flex items-center gap-3">
          <Link
            to="/"
            className="flex items-center gap-1.5 text-sm text-slate-500 dark:text-white/50 hover:text-orange-500 transition-colors"
          >
            <ArrowLeft size={16} />
            <span className="hidden sm:inline">Cartographie</span>
          </Link>
          <img src={logoOcpv} alt="OCPV" className="h-7 w-auto rounded bg-white px-1 hidden sm:block" draggable={false} />
        </div>
        <p className="text-xs font-bold uppercase tracking-widest text-green-600 dark:text-green-500">
          Démo · Producteur
        </p>
        <ThemeToggle />
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 py-6 lg:py-8">
        <div className="grid lg:grid-cols-[1fr_1fr] gap-8 lg:gap-10 items-start">
          {/* Colonne mockup — plus large pour le téléphone */}
          <div className="flex flex-col items-center lg:items-center w-full">
            <div className="grid grid-cols-3 rounded-xl border border-slate-200 dark:border-white/10 p-1 bg-white dark:bg-[#1a1a1a] mb-6 w-full max-w-md">
              <button
                type="button"
                onClick={() => setChannel('app')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  channel === 'app'
                    ? 'bg-orange-500 text-white'
                    : 'text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Smartphone size={14} />
                App mobile
              </button>
              <button
                type="button"
                onClick={() => setChannel('whatsapp')}
                className={`flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-[11px] font-semibold transition-colors ${
                  channel === 'whatsapp'
                    ? 'bg-[#00a884] text-white'
                    : 'text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <MessageCircle size={14} />
                WhatsApp IA
              </button>
              <button
                type="button"
                onClick={() => setChannel('ussd')}
                className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-lg text-xs font-semibold transition-colors ${
                  channel === 'ussd'
                    ? 'bg-green-600 text-white'
                    : 'text-slate-500 dark:text-white/50 hover:bg-slate-50 dark:hover:bg-white/5'
                }`}
              >
                <Signal size={14} />
                USSD *555#
              </button>
            </div>

            {channel === 'app' && <ProducerPhoneMockup />}
            {channel === 'whatsapp' && <WhatsappVoiceMockup />}
            {channel === 'ussd' && <UssdMockup />}

            <p className="mt-4 text-[10px] text-center text-slate-400 dark:text-white/30 max-w-xs">
              {channel === 'app'
                ? 'Maquette Flutter · navigation bottom bar · déclaration en 3 étapes'
                : channel === 'whatsapp'
                  ? 'Assistant WhatsApp · dictée vocale · structuration automatique Voice-to-JSON'
                  : 'Maquette USSD · téléphone simple · confirmation par SMS structuré'}
            </p>
          </div>

          {/* Colonne descriptive */}
          <div className="lg:sticky lg:top-20 lg:max-h-[calc(100vh-6rem)] lg:overflow-hidden flex flex-col rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] p-5 sm:p-6 shadow-sm">
            <ProducerInfoPanel />
          </div>
        </div>
      </main>
    </div>
  );
}

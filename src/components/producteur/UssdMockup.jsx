import { useState, useEffect } from 'react';
import { Phone, PhoneOff, User } from 'lucide-react';

const GREEN_NUMBER = '800';
const GREEN_NUMBER_DISPLAY = '800';

const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

const KEY_LABELS = {
  2: 'ABC',
  3: 'DEF',
  4: 'GHI',
  5: 'JKL',
  6: 'MNO',
  7: 'PQRS',
  8: 'TUV',
  9: 'WXYZ',
};

function formatDialDisplay(digits) {
  const clean = digits.replace(/\D/g, '');
  if (!clean) return '';
  const parts = [];
  for (let i = 0; i < clean.length; i += 1) {
    if (i > 0 && i % 3 === 0) parts.push(' ');
    parts.push(clean[i]);
  }
  return parts.join('');
}

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-white bg-slate-900">
      <span>09:41</span>
      <div className="flex items-center gap-1">
        <span className="w-4 h-2 border border-white rounded-sm relative">
          <span className="absolute inset-0.5 bg-white rounded-[1px]" style={{ width: '65%' }} />
        </span>
      </div>
    </div>
  );
}

export default function UssdMockup() {
  const [digits, setDigits] = useState('');
  const [calling, setCalling] = useState(false);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!digits && !calling) {
        setDigits(GREEN_NUMBER);
      }
    }, 800);
    return () => clearTimeout(timer);
  }, [digits, calling]);

  const handleKey = (key) => {
    if (calling) return;
    if (key === '#') {
      setDigits((d) => d.slice(0, -1));
      return;
    }
    if (key === '*') {
      setDigits('');
      return;
    }
    setDigits((d) => (d.length < 12 ? d + key : d));
  };

  const startCall = () => {
    if (!digits) return;
    setCalling(true);
    setTimeout(() => setConnected(true), 2200);
  };

  const endCall = () => {
    setCalling(false);
    setConnected(false);
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl z-20" />
        <div className="bg-slate-900 rounded-[2.25rem] overflow-hidden h-[640px] flex flex-col relative">
          <PhoneStatusBar />

          {!calling ? (
            <>
              <div className="px-4 pt-2 pb-1">
                <p className="text-center text-xs text-slate-400">Composer</p>
              </div>

              <div className="flex-1 flex flex-col px-4 min-h-0">
                <div className="text-center py-6 shrink-0">
                  <p className="text-3xl font-light text-white tracking-widest min-h-[2.5rem]">
                    {formatDialDisplay(digits) || ' '}
                  </p>
                  <p className="text-sm text-green-400 font-medium mt-2">Numéro vert OCPV</p>
                  <p className="text-xs text-slate-500 mt-0.5">
                    {digits === GREEN_NUMBER ? 'Ligne gratuite · agents disponibles 7j/7' : 'Appuyez sur le combiné pour appeler'}
                  </p>
                </div>

                <div className="grid grid-cols-3 gap-3 px-2 flex-1 content-center max-h-[340px]">
                  {KEYPAD.flat().map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleKey(key)}
                      className="flex flex-col items-center justify-center h-16 rounded-full bg-slate-800/80 active:bg-slate-700 transition-colors"
                    >
                      <span className="text-2xl font-light text-white">{key}</span>
                      {KEY_LABELS[key] && (
                        <span className="text-[8px] text-slate-500 tracking-widest">{KEY_LABELS[key]}</span>
                      )}
                    </button>
                  ))}
                </div>

                <div className="grid grid-cols-3 gap-3 px-2 py-6 shrink-0 items-center">
                  <div />
                  <button
                    type="button"
                    onClick={startCall}
                    disabled={!digits}
                    className="flex items-center justify-center h-16 w-16 mx-auto rounded-full bg-green-500 disabled:bg-green-500/30 active:scale-95 transition-transform shadow-lg shadow-green-500/30"
                  >
                    <Phone size={28} className="text-white" fill="white" />
                  </button>
                  <button
                    type="button"
                    onClick={() => setDigits((d) => d.slice(0, -1))}
                    className="text-sm text-slate-400 font-medium justify-self-center"
                  >
                    Effacer
                  </button>
                </div>
              </div>
            </>
          ) : (
            <div className="flex-1 flex flex-col items-center justify-center px-6 text-center">
              <div className="w-24 h-24 rounded-full bg-green-500/20 flex items-center justify-center mb-6">
                {connected ? (
                  <User size={40} className="text-green-400" />
                ) : (
                  <Phone size={36} className="text-green-400 animate-pulse" />
                )}
              </div>
              <p className="text-xl font-semibold text-white">
                {connected ? 'Agent OCPV' : 'Appel en cours…'}
              </p>
              <p className="text-green-400 text-lg mt-1 font-medium">{GREEN_NUMBER_DISPLAY}</p>
              <p className="text-sm text-slate-400 mt-3">
                {connected
                  ? 'Bonjour Kouassi, je peux enregistrer votre déclaration de récolte par téléphone.'
                  : 'Connexion au centre d\'appels OCPV…'}
              </p>
              {connected && (
                <div className="mt-6 p-4 rounded-2xl bg-slate-800/80 w-full text-left text-sm text-slate-300 space-y-1">
                  <p>• Déclaration de disponibilité</p>
                  <p>• Suivi de vos lots</p>
                  <p>• Aide sans smartphone</p>
                </div>
              )}
              <button
                type="button"
                onClick={endCall}
                className="mt-10 flex items-center justify-center h-16 w-16 rounded-full bg-red-500 active:scale-95 transition-transform shadow-lg shadow-red-500/30"
              >
                <PhoneOff size={28} className="text-white" />
              </button>
            </div>
          )}

          <div className="px-4 py-3 bg-slate-950/80 border-t border-slate-800 text-center shrink-0">
            <span className="text-[10px] text-slate-500">
              Sans smartphone · numéro vert · même backend AGRILINK-CI
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

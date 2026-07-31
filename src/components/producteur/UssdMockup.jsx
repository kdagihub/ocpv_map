import { useEffect, useState } from 'react';
import { CheckCircle2, MessageSquareText, Phone, RotateCcw, Signal } from 'lucide-react';

const USSD_CODE = '*555#';
const KEYPAD = [
  ['1', '2', '3'],
  ['4', '5', '6'],
  ['7', '8', '9'],
  ['*', '0', '#'],
];

const MENUS = {
  home: {
    title: 'AGRILINK-CI',
    body: ['1. Déclarer une récolte', '2. Suivre un lot', '3. Consulter les prix', '4. Parler à un agent'],
    hint: 'Répondez 1, 2, 3 ou 4',
  },
  product: {
    title: 'Choisissez le produit',
    body: ['1. Igname', '2. Manioc', '3. Banane plantain', '4. Maïs'],
    hint: 'Répondez 1 à 4',
  },
  quantity: {
    title: 'Quantité disponible',
    body: ['Saisissez le nombre de tonnes.', 'Exemple : 5'],
    hint: 'Quantité en tonnes',
  },
  confirm: {
    title: 'Confirmer la déclaration',
    body: ['Produit : Manioc', 'Quantité : 5 tonnes', 'Hub : Bouaké Centre', '', '1. Confirmer   2. Annuler'],
    hint: 'Répondez 1 pour confirmer',
  },
};

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between bg-slate-950 px-5 pb-1 pt-2 text-[10px] font-semibold text-white">
      <span>09:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-bold text-green-400">2G</span>
        <Signal size={12} />
        <span className="h-2 w-4 rounded-sm border border-white">
          <span className="block h-full w-2/3 bg-white" />
        </span>
      </div>
    </div>
  );
}

export default function UssdMockup() {
  const [digits, setDigits] = useState('');
  const [screen, setScreen] = useState('dial');
  const [step, setStep] = useState('home');
  const [answer, setAnswer] = useState('');

  useEffect(() => {
    const timer = setTimeout(() => {
      if (!digits && screen === 'dial') setDigits(USSD_CODE);
    }, 500);
    return () => clearTimeout(timer);
  }, [digits, screen]);

  const handleDialKey = (key) => {
    if (screen !== 'dial') return;
    setDigits((value) => (value.length < 12 ? value + key : value));
  };

  const startSession = () => {
    if (digits !== USSD_CODE) return;
    setScreen('session');
    setStep('home');
    setAnswer('');
  };

  const nextStep = () => {
    if (!answer) return;
    if (step === 'home' && answer === '1') setStep('product');
    else if (step === 'product' && answer === '2') setStep('quantity');
    else if (step === 'quantity') setStep('confirm');
    else if (step === 'confirm' && answer === '1') setScreen('success');
    setAnswer('');
  };

  const reset = () => {
    setDigits(USSD_CODE);
    setScreen('dial');
    setStep('home');
    setAnswer('');
  };

  const menu = MENUS[step];

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
        <div className="relative flex h-[640px] flex-col overflow-hidden rounded-[2.25rem] bg-slate-950">
          <PhoneStatusBar />

          {screen === 'dial' && (
            <>
              <div className="px-4 pb-1 pt-4">
                <p className="text-center text-xs text-slate-400">Code USSD AGRILINK-CI</p>
              </div>
              <div className="flex min-h-0 flex-1 flex-col px-4">
                <div className="shrink-0 py-7 text-center">
                  <p className="min-h-[2.5rem] text-3xl font-light tracking-widest text-white">{digits || ' '}</p>
                  <p className="mt-2 text-sm font-bold text-green-400">Service agricole sans internet</p>
                  <p className="mt-1 text-xs text-slate-500">Disponible sur téléphone simple · réseau 2G</p>
                </div>
                <div className="grid max-h-[330px] flex-1 grid-cols-3 content-center gap-3 px-2">
                  {KEYPAD.flat().map((key) => (
                    <button
                      key={key}
                      type="button"
                      onClick={() => handleDialKey(key)}
                      className="flex h-16 items-center justify-center rounded-full bg-slate-800/80 text-2xl font-light text-white transition active:bg-slate-700"
                    >
                      {key}
                    </button>
                  ))}
                </div>
                <div className="grid shrink-0 grid-cols-3 items-center gap-3 px-2 py-6">
                  <button type="button" onClick={() => setDigits('')} className="text-xs font-bold text-slate-500">Effacer</button>
                  <button
                    type="button"
                    onClick={startSession}
                    disabled={digits !== USSD_CODE}
                    className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-500 shadow-lg shadow-green-500/30 transition active:scale-95 disabled:bg-green-900"
                  >
                    <Phone size={27} className="text-white" fill="white" />
                  </button>
                  <span />
                </div>
              </div>
            </>
          )}

          {screen === 'session' && (
            <div className="flex flex-1 flex-col bg-slate-100 px-4 py-6">
              <div className="mt-8 overflow-hidden rounded-2xl bg-white shadow-xl ring-1 ring-slate-200">
                <div className="border-b border-slate-100 bg-green-700 px-4 py-3 text-white">
                  <p className="text-[9px] font-bold uppercase tracking-[0.18em] text-green-200">Session *555#</p>
                  <h2 className="mt-1 text-base font-black">{menu.title}</h2>
                </div>
                <div className="min-h-[190px] whitespace-pre-line px-4 py-4 text-sm leading-7 text-slate-800">
                  {menu.body.map((line, index) => <p key={`${line}-${index}`}>{line || '\u00A0'}</p>)}
                </div>
                <div className="border-t border-slate-100 p-3">
                  <label className="text-[10px] font-bold uppercase text-slate-400">{menu.hint}</label>
                  <input
                    autoFocus
                    value={answer}
                    onChange={(event) => setAnswer(event.target.value.replace(/\D/g, '').slice(0, 2))}
                    onKeyDown={(event) => event.key === 'Enter' && nextStep()}
                    inputMode="numeric"
                    className="mt-1 w-full rounded-lg border-2 border-slate-200 px-3 py-2.5 text-lg font-black outline-none focus:border-green-600"
                  />
                </div>
                <div className="flex border-t border-slate-100">
                  <button type="button" onClick={reset} className="flex-1 py-3 text-xs font-bold text-slate-500">Annuler</button>
                  <button type="button" onClick={nextStep} disabled={!answer} className="flex-1 bg-green-700 py-3 text-xs font-black text-white disabled:bg-slate-300">
                    Envoyer
                  </button>
                </div>
              </div>
              <p className="mt-4 text-center text-[10px] leading-relaxed text-slate-500">
                Les réponses sont structurées et injectées dans le même système AGRILINK-CI.
              </p>
            </div>
          )}

          {screen === 'success' && (
            <div className="flex flex-1 flex-col items-center justify-center bg-slate-100 px-6 text-center">
              <span className="grid h-20 w-20 place-items-center rounded-full bg-green-100 text-green-700">
                <CheckCircle2 size={42} />
              </span>
              <h2 className="mt-5 text-xl font-black text-slate-900">Déclaration enregistrée</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-500">
                Votre lot de 5 tonnes de manioc est transmis à l&apos;Antenne OCPV de Bouaké.
              </p>
              <div className="mt-6 w-full rounded-2xl border border-blue-200 bg-blue-50 p-4 text-left">
                <div className="flex items-center gap-2 text-blue-800">
                  <MessageSquareText size={17} />
                  <p className="text-xs font-black">SMS de confirmation</p>
                </div>
                <p className="mt-2 text-[11px] leading-relaxed text-blue-900">
                  AGRILINK : déclaration OCPV-BKE-2026-468 reçue. 5 t Manioc · Hub Bouaké. Conservez ce SMS.
                </p>
              </div>
              <button type="button" onClick={reset} className="mt-7 flex items-center gap-2 rounded-xl bg-slate-900 px-5 py-3 text-xs font-bold text-white">
                <RotateCcw size={14} /> Rejouer le parcours
              </button>
            </div>
          )}

          <div className="shrink-0 border-t border-slate-800 bg-slate-950/90 px-4 py-3 text-center">
            <span className="text-[10px] text-slate-500">USSD *555# · SMS structuré · aucune donnée mobile requise</span>
          </div>
        </div>
      </div>
    </div>
  );
}

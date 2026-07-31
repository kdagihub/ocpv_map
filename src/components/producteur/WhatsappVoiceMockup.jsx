import { useState } from 'react';
import {
  Bot,
  CheckCheck,
  ChevronLeft,
  Mic,
  MoreVertical,
  Phone,
  RotateCcw,
  Send,
  Sparkles,
  Volume2,
} from 'lucide-react';
import logoOcpv from '../../assets/logo_ocpv.png';

const VOICE_TEXT = 'J’ai récolté cinq tonnes de manioc à Brobo. Je veux les envoyer au Hub de Bouaké demain matin.';

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between bg-[#075e54] px-5 pb-1 pt-2 text-[10px] font-semibold text-white">
      <span>09:41</span>
      <div className="flex items-center gap-1.5">
        <span className="text-[8px] font-bold">4G</span>
        <span className="h-2 w-4 rounded-sm border border-white">
          <span className="block h-full w-2/3 bg-white" />
        </span>
      </div>
    </div>
  );
}

function VoiceWave({ active = false }) {
  return (
    <div className="flex h-7 items-center gap-[3px]" aria-hidden>
      {[8, 16, 11, 22, 15, 25, 12, 19, 8, 14, 6].map((height, index) => (
        <span
          key={`${height}-${index}`}
          className={`w-[3px] rounded-full ${active ? 'animate-pulse bg-red-500' : 'bg-[#00a884]'}`}
          style={{ height: `${height}px`, animationDelay: `${index * 70}ms` }}
        />
      ))}
    </div>
  );
}

export default function WhatsappVoiceMockup() {
  const [stage, setStage] = useState('ready');

  const startVoice = () => {
    if (stage !== 'ready') return;
    setStage('listening');
    setTimeout(() => {
      setStage('transcribed');
      setTimeout(() => setStage('structured'), 900);
    }, 1500);
  };

  const reset = () => setStage('ready');

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="overflow-hidden rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl">
        <div className="absolute left-1/2 top-0 z-20 h-7 w-28 -translate-x-1/2 rounded-b-2xl bg-slate-800" />
        <div className="relative flex h-[640px] flex-col overflow-hidden rounded-[2.25rem] bg-[#efeae2]">
          <PhoneStatusBar />

          <div className="flex items-center gap-2 bg-[#075e54] px-3 py-2.5 text-white shadow">
            <ChevronLeft size={20} />
            <span className="grid h-9 w-9 place-items-center overflow-hidden rounded-full bg-white">
              <img src={logoOcpv} alt="OCPV" className="h-7 w-auto" draggable={false} />
            </span>
            <div className="min-w-0 flex-1">
              <p className="truncate text-sm font-bold">Assistant AGRILINK-CI</p>
              <p className="flex items-center gap-1 text-[9px] text-white/70">
                <Bot size={10} /> Service officiel OCPV
              </p>
            </div>
            <Phone size={17} />
            <MoreVertical size={18} />
          </div>

          <div className="flex-1 space-y-3 overflow-y-auto p-3">
            <div className="mx-auto w-max rounded-full bg-white/80 px-3 py-1 text-[8px] font-bold text-slate-500 shadow-sm">
              AUJOURD’HUI
            </div>

            <div className="max-w-[86%] rounded-2xl rounded-tl-sm bg-white p-3 text-[11px] leading-relaxed text-slate-800 shadow-sm">
              <p className="font-bold text-[#075e54]">Bonjour Bernard 👋🏾</p>
              <p className="mt-1">
                Dites-moi simplement ce que vous avez récolté. Vous pouvez parler en français courant : je remplirai la déclaration pour vous.
              </p>
              <div className="mt-2 flex justify-end gap-1 text-[8px] text-slate-400">
                09:40 <CheckCheck size={11} className="text-blue-500" />
              </div>
            </div>

            {stage === 'listening' && (
              <div className="ml-auto max-w-[86%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-9 w-9 place-items-center rounded-full bg-red-500 text-white">
                    <Mic size={18} />
                  </span>
                  <VoiceWave active />
                  <span className="ml-auto text-[10px] font-bold text-red-600">00:04</span>
                </div>
                <p className="mt-2 text-[9px] font-bold text-red-600">Écoute en cours… parlez naturellement</p>
              </div>
            )}

            {['transcribed', 'structured', 'confirmed'].includes(stage) && (
              <div className="ml-auto max-w-[88%] rounded-2xl rounded-tr-sm bg-[#d9fdd3] p-3 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="grid h-8 w-8 shrink-0 place-items-center rounded-full bg-[#00a884] text-white">
                    <Volume2 size={16} />
                  </span>
                  <VoiceWave />
                  <span className="ml-auto text-[9px] text-slate-500">0:09</span>
                </div>
                <p className="mt-2 border-t border-black/5 pt-2 text-[10px] italic leading-relaxed text-slate-600">
                  « {VOICE_TEXT} »
                </p>
                <div className="mt-1 flex justify-end gap-1 text-[8px] text-slate-400">
                  09:41 <CheckCheck size={11} className="text-blue-500" />
                </div>
              </div>
            )}

            {stage === 'transcribed' && (
              <div className="flex w-max items-center gap-1 rounded-2xl rounded-tl-sm bg-white px-3 py-2 shadow-sm">
                {[0, 1, 2].map((dot) => (
                  <span key={dot} className="h-1.5 w-1.5 animate-bounce rounded-full bg-slate-400" style={{ animationDelay: `${dot * 120}ms` }} />
                ))}
                <span className="ml-1 text-[9px] text-slate-400">L’IA structure la déclaration</span>
              </div>
            )}

            {['structured', 'confirmed'].includes(stage) && (
              <div className="max-w-[90%] overflow-hidden rounded-2xl rounded-tl-sm bg-white shadow-sm">
                <div className="flex items-center gap-2 bg-green-50 px-3 py-2 text-green-800">
                  <Sparkles size={14} />
                  <p className="text-[9px] font-black uppercase tracking-wider">Déclaration comprise</p>
                  <span className="ml-auto rounded-full bg-white px-2 py-0.5 text-[8px] font-bold">96 %</span>
                </div>
                <div className="grid grid-cols-2 gap-px bg-slate-100 text-[10px]">
                  {[
                    ['Produit', 'Manioc'],
                    ['Quantité', '5 tonnes'],
                    ['Collecte', 'Brobo'],
                    ['Destination', 'Hub Bouaké'],
                    ['Date', 'Demain matin'],
                    ['Canal', 'WhatsApp vocal'],
                  ].map(([label, value]) => (
                    <div key={label} className="bg-white p-2.5">
                      <p className="text-[8px] font-bold uppercase text-slate-400">{label}</p>
                      <p className="mt-0.5 font-extrabold text-slate-800">{value}</p>
                    </div>
                  ))}
                </div>
                {stage === 'structured' ? (
                  <div className="flex border-t border-slate-100">
                    <button type="button" onClick={reset} className="flex-1 py-3 text-[10px] font-bold text-slate-500">
                      Corriger
                    </button>
                    <button type="button" onClick={() => setStage('confirmed')} className="flex-1 bg-[#00a884] py-3 text-[10px] font-black text-white">
                      Confirmer
                    </button>
                  </div>
                ) : (
                  <div className="bg-green-50 p-3 text-[10px] leading-relaxed text-green-800">
                    <p className="font-black">✓ Déclaration OCPV-BKE-2026-471 créée</p>
                    <p className="mt-1">L’Antenne de Bouaké vous contactera. Un SMS de preuve vous sera également envoyé.</p>
                  </div>
                )}
              </div>
            )}
          </div>

          <div className="flex items-center gap-2 bg-[#f0f2f5] p-2">
            <div className="flex h-11 flex-1 items-center rounded-full bg-white px-4 text-[11px] text-slate-400">
              Message
            </div>
            {stage === 'ready' ? (
              <button
                type="button"
                onClick={startVoice}
                className="grid h-11 w-11 place-items-center rounded-full bg-[#00a884] text-white shadow-lg shadow-green-900/20"
                aria-label="Dicter ma récolte"
              >
                <Mic size={20} />
              </button>
            ) : stage === 'confirmed' ? (
              <button type="button" onClick={reset} className="grid h-11 w-11 place-items-center rounded-full bg-slate-700 text-white" aria-label="Rejouer">
                <RotateCcw size={18} />
              </button>
            ) : (
              <button type="button" className="grid h-11 w-11 place-items-center rounded-full bg-[#00a884] text-white" aria-label="Envoyer">
                <Send size={18} />
              </button>
            )}
          </div>

          <div className="shrink-0 bg-slate-950 px-4 py-2.5 text-center">
            <span className="text-[9px] text-slate-500">WhatsApp vocal → Voice-to-JSON → déclaration AGRILINK-CI</span>
          </div>
        </div>
      </div>
      {stage === 'ready' && (
        <p className="mt-3 text-center text-[10px] font-bold text-green-700 dark:text-green-400">
          Appuyez sur le micro vert pour lancer la démonstration
        </p>
      )}
    </div>
  );
}

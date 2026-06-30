import { useState } from 'react';
import {
  ClipboardList,
  User,
  Plus,
  MapPin,
  Phone,
  ChevronRight,
  X,
  Save,
  Lock,
  ShoppingCart,
  AlertCircle,
} from 'lucide-react';
import logoOcpv from '../../assets/logo_ocpv.png';
import imgVehiculeDispo from '../../assets/vehicule_dispo.png';
import imgVehiculeDispo2 from '../../assets/vehicule_dispo2.png';
import imgParcAuto from '../../assets/parc_auto.png';
import imgMarketplace from '../../assets/marketpalce_icone.png';
import {
  TRANSPORTER_PROFILE,
  INITIAL_FLEET,
  INITIAL_TARIFF_LINES,
  TRANSPORT_REQUESTS,
  MARKETPLACE_PREVIEW,
  INITIAL_AVAILABILITIES,
} from './transporterData';

const NAV_SIDE = [
  { id: 'demandes', label: 'Demandes', icon: ClipboardList },
  { id: 'dispos', label: 'Dispos', image: imgVehiculeDispo },
];

const NAV_SIDE_RIGHT = [
  { id: 'parc', label: 'Parc', image: imgParcAuto },
  { id: 'compte', label: 'Compte', icon: User },
];

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-slate-900 bg-white">
      <span>09:41</span>
      <div className="w-4 h-2 border border-slate-900 rounded-sm relative">
        <span className="absolute inset-0.5 bg-slate-900 rounded-[1px]" style={{ width: '70%' }} />
      </div>
    </div>
  );
}

function NavIcon({ item, active }) {
  if (item.image) {
    return (
      <span className="flex h-[22px] w-[22px] items-center justify-center shrink-0">
        <img
          src={item.image}
          alt=""
          className={`max-h-full max-w-full object-contain ${active ? 'opacity-100' : 'opacity-40'}`}
          draggable={false}
        />
      </span>
    );
  }
  const Icon = item.icon;
  return <Icon size={18} strokeWidth={active ? 2.5 : 2} />;
}

function PublishDispoScreen({ fleet, onBack, onSave }) {
  const [vehicule, setVehicule] = useState(fleet[0]?.immat || '');
  const [zone, setZone] = useState('Gbêkê · Bouaké');
  const [date, setDate] = useState('18–25/06/2026');

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
        <h2 className="text-lg font-bold text-slate-900">Publier disponibilité</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Véhicule</label>
          <select value={vehicule} onChange={(e) => setVehicule(e.target.value)} className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm">
            {fleet.map((v) => <option key={v.id} value={v.immat}>{v.immat} · {v.tonnage}</option>)}
          </select>
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Zone / ligne</label>
          <input value={zone} onChange={(e) => setZone(e.target.value)} className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Période</label>
          <input value={date} onChange={(e) => setDate(e.target.value)} className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm" />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <button type="button" onClick={() => onSave({ vehicule, zone, date })} className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold">
          Publier sur la bourse
        </button>
      </div>
    </div>
  );
}

function AddTariffScreen({ onBack, onSave }) {
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [prix, setPrix] = useState('');

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
        <h2 className="text-lg font-bold text-slate-900">Nouvelle ligne tarifaire</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Départ</label>
          <input value={from} onChange={(e) => setFrom(e.target.value)} placeholder="Bouaké" className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Arrivée</label>
          <input value={to} onChange={(e) => setTo(e.target.value)} placeholder="Abidjan" className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm" />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Tarif (F/t ou forfait)</label>
          <input value={prix} onChange={(e) => setPrix(e.target.value)} placeholder="185 000 F/t" className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm" />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <button type="button" disabled={!from || !to || !prix} onClick={() => onSave({ from, to, prix })} className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold disabled:opacity-40">
          Enregistrer la ligne
        </button>
      </div>
    </div>
  );
}

function SwitchRoleModal({ onClose }) {
  return (
    <div className="absolute inset-0 z-40 flex items-end justify-center bg-black/40 p-4">
      <div className="w-full max-w-sm rounded-2xl bg-white p-5 shadow-xl">
        <div className="flex items-center gap-2 text-orange-600 mb-2">
          <AlertCircle size={20} />
          <p className="font-bold text-slate-900">Compte Acheteur requis</p>
        </div>
        <p className="text-sm text-slate-600 leading-relaxed">
          L&apos;achat de produits passe par un <strong>compte Acheteur</strong> distinct (même numéro, rôle RBAC différent).
        </p>
        <button type="button" onClick={onClose} className="mt-4 w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm">
          Compris
        </button>
      </div>
    </div>
  );
}

export default function TransporterPhoneMockup() {
  const [tab, setTab] = useState('demandes');
  const [parcView, setParcView] = useState('fleet');
  const [screen, setScreen] = useState('main');
  const [toast, setToast] = useState(null);
  const [showRoleModal, setShowRoleModal] = useState(false);

  const [fleet] = useState(INITIAL_FLEET);
  const [tariffs, setTariffs] = useState(INITIAL_TARIFF_LINES);
  const [availabilities, setAvailabilities] = useState(INITIAL_AVAILABILITIES);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const hideNav = screen !== 'main';

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl z-20" />
        <div className="bg-white rounded-[2.25rem] overflow-hidden h-[640px] flex flex-col relative">
          <PhoneStatusBar />

          {toast && (
            <div className="absolute top-12 left-3 right-3 z-30 py-2 px-3 rounded-xl bg-green-600 text-white text-xs font-semibold text-center">
              {toast}
              <button type="button" onClick={() => setToast(null)} className="ml-2"><X size={12} /></button>
            </div>
          )}

          {showRoleModal && <SwitchRoleModal onClose={() => setShowRoleModal(false)} />}

          <div className="flex-1 min-h-0 overflow-hidden">
            {screen === 'publish-dispo' ? (
              <PublishDispoScreen
                fleet={fleet}
                onBack={() => setScreen('main')}
                onSave={(d) => {
                  setAvailabilities((prev) => [...prev, { id: `a${Date.now()}`, vehicule: d.vehicule, zone: d.zone, date: d.date, tonnage: 'Publié' }]);
                  setScreen('main');
                  setTab('dispos');
                  showToast('Disponibilité publiée');
                }}
              />
            ) : screen === 'add-tariff' ? (
              <AddTariffScreen
                onBack={() => { setScreen('main'); setTab('parc'); setParcView('tarifs'); }}
                onSave={(d) => {
                  setTariffs((prev) => [...prev, { id: `l${Date.now()}`, from: d.from, to: d.to, prix: d.prix, actif: true }]);
                  setScreen('main');
                  setTab('parc');
                  setParcView('tarifs');
                  showToast('Ligne tarifaire ajoutée');
                }}
              />
            ) : screen === 'marketplace' ? (
              <div className="flex flex-col h-full min-h-0 bg-slate-50">
                <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
                  <button type="button" onClick={() => setScreen('main')} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
                  <h2 className="text-lg font-bold text-slate-900">Marketplace OCPV</h2>
                  <p className="text-[10px] text-slate-500">Consultation seule · rôle Transporteur</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {MARKETPLACE_PREVIEW.map((lot) => (
                    <div key={lot.id} className="p-3 rounded-xl bg-white border border-slate-100">
                      <p className="text-sm font-bold text-slate-900">{lot.produit} · {lot.qte}</p>
                      <p className="text-xs text-orange-600">{lot.prix}</p>
                      <button type="button" onClick={() => setShowRoleModal(true)} className="mt-2 w-full py-2 rounded-lg bg-slate-100 text-slate-700 text-xs font-semibold flex items-center justify-center gap-1">
                        <ShoppingCart size={14} /> Acheter → compte Acheteur
                      </button>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {tab === 'demandes' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-1">
                        <img src={logoOcpv} alt="" className="h-5 w-auto" draggable={false} />
                        <span className="text-[10px] text-slate-400">AGRILINK Transporteur</span>
                      </div>
                      <h2 className="text-lg font-bold text-slate-900">Demandes de transport</h2>
                      <p className="text-xs text-slate-500">Acheteurs · OCPV · paiement direct avec vous</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      <button type="button" onClick={() => setScreen('marketplace')} className="w-full flex items-center gap-2 p-3 rounded-xl bg-slate-100 border border-slate-200 text-left mb-2">
                        <img src={imgMarketplace} alt="" className="w-10 h-10 rounded-lg object-cover shrink-0" draggable={false} />
                        <div className="flex-1 min-w-0">
                          <p className="text-xs font-bold text-slate-800">Voir la marketplace OCPV</p>
                          <p className="text-[10px] text-slate-500">Achat → basculer compte Acheteur</p>
                        </div>
                        <ChevronRight size={14} />
                      </button>
                      {TRANSPORT_REQUESTS.map((req) => (
                        <div key={req.id} className="p-3 rounded-xl bg-white border border-slate-100">
                          <p className="text-sm font-bold text-slate-900">{req.trajet}</p>
                          <p className="text-xs text-slate-600">{req.produit}</p>
                          <p className="text-[10px] text-slate-400 mt-1">{req.from} · {req.date}</p>
                          <a href="tel:+2250755667788" className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-orange-500/10 text-orange-700 text-xs font-semibold">
                            <Phone size={14} /> Contacter · paiement hors plateforme
                          </a>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'dispos' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Mes disponibilités</h2>
                      <p className="text-xs text-slate-500">Véhicules publiés sur la bourse</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {availabilities.map((a) => (
                        <div key={a.id} className="p-3 rounded-xl bg-white border border-slate-100">
                          <div className="flex items-center gap-2">
                            <img src={imgVehiculeDispo} alt="" className="w-5 h-5 object-contain" draggable={false} />
                            <p className="text-sm font-bold text-slate-900">{a.vehicule}</p>
                          </div>
                          <p className="text-xs text-slate-500 mt-1"><MapPin size={10} className="inline" /> {a.zone}</p>
                          <p className="text-[10px] text-slate-400">{a.date} · {a.tonnage}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'parc' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Mon parc</h2>
                      <div className="flex mt-2 rounded-lg border border-slate-200 p-0.5">
                        {[
                          { id: 'fleet', label: 'Parc auto' },
                          { id: 'tarifs', label: 'Tarifs' },
                        ].map(({ id, label }) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setParcView(id)}
                            className={`flex-1 py-1.5 text-xs font-semibold rounded-md ${parcView === id ? 'bg-orange-500 text-white' : 'text-slate-500'}`}
                          >
                            {label}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {parcView === 'fleet' ? (
                        <>
                          {fleet.map((v) => (
                            <div key={v.id} className="p-3 rounded-xl bg-white border border-slate-100 flex items-start gap-3">
                              <img src={imgParcAuto} alt="" className="w-8 h-8 object-contain shrink-0 opacity-80" draggable={false} />
                              <div>
                                <p className="text-sm font-bold text-slate-900">{v.type} · {v.tonnage}</p>
                                <p className="text-xs font-mono text-slate-500">{v.immat}</p>
                                <span className={`text-[10px] font-semibold ${v.etat === 'Disponible' ? 'text-green-600' : 'text-amber-600'}`}>{v.etat}</span>
                              </div>
                            </div>
                          ))}
                          <button type="button" className="w-full py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 text-sm font-semibold">
                            + Ajouter un véhicule
                          </button>
                        </>
                      ) : (
                        <>
                          <button type="button" onClick={() => setScreen('add-tariff')} className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl bg-orange-500/10 text-orange-700 text-xs font-bold border border-orange-500/20 mb-1">
                            <Plus size={14} /> Nouvelle ligne tarifaire
                          </button>
                          {tariffs.map((l) => (
                            <div key={l.id} className={`p-3 rounded-xl border ${l.actif ? 'bg-white border-slate-100' : 'bg-slate-50 border-slate-200 opacity-60'}`}>
                              <p className="text-sm font-bold text-slate-900">{l.from} → {l.to}</p>
                              <p className="text-xs font-semibold text-orange-600">{l.prix}</p>
                            </div>
                          ))}
                        </>
                      )}
                    </div>
                  </div>
                )}

                {tab === 'compte' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Mon compte</h2>
                      <p className="text-xs text-slate-500">Rôle : Transporteur</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">Entreprise <Lock size={10} /></label>
                        <p className="mt-1 text-sm bg-slate-100 rounded-xl px-3 py-2.5">{TRANSPORTER_PROFILE.entreprise}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">ID transporteur <Lock size={10} /></label>
                        <p className="mt-1 text-sm bg-slate-100 rounded-xl px-3 py-2.5 font-mono">{TRANSPORTER_PROFILE.idTransporteur}</p>
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Téléphone</label>
                        <input defaultValue={TRANSPORTER_PROFILE.tel} className="mt-1 w-full text-sm rounded-xl px-3 py-2.5 border-2 border-slate-200" />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Zones couvertes</label>
                        <input defaultValue={TRANSPORTER_PROFILE.zones} className="mt-1 w-full text-sm rounded-xl px-3 py-2.5 border-2 border-slate-200" />
                      </div>
                      <button type="button" className="w-full py-3 rounded-xl bg-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2">
                        <Save size={16} /> Enregistrer
                      </button>
                    </div>
                  </div>
                )}
              </>
            )}
          </div>

          {!hideNav && (
            <nav className="relative flex items-end border-t border-slate-100 bg-white pb-2 pt-1 shrink-0 px-1">
              {NAV_SIDE.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-1.5 ${tab === item.id ? 'text-orange-500' : 'text-slate-400'}`}
                >
                  <NavIcon item={item} active={tab === item.id} />
                  <span className="text-[7px] font-semibold">{item.label}</span>
                </button>
              ))}

              <div className="flex-1 flex flex-col items-center -mt-5 px-1 min-w-0">
                <button
                  type="button"
                  onClick={() => setScreen('publish-dispo')}
                  aria-label="Publier une disponibilité"
                  className="flex items-center justify-center w-[52px] h-[52px] rounded-full bg-gradient-to-b from-green-400 to-green-600 border-[3px] border-white shadow-[0_4px_14px_rgba(22,163,74,0.45),inset_0_1px_0_rgba(255,255,255,0.35)] active:scale-95 transition-transform"
                >
                  <span className="flex items-center justify-center w-10 h-10 rounded-full bg-white">
                    <img src={imgVehiculeDispo2} alt="" className="w-6 h-6 object-contain" draggable={false} />
                  </span>
                </button>
                <span className="text-[7px] font-semibold text-green-600 mt-1">Publier</span>
              </div>

              {NAV_SIDE_RIGHT.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setTab(item.id)}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-1.5 ${tab === item.id ? 'text-orange-500' : 'text-slate-400'}`}
                >
                  <NavIcon item={item} active={tab === item.id} />
                  <span className="text-[7px] font-semibold">{item.label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useMemo } from 'react';
import {
  Search,
  ShoppingCart,
  Heart,
  Package,
  User,
  History,
  ChevronRight,
  MapPin,
  Filter,
  Truck,
  Phone,
  Copy,
  Upload,
  FileText,
  Clock,
  X,
  Mic,
  Lock,
  Save,
  ExternalLink,
} from 'lucide-react';
import logoOcpv from '../../assets/logo_ocpv.png';
import imgCamion from '../../assets/camion.png';
import {
  PRODUCT_IMAGES,
  REGIONS,
  HUBS_BY_REGION,
  VILLES_BY_HUB,
  CATALOGUE_LOTS,
  TRANSPORTEURS,
  INITIAL_ORDERS,
  RECEIPTS_HISTORY,
  BUYER_PROFILE_B2B,
  BUYER_PROFILE_B2C,
  filterLots,
  formatPrice,
} from './buyerData';

const NAV = [
  { id: 'catalogue', label: 'Catalogue', icon: Search },
  { id: 'achats', label: 'Achats', icon: ShoppingCart },
  { id: 'commandes', label: 'Commandes', icon: Package },
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'compte', label: 'Compte', icon: User },
];

function ProductThumb({ produit, size = 'md' }) {
  const img = PRODUCT_IMAGES[produit];
  const cls = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  if (img) {
    return <img src={img} alt="" className={`${cls} rounded-xl object-cover border border-slate-100 shrink-0`} draggable={false} />;
  }
  return (
    <div className={`${cls} rounded-xl bg-orange-500/10 flex items-center justify-center shrink-0`}>
      <Package size={16} className="text-orange-500" />
    </div>
  );
}

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

function LotCard({ lot, onSelect, compact, favorite, onToggleFavorite }) {
  return (
    <button
      type="button"
      onClick={() => onSelect?.(lot)}
      className={`w-full text-left p-3 rounded-xl bg-white border border-slate-100 ${compact ? '' : 'active:bg-slate-50'}`}
    >
      <div className="flex gap-3">
        <ProductThumb produit={lot.produit} size="sm" />
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-1">
            <p className="text-sm font-bold text-slate-900">{lot.produit} · {lot.qte}</p>
            {onToggleFavorite && (
              <button
                type="button"
                onClick={(e) => { e.stopPropagation(); onToggleFavorite(lot.id); }}
                className="shrink-0 p-1"
              >
                <Heart size={14} className={favorite ? 'fill-red-500 text-red-500' : 'text-slate-300'} />
              </button>
            )}
          </div>
          <p className="text-xs font-semibold text-orange-600">{formatPrice(lot.prixUnit)}/t</p>
          <p className="text-[10px] text-slate-400 mt-0.5">{lot.hub} · {lot.ville}</p>
          <p className="text-[9px] font-mono text-slate-400">{lot.ref}</p>
        </div>
      </div>
    </button>
  );
}

function IntentionScreen({ onBack, onSubmit, initialText }) {
  const [text, setText] = useState(initialText || '');

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
        <h2 className="text-lg font-bold text-slate-900">Intention d&apos;achat</h2>
        <p className="text-xs text-slate-500">Transmise à l&apos;antenne OCPV pour traitement</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          rows={5}
          placeholder="Ex : 5 t de manioc, hub Bouaké, livraison sous 7 jours…"
          className="w-full p-4 rounded-xl border-2 border-slate-200 text-sm focus:border-orange-500 focus:outline-none resize-none"
        />
        <button type="button" className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border-2 border-dashed border-slate-300 text-slate-500 text-sm">
          <Mic size={18} /> Dictée vocale (bientôt)
        </button>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          type="button"
          disabled={!text.trim()}
          onClick={() => onSubmit(text)}
          className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold disabled:opacity-40"
        >
          Envoyer à l&apos;OCPV
        </button>
      </div>
    </div>
  );
}

function PaymentScreen({ lot, onBack, onPaid }) {
  const total = Math.round(lot.prixUnit * lot.qteNum);

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
        <h2 className="text-lg font-bold text-slate-900">Paiement direct producteur</h2>
        <p className="text-xs text-slate-500">Hors plateforme OCPV · P2P Mobile Money</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div className="p-4 rounded-xl bg-white border border-slate-100">
          <p className="text-sm font-bold text-slate-900">{lot.produit} · {lot.qte}</p>
          <p className="text-2xl font-extrabold text-orange-600 mt-2">{formatPrice(total)}</p>
          <p className="text-xs text-slate-500 mt-1">Producteur · {lot.producteur}</p>
        </div>
        <div className="p-4 rounded-xl bg-blue-50 border border-blue-200">
          <p className="text-xs font-bold text-blue-800 uppercase">Compte {lot.mmOperator}</p>
          <div className="flex items-center justify-between mt-2">
            <p className="text-lg font-mono font-bold text-slate-900">{lot.mmNumber}</p>
            <button type="button" className="p-2 rounded-lg bg-white border border-blue-200">
              <Copy size={16} className="text-blue-600" />
            </button>
          </div>
          <p className="text-[10px] text-blue-700/80 mt-2">Effectuez le transfert puis confirmez ci-dessous.</p>
        </div>
        <div className="p-3 rounded-xl bg-amber-50 border border-amber-200 text-[10px] text-amber-800 leading-relaxed">
          L&apos;OCPV ne séquestre pas les fonds. Vous payez le producteur directement, puis soumettez la preuve au hub.
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100 space-y-2">
        <button type="button" onClick={onPaid} className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold">
          J&apos;ai payé · Soumettre la preuve OCPV
        </button>
      </div>
    </div>
  );
}

function ProofScreen({ lot, mmRef, setMmRef, onBack, onSubmit }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
        <h2 className="text-lg font-bold text-slate-900">Preuve de paiement OCPV</h2>
        <p className="text-xs text-slate-500">Lot · {lot.ref}</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Référence Mobile Money</label>
          <input
            value={mmRef}
            onChange={(e) => setMmRef(e.target.value)}
            placeholder="Ex : WVE-8847291"
            className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm font-mono focus:border-orange-500 focus:outline-none"
          />
        </div>
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase">Justificatif (PDF ou image)</label>
          <button type="button" className="mt-2 w-full flex flex-col items-center gap-2 py-8 rounded-xl border-2 border-dashed border-orange-400/50 bg-orange-50/50 text-orange-700">
            <Upload size={24} />
            <span className="text-xs font-semibold">Capturer ou importer le reçu</span>
          </button>
        </div>
        <div className="flex items-start gap-2 p-3 rounded-xl bg-slate-100 text-[10px] text-slate-600">
          <Clock size={14} className="shrink-0 text-orange-500" />
          Timer 24 h : le producteur confirme la réception. L&apos;agent OCPV enregistre CP/APE au hub.
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          type="button"
          disabled={!mmRef.trim()}
          onClick={onSubmit}
          className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold disabled:opacity-40"
        >
          Soumettre au hub OCPV
        </button>
      </div>
    </div>
  );
}

export default function BuyerPhoneMockup({ buyerType = 'B2B' }) {
  const [tab, setTab] = useState('catalogue');
  const [screen, setScreen] = useState('main');
  const [subTab, setSubTab] = useState('panier');
  const [toast, setToast] = useState(null);

  const [region, setRegion] = useState('Gbêkê');
  const [hub, setHub] = useState('Bouaké Centre');
  const [ville, setVille] = useState('Toutes');
  const [produit, setProduit] = useState('Tous');
  const [search, setSearch] = useState('');

  const [cart, setCart] = useState([]);
  const [favorites, setFavorites] = useState(['lot-501']);
  const [orders, setOrders] = useState(INITIAL_ORDERS);
  const [activeLot, setActiveLot] = useState(null);
  const [mmRef, setMmRef] = useState('');

  const profile = buyerType === 'B2C' ? BUYER_PROFILE_B2C : BUYER_PROFILE_B2B;

  const hubs = HUBS_BY_REGION[region] || [];
  const villes = VILLES_BY_HUB[hub] || [];

  const filteredLots = useMemo(
    () => filterLots(CATALOGUE_LOTS, { region, hub, ville, produit, search }),
    [region, hub, ville, produit, search],
  );

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const toggleFavorite = (id) => {
    setFavorites((prev) => (prev.includes(id) ? prev.filter((x) => x !== id) : [...prev, id]));
  };

  const addToCart = (lot) => {
    if (!cart.find((c) => c.id === lot.id)) setCart((prev) => [...prev, lot]);
    showToast(`✓ ${lot.produit} ajouté au panier`);
  };

  const submitProof = () => {
    const order = {
      id: `cmd-${Date.now()}`,
      ref: activeLot.ref,
      produit: activeLot.produit,
      qte: activeLot.qte,
      hub: activeLot.hub,
      statut: 'Preuve soumise',
      statutColor: 'text-orange-600',
      date: new Date().toLocaleDateString('fr-FR'),
      mmRef,
    };
    setOrders((prev) => [order, ...prev]);
    setCart((prev) => prev.filter((c) => c.id !== activeLot.id));
    setScreen('main');
    setTab('commandes');
    setMmRef('');
    showToast('Preuve enregistrée · Timer 24 h activé');
  };

  const hideNav = screen !== 'main';

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl z-20" />
        <div className="bg-white rounded-[2.25rem] overflow-hidden h-[640px] flex flex-col relative">
          <PhoneStatusBar />

          {toast && (
            <div className="absolute top-12 left-3 right-3 z-30 py-2 px-3 rounded-xl bg-green-600 text-white text-xs font-semibold text-center shadow-lg flex items-center justify-center gap-1">
              <span>{toast}</span>
              <button type="button" onClick={() => setToast(null)}><X size={12} /></button>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-hidden">
            {screen === 'intention' ? (
              <IntentionScreen
                onBack={() => setScreen('main')}
                initialText={search ? `Besoin : ${search}` : ''}
                onSubmit={() => {
                  setScreen('main');
                  showToast('Intention transmise · Antenne OCPV');
                }}
              />
            ) : screen === 'payment' && activeLot ? (
              <PaymentScreen lot={activeLot} onBack={() => setScreen('main')} onPaid={() => setScreen('proof')} />
            ) : screen === 'proof' && activeLot ? (
              <ProofScreen lot={activeLot} mmRef={mmRef} setMmRef={setMmRef} onBack={() => setScreen('payment')} onSubmit={submitProof} />
            ) : screen === 'transporteurs' ? (
              <div className="flex flex-col h-full min-h-0 bg-slate-50">
                <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
                  <button type="button" onClick={() => setScreen('main')} className="text-sm text-orange-500 font-medium mb-2">← Retour</button>
                  <h2 className="text-lg font-bold text-slate-900">Transporteurs</h2>
                  <p className="text-[10px] text-slate-500">Contact direct · paiement hors plateforme</p>
                </div>
                <div className="flex-1 overflow-y-auto p-4 space-y-2">
                  {TRANSPORTEURS.map((tr) => (
                    <div key={tr.id} className="p-3 rounded-xl bg-white border border-slate-100">
                      <div className="flex items-start gap-2">
                        <Truck size={18} className="text-orange-500 shrink-0 mt-0.5" />
                        <div className="flex-1 min-w-0">
                          <p className="text-sm font-bold text-slate-900">{tr.nom}</p>
                          <p className="text-xs text-slate-500">{tr.vehicules} · {tr.zones}</p>
                          <span className="text-[10px] font-semibold text-green-600">{tr.dispo}</span>
                        </div>
                      </div>
                      <a href={`tel:${tr.contact.replace(/\s/g, '')}`} className="mt-2 flex items-center justify-center gap-2 w-full py-2 rounded-lg bg-orange-500/10 text-orange-700 text-xs font-semibold">
                        <Phone size={14} /> {tr.contact}
                      </a>
                    </div>
                  ))}
                </div>
              </div>
            ) : (
              <>
                {tab === 'catalogue' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100">
                      <div className="flex items-center gap-2 mb-2">
                        <img src={logoOcpv} alt="" className="h-5 w-auto" draggable={false} />
                        <span className="text-[10px] font-semibold text-slate-400">Catalogue certifié OCPV</span>
                        <span className="ml-auto text-[9px] font-bold px-2 py-0.5 rounded-full bg-orange-500/10 text-orange-600">{buyerType}</span>
                      </div>
                      <div className="relative">
                        <Search size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                        <input
                          value={search}
                          onChange={(e) => setSearch(e.target.value)}
                          placeholder="Rechercher produit, hub…"
                          className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-200 text-sm focus:border-orange-500 focus:outline-none"
                        />
                      </div>
                    </div>
                    <div className="px-4 py-2 bg-white border-b border-slate-100 flex gap-2 overflow-x-auto shrink-0">
                      <select value={region} onChange={(e) => { setRegion(e.target.value); setHub((HUBS_BY_REGION[e.target.value] || [])[0] || ''); }} className="text-[10px] font-semibold py-1.5 px-2 rounded-lg border border-slate-200 bg-white">
                        {REGIONS.map((r) => <option key={r}>{r}</option>)}
                      </select>
                      <select value={hub} onChange={(e) => setHub(e.target.value)} className="text-[10px] font-semibold py-1.5 px-2 rounded-lg border border-slate-200 bg-white">
                        {hubs.map((h) => <option key={h}>{h}</option>)}
                      </select>
                      <select value={ville} onChange={(e) => setVille(e.target.value)} className="text-[10px] font-semibold py-1.5 px-2 rounded-lg border border-slate-200 bg-white">
                        <option>Toutes</option>
                        {villes.map((v) => <option key={v}>{v}</option>)}
                      </select>
                    </div>
                    <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-2">
                      <button type="button" onClick={() => setScreen('transporteurs')} className="w-full flex items-center gap-2 p-3 rounded-xl bg-orange-500/10 border border-orange-500/20 text-left">
                        <img src={imgCamion} alt="" className="w-10 h-10 object-contain shrink-0 mix-blend-multiply" draggable={false} />
                        <div className="flex-1">
                          <p className="text-xs font-bold text-orange-800">Transporteurs disponibles</p>
                          <p className="text-[10px] text-orange-600/80">Contact · fret hors plateforme</p>
                        </div>
                        <ChevronRight size={14} className="text-orange-400" />
                      </button>
                      {filteredLots.length === 0 ? (
                        <div className="p-4 rounded-xl bg-white border border-slate-100 text-center">
                          <Filter size={24} className="mx-auto text-slate-300 mb-2" />
                          <p className="text-sm font-semibold text-slate-700">Aucun lot correspondant</p>
                          <p className="text-xs text-slate-500 mt-1">L&apos;IA pourra matcher plus tard · soumettez une intention</p>
                          <button type="button" onClick={() => setScreen('intention')} className="mt-3 w-full py-3 rounded-xl bg-orange-500 text-white text-sm font-bold">
                            Soumettre une intention à l&apos;OCPV
                          </button>
                        </div>
                      ) : (
                        filteredLots.map((lot) => (
                          <div key={lot.id} className="rounded-xl bg-white border border-slate-100 overflow-hidden">
                            <LotCard lot={lot} favorite={favorites.includes(lot.id)} onToggleFavorite={toggleFavorite} onSelect={() => { setActiveLot(lot); addToCart(lot); }} />
                            <div className="flex border-t border-slate-100">
                              <button type="button" onClick={() => addToCart(lot)} className="flex-1 py-2 text-[10px] font-bold text-orange-600">Panier</button>
                              <button type="button" onClick={() => { setActiveLot(lot); setScreen('payment'); }} className="flex-1 py-2 text-[10px] font-bold text-green-700 border-l border-slate-100">Acheter</button>
                            </div>
                          </div>
                        ))
                      )}
                    </div>
                  </div>
                )}

                {tab === 'achats' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-2 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Achats</h2>
                      <div className="flex mt-2 rounded-lg border border-slate-200 p-0.5">
                        {['panier', 'favoris'].map((st) => (
                          <button key={st} type="button" onClick={() => setSubTab(st)} className={`flex-1 py-1.5 text-xs font-semibold rounded-md capitalize ${subTab === st ? 'bg-orange-500 text-white' : 'text-slate-500'}`}>
                            {st} {st === 'panier' && cart.length > 0 ? `(${cart.length})` : ''}
                          </button>
                        ))}
                      </div>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {subTab === 'panier' && (
                        cart.length === 0 ? (
                          <p className="text-center text-sm text-slate-400 py-8">Panier vide</p>
                        ) : (
                          cart.map((lot) => (
                            <div key={lot.id}>
                              <LotCard lot={lot} compact />
                              <button type="button" onClick={() => { setActiveLot(lot); setScreen('payment'); }} className="w-full mt-1 py-2.5 rounded-xl bg-green-600 text-white text-xs font-bold">
                                Procéder au paiement P2P
                              </button>
                            </div>
                          ))
                        )
                      )}
                      {subTab === 'favoris' && (
                        CATALOGUE_LOTS.filter((l) => favorites.includes(l.id)).map((lot) => (
                          <LotCard key={lot.id} lot={lot} favorite onToggleFavorite={toggleFavorite} onSelect={() => addToCart(lot)} />
                        ))
                      )}
                    </div>
                  </div>
                )}

                {tab === 'commandes' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Mes commandes</h2>
                      <p className="text-xs text-slate-500">Réservations · preuves · validation OCPV</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {orders.map((o) => (
                        <div key={o.id} className="p-3 rounded-xl bg-white border border-slate-100">
                          <div className="flex gap-3">
                            <ProductThumb produit={o.produit} size="sm" />
                            <div className="flex-1 min-w-0">
                              <p className="text-sm font-bold text-slate-900">{o.produit} · {o.qte}</p>
                              <p className={`text-xs font-medium ${o.statutColor}`}>{o.statut}</p>
                              <p className="text-[9px] font-mono text-slate-400 mt-1">{o.ref}</p>
                              {o.mmRef && <p className="text-[10px] text-slate-500">MM · {o.mmRef}</p>}
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'historique' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Historique</h2>
                      <p className="text-xs text-slate-500">Achats · CP · APE · taxes OCPV</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-2">
                      {orders.map((o) => (
                        <div key={`h-${o.id}`} className="p-3 rounded-xl bg-white border border-slate-100 flex items-center gap-3">
                          <ProductThumb produit={o.produit} size="sm" />
                          <div className="flex-1 min-w-0">
                            <p className="text-sm font-bold text-slate-900">{o.produit} · {o.hub}</p>
                            <p className="text-xs text-slate-500">{o.date}</p>
                          </div>
                        </div>
                      ))}
                      <p className="text-[10px] font-bold text-slate-400 uppercase pt-2">Reçus OCPV</p>
                      {RECEIPTS_HISTORY.map((r) => (
                        <div key={r.id} className="p-3 rounded-xl bg-white border border-slate-100 flex items-center justify-between">
                          <div>
                            <p className="text-sm font-bold text-slate-900">{r.type}</p>
                            <p className="text-[10px] font-mono text-slate-400">{r.ref}</p>
                          </div>
                          <div className="text-right">
                            <p className="text-xs font-bold text-green-700">{r.montant}</p>
                            <button type="button" className="text-[10px] text-orange-500 flex items-center gap-0.5 ml-auto">
                              <ExternalLink size={10} /> PDF
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {tab === 'compte' && (
                  <div className="flex flex-col h-full min-h-0 bg-slate-50">
                    <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
                      <h2 className="text-lg font-bold text-slate-900">Mon compte</h2>
                      <p className="text-xs text-slate-500">Rôle acheteur · {buyerType}</p>
                    </div>
                    <div className="flex-1 overflow-y-auto p-4 space-y-3">
                      <div className="p-3 rounded-xl bg-blue-50 border border-blue-100 text-[10px] text-blue-800 leading-relaxed">
                        Interface identique B2B et B2C. Seuls les <strong>documents à l&apos;inscription</strong> diffèrent (RCCM, patente pour B2B).
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">
                          {buyerType === 'B2B' ? 'Raison sociale' : 'Nom'} <Lock size={10} />
                        </label>
                        <p className="mt-1 text-sm font-medium bg-slate-100 rounded-xl px-3 py-2.5">{profile.raisonSociale === '—' ? profile.responsable : profile.raisonSociale}</p>
                      </div>
                      {buyerType === 'B2B' && (
                        <div>
                          <label className="text-[10px] font-semibold text-slate-400 uppercase flex items-center gap-1">RCCM <Lock size={10} /></label>
                          <p className="mt-1 text-sm font-medium bg-slate-100 rounded-xl px-3 py-2.5">{profile.rccm}</p>
                        </div>
                      )}
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Téléphone</label>
                        <input defaultValue={profile.tel} className="mt-1 w-full text-sm rounded-xl px-3 py-2.5 border-2 border-slate-200" />
                      </div>
                      <div>
                        <label className="text-[10px] font-semibold text-slate-500 uppercase">Hub OCPV habituel</label>
                        <p className="mt-1 text-sm font-medium bg-slate-100 rounded-xl px-3 py-2.5 flex items-center gap-1"><MapPin size={12} /> {profile.hubHabituel}</p>
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
            <nav className="flex border-t border-slate-100 bg-white pb-2 pt-1 shrink-0">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setTab(id)}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-1.5 ${tab === id ? 'text-orange-500' : 'text-slate-400'}`}
                >
                  <Icon size={18} strokeWidth={tab === id ? 2.5 : 2} />
                  <span className="text-[7px] font-semibold text-center leading-tight truncate max-w-full">{label}</span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

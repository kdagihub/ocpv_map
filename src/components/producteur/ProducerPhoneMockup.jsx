import { useState, useEffect } from 'react';
import {
  Home,
  History,
  User,
  Plus,
  Package,
  TrendingUp,
  Clock,
  CheckCircle2,
  ChevronRight,
  MapPin,
  Sprout,
  Building2,
  Phone,
  LayoutGrid,
  Lock,
  Save,
  Info,
  X,
  QrCode,
  ShieldCheck,
} from 'lucide-react';
import logoOcpv from '../../assets/logo_ocpv.png';
import imgIgname from '../../assets/igname.png';
import imgBanane from '../../assets/banane.png';
import imgManioc from '../../assets/manioc.png';
import imgRiz from '../../assets/riz.png';
import imgAubergine from '../../assets/auberines.png';
import imgMais from '../../assets/maïs.png';
import imgOignons from '../../assets/oignons.png';
import imgPiments from '../../assets/piments.png';
import imgTomates from '../../assets/tomates.png';

const PRODUCT_IMAGES = {
  Igname: imgIgname,
  'Banane plantain': imgBanane,
  Manioc: imgManioc,
  'Riz paddy': imgRiz,
  Aubergine: imgAubergine,
  Maïs: imgMais,
  Oignons: imgOignons,
  Piments: imgPiments,
  Tomates: imgTomates,
  Tomate: imgTomates,
};

const PRODUITS = [
  'Igname',
  'Banane plantain',
  'Manioc',
  'Riz paddy',
  'Maïs',
  'Tomates',
  'Aubergine',
  'Oignons',
  'Piments',
];

/** Cycle de vie d'un lot (CDC §3.1 bis) */
const STATUT_INFO = [
  { statut: 'Déclaré', desc: 'Disponibilité signalée — en file d\'attente de validation agent.' },
  { statut: 'Validé', desc: 'Ordre de collecte approuvé — récépissé QR remis au producteur.' },
  { statut: 'En cours de ramassage', desc: 'Camion en route — QR scanné au point de ramassage.' },
  { statut: 'En hub', desc: 'Marchandise au hub, contrôle qualité — pas encore en vente.' },
  { statut: 'En vente', desc: 'Validé par l\'agent : automatiquement sur le catalogue certifié.' },
];

const STATS = [
  { id: 'declares', label: 'Déclarés', value: 12, icon: Package, color: 'text-orange-500', bg: 'bg-orange-500/10' },
  { id: 'hub', label: 'En hub OCPV', value: 4, icon: MapPin, color: 'text-green-600', bg: 'bg-green-500/10' },
  { id: 'vente', label: 'En vente', value: 5, icon: TrendingUp, color: 'text-blue-600', bg: 'bg-blue-500/10' },
  { id: 'attente', label: 'En attente', value: 3, icon: Clock, color: 'text-amber-600', bg: 'bg-amber-500/10' },
];

const INITIAL_PROFILE = {
  prenom: 'Koné',
  nom: 'Bernard',
  age: '42',
  dateNaissance: '14/03/1984',
  cni: 'CI004857291',
  idProducteur: 'CI-PRD-2847',
  cooperative: 'Coopérative Bouaké Nord',
  cooperativeCode: 'COOP-BKE-N',
  antenne: 'Antenne Gbêkê',
  telPrincipal: '07 12 34 56 78',
  telSecondaire: '05 11 22 33 44',
  village: "N'Gattakro",
  departement: 'Bouaké',
};

const INITIAL_PARCELLES = [
  { id: 1, nom: 'Parcelle Nord', superficie: '2,5 ha', culture: 'Igname', lieu: "N'Gattakro" },
  { id: 2, nom: 'Parcelle Sud', superficie: '1,8 ha', culture: 'Manioc', lieu: 'Brobo' },
  { id: 3, nom: 'Parcelle Est', superficie: '3 ha', culture: 'Banane plantain', lieu: 'Bouaké zone 4' },
];

const INITIAL_CATALOGUE = [
  { id: 1, nom: 'Igname', dispo: '8 t', hub: 'Bouaké', statut: 'En vente', actif: true },
  { id: 2, nom: 'Manioc', dispo: '12 t', hub: 'Bouaké', statut: 'Déclaré', actif: true },
  { id: 3, nom: 'Banane plantain', dispo: '3 t', hub: 'Yamoussoukro', statut: 'En hub', actif: true },
  { id: 4, nom: 'Tomates', dispo: '1,2 t', hub: 'Bouaké', statut: 'En vente', actif: true },
  { id: 5, nom: 'Maïs', dispo: '4 t', hub: 'Bouaké', statut: 'Déclaré', actif: true },
  { id: 6, nom: 'Riz paddy', dispo: '—', hub: '—', statut: 'Hors saison', actif: false },
];

const TIMELINE_STEPS = [
  { key: 'declare', label: 'Déclaration envoyée' },
  { key: 'validation', label: 'Validation agent OCPV' },
  { key: 'receipt', label: 'Récépissé QR remis' },
  { key: 'ramassage', label: 'Ramassage en cours' },
  { key: 'hub', label: 'Réception au hub' },
  { key: 'vente', label: 'Publié en vente' },
];

function generateLotRef() {
  const n = String(Math.floor(Math.random() * 900) + 100);
  return `OCPV-BKE-${new Date().getFullYear()}-${n}`;
}

function buildTimeline(completedKeys = []) {
  const nextIndex = completedKeys.length;
  return TIMELINE_STEPS.map((step, index) => ({
    ...step,
    done: completedKeys.includes(step.key),
    active: index === nextIndex && !completedKeys.includes(step.key),
  }));
}

function createLot(data, completedKeys = ['declare'], extra = {}) {
  return {
    id: `lot-${Date.now()}-${Math.random().toString(36).slice(2, 7)}`,
    ref: generateLotRef(),
    produit: data.produit,
    qte: `${data.quantite} t`,
    hub: data.hub,
    lieuRamassage: data.lieuRamassage,
    statut: extra.statut || 'EN_ATTENTE_VALIDATION',
    statutLabel: extra.statutLabel || 'En attente validation',
    date: new Date().toLocaleDateString('fr-FR'),
    color: extra.color || 'text-amber-600',
    validated: extra.validated ?? false,
    completedKeys,
    ...extra,
  };
}

const INITIAL_LOTS = [
  createLot(
    { produit: 'Igname', quantite: '2', hub: 'Bouaké Centre', lieuRamassage: "N'Gattakro" },
    ['declare', 'validation', 'receipt', 'ramassage', 'hub'],
    { id: 'lot-1', ref: 'OCPV-BKE-2026-00312', statut: 'EN_HUB', statutLabel: 'En hub Bouaké', date: '12/06/2026', color: 'text-green-600', validated: true },
  ),
  createLot(
    { produit: 'Manioc', quantite: '5', hub: 'Bouaké Centre', lieuRamassage: 'Brobo' },
    ['declare', 'validation', 'receipt', 'ramassage', 'hub', 'vente'],
    { id: 'lot-2', ref: 'OCPV-BKE-2026-00298', statut: 'VENDU', statutLabel: 'Vendu', date: '08/06/2026', color: 'text-slate-500', validated: true },
  ),
  createLot(
    { produit: 'Banane plantain', quantite: '1,5', hub: 'Bouaké Centre', lieuRamassage: "N'Gattakro · carrefour" },
    ['declare', 'validation', 'receipt'],
    { id: 'lot-3', ref: 'OCPV-BKE-2026-00345', statut: 'VALIDE', statutLabel: 'Validé · ramassage prévu', date: '05/06/2026', color: 'text-orange-500', validated: true },
  ),
];

const NAV = [
  { id: 'accueil', label: 'Accueil', icon: Home },
  { id: 'historique', label: 'Historique', icon: History },
  { id: 'produits', label: 'Mes produits', icon: LayoutGrid },
  { id: 'compte', label: 'Compte', icon: User },
];

const STATUT_STYLES = {
  'En vente': 'bg-blue-500/10 text-blue-700',
  Déclaré: 'bg-orange-500/10 text-orange-600',
  'En hub': 'bg-green-500/10 text-green-700',
  'Hors saison': 'bg-slate-200 text-slate-500',
};

function ProductThumb({ nom, size = 'md' }) {
  const img = PRODUCT_IMAGES[nom];
  const cls = size === 'sm' ? 'w-10 h-10' : 'w-12 h-12';
  if (img) {
    return (
      <img
        src={img}
        alt={nom}
        className={`${cls} rounded-xl object-cover shrink-0 border border-slate-100`}
        draggable={false}
      />
    );
  }
  return (
    <div className={`${cls} rounded-xl bg-green-500/10 flex items-center justify-center shrink-0`}>
      <Package size={size === 'sm' ? 14 : 18} className="text-green-600" />
    </div>
  );
}

const WEEKLY_DECLARED = [
  { nom: 'Igname', qte: '2 t' },
  { nom: 'Manioc', qte: '1,5 t' },
  { nom: 'Banane plantain', qte: '1,5 t' },
  { nom: 'Tomates', qte: '1,2 t' },
  { nom: 'Maïs', qte: '0,3 t' },
];

function ProductClusterCarousel({ items }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % items.length);
    }, 2800);
    return () => clearInterval(timer);
  }, [items.length]);

  return (
    <div className="relative w-[100px] h-[76px] shrink-0" aria-hidden>
      {items.map((item, i) => {
        const img = PRODUCT_IMAGES[item.nom];
        const pos = (i - index + items.length) % items.length;
        if (pos > 3) return null;

        return (
          <div
            key={item.nom}
            className="absolute top-1 transition-all duration-500 ease-out"
            style={{
              right: pos * 14,
              zIndex: 10 - pos,
              transform: pos === 0 ? 'scale(1.08) translateY(-2px)' : `scale(${0.94 - pos * 0.04})`,
              opacity: pos === 0 ? 1 : 0.9 - pos * 0.12,
            }}
          >
            {img ? (
              <img
                src={img}
                alt=""
                className={`w-12 h-12 rounded-xl object-cover border-2 shadow-sm ${pos === 0 ? 'border-orange-400 shadow-orange-200/50' : 'border-white'
                  }`}
                draggable={false}
              />
            ) : (
              <div className="w-12 h-12 rounded-xl bg-green-500/10 border-2 border-white" />
            )}
          </div>
        );
      })}
      <p className="absolute -bottom-1 right-0 text-[9px] font-semibold text-slate-400 whitespace-nowrap">
        {items[index].nom}
      </p>
    </div>
  );
}

function ProductPicker({ selected, onSelect }) {
  return (
    <div className="grid grid-cols-2 gap-2 mt-2">
      {PRODUITS.map((p) => (
        <button
          key={p}
          type="button"
          onClick={() => onSelect(p)}
          className={`flex items-center gap-2 py-2.5 px-2 rounded-xl text-sm font-semibold border-2 transition-colors ${selected === p
              ? 'border-green-500 bg-green-500/10 text-green-700'
              : 'border-slate-200 bg-white text-slate-700'
            }`}
        >
          <ProductThumb nom={p} size="sm" />
          <span className="text-left text-xs leading-tight">{p}</span>
        </button>
      ))}
    </div>
  );
}

function FakeQrCode({ value, size = 140 }) {
  const cells = 13;
  const pattern = Array.from({ length: cells * cells }, (_, i) => {
    const hash = (value.charCodeAt(i % value.length) + i * 7) % 3;
    return hash !== 0;
  });
  return (
    <div
      className="mx-auto rounded-xl border-4 border-slate-900 bg-white p-2 shadow-inner"
      style={{ width: size, height: size }}
    >
      <div
        className="grid gap-0 w-full h-full"
        style={{ gridTemplateColumns: `repeat(${cells}, 1fr)` }}
      >
        {pattern.map((filled, i) => (
          <div key={i} className={filled ? 'bg-slate-900' : 'bg-white'} />
        ))}
      </div>
    </div>
  );
}

function LotTimeline({ completedKeys }) {
  const steps = buildTimeline(completedKeys);
  return (
    <div className="space-y-0">
      {steps.map((step, index) => (
        <div key={step.key} className="flex gap-3">
          <div className="flex flex-col items-center">
            <div className={`w-3 h-3 rounded-full shrink-0 mt-1 ${step.done ? 'bg-green-500' : step.active ? 'bg-orange-500 ring-4 ring-orange-500/20' : 'bg-slate-200'
              }`} />
            {index < steps.length - 1 && (
              <div className={`w-0.5 flex-1 min-h-[20px] ${step.done ? 'bg-green-500/40' : 'bg-slate-200'}`} />
            )}
          </div>
          <div className="pb-4 min-w-0">
            <p className={`text-xs font-semibold ${step.done ? 'text-slate-800' : step.active ? 'text-orange-600' : 'text-slate-400'}`}>
              {step.label}
            </p>
          </div>
        </div>
      ))}
    </div>
  );
}

function LotPendingScreen({ lot, onBack, onSimulateValidation }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">Déclaration enregistrée</h2>
        <p className="text-xs text-slate-500 mt-0.5">Lot · {lot.ref}</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100">
          <ProductThumb nom={lot.produit} />
          <div>
            <p className="text-sm font-bold text-slate-900">{lot.produit} · {lot.qte}</p>
            <p className="text-xs text-slate-500">{lot.lieuRamassage}</p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-amber-50 border border-amber-200">
          <p className="text-xs font-bold text-amber-800">En attente de validation agent</p>
          <p className="text-[10px] text-amber-700/80 mt-1 leading-relaxed">
            Votre dossier est en file d&apos;attente. Aucun camion ne partira tant qu&apos;un agent OCPV n&apos;aura pas validé la déclaration.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-100">
          <p className="text-xs font-bold text-slate-700 uppercase mb-3">Suivi du lot</p>
          <LotTimeline completedKeys={lot.completedKeys} />
        </div>
        <button
          type="button"
          onClick={onSimulateValidation}
          className="w-full py-3 rounded-xl border-2 border-dashed border-orange-400 text-orange-600 text-xs font-semibold"
        >
          Démo · Simuler validation agent OCPV
        </button>
      </div>
    </div>
  );
}

function LotReceiptScreen({ lot, onBack, onDone }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">Récépissé de remise</h2>
        <p className="text-xs text-slate-500 mt-0.5">À présenter avant de remettre votre récolte</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div className="p-4 rounded-2xl bg-white border-2 border-green-500/30 text-center shadow-sm">
          <ShieldCheck size={28} className="text-green-600 mx-auto mb-2" />
          <p className="text-xs font-bold text-green-700 uppercase tracking-wide">OCPV · Ordre de collecte validé</p>
          <FakeQrCode value={lot.ref} />
          <p className="text-lg font-extrabold text-slate-900 mt-3 font-mono">{lot.ref}</p>
          <p className="text-xs text-slate-500 mt-1">{lot.produit} · {lot.qte} · {lot.hub}</p>
          <p className="text-[10px] text-slate-400 mt-3 leading-relaxed px-2">
            Exigez le scan de ce QR par l&apos;agent au point de ramassage avant de confier votre récolte.
          </p>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-100">
          <p className="text-xs font-bold text-slate-700 uppercase mb-3">Suivi du lot</p>
          <LotTimeline completedKeys={lot.completedKeys} />
        </div>
      </div>
      <div className="p-4 bg-white border-t border-slate-100">
        <button
          type="button"
          onClick={onDone}
          className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-base active:scale-[0.98] transition-transform"
        >
          J&apos;ai compris — conserver mon récépissé
        </button>
      </div>
    </div>
  );
}

function LotDetailScreen({ lot, onBack, onViewReceipt }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">Détail du lot</h2>
        <p className="text-xs font-mono text-slate-500 mt-0.5">{lot.ref}</p>
      </div>
      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div className="flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100">
          <ProductThumb nom={lot.produit} />
          <div className="flex-1 min-w-0">
            <p className="text-sm font-bold text-slate-900">{lot.produit} · {lot.qte}</p>
            <p className={`text-xs font-medium ${lot.color}`}>{lot.statutLabel}</p>
            <p className="text-[10px] text-slate-400 mt-0.5 flex items-center gap-1">
              <MapPin size={10} /> {lot.lieuRamassage}
            </p>
          </div>
        </div>
        <div className="p-4 rounded-xl bg-white border border-slate-100">
          <p className="text-xs font-bold text-slate-700 uppercase mb-3">Timeline · traçabilité intégrale</p>
          <LotTimeline completedKeys={lot.completedKeys} />
        </div>
        {lot.validated && (
          <button
            type="button"
            onClick={onViewReceipt}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-orange-500/10 border border-orange-500/30 text-orange-700 text-sm font-semibold"
          >
            <QrCode size={18} /> Voir le récépissé QR
          </button>
        )}
      </div>
    </div>
  );
}

function ReadOnlyField({ label, value }) {
  return (
    <div>
      <label className="text-[10px] font-semibold text-slate-400 uppercase tracking-wide flex items-center gap-1">
        {label}
        <Lock size={10} className="text-slate-300" />
      </label>
      <p className="mt-1 text-sm font-medium text-slate-700 bg-slate-100 rounded-xl px-3 py-2.5">{value}</p>
    </div>
  );
}

function EditableField({ label, value, onChange, type = 'text', placeholder }) {
  return (
    <div>
      <label className="text-[10px] font-semibold text-slate-500 uppercase tracking-wide">{label}</label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="mt-1 w-full text-sm font-medium rounded-xl px-3 py-2.5 border-2 border-slate-200 focus:border-orange-500 focus:outline-none"
      />
    </div>
  );
}

function DeclareScreen({ onBack, onConfirm }) {
  const [produit, setProduit] = useState('');
  const [quantite, setQuantite] = useState('');
  const [hub, setHub] = useState('Bouaké Centre');
  const [lieuRamassage, setLieuRamassage] = useState("N'Gattakro · carrefour marché");

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">Déclarer ma récolte</h2>
        <p className="text-xs text-slate-500 mt-0.5">Produit · quantité · lieu de ramassage · hub</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Produit</label>
          <ProductPicker selected={produit} onSelect={setProduit} />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Quantité (tonnes)</label>
          <input
            type="text"
            inputMode="decimal"
            placeholder="Ex : 2,5"
            value={quantite}
            onChange={(e) => setQuantite(e.target.value)}
            className="mt-2 w-full py-4 px-4 rounded-2xl border-2 border-slate-200 text-xl font-bold text-center focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide flex items-center gap-1">
            <MapPin size={12} className="text-orange-500" />
            Lieu de ramassage
          </label>
          <p className="text-[10px] text-slate-400 mt-0.5 mb-2">
            Où le camion OCPV doit venir charger votre récolte
          </p>
          <input
            type="text"
            value={lieuRamassage}
            onChange={(e) => setLieuRamassage(e.target.value)}
            placeholder="Village, carrefour, parcelle…"
            className="w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm font-medium focus:border-orange-500 focus:outline-none"
          />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hub OCPV de destination</label>
          <select
            value={hub}
            onChange={(e) => setHub(e.target.value)}
            className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium focus:border-orange-500 focus:outline-none"
          >
            <option>Bouaké Centre</option>
            <option>Yamoussoukro Nord</option>
            <option>Korhogo Marché</option>
            <option>Abidjan Port-Bouët</option>
          </select>
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <button
          type="button"
          disabled={!produit || !quantite || !lieuRamassage.trim()}
          onClick={() => onConfirm({ produit, quantite, hub, lieuRamassage })}
          className="w-full py-4 rounded-2xl bg-orange-500 text-white font-bold text-base disabled:opacity-40 active:scale-[0.98] transition-transform"
        >
          Confirmer la déclaration
        </button>
      </div>
    </div>
  );
}

function AddProductScreen({ onBack, onSave }) {
  const [nom, setNom] = useState('');
  const [saison, setSaison] = useState('Toute l\'année');
  const [hub, setHub] = useState('Bouaké');
  const [notes, setNotes] = useState('');

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">Ajouter au catalogue</h2>
        <p className="text-xs text-slate-500 mt-0.5">Référencez une culture que vous commercialisez</p>
      </div>

      <div className="flex-1 min-h-0 overflow-y-auto p-4 space-y-4">
        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Produit</label>
          <ProductPicker selected={nom} onSelect={setNom} />
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Saison de commercialisation</label>
          <select
            value={saison}
            onChange={(e) => setSaison(e.target.value)}
            className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium focus:border-orange-500 focus:outline-none"
          >
            <option>Toute l&apos;année</option>
            <option>Saison sèche</option>
            <option>Saison des pluies</option>
            <option>Hors saison (inactif)</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Hub OCPV habituel</label>
          <select
            value={hub}
            onChange={(e) => setHub(e.target.value)}
            className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 bg-white text-sm font-medium focus:border-orange-500 focus:outline-none"
          >
            <option>Bouaké</option>
            <option>Yamoussoukro</option>
            <option>Korhogo</option>
            <option>Abidjan</option>
          </select>
        </div>

        <div>
          <label className="text-xs font-semibold text-slate-500 uppercase tracking-wide">Notes (optionnel)</label>
          <textarea
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            rows={2}
            placeholder="Variété, certification bio…"
            className="mt-2 w-full py-3 px-4 rounded-xl border-2 border-slate-200 text-sm focus:border-orange-500 focus:outline-none resize-none"
          />
        </div>
      </div>

      <div className="p-4 bg-white border-t border-slate-100">
        <button
          type="button"
          disabled={!nom}
          onClick={() => onSave({ nom, saison, hub, notes })}
          className="w-full py-4 rounded-2xl bg-green-600 text-white font-bold text-base disabled:opacity-40 active:scale-[0.98] transition-transform"
        >
          Enregistrer le produit
        </button>
      </div>
    </div>
  );
}

function AccueilScreen({ profile, onDeclare }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-3 pb-4 bg-white">
        <div className="flex items-center gap-2 mb-3">
          <img src={logoOcpv} alt="" className="h-6 w-auto" draggable={false} />
          <span className="text-xs font-semibold text-slate-400">AGRILINK Producteur</span>
        </div>
        <p className="text-sm text-slate-500">Bonjour,</p>
        <h2 className="text-xl font-bold text-slate-900">{profile.prenom} {profile.nom} 👋</h2>
        <p className="text-xs text-green-600 font-medium mt-0.5">{profile.cooperative}</p>
      </div>

      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        <div className="grid grid-cols-2 gap-2">
          {STATS.map(({ id, label, value, icon: Icon, color, bg }) => (
            <div key={id} className={`${bg} rounded-2xl p-3 border border-slate-100`}>
              <Icon size={16} className={color} />
              <p className="text-2xl font-extrabold text-slate-900 mt-1">{value}</p>
              <p className="text-[10px] font-medium text-slate-500 leading-tight">{label}</p>
            </div>
          ))}
        </div>

        <button
          type="button"
          onClick={onDeclare}
          className="w-full box-border px-4 py-4 rounded-2xl bg-green-600 text-white shadow-lg shadow-green-600/20 active:scale-[0.98] transition-transform"
        >
          <span className="flex items-center justify-center gap-3 max-w-full">
            <span className="flex shrink-0 items-center justify-center w-11 h-11 rounded-full bg-white/20">
              <Plus size={22} strokeWidth={2.5} />
            </span>
            <span className="text-base font-bold leading-snug text-left">Déclarer ma récolte</span>
          </span>
        </button>

        <div className="rounded-2xl bg-white border border-slate-100 p-4">
          <div className="flex items-start justify-between gap-3">
            <div className="min-w-0 flex-1">
              <div className="flex items-center gap-2 mb-2">
                <TrendingUp size={16} className="text-orange-500" />
                <span className="text-xs font-bold text-slate-700 uppercase">Cette semaine</span>
              </div>
              <p className="text-2xl font-extrabold text-slate-900">6,5 t</p>
              <p className="text-xs text-slate-500">déclarées · 4,2 t déjà en hub</p>
            </div>
            <ProductClusterCarousel items={WEEKLY_DECLARED} />
          </div>
        </div>
      </div>
    </div>
  );
}

function HistoriqueScreen({ lots, onOpenLot }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Historique</h2>
        <p className="text-xs text-slate-500">Lots tracés · même entité de la déclaration à la vente</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {lots.map((item) => (
          <button
            key={item.id}
            type="button"
            onClick={() => onOpenLot(item)}
            className="w-full flex items-center gap-3 p-3 rounded-xl bg-white border border-slate-100 text-left active:bg-slate-50"
          >
            <ProductThumb nom={item.produit} size="sm" />
            <div className="flex-1 min-w-0">
              <p className="text-sm font-bold text-slate-900">{item.produit} · {item.qte}</p>
              <p className={`text-xs font-medium ${item.color}`}>{item.statutLabel}</p>
              <p className="text-[9px] font-mono text-slate-400 mt-0.5">{item.ref}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300 shrink-0" />
          </button>
        ))}
      </div>
    </div>
  );
}

function CatalogueScreen({ catalogue, onAddProduct, showStatutInfo, onToggleStatutInfo }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
        <div className="flex items-start justify-between gap-2">
          <div>
            <h2 className="text-lg font-bold text-slate-900">Mes produits</h2>
            <p className="text-xs text-slate-500">Catalogue personnel · lots déclarés</p>
          </div>
          <button
            type="button"
            onClick={onToggleStatutInfo}
            className="p-1.5 rounded-lg bg-slate-100 text-slate-500"
            aria-label="Aide statuts"
          >
            <Info size={16} />
          </button>
        </div>
        {showStatutInfo && (
          <div className="mt-3 p-3 rounded-xl bg-blue-50 border border-blue-100 space-y-2">
            {STATUT_INFO.map(({ statut, desc }) => (
              <p key={statut} className="text-[10px] text-slate-600 leading-relaxed">
                <strong className="text-slate-800">{statut}</strong> — {desc}
              </p>
            ))}
          </div>
        )}
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {catalogue.map((item) => (
          <div
            key={item.id}
            className={`p-3 rounded-xl border ${item.actif ? 'bg-white border-slate-100' : 'bg-slate-100/80 border-slate-200 opacity-70'
              }`}
          >
            <div className="flex items-start justify-between gap-2">
              <div className="flex items-center gap-2 min-w-0">
                <ProductThumb nom={item.nom} />
                <div className="min-w-0">
                  <p className="text-sm font-bold text-slate-900 truncate">{item.nom}</p>
                  <p className="text-xs text-slate-500">{item.dispo} disponible</p>
                </div>
              </div>
              <span className={`text-[10px] font-semibold shrink-0 px-2 py-0.5 rounded-full ${STATUT_STYLES[item.statut] || 'bg-slate-200 text-slate-500'}`}>
                {item.statut}
              </span>
            </div>
            {item.actif && (
              <p className="text-[10px] text-slate-400 mt-2 pl-14">Hub · {item.hub}</p>
            )}
          </div>
        ))}
        <button
          type="button"
          onClick={onAddProduct}
          className="w-full mt-2 py-3 rounded-xl border-2 border-dashed border-green-500/40 text-green-700 text-sm font-semibold"
        >
          + Ajouter un produit au catalogue
        </button>
      </div>
    </div>
  );
}

function CompteSubScreen({ title, onBack, children }) {
  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-2 pb-3 bg-white border-b border-slate-100">
        <button type="button" onClick={onBack} className="text-sm text-orange-500 font-medium mb-2">
          ← Retour
        </button>
        <h2 className="text-lg font-bold text-slate-900">{title}</h2>
      </div>
      <div className="flex-1 overflow-y-auto p-4">{children}</div>
    </div>
  );
}

function CompteScreen({ profile, setProfile, parcelles, compteView, setCompteView, onSaveToast }) {
  if (compteView === 'profil') {
    return (
      <CompteSubScreen title="Profil paysan" onBack={() => setCompteView('main')}>
        <div className="space-y-3">
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
            <Lock size={12} /> Identité vérifiée par un agent OCPV — non modifiable
          </p>
          <div className="grid grid-cols-2 gap-3">
            <ReadOnlyField label="Prénom" value={profile.prenom} />
            <ReadOnlyField label="Nom" value={profile.nom} />
          </div>
          <ReadOnlyField label="Date de naissance" value={profile.dateNaissance} />
          <ReadOnlyField label="N° CNI" value={profile.cni} />
          <ReadOnlyField label="ID producteur" value={profile.idProducteur} />
          <EditableField label="Âge" value={profile.age} onChange={(v) => setProfile({ ...profile, age: v })} />
          <EditableField label="Village / localité" value={profile.village} onChange={(v) => setProfile({ ...profile, village: v })} />
          <button
            type="button"
            onClick={() => { onSaveToast('Profil mis à jour'); setCompteView('main'); }}
            className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </CompteSubScreen>
    );
  }

  if (compteView === 'coop') {
    return (
      <CompteSubScreen title="Ma coopérative" onBack={() => setCompteView('main')}>
        <div className="space-y-3">
          <p className="text-xs text-slate-500 mb-2 flex items-center gap-1">
            <Lock size={12} /> Inscription gérée par les agents OCPV
          </p>
          <ReadOnlyField label="Coopérative" value={profile.cooperative} />
          <ReadOnlyField label="Code coopérative" value={profile.cooperativeCode} />
          <ReadOnlyField label="Antenne régionale" value={profile.antenne} />
          <ReadOnlyField label="Département" value={profile.departement} />
        </div>
      </CompteSubScreen>
    );
  }

  if (compteView === 'tel') {
    return (
      <CompteSubScreen title="Numéros enregistrés" onBack={() => setCompteView('main')}>
        <div className="space-y-3">
          <EditableField
            label="Téléphone principal"
            value={profile.telPrincipal}
            onChange={(v) => setProfile({ ...profile, telPrincipal: v })}
          />
          <EditableField
            label="Téléphone secondaire"
            value={profile.telSecondaire}
            onChange={(v) => setProfile({ ...profile, telSecondaire: v })}
          />
          <p className="text-[10px] text-slate-400">Ce numéro sert aussi pour le numéro vert et l&apos;app mobile.</p>
          <button
            type="button"
            onClick={() => { onSaveToast('Numéros enregistrés'); setCompteView('main'); }}
            className="w-full mt-4 py-3 rounded-xl bg-orange-500 text-white font-bold text-sm flex items-center justify-center gap-2"
          >
            <Save size={16} /> Enregistrer
          </button>
        </div>
      </CompteSubScreen>
    );
  }

  if (compteView === 'parcelles') {
    return (
      <CompteSubScreen title="Mes parcelles" onBack={() => setCompteView('main')}>
        <div className="space-y-2">
          {parcelles.map((p) => (
            <div key={p.id} className="p-3 rounded-xl bg-white border border-slate-100">
              <div className="flex items-center gap-2">
                <ProductThumb nom={p.culture} size="sm" />
                <div>
                  <p className="text-sm font-bold text-slate-900">{p.nom}</p>
                  <p className="text-xs text-slate-500">{p.superficie} · {p.culture}</p>
                </div>
              </div>
              <p className="text-[10px] text-slate-400 mt-2 flex items-center gap-1">
                <MapPin size={10} /> {p.lieu}
              </p>
            </div>
          ))}
        </div>
      </CompteSubScreen>
    );
  }

  const sections = [
    { id: 'profil', icon: User, label: 'Profil paysan', sub: `${profile.prenom} ${profile.nom} · ${profile.idProducteur}` },
    { id: 'coop', icon: Building2, label: 'Ma coopérative', sub: profile.cooperative },
    { id: 'tel', icon: Phone, label: 'Numéros enregistrés', sub: profile.telPrincipal },
    { id: 'parcelles', icon: Sprout, label: 'Mes parcelles', sub: `${parcelles.length} zones déclarées` },
  ];

  return (
    <div className="flex flex-col h-full min-h-0 bg-slate-50">
      <div className="px-4 pt-3 pb-3 bg-white border-b border-slate-100">
        <h2 className="text-lg font-bold text-slate-900">Mon compte</h2>
        <p className="text-xs text-slate-500">Rôle : Producteur</p>
      </div>
      <div className="flex-1 overflow-y-auto p-4 space-y-2">
        {sections.map(({ id, icon: Icon, label, sub }) => (
          <button
            key={id}
            type="button"
            onClick={() => setCompteView(id)}
            className="w-full flex items-center gap-3 p-4 rounded-xl bg-white border border-slate-100 text-left active:bg-slate-50"
          >
            <div className="p-2 rounded-lg bg-orange-500/10">
              <Icon size={18} className="text-orange-500" />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-semibold text-slate-900">{label}</p>
              <p className="text-xs text-slate-500 truncate">{sub}</p>
            </div>
            <ChevronRight size={16} className="text-slate-300" />
          </button>
        ))}
        <p className="text-[10px] text-center text-slate-400 pt-4 px-2 leading-relaxed">
          Même numéro, autre rôle ? Créez un compte Acheteur séparé — le rôle diffère, pas le téléphone.
        </p>
      </div>
    </div>
  );
}

function PhoneStatusBar() {
  return (
    <div className="flex items-center justify-between px-5 pt-2 pb-1 text-[10px] font-semibold text-slate-900 bg-white">
      <span>09:41</span>
      <div className="flex items-center gap-1">
        <span className="w-4 h-2 border border-slate-900 rounded-sm relative">
          <span className="absolute inset-0.5 bg-slate-900 rounded-[1px]" style={{ width: '70%' }} />
        </span>
      </div>
    </div>
  );
}

export default function ProducerPhoneMockup() {
  const [tab, setTab] = useState('accueil');
  const [screen, setScreen] = useState('main');
  const [toast, setToast] = useState(null);
  const [profile, setProfile] = useState(INITIAL_PROFILE);
  const [catalogue, setCatalogue] = useState(INITIAL_CATALOGUE);
  const [lots, setLots] = useState(INITIAL_LOTS);
  const [activeLot, setActiveLot] = useState(null);
  const [compteView, setCompteView] = useState('main');
  const [showStatutInfo, setShowStatutInfo] = useState(false);

  const showToast = (msg) => {
    setToast(msg);
    setTimeout(() => setToast(null), 3000);
  };

  const updateLot = (lotId, patch) => {
    setLots((prev) => prev.map((l) => (l.id === lotId ? { ...l, ...patch } : l)));
    setActiveLot((prev) => (prev?.id === lotId ? { ...prev, ...patch } : prev));
  };

  const handleConfirm = (data) => {
    const newLot = createLot(data, ['declare']);
    setLots((prev) => [newLot, ...prev]);
    setActiveLot(newLot);
    setScreen('lot-pending');
  };

  const handleSimulateValidation = () => {
    if (!activeLot) return;
    const patch = {
      validated: true,
      statut: 'VALIDE',
      statutLabel: 'Validé · ramassage autorisé',
      color: 'text-orange-500',
      completedKeys: ['declare', 'validation', 'receipt'],
    };
    updateLot(activeLot.id, patch);
    setActiveLot((prev) => ({ ...prev, ...patch }));
    setScreen('lot-receipt');
  };

  const handleAddProduct = (data) => {
    const actif = data.saison !== 'Hors saison (inactif)';
    setCatalogue((prev) => [
      ...prev,
      {
        id: Date.now(),
        nom: data.nom,
        dispo: '—',
        hub: data.hub,
        statut: actif ? 'Déclaré' : 'Hors saison',
        actif,
      },
    ]);
    setScreen('main');
    setTab('produits');
    showToast(`✓ ${data.nom} ajouté au catalogue`);
  };

  const showBottomNav = screen === 'main' && compteView === 'main';

  const closeLotFlow = () => {
    setScreen('main');
    setTab('historique');
    showToast('Lot enregistré · consultez l\'historique');
  };

  return (
    <div className="relative mx-auto w-full max-w-[360px]">
      <div className="rounded-[2.75rem] border-[7px] border-slate-800 bg-slate-800 shadow-2xl overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-28 h-7 bg-slate-800 rounded-b-2xl z-20" />
        <div className="bg-white rounded-[2.25rem] overflow-hidden h-[640px] flex flex-col relative">
          <PhoneStatusBar />

          {toast && (
            <div className="absolute top-12 left-3 right-3 z-30 py-2 px-3 rounded-xl bg-green-600 text-white text-xs font-semibold text-center shadow-lg flex items-center justify-center gap-1">
              <span>{toast}</span>
              <button type="button" onClick={() => setToast(null)} className="ml-1 opacity-70">
                <X size={12} />
              </button>
            </div>
          )}

          <div className="flex-1 min-h-0 overflow-hidden">
            {screen === 'declare' ? (
              <DeclareScreen onBack={() => setScreen('main')} onConfirm={handleConfirm} />
            ) : screen === 'add-product' ? (
              <AddProductScreen onBack={() => setScreen('main')} onSave={handleAddProduct} />
            ) : screen === 'lot-pending' && activeLot ? (
              <LotPendingScreen
                lot={activeLot}
                onBack={() => setScreen('main')}
                onSimulateValidation={handleSimulateValidation}
              />
            ) : screen === 'lot-receipt' && activeLot ? (
              <LotReceiptScreen
                lot={activeLot}
                onBack={() => setScreen('lot-pending')}
                onDone={closeLotFlow}
              />
            ) : screen === 'lot-detail' && activeLot ? (
              <LotDetailScreen
                lot={activeLot}
                onBack={() => setScreen('main')}
                onViewReceipt={() => setScreen('lot-receipt')}
              />
            ) : (
              <>
                {tab === 'accueil' && (
                  <AccueilScreen profile={profile} onDeclare={() => setScreen('declare')} />
                )}
                {tab === 'historique' && (
                  <HistoriqueScreen
                    lots={lots}
                    onOpenLot={(lot) => { setActiveLot(lot); setScreen('lot-detail'); }}
                  />
                )}
                {tab === 'produits' && (
                  <CatalogueScreen
                    catalogue={catalogue}
                    onAddProduct={() => setScreen('add-product')}
                    showStatutInfo={showStatutInfo}
                    onToggleStatutInfo={() => setShowStatutInfo((v) => !v)}
                  />
                )}
                {tab === 'compte' && (
                  <CompteScreen
                    profile={profile}
                    setProfile={setProfile}
                    parcelles={INITIAL_PARCELLES}
                    compteView={compteView}
                    setCompteView={setCompteView}
                    onSaveToast={showToast}
                  />
                )}
              </>
            )}
          </div>

          {!showBottomNav ? null : (
            <nav className="flex border-t border-slate-100 bg-white pb-2 pt-1 shrink-0">
              {NAV.map(({ id, label, icon: Icon }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => { setTab(id); setCompteView('main'); }}
                  className={`flex-1 min-w-0 flex flex-col items-center gap-0.5 py-1.5 px-0.5 ${tab === id ? 'text-orange-500' : 'text-slate-400'
                    }`}
                >
                  <Icon size={20} strokeWidth={tab === id ? 2.5 : 2} />
                  <span className="text-[8px] sm:text-[9px] font-semibold text-center leading-tight truncate max-w-full">
                    {label}
                  </span>
                </button>
              ))}
            </nav>
          )}
        </div>
      </div>
    </div>
  );
}

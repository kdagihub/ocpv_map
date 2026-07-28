import { createElement, useMemo, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowLeft,
  BadgeCheck,
  Boxes,
  Building2,
  Check,
  CheckCircle2,
  ChevronRight,
  ClipboardCheck,
  FileBadge2,
  FileCheck2,
  Gauge,
  LayoutDashboard,
  PackageCheck,
  Percent,
  Printer,
  ReceiptText,
  Search,
  ShieldCheck,
  Truck,
  X,
} from 'lucide-react';
import logoOcpv from '../assets/logo_ocpv.png';

const NAV_ITEMS = [
  { id: 'reception', label: 'Réceptions', icon: PackageCheck },
  { id: 'stocks', label: 'Lots stockés', icon: Boxes },
  { id: 'departs', label: 'Départs camions', icon: Truck },
];

const INITIAL_STOCKS = [
  { id: 'OCPV-BKE-2026-00501', produit: 'Igname', producteur: 'Kouassi Yao', tonnage: 8, qualite: 'Grade A', prix: 320000, age: '2 jours' },
  { id: 'OCPV-BKE-2026-00508', produit: 'Manioc', producteur: 'Traoré Aminata', tonnage: 12, qualite: 'Grade B', prix: 185000, age: '4 jours' },
  { id: 'OCPV-BKE-2026-00515', produit: 'Banane plantain', producteur: 'Koné Bernard', tonnage: 5, qualite: 'Grade A', prix: 275000, age: '1 jour' },
];

const RECEPTION_LOT = {
  id: 'OCPV-BKE-2026-00527',
  produit: 'Maïs',
  producteur: 'Awa Coulibaly',
  telephone: '07 48 21 36 90',
  declare: 7.5,
  hub: 'Bouaké Centre',
  transport: 'Camion OCPV',
};

const REQUIRED_DOCUMENTS = [
  { id: 'cp', label: 'Certificat de Provenance (CP)', detail: 'Émis par l’antenne OCPV' },
  { id: 'ape', label: 'Autorisation de Prélèvement et d’Exportation', detail: 'Selon la destination du chargement' },
  { id: 'origin', label: 'Certificat d’Origine (GUCE)', detail: 'Paiement effectué sur le Guichet Unique', external: true },
  { id: 'waybill', label: 'Lettre de voiture / bordereau', detail: 'Chargement et destination concordants' },
];

function formatPrice(value) {
  return `${new Intl.NumberFormat('fr-FR').format(value)} F CFA`;
}

function Metric({ icon: Icon, label, value, tone }) {
  const tones = {
    green: 'bg-green-50 text-green-700 ring-green-100',
    orange: 'bg-orange-50 text-orange-700 ring-orange-100',
    slate: 'bg-slate-50 text-slate-700 ring-slate-100',
  };
  return (
    <div className="rounded-2xl border border-slate-200 bg-white p-4 shadow-sm">
      <span className={`mb-4 grid h-9 w-9 place-items-center rounded-xl ring-1 ${tones[tone]}`}>{createElement(Icon, { size: 18 })}</span>
      <p className="text-2xl font-black tracking-tight text-slate-950">{value}</p>
      <p className="mt-1 text-xs font-medium text-slate-500">{label}</p>
    </div>
  );
}

function DepositReceipt({ lot, weight, quality, onClose }) {
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="max-h-[92vh] w-full max-w-lg overflow-y-auto rounded-3xl bg-white shadow-2xl">
        <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
          <div>
            <p className="text-xs font-black uppercase tracking-[0.18em] text-green-700">Document généré</p>
            <h2 className="text-lg font-extrabold text-slate-950">Reçu producteur</h2>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2 text-slate-500"><X size={18} /></button>
        </div>
        <div className="p-5 sm:p-7">
          <div className="rounded-2xl border-2 border-slate-900 bg-white p-5">
            <div className="flex items-start justify-between gap-4 border-b-2 border-slate-900 pb-4">
              <div className="flex items-center gap-3">
                <img src={logoOcpv} alt="OCPV" className="h-12 w-auto" />
                <div>
                  <p className="text-[9px] font-black uppercase tracking-widest text-slate-500">AGRILINK-CI · OCPV</p>
                  <h3 className="max-w-xs text-base font-black uppercase leading-tight text-slate-950">Reçu de Dépôt et de Vérification</h3>
                </div>
              </div>
              <ShieldCheck size={32} className="shrink-0 text-green-700" />
            </div>
            <div className="grid grid-cols-2 gap-x-5 gap-y-4 py-5 text-xs">
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Référence lot</p><p className="mt-1 font-mono font-bold">{lot.id}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Date / heure</p><p className="mt-1 font-bold">{new Date().toLocaleString('fr-FR')}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Producteur</p><p className="mt-1 font-bold">{lot.producteur}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Hub de réception</p><p className="mt-1 font-bold">{lot.hub}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Produit contrôlé</p><p className="mt-1 font-bold">{lot.produit}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Poids net réceptionné</p><p className="mt-1 text-base font-black text-green-700">{weight} tonnes</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Contrôle qualité</p><p className="mt-1 font-bold">{quality}</p></div>
              <div><p className="text-[9px] font-bold uppercase text-slate-400">Statut catalogue</p><p className="mt-1 font-bold text-green-700">Disponible</p></div>
            </div>
            <div className="flex items-center gap-3 rounded-xl bg-green-50 p-3 text-[10px] font-semibold leading-relaxed text-green-900">
              <BadgeCheck size={20} className="shrink-0" />
              Marchandise réceptionnée, pesée et contrôlée par un agent habilité OCPV.
            </div>
            <div className="mt-8 grid grid-cols-2 gap-8 text-center text-[9px] font-bold uppercase text-slate-500">
              <div className="border-t border-slate-400 pt-2">Signature agent OCPV</div>
              <div className="border-t border-slate-400 pt-2">Signature producteur</div>
            </div>
          </div>
          <button type="button" onClick={() => window.print()} className="mt-4 flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white">
            <Printer size={17} /> Imprimer / enregistrer le reçu
          </button>
        </div>
      </div>
    </div>
  );
}

function DiscountModal({ lot, onClose, onApply }) {
  const [percent, setPercent] = useState(10);
  const [reason, setReason] = useState('Péremption proche');
  const newPrice = Math.round(lot.prix * (1 - percent / 100));
  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-slate-950/60 p-4 backdrop-blur-sm">
      <div className="w-full max-w-md rounded-3xl bg-white p-6 shadow-2xl">
        <div className="flex items-start justify-between">
          <div>
            <p className="text-xs font-black uppercase tracking-widest text-orange-600">Action agent requise</p>
            <h2 className="mt-1 text-xl font-black text-slate-950">Décote manuelle</h2>
            <p className="mt-1 text-xs text-slate-500">{lot.produit} · {lot.id}</p>
          </div>
          <button type="button" onClick={onClose} className="rounded-full bg-slate-100 p-2"><X size={18} /></button>
        </div>
        <div className="mt-5 space-y-4">
          <div>
            <label className="text-xs font-bold text-slate-700">Motif obligatoire</label>
            <select value={reason} onChange={(event) => setReason(event.target.value)} className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-3 py-3 text-sm outline-none focus:border-orange-500">
              <option>Péremption proche</option>
              <option>Altération de la qualité</option>
              <option>Écoulement prioritaire validé</option>
            </select>
          </div>
          <div>
            <div className="flex items-center justify-between text-xs font-bold text-slate-700"><label htmlFor="discount">Taux de décote</label><span className="text-orange-600">{percent} %</span></div>
            <input id="discount" type="range" min="1" max="40" value={percent} onChange={(event) => setPercent(Number(event.target.value))} className="mt-3 w-full accent-orange-500" />
          </div>
          <div className="grid grid-cols-2 gap-3 rounded-2xl bg-slate-50 p-4">
            <div><p className="text-[10px] font-bold uppercase text-slate-400">Prix actuel</p><p className="mt-1 text-sm font-bold text-slate-500 line-through">{formatPrice(lot.prix)}/t</p></div>
            <div><p className="text-[10px] font-bold uppercase text-slate-400">Nouveau prix</p><p className="mt-1 text-sm font-black text-green-700">{formatPrice(newPrice)}/t</p></div>
          </div>
          <p className="text-[10px] leading-relaxed text-slate-500">La décision sera horodatée et attribuée à votre compte agent. Aucun ajustement automatique ne sera appliqué ultérieurement.</p>
        </div>
        <div className="mt-5 flex gap-2">
          <button type="button" onClick={onClose} className="flex-1 rounded-xl border border-slate-200 py-3 text-sm font-bold text-slate-600">Annuler</button>
          <button type="button" onClick={() => onApply({ percent, reason, newPrice })} className="flex-[1.4] rounded-xl bg-orange-500 py-3 text-sm font-bold text-white">Confirmer la décote</button>
        </div>
      </div>
    </div>
  );
}

export default function DashboardHub() {
  const [tab, setTab] = useState('reception');
  const [weight, setWeight] = useState('7.3');
  const [quality, setQuality] = useState('Grade A · Conforme');
  const [checks, setChecks] = useState({ identity: true, weighing: false, quality: false });
  const [receiptOpen, setReceiptOpen] = useState(false);
  const [stocks, setStocks] = useState(INITIAL_STOCKS);
  const [discountLot, setDiscountLot] = useState(null);
  const [documents, setDocuments] = useState({ cp: true, ape: true, origin: false, waybill: false });
  const [truckReleased, setTruckReleased] = useState(false);
  const receptionReady = Object.values(checks).every(Boolean) && Number(weight) >= 5;
  const docsReady = Object.values(documents).every(Boolean);
  const stockValue = useMemo(() => stocks.reduce((total, lot) => total + lot.prix * lot.tonnage, 0), [stocks]);

  return (
    <div className="min-h-screen bg-[#f4f6f3] text-slate-900">
      <header className="sticky top-0 z-30 border-b border-slate-200/80 bg-white/95 backdrop-blur">
        <div className="mx-auto flex h-16 max-w-[1500px] items-center justify-between px-4 sm:px-6">
          <div className="flex items-center gap-4">
            <Link to="/" className="rounded-xl border border-slate-200 p-2 text-slate-500 transition hover:bg-slate-50"><ArrowLeft size={18} /></Link>
            <img src={logoOcpv} alt="OCPV" className="h-9 w-auto" />
            <div className="hidden border-l border-slate-200 pl-4 sm:block">
              <p className="text-[10px] font-black uppercase tracking-[0.18em] text-green-700">AGRILINK-CI</p>
              <p className="text-sm font-extrabold">Hub OCPV · Bouaké Centre</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden items-center gap-1.5 rounded-full bg-green-50 px-3 py-1.5 text-xs font-bold text-green-700 sm:flex"><span className="h-2 w-2 rounded-full bg-green-500" /> Centre opérationnel</span>
            <div className="grid h-9 w-9 place-items-center rounded-full bg-slate-900 text-xs font-black text-white">AK</div>
          </div>
        </div>
      </header>

      <div className="mx-auto grid max-w-[1500px] lg:grid-cols-[250px_1fr]">
        <aside className="border-r border-slate-200 bg-white p-4 lg:min-h-[calc(100vh-4rem)]">
          <div className="mb-5 rounded-2xl bg-slate-950 p-4 text-white">
            <div className="flex items-center gap-2"><Building2 size={18} className="text-green-400" /><span className="text-sm font-extrabold">Poste Agent Hub</span></div>
            <p className="mt-2 text-[10px] leading-relaxed text-white/55">Réception, certification des lots et contrôle des départs.</p>
          </div>
          <nav className="flex gap-2 overflow-x-auto lg:block lg:space-y-1">
            {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
              <button key={id} type="button" onClick={() => setTab(id)} className={`flex min-w-max items-center gap-3 rounded-xl px-3 py-3 text-sm font-bold transition lg:w-full ${tab === id ? 'bg-green-50 text-green-800' : 'text-slate-500 hover:bg-slate-50'}`}>
                {createElement(Icon, { size: 18 })}<span>{label}</span>{tab === id && <ChevronRight size={15} className="ml-auto hidden lg:block" />}
              </button>
            ))}
          </nav>
          <div className="mt-8 hidden rounded-xl border border-orange-200 bg-orange-50 p-3 lg:block">
            <p className="flex items-center gap-2 text-xs font-bold text-orange-900"><Gauge size={15} /> Prix sous contrôle humain</p>
            <p className="mt-1 text-[10px] leading-relaxed text-orange-800">Toute décote exige une action et un motif agent.</p>
          </div>
        </aside>

        <main className="min-w-0 p-4 sm:p-6 lg:p-8">
          <div className="mb-7 flex flex-wrap items-end justify-between gap-4">
            <div>
              <p className="flex items-center gap-2 text-xs font-black uppercase tracking-[0.18em] text-green-700"><LayoutDashboard size={14} /> Centre de gravité opérationnel</p>
              <h1 className="mt-2 text-2xl font-black tracking-tight sm:text-3xl">
                {tab === 'reception' ? 'Réception & vérification' : tab === 'stocks' ? 'Gestion manuelle des lots' : 'Contrôle des départs'}
              </h1>
              <p className="mt-1 text-sm text-slate-500">Lundi 28 juillet 2026 · Vacation matin</p>
            </div>
            <div className="relative">
              <Search size={15} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input placeholder="Lot, producteur, plaque…" className="w-64 rounded-xl border border-slate-200 bg-white py-2.5 pl-9 pr-3 text-xs outline-none focus:border-green-500" />
            </div>
          </div>

          <div className="mb-7 grid grid-cols-2 gap-3 xl:grid-cols-4">
            <Metric icon={PackageCheck} label="Réceptions à traiter" value="06" tone="orange" />
            <Metric icon={Boxes} label="Lots disponibles" value={stocks.length} tone="green" />
            <Metric icon={Truck} label="Départs aujourd’hui" value="09" tone="slate" />
            <Metric icon={Gauge} label="Valeur du stock" value={`${Math.round(stockValue / 1000000)} M`} tone="green" />
          </div>

          {tab === 'reception' && (
            <div className="grid gap-5 xl:grid-cols-[1fr_0.8fr]">
              <section className="rounded-3xl border border-slate-200 bg-white shadow-sm">
                <div className="flex items-center justify-between border-b border-slate-100 p-5">
                  <div><p className="text-xs font-black uppercase tracking-widest text-orange-600">Arrivée prioritaire</p><h2 className="mt-1 text-lg font-extrabold">{RECEPTION_LOT.produit} · {RECEPTION_LOT.declare} t déclarées</h2></div>
                  <span className="rounded-full bg-amber-100 px-3 py-1 text-[10px] font-black uppercase text-amber-800">En cours de vérification</span>
                </div>
                <div className="grid gap-4 p-5 sm:grid-cols-2">
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Producteur</p><p className="mt-1 font-extrabold">{RECEPTION_LOT.producteur}</p><p className="text-xs text-slate-500">{RECEPTION_LOT.telephone}</p>
                  </div>
                  <div className="rounded-2xl bg-slate-50 p-4">
                    <p className="text-[10px] font-bold uppercase text-slate-400">Acheminement</p><p className="mt-1 font-extrabold">{RECEPTION_LOT.transport}</p><p className="text-xs text-slate-500">{RECEPTION_LOT.id}</p>
                  </div>
                  <label className="text-xs font-bold text-slate-600">Poids net contrôlé (tonnes)<input type="number" min="5" step="0.1" value={weight} onChange={(event) => setWeight(event.target.value)} className="mt-2 w-full rounded-xl border-2 border-slate-200 px-4 py-3 text-lg font-black outline-none focus:border-green-500" /></label>
                  <label className="text-xs font-bold text-slate-600">Résultat du contrôle qualité<select value={quality} onChange={(event) => setQuality(event.target.value)} className="mt-2 w-full rounded-xl border-2 border-slate-200 bg-white px-4 py-3 text-sm font-bold outline-none focus:border-green-500"><option>Grade A · Conforme</option><option>Grade B · Conforme avec réserve</option><option>Non conforme · Lot refusé</option></select></label>
                </div>
              </section>

              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-green-50 text-green-700"><ClipboardCheck size={20} /></span><div><h2 className="font-extrabold">Protocole de réception</h2><p className="text-xs text-slate-500">3 contrôles obligatoires</p></div></div>
                <div className="my-5 space-y-2">
                  {[
                    { id: 'identity', label: 'Identité et déclaration concordantes' },
                    { id: 'weighing', label: 'Pesée contradictoire effectuée' },
                    { id: 'quality', label: 'Contrôle qualité enregistré' },
                  ].map((item) => (
                    <button key={item.id} type="button" onClick={() => setChecks((current) => ({ ...current, [item.id]: !current[item.id] }))} className={`flex w-full items-center gap-3 rounded-xl border p-3 text-left text-xs font-bold ${checks[item.id] ? 'border-green-200 bg-green-50 text-green-800' : 'border-slate-200 text-slate-600'}`}>
                      <span className={`grid h-5 w-5 shrink-0 place-items-center rounded-md ${checks[item.id] ? 'bg-green-600 text-white' : 'border-2 border-slate-300'}`}>{checks[item.id] && <Check size={13} />}</span>{item.label}
                    </button>
                  ))}
                </div>
                <button type="button" disabled={!receptionReady} onClick={() => setReceiptOpen(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-green-700 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"><ReceiptText size={17} /> Valider et générer le reçu</button>
                <p className="mt-2 text-center text-[9px] text-slate-400">Le lot passe “Disponible” après validation.</p>
              </section>
            </div>
          )}

          {tab === 'stocks' && (
            <section className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-sm">
              <div className="flex flex-wrap items-center justify-between gap-3 border-b border-slate-100 p-5">
                <div><h2 className="text-lg font-extrabold">Lots disponibles au catalogue</h2><p className="text-xs text-slate-500">Aucune baisse automatique de prix</p></div>
                <span className="flex items-center gap-2 rounded-full bg-orange-50 px-3 py-1.5 text-[10px] font-bold text-orange-800"><Percent size={13} /> Décote sur décision agent uniquement</span>
              </div>
              <div className="divide-y divide-slate-100">
                {stocks.map((lot) => (
                  <div key={lot.id} className="grid gap-4 p-5 md:grid-cols-[1.2fr_0.7fr_0.7fr_auto] md:items-center">
                    <div><div className="flex items-center gap-2"><span className="h-2.5 w-2.5 rounded-full bg-green-500" /><h3 className="font-extrabold">{lot.produit} · {lot.tonnage} t</h3></div><p className="mt-1 font-mono text-[10px] text-slate-400">{lot.id}</p><p className="text-xs text-slate-500">{lot.producteur}</p></div>
                    <div><p className="text-[9px] font-bold uppercase text-slate-400">Contrôle</p><p className="mt-1 text-xs font-bold">{lot.qualite} · {lot.age}</p></div>
                    <div><p className="text-[9px] font-bold uppercase text-slate-400">Prix agent</p><p className="mt-1 text-sm font-black text-green-700">{formatPrice(lot.prix)}/t</p></div>
                    <button type="button" onClick={() => setDiscountLot(lot)} className="flex items-center justify-center gap-2 rounded-xl border border-orange-200 bg-orange-50 px-4 py-3 text-xs font-bold text-orange-800"><Percent size={15} /> Appliquer une décote manuelle <span className="hidden xl:inline">(Péremption/Qualité)</span></button>
                  </div>
                ))}
              </div>
            </section>
          )}

          {tab === 'departs' && (
            <div className="grid gap-5 xl:grid-cols-[0.75fr_1fr]">
              <section className="rounded-3xl bg-slate-950 p-6 text-white shadow-sm">
                <span className="grid h-12 w-12 place-items-center rounded-2xl bg-white/10 text-green-400"><Truck size={24} /></span>
                <p className="mt-5 text-[10px] font-black uppercase tracking-[0.18em] text-green-400">Départ Hub Bouaké</p>
                <h2 className="mt-2 text-2xl font-black">1234 AB 01</h2>
                <p className="mt-1 text-sm text-white/55">Camion 10 t · Jean Konan</p>
                <div className="my-5 border-t border-white/10" />
                <div className="grid grid-cols-2 gap-4 text-xs">
                  <div><p className="text-white/40">Chargement</p><p className="mt-1 font-bold">Igname · 8 t</p></div>
                  <div><p className="text-white/40">Destination</p><p className="mt-1 font-bold">Abidjan</p></div>
                  <div><p className="text-white/40">Transporteur</p><p className="mt-1 font-bold">Koné Express</p></div>
                  <div><p className="text-white/40">Scellé</p><p className="mt-1 font-bold">OCPV-77841</p></div>
                </div>
              </section>
              <section className="rounded-3xl border border-slate-200 bg-white p-5 shadow-sm">
                <div className="flex items-center gap-3"><span className="grid h-10 w-10 place-items-center rounded-xl bg-orange-50 text-orange-600"><FileCheck2 size={20} /></span><div><h2 className="font-extrabold">Documents obligatoires au départ</h2><p className="text-xs text-slate-500">Vérification et visa de l’agent</p></div></div>
                <div className="my-5 space-y-2">
                  {REQUIRED_DOCUMENTS.map((document) => (
                    <button key={document.id} type="button" onClick={() => setDocuments((current) => ({ ...current, [document.id]: !current[document.id] }))} className={`flex w-full items-start gap-3 rounded-xl border p-3 text-left ${documents[document.id] ? 'border-green-200 bg-green-50' : document.external ? 'border-orange-300 bg-orange-50' : 'border-slate-200'}`}>
                      <span className={`mt-0.5 grid h-5 w-5 shrink-0 place-items-center rounded-md ${documents[document.id] ? 'bg-green-600 text-white' : 'border-2 border-slate-300 bg-white'}`}>{documents[document.id] && <Check size={13} />}</span>
                      <span className="min-w-0"><span className="flex items-center gap-1.5 text-xs font-extrabold text-slate-800">{document.external && <FileBadge2 size={14} className="text-orange-600" />}{document.label}</span><span className={`mt-0.5 block text-[10px] ${document.external ? 'font-bold text-orange-700' : 'text-slate-500'}`}>{document.detail}</span></span>
                    </button>
                  ))}
                </div>
                {truckReleased ? (
                  <div className="flex items-center justify-center gap-2 rounded-xl bg-green-100 py-3.5 text-sm font-bold text-green-800"><CheckCircle2 size={18} /> Départ autorisé et horodaté</div>
                ) : (
                  <button type="button" disabled={!docsReady} onClick={() => setTruckReleased(true)} className="flex w-full items-center justify-center gap-2 rounded-xl bg-slate-950 py-3.5 text-sm font-bold text-white disabled:cursor-not-allowed disabled:bg-slate-200 disabled:text-slate-400"><ShieldCheck size={17} /> Autoriser la sortie du camion</button>
                )}
              </section>
            </div>
          )}
        </main>
      </div>

      {receiptOpen && <DepositReceipt lot={RECEPTION_LOT} weight={weight} quality={quality} onClose={() => setReceiptOpen(false)} />}
      {discountLot && (
        <DiscountModal
          lot={discountLot}
          onClose={() => setDiscountLot(null)}
          onApply={({ newPrice }) => {
            setStocks((current) => current.map((lot) => (lot.id === discountLot.id ? { ...lot, prix: newPrice } : lot)));
            setDiscountLot(null);
          }}
        />
      )}
    </div>
  );
}

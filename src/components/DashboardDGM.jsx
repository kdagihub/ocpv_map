import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Globe, PieChart, Activity, Map, ArrowLeft, Filter, DollarSign,
  Truck, Terminal, Download, ShieldCheck, BarChart3, TrendingUp,
  Leaf, ArrowRight, ExternalLink, MapPin, FileText, QrCode, Search, Menu, X,
} from 'lucide-react';
import logoOcpv from '../assets/logo_ocpv.png';

const ANTENNES = ['Toutes les Antennes', 'Abidjan', 'Bouaké', 'Korhogo', 'Daloa', 'San Pedro'];

const KPIS_PAR_ANTENNE = {
  'Toutes les Antennes': { recettes: 14850000, tonnage: 8420, camions: 412, tpeActifs: '134 / 150', tpeOnline: 89 },
  Abidjan: { recettes: 2100000, tonnage: 980, camions: 58, tpeActifs: '22 / 24', tpeOnline: 92 },
  Bouaké: { recettes: 4200000, tonnage: 2100, camions: 112, tpeActifs: '28 / 30', tpeOnline: 93 },
  Korhogo: { recettes: 3800000, tonnage: 1950, camions: 98, tpeActifs: '24 / 28', tpeOnline: 86 },
  Daloa: { recettes: 3100000, tonnage: 1600, camions: 82, tpeActifs: '20 / 24', tpeOnline: 83 },
  'San Pedro': { recettes: 1640000, tonnage: 790, camions: 62, tpeActifs: '18 / 22', tpeOnline: 82 },
};

const REPARTITION_FINANCIERE = [
  { beneficiaire: 'Trésor Public', pourcentage: 70, color: 'bg-emerald-500' },
  { beneficiaire: 'OCPV (Fonctionnement)', pourcentage: 15, color: 'bg-blue-500' },
  { beneficiaire: 'Antennes Régionales', pourcentage: 10, color: 'bg-orange-500' },
  { beneficiaire: 'Prestataire Technique', pourcentage: 5, color: 'bg-purple-500' },
];

const TOP_ANTENNES = [
  { nom: 'Bouaké', recettes: 4200000, flux: '2 100 T', tendance: '+12%' },
  { nom: 'Korhogo', recettes: 3800000, flux: '1 950 T', tendance: '+8%' },
  { nom: 'Daloa', recettes: 3100000, flux: '1 600 T', tendance: '-2%' },
  { nom: 'Abidjan', recettes: 2100000, flux: '980 T', tendance: '+5%' },
  { nom: 'San Pedro', recettes: 1640000, flux: '790 T', tendance: '+3%' },
];

const TRANSACTIONS_GLOBALES = [
  { id: 'TRX-N-890', antenne: 'Bouaké', produit: 'Igname', montant: 30000, statut: 'Validé' },
  { id: 'TRX-N-889', antenne: 'Korhogo', produit: 'Maïs', montant: 15000, statut: 'Validé' },
  { id: 'TRX-N-888', antenne: 'San Pedro', produit: 'Manioc', montant: 20000, statut: 'Validé' },
  { id: 'TRX-N-887', antenne: 'Abidjan', produit: 'Banane', montant: 45000, statut: 'Validé' },
];

const CERTIFICATS_NATIONAUX = [
  { id: 'CP-2026-A3F8B2', type: 'CP', antenne: 'Bouaké', zone: 'PK30 Nord', plaque: '1234 AB 01', transporteur: 'Jean Konan', produit: 'Igname', tonnage: 15, provenance: 'Bouaké', destination: 'Abidjan', tpeId: 'TPE-BKE-001', agent: 'Kouassi M.', montant: 30000, dateEmission: '18/06/2026 14:23', statut: 'Valide', qrHash: 'SHA256:a1b2c3d4…F8B2' },
  { id: 'CP-2026-B7K1M9', type: 'CP', antenne: 'Bouaké', zone: 'Tiébissou', plaque: '5678 CD 02', transporteur: 'Kouassi Aya', produit: 'Banane Plantain', tonnage: 8, provenance: 'Tiébissou', destination: 'Bouaké', tpeId: 'TPE-BKE-002', agent: 'Bamba A.', montant: 12000, dateEmission: '18/06/2026 14:15', statut: 'Valide', qrHash: 'SHA256:b2c3d4e5…K1M9' },
  { id: 'APE-2026-C4N8P3', type: 'APE', antenne: 'Bouaké', zone: 'PK30 Nord', plaque: '9012 EF 03', transporteur: 'Traoré Ibrahim', produit: 'Tomate', tonnage: 10, provenance: 'Bouaké', destination: 'Accra', tpeId: 'TPE-BKE-001', agent: 'Kouassi M.', montant: 60000, dateEmission: '18/06/2026 13:50', statut: 'Valide', qrHash: 'SHA256:c3d4e5f6…N8P3' },
  { id: 'APE-2026-H8K2L5', type: 'APE', antenne: 'Korhogo', zone: 'Axe Nord', plaque: '2468 KL 06', transporteur: 'N\'Guessan Paul', produit: 'Maïs', tonnage: 12, provenance: 'Korhogo', destination: 'Lomé', tpeId: 'TPE-KRH-001', agent: 'Traoré S.', montant: 60000, dateEmission: '18/06/2026 11:45', statut: 'Valide', qrHash: 'SHA256:f6a7b8c9…K2L5' },
  { id: 'CP-2026-J3M7N1', type: 'CP', antenne: 'Korhogo', zone: 'Ferké', plaque: '1357 MN 07', transporteur: 'Coulibaly Aïcha', produit: 'Manioc', tonnage: 18, provenance: 'Korhogo', destination: 'Abidjan', tpeId: 'TPE-KRH-002', agent: 'Ouattara K.', montant: 18000, dateEmission: '18/06/2026 10:30', statut: 'Valide', qrHash: 'SHA256:a7b8c9d0…M7N1' },
  { id: 'CP-2026-L5P9Q3', type: 'CP', antenne: 'Daloa', zone: 'Marché Gros', plaque: '8642 OP 08', transporteur: 'Bamba Oumar', produit: 'Cacao', tonnage: 6, provenance: 'Daloa', destination: 'San Pedro', tpeId: 'TPE-DLA-001', agent: 'Diabaté F.', montant: 9000, dateEmission: '18/06/2026 09:15', statut: 'Valide', qrHash: 'SHA256:b8c9d0e1…P9Q3' },
  { id: 'APE-2026-M2R4S6', type: 'APE', antenne: 'San Pedro', zone: 'Port', plaque: '9753 QR 09', transporteur: 'Koné Issa', produit: 'Banane', tonnage: 14, provenance: 'San Pedro', destination: 'Monrovia', tpeId: 'TPE-SPE-001', agent: 'Gnahoré L.', montant: 60000, dateEmission: '17/06/2026 17:40', statut: 'Valide', qrHash: 'SHA256:c9d0e1f2…R4S6' },
  { id: 'CP-2026-N6T8U2', type: 'CP', antenne: 'Abidjan', zone: 'Zone Sud', plaque: '4681 ST 10', transporteur: 'Yao Serge', produit: 'Ananas', tonnage: 5, provenance: 'Abidjan', destination: 'Bouaké', tpeId: 'TPE-ABJ-001', agent: 'Aka J.', montant: 7500, dateEmission: '17/06/2026 15:20', statut: 'Valide', qrHash: 'SHA256:d0e1f2a3…T8U2' },
  { id: 'CP-2026-P1V3W5', type: 'CP', antenne: 'Abidjan', zone: 'PK12', plaque: '7531 UV 11', transporteur: 'Diallo Mamadou', produit: 'Tomate', tonnage: 9, provenance: 'Bouaké', destination: 'Abidjan', tpeId: 'TPE-ABJ-002', agent: 'Koffi E.', montant: 22500, dateEmission: '17/06/2026 14:05', statut: 'En attente synchro', qrHash: 'SHA256:e1f2a3b4…V3W5' },
  { id: 'APE-2026-Q4X6Y8', type: 'APE', antenne: 'Daloa', zone: 'Issia', plaque: '1593 WX 12', transporteur: 'Soro Adama', produit: 'Igname', tonnage: 20, provenance: 'Daloa', destination: 'Conakry', tpeId: 'TPE-DLA-002', agent: 'Cissé M.', montant: 60000, dateEmission: '17/06/2026 12:50', statut: 'Valide', qrHash: 'SHA256:f2a3b4c5…X6Y8' },
  { id: 'CP-2026-R7Z9A1', type: 'CP', antenne: 'San Pedro', zone: 'Sassandra', plaque: '3579 YZ 13', transporteur: 'Fofana Ibra', produit: 'Manioc', tonnage: 16, provenance: 'Daloa', destination: 'San Pedro', tpeId: 'TPE-SPE-002', agent: 'Bedié R.', montant: 16000, dateEmission: '17/06/2026 11:30', statut: 'Valide', qrHash: 'SHA256:a3b4c5d6…Z9A1' },
  { id: 'APE-2026-S2B4C6', type: 'APE', antenne: 'Bouaké', zone: 'Marché Gros', plaque: '8024 BC 14', transporteur: 'Kone Fatou', produit: 'Banane Plantain', tonnage: 11, provenance: 'Bouaké', destination: 'Bamako', tpeId: 'TPE-BKE-003', agent: 'Koné F.', montant: 60000, dateEmission: '16/06/2026 16:10', statut: 'Valide', qrHash: 'SHA256:b4c5d6e7…B4C6' },
];

const STATS_SIM_PRODUITS = [
  { produit: 'Igname', volume: 2840, part: 34, prixMoyen: 2000, tendance: '+8%' },
  { produit: 'Manioc', volume: 1920, part: 23, prixMoyen: 1000, tendance: '+3%' },
  { produit: 'Banane Plantain', volume: 1560, part: 19, prixMoyen: 1500, tendance: '+12%' },
  { produit: 'Maïs', volume: 980, part: 12, prixMoyen: 1200, tendance: '-1%' },
  { produit: 'Tomate', volume: 620, part: 7, prixMoyen: 2500, tendance: '+5%' },
  { produit: 'Ananas', volume: 500, part: 5, prixMoyen: 1800, tendance: '+2%' },
];

const STATS_SIM_MENSUEL = [
  { mois: 'Jan', volume: 6200 },
  { mois: 'Fév', volume: 5800 },
  { mois: 'Mar', volume: 7100 },
  { mois: 'Avr', volume: 6900 },
  { mois: 'Mai', volume: 7600 },
  { mois: 'Juin', volume: 8420 },
];

const FLUX_CORRIDORS = [
  { origine: 'Bouaké', destination: 'Abidjan', produit: 'Igname', volume: '840 T', camions: 42, statut: 'Actif' },
  { origine: 'Korhogo', destination: 'Abidjan', produit: 'Maïs', volume: '620 T', camions: 31, statut: 'Actif' },
  { origine: 'Daloa', destination: 'San Pedro', produit: 'Manioc', volume: '510 T', camions: 28, statut: 'Actif' },
  { origine: 'San Pedro', destination: 'Abidjan', produit: 'Banane', volume: '390 T', camions: 19, statut: 'Modéré' },
  { origine: 'Bouaké', destination: 'Yamoussoukro', produit: 'Tomate', volume: '280 T', camions: 14, statut: 'Actif' },
];

const FLUX_ANTENNES = [
  { nom: 'Bouaké', entrees: 2100, sorties: 1850, recettes: 4200000, x: 52, y: 38 },
  { nom: 'Korhogo', entrees: 1950, sorties: 1720, recettes: 3800000, x: 48, y: 18 },
  { nom: 'Daloa', entrees: 1600, sorties: 1410, recettes: 3100000, x: 28, y: 48 },
  { nom: 'Abidjan', entrees: 980, sorties: 2240, recettes: 2100000, x: 72, y: 72 },
  { nom: 'San Pedro', entrees: 790, sorties: 650, recettes: 1640000, x: 18, y: 78 },
];

const TAB_TITLES = {
  nationale: 'Supervision Globale',
  finances: 'Finances & DAAF',
  sim: 'Statistiques SIM',
  cartographie: 'Cartographie des Flux',
  certificats: 'Traçabilité CP / APE',
};

const NAV_ITEMS = [
  { id: 'nationale', label: 'Vue Nationale (Macro)', icon: Globe },
  { id: 'finances', label: 'Finances & DAAF', icon: DollarSign },
  { id: 'sim', label: 'Statistiques (SIM)', icon: BarChart3 },
  { id: 'cartographie', label: 'Cartographie des Flux', icon: Map },
  { id: 'certificats', label: 'Traçabilité CP / APE', icon: FileText },
];

const formatFcfa = (montant) => `${montant.toLocaleString('fr-FR')} FCFA`;

const DashboardDGM = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('nationale');
  const [filtreAntenne, setFiltreAntenne] = useState('Toutes les Antennes');
  const [filtreTypeActe, setFiltreTypeActe] = useState('Tous');
  const [searchCertificat, setSearchCertificat] = useState('');
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const selectTab = (id) => {
    setActiveTab(id);
    setMobileNavOpen(false);
  };

  const navButtonClass = (id) => (
    `w-full flex items-center p-3 text-sm rounded-lg transition-colors ${
      activeTab === id
        ? 'bg-slate-800 text-yellow-500 font-bold border-l-4 border-yellow-500'
        : 'text-slate-300 hover:bg-slate-800'
    }`
  );

  const kpis = KPIS_PAR_ANTENNE[filtreAntenne];

  const repartitionFinanciere = useMemo(() =>
    REPARTITION_FINANCIERE.map((item) => ({
      ...item,
      montant: formatFcfa(Math.round(kpis.recettes * (item.pourcentage / 100))),
    })),
  [kpis.recettes]);

  const topAntennes = useMemo(() => {
    if (filtreAntenne === 'Toutes les Antennes') return TOP_ANTENNES;
    const found = TOP_ANTENNES.find((a) => a.nom === filtreAntenne);
    return found ? [found] : [];
  }, [filtreAntenne]);

  const transactions = useMemo(() => {
    if (filtreAntenne === 'Toutes les Antennes') return TRANSACTIONS_GLOBALES;
    return TRANSACTIONS_GLOBALES.filter((t) => t.antenne === filtreAntenne);
  }, [filtreAntenne]);

  const statsProduits = useMemo(() => {
    if (filtreAntenne === 'Toutes les Antennes') return STATS_SIM_PRODUITS;
    const ratio = (KPIS_PAR_ANTENNE[filtreAntenne]?.tonnage || 0) / KPIS_PAR_ANTENNE['Toutes les Antennes'].tonnage;
    return STATS_SIM_PRODUITS.map((p) => ({
      ...p,
      volume: Math.round(p.volume * ratio),
      part: p.part,
    }));
  }, [filtreAntenne]);

  const fluxCorridors = useMemo(() => {
    if (filtreAntenne === 'Toutes les Antennes') return FLUX_CORRIDORS;
    return FLUX_CORRIDORS.filter((f) => f.origine === filtreAntenne || f.destination === filtreAntenne);
  }, [filtreAntenne]);

  const fluxAntennes = useMemo(() => {
    if (filtreAntenne === 'Toutes les Antennes') return FLUX_ANTENNES;
    return FLUX_ANTENNES.filter((a) => a.nom === filtreAntenne);
  }, [filtreAntenne]);

  const filteredCertificats = useMemo(() => {
    let list = CERTIFICATS_NATIONAUX;
    if (filtreAntenne !== 'Toutes les Antennes') {
      list = list.filter((c) => c.antenne === filtreAntenne);
    }
    if (filtreTypeActe !== 'Tous') {
      list = list.filter((c) => c.type === filtreTypeActe);
    }
    if (searchCertificat) {
      const q = searchCertificat.toLowerCase();
      list = list.filter((c) =>
        c.id.toLowerCase().includes(q)
        || c.plaque.toLowerCase().includes(q)
        || c.transporteur.toLowerCase().includes(q)
        || c.antenne.toLowerCase().includes(q)
        || c.zone.toLowerCase().includes(q),
      );
    }
    return list;
  }, [filtreAntenne, filtreTypeActe, searchCertificat]);

  const certificatsKpis = useMemo(() => ({
    total: filteredCertificats.length,
    cp: filteredCertificats.filter((c) => c.type === 'CP').length,
    ape: filteredCertificats.filter((c) => c.type === 'APE').length,
    valides: filteredCertificats.filter((c) => c.statut === 'Valide').length,
  }), [filteredCertificats]);

  const certificatsKpisAntenne = useMemo(() => {
    let list = CERTIFICATS_NATIONAUX;
    if (filtreAntenne !== 'Toutes les Antennes') {
      list = list.filter((c) => c.antenne === filtreAntenne);
    }
    return {
      cp: list.filter((c) => c.type === 'CP').length,
      ape: list.filter((c) => c.type === 'APE').length,
      valides: list.filter((c) => c.statut === 'Valide').length,
    };
  }, [filtreAntenne]);

  const maxVolumeMensuel = Math.max(...STATS_SIM_MENSUEL.map((m) => m.volume));

  return (
    <div className="flex h-screen bg-slate-100 font-sans overflow-hidden">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[min(18rem,88vw)] lg:w-64 bg-slate-900 text-white flex flex-col shadow-2xl shrink-0 transform transition-transform duration-200 ease-out ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <img src={logoOcpv} alt="OCPV" className="h-9 sm:h-10 w-auto mb-2" draggable={false} />
            <p className="text-[10px] text-slate-400 uppercase tracking-widest">Direction Générale</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg shrink-0"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-2 mt-2 sm:mt-4 overflow-y-auto">
          <button onClick={() => navigate('/')} className="w-full flex items-center p-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group mb-2 sm:mb-4 border border-slate-700">
            <ArrowLeft size={18} className="mr-3 text-slate-400 group-hover:text-white shrink-0" />
            Retour Cartographie
          </button>

          <p className="text-xs text-slate-500 uppercase font-bold tracking-wider px-3 mb-2 mt-2 sm:mt-4">Pilotage National</p>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button key={id} onClick={() => selectTab(id)} className={navButtonClass(id)}>
              <Icon size={18} className="mr-3 shrink-0" />
              <span className="text-left">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden relative min-w-0 w-full">
        <header className="bg-white border-b border-slate-200 shrink-0 px-3 sm:px-6 lg:px-8 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 shadow-sm z-10">
          <div className="flex items-center gap-2 sm:gap-4 min-w-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-lg shrink-0"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
            <div className="lg:hidden min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">DGM — Pilotage National</p>
              <p className="text-sm font-bold text-slate-800 truncate">{TAB_TITLES[activeTab]}</p>
            </div>
            <img src={logoOcpv} alt="" className="h-7 sm:h-8 w-auto shrink-0 hidden sm:block lg:hidden" draggable={false} aria-hidden />
            <h2 className="hidden lg:flex text-lg font-black text-slate-800 items-center min-w-0">
              <Activity className="text-green-500 mr-2 shrink-0" size={20} />
              <span className="truncate">{TAB_TITLES[activeTab]}</span>
            </h2>
          </div>

          <div className="flex items-center justify-between sm:justify-end gap-2 sm:gap-6 w-full sm:w-auto">
            <div className="flex items-center bg-slate-50 border border-slate-200 rounded-lg px-3 py-1.5 flex-1 sm:flex-initial min-w-0">
              <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
              <select
                className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer w-full min-w-0 truncate"
                value={filtreAntenne}
                onChange={(e) => setFiltreAntenne(e.target.value)}
              >
                {ANTENNES.map((a) => <option key={a} value={a}>{a}</option>)}
              </select>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3 sm:border-l sm:border-slate-200 sm:pl-6 shrink-0">
              <div className="text-right hidden sm:block">
                <p className="font-bold text-slate-800 text-sm">M. le Directeur</p>
                <p className="text-xs text-slate-500 font-mono">DGM / Admin</p>
              </div>
              <div className="w-9 h-9 sm:w-10 sm:h-10 bg-slate-800 text-yellow-500 rounded-full flex items-center justify-center font-black text-base sm:text-lg border-2 border-yellow-500 shadow-sm">
                DG
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6 lg:p-8">
          {filtreAntenne !== 'Toutes les Antennes' && (
            <div className="bg-blue-50 border border-blue-200 text-blue-800 px-3 sm:px-4 py-3 rounded-lg mb-4 sm:mb-6 flex items-start sm:items-center shadow-sm">
              <Filter size={18} className="mr-3 text-blue-500 shrink-0 mt-0.5 sm:mt-0" />
              <p className="text-xs sm:text-sm">
                Vous visualisez les données filtrées pour l&apos;antenne de : <strong>{filtreAntenne}</strong>.
                {activeTab === 'nationale' && ' Les totaux nationaux sont masqués.'}
              </p>
            </div>
          )}

          {(activeTab === 'nationale' || activeTab === 'finances') && (
            <div>
              <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-6 -top-6 bg-green-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform"></div>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Recettes {filtreAntenne === 'Toutes les Antennes' ? 'Globales' : filtreAntenne}</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-800 relative z-10 break-words">{formatFcfa(kpis.recettes)}</p>
                  <div className="mt-4 flex items-center text-xs font-bold text-green-600 bg-green-50 w-max px-2 py-1 rounded">
                    <TrendingUp size={12} className="mr-1" /> +15% vs hier
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-6 -top-6 bg-blue-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform"></div>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Volume {filtreAntenne === 'Toutes les Antennes' ? 'National' : 'Régional'}</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-800 relative z-10">{kpis.tonnage.toLocaleString('fr-FR')} T</p>
                  <div className="mt-4 flex items-center text-xs text-slate-500 font-bold relative z-10">
                    <PieChart size={14} className="mr-1 text-blue-500" /> Vivriers tracés
                  </div>
                </div>

                <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow">
                  <div className="absolute -right-6 -top-6 bg-orange-50 w-24 h-24 rounded-full group-hover:scale-110 transition-transform"></div>
                  <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 relative z-10">Camions Contrôlés</p>
                  <p className="text-2xl sm:text-3xl font-black text-slate-800 relative z-10">{kpis.camions}</p>
                  <div className="mt-4 flex items-center text-xs text-slate-500 font-bold relative z-10">
                    <Truck size={14} className="mr-1 text-orange-500" /> Sur le périmètre sélectionné
                  </div>
                </div>

                <div className="bg-slate-800 p-4 sm:p-6 rounded-2xl shadow-sm relative overflow-hidden group hover:shadow-md transition-shadow sm:col-span-2 xl:col-span-1">
                  <p className="text-xs sm:text-sm font-bold text-slate-400 uppercase tracking-wider mb-2">Santé Réseau TPE</p>
                  <p className="text-2xl sm:text-3xl font-black text-white">{kpis.tpeActifs}</p>
                  <div className="mt-4 flex items-center text-xs text-green-400 font-bold">
                    <Terminal size={14} className="mr-1" /> {kpis.tpeOnline}% en ligne (4G)
                  </div>
                  <div className="w-full bg-slate-700 h-1.5 mt-3 rounded-full overflow-hidden">
                    <div className="bg-green-500 h-full" style={{ width: `${kpis.tpeOnline}%` }}></div>
                  </div>
                </div>
              </div>

              {activeTab === 'nationale' && (
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">CP émis {filtreAntenne === 'Toutes les Antennes' ? '(National)' : `(${filtreAntenne})`}</p>
                      <p className="text-2xl sm:text-3xl font-black text-orange-600">{certificatsKpisAntenne.cp}</p>
                    </div>
                    <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                  </div>
                  <div className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2 truncate">APE émis {filtreAntenne === 'Toutes les Antennes' ? '(National)' : `(${filtreAntenne})`}</p>
                      <p className="text-2xl sm:text-3xl font-black text-blue-600">{certificatsKpisAntenne.ape}</p>
                    </div>
                    <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                  </div>
                  <button
                    type="button"
                    onClick={() => selectTab('certificats')}
                    className="bg-white p-4 sm:p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between hover:shadow-md transition-shadow text-left sm:col-span-2 md:col-span-1"
                  >
                    <div className="min-w-0">
                      <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Certificats valides</p>
                      <p className="text-2xl sm:text-3xl font-black text-green-600">{certificatsKpisAntenne.valides}</p>
                      <p className="text-xs text-yellow-600 font-bold mt-1">Accéder à la traçabilité →</p>
                    </div>
                    <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center"><QrCode size={24} /></div>
                  </button>
                </div>
              )}

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className={`bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col ${activeTab === 'finances' ? 'lg:col-span-3' : 'lg:col-span-2'}`}>
                  <div className="px-4 sm:px-6 py-4 sm:py-5 border-b border-slate-100 flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 bg-slate-50/50">
                    <div className="min-w-0">
                      <h3 className="font-black text-slate-800 text-base sm:text-lg flex flex-wrap items-center gap-2">
                        <DollarSign className="text-emerald-500 shrink-0" size={20} />
                        <span>Répartition Automatique des Recettes</span>
                        <span className="text-[10px] sm:text-xs font-bold bg-emerald-100 text-emerald-700 px-2 py-0.5 rounded-full">Événement : RecettesRéparties</span>
                      </h3>
                      <p className="text-xs text-slate-500 mt-1">
                        Clé de répartition DAAF appliquée en temps réel sur {formatFcfa(kpis.recettes)}
                      </p>
                    </div>
                    <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors self-end sm:self-auto shrink-0" title="Exporter">
                      <Download size={20} />
                    </button>
                  </div>

                  <div className="p-4 sm:p-6 flex-1 flex flex-col justify-center">
                    <div className="w-full h-8 sm:h-10 flex rounded-xl overflow-hidden mb-6 sm:mb-8 shadow-inner">
                      {repartitionFinanciere.map((item) => (
                        <div
                          key={item.beneficiaire}
                          className={`${item.color} h-full flex items-center justify-center text-white text-[10px] font-bold overflow-hidden`}
                          style={{ width: `${item.pourcentage}%` }}
                        >
                          {item.pourcentage > 5 && `${item.pourcentage}%`}
                        </div>
                      ))}
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {repartitionFinanciere.map((item) => (
                        <div key={item.beneficiaire} className="flex items-start p-3 rounded-lg hover:bg-slate-50 transition-colors border border-transparent hover:border-slate-100">
                          <div className={`w-3 h-3 rounded-full ${item.color} mt-1 mr-3 shrink-0`}></div>
                          <div>
                            <p className="text-xs font-bold text-slate-500 uppercase">{item.beneficiaire}</p>
                            <p className="text-base sm:text-lg font-black text-slate-800 break-words">{item.montant}</p>
                            <p className="text-xs text-slate-400">{item.pourcentage}% du total collecté</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                </div>

                {activeTab === 'nationale' && (
                  <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden flex flex-col">
                    <div className="px-6 py-5 border-b border-slate-100 bg-slate-50/50">
                      <h3 className="font-black text-slate-800 flex items-center">
                        <TrendingUp className="text-orange-500 mr-2" size={18} />
                        Palmarès Antennes
                      </h3>
                    </div>
                    <div className="p-0 flex-1">
                      {topAntennes.map((antenne, idx) => (
                        <div key={antenne.nom} className="flex items-center justify-between p-4 border-b border-slate-50 hover:bg-slate-50 transition-colors last:border-0">
                          <div className="flex items-center">
                            <div className="w-8 h-8 rounded-full bg-slate-100 text-slate-600 font-black flex items-center justify-center text-xs mr-3">
                              #{idx + 1}
                            </div>
                            <div>
                              <p className="font-bold text-slate-800">{antenne.nom}</p>
                              <p className="text-xs text-slate-500">{antenne.flux}</p>
                            </div>
                          </div>
                          <div className="text-right">
                            <p className="font-bold text-orange-600">{antenne.recettes.toLocaleString('fr-FR')} F</p>
                            <p className={`text-xs font-bold ${antenne.tendance.startsWith('+') ? 'text-green-500' : 'text-red-500'}`}>
                              {antenne.tendance}
                            </p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </div>

              {activeTab === 'nationale' && (
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <div className="px-4 sm:px-6 py-4 border-b border-slate-200">
                    <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                      Derniers flux interceptés {filtreAntenne === 'Toutes les Antennes' ? '(National)' : `(${filtreAntenne})`}
                    </h3>
                  </div>
                  <div className="overflow-x-auto -mx-px">
                    <table className="w-full text-left text-sm min-w-[560px]">
                      <thead className="bg-slate-50 text-slate-500">
                        <tr>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">ID Transac.</th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Antenne Source</th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Produit Tracé</th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-right">Montant Collecté</th>
                          <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-center">Statut</th>
                        </tr>
                      </thead>
                      <tbody className="divide-y divide-slate-100">
                        {transactions.map((trx) => (
                          <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs text-slate-500">{trx.id}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-700">{trx.antenne}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{trx.produit}</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-emerald-600 text-right whitespace-nowrap">{trx.montant.toLocaleString('fr-FR')} F</td>
                            <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                              <span className="bg-green-100 text-green-700 px-2 py-1 rounded-full text-xs font-bold flex items-center justify-center w-max mx-auto">
                                <span className="w-1.5 h-1.5 bg-green-500 rounded-full mr-1.5"></span>
                                {trx.statut}
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              )}
            </div>
          )}

          {activeTab === 'sim' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Système d&apos;Information sur le Marché (SIM)</h2>
                  <p className="text-sm text-slate-500 mt-1">Volumes, parts de marché et prix moyens des produits vivriers tracés par OCPV.</p>
                </div>
                <button type="button" className="flex items-center justify-center gap-2 text-sm font-bold text-slate-600 bg-white border border-slate-200 px-4 py-2 rounded-lg hover:bg-slate-50 shadow-sm w-full sm:w-auto shrink-0">
                  <Download size={16} /> Exporter le rapport
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
                  <h3 className="font-black text-slate-800 mb-4 sm:mb-6 flex items-center text-base sm:text-lg">
                    <BarChart3 className="text-blue-500 mr-2 shrink-0" size={20} />
                    Évolution des volumes (6 derniers mois)
                  </h3>
                  <div className="flex items-end justify-between gap-1.5 sm:gap-3 h-36 sm:h-48 overflow-x-auto pb-1">
                    {STATS_SIM_MENSUEL.map((m) => (
                      <div key={m.mois} className="flex-1 min-w-[2.5rem] flex flex-col items-center justify-end h-full">
                        <span className="text-xs font-bold text-slate-600 mb-2">{m.volume.toLocaleString('fr-FR')} T</span>
                        <div
                          className="w-full bg-blue-500 rounded-t-lg hover:bg-blue-600 transition-colors"
                          style={{ height: `${(m.volume / maxVolumeMensuel) * 100}%`, minHeight: '8px' }}
                        ></div>
                        <span className="text-xs font-bold text-slate-500 mt-2">{m.mois}</span>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center">
                    <PieChart className="text-orange-500 mr-2" size={20} />
                    Synthèse {filtreAntenne === 'Toutes les Antennes' ? 'Nationale' : filtreAntenne}
                  </h3>
                  <div className="space-y-4">
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase">Volume total tracé</p>
                      <p className="text-2xl font-black text-slate-800">{kpis.tonnage.toLocaleString('fr-FR')} T</p>
                    </div>
                    <div className="p-4 bg-slate-50 rounded-xl">
                      <p className="text-xs font-bold text-slate-500 uppercase">Produits référencés</p>
                      <p className="text-2xl font-black text-slate-800">{statsProduits.length}</p>
                    </div>
                    <div className="p-4 bg-green-50 rounded-xl">
                      <p className="text-xs font-bold text-green-600 uppercase">Tendance globale</p>
                      <p className="text-2xl font-black text-green-700 flex items-center gap-2">
                        <TrendingUp size={22} /> +11%
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 flex items-center">
                    <Leaf className="text-green-500 mr-2" size={18} />
                    Répartition par produit vivrier
                  </h3>
                </div>
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[640px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Produit</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Volume (T)</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Part de marché</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Prix moyen</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-right">Tendance</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {statsProduits.map((p) => (
                        <tr key={p.produit} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-800">{p.produit}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{p.volume.toLocaleString('fr-FR')} T</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <div className="flex items-center gap-2 min-w-[7rem]">
                              <div className="w-16 sm:w-24 h-2 bg-slate-100 rounded-full overflow-hidden shrink-0">
                                <div className="h-full bg-blue-500 rounded-full" style={{ width: `${p.part}%` }}></div>
                              </div>
                              <span className="text-xs font-bold text-slate-600">{p.part}%</span>
                            </div>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-slate-600 whitespace-nowrap">{p.prixMoyen.toLocaleString('fr-FR')} F/T</td>
                          <td className={`px-3 sm:px-6 py-3 sm:py-4 text-right font-bold whitespace-nowrap ${p.tendance.startsWith('+') ? 'text-green-600' : 'text-red-600'}`}>
                            {p.tendance}
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'cartographie' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Cartographie des Flux Vivriers</h2>
                  <p className="text-sm text-slate-500 mt-1">Visualisation des corridors actifs et des points de contrôle par antenne.</p>
                </div>
                <button
                  type="button"
                  onClick={() => navigate('/')}
                  className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-slate-900 text-yellow-500 font-bold py-2 px-4 rounded-lg shadow text-sm w-full sm:w-auto shrink-0"
                >
                  <ExternalLink size={16} /> Ouvrir la cartographie interactive
                </button>
              </div>

              <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 sm:gap-8 mb-4 sm:mb-8">
                <div className="lg:col-span-2 bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6 relative min-h-[240px] sm:min-h-[360px] overflow-hidden">
                  <h3 className="font-black text-slate-800 mb-4 flex items-center">
                    <Map className="text-blue-500 mr-2" size={20} />
                    Réseau des antennes OCPV
                  </h3>
                  <div className="absolute inset-0 top-14 bg-gradient-to-br from-slate-50 to-blue-50">
                    <svg className="w-full h-full" viewBox="0 0 100 100" preserveAspectRatio="none">
                      <line x1="52" y1="38" x2="72" y2="72" stroke="#93c5fd" strokeWidth="0.4" strokeDasharray="2,2" />
                      <line x1="48" y1="18" x2="72" y2="72" stroke="#93c5fd" strokeWidth="0.4" strokeDasharray="2,2" />
                      <line x1="28" y1="48" x2="18" y2="78" stroke="#93c5fd" strokeWidth="0.4" strokeDasharray="2,2" />
                      <line x1="18" y1="78" x2="72" y2="72" stroke="#93c5fd" strokeWidth="0.4" strokeDasharray="2,2" />
                      <line x1="52" y1="38" x2="48" y2="18" stroke="#93c5fd" strokeWidth="0.3" strokeDasharray="2,2" />
                    </svg>
                    {fluxAntennes.map((antenne) => (
                      <div
                        key={antenne.nom}
                        className="absolute transform -translate-x-1/2 -translate-y-1/2"
                        style={{ left: `${antenne.x}%`, top: `${antenne.y}%` }}
                      >
                        <div className={`flex flex-col items-center ${filtreAntenne !== 'Toutes les Antennes' && filtreAntenne !== antenne.nom ? 'opacity-40' : ''}`}>
                          <div className="w-10 h-10 bg-blue-600 text-white rounded-full flex items-center justify-center shadow-lg border-2 border-white">
                            <MapPin size={18} />
                          </div>
                          <span className="text-xs font-bold text-slate-700 bg-white/90 px-2 py-0.5 rounded mt-1 shadow-sm">{antenne.nom}</span>
                          <span className="text-[10px] text-slate-500">{antenne.sorties} T sortants</span>
                        </div>
                      </div>
                    ))}
                    <div className="absolute top-3 right-3 sm:top-4 sm:right-4 bg-slate-800 text-yellow-500 px-2 sm:px-3 py-1.5 sm:py-2 rounded-lg text-[10px] sm:text-xs font-bold shadow-lg flex items-center gap-1.5 sm:gap-2">
                      <ShieldCheck size={12} className="sm:hidden" />
                      <ShieldCheck size={14} className="hidden sm:block" />
                      <span className="hidden sm:inline">DGM — Hub Central</span>
                      <span className="sm:hidden">DGM</span>
                    </div>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-4 sm:p-6">
                  <h3 className="font-black text-slate-800 mb-4">Flux par antenne</h3>
                  <div className="space-y-3">
                    {fluxAntennes.map((antenne) => (
                      <div key={antenne.nom} className="p-4 bg-slate-50 rounded-xl border border-slate-100">
                        <p className="font-bold text-slate-800 flex items-center gap-2">
                          <MapPin size={14} className="text-blue-500" /> {antenne.nom}
                        </p>
                        <div className="grid grid-cols-2 gap-2 mt-2 text-xs">
                          <div>
                            <p className="text-slate-500">Entrées</p>
                            <p className="font-bold text-green-600">{antenne.entrees.toLocaleString('fr-FR')} T</p>
                          </div>
                          <div>
                            <p className="text-slate-500">Sorties</p>
                            <p className="font-bold text-orange-600">{antenne.sorties.toLocaleString('fr-FR')} T</p>
                          </div>
                        </div>
                        <p className="text-xs text-slate-500 mt-2">Recettes : <span className="font-bold text-slate-700">{antenne.recettes.toLocaleString('fr-FR')} F</span></p>
                      </div>
                    ))}
                  </div>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 flex items-center">
                    <Truck className="text-orange-500 mr-2" size={18} />
                    Corridors actifs
                  </h3>
                </div>
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[700px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Origine</th>
                        <th className="px-2 py-2 sm:py-3 font-semibold"></th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Destination</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Produit</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Volume</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-center">Camions</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {fluxCorridors.map((corridor) => (
                        <tr key={`${corridor.origine}-${corridor.destination}-${corridor.produit}`} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-700">{corridor.origine}</td>
                          <td className="px-2 py-3 sm:py-4 text-slate-400"><ArrowRight size={16} /></td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-700">{corridor.destination}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{corridor.produit}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-blue-600 whitespace-nowrap">{corridor.volume}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-slate-700">{corridor.camions}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center">
                            <span className={`px-2 py-1 rounded-full text-xs font-bold ${corridor.statut === 'Actif' ? 'bg-green-100 text-green-700' : 'bg-yellow-100 text-yellow-700'}`}>
                              {corridor.statut}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'certificats' && (
            <div>
              <div className="flex flex-col gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Traçabilité nationale CP / APE</h2>
                  <p className="text-sm text-slate-500 mt-1">Registre consolidé de tous les certificats émis par les TPE sur le territoire.</p>
                </div>
                <div className="flex flex-col sm:flex-row sm:flex-wrap items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto min-w-0">
                    <Search size={16} className="text-slate-400 mr-2 shrink-0" />
                    <input
                      type="text"
                      placeholder="Rechercher N°, plaque, antenne..."
                      value={searchCertificat}
                      onChange={(e) => setSearchCertificat(e.target.value)}
                      className="text-sm bg-transparent border-none outline-none w-full min-w-0"
                    />
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto">
                    <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
                    <select
                      className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer"
                      value={filtreAntenne}
                      onChange={(e) => setFiltreAntenne(e.target.value)}
                    >
                      {ANTENNES.map((a) => <option key={a} value={a}>{a}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto">
                    <FileText size={16} className="text-slate-400 mr-2 shrink-0" />
                    <select
                      className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none cursor-pointer"
                      value={filtreTypeActe}
                      onChange={(e) => setFiltreTypeActe(e.target.value)}
                    >
                      {['Tous', 'CP', 'APE'].map((t) => <option key={t} value={t}>{t === 'Tous' ? 'Tous les actes' : t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-8">
                <div className="bg-white p-4 sm:p-5 rounded-2xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase">Total actes</p>
                  <p className="text-2xl font-black text-slate-800">{certificatsKpis.total}</p>
                </div>
                <div className="bg-orange-50 p-4 sm:p-5 rounded-2xl border border-orange-200 shadow-sm">
                  <p className="text-xs font-bold text-orange-600 uppercase">CP (Provenance)</p>
                  <p className="text-2xl font-black text-orange-700">{certificatsKpis.cp}</p>
                </div>
                <div className="bg-blue-50 p-4 sm:p-5 rounded-2xl border border-blue-200 shadow-sm">
                  <p className="text-xs font-bold text-blue-600 uppercase">APE (Exportation)</p>
                  <p className="text-2xl font-black text-blue-700">{certificatsKpis.ape}</p>
                </div>
                <div className="bg-green-50 p-4 sm:p-5 rounded-2xl border border-green-200 shadow-sm">
                  <p className="text-xs font-bold text-green-600 uppercase">Valides &amp; traçables</p>
                  <p className="text-2xl font-black text-green-700">{certificatsKpis.valides}</p>
                </div>
              </div>

              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200 flex justify-between items-center gap-3">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base min-w-0">
                    Registre national — {filtreAntenne} {filtreTypeActe !== 'Tous' && `· ${filtreTypeActe}`}
                  </h3>
                  <button type="button" className="text-slate-400 hover:text-blue-600 transition-colors shrink-0" title="Exporter">
                    <Download size={20} />
                  </button>
                </div>
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[960px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">N° Certificat</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Type</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Antenne / Zone</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Plaque</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Produit</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">TPE / Agent</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Itinéraire</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">Émission</th>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCertificats.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                            <p className="font-mono text-xs font-bold text-slate-700">{cert.id}</p>
                            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><QrCode size={10} />{cert.qrHash}</p>
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${cert.type === 'CP' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                              {cert.type}
                            </span>
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                            <p className="font-bold text-slate-700">{cert.antenne}</p>
                            <p className="text-xs text-slate-500">{cert.zone}</p>
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 font-bold text-slate-700 uppercase whitespace-nowrap">{cert.plaque}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-slate-600">{cert.produit} ({cert.tonnage} T)</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3">
                            <p className="font-mono text-xs text-slate-700">{cert.tpeId}</p>
                            <p className="text-xs text-slate-500">{cert.agent}</p>
                          </td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-600">{cert.provenance} → {cert.destination}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-xs text-slate-500 whitespace-nowrap">{cert.dateEmission}</td>
                          <td className="px-3 sm:px-4 py-2 sm:py-3 text-center">
                            <span className={`text-xs font-bold px-2 py-1 rounded-full ${
                              cert.statut === 'Valide' ? 'bg-green-100 text-green-700'
                                : cert.statut === 'En attente synchro' ? 'bg-yellow-100 text-yellow-700'
                                  : 'bg-red-100 text-red-700'
                            }`}>
                              {cert.statut}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default DashboardDGM;

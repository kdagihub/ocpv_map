import { useMemo, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  LayoutDashboard, Terminal, Search, MapPin, TrendingUp,
  ArrowLeft, Filter, Users, Map, Truck, Leaf,
  Plus, Pencil, Trash2, X, Phone, User, FileText, QrCode, Menu,
} from 'lucide-react';
import tpeImage from '../assets/TPE.png';
import logoOcpv from '../assets/logo_ocpv.png';

const INITIAL_ZONES = [
  { id: 'z1', nom: 'PK30 Nord', description: 'Corridor nord — contrôle sortie Bouaké', agentIds: ['a1'], tpeIds: ['TPE-BKE-001'] },
  { id: 'z2', nom: 'Tiébissou', description: 'Poste Tiébissou — axe Yamoussoukro', agentIds: ['a2'], tpeIds: ['TPE-BKE-002'] },
  { id: 'z3', nom: 'Marché Gros', description: 'Marché de gros de Bouaké', agentIds: ['a3'], tpeIds: ['TPE-BKE-003'] },
];

const INITIAL_AGENTS = [
  { id: 'a1', nom: 'Kouassi', prenom: 'Marc', telephone: '07 12 34 56 78', matricule: 'AGT-BKE-001', zoneId: 'z1' },
  { id: 'a2', nom: 'Bamba', prenom: 'Aminata', telephone: '05 98 76 54 32', matricule: 'AGT-BKE-002', zoneId: 'z2' },
  { id: 'a3', nom: 'Koné', prenom: 'Fatou', telephone: '01 45 67 89 01', matricule: 'AGT-BKE-003', zoneId: 'z3' },
];

const INITIAL_TPES = [
  { id: 'TPE-BKE-001', agentId: 'a1', zoneId: 'z1', statut: 'online', batterie: '85%', derniereSynchro: 'A l\'instant' },
  { id: 'TPE-BKE-002', agentId: 'a2', zoneId: 'z2', statut: 'online', batterie: '62%', derniereSynchro: 'Il y a 5 min' },
  { id: 'TPE-BKE-003', agentId: 'a3', zoneId: 'z3', statut: 'offline', batterie: '15%', derniereSynchro: 'Il y a 2 heures' },
];

const INITIAL_CAMIONS = [
  { id: 'c1', plaque: '1234 AB 01', transporteur: 'Jean Konan', contact: '07 12 34 56 78', typeVehicule: 'Camion 10T', zoneId: 'z1', dernierPassage: '18/06/2026 14:23', nbPassages: 12 },
  { id: 'c2', plaque: '5678 CD 02', transporteur: 'Kouassi Aya', contact: '05 98 76 54 32', typeVehicule: 'Semi-remorque 20T', zoneId: 'z2', dernierPassage: '18/06/2026 14:15', nbPassages: 8 },
  { id: 'c3', plaque: '9012 EF 03', transporteur: 'Traoré Ibrahim', contact: '01 23 45 67 89', typeVehicule: 'Camion 15T', zoneId: 'z1', dernierPassage: '18/06/2026 13:50', nbPassages: 5 },
  { id: 'c4', plaque: '3456 GH 04', transporteur: 'Diallo Mamadou', contact: '07 88 99 00 11', typeVehicule: 'Pick-up 3T', zoneId: 'z3', dernierPassage: '18/06/2026 13:42', nbPassages: 3 },
];

const INITIAL_PRODUITS = [
  { id: 'p1', nom: 'Igname', categorie: 'Tubercule', unite: 'Tonne', tarifCp: 2000, tarifApe: 6000, zoneIds: ['z1', 'z2', 'z3'] },
  { id: 'p2', nom: 'Banane Plantain', categorie: 'Fruit', unite: 'Tonne', tarifCp: 1500, tarifApe: 6000, zoneIds: ['z1', 'z2'] },
  { id: 'p3', nom: 'Manioc', categorie: 'Tubercule', unite: 'Tonne', tarifCp: 1000, tarifApe: 6000, zoneIds: ['z1', 'z3'] },
  { id: 'p4', nom: 'Tomate', categorie: 'Légume', unite: 'Tonne', tarifCp: 2500, tarifApe: 6000, zoneIds: ['z2', 'z3'] },
  { id: 'p5', nom: 'Ananas', categorie: 'Fruit', unite: 'Tonne', tarifCp: 1800, tarifApe: 6000, zoneIds: ['z1'] },
];

const INITIAL_TRANSACTIONS = [
  { id: 'TRX-001', plaque: '1234 AB 01', produit: 'Igname', tonnage: 15, montant: 30000, zoneId: 'z1', heure: '14:23', statut: 'Validé' },
  { id: 'TRX-002', plaque: '5678 CD 02', produit: 'Banane Plantain', tonnage: 8, montant: 12000, zoneId: 'z2', heure: '14:15', statut: 'Validé' },
  { id: 'TRX-003', plaque: '9012 EF 03', produit: 'Tomate', tonnage: 10, montant: 25000, zoneId: 'z1', heure: '13:50', statut: 'Validé' },
  { id: 'TRX-004', plaque: '3456 GH 04', produit: 'Manioc', tonnage: 20, montant: 20000, zoneId: 'z3', heure: '13:42', statut: 'Attente Synchro' },
];

const INITIAL_CERTIFICATS = [
  { id: 'CP-2026-A3F8B2', type: 'CP', plaque: '1234 AB 01', transporteur: 'Jean Konan', produit: 'Igname', tonnage: 15, provenance: 'Bouaké', destination: 'Abidjan', zoneId: 'z1', tpeId: 'TPE-BKE-001', agentId: 'a1', montant: 30000, dateEmission: '18/06/2026 14:23', statut: 'Valide', qrHash: 'SHA256:a1b2c3d4…F8B2' },
  { id: 'CP-2026-B7K1M9', type: 'CP', plaque: '5678 CD 02', transporteur: 'Kouassi Aya', produit: 'Banane Plantain', tonnage: 8, provenance: 'Tiébissou', destination: 'Bouaké', zoneId: 'z2', tpeId: 'TPE-BKE-002', agentId: 'a2', montant: 12000, dateEmission: '18/06/2026 14:15', statut: 'Valide', qrHash: 'SHA256:b2c3d4e5…K1M9' },
  { id: 'APE-2026-C4N8P3', type: 'APE', plaque: '9012 EF 03', transporteur: 'Traoré Ibrahim', produit: 'Tomate', tonnage: 10, provenance: 'Bouaké', destination: 'Accra', zoneId: 'z1', tpeId: 'TPE-BKE-001', agentId: 'a1', montant: 60000, dateEmission: '18/06/2026 13:50', statut: 'Valide', qrHash: 'SHA256:c3d4e5f6…N8P3' },
  { id: 'CP-2026-D2Q5R7', type: 'CP', plaque: '3456 GH 04', transporteur: 'Diallo Mamadou', produit: 'Manioc', tonnage: 20, provenance: 'Daloa', destination: 'Bouaké', zoneId: 'z3', tpeId: 'TPE-BKE-003', agentId: 'a3', montant: 20000, dateEmission: '18/06/2026 13:42', statut: 'En attente synchro', qrHash: 'SHA256:d4e5f6a7…Q5R7' },
  { id: 'CP-2026-E9S2T4', type: 'CP', plaque: '7890 IJ 05', transporteur: 'Yao Serge', produit: 'Ananas', tonnage: 5, provenance: 'Bouaké', destination: 'Yamoussoukro', zoneId: 'z1', tpeId: 'TPE-BKE-001', agentId: 'a1', montant: 9000, dateEmission: '18/06/2026 12:10', statut: 'Valide', qrHash: 'SHA256:e5f6a7b8…S2T4' },
  { id: 'APE-2026-F1U6V8', type: 'APE', plaque: '2468 KL 06', transporteur: 'N\'Guessan Paul', produit: 'Igname', tonnage: 12, provenance: 'Bouaké', destination: 'Lomé', zoneId: 'z2', tpeId: 'TPE-BKE-002', agentId: 'a2', montant: 60000, dateEmission: '18/06/2026 11:45', statut: 'Valide', qrHash: 'SHA256:f6a7b8c9…U6V8' },
  { id: 'CP-2026-G3W7X1', type: 'CP', plaque: '1357 MN 07', transporteur: 'Coulibaly Aïcha', produit: 'Tomate', tonnage: 6, provenance: 'Korhogo', destination: 'Bouaké', zoneId: 'z3', tpeId: 'TPE-BKE-003', agentId: 'a3', montant: 15000, dateEmission: '18/06/2026 10:30', statut: 'Valide', qrHash: 'SHA256:a7b8c9d0…W7X1' },
  { id: 'APE-2026-H5Y9Z2', type: 'APE', plaque: '8642 OP 08', transporteur: 'Bamba Oumar', produit: 'Manioc', tonnage: 18, provenance: 'Bouaké', destination: 'Ouagadougou', zoneId: 'z1', tpeId: 'TPE-BKE-001', agentId: 'a1', montant: 60000, dateEmission: '17/06/2026 16:20', statut: 'Valide', qrHash: 'SHA256:b8c9d0e1…Y9Z2' },
];

const EMPTY_AGENT = { nom: '', prenom: '', telephone: '', matricule: '', zoneId: '' };
const EMPTY_ZONE = { nom: '', description: '', agentIds: [], tpeIds: [] };
const EMPTY_CAMION = { plaque: '', transporteur: '', contact: '', typeVehicule: '', zoneId: '' };
const EMPTY_PRODUIT = { nom: '', categorie: 'Tubercule', unite: 'Tonne', tarifCp: 1000, tarifApe: 6000, zoneIds: [] };

const NAV_ITEMS = [
  { id: 'transactions', label: 'Tableau de bord', icon: LayoutDashboard },
  { id: 'certificats', label: 'Traçabilité CP / APE', icon: FileText },
  { id: 'agents', label: 'Agents', icon: Users },
  { id: 'zones', label: 'Zones & Affectations', icon: Map },
  { id: 'tpe', label: 'Parc TPE', icon: Terminal },
  { id: 'camions', label: 'Camions enregistrés', icon: Truck },
  { id: 'produits', label: 'Produits vivriers', icon: Leaf },
];

const Modal = ({ title, onClose, children }) => (
  <div className="fixed inset-0 z-50 flex items-end sm:items-center justify-center bg-slate-900/50 p-0 sm:p-4">
    <div className="bg-white rounded-t-2xl sm:rounded-xl shadow-xl w-full sm:max-w-lg max-h-[92vh] sm:max-h-[90vh] overflow-y-auto">
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-200 sticky top-0 bg-white z-10">
        <h3 className="font-bold text-slate-800 text-sm sm:text-base pr-4">{title}</h3>
        <button onClick={onClose} className="p-1 text-slate-400 hover:text-slate-600 rounded">
          <X size={20} />
        </button>
      </div>
      <div className="p-4 sm:p-6">{children}</div>
    </div>
  </div>
);

const Field = ({ label, children }) => (
  <label className="block mb-4">
    <span className="text-xs font-bold text-slate-500 uppercase tracking-wider">{label}</span>
    <div className="mt-1">{children}</div>
  </label>
);

const inputClass = 'w-full border border-slate-200 rounded-lg px-3 py-2 text-sm outline-none focus:ring-2 focus:ring-blue-500';

const DashboardAntenne = () => {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('transactions');
  const [filterSecteur, setFilterSecteur] = useState('Tous');
  const [filterTypeActe, setFilterTypeActe] = useState('Tous');
  const [searchQuery, setSearchQuery] = useState('');

  const [zones, setZones] = useState(INITIAL_ZONES);
  const [agents, setAgents] = useState(INITIAL_AGENTS);
  const [tpes, setTpes] = useState(INITIAL_TPES);
  const [camions, setCamions] = useState(INITIAL_CAMIONS);
  const [produits, setProduits] = useState(INITIAL_PRODUITS);
  const [transactions] = useState(INITIAL_TRANSACTIONS);
  const [certificats] = useState(INITIAL_CERTIFICATS);

  const [modal, setModal] = useState(null);
  const [form, setForm] = useState({});
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const activeNavLabel = NAV_ITEMS.find((n) => n.id === activeTab)?.label ?? 'Tableau de bord';

  const selectTab = (id) => {
    setActiveTab(id);
    setSearchQuery('');
    setMobileNavOpen(false);
  };

  const zoneById = useMemo(() => Object.fromEntries(zones.map((z) => [z.id, z])), [zones]);
  const agentById = useMemo(() => Object.fromEntries(agents.map((a) => [a.id, a])), [agents]);

  const agentLabel = (agentId) => {
    const a = agentById[agentId];
    return a ? `${a.prenom} ${a.nom}` : '—';
  };

  const secteurs = useMemo(() => ['Tous', ...zones.map((z) => z.nom)], [zones]);

  const filteredTransactions = useMemo(() => {
    let list = transactions;
    if (filterSecteur !== 'Tous') {
      const zone = zones.find((z) => z.nom === filterSecteur);
      list = zone ? list.filter((t) => t.zoneId === zone.id) : list;
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((t) => t.plaque.toLowerCase().includes(q) || t.id.toLowerCase().includes(q));
    }
    return list;
  }, [transactions, filterSecteur, searchQuery, zones]);

  const filteredAgents = useMemo(() => {
    if (!searchQuery) return agents;
    const q = searchQuery.toLowerCase();
    return agents.filter((a) =>
      `${a.prenom} ${a.nom}`.toLowerCase().includes(q)
      || a.matricule.toLowerCase().includes(q)
      || a.telephone.includes(q),
    );
  }, [agents, searchQuery]);

  const filteredCamions = useMemo(() => {
    if (!searchQuery) return camions;
    const q = searchQuery.toLowerCase();
    return camions.filter((c) =>
      c.plaque.toLowerCase().includes(q)
      || c.transporteur.toLowerCase().includes(q),
    );
  }, [camions, searchQuery]);

  const filteredProduits = useMemo(() => {
    if (!searchQuery) return produits;
    const q = searchQuery.toLowerCase();
    return produits.filter((p) => p.nom.toLowerCase().includes(q) || p.categorie.toLowerCase().includes(q));
  }, [produits, searchQuery]);

  const filteredCertificats = useMemo(() => {
    let list = certificats;
    if (filterSecteur !== 'Tous') {
      const zone = zones.find((z) => z.nom === filterSecteur);
      list = zone ? list.filter((c) => c.zoneId === zone.id) : list;
    }
    if (filterTypeActe !== 'Tous') {
      list = list.filter((c) => c.type === filterTypeActe);
    }
    if (searchQuery) {
      const q = searchQuery.toLowerCase();
      list = list.filter((c) =>
        c.id.toLowerCase().includes(q)
        || c.plaque.toLowerCase().includes(q)
        || c.transporteur.toLowerCase().includes(q)
        || c.produit.toLowerCase().includes(q),
      );
    }
    return list;
  }, [certificats, filterSecteur, filterTypeActe, searchQuery, zones]);

  const certificatsKpis = useMemo(() => {
    const list = filteredCertificats;
    return {
      total: list.length,
      cp: list.filter((c) => c.type === 'CP').length,
      ape: list.filter((c) => c.type === 'APE').length,
      valides: list.filter((c) => c.statut === 'Valide').length,
    };
  }, [filteredCertificats]);

  const kpis = useMemo(() => {
    const zoneFilter = filterSecteur === 'Tous' ? null : zones.find((z) => z.nom === filterSecteur)?.id;
    const trx = zoneFilter ? transactions.filter((t) => t.zoneId === zoneFilter) : transactions;
    const recettes = trx.reduce((s, t) => s + t.montant, 0);
    const tonnage = trx.reduce((s, t) => s + t.tonnage, 0);
    const agentList = zoneFilter ? agents.filter((a) => a.zoneId === zoneFilter) : agents;
    const tpeList = zoneFilter ? tpes.filter((t) => t.zoneId === zoneFilter) : tpes;
    const camionList = zoneFilter ? camions.filter((c) => c.zoneId === zoneFilter) : camions;
    const certList = zoneFilter ? certificats.filter((c) => c.zoneId === zoneFilter) : certificats;
    const tpeOnline = tpeList.filter((t) => t.statut === 'online').length;

    return {
      recettes: `${recettes.toLocaleString('fr-FR')} FCFA`,
      tonnage: `${tonnage} T`,
      camionsJour: String(new Set(trx.map((t) => t.plaque)).size),
      agents: String(agentList.length),
      tpes: String(tpeList.length),
      tpesOnline: tpeOnline,
      camions: String(camionList.length),
      cp: String(certList.filter((c) => c.type === 'CP').length),
      ape: String(certList.filter((c) => c.type === 'APE').length),
      certificatsValides: String(certList.filter((c) => c.statut === 'Valide').length),
    };
  }, [transactions, filterSecteur, zones, agents, tpes, camions, certificats]);

  const openModal = (type, item = null) => {
    const defaults = {
      agent: item || { ...EMPTY_AGENT, zoneId: zones[0]?.id || '' },
      zone: item || { ...EMPTY_ZONE },
      camion: item || { ...EMPTY_CAMION, zoneId: zones[0]?.id || '' },
      produit: item || { ...EMPTY_PRODUIT, zoneIds: zones[0] ? [zones[0].id] : [] },
    };
    setForm(defaults[type] || {});
    setModal({ type, editId: item?.id || null });
  };

  const closeModal = () => {
    setModal(null);
    setForm({});
  };

  const updateForm = (key, value) => setForm((f) => ({ ...f, [key]: value }));

  const toggleZoneInProduit = (zoneId) => {
    setForm((f) => ({
      ...f,
      zoneIds: f.zoneIds.includes(zoneId)
        ? f.zoneIds.filter((id) => id !== zoneId)
        : [...f.zoneIds, zoneId],
    }));
  };

  const toggleAgentInZone = (agentId) => {
    setForm((f) => ({
      ...f,
      agentIds: f.agentIds.includes(agentId)
        ? f.agentIds.filter((id) => id !== agentId)
        : [...f.agentIds, agentId],
    }));
  };

  const toggleTpeInZone = (tpeId) => {
    setForm((f) => ({
      ...f,
      tpeIds: f.tpeIds.includes(tpeId)
        ? f.tpeIds.filter((id) => id !== tpeId)
        : [...f.tpeIds, tpeId],
    }));
  };

  const saveAgent = () => {
    if (!form.nom || !form.prenom || !form.matricule) return;
    const agentId = modal.editId || `a${Date.now()}`;
    const agentData = { ...form, id: agentId };

    if (modal.editId) {
      setAgents((list) => list.map((a) => (a.id === modal.editId ? { ...a, ...form } : a)));
    } else {
      setAgents((list) => [...list, agentData]);
    }

    setZones((list) => list.map((z) => {
      const hadAgent = z.agentIds.includes(agentId);
      const shouldHave = form.zoneId === z.id;
      if (hadAgent && !shouldHave) return { ...z, agentIds: z.agentIds.filter((id) => id !== agentId) };
      if (!hadAgent && shouldHave) return { ...z, agentIds: [...z.agentIds, agentId] };
      return z;
    }));

    closeModal();
  };

  const deleteAgent = (id) => {
    if (!window.confirm('Supprimer cet agent ?')) return;
    setAgents((list) => list.filter((a) => a.id !== id));
    setZones((list) => list.map((z) => ({ ...z, agentIds: z.agentIds.filter((aid) => aid !== id) })));
    setTpes((list) => list.map((t) => (t.agentId === id ? { ...t, agentId: null } : t)));
  };

  const saveZone = () => {
    if (!form.nom) return;
    if (modal.editId) {
      setZones((list) => list.map((z) => (z.id === modal.editId ? { ...z, ...form } : z)));
    } else {
      const newId = `z${Date.now()}`;
      setZones((list) => [...list, { ...form, id: newId }]);
      form.agentIds.forEach((agentId) => {
        setAgents((list) => list.map((a) => (a.id === agentId ? { ...a, zoneId: newId } : a)));
      });
    }
    closeModal();
  };

  const deleteZone = (id) => {
    if (!window.confirm('Supprimer cette zone ? Les affectations seront retirées.')) return;
    setZones((list) => list.filter((z) => z.id !== id));
    setAgents((list) => list.map((a) => (a.zoneId === id ? { ...a, zoneId: '' } : a)));
    setTpes((list) => list.map((t) => (t.zoneId === id ? { ...t, zoneId: '' } : t)));
    setCamions((list) => list.filter((c) => c.zoneId !== id));
    setProduits((list) => list.map((p) => ({ ...p, zoneIds: p.zoneIds.filter((zid) => zid !== id) })));
  };

  const saveCamion = () => {
    if (!form.plaque || !form.transporteur) return;
    if (modal.editId) {
      setCamions((list) => list.map((c) => (c.id === modal.editId ? { ...c, ...form } : c)));
    } else {
      setCamions((list) => [...list, {
        ...form,
        id: `c${Date.now()}`,
        dernierPassage: '—',
        nbPassages: 0,
      }]);
    }
    closeModal();
  };

  const deleteCamion = (id) => {
    if (!window.confirm('Retirer ce camion du registre ?')) return;
    setCamions((list) => list.filter((c) => c.id !== id));
  };

  const saveProduit = () => {
    if (!form.nom) return;
    if (modal.editId) {
      setProduits((list) => list.map((p) => (p.id === modal.editId ? { ...p, ...form } : p)));
    } else {
      setProduits((list) => [...list, { ...form, id: `p${Date.now()}` }]);
    }
    closeModal();
  };

  const deleteProduit = (id) => {
    if (!window.confirm('Supprimer ce produit vivrier ?')) return;
    setProduits((list) => list.filter((p) => p.id !== id));
  };

  const searchPlaceholder = {
    transactions: 'Rechercher une plaque ou une transaction...',
    certificats: 'Rechercher un CP, APE, plaque ou transporteur...',
    agents: 'Rechercher un agent (nom, matricule)...',
    zones: 'Rechercher une zone...',
    tpe: 'Rechercher un TPE...',
    camions: 'Rechercher une plaque ou un transporteur...',
    produits: 'Rechercher un produit vivrier...',
  };

  return (
    <div className="flex h-screen bg-slate-50 font-sans overflow-hidden">
      {mobileNavOpen && (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-slate-900/60 lg:hidden"
          aria-label="Fermer le menu"
          onClick={() => setMobileNavOpen(false)}
        />
      )}

      <aside
        className={`fixed lg:static inset-y-0 left-0 z-50 w-[min(18rem,88vw)] lg:w-64 bg-slate-900 text-white flex flex-col shrink-0 transform transition-transform duration-200 ease-out ${
          mobileNavOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
        }`}
      >
        <div className="p-4 sm:p-6 border-b border-slate-800 flex items-start justify-between gap-3">
          <div className="min-w-0">
            <img src={logoOcpv} alt="OCPV" className="h-9 sm:h-10 w-auto mb-2" draggable={false} />
            <p className="text-xs text-slate-400">Système de Gestion Intégré</p>
          </div>
          <button
            type="button"
            onClick={() => setMobileNavOpen(false)}
            className="lg:hidden p-2 text-slate-400 hover:text-white rounded-lg"
            aria-label="Fermer le menu"
          >
            <X size={20} />
          </button>
        </div>

        <div className="p-4 border-b border-slate-800 bg-slate-800/50">
          <p className="text-xs text-slate-400 uppercase font-bold tracking-wider mb-1">Région Active</p>
          <div className="flex items-center text-sm font-bold text-blue-400">
            <MapPin size={16} className="mr-2 shrink-0" />
            Antenne de Bouaké
          </div>
        </div>

        <nav className="flex-1 p-3 sm:p-4 space-y-1 overflow-y-auto">
          <button onClick={() => navigate('/')} className="w-full flex items-center p-3 text-sm text-slate-300 hover:bg-slate-800 hover:text-white rounded-lg transition-colors group mb-2">
            <ArrowLeft size={18} className="mr-3 text-slate-500 group-hover:text-white shrink-0" />
            Retour Cartographie
          </button>
          {NAV_ITEMS.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => selectTab(id)}
              className={`w-full flex items-center p-3 text-sm rounded-lg transition-colors ${activeTab === id ? 'bg-blue-600 text-white font-bold' : 'text-slate-300 hover:bg-slate-800'}`}
            >
              <Icon size={18} className="mr-3 shrink-0" />
              <span className="text-left">{label}</span>
            </button>
          ))}
        </nav>
      </aside>

      <main className="flex-1 flex flex-col overflow-hidden min-w-0 w-full">
        <header className="bg-white border-b border-slate-200 shrink-0 px-3 sm:px-6 py-3 sm:py-0 sm:h-16 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-2 sm:gap-3 min-w-0 w-full sm:w-auto">
            <button
              type="button"
              onClick={() => setMobileNavOpen(true)}
              className="lg:hidden p-2 -ml-1 text-slate-600 hover:bg-slate-100 rounded-lg shrink-0"
              aria-label="Ouvrir le menu"
            >
              <Menu size={22} />
            </button>
            <div className="lg:hidden min-w-0 flex-1">
              <p className="text-[10px] uppercase tracking-wider text-slate-400 font-bold truncate">Antenne Bouaké</p>
              <p className="text-sm font-bold text-slate-800 truncate">{activeNavLabel}</p>
            </div>
            <img src={logoOcpv} alt="" className="h-7 sm:h-8 w-auto shrink-0 hidden sm:block lg:hidden" draggable={false} aria-hidden />
            <div className="hidden sm:flex items-center bg-slate-100 rounded-lg px-3 py-2 w-full max-w-md min-w-0">
              <Search size={18} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={searchPlaceholder[activeTab]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full min-w-0"
              />
            </div>
          </div>
          <div className="flex items-center justify-between sm:justify-end gap-3 sm:space-x-3 sm:border-l sm:border-slate-200 sm:pl-4 w-full sm:w-auto">
            <div className="flex items-center bg-slate-100 rounded-lg px-3 py-2 flex-1 sm:hidden min-w-0">
              <Search size={18} className="text-slate-400 mr-2 shrink-0" />
              <input
                type="text"
                placeholder={searchPlaceholder[activeTab]}
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="bg-transparent border-none outline-none text-sm w-full min-w-0"
              />
            </div>
            <div className="flex items-center space-x-2 sm:space-x-3 shrink-0">
              <div className="w-8 h-8 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold text-sm">CD</div>
              <div className="hidden sm:block text-sm">
                <p className="font-bold text-slate-700">Chef d&apos;Antenne</p>
                <p className="text-xs text-slate-500">Bouaké</p>
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 overflow-y-auto p-4 sm:p-6">
          {activeTab === 'transactions' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center gap-3 sm:gap-4 mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Activité du Jour — Bouaké</h2>
                <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto">
                  <Filter size={16} className="text-slate-400 mr-2" />
                  <select
                    className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none"
                    value={filterSecteur}
                    onChange={(e) => setFilterSecteur(e.target.value)}
                  >
                    {secteurs.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-6">
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Recettes ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-orange-600">{kpis.recettes}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"><TrendingUp size={24} /></div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Volume ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-blue-600">{kpis.tonnage}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center"><LayoutDashboard size={24} /></div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 md:col-span-1">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Passages camions ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-green-600">{kpis.camionsJour}</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center"><Truck size={24} /></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Agents ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-indigo-600">{kpis.agents}</p>
                  </div>
                  <div className="w-12 h-12 bg-indigo-100 text-indigo-500 rounded-full flex items-center justify-center"><Users size={24} /></div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">TPE ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-teal-600">{kpis.tpes}</p>
                    <p className="text-xs text-slate-500 mt-1">{kpis.tpesOnline} en ligne</p>
                  </div>
                  <div className="w-12 h-12 bg-teal-100 text-teal-500 rounded-full flex items-center justify-center"><Terminal size={24} /></div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between sm:col-span-2 md:col-span-1">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Camions enregistrés ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-emerald-600">{kpis.camions}</p>
                  </div>
                  <div className="w-12 h-12 bg-emerald-100 text-emerald-500 rounded-full flex items-center justify-center"><Truck size={24} /></div>
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3 sm:gap-6 mb-4 sm:mb-8">
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">CP émis ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-orange-600">{kpis.cp}</p>
                  </div>
                  <div className="w-12 h-12 bg-orange-100 text-orange-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                </div>
                <div className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between">
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">APE émis ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-blue-600">{kpis.ape}</p>
                  </div>
                  <div className="w-12 h-12 bg-blue-100 text-blue-500 rounded-full flex items-center justify-center"><FileText size={24} /></div>
                </div>
                <div
                  className="bg-white p-4 sm:p-6 rounded-xl border border-slate-200 shadow-sm flex items-center justify-between cursor-pointer hover:shadow-md transition-shadow sm:col-span-2 md:col-span-1"
                  onClick={() => selectTab('certificats')}
                >
                  <div className="min-w-0">
                    <p className="text-xs sm:text-sm font-bold text-slate-500 uppercase tracking-wider mb-1 truncate">Certificats valides ({filterSecteur})</p>
                    <p className="text-2xl sm:text-3xl font-black text-green-600">{kpis.certificatsValides}</p>
                    <p className="text-xs text-blue-600 font-bold mt-1">Voir la traçabilité →</p>
                  </div>
                  <div className="w-12 h-12 bg-green-100 text-green-500 rounded-full flex items-center justify-center"><QrCode size={24} /></div>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">Transactions — Secteur : {filterSecteur}</h3>
                </div>
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[520px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">ID</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Plaque</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Produit</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Zone</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-right">Montant</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredTransactions.map((trx) => (
                        <tr key={trx.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-mono text-xs text-slate-500">{trx.id}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 uppercase">{trx.plaque}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{trx.produit}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{zoneById[trx.zoneId]?.nom || '—'}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-orange-600 text-right whitespace-nowrap">{trx.montant.toLocaleString('fr-FR')} F</td>
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
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Traçabilité CP / APE</h2>
                  <p className="text-sm text-slate-500 mt-1">Registre de tous les certificats émis par les TPE de l&apos;antenne Bouaké.</p>
                </div>
                <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-2 sm:gap-3">
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto">
                    <Filter size={16} className="text-slate-400 mr-2 shrink-0" />
                    <select
                      className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none"
                      value={filterSecteur}
                      onChange={(e) => setFilterSecteur(e.target.value)}
                    >
                      {secteurs.map((s) => <option key={s} value={s}>{s}</option>)}
                    </select>
                  </div>
                  <div className="flex items-center bg-white border border-slate-200 rounded-lg px-3 py-2 shadow-sm w-full sm:w-auto">
                    <FileText size={16} className="text-slate-400 mr-2 shrink-0" />
                    <select
                      className="text-sm font-bold text-slate-700 bg-transparent border-none outline-none"
                      value={filterTypeActe}
                      onChange={(e) => setFilterTypeActe(e.target.value)}
                    >
                      {['Tous', 'CP', 'APE'].map((t) => <option key={t} value={t}>{t === 'Tous' ? 'Tous les actes' : t}</option>)}
                    </select>
                  </div>
                </div>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-4 sm:mb-8">
                <div className="bg-white p-4 sm:p-5 rounded-xl border border-slate-200 shadow-sm">
                  <p className="text-xs font-bold text-slate-500 uppercase">Total actes</p>
                  <p className="text-2xl font-black text-slate-800">{certificatsKpis.total}</p>
                </div>
                <div className="bg-orange-50 p-4 sm:p-5 rounded-xl border border-orange-200 shadow-sm">
                  <p className="text-xs font-bold text-orange-600 uppercase">CP (Provenance)</p>
                  <p className="text-2xl font-black text-orange-700">{certificatsKpis.cp}</p>
                </div>
                <div className="bg-blue-50 p-4 sm:p-5 rounded-xl border border-blue-200 shadow-sm">
                  <p className="text-xs font-bold text-blue-600 uppercase">APE (Exportation)</p>
                  <p className="text-2xl font-black text-blue-700">{certificatsKpis.ape}</p>
                </div>
                <div className="bg-green-50 p-4 sm:p-5 rounded-xl border border-green-200 shadow-sm">
                  <p className="text-xs font-bold text-green-600 uppercase">Valides &amp; traçables</p>
                  <p className="text-2xl font-black text-green-700">{certificatsKpis.valides}</p>
                </div>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="px-4 sm:px-6 py-3 sm:py-4 border-b border-slate-200">
                  <h3 className="font-bold text-slate-800 text-sm sm:text-base">
                    Registre des certificats — {filterSecteur} {filterTypeActe !== 'Tous' && `· ${filterTypeActe}`}
                  </h3>
                </div>
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[900px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-4 py-2 sm:py-3 font-semibold">N° Certificat</th>
                        <th className="px-4 py-3 font-semibold">Type</th>
                        <th className="px-4 py-3 font-semibold">Plaque</th>
                        <th className="px-4 py-3 font-semibold">Produit</th>
                        <th className="px-4 py-3 font-semibold">Zone</th>
                        <th className="px-4 py-3 font-semibold">TPE / Agent</th>
                        <th className="px-4 py-3 font-semibold">Itinéraire</th>
                        <th className="px-4 py-3 font-semibold">Émission</th>
                        <th className="px-4 py-3 font-semibold text-center">Statut</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCertificats.map((cert) => (
                        <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-4 py-3">
                            <p className="font-mono text-xs font-bold text-slate-700">{cert.id}</p>
                            <p className="text-[10px] text-slate-400 flex items-center gap-1 mt-0.5"><QrCode size={10} />{cert.qrHash}</p>
                          </td>
                          <td className="px-4 py-3">
                            <span className={`text-xs font-bold px-2 py-1 rounded ${cert.type === 'CP' ? 'bg-orange-100 text-orange-700' : 'bg-blue-100 text-blue-700'}`}>
                              {cert.type}
                            </span>
                          </td>
                          <td className="px-4 py-3 font-bold text-slate-700 uppercase">{cert.plaque}</td>
                          <td className="px-4 py-3 text-slate-600">{cert.produit} ({cert.tonnage} T)</td>
                          <td className="px-4 py-3">
                            <span className="text-xs font-bold bg-slate-100 text-slate-600 px-2 py-1 rounded">{zoneById[cert.zoneId]?.nom}</span>
                          </td>
                          <td className="px-4 py-3">
                            <p className="font-mono text-xs text-slate-700">{cert.tpeId}</p>
                            <p className="text-xs text-slate-500">{agentLabel(cert.agentId)}</p>
                          </td>
                          <td className="px-4 py-3 text-xs text-slate-600">{cert.provenance} → {cert.destination}</td>
                          <td className="px-4 py-3 text-xs text-slate-500">{cert.dateEmission}</td>
                          <td className="px-4 py-3 text-center">
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

          {activeTab === 'agents' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Gestion des Agents</h2>
                  <p className="text-sm text-slate-500 mt-1">Ajouter, modifier ou retirer les agents de contrôle de l&apos;antenne.</p>
                </div>
                <button onClick={() => openModal('agent')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow text-sm w-full sm:w-auto shrink-0">
                  <Plus size={16} /> Nouvel agent
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredAgents.map((agent) => (
                  <div key={agent.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center">
                          <User size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{agent.prenom} {agent.nom}</h3>
                          <p className="text-xs font-mono text-slate-500">{agent.matricule}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openModal('agent', agent)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg" title="Modifier">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteAgent(agent.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg" title="Supprimer">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="space-y-1 text-sm text-slate-600">
                      <p className="flex items-center gap-2"><Phone size={14} className="text-slate-400" />{agent.telephone}</p>
                      <p className="flex items-center gap-2"><MapPin size={14} className="text-slate-400" />{zoneById[agent.zoneId]?.nom || 'Non affecté'}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'zones' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Zones & Affectations</h2>
                  <p className="text-sm text-slate-500 mt-1">Créer des zones de contrôle et y affecter agents et TPE.</p>
                </div>
                <button onClick={() => openModal('zone')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow text-sm w-full sm:w-auto shrink-0">
                  <Plus size={16} /> Nouvelle zone
                </button>
              </div>

              <div className="space-y-4">
                {zones.filter((z) => !searchQuery || z.nom.toLowerCase().includes(searchQuery.toLowerCase())).map((zone) => (
                  <div key={zone.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-4">
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-base sm:text-lg flex items-center gap-2">
                          <MapPin size={18} className="text-blue-500 shrink-0" />
                          {zone.nom}
                        </h3>
                        <p className="text-sm text-slate-500 mt-1">{zone.description}</p>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openModal('zone', zone)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteZone(zone.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">Agents affectés ({zone.agentIds.length})</p>
                        {zone.agentIds.length === 0 ? (
                          <p className="text-sm text-slate-400 italic">Aucun agent</p>
                        ) : (
                          <ul className="space-y-1">
                            {zone.agentIds.map((aid) => (
                              <li key={aid} className="text-sm font-medium text-slate-700 flex items-center gap-2">
                                <Users size={14} className="text-blue-500" />{agentLabel(aid)}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                      <div className="bg-slate-50 rounded-lg p-4">
                        <p className="text-xs font-bold text-slate-500 uppercase mb-2">TPE affectés ({zone.tpeIds.length})</p>
                        {zone.tpeIds.length === 0 ? (
                          <p className="text-sm text-slate-400 italic">Aucun TPE</p>
                        ) : (
                          <ul className="space-y-1">
                            {zone.tpeIds.map((tid) => (
                              <li key={tid} className="text-sm font-mono font-medium text-slate-700 flex items-center gap-2">
                                <Terminal size={14} className="text-green-500" />{tid}
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'tpe' && (
            <div>
              <div className="mb-4 sm:mb-6">
                <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Parc TPE — Région Bouaké</h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {tpes.filter((t) => !searchQuery || t.id.toLowerCase().includes(searchQuery.toLowerCase())).map((tpe) => (
                  <div key={tpe.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5 hover:shadow-md transition-shadow relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-full h-1 ${tpe.statut === 'online' ? 'bg-green-500' : 'bg-red-500'}`}></div>
                    <div className="flex justify-between items-start gap-4 mb-4">
                      <div className="min-w-0">
                        <h3 className="font-bold text-slate-800 text-lg">{tpe.id}</h3>
                        <p className="text-xs font-bold text-slate-500 bg-slate-100 inline-block px-2 py-0.5 rounded mt-1">
                          {zoneById[tpe.zoneId]?.nom || 'Zone non définie'}
                        </p>
                      </div>
                      <div className="shrink-0 bg-slate-50 p-2 rounded-lg border border-slate-100 flex items-center justify-center">
                        <img
                          src={tpeImage}
                          alt="Terminal TPE Android"
                          className={`object-contain drop-shadow-md h-20 ${tpe.statut === 'offline' ? 'opacity-50 grayscale' : ''}`}
                        />
                      </div>
                    </div>
                    <div className="text-sm text-slate-600 space-y-1">
                      <p>Agent : <span className="font-bold text-slate-800">{agentLabel(tpe.agentId)}</span></p>
                      <p>Batterie : {tpe.batterie} — Sync : {tpe.derniereSynchro}</p>
                      <span className={`inline-block text-xs font-bold px-2 py-0.5 rounded ${tpe.statut === 'online' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'}`}>
                        {tpe.statut === 'online' ? 'En ligne' : 'Hors ligne'}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'camions' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Camions enregistrés</h2>
                  <p className="text-sm text-slate-500 mt-1">Registre des véhicules ayant transité dans les zones de l&apos;antenne.</p>
                </div>
                <button onClick={() => openModal('camion')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow text-sm w-full sm:w-auto shrink-0">
                  <Plus size={16} /> Enregistrer un camion
                </button>
              </div>

              <div className="bg-white rounded-xl border border-slate-200 shadow-sm overflow-hidden">
                <div className="overflow-x-auto -mx-px">
                  <table className="w-full text-left text-sm min-w-[720px]">
                    <thead className="bg-slate-50 text-slate-500">
                      <tr>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Plaque</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Transporteur</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Type véhicule</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Zone</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold">Dernier passage</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-center">Passages</th>
                        <th className="px-3 sm:px-6 py-2 sm:py-3 font-semibold text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-slate-100">
                      {filteredCamions.map((camion) => (
                        <tr key={camion.id} className="hover:bg-slate-50 transition-colors">
                          <td className="px-3 sm:px-6 py-3 sm:py-4 font-bold text-slate-700 uppercase whitespace-nowrap">{camion.plaque}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <p className="font-medium text-slate-700">{camion.transporteur}</p>
                            <p className="text-xs text-slate-500">{camion.contact}</p>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600">{camion.typeVehicule}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4">
                            <span className="text-xs font-bold bg-blue-50 text-blue-700 px-2 py-1 rounded">
                              {zoneById[camion.zoneId]?.nom || '—'}
                            </span>
                          </td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-slate-600 whitespace-nowrap">{camion.dernierPassage}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-center font-bold text-slate-700">{camion.nbPassages}</td>
                          <td className="px-3 sm:px-6 py-3 sm:py-4 text-right">
                            <div className="flex justify-end gap-1">
                              <button onClick={() => openModal('camion', camion)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                                <Pencil size={16} />
                              </button>
                              <button onClick={() => deleteCamion(camion.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                                <Trash2 size={16} />
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'produits' && (
            <div>
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 sm:gap-4 mb-4 sm:mb-6">
                <div>
                  <h2 className="text-xl sm:text-2xl font-bold text-slate-800">Produits vivriers</h2>
                  <p className="text-sm text-slate-500 mt-1">Catalogue des produits autorisés et tarifs par zone de l&apos;antenne.</p>
                </div>
                <button onClick={() => openModal('produit')} className="flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg shadow text-sm w-full sm:w-auto shrink-0">
                  <Plus size={16} /> Ajouter un produit
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredProduits.map((produit) => (
                  <div key={produit.id} className="bg-white rounded-xl border border-slate-200 shadow-sm p-5">
                    <div className="flex justify-between items-start mb-3">
                      <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-green-100 text-green-600 rounded-full flex items-center justify-center">
                          <Leaf size={20} />
                        </div>
                        <div>
                          <h3 className="font-bold text-slate-800">{produit.nom}</h3>
                          <p className="text-xs text-slate-500">{produit.categorie} — {produit.unite}</p>
                        </div>
                      </div>
                      <div className="flex gap-1">
                        <button onClick={() => openModal('produit', produit)} className="p-2 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-lg">
                          <Pencil size={16} />
                        </button>
                        <button onClick={() => deleteProduit(produit.id)} className="p-2 text-slate-400 hover:text-red-600 hover:bg-red-50 rounded-lg">
                          <Trash2 size={16} />
                        </button>
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-2 sm:gap-3 mb-3 text-sm">
                      <div className="bg-orange-50 text-orange-700 px-3 py-1 rounded-lg font-bold text-xs sm:text-sm">
                        CP : {produit.tarifCp.toLocaleString('fr-FR')} F/T
                      </div>
                      <div className="bg-purple-50 text-purple-700 px-3 py-1 rounded-lg font-bold text-xs sm:text-sm">
                        APE : {produit.tarifApe.toLocaleString('fr-FR')} F
                      </div>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {produit.zoneIds.map((zid) => (
                        <span key={zid} className="text-xs bg-slate-100 text-slate-600 px-2 py-0.5 rounded font-medium">
                          {zoneById[zid]?.nom}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </main>

      {modal?.type === 'agent' && (
        <Modal title={modal.editId ? 'Modifier l\'agent' : 'Nouvel agent'} onClose={closeModal}>
          <Field label="Nom">
            <input className={inputClass} value={form.nom} onChange={(e) => updateForm('nom', e.target.value)} />
          </Field>
          <Field label="Prénom">
            <input className={inputClass} value={form.prenom} onChange={(e) => updateForm('prenom', e.target.value)} />
          </Field>
          <Field label="Matricule">
            <input className={inputClass} value={form.matricule} onChange={(e) => updateForm('matricule', e.target.value)} placeholder="AGT-BKE-00X" />
          </Field>
          <Field label="Téléphone">
            <input className={inputClass} value={form.telephone} onChange={(e) => updateForm('telephone', e.target.value)} />
          </Field>
          <Field label="Zone d'affectation">
            <select className={inputClass} value={form.zoneId} onChange={(e) => updateForm('zoneId', e.target.value)}>
              <option value="">— Non affecté —</option>
              {zones.map((z) => <option key={z.id} value={z.id}>{z.nom}</option>)}
            </select>
          </Field>
          <button onClick={saveAgent} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg mt-2">
            {modal.editId ? 'Enregistrer les modifications' : 'Créer l\'agent'}
          </button>
        </Modal>
      )}

      {modal?.type === 'zone' && (
        <Modal title={modal.editId ? 'Modifier la zone' : 'Nouvelle zone'} onClose={closeModal}>
          <Field label="Nom de la zone">
            <input className={inputClass} value={form.nom} onChange={(e) => updateForm('nom', e.target.value)} placeholder="Ex: PK30 Nord" />
          </Field>
          <Field label="Description">
            <textarea className={inputClass} rows={2} value={form.description} onChange={(e) => updateForm('description', e.target.value)} />
          </Field>
          <Field label="Agents à affecter">
            <div className="border border-slate-200 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
              {agents.map((a) => (
                <label key={a.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.agentIds?.includes(a.id)} onChange={() => toggleAgentInZone(a.id)} />
                  {a.prenom} {a.nom} ({a.matricule})
                </label>
              ))}
            </div>
          </Field>
          <Field label="TPE à affecter">
            <div className="border border-slate-200 rounded-lg p-3 space-y-2 max-h-32 overflow-y-auto">
              {tpes.map((t) => (
                <label key={t.id} className="flex items-center gap-2 text-sm cursor-pointer font-mono">
                  <input type="checkbox" checked={form.tpeIds?.includes(t.id)} onChange={() => toggleTpeInZone(t.id)} />
                  {t.id}
                </label>
              ))}
            </div>
          </Field>
          <button onClick={saveZone} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg mt-2">
            {modal.editId ? 'Enregistrer les modifications' : 'Créer la zone'}
          </button>
        </Modal>
      )}

      {modal?.type === 'camion' && (
        <Modal title={modal.editId ? 'Modifier le camion' : 'Enregistrer un camion'} onClose={closeModal}>
          <Field label="Plaque d'immatriculation">
            <input className={inputClass} value={form.plaque} onChange={(e) => updateForm('plaque', e.target.value.toUpperCase())} placeholder="1234 AB 01" />
          </Field>
          <Field label="Nom du transporteur">
            <input className={inputClass} value={form.transporteur} onChange={(e) => updateForm('transporteur', e.target.value)} />
          </Field>
          <Field label="Contact">
            <input className={inputClass} value={form.contact} onChange={(e) => updateForm('contact', e.target.value)} />
          </Field>
          <Field label="Type de véhicule">
            <input className={inputClass} value={form.typeVehicule} onChange={(e) => updateForm('typeVehicule', e.target.value)} placeholder="Camion 10T" />
          </Field>
          <Field label="Zone principale">
            <select className={inputClass} value={form.zoneId} onChange={(e) => updateForm('zoneId', e.target.value)}>
              {zones.map((z) => <option key={z.id} value={z.id}>{z.nom}</option>)}
            </select>
          </Field>
          <button onClick={saveCamion} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg mt-2">
            {modal.editId ? 'Enregistrer les modifications' : 'Enregistrer'}
          </button>
        </Modal>
      )}

      {modal?.type === 'produit' && (
        <Modal title={modal.editId ? 'Modifier le produit' : 'Nouveau produit vivrier'} onClose={closeModal}>
          <Field label="Nom du produit">
            <input className={inputClass} value={form.nom} onChange={(e) => updateForm('nom', e.target.value)} />
          </Field>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Catégorie">
              <select className={inputClass} value={form.categorie} onChange={(e) => updateForm('categorie', e.target.value)}>
                {['Tubercule', 'Fruit', 'Légume', 'Céréale', 'Autre'].map((c) => <option key={c} value={c}>{c}</option>)}
              </select>
            </Field>
            <Field label="Unité">
              <select className={inputClass} value={form.unite} onChange={(e) => updateForm('unite', e.target.value)}>
                {['Tonne', 'Sac', 'Caisse'].map((u) => <option key={u} value={u}>{u}</option>)}
              </select>
            </Field>
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Field label="Tarif CP (F/T)">
              <input type="number" className={inputClass} value={form.tarifCp} onChange={(e) => updateForm('tarifCp', Number(e.target.value))} />
            </Field>
            <Field label="Tarif APE (F)">
              <input type="number" className={inputClass} value={form.tarifApe} onChange={(e) => updateForm('tarifApe', Number(e.target.value))} />
            </Field>
          </div>
          <Field label="Zones autorisées">
            <div className="border border-slate-200 rounded-lg p-3 space-y-2">
              {zones.map((z) => (
                <label key={z.id} className="flex items-center gap-2 text-sm cursor-pointer">
                  <input type="checkbox" checked={form.zoneIds?.includes(z.id)} onChange={() => toggleZoneInProduit(z.id)} />
                  {z.nom}
                </label>
              ))}
            </div>
          </Field>
          <button onClick={saveProduit} className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2.5 rounded-lg mt-2">
            {modal.editId ? 'Enregistrer les modifications' : 'Ajouter le produit'}
          </button>
        </Modal>
      )}
    </div>
  );
};

export default DashboardAntenne;

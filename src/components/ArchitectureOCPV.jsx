import { useState, useCallback, useEffect, useRef, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import { Monitor, ArrowDown, Info, Database, Zap, Play, FileText, Wallet, RotateCcw, Landmark, Eye } from 'lucide-react';
import tpeImage from '../assets/TPE.png';
import agentImage from '../assets/agent.png';
import camionLeft from '../assets/camion_left.png';
import camionLeft2 from '../assets/camion_left2.png';
import camionRight1 from '../assets/camion1_rigth.png';
import camionRight2 from '../assets/camion2_right.png';
import logoOcpv from '../assets/logo_ocpv.png';

const TRUCK_LOOP_DURATION = 10;
const ARRIVAL_RATIO = 0.72;

const FLOW_STAGES = [
  { node: 'tpe1', event: 'InitierPaiementÉlectronique', color: 'orange', delay: 0 },
  { node: 'antenne1', event: 'TransactionSauvegardée', color: 'blue', delay: 1200 },
  { node: 'backend', event: 'SynchroniserDonnéesLocales', color: 'slate', delay: 2400 },
  { node: 'dgm', event: 'RecettesRéparties', color: 'green', delay: 3600 },
];

const CARD_W = 'w-52';
const TPE_W = 'w-52';

/** Largeur native du diagramme (= 2 colonnes antennes) */
const DIAGRAM_BASE_WIDTH = 860;

/** Tarification OCPV */
const calculerTarifCP = (tonnes) => {
  if (tonnes <= 1) return 500;
  if (tonnes <= 5) return 1500;
  return 3000;
};

const calculerTarifCO = () => 6000;

const INITIAL_COMPTES = {
  tresor: 0,
  dgm: 0,
  antennes: 0,
  prestataire: 0,
  total: 0,
};

const repartirRecettes = (montant) => ({
  tresor: Math.round(montant * 0.7),
  dgm: Math.round(montant * 0.15),
  antennes: Math.round(montant * 0.1),
  prestataire: Math.round(montant * 0.05),
});

const CAISSES_CONFIG = [
  { key: 'tresor', label: 'Trésor', pct: '70%', color: 'text-emerald-700', bg: 'bg-emerald-50' },
  { key: 'dgm', label: 'DGM', pct: '15%', color: 'text-blue-700', bg: 'bg-blue-50' },
  { key: 'antennes', label: 'Antennes', pct: '10%', color: 'text-orange-700', bg: 'bg-orange-50' },
  { key: 'prestataire', label: 'Presta', pct: '5%', color: 'text-purple-700', bg: 'bg-purple-50' },
];

const TRUCK_CONFIG = [
  { src: camionLeft, side: 'left', stop: '18%', row: '38%', delay: 0, targetTpe: 'tpe1', tonnes: 3, docType: 'CP' },
  { src: camionLeft2, side: 'left', stop: '22%', row: '62%', delay: TRUCK_LOOP_DURATION / 2, targetTpe: 'tpe2', tonnes: 0.8, docType: 'CP' },
  { src: camionRight1, side: 'right', stop: '78%', row: '38%', delay: 0, targetTpe: 'tpe3', tonnes: 6, docType: 'CP' },
  { src: camionRight2, side: 'right', stop: '82%', row: '62%', delay: TRUCK_LOOP_DURATION / 2, targetTpe: 'tpe4', tonnes: 2, docType: 'APE' },
];

/** Petit badge Voir — coin supérieur gauche */
const VoirBadge = ({ onVoir }) => (
  <button
    onClick={(e) => { e.stopPropagation(); onVoir(); }}
    className="absolute top-1.5 left-1.5 z-20 flex items-center gap-0.5 px-1.5 py-0.5 rounded text-[8px] font-bold text-blue-700 bg-white/60 hover:bg-white/90 border border-blue-300/50 backdrop-blur-sm transition-colors"
  >
    <Eye size={9} />
    Voir
  </button>
);

const MiniMockup = ({
  type, title, subtitle, status, onClick, onVoir, isActive, isFlowActive, nodeId,
  compact = false, coinPopup = null, docFly = null,
}) => {
  const isPC = type === 'pc';
  const widthClass = compact ? TPE_W : CARD_W;

  return (
    <div
      id={`node-${nodeId}`}
      onClick={onClick}
      className={`relative cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl overflow-visible ${
        isFlowActive
          ? 'ring-4 ring-offset-2 scale-105 shadow-2xl animate-flow-pulse'
          : isActive
            ? 'ring-4 ring-orange-500 scale-105'
            : 'ring-1 ring-gray-200'
      } ${isFlowActive ? (isPC ? 'ring-blue-500' : 'ring-orange-500') : ''} bg-white rounded-xl p-4 ${widthClass} flex flex-col items-center shadow-lg`}
    >
      {onVoir && <VoirBadge onVoir={onVoir} />}

      {coinPopup && (
        <div className="absolute -top-2 left-1/2 z-30 pointer-events-none animate-coin-popup">
          <span className="text-green-500 font-black text-base sm:text-lg whitespace-nowrap drop-shadow-[0_2px_4px_rgba(0,0,0,0.3)]">
            {coinPopup}
          </span>
        </div>
      )}

      {docFly && (
        <div
          key={docFly.key}
          className={`absolute top-1/2 left-1/2 z-30 pointer-events-none flex flex-col items-center ${
            docFly.side === 'left' ? 'animate-doc-to-truck-left' : 'animate-doc-to-truck-right'
          }`}
        >
          <FileText size={22} className={docFly.docType === 'APE' ? 'text-blue-600' : 'text-orange-600'} />
          <span className={`text-[9px] font-black px-1 rounded ${
            docFly.docType === 'APE' ? 'bg-blue-100 text-blue-700' : 'bg-orange-100 text-orange-700'
          }`}>
            {docFly.docType}
          </span>
        </div>
      )}

      {isFlowActive && (
        <div className="absolute -top-3 left-1/2 -translate-x-1/2 z-20">
          <span className="bg-orange-500 text-white text-[9px] font-bold px-2 py-0.5 rounded-full whitespace-nowrap animate-bounce shadow-lg flex items-center gap-1">
            <Zap size={10} /> Flux actif
          </span>
        </div>
      )}

      {isPC ? (
        <div className="p-3 rounded-full mb-3 bg-blue-100 text-blue-600">
          <Monitor size={32} />
        </div>
      ) : (
        <div className={`mb-3 flex items-end justify-center gap-2 ${compact ? 'h-14' : 'h-16'}`}>
          <img
            src={tpeImage}
            alt="Terminal TPE Android"
            className={`object-contain drop-shadow-md ${compact ? 'h-12' : 'h-14'}`}
          />
          +
          <img
            src={agentImage}
            alt="Agent OCPV"
            className={`object-contain ${compact ? 'h-11' : 'h-12'}`}
          />
        </div>
      )}

      <h3 className="font-bold text-gray-800 text-center text-sm">{title}</h3>
      <p className="text-xs text-gray-500 text-center mt-1">{subtitle}</p>

      <div className="mt-3 flex items-center justify-center bg-green-50 text-green-700 px-2 py-1 rounded-full text-[10px] font-bold w-full">
        <span className="w-2 h-2 bg-green-500 rounded-full mr-1 animate-pulse"></span>
        {status}
      </div>

      <button
        onClick={(e) => e.stopPropagation()}
        className="absolute top-2 right-2 text-gray-400 hover:text-blue-500 transition-colors"
      >
        <Info size={16} />
      </button>
    </div>
  );
};

const TruckAnimations = () => (
  <div
    className="absolute left-1/2 -translate-x-1/2 w-screen top-0 bottom-0 pointer-events-none overflow-hidden z-0"
    aria-hidden="true"
  >
    {TRUCK_CONFIG.map(({ src, side, stop, row, delay }, index) => (
      <img
        key={index}
        src={src}
        alt=""
        className={`absolute h-11 sm:h-14 md:h-16 w-auto object-contain will-change-transform ${
          side === 'left' ? 'truck-from-left' : 'truck-from-right'
        }`}
        style={{
          top: row,
          '--truck-stop': stop,
          animationDuration: `${TRUCK_LOOP_DURATION}s`,
          animationDelay: `${delay}s`,
        }}
      />
    ))}
  </div>
);

/** Ligne verticale avec particules financières montantes */
const VLine = ({ height = 'h-8', color = 'blue', active = false, financial = false, boost = false }) => (
  <div className={`relative ${height} shrink-0 flex justify-center`}>
    <div
      className={`h-full border-l-2 border-dashed ${
        financial
          ? `border-green-400 ${boost ? 'border-green-500 border-solid' : ''}`
          : color === 'blue' ? 'border-blue-400' : 'border-orange-400'
      } ${active ? 'flow-connector-active' : ''}`}
    />
    {financial && (
      <>
        {[0, 1, 2].map((i) => (
          <span
            key={i}
            className={`absolute left-1/2 -translate-x-1/2 w-2 h-2 rounded-full shadow-sm ${
              boost ? 'bg-yellow-400 animate-flow-up-fast' : 'bg-green-500 animate-flow-up'
            }`}
            style={{ animationDelay: `${i * 0.55}s` }}
          />
        ))}
      </>
    )}
  </div>
);

const TeeDown = ({ width, color = 'blue', active = false, stemHeight = 'h-6', financial = false, boost = false }) => (
  <div className="flex flex-col items-center w-full" style={{ maxWidth: width }}>
    <VLine height={stemHeight} color={color} active={active} financial={financial} boost={boost} />
    <div className="relative w-full h-0">
      <div
        className={`absolute top-0 left-[25%] right-[25%] border-t-2 border-dashed ${
          color === 'blue' ? 'border-blue-400' : 'border-orange-400'
        } ${active ? 'flow-connector-h-active' : ''} ${financial ? 'border-green-400/50' : ''}`}
      />
    </div>
  </div>
);

const TeeBranch = ({ color = 'blue', active = false, children }) => (
  <div className="flex flex-col items-center -mt-px">
    <VLine height="h-6" color={color} active={active} />
    <ArrowDown
      size={16}
      className={`mb-1 shrink-0 ${active ? 'text-orange-500 animate-bounce' : color === 'blue' ? 'text-blue-400' : 'text-orange-400'}`}
    />
    {children}
  </div>
);

/** Panneau d'aide — desktop inchangé ; compact sur mobile */
const GuidePanel = () => (
  <div className="fixed top-3 left-3 sm:top-4 sm:left-4 z-40 w-44 sm:w-60 lg:w-64 bg-white/95 backdrop-blur-sm border border-orange-200 rounded-xl shadow-lg p-2.5 sm:p-3.5 pointer-events-none">
    <div className="flex items-center gap-1.5 sm:gap-2 mb-1.5 sm:mb-2">
      <img src={logoOcpv} alt="OCPV" className="h-6 sm:h-8 w-auto shrink-0" draggable={false} />
      <h4 className="font-bold text-orange-700 text-[10px] sm:text-xs flex items-center gap-1 min-w-0">
        <Info size={12} className="shrink-0 sm:hidden" />
        <Info size={14} className="shrink-0 hidden sm:block" />
        <span className="truncate">Guide cartographie</span>
      </h4>
    </div>
    <ul className="space-y-1 sm:space-y-2 text-[9px] sm:text-[11px] text-gray-600 leading-snug">
      <li className="flex gap-1.5">
        <span className="text-orange-500 font-bold shrink-0">•</span>
        <span>Cliquez sur les cartes pour voir les interfaces</span>
      </li>
      <li className="flex gap-1.5">
        <span className="text-orange-500 font-bold shrink-0">•</span>
        <span>Réinitialisez le processus en cliquant sur le bouton <strong className="text-gray-800">Réinitialiser</strong></span>
      </li>
      <li className="flex gap-1.5">
        <span className="text-orange-500 font-bold shrink-0">•</span>
        <span>Sur chaque carte, cliquez le badge <strong className="text-blue-700">Voir</strong> en haut à gauche</span>
      </li>
    </ul>
  </div>
);

/** Card des caisses OCPV — format horizontal compact, aligné sur le DGM */
const ComptesOCPVCard = ({ comptes, isActive, isFlowActive, onClick, onVoir, pulseKey }) => (
  <div
    id="node-comptes"
    onClick={onClick}
    className={`relative cursor-pointer transition-all duration-500 transform hover:-translate-y-1 hover:shadow-xl overflow-visible ${
      isFlowActive
        ? 'ring-4 ring-offset-2 ring-green-500 scale-105 shadow-2xl animate-flow-pulse'
        : isActive
          ? 'ring-4 ring-orange-500 scale-105'
          : 'ring-1 ring-gray-200'
    } bg-white rounded-xl p-3 w-72 flex flex-col shadow-lg`}
  >
    {onVoir && <VoirBadge onVoir={onVoir} />}
    <div className="flex items-center gap-2 mb-2">
      <div className="p-1.5 rounded-full bg-green-100 text-green-600 shrink-0">
        <Landmark size={18} />
      </div>
      <div className="flex-1 min-w-0">
        <h3 className="font-bold text-gray-800 text-xs leading-tight">Caisses OCPV</h3>
        <p className="text-[9px] text-gray-500 leading-tight">Répartition DAAF</p>
      </div>
      <div className={`text-right shrink-0 ${pulseKey === 'total' ? 'animate-caisse-pulse' : ''}`}>
        <p className="text-[8px] text-gray-400 font-semibold uppercase">Total</p>
        <p className="text-xs font-black text-green-600 font-mono leading-tight">
          {comptes.total.toLocaleString('fr-FR')}
        </p>
      </div>
    </div>

    <div className="grid grid-cols-2 gap-1 w-full">
      {CAISSES_CONFIG.map(({ key, label, pct, color, bg }) => (
        <div
          key={key}
          className={`flex justify-between items-center px-1.5 py-0.5 rounded text-[8px] font-bold leading-tight ${bg} ${
            pulseKey === key ? 'animate-caisse-pulse' : ''
          }`}
        >
          <span className="text-gray-600 truncate mr-0.5">{label} <span className="text-gray-400 font-normal">{pct}</span></span>
          <span className={`font-mono whitespace-nowrap ${color}`}>
            {comptes[key].toLocaleString('fr-FR')}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-1.5 flex items-center justify-center bg-green-50 text-green-700 px-2 py-0.5 rounded-full text-[9px] font-bold w-full">
      <Wallet size={10} className="mr-1 shrink-0" />
      Recettes consolidées · FCFA
    </div>

    <button
      onClick={(e) => e.stopPropagation()}
      className="absolute top-1.5 right-1.5 text-gray-400 hover:text-blue-500 transition-colors"
    >
      <Info size={12} />
    </button>
  </div>
);

/** Mobile : réduit le diagramme entier (structure intacte) pour tenir dans l'écran ; desktop : aucun scale */
const DiagramViewport = ({ children }) => {
  const viewportRef = useRef(null);
  const contentRef = useRef(null);
  const [scale, setScale] = useState(1);
  const [contentHeight, setContentHeight] = useState(820);
  const [isCompact, setIsCompact] = useState(() => (
    typeof window !== 'undefined' && window.innerWidth < 1024
  ));

  useEffect(() => {
    const checkCompact = () => setIsCompact(window.innerWidth < 1024);
    checkCompact();
    window.addEventListener('resize', checkCompact);
    return () => window.removeEventListener('resize', checkCompact);
  }, []);

  useEffect(() => {
    const content = contentRef.current;
    if (!content) return undefined;

    const measure = () => setContentHeight(content.scrollHeight);

    measure();
    const observer = new ResizeObserver(measure);
    observer.observe(content);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateScale = () => {
      const viewport = viewportRef.current;
      if (!viewport) return;

      if (window.innerWidth >= 1024) {
        setScale(1);
        return;
      }

      const pad = 4;
      const scaleW = (viewport.clientWidth - pad) / DIAGRAM_BASE_WIDTH;
      const scaleH = (viewport.clientHeight - pad) / contentHeight;
      setScale(Math.min(scaleW, scaleH));
    };

    updateScale();
    const observer = new ResizeObserver(updateScale);
    if (viewportRef.current) observer.observe(viewportRef.current);
    window.addEventListener('resize', updateScale);
    return () => {
      observer.disconnect();
      window.removeEventListener('resize', updateScale);
    };
  }, [contentHeight]);

  const scaledH = contentHeight * scale;

  return (
    <div
      ref={viewportRef}
      className="relative flex-1 min-h-0 w-full lg:flex-none lg:min-h-0 overflow-auto overscroll-contain lg:overflow-visible touch-pan-x touch-pan-y"
      style={{ WebkitOverflowScrolling: 'touch' }}
    >
      {isCompact && (
        <p className="absolute bottom-2 left-1/2 -translate-x-1/2 z-20 text-[9px] text-gray-400 bg-slate-50/80 px-2 py-0.5 rounded-full pointer-events-none whitespace-nowrap">
          Pincez pour zoomer
        </p>
      )}
      <div
        className={`mx-auto w-full ${isCompact ? 'relative flex items-center justify-center' : ''}`}
        style={isCompact ? { minHeight: '100%', height: scaledH } : undefined}
      >
        <div
          ref={contentRef}
          className={isCompact ? 'absolute top-1/2 left-1/2' : 'relative mx-auto'}
          style={{
            width: DIAGRAM_BASE_WIDTH,
            ...(isCompact ? {
              transform: `translate(-50%, -50%) scale(${scale})`,
              transformOrigin: 'center center',
            } : {}),
          }}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

const ArchitectureOCPV = () => {
  const navigate = useNavigate();
  const [activeNode, setActiveNode] = useState(null);
  const [flowStage, setFlowStage] = useState(null);
  const [flowEvent, setFlowEvent] = useState('');
  const [flowRunning, setFlowRunning] = useState(false);
  const [completedStages, setCompletedStages] = useState([]);
  const [tpeEffects, setTpeEffects] = useState({});
  const [financialBoost, setFinancialBoost] = useState(false);
  const [comptes, setComptes] = useState(INITIAL_COMPTES);
  const [caissePulse, setCaissePulse] = useState(null);
  const [sessionKey, setSessionKey] = useState(0);
  const effectTimers = useRef([]);

  const dddInfos = {
    dgm: "Dashboard Central (DGM/DAAF). Reçoit les événements 'RecettesRéparties' via WebSocket. Split financier : 70% Trésor, 15% DGM, 10% Antenne, 5% Prestataire.",
    comptes: "Caisses consolidées OCPV. Chaque transaction camion (CP/APE) alimente les comptes selon la répartition réglementaire DAAF. Mise à jour en temps réel via WebSocket.",
    antenne1: "Portail Antenne Abidjan. Bounded Context : Supervision Régionale. Filtre les événements 'TransactionSauvegardée' sur la zone Sud.",
    tpe1: "TPE Corridor PK30. Nœud Zéro. Émet la commande 'InitierPaiementÉlectronique' et gère la logique Offline-First.",
    backend: "Backend Rust (Actix-Web). Reçoit les payloads (ID, Montant, Tonnage, GPS, Timestamp) et exécute l'algorithme de répartition DAAF.",
  };

  const triggerTruckTransaction = useCallback((truck) => {
    const montant = truck.docType === 'APE'
      ? calculerTarifCO()
      : calculerTarifCP(truck.tonnes);

    const coinLabel = `+ ${montant.toLocaleString('fr-FR')} FCFA`;
    const effectKey = Date.now();

    setTpeEffects((prev) => ({
      ...prev,
      [truck.targetTpe]: {
        coin: coinLabel,
        docFly: { key: effectKey, docType: truck.docType, side: truck.side },
      },
    }));

    setFinancialBoost(true);

    const split = repartirRecettes(montant);
    setComptes((prev) => ({
      tresor: prev.tresor + split.tresor,
      dgm: prev.dgm + split.dgm,
      antennes: prev.antennes + split.antennes,
      prestataire: prev.prestataire + split.prestataire,
      total: prev.total + montant,
    }));

    setCaissePulse('total');
    const clearPulse = setTimeout(() => setCaissePulse(null), 800);
    effectTimers.current.push(clearPulse);

    const clearCoin = setTimeout(() => {
      setTpeEffects((prev) => {
        const next = { ...prev };
        if (next[truck.targetTpe]) {
          next[truck.targetTpe] = { ...next[truck.targetTpe], coin: null };
        }
        return next;
      });
    }, 1600);

    const clearDoc = setTimeout(() => {
      setTpeEffects((prev) => {
        const next = { ...prev };
        if (next[truck.targetTpe]) {
          delete next[truck.targetTpe];
        }
        return next;
      });
    }, 1000);

    const clearBoost = setTimeout(() => setFinancialBoost(false), 2000);

    effectTimers.current.push(clearCoin, clearDoc, clearBoost);
  }, []);

  const handleReset = useCallback(() => {
    effectTimers.current.forEach(clearTimeout);
    effectTimers.current = [];
    setComptes(INITIAL_COMPTES);
    setTpeEffects({});
    setFinancialBoost(false);
    setCaissePulse(null);
    setActiveNode(null);
    setFlowStage(null);
    setFlowEvent('');
    setFlowRunning(false);
    setCompletedStages([]);
    setSessionKey((k) => k + 1);
  }, []);

  useEffect(() => {
    const intervals = [];
    const timeouts = [];

    TRUCK_CONFIG.forEach((truck) => {
      const firstAt = (truck.delay + TRUCK_LOOP_DURATION * ARRIVAL_RATIO) * 1000;

      const timeout = setTimeout(() => {
        triggerTruckTransaction(truck);
        const interval = setInterval(() => triggerTruckTransaction(truck), TRUCK_LOOP_DURATION * 1000);
        intervals.push(interval);
      }, firstAt);

      timeouts.push(timeout);
    });

    return () => {
      timeouts.forEach(clearTimeout);
      intervals.forEach(clearInterval);
      effectTimers.current.forEach(clearTimeout);
      effectTimers.current = [];
    };
  }, [triggerTruckTransaction, sessionKey]);

  const simulateFlow = useCallback(() => {
    if (flowRunning) return;
    setFlowRunning(true);
    setCompletedStages([]);
    setActiveNode('tpe1');

    FLOW_STAGES.forEach(({ node, event, delay }) => {
      setTimeout(() => {
        setFlowStage(node);
        setFlowEvent(event);
        setCompletedStages((prev) => [...prev, node]);
      }, delay);
    });

    setTimeout(() => {
      setFlowRunning(false);
      setFlowStage(null);
      setFlowEvent('');
    }, 5500);
  }, [flowRunning]);

  const isNodeActive = (nodeId) => flowStage === nodeId;
  const isConnectorActive = (fromNode) => completedStages.includes(fromNode) && flowRunning;
  const getTpeEffect = (tpeId) => tpeEffects[tpeId] || {};

  const COL_W = 430;
  const ANTENNE_ROW_W = COL_W * 2;
  const TPE_ROW_W = COL_W;

  const tpeProps = (id, extra = {}) => ({
    coinPopup: getTpeEffect(id).coin,
    docFly: getTpeEffect(id).docFly,
    ...extra,
  });

  const handleVoir = useCallback((nodeId) => {
    if (nodeId.startsWith('tpe')) {
      navigate('/tpe-mockup');
    } else if (nodeId.startsWith('antenne')) {
      navigate('/dashboard-antenne');
    } else if (nodeId === 'dgm' || nodeId === 'comptes') {
      navigate('/dashboard-dgm');
    } else {
      setActiveNode(nodeId);
    }
  }, [navigate]);

  const cardHandlers = (nodeId) => {
    const isAntenne = nodeId.startsWith('antenne');
    const isDgm = nodeId === 'dgm' || nodeId === 'comptes';
    const isTpe = nodeId.startsWith('tpe');
    return {
      onClick: () => {
        if (isTpe) navigate('/tpe-mockup');
        else if (isAntenne) navigate('/dashboard-antenne');
        else if (isDgm) navigate('/dashboard-dgm');
        else setActiveNode(nodeId);
      },
      onVoir: () => handleVoir(nodeId),
    };
  };

  const panelAction = useMemo(() => {
    if (!activeNode) return null;
    if (activeNode.startsWith('tpe')) {
      return { label: 'Ouvrir la maquette TPE', path: '/tpe-mockup' };
    }
    if (activeNode.startsWith('antenne')) {
      return { label: 'Ouvrir le dashboard antenne', path: '/dashboard-antenne' };
    }
    if (activeNode === 'dgm' || activeNode === 'comptes') {
      return { label: 'Ouvrir le dashboard DGM', path: '/dashboard-dgm' };
    }
    return null;
  }, [activeNode]);

  return (
    <div className="h-[100dvh] lg:min-h-screen lg:h-auto bg-slate-50 flex flex-col overflow-hidden lg:overflow-visible px-2 sm:px-4 py-2 lg:py-8 font-sans relative">
      <GuidePanel />
      {flowEvent && (
        <div className="fixed top-2 lg:top-4 left-1/2 -translate-x-1/2 z-50 animate-slide-down w-[calc(100%-1rem)] max-w-md px-2 pointer-events-none">
          <div className="bg-orange-500 text-white px-4 py-2 rounded-full shadow-2xl flex items-center justify-center gap-2 font-bold text-xs sm:text-sm">
            <span className="w-2.5 h-2.5 bg-white rounded-full animate-ping shrink-0"></span>
            <span className="uppercase tracking-wide truncate">🟠 {flowEvent}</span>
          </div>
        </div>
      )}

      {/* En-tête — compact mobile, desktop inchangé */}
      <div className="shrink-0 text-center mb-2 lg:mb-6 max-w-3xl mx-auto w-full relative overflow-visible pt-1 lg:pt-0">
        <button
          onClick={handleReset}
          className="fixed top-3 right-3 z-50 lg:absolute lg:-top-2 lg:right-[-3rem] lg:z-auto flex items-center gap-1.5 px-2.5 lg:px-3 py-1 lg:py-1.5 bg-white border border-gray-200 rounded-lg text-[10px] lg:text-xs font-bold text-gray-600 hover:text-red-600 hover:border-red-300 shadow-sm transition-colors"
        >
          <RotateCcw size={12} className="lg:hidden" />
          <RotateCcw size={14} className="hidden lg:block" />
          <span className="hidden sm:inline">Réinitialiser</span>
        </button>

        <h1 className="text-base sm:text-xl lg:text-3xl font-black text-gray-800 mb-0 lg:mb-2 px-16 lg:px-0 leading-tight">
          Cartographie Système OCPV
        </h1>
        <p className="hidden lg:block text-gray-500">Vue d&apos;ensemble de l&apos;architecture logicielle et des flux de données</p>
        <div className="hidden lg:flex flex-wrap justify-center gap-2 mt-4 text-[10px]">
          <span className="px-2 py-1 rounded bg-blue-100 text-blue-800 font-bold">🔵 Commande</span>
          <span className="px-2 py-1 rounded bg-orange-100 text-orange-800 font-bold">🟠 Événement</span>
          <span className="px-2 py-1 rounded bg-purple-100 text-purple-800 font-bold">🟣 Règle</span>
          <span className="px-2 py-1 rounded bg-green-100 text-green-800 font-bold">🟢 Vue</span>
        </div>
      </div>

      <DiagramViewport>
      <div className="flex flex-col items-center mx-auto w-full max-w-4xl">

        {/* Niveau DGM + Caisses OCPV */}
        <div className="flex flex-col items-center w-full">
          <div className="flex items-center justify-center gap-0 w-full" style={{ maxWidth: 600 }}>
            <MiniMockup
              nodeId="dgm"
              type="pc"
              title="Super-Dashboard DGM"
              subtitle="Direction Générale & DAAF"
              status="API Temps Réel Connectée"
              isActive={activeNode === 'dgm'}
              isFlowActive={isNodeActive('dgm')}
              {...cardHandlers('dgm')}
            />

            <div className="flex items-center mx-1 shrink-0">
              <div className={`w-8 border-t-2 border-dashed border-blue-400 ${financialBoost ? 'flow-connector-h-active' : ''}`} />
            </div>

            <ComptesOCPVCard
              comptes={comptes}
              isActive={activeNode === 'comptes'}
              isFlowActive={financialBoost}
              pulseKey={caissePulse}
              {...cardHandlers('comptes')}
            />
          </div>

          <VLine height="h-8" color="blue" active={isConnectorActive('backend')} financial boost={financialBoost} />
        </div>

        <div
          id="node-backend"
          className={`rounded-lg px-6 py-2 flex items-center shadow-inner text-sm font-bold transition-all duration-500 ${
            isNodeActive('backend')
              ? 'bg-slate-900 text-white ring-4 ring-slate-400 ring-offset-2 scale-105 animate-flow-pulse'
              : 'bg-slate-800 text-white'
          } ${financialBoost ? 'ring-2 ring-green-400' : ''}`}
        >
          <Database size={16} className="mr-2 text-blue-400" />
          Backend Rust (Actix-Web)
        </div>

        <TeeDown
          width={ANTENNE_ROW_W}
          color="blue"
          active={isConnectorActive('antenne1') || isConnectorActive('backend')}
          stemHeight="h-10"
          financial
          boost={financialBoost}
        />

        <div
          className="grid grid-cols-2 w-full mx-auto -mt-px"
          style={{ maxWidth: ANTENNE_ROW_W }}
        >
          <TeeBranch color="blue" active={isConnectorActive('tpe1')}>
            <MiniMockup
              nodeId="antenne1"
              type="pc"
              title="Dashboard Antenne Régionale"
              subtitle="Zone Sud (Abidjan)"
              status="Synchronisation OK"
              isActive={activeNode === 'antenne1'}
              isFlowActive={isNodeActive('antenne1')}
              {...cardHandlers('antenne1')}
            />
          </TeeBranch>

          <TeeBranch color="blue" active={false}>
            <MiniMockup
              nodeId="antenne2"
              type="pc"
              title="Dashboard Antenne Régionale"
              subtitle="Zone Nord (Bouaké)"
              status="Synchronisation OK"
              isActive={activeNode === 'antenne2'}
              {...cardHandlers('antenne2')}
            />
          </TeeBranch>
        </div>

        <div
          className="relative w-full mx-auto overflow-visible"
          style={{ maxWidth: ANTENNE_ROW_W }}
        >
          <TruckAnimations />

          <div className="relative z-10 grid grid-cols-2 w-full -mt-px overflow-visible">
            <div className="flex flex-col items-center overflow-visible">
              <TeeDown
                width={TPE_ROW_W}
                color="orange"
                active={isConnectorActive('antenne1')}
                stemHeight="h-8"
                financial
                boost={financialBoost}
              />
              <div
                className="grid grid-cols-2 gap-2 w-full -mt-px justify-items-center overflow-visible"
                style={{ maxWidth: TPE_ROW_W }}
              >
                <TeeBranch color="orange" active={flowStage === 'tpe1'}>
                  <MiniMockup
                    compact
                    nodeId="tpe1"
                    type="tpe"
                    title="TPE Smart POS 001"
                    subtitle="Corridor PK30"
                    status="Online - 4G"
                    isActive={activeNode === 'tpe1'}
                    isFlowActive={isNodeActive('tpe1')}
                    {...tpeProps('tpe1', cardHandlers('tpe1'))}
                  />
                </TeeBranch>
                <TeeBranch color="orange" active={false}>
                  <MiniMockup
                    compact
                    nodeId="tpe2"
                    type="tpe"
                    title="TPE Smart POS 002"
                    subtitle="Marché de Gros"
                    status="Offline Mode"
                    isActive={activeNode === 'tpe2'}
                    {...tpeProps('tpe2', cardHandlers('tpe2'))}
                  />
                </TeeBranch>
              </div>
            </div>

            <div className="flex flex-col items-center overflow-visible">
              <TeeDown
                width={TPE_ROW_W}
                color="orange"
                active={false}
                stemHeight="h-8"
                financial
                boost={financialBoost}
              />
              <div
                className="grid grid-cols-2 gap-2 w-full -mt-px justify-items-center overflow-visible"
                style={{ maxWidth: TPE_ROW_W }}
              >
                <TeeBranch color="orange" active={false}>
                  <MiniMockup
                    compact
                    nodeId="tpe3"
                    type="tpe"
                    title="TPE Smart POS 003"
                    subtitle="Corridor Tiébissou"
                    status="Online - 4G"
                    isActive={activeNode === 'tpe3'}
                    {...tpeProps('tpe3', cardHandlers('tpe3'))}
                  />
                </TeeBranch>
                <TeeBranch color="orange" active={false}>
                  <MiniMockup
                    compact
                    nodeId="tpe4"
                    type="tpe"
                    title="TPE Smart POS 004"
                    subtitle="Gare Routière"
                    status="Online - 4G"
                    isActive={activeNode === 'tpe4'}
                    {...tpeProps('tpe4', cardHandlers('tpe4'))}
                  />
                </TeeBranch>
              </div>
            </div>
          </div>
        </div>
      </div>
      </DiagramViewport>

      {activeNode && (
        <div className="fixed bottom-0 inset-x-0 md:inset-x-auto md:bottom-8 md:right-8 w-full md:w-80 bg-white p-4 sm:p-6 rounded-t-2xl md:rounded-xl shadow-2xl border border-gray-100 z-40 max-h-[55vh] overflow-y-auto">
          <div className="flex justify-between items-start mb-3 md:mb-4">
            <h3 className="font-bold text-base sm:text-lg text-gray-800">Détails Techniques</h3>
            <button onClick={() => setActiveNode(null)} className="text-gray-400 hover:text-gray-800 font-bold p-1">✕</button>
          </div>
          <p className="text-sm text-gray-600 leading-relaxed">
            {dddInfos[activeNode] || "Données d'architecture à intégrer."}
          </p>

          {activeNode === 'tpe1' && (
            <button
              onClick={simulateFlow}
              disabled={flowRunning}
              className="mt-3 w-full bg-orange-500 hover:bg-orange-600 disabled:opacity-50 text-white text-sm font-bold py-2.5 rounded transition-colors flex items-center justify-center gap-2"
            >
              <Play size={16} />
              {flowRunning ? 'Flux en cours...' : 'Simuler le flux de transaction'}
            </button>
          )}

          {panelAction && (
            <button
              onClick={() => navigate(panelAction.path)}
              className="mt-3 w-full bg-blue-600 hover:bg-blue-700 text-white text-sm font-bold py-2 rounded transition-colors"
            >
              {panelAction.label}
            </button>
          )}
        </div>
      )}

      {completedStages.length === 4 && !flowRunning && (
        <div className="fixed bottom-0 left-0 md:bottom-8 md:left-8 right-0 md:right-auto w-full md:w-72 bg-white p-4 rounded-t-xl md:rounded-xl shadow-xl border border-green-200 animate-slide-down z-30 max-h-[40vh] overflow-y-auto">
          <p className="text-xs font-bold text-green-700 uppercase mb-2">Flux terminé</p>
          <div className="space-y-1 text-[11px] text-gray-600">
            {FLOW_STAGES.map((s) => (
              <p key={s.node} className="flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-orange-400"></span>
                {s.event}
              </p>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default ArchitectureOCPV;

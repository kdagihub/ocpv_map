import { useState, useEffect, useCallback, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Search, Truck, MapPin, CheckCircle, Printer, QrCode,
  ArrowLeft, Signal, SignalZero, BatteryMedium, UserPlus, Phone,
  AlertCircle, RefreshCw, Shield, Globe, Clock, Smartphone,
} from 'lucide-react';
import omLogo from '../assets/om.png';
import waveLogo from '../assets/wave.jpeg';
import mtnLogo from '../assets/mtn.jpeg';
import moovLogo from '../assets/moov.png';
import logoOcpv from '../assets/logo_ocpv.png';

const PAYMENT_METHODS = [
  { id: 'Orange Money', label: 'Orange Money', logo: omLogo },
  { id: 'Wave', label: 'Wave', logo: waveLogo },
  { id: 'MTN MoMo', label: 'MTN MoMo', logo: mtnLogo },
  { id: 'Moov Money', label: 'Moov Money', logo: moovLogo },
];

const genererQrPaiement = (methode, montant, typeActe, plaque) => {
  const ref = `PAY-${Date.now().toString(36).toUpperCase()}`;
  const payload = `OCPV|${methode}|${montant}|${typeActe}|${plaque.replace(/\s/g, '')}|${ref}`;
  return { ref, payload };
};

const QrCodeMock = ({ value, size = 21, cellSize = 7 }) => {
  const cells = useMemo(() => {
    const grid = Array(size * size).fill(false);

    const setFinder = (ox, oy) => {
      for (let y = 0; y < 7; y++) {
        for (let x = 0; x < 7; x++) {
          const outer = x === 0 || x === 6 || y === 0 || y === 6;
          const inner = x >= 2 && x <= 4 && y >= 2 && y <= 4;
          grid[(oy + y) * size + (ox + x)] = outer || inner;
        }
      }
    };

    setFinder(0, 0);
    setFinder(size - 7, 0);
    setFinder(0, size - 7);

    let seed = value.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
    for (let y = 0; y < size; y++) {
      for (let x = 0; x < size; x++) {
        if ((x < 8 && y < 8) || (x >= size - 8 && y < 8) || (x < 8 && y >= size - 8)) continue;
        seed = (seed * 1664525 + 1013904223) >>> 0;
        grid[y * size + x] = (seed % 100) > 44;
      }
    }

    return grid;
  }, [value, size]);

  return (
    <svg
      width={size * cellSize}
      height={size * cellSize}
      viewBox={`0 0 ${size * cellSize} ${size * cellSize}`}
      className="rounded-md"
      role="img"
      aria-label="QR code de paiement"
    >
      <rect width="100%" height="100%" fill="#ffffff" />
      {cells.map((on, i) => on && (
        <rect
          key={i}
          x={(i % size) * cellSize}
          y={Math.floor(i / size) * cellSize}
          width={cellSize}
          height={cellSize}
          fill="#111827"
        />
      ))}
    </svg>
  );
};

const TRANSPORTEURS_CONNUS = {
  '1234 AB 01': {
    nom: 'Jean Konan',
    contact: '07 12 34 56 78',
    typeVehicule: 'Camion 10T',
    historique: ['CP-2025-001', 'CP-2025-089', 'CP-2026-012'],
  },
  '5678 CD 02': {
    nom: 'Kouassi Aya',
    contact: '05 98 76 54 32',
    typeVehicule: 'Semi-remorque 20T',
    historique: ['APE-2025-044'],
  },
  '9876 EF 03': {
    nom: 'Konan Koffi',
    contact: '07 89 01 23 45',
    typeVehicule: 'Camion frigorifique',
    historique: ['APE-2026-001'],
  },
  '1234 AB 04': {
    nom: 'Jean Konan',
    contact: '07 12 34 56 78',
    typeVehicule: 'Camion 10T',
    historique: ['CP-2025-001', 'CP-2025-089', 'CP-2026-012'],
  },
};

const VILLES = ['Abidjan', 'Bouaké', 'Yamoussoukro', 'Korhogo', 'San-Pédro', 'Daloa', 'Man'];

const tarifs = {
  'Igname': 2000,
  'Banane Plantain': 1500,
  'Manioc': 1000,
  'Tomate': 2500,
};

const genererCertificatId = (typeActe) => {
  const suffix = Math.random().toString(36).substring(2, 8).toUpperCase();
  return `${typeActe}-${new Date().getFullYear()}-${suffix}`;
};

const genererHashQr = (id) => {
  const base = id.split('').reduce((acc, c) => acc + c.charCodeAt(0), 0);
  return `SHA256:${(base * 7919).toString(16).padStart(8, '0')}…${id.slice(-4)}`;
};

const IMMATS_RECENTES_INIT = ['1234 AB 01', '5678 CD 02', '9876 EF 03'];

const ajouterImmatRecente = (liste, plaque) => {
  const normalisee = plaque.trim().toUpperCase();
  if (!normalisee) return liste;
  return [normalisee, ...liste.filter((p) => p !== normalisee)].slice(0, 5);
};

const EventBadge = ({ children, color = 'orange' }) => {
  const colors = {
    orange: 'bg-orange-100 border-orange-300 text-orange-800',
    green: 'bg-green-100 border-green-300 text-green-800',
    red: 'bg-red-100 border-red-300 text-red-800',
    purple: 'bg-purple-100 border-purple-300 text-purple-800',
  };
  return (
    <div className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-dashed text-xs font-bold uppercase tracking-wide ${colors[color]}`}>
      <span className="w-2 h-2 rounded-full bg-current animate-pulse"></span>
      {children}
    </div>
  );
};

const CertificatPapier = ({ typeActe, certificatId, transaction }) => (
  <div className="relative select-none">
    {/* Ombre portée au sol */}
    <div className="absolute -bottom-2 left-3 right-3 h-4 bg-black/15 blur-md rounded-full" aria-hidden />

    <div
      className="relative bg-[#faf7f2] p-4 shadow-2xl border border-stone-200/80"
      style={{
        backgroundImage: 'linear-gradient(180deg, #fdfbf7 0%, #f5f0e8 100%)',
        boxShadow: '0 8px 32px rgba(0,0,0,0.18), inset 0 1px 0 rgba(255,255,255,0.8)',
      }}
    >
      {/* Bord dentelé haut — effet déchirure thermique */}
      <div
        className="absolute -top-1 left-0 right-0 h-2 bg-repeat-x opacity-90"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='8' height='8'%3E%3Cpolygon points='0,8 4,0 8,8' fill='%23faf7f2'/%3E%3C/svg%3E")`,
          backgroundSize: '8px 8px',
        }}
        aria-hidden
      />

      <div className="text-center border-b border-dashed border-stone-300 pb-3 mb-3">
        <img src={logoOcpv} alt="OCPV" className="h-8 w-auto mx-auto mb-1" draggable={false} />
        <p className="text-[9px] text-stone-500 uppercase tracking-widest">
          {typeActe === 'CP' ? 'Certificat de Provenance' : 'Autorisation Préalable d\'Exportation'}
        </p>
      </div>

      <div className="space-y-1 text-[10px] text-stone-600 font-mono mb-3">
        <p className="flex justify-between gap-2"><span>ID unique :</span> <span className="font-bold text-stone-800">{certificatId}</span></p>
        <p className="flex justify-between gap-2"><span>Date :</span> <span>{transaction.date}</span></p>
        <p className="flex justify-between gap-2"><span>Véhicule :</span> <span>{transaction.plaque}</span></p>
        <p className="flex justify-between gap-2"><span>Itinéraire :</span> <span className="text-right">{transaction.provenance} → {transaction.destination}</span></p>
        <p className="flex justify-between gap-2"><span>Produit :</span> <span>{transaction.produit} ({transaction.tonnage} T)</span></p>
      </div>

      <div className="border-t border-b border-stone-800 py-2 my-2 text-center">
        <p className="text-[9px] uppercase font-bold text-stone-500 tracking-wide">Montant Payé</p>
        <p className="text-lg font-black text-stone-800">{transaction.montant.toLocaleString('fr-FR')} FCFA</p>
      </div>

      <div className="flex flex-col items-center py-1">
        <div className="relative">
          <QrCode size={56} className="text-stone-800" />
          <div className="absolute inset-0 flex items-center justify-center">
            <Shield size={16} className="text-orange-500 opacity-80" />
          </div>
        </div>
        <p className="text-[8px] font-mono text-stone-500 mt-1.5 bg-stone-100/80 px-2 py-0.5 rounded border border-stone-200">
          QR crypté · {genererHashQr(certificatId)}
        </p>
      </div>

      {/* Bord inférieur légèrement incurvé */}
      <div className="absolute -bottom-px left-2 right-2 h-px bg-gradient-to-r from-transparent via-stone-300 to-transparent" aria-hidden />
    </div>
  </div>
);

const TpeMockup = () => {
  const navigate = useNavigate();
  const [step, setStep] = useState(1);
  const [idView, setIdView] = useState('search');
  const [paymentView, setPaymentView] = useState('select');
  const [showCargaisonEvent, setShowCargaisonEvent] = useState(false);
  const [isOffline, setIsOffline] = useState(false);
  const [loading, setLoading] = useState(false);
  const [paymentRetry, setPaymentRetry] = useState(false);
  const [typeActe, setTypeActe] = useState('CP');
  const [certificatId, setCertificatId] = useState('');
  const [ussdCode, setUssdCode] = useState('');
  const [paiementRef, setPaiementRef] = useState('');
  const [isNewTransporteur, setIsNewTransporteur] = useState(false);
  const [historique, setHistorique] = useState([]);
  const [immatsRecentes, setImmatsRecentes] = useState(IMMATS_RECENTES_INIT);
  const [showReceiptOverlay, setShowReceiptOverlay] = useState(false);
  const [receiptOverlaySide, setReceiptOverlaySide] = useState('right');
  const [paymentQrPayload, setPaymentQrPayload] = useState('');
  const [paymentQrRef, setPaymentQrRef] = useState('');

  const [transaction, setTransaction] = useState({
    plaque: '',
    transporteurNom: '',
    contact: '',
    typeVehicule: '',
    produit: '',
    tonnage: '',
    provenance: '',
    destination: '',
    montant: 0,
    methodePaiement: '',
    date: new Date().toLocaleString('fr-FR'),
  });

  const resetForm = () => {
    setTransaction({
      plaque: '', transporteurNom: '', contact: '', typeVehicule: '',
      produit: '', tonnage: '', provenance: '', destination: '',
      montant: 0, methodePaiement: '', date: new Date().toLocaleString('fr-FR'),
    });
    setStep(1);
    setIdView('search');
    setPaymentView('select');
    setShowCargaisonEvent(false);
    setPaymentRetry(false);
    setTypeActe('CP');
    setCertificatId('');
    setUssdCode('');
    setPaiementRef('');
    setIsNewTransporteur(false);
    setHistorique([]);
    setShowReceiptOverlay(false);
    setPaymentQrPayload('');
    setPaymentQrRef('');
  };

  const triggerReceiptOverlay = useCallback(() => {
    setReceiptOverlaySide((prev) => (prev === 'right' ? 'left' : 'right'));
    setShowReceiptOverlay(false);
    requestAnimationFrame(() => {
      requestAnimationFrame(() => setShowReceiptOverlay(true));
    });
  }, []);

  useEffect(() => {
    if (!showReceiptOverlay) return undefined;
    const timer = setTimeout(() => setShowReceiptOverlay(false), 3000);
    return () => clearTimeout(timer);
  }, [showReceiptOverlay, certificatId]);

  const selectImmatRecente = (plaque) => {
    setTransaction((t) => ({ ...t, plaque }));
  };

  const handleSearch = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      const plaque = transaction.plaque.trim().toUpperCase();
      setImmatsRecentes((prev) => ajouterImmatRecente(prev, plaque));
      const connu = TRANSPORTEURS_CONNUS[plaque];
      if (connu) {
        setTransaction((t) => ({
          ...t,
          plaque,
          transporteurNom: connu.nom,
          contact: connu.contact,
          typeVehicule: connu.typeVehicule,
        }));
        setHistorique(connu.historique);
        setIsNewTransporteur(false);
        setStep(2);
      } else {
        setTransaction((t) => ({ ...t, plaque }));
        setIdView('register');
      }
    }, 800);
  };

  const handleRegister = (e) => {
    e.preventDefault();
    setIsNewTransporteur(true);
    setHistorique([]);
    setImmatsRecentes((prev) => ajouterImmatRecente(prev, transaction.plaque));
    setIdView('search');
    setStep(2);
  };

  const handleCargaison = (e) => {
    e.preventDefault();
    const calculMontant = tarifs[transaction.produit] * Number(transaction.tonnage);
    setTransaction((t) => ({ ...t, montant: calculMontant }));
    setShowCargaisonEvent(true);
  };

  const finalizeCertificate = (methode, ref) => {
    const id = genererCertificatId(typeActe);
    setCertificatId(id);
    setPaiementRef(ref);
    setTransaction((t) => ({ ...t, methodePaiement: methode, date: new Date().toLocaleString('fr-FR') }));
    setStep(4);
    setPaymentView('select');
    triggerReceiptOverlay();
  };

  const handlePrintCertificate = () => {
    if (!certificatId) return;
    triggerReceiptOverlay();
  };

  const handleSelectPayment = (methode) => {
    if (isOffline) {
      const code = `*155*${transaction.montant}*${Math.floor(1000 + Math.random() * 9000)}#`;
      setUssdCode(code);
      setTransaction((t) => ({ ...t, methodePaiement: methode }));
      setPaymentView('offlineUssd');
      return;
    }

    const { ref, payload } = genererQrPaiement(
      methode,
      transaction.montant,
      typeActe,
      transaction.plaque,
    );
    setTransaction((t) => ({ ...t, methodePaiement: methode }));
    setPaymentQrPayload(payload);
    setPaymentQrRef(ref);
    setPaymentView('qrScan');
  };

  const processPayment = (methode) => {
    setLoading(true);
    setPaymentView('loading');

    setTimeout(() => {
      setLoading(false);
      if (methode === 'MTN MoMo' && !paymentRetry) {
        setPaymentView('failed');
        return;
      }
      finalizeCertificate(methode, paymentQrRef || `REF${Math.floor(100000 + Math.random() * 900000)}`);
    }, 1500);
  };

  const handleConfirmPaymentScan = () => {
    processPayment(transaction.methodePaiement);
  };

  const handlePaiement = (methode) => {
    handleSelectPayment(methode);
  };

  const handleUssdConfirm = () => {
    const ref = `USSD-LOCAL-${Math.floor(10000 + Math.random() * 90000)}`;
    finalizeCertificate(transaction.methodePaiement, ref);
  };

  const handleBack = () => {
    if (showCargaisonEvent) {
      setShowCargaisonEvent(false);
      return;
    }
    if (paymentView === 'failed' || paymentView === 'offlineUssd' || paymentView === 'qrScan') {
      setPaymentView('select');
      return;
    }
    if (step === 2) {
      setStep(1);
      setIdView('search');
      return;
    }
    if (step === 3) setStep(2);
  };

  const TpeHeader = () => (
    <div className="bg-gray-900 text-white p-1.5 sm:p-2 flex justify-between items-center text-[10px] sm:text-xs gap-1">
      <div className="flex items-center space-x-1.5 sm:space-x-2 min-w-0">
        <span className="bg-white rounded px-1 py-0.5 shrink-0 inline-flex items-center">
          <img src={logoOcpv} alt="" className="h-3.5 sm:h-4 w-auto" draggable={false} aria-hidden />
        </span>
        <span className="font-bold truncate">OCPV OS</span>
        <span className="hidden sm:inline bg-green-600 px-1.5 sm:px-2 py-0.5 rounded-full text-[9px] sm:text-[10px] shrink-0">Agent: K. Marc</span>
      </div>
      <div className="flex items-center space-x-1.5 sm:space-x-3 shrink-0">
        <span onClick={() => setIsOffline(!isOffline)} className="cursor-pointer flex items-center">
          {isOffline ? <SignalZero size={12} className="text-red-400 mr-0.5 sm:mr-1 sm:hidden" /> : <Signal size={12} className="text-green-400 mr-0.5 sm:mr-1 sm:hidden" />}
          {isOffline ? <SignalZero size={14} className="text-red-400 mr-1 hidden sm:block" /> : <Signal size={14} className="text-green-400 mr-1 hidden sm:block" />}
          <span className="text-[9px] sm:text-xs">{isOffline ? 'OFF' : '4G'}</span>
        </span>
        <BatteryMedium size={12} className="sm:hidden" />
        <BatteryMedium size={14} className="hidden sm:block" />
        <span className="tabular-nums">{new Date().toLocaleTimeString('fr-FR', { hour: '2-digit', minute: '2-digit' })}</span>
      </div>
    </div>
  );

  const showBackButton = (step > 1 && step < 4) || showCargaisonEvent || paymentView === 'failed' || paymentView === 'offlineUssd' || paymentView === 'qrScan';

  const selectedPaymentMethod = PAYMENT_METHODS.find((m) => m.id === transaction.methodePaiement);

  return (
    <div className="h-[100dvh] sm:min-h-screen bg-gray-200 px-2 py-2 sm:p-4 font-sans flex flex-col overflow-hidden sm:overflow-visible">
      <button
        onClick={() => navigate('/')}
        className="shrink-0 mb-1 sm:mb-4 flex items-center gap-1.5 sm:gap-2 text-gray-700 hover:text-orange-600 font-semibold transition-colors text-sm sm:text-base"
      >
        <ArrowLeft size={18} />
        <span className="truncate">Retour à la cartographie</span>
      </button>

      <div className="flex-1 flex items-stretch sm:items-center justify-center min-h-0 w-full overflow-hidden sm:overflow-visible sm:px-8">
        <div className="relative w-full max-w-sm h-full sm:h-auto overflow-visible mx-auto">
          {/* Reçu papier — animation overlay latérale (3 s) */}
          {showReceiptOverlay && certificatId && (
            <div
              key={certificatId}
              className={`absolute z-30 w-52 sm:w-60 pointer-events-none ${
                receiptOverlaySide === 'right' ? 'animate-receipt-print' : 'animate-receipt-print-left'
              } ${
                receiptOverlaySide === 'right'
                  ? 'top-28 left-[calc(100%+0.75rem)] sm:left-[calc(100%+1.25rem)]'
                  : 'top-28 right-[calc(100%+0.75rem)] sm:right-[calc(100%+1.25rem)]'
              } max-sm:left-1/2 max-sm:-translate-x-1/2 max-sm:right-auto max-sm:top-14`}
              aria-live="polite"
              aria-label={`${typeActe} généré — impression en cours`}
            >
              <CertificatPapier
                typeActe={typeActe}
                certificatId={certificatId}
                transaction={transaction}
              />
            </div>
          )}

          <div className="relative bg-gray-800 p-2 sm:p-3 rounded-[1.5rem] sm:rounded-[2rem] shadow-2xl border-gray-700 border-2 sm:border-4 w-full h-full sm:h-[800px] flex flex-col overflow-hidden min-h-0">
          <div className="bg-gray-50 flex-1 rounded-lg sm:rounded-xl overflow-hidden flex flex-col relative min-h-0">
            <TpeHeader />

            <div className="bg-orange-500 text-white p-3 sm:p-4 shadow-md z-10 flex items-center justify-center relative gap-1.5 sm:gap-2">
              {showBackButton && (
                <button onClick={handleBack} className="absolute left-2 sm:left-4 p-1">
                  <ArrowLeft size={18} className="sm:hidden" />
                  <ArrowLeft size={20} className="hidden sm:block" />
                </button>
              )}
              <span className="bg-white rounded-md px-1 sm:px-1.5 py-0.5 shrink-0 inline-flex items-center shadow-sm">
                <img src={logoOcpv} alt="" className="h-4 sm:h-5 w-auto" draggable={false} aria-hidden />
              </span>
              <h1 className="text-sm sm:text-lg font-bold truncate px-8 sm:px-0">TPE Corridor OCPV</h1>
            </div>

            <div className="flex-1 overflow-y-auto overscroll-contain p-3 sm:p-4 min-h-0">
              {/* PHASE 1 — Identification */}
              {step === 1 && idView === 'search' && (
                <div className="space-y-4 sm:space-y-6">
                  <div className="text-center mb-4 sm:mb-6">
                    <div className="bg-orange-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-orange-600">
                      <Truck size={28} className="sm:hidden" />
                      <Truck size={32} className="hidden sm:block" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Identification</h2>
                    <p className="text-sm text-gray-500">Saisissez la plaque du camion</p>
                  </div>

                  <form onSubmit={handleSearch} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Immatriculation</label>
                      <div className="relative">
                        <input
                          type="text"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg text-lg uppercase font-bold focus:border-orange-500 focus:ring-0 outline-none"
                          placeholder="Ex: 1234 AB 01"
                          value={transaction.plaque}
                          onChange={(e) => setTransaction({ ...transaction, plaque: e.target.value.toUpperCase() })}
                        />
                        <Search className="absolute left-3 top-3.5 text-gray-400" size={20} />
                      </div>
                      <p className="text-[10px] text-gray-400 mt-1">Saisie manuelle ou sélection rapide ci-dessous</p>
                    </div>

                    {immatsRecentes.length > 0 && (
                      <div>
                        <p className="flex items-center gap-1.5 text-xs font-semibold text-gray-500 uppercase mb-2">
                          <Clock size={14} />
                          Transporteurs récents
                        </p>
                        <div className="flex flex-wrap gap-2">
                          {immatsRecentes.map((plaque) => {
                            const connu = TRANSPORTEURS_CONNUS[plaque];
                            const selected = transaction.plaque === plaque;
                            return (
                              <button
                                key={plaque}
                                type="button"
                                onClick={() => selectImmatRecente(plaque)}
                                className={`flex items-center gap-2 px-3 py-2 rounded-lg border-2 text-left transition-all active:scale-95 ${
                                  selected
                                    ? 'border-orange-500 bg-orange-50 text-orange-800'
                                    : 'border-gray-200 bg-white text-gray-700 hover:border-orange-300'
                                }`}
                              >
                                <Truck size={14} className={selected ? 'text-orange-500' : 'text-gray-400'} />
                                <span>
                                  <span className="block font-mono font-bold text-sm">{plaque}</span>
                                  {connu && (
                                    <span className="block text-[10px] text-gray-500 font-normal">{connu.nom}</span>
                                  )}
                                </span>
                              </button>
                            );
                          })}
                        </div>
                      </div>
                    )}

                    <button
                      type="submit"
                      disabled={loading || !transaction.plaque}
                      className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg flex items-center justify-center active:scale-95 disabled:opacity-50 text-sm sm:text-base"
                    >
                      {loading ? <span className="animate-pulse">Recherche...</span> : 'Rechercher Transporteur'}
                    </button>
                  </form>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start space-x-2">
                    <MapPin size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-800">
                      Poste actif: <strong>Corridor PK30 - Autoroute Nord</strong>. Rattaché à l&apos;Antenne d&apos;Abidjan.
                    </p>
                  </div>
                </div>
              )}

              {step === 1 && idView === 'register' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="text-center mb-3 sm:mb-4">
                    <div className="bg-yellow-100 w-14 h-14 sm:w-16 sm:h-16 rounded-full flex items-center justify-center mx-auto mb-2 text-yellow-600">
                      <UserPlus size={28} className="sm:hidden" />
                      <UserPlus size={32} className="hidden sm:block" />
                    </div>
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Nouveau transporteur</h2>
                    <p className="text-sm text-gray-500">Plaque <span className="font-mono font-bold">{transaction.plaque}</span> introuvable</p>
                  </div>

                  <EventBadge color="purple">Règle : création obligatoire</EventBadge>

                  <form onSubmit={handleRegister} className="space-y-4">
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Nom complet</label>
                      <input
                        type="text"
                        required
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                        placeholder="Ex: Koné Ibrahim"
                        value={transaction.transporteurNom}
                        onChange={(e) => setTransaction({ ...transaction, transporteurNom: e.target.value })}
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Contact (téléphone)</label>
                      <div className="relative">
                        <input
                          type="tel"
                          required
                          className="w-full pl-10 pr-4 py-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                          placeholder="07 XX XX XX XX"
                          value={transaction.contact}
                          onChange={(e) => setTransaction({ ...transaction, contact: e.target.value })}
                        />
                        <Phone className="absolute left-3 top-3.5 text-gray-400" size={18} />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1 uppercase">Type de véhicule</label>
                      <select
                        required
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                        value={transaction.typeVehicule}
                        onChange={(e) => setTransaction({ ...transaction, typeVehicule: e.target.value })}
                      >
                        <option value="">Sélectionner...</option>
                        <option value="Pick-up">Pick-up</option>
                        <option value="Camion 10T">Camion 10T</option>
                        <option value="Semi-remorque 20T">Semi-remorque 20T</option>
                        <option value="Camion frigorifique">Camion frigorifique</option>
                      </select>
                    </div>

                    <button type="submit" className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg active:scale-95">
                      EnregistrerNouveauTransporteur
                    </button>
                  </form>
                </div>
              )}

              {/* PHASE 2 — Déclaration cargaison */}
              {step === 2 && !showCargaisonEvent && (
                <div className="space-y-4 sm:space-y-5">
                  {isNewTransporteur ? (
                    <EventBadge color="orange">NouveauTransporteurCréé</EventBadge>
                  ) : (
                    <EventBadge color="orange">TransporteurIdentifié</EventBadge>
                  )}

                  <div className="bg-white p-3 rounded-lg border border-gray-200 shadow-sm flex items-center space-x-3">
                    <div className="bg-gray-100 p-2 rounded-full"><Truck className="text-gray-600" size={20} /></div>
                    <div>
                      <p className="text-xs text-gray-500">Fiche transporteur</p>
                      <p className="font-bold text-gray-800">
                        {transaction.transporteurNom}{' '}
                        <span className="text-xs font-normal bg-green-100 text-green-700 px-1.5 py-0.5 rounded">En règle</span>
                      </p>
                      <p className="text-xs font-mono text-gray-500">{transaction.plaque} · {transaction.typeVehicule}</p>
                    </div>
                  </div>

                  {historique.length > 0 && (
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-3">
                      <p className="text-xs font-bold text-gray-500 uppercase mb-2">Historique CP/APE</p>
                      <div className="flex flex-wrap gap-1">
                        {historique.map((h) => (
                          <span key={h} className="text-[10px] font-mono bg-white border border-gray-200 px-2 py-0.5 rounded">{h}</span>
                        ))}
                      </div>
                    </div>
                  )}

                  <form onSubmit={handleCargaison} className="space-y-4">
                    <h2 className="text-lg font-bold text-gray-800">DéclarerCargaison</h2>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">PRODUIT VIVRIER</label>
                      <select
                        required
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg focus:border-orange-500 outline-none"
                        value={transaction.produit}
                        onChange={(e) => setTransaction({ ...transaction, produit: e.target.value })}
                      >
                        <option value="">Sélectionner un produit...</option>
                        {Object.keys(tarifs).map((prod) => (
                          <option key={prod} value={prod}>{prod}</option>
                        ))}
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-gray-600 mb-1">TONNAGE ESTIMÉ (Tonnes)</label>
                      <input
                        type="number"
                        min="1"
                        required
                        className="w-full p-3 bg-white border-2 border-gray-200 rounded-lg text-xl font-bold focus:border-orange-500 outline-none"
                        value={transaction.tonnage}
                        onChange={(e) => setTransaction({ ...transaction, tonnage: e.target.value })}
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">PROVENANCE</label>
                        <select
                          required
                          className="w-full p-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none"
                          value={transaction.provenance}
                          onChange={(e) => setTransaction({ ...transaction, provenance: e.target.value })}
                        >
                          <option value="">Ville...</option>
                          {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                      <div>
                        <label className="block text-xs font-semibold text-gray-600 mb-1">DESTINATION</label>
                        <select
                          required
                          className="w-full p-2.5 bg-white border-2 border-gray-200 rounded-lg text-sm focus:border-orange-500 outline-none"
                          value={transaction.destination}
                          onChange={(e) => setTransaction({ ...transaction, destination: e.target.value })}
                        >
                          <option value="">Ville...</option>
                          {VILLES.map((v) => <option key={v} value={v}>{v}</option>)}
                        </select>
                      </div>
                    </div>

                    <button
                      type="submit"
                      disabled={!transaction.produit || !transaction.tonnage || !transaction.provenance || !transaction.destination}
                      className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg active:scale-95 disabled:opacity-50"
                    >
                      Calculer la redevance
                    </button>
                  </form>
                </div>
              )}

              {step === 2 && showCargaisonEvent && (
                <div className="space-y-4 sm:space-y-5">
                  <EventBadge color="orange">CargaisonDéclarée</EventBadge>

                  <div className="bg-white border-2 border-orange-200 rounded-xl p-4 shadow-sm space-y-3">
                    <h3 className="font-bold text-gray-800 text-center">Récapitulatif de la déclaration</h3>
                    <div className="space-y-2 text-sm">
                      <p className="flex justify-between"><span className="text-gray-500">Produit</span><span className="font-bold">{transaction.produit}</span></p>
                      <p className="flex justify-between"><span className="text-gray-500">Tonnage</span><span className="font-bold">{transaction.tonnage} T</span></p>
                      <p className="flex justify-between"><span className="text-gray-500">Itinéraire</span><span className="font-bold">{transaction.provenance} → {transaction.destination}</span></p>
                      <div className="border-t border-dashed border-gray-200 pt-2 flex justify-between items-end">
                        <span className="text-gray-500">Redevance calculée</span>
                        <span className="text-2xl font-black text-orange-600">{transaction.montant.toLocaleString('fr-FR')} F</span>
                      </div>
                    </div>
                  </div>

                  <button
                    onClick={() => { setShowCargaisonEvent(false); setStep(3); }}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg active:scale-95"
                  >
                    Procéder au paiement
                  </button>
                </div>
              )}

              {/* PHASE 3 — Paiement */}
              {step === 3 && paymentView === 'select' && (
                <div className="space-y-4 sm:space-y-5">
                  <div className="text-center mb-1 sm:mb-2">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">InitierPaiementÉlectronique</h2>
                    <p className="text-sm text-gray-500">Sélectionnez le type d&apos;acte et le mode de paiement</p>
                  </div>

                  <div className="grid grid-cols-2 gap-2">
                    <button
                      type="button"
                      onClick={() => setTypeActe('CP')}
                      className={`p-2.5 sm:p-3 rounded-lg border-2 font-bold text-xs sm:text-sm transition-all ${typeActe === 'CP' ? 'border-orange-500 bg-orange-50 text-orange-700' : 'border-gray-200 bg-white text-gray-600'}`}
                    >
                      <Shield size={18} className="mx-auto mb-1" />
                      CP — Certificat de Provenance
                    </button>
                    <button
                      type="button"
                      onClick={() => setTypeActe('APE')}
                      className={`p-2.5 sm:p-3 rounded-lg border-2 font-bold text-xs sm:text-sm transition-all ${typeActe === 'APE' ? 'border-blue-500 bg-blue-50 text-blue-700' : 'border-gray-200 bg-white text-gray-600'}`}
                    >
                      <Globe size={18} className="mx-auto mb-1" />
                      APE — Exportation
                    </button>
                  </div>

                  <div className="bg-yellow-50 border border-yellow-200 p-4 rounded-lg border-dashed">
                    <div className="flex justify-between items-center border-b border-yellow-200 pb-2 mb-2">
                      <span className="text-sm text-gray-600">{transaction.produit} ({transaction.tonnage} T)</span>
                      <span className="font-mono text-sm">{tarifs[transaction.produit]} F/T</span>
                    </div>
                    <p className="text-xs text-gray-500 mb-1">{transaction.provenance} → {transaction.destination}</p>
                    <div className="flex justify-between items-end mt-2">
                      <span className="font-bold text-gray-700 uppercase text-sm">Total à payer</span>
                      <span className="text-2xl sm:text-3xl font-black text-orange-600">{transaction.montant.toLocaleString('fr-FR')} F</span>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3">
                    {PAYMENT_METHODS.map((methode) => (
                      <button
                        key={methode.id}
                        onClick={() => handlePaiement(methode.id)}
                        className="bg-white border-2 border-gray-200 hover:border-orange-500 p-3 sm:p-4 rounded-xl flex flex-col items-center active:scale-95 transition-colors"
                      >
                        <div className="w-12 h-12 rounded-lg mb-2 flex items-center justify-center overflow-hidden bg-gray-50 p-1">
                          <img
                            src={methode.logo}
                            alt={methode.label}
                            className="w-full h-full object-contain"
                            draggable={false}
                          />
                        </div>
                        <span className="text-xs font-bold text-gray-800 text-center leading-tight">{methode.label}</span>
                      </button>
                    ))}
                  </div>

                  {isOffline && (
                    <div className="bg-amber-50 border border-amber-300 p-3 rounded-lg text-xs">
                      <p className="font-bold text-amber-800 mb-1 flex items-center gap-1">
                        <SignalZero size={14} /> Mode Offline — Procédure USSD
                      </p>
                      <p className="text-amber-700">Le paiement générera un reçu local sécurisé avec code USSD de confirmation.</p>
                    </div>
                  )}

                  {!isOffline && (
                    <p className="text-[10px] text-gray-400 text-center">Démo : MTN MoMo échoue au 1er essai (solde insuffisant)</p>
                  )}
                </div>
              )}

              {step === 3 && paymentView === 'qrScan' && (
                <div className="space-y-4 sm:space-y-5">
                  <EventBadge color="orange">EnAttenteDePaiement</EventBadge>

                  <div className="text-center">
                    <h2 className="text-lg sm:text-xl font-bold text-gray-800">Scanner pour payer</h2>
                    <p className="text-sm text-gray-500 mt-1">
                      Le transporteur scanne ce QR avec son application Mobile Money
                    </p>
                  </div>

                  {selectedPaymentMethod && (
                    <div className="flex items-center justify-center gap-3 bg-white border border-gray-200 rounded-xl p-3 shadow-sm">
                      <div className="w-10 h-10 rounded-lg overflow-hidden bg-gray-50 p-1 flex-shrink-0">
                        <img
                          src={selectedPaymentMethod.logo}
                          alt={selectedPaymentMethod.label}
                          className="w-full h-full object-contain"
                          draggable={false}
                        />
                      </div>
                      <div className="text-left">
                        <p className="text-xs text-gray-500 uppercase font-semibold">Opérateur sélectionné</p>
                        <p className="font-bold text-gray-800">{selectedPaymentMethod.label}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-white border-2 border-dashed border-orange-300 rounded-2xl p-4 sm:p-5 shadow-inner flex flex-col items-center">
                    <div className="bg-white p-2 sm:p-3 rounded-xl border border-gray-200 shadow-md mb-3 relative scale-90 sm:scale-100 origin-center">
                      <QrCodeMock value={paymentQrPayload} cellSize={7} />
                      <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                        <div className="w-10 h-10 bg-white rounded-md border border-gray-200 flex items-center justify-center shadow-sm">
                          {selectedPaymentMethod ? (
                            <img
                              src={selectedPaymentMethod.logo}
                              alt=""
                              className="w-7 h-7 object-contain"
                              draggable={false}
                            />
                          ) : (
                            <QrCode size={20} className="text-orange-500" />
                          )}
                        </div>
                      </div>
                    </div>

                    <p className="text-2xl sm:text-3xl font-black text-orange-600">
                      {transaction.montant.toLocaleString('fr-FR')} FCFA
                    </p>
                    <p className="text-xs text-gray-500 mt-1 font-mono">{paymentQrRef}</p>
                    <p className="text-[10px] text-gray-400 mt-2 text-center">
                      {typeActe} · {transaction.plaque} · {transaction.transporteurNom || 'Transporteur'}
                    </p>
                  </div>

                  <div className="bg-blue-50 border border-blue-100 p-3 rounded-lg flex items-start gap-2">
                    <Smartphone size={18} className="text-blue-500 mt-0.5 flex-shrink-0" />
                    <p className="text-xs text-blue-800">
                      Demandez au transporteur d&apos;ouvrir <strong>{transaction.methodePaiement}</strong> et de scanner le QR affiché sur le TPE pour confirmer le paiement de la redevance.
                    </p>
                  </div>

                  <button
                    onClick={handleConfirmPaymentScan}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg flex items-center justify-center gap-2 active:scale-95 text-sm sm:text-base"
                  >
                    <CheckCircle size={20} />
                    Valider — Paiement scanné par le transporteur
                  </button>

                  <p className="text-[10px] text-gray-400 text-center">
                    Simulation : ce bouton remplace le scan réel du transporteur
                  </p>
                </div>
              )}

              {step === 3 && paymentView === 'loading' && (
                <div className="flex flex-col items-center justify-center py-16 space-y-3">
                  <div className="w-12 h-12 border-4 border-orange-500 border-t-transparent rounded-full animate-spin"></div>
                  <p className="text-sm font-bold text-gray-600 animate-pulse">Communication avec l&apos;opérateur financier...</p>
                  <p className="text-xs text-gray-400">API Agrégateur de paiement</p>
                </div>
              )}

              {step === 3 && paymentView === 'failed' && (
                <div className="space-y-4 sm:space-y-5">
                  <EventBadge color="red">PaiementÉchoué</EventBadge>

                  <div className="bg-red-50 border-2 border-red-200 rounded-xl p-6 text-center">
                    <AlertCircle size={48} className="text-red-500 mx-auto mb-3" />
                    <h3 className="font-bold text-red-800 text-lg">Solde insuffisant</h3>
                    <p className="text-sm text-red-600 mt-2">L&apos;opérateur MTN MoMo a refusé la transaction. Vérifiez le solde du transporteur ou choisissez un autre mode.</p>
                  </div>

                  <button
                    onClick={() => { setPaymentRetry(true); setPaymentView('select'); }}
                    className="w-full bg-orange-500 hover:bg-orange-600 text-white font-bold py-3 sm:py-4 rounded-lg flex items-center justify-center gap-2 active:scale-95"
                  >
                    <RefreshCw size={18} />
                    Réessayer avec un autre opérateur
                  </button>
                </div>
              )}

              {step === 3 && paymentView === 'offlineUssd' && (
                <div className="space-y-4 sm:space-y-5">
                  <EventBadge color="purple">Règle de résilience — Mode Offline</EventBadge>

                  <div className="bg-slate-800 text-white rounded-xl p-5 space-y-4">
                    <div className="text-center">
                      <SignalZero size={32} className="text-red-400 mx-auto mb-2" />
                      <h3 className="font-bold text-lg">Paiement USSD en attente</h3>
                      <p className="text-xs text-slate-400 mt-1">Transaction mise en file de synchronisation</p>
                    </div>

                    <div className="bg-slate-900 rounded-lg p-4 text-center border border-slate-700">
                      <p className="text-xs text-slate-400 uppercase mb-2">Code USSD à composer</p>
                      <p className="text-2xl font-mono font-black text-green-400 tracking-wider">{ussdCode}</p>
                      <p className="text-[10px] text-slate-500 mt-2">Montant : {transaction.montant.toLocaleString('fr-FR')} FCFA via {transaction.methodePaiement}</p>
                    </div>

                    <div className="bg-yellow-900/30 border border-yellow-700/50 rounded-lg p-3 text-xs text-yellow-200">
                      <p className="font-bold mb-1">Reçu local sécurisé généré</p>
                      <p>Le certificat sera délivré après confirmation USSD. Synchronisation automatique dès rétablissement du réseau (RéseauRétabli).</p>
                    </div>
                  </div>

                  <button
                    onClick={handleUssdConfirm}
                    className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 sm:py-4 rounded-lg shadow-lg active:scale-95"
                  >
                    Paiement USSD confirmé par le transporteur
                  </button>
                </div>
              )}

              {/* PHASE 4 — Certificat */}
              {step === 4 && (
                <div className="space-y-4 sm:space-y-5">
                  <EventBadge color="green">PaiementValidé</EventBadge>

                  <div className="bg-green-100 rounded-xl p-4 sm:p-5 text-center shadow-inner border border-green-200">
                    <CheckCircle size={48} className="text-green-500 mx-auto mb-2 sm:hidden" />
                    <CheckCircle size={56} className="text-green-500 mx-auto mb-2 hidden sm:block" />
                    <h2 className="text-lg sm:text-xl font-black text-green-700">Paiement Validé</h2>
                    <p className="text-green-800 font-mono text-xs mt-1">{transaction.methodePaiement} — {paiementRef}</p>
                    {isOffline && (
                      <span className="inline-block mt-2 text-[10px] bg-amber-200 text-amber-800 px-2 py-0.5 rounded-full font-bold">Sync en attente</span>
                    )}
                  </div>

                  <EventBadge color="orange">CertificatGénéré</EventBadge>

                  <div className="bg-white p-4 shadow-md mx-1 relative before:content-[''] before:absolute before:top-[-4px] before:left-0 before:right-0 before:h-[8px] before:bg-repeat-x before:bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI4IiBoZWlnaHQ9IjgiPjxwb2x5Z29uIHBvaW50cz0iMCwwIDQsOCA4LDAiIGZpbGw9IiNmOWZhZmIiLz48L3N2Zz4=')]">
                    <div className="text-center border-b border-dashed border-gray-300 pb-3 mb-3">
                      <img src={logoOcpv} alt="OCPV" className="h-8 w-auto mx-auto mb-1" draggable={false} />
                      <p className="text-[10px] text-gray-500 uppercase">
                        {typeActe === 'CP' ? 'Certificat de Provenance' : 'Autorisation Préalable d\'Exportation'}
                      </p>
                    </div>

                    <div className="space-y-1 text-xs text-gray-600 font-mono mb-3">
                      <p className="flex justify-between"><span>ID unique :</span> <span className="font-bold text-gray-800">{certificatId}</span></p>
                      <p className="flex justify-between"><span>Date :</span> <span>{transaction.date}</span></p>
                      <p className="flex justify-between"><span>Véhicule :</span> <span>{transaction.plaque}</span></p>
                      <p className="flex justify-between"><span>Itinéraire :</span> <span>{transaction.provenance} → {transaction.destination}</span></p>
                      <p className="flex justify-between"><span>Produit :</span> <span>{transaction.produit} ({transaction.tonnage} T)</span></p>
                    </div>

                    <div className="border-t border-b border-gray-800 py-2 my-2 text-center">
                      <p className="text-[10px] uppercase font-bold text-gray-500">Montant Payé</p>
                      <p className="text-xl font-black text-gray-800">{transaction.montant.toLocaleString('fr-FR')} FCFA</p>
                    </div>

                    <div className="flex flex-col items-center py-2">
                      <div className="relative">
                        <QrCode size={72} className="text-gray-800" />
                        <div className="absolute inset-0 flex items-center justify-center">
                          <Shield size={20} className="text-orange-500 opacity-80" />
                        </div>
                      </div>
                      <p className="text-[9px] font-mono text-gray-500 mt-2 bg-gray-100 px-2 py-1 rounded">
                        QR crypté · {genererHashQr(certificatId)}
                      </p>
                    </div>
                  </div>

                  <div className="flex space-x-3">
                    <button
                      onClick={handlePrintCertificate}
                      className="flex-1 bg-gray-800 hover:bg-gray-900 text-white font-bold py-3 rounded-lg shadow flex items-center justify-center active:scale-95"
                    >
                      <Printer size={18} className="mr-2" />
                      ImprimerCertificat
                    </button>
                    <button onClick={resetForm} className="flex-1 bg-gray-200 hover:bg-gray-300 text-gray-800 font-bold py-3 rounded-lg active:scale-95">
                      Nouveau
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="bg-gray-200 h-8 sm:h-10 border-t border-gray-300 flex items-center justify-center shrink-0">
              <div className="w-16 h-1.5 bg-gray-400 rounded-full cursor-pointer" onClick={resetForm}></div>
            </div>
          </div>

          <div className="absolute top-0 left-1/2 transform -translate-x-1/2 w-48 h-2 bg-gray-900 rounded-b-md flex items-center justify-center overflow-hidden">
            {step === 4 && <div className="w-40 h-full bg-white opacity-50 animate-pulse"></div>}
          </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TpeMockup;

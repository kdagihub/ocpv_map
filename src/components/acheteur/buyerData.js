import imgIgname from '../../assets/igname.png';
import imgBanane from '../../assets/banane.png';
import imgManioc from '../../assets/manioc.png';
import imgRiz from '../../assets/riz.png';
import imgTomates from '../../assets/tomates.png';
import imgMais from '../../assets/maïs.png';

export const PRODUCT_IMAGES = {
  Igname: imgIgname,
  'Banane plantain': imgBanane,
  Manioc: imgManioc,
  'Riz paddy': imgRiz,
  Tomates: imgTomates,
  Maïs: imgMais,
};

export const REGIONS = ['Gbêkê', 'Lagunes', 'Vallée du Bandama', 'Lacs'];

export const HUBS_BY_REGION = {
  Gbêkê: ['Bouaké Centre', 'Dimbokro'],
  Lagunes: ['Abidjan Port-Bouët', 'Abidjan Treichville'],
  'Vallée du Bandama': ['Yamoussoukro Nord'],
  Lacs: ['Yamoussoukro Nord'],
};

export const VILLES_BY_HUB = {
  'Bouaké Centre': ['Bouaké', "N'Gattakro", 'Brobo'],
  Dimbokro: ['Dimbokro'],
  'Abidjan Port-Bouët': ['Port-Bouët', 'Marcory'],
  'Abidjan Treichville': ['Treichville', 'Adjamé'],
  'Yamoussoukro Nord': ['Yamoussoukro', 'Tiébissou'],
};

export const CATALOGUE_LOTS = [
  {
    id: 'lot-501',
    ref: 'OCPV-BKE-2026-00501',
    produit: 'Igname',
    qte: '2 t',
    qteNum: 2,
    prixUnit: 320000,
    hub: 'Bouaké Centre',
    region: 'Gbêkê',
    ville: 'Bouaké',
    producteur: 'Kouassi Yao',
    mmNumber: '07 45 12 89 34',
    mmOperator: 'Wave',
    expiration: '25/06/2026',
    status: 'available',
  },
  {
    id: 'lot-502',
    ref: 'OCPV-BKE-2026-00508',
    produit: 'Manioc',
    qte: '5 t',
    qteNum: 5,
    prixUnit: 185000,
    hub: 'Bouaké Centre',
    region: 'Gbêkê',
    ville: 'Bouaké',
    producteur: 'Traoré Aminata',
    mmNumber: '05 44 22 11 08',
    mmOperator: 'Orange Money',
    expiration: '22/06/2026',
    status: 'declared',
  },
  {
    id: 'lot-503',
    ref: 'OCPV-ABJ-2026-00112',
    produit: 'Tomates',
    qte: '1,2 t',
    qteNum: 1.2,
    prixUnit: 450000,
    hub: 'Abidjan Treichville',
    region: 'Lagunes',
    ville: 'Treichville',
    producteur: 'Diabaté Issouf',
    mmNumber: '07 88 33 44 55',
    mmOperator: 'MTN Money',
    expiration: '20/06/2026',
    status: 'available',
  },
  {
    id: 'lot-504',
    ref: 'OCPV-YAM-2026-00089',
    produit: 'Maïs',
    qte: '4 t',
    qteNum: 4,
    prixUnit: 210000,
    hub: 'Yamoussoukro Nord',
    region: 'Lacs',
    ville: 'Yamoussoukro',
    producteur: 'Koné Moussa',
    mmNumber: '01 02 03 04 05',
    mmOperator: 'Wave',
    expiration: '28/06/2026',
    status: 'declared',
  },
  {
    id: 'lot-505',
    ref: 'OCPV-BKE-2026-00515',
    produit: 'Banane plantain',
    qte: '1,5 t',
    qteNum: 1.5,
    prixUnit: 275000,
    hub: 'Bouaké Centre',
    region: 'Gbêkê',
    ville: "N'Gattakro",
    producteur: 'Kouassi Yao',
    mmNumber: '07 45 12 89 34',
    mmOperator: 'Wave',
    expiration: '24/06/2026',
    status: 'available',
  },
  {
    id: 'lot-506',
    ref: 'OCPV-ABJ-2026-00120',
    produit: 'Riz paddy',
    qte: '3 t',
    qteNum: 3,
    prixUnit: 390000,
    hub: 'Abidjan Port-Bouët',
    region: 'Lagunes',
    ville: 'Port-Bouët',
    producteur: 'Coulibaly Fatou',
    mmNumber: '07 11 22 33 44',
    mmOperator: 'Wave',
    expiration: '30/06/2026',
    status: 'available',
  },
];

export const TRANSPORTEURS = [
  {
    id: 'tr-1',
    nom: 'Transport Koné Express',
    contact: '07 55 66 77 88',
    zones: 'Bouaké · Yamoussoukro',
    vehicules: '2 camions 10 t',
    dispo: 'Disponible',
  },
  {
    id: 'tr-2',
    nom: 'Fret Lagunes SARL',
    contact: '05 12 34 56 78',
    zones: 'Abidjan · Bouaké',
    vehicules: '1 semi-remorque 25 t',
    dispo: 'Sur réservation',
  },
  {
    id: 'tr-3',
    nom: 'Camion Vert CI',
    contact: '07 99 88 77 66',
    zones: 'Gbêkê · Korhogo',
    vehicules: '3 camions 5–8 t',
    dispo: 'Disponible',
  },
];

export const INITIAL_ORDERS = [
  {
    id: 'cmd-1',
    ref: 'OCPV-BKE-2026-00498',
    produit: 'Manioc',
    qte: '3 t',
    hub: 'Bouaké Centre',
    statut: 'Preuve soumise',
    statutColor: 'text-orange-600',
    date: '14/06/2026',
    mmRef: 'WVE-8847291',
  },
  {
    id: 'cmd-2',
    ref: 'OCPV-ABJ-2026-00095',
    produit: 'Igname',
    qte: '1 t',
    hub: 'Abidjan Treichville',
    statut: 'CP émis',
    statutColor: 'text-green-600',
    date: '08/06/2026',
    mmRef: 'OM-2291034',
    docType: 'CP',
  },
];

export const RECEIPTS_HISTORY = [
  { id: 'r1', type: 'CP', ref: 'CP-2026-ABJ-8847', montant: '45 200 F', date: '08/06/2026', hub: 'Treichville' },
  { id: 'r2', type: 'APE', ref: 'APE-2026-BKE-1203', montant: '128 500 F', date: '02/06/2026', hub: 'Bouaké' },
  { id: 'r3', type: 'Taxes OCPV', ref: 'TX-2026-00441', montant: '12 800 F', date: '02/06/2026', hub: 'Bouaké' },
];

export const BUYER_PROFILE_B2B = {
  type: 'B2B',
  raisonSociale: 'Grossiste Treichville SARL',
  responsable: 'Adjoua Mensah',
  rccm: 'CI-ABJ-2021-B-48291',
  idAcheteur: 'CI-ACH-B2B-1092',
  tel: '07 22 33 44 55',
  hubHabituel: 'Abidjan Treichville',
  ville: 'Treichville',
};

export const BUYER_PROFILE_B2C = {
  type: 'B2C',
  raisonSociale: '—',
  responsable: 'Koffi Jean',
  rccm: '—',
  idAcheteur: 'CI-ACH-B2C-8841',
  tel: '05 11 22 33 44',
  hubHabituel: 'Bouaké Centre',
  ville: 'Bouaké',
};

export function formatPrice(n) {
  return `${n.toLocaleString('fr-FR')} F`;
}

export function filterLots(lots, { region, hub, ville, produit, search }) {
  return lots.filter((lot) => {
    if (region && region !== 'Toutes' && lot.region !== region) return false;
    if (hub && hub !== 'Tous' && lot.hub !== hub) return false;
    if (ville && ville !== 'Toutes' && lot.ville !== ville) return false;
    if (produit && produit !== 'Tous' && lot.produit !== produit) return false;
    if (search?.trim()) {
      const q = search.toLowerCase();
      const hay = `${lot.produit} ${lot.ref} ${lot.hub} ${lot.ville}`.toLowerCase();
      if (!hay.includes(q)) return false;
    }
    return true;
  });
}

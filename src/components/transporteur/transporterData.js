export const TRANSPORTER_PROFILE = {
  nom: 'Koné Ibrahim',
  entreprise: 'Transport Koné Express',
  idTransporteur: 'CI-TRP-4421',
  tel: '07 55 66 77 88',
  zones: 'Gbêkê · Bouaké · Yamoussoukro',
};

export const INITIAL_FLEET = [
  { id: 'v1', type: 'Camion plateaux', tonnage: '10 t', immat: 'AB-4521-CI', etat: 'Disponible' },
  { id: 'v2', type: 'Camion benne', tonnage: '8 t', immat: 'AB-8832-CI', etat: 'En mission' },
];

export const INITIAL_TARIFF_LINES = [
  { id: 'l1', from: 'Bouaké', to: 'Abidjan', prix: '185 000 F/t', actif: true },
  { id: 'l2', from: 'Bouaké', to: 'Yamoussoukro', prix: '95 000 F/t', actif: true },
  { id: 'l3', from: 'Yamoussoukro', to: 'Abidjan', prix: '120 000 F/t', actif: false },
];

export const TRANSPORT_REQUESTS = [
  {
    id: 'req-1',
    from: 'Acheteur Treichville SARL',
    trajet: 'Bouaké → Abidjan',
    produit: 'Manioc · 5 t',
    date: '20/06/2026',
    hub: 'Bouaké Centre',
  },
  {
    id: 'req-2',
    from: 'Grossiste Marcory',
    trajet: 'Yamoussoukro → Abidjan',
    produit: 'Maïs · 3 t',
    date: '22/06/2026',
    hub: 'Yamoussoukro Nord',
  },
  {
    id: 'req-3',
    from: 'OCPV Antenne Gbêkê',
    trajet: 'Bouaké → Korhogo',
    produit: 'Igname · 2 t',
    date: '25/06/2026',
    hub: 'Bouaké Centre',
  },
];

export const MARKETPLACE_PREVIEW = [
  { id: 'lot-501', produit: 'Igname', qte: '2 t', hub: 'Bouaké Centre', prix: '320 000 F/t' },
  { id: 'lot-502', produit: 'Manioc', qte: '5 t', hub: 'Bouaké Centre', prix: '185 000 F/t' },
];

export const INITIAL_AVAILABILITIES = [
  { id: 'a1', vehicule: 'AB-4521-CI', zone: 'Gbêkê · Bouaké', date: '18–22/06/2026', tonnage: '10 t dispo' },
];

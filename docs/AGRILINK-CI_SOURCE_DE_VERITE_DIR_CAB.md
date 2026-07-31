# AGRILINK-CI — Source de Vérité pour la présentation au Dir Cab et à la Direction de l’OCPV

**Document de référence produit, métier et architecture**

- **Projet :** AGRILINK-CI
- **Institution porteuse :** Office d’Aide à la Commercialisation des Produits Vivriers — OCPV
- **Démonstrateur :** [https://sgi-ocpv.ciacems.site/](https://sgi-ocpv.ciacems.site/)
- **Public cible :** Président du Comité de gestion, Dir Cab, Direction générale de l’OCPV, directions métiers et techniques
- **Nature du document :** source de vérité destinée à Google NotebookLM pour la génération de slides et d’un discours institutionnel
- **Version :** 1.0
- **Date de référence :** 28 juillet 2026

> **Message central :** AGRILINK-CI transforme la digitalisation des paiements de l’OCPV en un système national de connaissance, de contrôle et de régulation de la chaîne vivrière, depuis la déclaration du producteur jusqu’à l’achat et à la sortie logistique.

## Statut documentaire et règle de priorité

Ce document consolide les TDR, le cahier des charges, la modélisation des flux, l’analyse comparative et les arbitrages les plus récents de la Direction.

En cas de contradiction, l’ordre de priorité suivant s’applique :

1. **Arbitrages métier récents de la Direction et règles matérialisées dans la démo actuelle ;**
2. **TDR élargi du Système de Gestion Intégré OCPV ;**
3. **Cahier des charges technique et fonctionnel AGRILINK-CI ;**
4. **TDR initial de digitalisation des paiements et modélisation historique des flux CP/APE ;**
5. **Documents d’analyse ou de présentation CIACEMS.**

### Arbitrages récents qui remplacent les formulations antérieures

| Sujet | Formulation historique relevée | Règle de référence retenue |
|---|---|---|
| **Visibilité catalogue** | Publication uniquement après présence et contrôle au Hub | Visibilité publique **dès la déclaration**, sous statut **En cours de vérification** et sans possibilité d’achat |
| **Paiement du producteur** | “Séquestre transactionnel” ou “séquestre logique” | Paiement **P2P direct au producteur** ; l’OCPV ne détient ni ne séquestre le prix de vente |
| **Yield Management** | Décote dynamique appliquée automatiquement par algorithme | **Décote manuelle**, motivée et auditée, décidée par un agent habilité |
| **Transport amont** | Responsabilité logistique systématiquement transférée au producteur | Choix entre **dépôt direct** et **camion OCPV**, avec frais logistiques annoncés et déduits |
| **Certificat d’Origine** | Possible confusion avec la facturation OCPV | Paiement hors AGRILINK-CI, directement sur le **GUCE** ; document vérifié obligatoirement au départ du Hub |

Ces arbitrages doivent prévaloir dans les slides, le discours, les spécifications futures et les développements.

---

## Résumé exécutif

AGRILINK-CI est une plateforme de digitalisation et de pilotage de la chaîne de commercialisation des produits vivriers en Côte d’Ivoire. Elle prolonge le besoin initial de dématérialisation des actes et paiements de l’OCPV pour couvrir l’ensemble du cycle de vie d’un lot agricole :

- **déclaration de disponibilité par le producteur ;**
- **organisation de l’acheminement vers un Hub OCPV ;**
- **réception, pesée et contrôle qualité ;**
- **publication contrôlée sur le marché ;**
- **paiement direct du producteur ;**
- **encaissement distinct des taxes OCPV ;**
- **contrôle documentaire et logistique ;**
- **consolidation des données dans les tableaux de bord régionaux et nationaux.**

AGRILINK-CI ne remplace pas les prérogatives de l’OCPV : il les **renforce**, les **documente** et les **rend pilotables en temps réel**. L’OCPV reste l’autorité de contrôle, de certification, de régulation et d’arbitrage.

La plateforme poursuit trois résultats stratégiques :

1. **Sécuriser l’action publique** grâce à la traçabilité des lots, des agents, des paiements, des documents et des décisions.
2. **Améliorer l’approvisionnement des marchés** par une visibilité plus précoce sur les volumes disponibles.
3. **Outiller les politiques de souveraineté alimentaire et de lutte contre la vie chère** avec des données fiables sur les récoltes, les stocks, les flux, les prix et les tensions territoriales.

### Ce que la démo doit faire comprendre

La démo n’est pas seulement une succession d’écrans. Elle illustre une nouvelle doctrine opérationnelle :

- **le producteur devient le “Nœud Zéro” de la donnée ;**
- **l’OCPV devient le centre de gravité numérique de la chaîne vivrière ;**
- **le marché voit plus tôt les disponibilités, mais ne peut acheter qu’après le contrôle public ;**
- **les fonds du producteur ne sont pas séquestrés par l’OCPV ;**
- **chaque action sensible exige une preuve, une identité et une validation explicite.**

---

## 1. Vision Stratégique et Enjeux

### 1.1 Une infrastructure numérique au service de la souveraineté alimentaire

AGRILINK-CI répond à un enjeu national : disposer d’une vision fiable et continue de la disponibilité des produits vivriers, de leur localisation, de leur état, de leur prix et de leur déplacement.

La souveraineté alimentaire ne dépend pas uniquement du niveau de production. Elle dépend aussi de la capacité de l’État à :

- connaître les volumes disponibles **avant leur arrivée sur les marchés** ;
- identifier les zones de surplus et les zones sous tension ;
- faciliter l’orientation des produits vers les bassins de consommation ;
- limiter les pertes post-récolte ;
- détecter les signaux annonciateurs de pénurie ;
- documenter les facteurs de formation des prix ;
- coordonner producteurs, agents, transporteurs et acheteurs ;
- disposer d’indicateurs opposables pour éclairer la décision publique.

AGRILINK-CI crée cette continuité numérique entre **production**, **contrôle public**, **logistique** et **commercialisation**.

### 1.2 Une contribution directe à la lutte contre la vie chère

La lutte contre la vie chère exige d’agir sur les causes structurelles de tension :

- information tardive sur les récoltes disponibles ;
- fragmentation des circuits ;
- difficulté à rapprocher l’offre et la demande ;
- pertes liées à la péremption ou à une mauvaise orientation logistique ;
- asymétrie d’information entre producteurs, intermédiaires et acheteurs ;
- manque de données consolidées sur les prix et les volumes.

AGRILINK-CI apporte quatre leviers :

- **anticipation :** la déclaration précoce permet de voir les volumes avant leur mise en vente ;
- **fluidification :** la bourse logistique facilite l’acheminement vers les Hubs et les marchés ;
- **régulation :** l’OCPV contrôle la qualité, la disponibilité et les conditions de mise en marché ;
- **intelligence économique :** le Système d’Information sur les Marchés, ou **SIM**, consolide volumes, prix, stocks et corridors.

Le système ne prétend pas administrer mécaniquement tous les prix. Il fournit à l’OCPV les moyens d’identifier les tensions, d’intervenir avec discernement et d’accélérer l’écoulement d’un lot lorsque sa qualité ou sa durée de conservation l’exige.

### 1.3 L’OCPV comme “Tiers de Confiance”

Dans AGRILINK-CI, l’OCPV est le **Tiers de Confiance institutionnel** de la transaction vivrière.

Ce rôle signifie que l’OCPV :

- identifie les acteurs habilités ;
- trace la déclaration et le cycle de vie du lot ;
- organise ou supervise la collecte ;
- contrôle physiquement la marchandise au Hub ;
- constate le poids et la qualité ;
- autorise le passage du statut **“En cours de vérification”** au statut **“Disponible”** ;
- émet les reçus et actes relevant de sa compétence ;
- encaisse et trace ses propres taxes ;
- contrôle les documents nécessaires au transport ;
- arbitre les litiges dans le cadre de ses prérogatives ;
- produit les statistiques de pilotage territorial et national.

### 1.4 Un tiers de confiance sans séquestration des fonds

**L’OCPV ne séquestre pas le prix de vente dû au producteur.**

Le modèle financier distingue deux flux :

1. **Le paiement commercial du producteur :** l’acheteur paie directement le producteur par Mobile Money P2P — Wave, Orange Money, MTN Money ou autre opérateur autorisé.
2. **Le paiement institutionnel :** l’acheteur règle séparément les taxes OCPV par le mécanisme intégré à AGRILINK-CI.

L’OCPV sécurise la transaction par la preuve, le contrôle et la traçabilité, sans devenir dépositaire du prix de vente de la marchandise.

Cette séparation :

- respecte la relation commerciale directe ;
- réduit le risque de confusion comptable ;
- limite l’exposition de l’OCPV à la détention de fonds privés ;
- rend lisibles les recettes propres à l’Office ;
- simplifie les rapprochements et les audits.

---

## 2. Analyse Comparative : L’Ancienne Approche TDR vs. La Révolution AGRILINK-CI

### 2.1 Une évolution maîtrisée, et non une rupture avec le TDR

Le TDR initial pose un socle indispensable : dématérialiser les actes, sécuriser les paiements, équiper les agents, fiabiliser les recettes et suivre les flux sur les corridors.

AGRILINK-CI **conserve ce socle** et élargit son ambition. Le projet passe :

- d’un système centré sur le passage d’un camion à un système centré sur le **cycle de vie du produit** ;
- d’une collecte de données en aval à une connaissance initiée **dès le producteur** ;
- d’un outil transactionnel à une plateforme de **régulation et d’intelligence économique** ;
- d’équipements isolés à une architecture nationale interopérable.

### 2.2 Tableau comparatif

| Axe | Approche initiale du TDR | Apport structurant d’AGRILINK-CI |
|---|---|---|
| **Point de départ de la donnée** | Le corridor, le poste de contrôle ou le passage du camion | Le **Nœud Zéro : le producteur**, dès la déclaration de récolte |
| **Objet principalement tracé** | Transaction, certificat, camion et redevance | **Lot agricole unique**, suivi de la déclaration jusqu’à la vente et à la sortie |
| **Traçabilité** | Visibilité sur les flux déjà engagés dans les corridors | Visibilité précoce sur l’offre, le Hub, le statut qualité, le transport et l’achat |
| **Utilisateurs équipés** | Agents OCPV dotés de TPE | Agents, producteurs, acheteurs, transporteurs, Antennes et Direction |
| **Inclusion numérique** | TPE et applications de contrôle | Application mobile, **USSD, SMS**, TPE offline-first et interfaces Web |
| **Paiement** | Paiement électronique des actes et redevances | Séparation entre **paiement P2P au producteur** et **taxes OCPV** |
| **Intelligence économique** | Reporting sur les transactions réalisées | **SIM proactif** : disponibilités, stocks, prix, flux, abondance et tensions |
| **Gestion des prix** | Observation et collecte d’informations | Décote **manuelle, justifiée et auditée** par l’agent pour qualité ou péremption |
| **Logistique** | Contrôle des véhicules sur les corridors | Choix logistique à la déclaration, bourse de transport et contrôle au départ du Hub |
| **Pilotage** | Suivi administratif et financier | Tableaux de bord Antenne, Hub et DGM, vision régionale et nationale |
| **Architecture** | Solution de digitalisation métier | Plateforme modulaire en microservices, interopérable et migrable vers la **SNDI Tier III** |

### 2.3 Traçabilité : intégrer le “Nœud Zéro”

Dans l’approche historique, l’information apparaît principalement lorsque le produit est déjà en mouvement : arrivée à un corridor, présentation d’un transporteur, déclaration d’une cargaison ou émission d’un acte.

AGRILINK-CI crée le **Nœud Zéro**, c’est-à-dire le producteur et sa récolte.

Dès la déclaration :

- un identifiant de lot est créé ;
- le produit et le tonnage sont connus ;
- le Hub de destination est défini ;
- le choix de transport est enregistré ;
- le lot devient visible sur le catalogue avec un statut restrictif ;
- l’OCPV dispose d’un signal précoce de disponibilité.

Le même identifiant accompagne ensuite le lot lors de la validation, du ramassage, de la réception, du contrôle, de la mise en vente et de l’achat.

### 2.4 Inclusion technologique : ne laisser aucun producteur hors du système

Une politique nationale ne peut dépendre exclusivement du smartphone ou de la couverture Internet.

AGRILINK-CI prévoit plusieurs canaux :

- **application mobile** pour les producteurs équipés ;
- **USSD** pour les téléphones simples et les zones couvertes en 2G ;
- **SMS** pour les confirmations, codes, changements de statut et alertes ;
- **numéro d’assistance** pour la déclaration accompagnée ;
- **TPE offline-first** pour les agents sur le terrain ;
- **synchronisation différée** lorsque la connectivité revient.

Le principe d’architecture est : **un seul référentiel métier, plusieurs portes d’entrée**.

### 2.5 Intelligence économique : du paiement au SIM proactif

La digitalisation des taxes produit de la donnée financière. AGRILINK-CI y ajoute la donnée agricole et logistique.

Le SIM peut progressivement consolider :

- volumes déclarés, reçus, disponibles et vendus ;
- prix proposés, prix contrôlés et prix après décote ;
- durée moyenne de stockage ;
- taux de perte et motifs de non-conformité ;
- disponibilités par produit, Hub, région et période ;
- capacités logistiques et corridors actifs ;
- délais entre déclaration, réception et vente ;
- demande exprimée par les acheteurs ;
- indices d’abondance ou de tension.

Ces informations permettent à l’OCPV de passer d’un constat a posteriori à une capacité d’anticipation.

### 2.6 Souveraineté : une architecture évolutive vers la SNDI Tier III

AGRILINK-CI est conçu comme une plateforme modulaire pouvant évoluer vers les infrastructures sécurisées de l’État, notamment un hébergement cible à la **SNDI Tier III**, sous réserve de validation institutionnelle et technique.

Les principes structurants sont :

- **API Gateway** comme point d’entrée contrôlé ;
- **gestion centralisée des identités et des rôles** ;
- **microservices métier découplés** ;
- **journalisation inviolable des événements sensibles** ;
- **chiffrement des données en transit et au repos** ;
- **sauvegardes, réplication et reprise après incident** ;
- **observabilité centralisée** : logs, métriques, alertes et traces ;
- **interopérabilité par API** avec les systèmes publics et partenaires autorisés ;
- **portabilité de l’infrastructure** pour éviter une dépendance irréversible à un fournisseur ;
- **maîtrise institutionnelle du code source, des données et de la documentation.**

### 2.7 Découpage cible des microservices

L’architecture cible peut être organisée autour des domaines suivants :

- **Identité et habilitations :** utilisateurs, rôles, agents, Antennes, appareils et révocation ;
- **Producteurs et organisations :** producteurs, coopératives, parcelles et canaux USSD/SMS ;
- **Lots et traçabilité :** déclaration, statuts, événements et historique ;
- **Hub et contrôle qualité :** réception, pesée, vérification, reçu de dépôt et stockage ;
- **Catalogue et commandes :** teasing, disponibilité, panier, achat et reçu ;
- **Paiements et fiscalité OCPV :** preuves P2P, taxes OCPV, rapprochements et ventilation ;
- **Logistique :** demandes de camion, transporteurs, tarifs, trajets et départs ;
- **Documents et conformité :** CP, APE, pièces GUCE, signatures, QR et contrôles ;
- **Notifications :** SMS, USSD, push et alertes ;
- **SIM et pilotage :** agrégats, indicateurs, prévisions, cartes et reporting.

Chaque service est responsable de son domaine, tandis qu’un bus d’événements assure la propagation des changements de statut sans créer de dépendances fragiles.

### 2.8 Architecture technique de référence

Le cahier des charges propose une architecture technique moderne. Les technologies ci-dessous constituent une **architecture de référence à confirmer lors de la conception détaillée**, et non une contrainte irréversible :

- **DDD — Domain-Driven Design :** découpage du système selon les domaines métier ;
- **CQRS :** séparation entre les commandes transactionnelles et les vues de lecture analytiques ;
- **Event Sourcing ou journal d’événements :** conservation de la chronologie des opérations sensibles ;
- **conteneurisation Docker** et orchestration progressive des services ;
- **backend haute performance :** Rust et Actix-web proposés pour les services critiques ;
- **base relationnelle :** PostgreSQL, avec mécanisme d’audit tel que `pgAudit` ;
- **recherche et analytique :** Elasticsearch pour le catalogue et les volumes ;
- **messagerie asynchrone :** RabbitMQ ou Kafka selon les besoins d’Event Sourcing et de volumétrie ;
- **cache distribué :** Redis ;
- **TPE offline-first :** stockage local SQLite et synchronisation différée ;
- **application mobile :** Flutter pour les parcours Producteur, Acheteur et Transporteur ;
- **canaux ruraux :** USSD et SMS via une passerelle agréée ;
- **API Gateway :** contrôle centralisé des accès aux services ;
- **observabilité :** métriques, journaux, alertes et suivi des erreurs.

Le démonstrateur Web actuel est développé en **React et Tailwind CSS**. La stack de la démo ne préjuge pas à elle seule de la stack définitive de production.

### 2.9 Résilience, disponibilité et DevSecOps

Les documents techniques proposent une montée en puissance :

- hébergement initial sur une infrastructure redondée ;
- migration cible vers le Datacenter national **SNDI Tier III** ;
- objectif de disponibilité évoluant de **99,5 % au lancement** vers **99,95 % en régime stabilisé**, sous réserve de contractualisation ;
- pipeline CI/CD avec analyse de dépendances, détection de vulnérabilités et blocage des failles critiques ;
- Web Application Firewall et API Gateway ;
- authentification forte, OTP et RBAC ;
- chiffrement moderne des communications ;
- sauvegardes testées et plan de reprise ;
- surveillance centralisée de l’infrastructure ;
- rapport périodique de santé destiné à la DSI.

Les choix de produits — orchestrateur, passerelle API, outils de monitoring ou fournisseurs — devront être confirmés par l’étude d’architecture, les exigences de la SNDI et les règles de marché public applicables.

### 2.10 Intelligence artificielle sous gouvernance publique

Les sources proposent plusieurs usages :

- prévision des prix à **J+7 et J+30** ;
- détection d’anomalies sur les volumes et les prix ;
- alertes de risque de pénurie ;
- recommandations de rééquilibrage entre Hubs ;
- alertes de péremption ;
- transformation d’une intention vocale en données structurées.

Ces capacités sont des outils d’assistance. Elles ne doivent pas :

- déclencher automatiquement une décote ;
- modifier un taux fiscal ;
- libérer une marchandise ;
- remplacer un contrôle qualité ;
- produire une décision opposable sans validation humaine.

### 2.11 Répartition automatisée des recettes OCPV

Le TDR et la modélisation historique prévoient un moteur de répartition automatisée selon la clé réglementaire de référence :

- **70 % — Trésor ;**
- **15 % — DGM ;**
- **10 % — Antenne ;**
- **5 % — Prestataire.**

Cette clé doit rester paramétrée dans un référentiel central, soumise à habilitation stricte et confirmée juridiquement avant mise en production. Toute modification doit être horodatée et auditée.

---

## 3. L’Architecture en 3 Nœuds — Le cœur de la démo

### 3.1 Vue d’ensemble

AGRILINK-CI s’explique simplement par trois nœuds :

1. **L’Amont : le producteur crée le signal de disponibilité.**
2. **Le Centre de Gravité : l’OCPV contrôle, certifie, régule et pilote.**
3. **L’Aval : l’acheteur consulte, paie et reçoit la preuve de transaction.**

Les trois nœuds partagent un objet commun : **le lot OCPV**.

### 3.2 Nœud 1 — L’Amont : Producteurs

#### Déclaration de disponibilité

Le producteur déclare une récolte prête à entrer dans le circuit AGRILINK-CI.

La règle métier impose :

- un produit identifié ;
- un **tonnage minimal de 5 tonnes** ;
- un Hub OCPV de destination ;
- un choix logistique explicite.

Une saisie inférieure à 5 tonnes est bloquée avec un message clair. Cette règle garantit la cohérence économique et logistique du dispositif de collecte.

#### Choix logistique

Le producteur choisit entre deux options :

- **Option A — Dépôt direct :** « Je dépose moi-même les produits au Hub OCPV ».
- **Option B — Collecte OCPV :** « Je demande un camion OCPV pour le ramassage ».

Lorsque la collecte OCPV est choisie :

- un lieu de ramassage devient obligatoire ;
- un encart présente les **frais logistiques estimés** ;
- le tarif inclut le coût du chauffeur et du camion ;
- le montant final est calculé selon la distance et le tonnage ;
- ces frais sont déduits du règlement final selon les règles validées.

#### Visibilité immédiate

Une déclaration crée immédiatement un lot visible dans le catalogue public.

À ce stade :

- le badge est **“En cours de vérification”** ;
- le prix définitif peut rester à confirmer ;
- le bouton **“Acheter”** est désactivé ;
- les coordonnées personnelles sensibles du producteur ne doivent pas être exposées publiquement.

Cette visibilité précoce constitue le mécanisme de **teasing** : le marché voit l’offre à venir sans pouvoir acheter une marchandise non encore contrôlée.

### 3.3 Nœud 2 — Le Centre de Gravité : OCPV

L’OCPV est le point où la déclaration numérique rencontre la réalité physique.

#### Réception et validation

Au Hub, l’agent :

- vérifie l’identité et la référence du lot ;
- réalise la pesée contradictoire ;
- contrôle la qualité ;
- enregistre les éventuelles réserves ;
- valide ou refuse la marchandise ;
- génère le **Reçu de Dépôt et de Vérification** destiné au producteur.

Le reçu contient notamment :

- référence unique du lot ;
- identité du producteur ;
- produit ;
- poids net réceptionné ;
- résultat du contrôle qualité ;
- Hub, date et heure ;
- identité ou signature de l’agent ;
- statut du lot.

Après validation, le lot passe à **“Disponible”** et le bouton d’achat devient actif.

#### Yield Management sous contrôle humain

AGRILINK-CI ne baisse pas automatiquement le prix d’un lot.

La décote est :

- **manuelle ;**
- initiée par un agent habilité ;
- motivée par la **péremption**, la **qualité** ou une décision d’écoulement validée ;
- limitée par des règles de seuil ;
- horodatée ;
- rattachée à l’identité de l’agent ;
- visible dans la piste d’audit.

Le bouton métier est : **“Appliquer une décote manuelle (Péremption/Qualité)”**.

Cette approche protège l’OCPV contre une régulation opaque par algorithme. L’outil calcule et trace ; **l’autorité humaine décide**.

#### Tableaux de bord

Le dispositif comprend trois niveaux de pilotage :

- **Dashboard Hub :** réceptions, stocks, contrôles, reçus, décotes et départs ;
- **Dashboard Antenne :** agents, zones, TPE, certificats, transactions et synchronisation ;
- **Dashboard DGM :** recettes consolidées, flux nationaux, SIM, corridors, abondance et supervision.

### 3.4 Nœud 3 — L’Aval : Acheteurs

#### Catalogue avec teasing contrôlé

Le catalogue distingue deux états :

- **En cours de vérification — orange :** le produit est déclaré et visible, mais non achetable.
- **Disponible — vert :** le produit a été réceptionné et contrôlé au Hub ; l’achat est autorisé.

Le teasing produit deux bénéfices :

- il crée un signal de marché avant la disponibilité finale ;
- il empêche une transaction prématurée sur une marchandise non contrôlée.

#### Checkout unifié en deux sections obligatoires

L’acheteur doit valider deux sections sur la même page :

**Section 1 — Paiement du Producteur**

- paiement Mobile Money P2P directement au producteur ;
- saisie de la référence de transaction ;
- ajout de la preuve de paiement.

**Section 2 — Paiement des Taxes OCPV**

- affichage de la facture OCPV ;
- paiement intégré ;
- confirmation distincte.

Le **Reçu d’Achat** n’est émis que lorsque les deux sections sont validées.

Le flux ne facture **aucun paiement de Certificat d’Origine GUCE**.

---

## 4. La Sécurité Opérationnelle — Le mécanisme “Zero Trust”

### 4.1 Principe

Le modèle Zero Trust applique la règle : **aucune remise physique n’est réputée valide sur la seule déclaration d’un agent, d’un producteur ou d’un appareil**.

Chaque étape sensible doit vérifier :

- l’identité de l’acteur ;
- son habilitation ;
- le lot concerné ;
- l’appareil utilisé ;
- le moment et, lorsque cela est autorisé, le lieu de l’action ;
- une preuve indépendante détenue par l’autre partie.

Le mécanisme est conçu comme un flux à haute assurance en deux étapes. Il réduit fortement les possibilités de collusion, de fausse collecte, de substitution de lot ou de contestation ultérieure. Aucun dispositif ne supprime absolument tout risque ; sa robustesse repose sur la combinaison des contrôles et de l’audit.

### 4.2 Étape 1 — Intention au Bureau

Avant le ramassage :

1. l’agent ou le responsable habilité ouvre la déclaration ;
2. il vérifie le producteur, le produit, le tonnage, le lieu et le mode logistique ;
3. il valide l’intention de collecte ;
4. le système génère un **code PIN secret, à usage unique** ;
5. le code est envoyé directement au producteur par SMS ou canal autorisé ;
6. le code n’est pas communiqué en clair à l’agent chargé du ramassage ;
7. la validation est horodatée et rattachée au lot, à l’agent et à l’Antenne.

Le producteur détient ainsi un secret indépendant prouvant que le ramassage a bien été autorisé.

### 4.3 Étape 2 — Preuve au Champ

Au point de collecte :

1. l’agent identifie le lot sur son TPE ;
2. le producteur communique ou saisit son code PIN ;
3. l’agent saisit le PIN sur le TPE ;
4. le système vérifie la correspondance entre le PIN, le lot, l’opération et sa période de validité ;
5. le TPE enregistre l’identité de l’agent et l’identifiant de l’appareil ;
6. si la vérification réussit, le transfert physique est autorisé ;
7. le TPE imprime le **récépissé officiel de remise** ;
8. l’événement est synchronisé immédiatement ou dès le retour du réseau.

**Sans PIN valide, aucun récépissé officiel ne peut être imprimé et aucune remise ne doit être considérée comme régulière.**

### 4.4 Contrôles techniques recommandés

Pour rendre le mécanisme opposable et auditable :

- PIN aléatoire, non prédictible et à usage unique ;
- durée de validité limitée ;
- nombre d’essais limité ;
- blocage et alerte après échecs successifs ;
- rattachement cryptographique au lot et à l’intention ;
- chiffrement du PIN au repos ;
- masquage dans les journaux et interfaces ;
- signature de l’événement par le TPE ;
- mode offline fondé sur un jeton signé et borné dans le temps ;
- synchronisation avec détection de doublons ;
- révocation à distance d’un TPE perdu ou compromis ;
- journal d’audit non modifiable par l’agent terrain ;
- rapprochement entre intention, remise, arrivée au Hub et pesée.

### 4.5 Fraudes et litiges couverts

Le double contrôle réduit notamment :

- le ramassage d’un lot sans accord réel du producteur ;
- l’utilisation d’une fausse identité d’agent ;
- la substitution d’un lot ;
- la création d’un reçu sans présence au point de collecte ;
- la double utilisation d’une autorisation ;
- la contestation de la date ou de l’identité du collecteur ;
- les divergences entre quantité déclarée, quantité remise et quantité reçue.

### 4.6 Positionnement dans la démo

La démo actuelle matérialise :

- la déclaration et la validation ;
- le lot unique ;
- le récépissé QR ;
- le TPE offline-first ;
- la réception et le reçu au Hub.

Le **PIN producteur en deux temps constitue le mécanisme de sécurité cible à expliciter oralement** pendant le parcours TPE. Son écran dédié doit être considéré comme une évolution de fidélité métier si la version publique ne l’affiche pas encore explicitement.

---

## 5. Intégration Logistique et Conformité

### 5.1 Une logistique intégrée à la chaîne de confiance

Le transport n’est pas un module périphérique. Il conditionne :

- la disponibilité réelle des produits ;
- leur qualité à l’arrivée ;
- le coût final ;
- la vitesse d’écoulement ;
- la traçabilité des flux physiques.

AGRILINK-CI permet :

- au producteur de choisir le dépôt direct ou la collecte OCPV ;
- à l’OCPV d’estimer et tracer les frais de ramassage ;
- aux transporteurs de publier leurs disponibilités ;
- aux acheteurs d’identifier des capacités de transport ;
- au Hub de vérifier le camion et son chargement avant départ.

### 5.2 Séparation des paiements

Trois catégories doivent rester distinctes :

- **prix de la marchandise :** payé directement au producteur ;
- **taxes OCPV :** facturées et tracées dans AGRILINK-CI ;
- **Certificat d’Origine :** géré et payé directement sur le **Guichet Unique du Commerce Extérieur — GUCE**.

AGRILINK-CI ne collecte donc pas le paiement du Certificat d’Origine.

### 5.3 Le Certificat d’Origine devient un contrôle obligatoire

Même si son paiement reste externe, le document doit être contrôlé au départ du Hub lorsqu’il est requis.

La checklist de sortie du camion comprend :

- Certificat de Provenance ;
- Autorisation préalable ou document OCPV applicable ;
- **Certificat d’Origine GUCE — paiement effectué sur le Guichet Unique ;**
- lettre de voiture ou bordereau ;
- concordance du chargement, du véhicule, du scellé et de la destination.

Le camion ne peut être libéré que lorsque les documents obligatoires sont cochés et validés par l’agent.

Cette intégration respecte la compétence du GUCE tout en permettant à l’OCPV d’exercer son devoir de conformité logistique.

---

## 6. Guide Narratif de la Démo — Ce qu’il faut montrer

### 6.1 Objectif de la séquence

La démonstration doit raconter une seule histoire :

> **Une récolte est déclarée par un producteur, sécurisée par l’OCPV, rendue visible au marché, contrôlée au Hub, achetée par deux paiements distincts, puis tracée jusqu’à sa sortie logistique et au pilotage national.**

Durée recommandée : **12 à 15 minutes**, hors questions.

### 6.2 Préparation avant la séance

- Ouvrir [https://sgi-ocpv.ciacems.site/](https://sgi-ocpv.ciacems.site/) dans un navigateur récent.
- Prévoir un affichage en plein écran.
- Conserver les routes directes dans des onglets de secours.
- Tester le parcours Producteur avant la réunion afin d’avoir au moins une déclaration récente.
- Vérifier que les fenêtres modales ne sont pas bloquées.
- Rappeler que les montants, identités et lots de la démo sont **fictifs**.
- Présenter la démo comme un **prototype fonctionnel de décision**, et non comme un système déjà homologué pour la production.

### 6.3 Chemin de fer recommandé

#### Étape 1 — Commencer par la cartographie

**Écran :** page d’accueil `/`

**Action :**

- afficher les trois blocs **Amont**, **OCPV** et **Aval** ;
- cliquer successivement sur chaque nœud ;
- montrer les flux physiques, financiers et documentaires.

**Discours :**

> « AGRILINK-CI ne commence pas au poste de contrôle. Il commence chez le producteur. L’OCPV devient le centre de gravité qui transforme une déclaration en marchandise contrôlée, puis en offre achetable. »

**Message Dir Cab :** la plateforme couvre la chaîne complète sans retirer à l’OCPV son rôle régalien.

#### Étape 2 — Faire le parallèle avec l’analyse comparative

**Écran :** toujours sur la cartographie.

**Action :**

- désigner le producteur comme **Nœud Zéro** ;
- désigner le TPE et les corridors comme le socle du TDR ;
- désigner les tableaux de bord comme le passage au SIM.

**Discours :**

> « Le TDR sécurise les actes et les corridors. AGRILINK-CI conserve ce socle et remonte jusqu’à la récolte. Nous ne voyons plus seulement ce qui circule ; nous voyons aussi ce qui va devenir disponible. »

#### Étape 3 — Montrer l’inclusion et la déclaration Producteur

**Écran :** `/demo-producteur`

**Action :**

1. sélectionner **App mobile** ;
2. cliquer sur **Déclarer ma récolte** ;
3. choisir un produit ;
4. saisir `4,9` tonnes pour montrer le blocage ;
5. saisir ensuite `5` tonnes ou davantage ;
6. sélectionner **Je dépose moi-même** ;
7. sélectionner ensuite **Je demande un camion OCPV** ;
8. montrer l’encart **Frais logistiques estimés** ;
9. renseigner le lieu de ramassage ;
10. confirmer la déclaration ;
11. montrer le lot, son identifiant et sa timeline.

**Discours :**

> « La règle des cinq tonnes est contrôlée dès la source. Le producteur choisit son mode d’acheminement en toute transparence. La déclaration crée immédiatement un lot traçable. »

**Complément inclusion :**

- revenir au sélecteur ;
- afficher brièvement le canal **Numéro vert / USSD** ;
- expliquer que le même référentiel est accessible sans smartphone ni Internet.

#### Étape 4 — Montrer le mécanisme Zero Trust

**Écran :** `/tpe-mockup`

**Action :**

- montrer l’identification de l’acteur et de la cargaison ;
- montrer le fonctionnement offline-first ;
- montrer la génération du reçu sécurisé ;
- utiliser cet écran comme support pour raconter les deux temps du PIN.

**Discours :**

> « La validation au bureau ne suffit pas. Le producteur reçoit un PIN secret. Au champ, l’agent doit saisir ce PIN sur son TPE. Sans concordance, pas de remise régulière et pas de récépissé officiel. Nous séparons ainsi l’intention administrative de la preuve physique. »

**Point de transparence :** si l’écran PIN n’est pas encore visible dans la version publique, préciser qu’il s’agit du contrôle cible à intégrer au parcours TPE, et non prétendre qu’il est déjà affiché.

#### Étape 5 — Faire entrer le lot au Centre de Gravité OCPV

**Écran :** `/dashboard-hub`

**Action :**

1. rester sur **Réceptions** ;
2. montrer le lot en cours de vérification ;
3. saisir ou confirmer le poids net ;
4. choisir le grade qualité ;
5. cocher les trois contrôles obligatoires ;
6. cliquer sur **Valider et générer le reçu** ;
7. présenter le **Reçu de Dépôt et de Vérification**.

**Discours :**

> « C’est ici que la donnée déclarative devient une réalité contrôlée par l’État. L’agent constate le poids, la qualité et l’arrivée effective. Son visa rend le lot disponible à l’achat. »

#### Étape 6 — Montrer le Yield Management manuel

**Écran :** `/dashboard-hub`, onglet **Lots stockés**

**Action :**

1. sélectionner un lot ;
2. cliquer sur **Appliquer une décote manuelle (Péremption/Qualité)** ;
3. choisir un motif ;
4. déplacer le taux de décote ;
5. montrer l’ancien et le nouveau prix ;
6. confirmer.

**Discours :**

> « Aucun algorithme ne baisse seul le prix d’un producteur. L’outil propose le calcul, mais l’agent habilité décide, motive et signe numériquement la décote. »

**Message de contrôle :** l’intelligence assiste l’autorité ; elle ne la remplace pas.

#### Étape 7 — Montrer la conformité logistique et le GUCE

**Écran :** `/dashboard-hub`, onglet **Départs camions**

**Action :**

1. montrer le camion, son chargement, sa destination et son scellé ;
2. parcourir la checklist documentaire ;
3. insister sur **Certificat d’Origine (GUCE)** ;
4. lire la mention **“Paiement effectué sur le Guichet Unique”** ;
5. cocher les pièces restantes ;
6. autoriser la sortie du camion.

**Discours :**

> « AGRILINK-CI ne facture pas le Certificat d’Origine. Le paiement reste au GUCE. En revanche, l’agent OCPV doit vérifier la présence du document avant d’autoriser la sortie. Nous interopérons sans empiéter sur les compétences institutionnelles. »

#### Étape 8 — Montrer le teasing dans le catalogue

**Écran :** `/demo-acheteur`

**Action :**

- afficher un lot **En cours de vérification** ;
- montrer que **Panier** et **Acheter** sont désactivés ;
- afficher ensuite un lot **Disponible** ;
- montrer que son achat est autorisé.

**Discours :**

> « Le marché est informé tôt, mais la transaction attend le contrôle de l’OCPV. La visibilité accélère la rencontre entre l’offre et la demande ; le statut protège l’acheteur. »

Si une déclaration a été créée à l’étape Producteur, elle apparaît dans le catalogue de la démo avec son statut restrictif.

#### Étape 9 — Terminer par le double checkout

**Écran :** `/demo-acheteur`

**Action :**

1. choisir un lot disponible ;
2. cliquer sur **Acheter** ;
3. montrer la **Section 1 — Paiement du Producteur** ;
4. saisir une référence Mobile Money fictive ;
5. simuler l’ajout de la preuve P2P ;
6. montrer la **Section 2 — Paiement des Taxes OCPV** ;
7. valider les taxes ;
8. constater que le bouton final n’est actif qu’après les deux validations ;
9. cliquer sur **Valider les deux paiements** ;
10. présenter le **Reçu d’Achat**.

**Discours de conclusion transactionnelle :**

> « Le producteur reçoit directement son argent. L’OCPV perçoit et trace uniquement ce qui lui revient. Le reçu final réconcilie les deux preuves sans séquestration des fonds. Aucun frais de Certificat d’Origine n’est ajouté. »

#### Étape 10 — Conclure par le pilotage de l’État

**Écrans :**

- `/dashboard-antenne`
- `/dashboard-dgm`

**Action :**

- montrer le parc TPE et les synchronisations ;
- montrer le registre des certificats ;
- ouvrir les statistiques SIM ;
- montrer les volumes, prix moyens, corridors et indicateurs nationaux.

**Discours final :**

> « Chaque déclaration, chaque contrôle, chaque paiement et chaque mouvement alimente une vision nationale. AGRILINK-CI ne produit pas seulement des reçus : il produit la connaissance nécessaire à l’action publique. »

### 6.4 Routes directes de secours

| Démonstration | Route |
|---|---|
| Cartographie des trois nœuds | `/` |
| Producteur — App et USSD | `/demo-producteur` |
| Agent Hub | `/dashboard-hub` |
| Acheteur — Catalogue et checkout | `/demo-acheteur` |
| Transporteur | `/demo-transporteur` |
| TPE terrain | `/tpe-mockup` |
| Dashboard Antenne | `/dashboard-antenne` |
| Dashboard DGM et SIM | `/dashboard-dgm` |
| Architecture historique CP/APE | `/architecture-v1` |

### 6.5 Messages à répéter pendant la présentation

- **« Le producteur est le Nœud Zéro de la donnée. »**
- **« L’OCPV reste le Tiers de Confiance, sans séquestrer le paiement du producteur. »**
- **« Visible dès la déclaration ne signifie pas achetable avant contrôle. »**
- **« Aucun algorithme ne décide seul d’une baisse de prix. »**
- **« Le GUCE conserve le paiement du Certificat d’Origine ; l’OCPV en contrôle la présence. »**
- **« Une action sensible sans preuve n’est pas une action valide. »**
- **« La donnée opérationnelle devient une capacité de pilotage national. »**

### 6.6 Questions sensibles et réponses recommandées

#### « L’OCPV va-t-il encaisser l’argent des producteurs ? »

**Réponse :** Non. Le prix de vente est payé directement au producteur par Mobile Money P2P. AGRILINK-CI enregistre la preuve. L’OCPV encaisse séparément ses taxes.

#### « Pourquoi publier un produit avant le contrôle ? »

**Réponse :** Pour donner au marché une visibilité précoce sur l’offre. Le statut **En cours de vérification** et la désactivation du bouton d’achat empêchent toute transaction prématurée.

#### « L’algorithme peut-il imposer une décote ? »

**Réponse :** Non. La décote est exclusivement manuelle, motivée, horodatée et attribuée à un agent habilité.

#### « Que se passe-t-il sans Internet ? »

**Réponse :** Les producteurs disposent de canaux USSD/SMS et les agents d’un TPE offline-first. Les événements sont sécurisés localement puis synchronisés lorsque le réseau revient.

#### « AGRILINK-CI remplace-t-il le GUCE ? »

**Réponse :** Non. Le Certificat d’Origine reste géré et payé sur le GUCE. AGRILINK-CI contrôle seulement que le document requis est présent avant la sortie du camion.

#### « Où seront hébergées les données ? »

**Réponse :** L’architecture est conçue pour évoluer vers une infrastructure sécurisée et souveraine de l’État, notamment la SNDI Tier III, après validation des exigences d’hébergement, de sécurité, de continuité et d’interopérabilité.

#### « Le mécanisme PIN est-il suffisant à lui seul ? »

**Réponse :** Le PIN n’est qu’un facteur. La sécurité repose sur sa combinaison avec l’identité de l’agent, le lot, le TPE, l’horodatage, les limites d’essai, le reçu et le journal d’audit.

---

## 7. Gouvernance, Contrôle et Trajectoire de Mise en Production

### 7.1 La démo n’est pas la production

Le site de démonstration sert à :

- valider les parcours avec les Directions ;
- arbitrer les règles métier ;
- matérialiser l’expérience utilisateur ;
- tester la cohérence des rôles ;
- préparer les spécifications fonctionnelles et techniques.

Avant la production, les éléments suivants doivent être validés :

- textes et bases réglementaires ;
- barèmes et règles fiscales ;
- convention de paiement et de rapprochement ;
- gouvernance des données ;
- politique de protection des données personnelles ;
- matrice des rôles et habilitations ;
- procédures de litige, révocation et correction ;
- intégrations Mobile Money, SMS et GUCE ;
- homologation de sécurité ;
- plan de continuité et de reprise ;
- stratégie d’hébergement souverain ;
- pilote terrain et critères d’acceptation.

### 7.2 Cadre de conformité à confirmer

Le cahier des charges identifie notamment :

- la **Loi ivoirienne n° 2013-450 relative à la protection des données à caractère personnel** ;
- les exigences et contrôles de l’**ARTCI** ;
- les obligations applicables aux données et interfaces financières ;
- les règles **BCEAO**, KYC et LBC/FT lorsqu’elles sont applicables au périmètre exact ;
- la conservation des preuves et journaux d’audit ;
- le consentement au traitement des données vocales et textuelles ;
- la propriété institutionnelle du code source et de la documentation livrés.

La conformité ne doit pas être déclarée sur la seule base de la conception. Elle doit être démontrée par une analyse juridique, des procédures, des tests, des contrats d’intégration et, lorsque requis, une homologation.

### 7.3 Gouvernance des décisions algorithmiques

Les fonctions d’analyse et de prédiction doivent respecter trois règles :

- **explicabilité :** un indicateur ou une recommandation doit pouvoir être expliqué ;
- **supervision humaine :** une décision ayant un effet financier ou réglementaire reste sous autorité habilitée ;
- **auditabilité :** données d’entrée, décision, identité et résultat sont conservés.

### 7.4 Trajectoire indicative d’exécution

Le TDR prévoit une trajectoire indicative de **12 semaines** :

- **analyse et cadrage : 3 semaines ;**
- **conception fonctionnelle et technique : 2 semaines ;**
- **développement : 4 semaines ;**
- **tests pilote et validation : 2 semaines ;**
- **déploiement et formation : 1 semaine.**

Cette trajectoire doit être rebaselée après validation du périmètre élargi AGRILINK-CI, des intégrations externes, du pilote géographique et des exigences de sécurité.

Le TDR prévoit également une **garantie minimale de 12 mois après mise en production**, couvrant la correction des anomalies et le support technique. La maintenance évolutive et l’exploitation peuvent faire l’objet d’un dispositif contractuel distinct.

### 7.5 Indicateurs de succès

Les indicateurs proposés sont :

- taux de producteurs enregistrés par région ;
- part des déclarations réalisées par USSD/SMS ;
- délai moyen entre déclaration et réception ;
- écart entre tonnage déclaré et tonnage réceptionné ;
- taux de lots validés, refusés ou déclassés ;
- délai moyen de mise en vente ;
- taux d’écoulement avant péremption ;
- volume et valeur des transactions ;
- taux de preuves P2P rapprochées ;
- taux de paiement correct des taxes OCPV ;
- taux de synchronisation des TPE ;
- nombre d’incidents, litiges et tentatives de fraude ;
- délai moyen d’approvisionnement par corridor ;
- évolution des prix moyens par produit et région.

---

## 8. Conclusion institutionnelle

AGRILINK-CI donne à l’OCPV la capacité de voir plus tôt, de contrôler mieux et d’agir plus vite.

La plateforme :

- étend la traçabilité jusqu’au producteur ;
- inclut les zones rurales par USSD et SMS ;
- sécurise les remises physiques par une preuve croisée ;
- maintient le paiement commercial directement entre acheteur et producteur ;
- renforce le contrôle public au Hub ;
- intègre la logistique sans confondre les compétences du GUCE ;
- transforme les opérations quotidiennes en intelligence économique ;
- prépare une trajectoire d’hébergement souverain et sécurisé.

> **Formule de clôture recommandée :**  
> « Avec AGRILINK-CI, l’OCPV ne se contente plus d’observer les flux vivriers lorsqu’ils passent. Il connaît leur origine, sécurise leur mise en marché et donne à l’État les moyens d’anticiper. »

---

## 9. Références internes

- **TDR initial des paiements :** `docs/TDR_Digitalisation des Paiements à l'OCPV Finalisé V4_16062026.pdf`
- **TDR élargi du Système de Gestion Intégré :** `docs/TDR_Digitalisation_Système_Gestion_Intégré_OCPV (1).docx`
- **Cahier des charges AGRILINK-CI — version éditable :** `docs/CAHIER DES CHARGES TECHNIQUE ET FONCTIONNEL _AGRILINK-CI (1).docx`
- **Cahier des charges AGRILINK-CI — version PDF :** `docs/CAHIER DES CHARGES TECHNIQUE ET FONCTIONNEL _AGRILINK-CI.docx (2).pdf`
- **Analyse comparative CIACEMS / TDR — DOCX :** `docs/bncua_Analyse Comparative CIACEMS vs TDR OCPV (1).docx`
- **Analyse comparative CIACEMS / TDR — PDF :** `docs/vdhhs_Analyse Comparative CIACEMS vs TDR OCPV_.pdf`
- **Modélisation historique des flux CP/APE :** `docs/MODELISATION_FLUX_OCPV_1.pdf`
- **Démonstrateur :** [https://sgi-ocpv.ciacems.site/](https://sgi-ocpv.ciacems.site/)
- **Code de la démo :** application React et Tailwind CSS du projet AGRILINK-CI
- **Composants de référence :** cartographie, Producteur, TPE, Dashboard Hub, Acheteur, Transporteur, Dashboard Antenne et Dashboard DGM

### Source volontairement exclue

Le fichier `docs/slplh_import_vip_cabinet_9503.xlsx` est une liste nominative de placement ou d’invités. Il ne décrit ni le produit, ni les règles métier, ni l’architecture d’AGRILINK-CI. Il contient des données à caractère personnel et **ne doit pas être importé dans NotebookLM pour cette présentation**.

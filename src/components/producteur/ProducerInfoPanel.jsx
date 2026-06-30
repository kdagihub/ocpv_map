import {
  Sprout,
  FileCheck,
  ScrollText,
  Truck,
  Smartphone,
  Phone,
  Users,
  Shield,
} from 'lucide-react';

const FEATURES = [
  {
    icon: FileCheck,
    title: 'Déclaration de disponibilité',
    detail: 'Signalement des volumes de récolte prêts à être expédiés vers les Hubs OCPV.',
  },
  {
    icon: ScrollText,
    title: 'Acceptation des CGU',
    detail: 'Consentement à l\'auto-régulation logistique et au cadre transactionnel numérique.',
  },
  {
    icon: Truck,
    title: 'Transfert du risque logistique amont',
    detail: 'Le producteur assume le fret jusqu\'au Hub, auto-régulant les flux entrants.',
  },
  {
    icon: Smartphone,
    title: 'Application mobile Flutter',
    detail: 'Interface simple type Wave : gros boutons, stats, déclaration en 3 clics.',
  },
  {
    icon: Phone,
    title: 'Numéro vert 800 00 00',
    detail: 'Canal vocal pour paysans sans smartphone — composition classique, mise en relation avec un agent OCPV.',
  },
];

export default function ProducerInfoPanel() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <header className="shrink-0 pb-5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-green-500/10 border border-green-500/30">
            <Sprout size={24} className="text-green-600 dark:text-green-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-green-600 dark:text-green-500">
              Amont · Bounded Context
            </p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">
              Le Producteur
            </h1>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
          Propriétaire de la marchandise. Il initie la déclaration de disponibilité et supporte
          le risque logistique jusqu&apos;à l&apos;arrivée au Hub OCPV.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto py-5 space-y-6 min-h-0">
        <section className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
          <div className="flex items-start gap-2">
            <Phone size={18} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-600 dark:text-orange-400">Numéro vert OCPV</p>
              <p className="text-lg font-extrabold text-slate-900 dark:text-white mt-0.5">800 CPV</p>
              <p className="text-xs text-slate-600 dark:text-white/50 mt-1">
                Pour les paysans sans smartphone — mise en relation directe avec un agent.
              </p>
            </div>
          </div>
        </section>

        <section>
          <div className="flex items-center gap-2 mb-3">
            <Users size={14} className="text-green-600 dark:text-green-500" />
            <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
              Acteur externe (CDC §2.1)
            </h2>
          </div>
          <div className="inline-flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
            <Sprout size={14} className="text-green-600 dark:text-green-500" />
            <span className="text-sm font-medium text-slate-800 dark:text-white/80">Producteur</span>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-3">
            Fonctionnalités clés
          </h2>
          <div className="space-y-2">
            {FEATURES.map(({ icon: Icon, title, detail }) => (
              <div
                key={title}
                className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/10"
              >
                <div className="shrink-0 p-2 h-fit rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10">
                  <Icon size={16} className="text-green-600 dark:text-green-500" />
                </div>
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5 leading-relaxed">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="flex items-start gap-2">
            <Shield size={16} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-slate-900 dark:text-white">Multi-rôles, un même numéro</p>
              <p className="text-xs text-slate-600 dark:text-white/50 mt-1 leading-relaxed">
                Un producteur qui souhaite aussi acheter crée un <strong>compte Acheteur</strong> distinct.
                Le numéro peut être identique — seul le <em>rôle RBAC</em> change (Producteur ≠ Acheteur B2B/B2C).
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
            Traçabilité Lot OCPV (CDC §3.1 bis)
          </h2>
          <ul className="text-xs text-slate-600 dark:text-white/55 space-y-1.5">
            <li><strong className="text-slate-800 dark:text-white/80">Déclaration</strong> → file d&apos;attente agent.</li>
            <li><strong className="text-slate-800 dark:text-white/80">Récépissé QR</strong> — preuve obligatoire avant remise au ramassage.</li>
            <li><strong className="text-slate-800 dark:text-white/80">Même lot_id</strong> jusqu&apos;à la vente (timeline dans l&apos;app).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
            Cycle de vie d&apos;un lot
          </h2>
          <ul className="text-xs text-slate-600 dark:text-white/55 space-y-1.5">
            <li><strong className="text-slate-800 dark:text-white/80">Déclaré</strong> — le paysan signale sa disponibilité et le lieu de ramassage.</li>
            <li><strong className="text-slate-800 dark:text-white/80">En hub</strong> — marchandise physique au hub, contrôle qualité agent (pas encore en vente).</li>
            <li><strong className="text-slate-800 dark:text-white/80">En vente</strong> — validé par l&apos;agent : publication automatique sur le catalogue certifié (CDC §3.2).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">
            Parcours mobile (mockup)
          </h2>
          <ul className="text-xs text-slate-600 dark:text-white/55 space-y-1.5 list-disc list-inside">
            <li>Accueil : stats + bouton « Déclarer ma récolte »</li>
            <li>Déclaration : produit → quantité → lieu de ramassage → hub OCPV</li>
            <li>Déclaration → attente validation → récépissé QR</li>
            <li>Historique : timeline par lot (même entité tracée)</li>
            <li>Mon compte : profil modifiable, coopérative en lecture seule</li>
            <li>Onglet Mes produits : catalogue avec images + ajout produit</li>
            <li>Alternative numéro vert <code className="text-green-600">800 00 00</code> sans smartphone</li>
          </ul>
        </section>
      </div>
    </div>
  );
}

import {
  ShoppingCart,
  Wallet,
  Receipt,
  Package,
  Truck,
  FileText,
  Users,
} from 'lucide-react';

export default function BuyerInfoPanel() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <header className="shrink-0 pb-5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <ShoppingCart size={24} className="text-orange-500" />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Aval · Acheteur</p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">L&apos;Acheteur B2B / B2C</h1>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
          Même interface pour grossiste (B2B) et particulier (B2C) — seuls les documents d&apos;inscription diffèrent (RCCM, patente pour B2B).
        </p>
      </header>

      <div className="flex-1 overflow-y-auto py-5 space-y-6 min-h-0">
        <section className="p-4 rounded-xl bg-orange-500/10 border border-orange-500/30">
          <div className="flex items-start gap-2">
            <Wallet size={18} className="text-orange-500 shrink-0 mt-0.5" />
            <div>
              <p className="text-sm font-bold text-orange-600 dark:text-orange-400">Paiement P2P direct</p>
              <p className="text-xs text-slate-600 dark:text-white/50 mt-1">
                L&apos;acheteur paie le producteur sur Wave / OM / MTN — lien affiché sur le lot. L&apos;OCPV ne séquestre pas les fonds.
              </p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-3">Parcours mockup</h2>
          <ul className="text-xs text-slate-600 dark:text-white/55 space-y-1.5 list-disc list-inside">
            <li>Catalogue certifié · filtres région / hub / ville</li>
            <li>Panier · favoris · paiement producteur</li>
            <li>Upload preuve MM + référence → hub OCPV</li>
            <li>Aucun match → intention d&apos;achat (textarea / voix)</li>
            <li>Transporteurs · contact direct hors plateforme</li>
            <li>Historique CP · APE · taxes</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">Fonctionnalités</h2>
          <div className="space-y-2">
            {[
              { icon: Package, title: 'Catalogue lots OCPV', detail: 'Lots tracés depuis la déclaration producteur jusqu\'à la vente.' },
              { icon: Receipt, title: 'Preuve au hub', detail: 'PDF/image reçu MM + référence · timer 24 h (CDC §3.4).' },
              { icon: Truck, title: 'Annuaire transporteurs', detail: 'Mise en relation · paiement fret hors plateforme.' },
              { icon: FileText, title: 'Reçus CP / APE', detail: 'Historique fiscal OCPV téléchargeable.' },
            ].map(({ icon: Icon, title, detail }) => (
              <div key={title} className="flex gap-3 p-3 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/10">
                <Icon size={16} className="text-orange-500 shrink-0 mt-0.5" />
                <div>
                  <h3 className="text-sm font-semibold text-slate-900 dark:text-white">{title}</h3>
                  <p className="text-xs text-slate-500 dark:text-white/50 mt-0.5">{detail}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        <section className="p-4 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/10">
          <div className="flex items-start gap-2">
            <Users size={16} className="text-orange-500 shrink-0" />
            <p className="text-xs text-slate-600 dark:text-white/50 leading-relaxed">
              Un transporteur qui souhaite acheter bascule sur un <strong>compte Acheteur</strong> distinct (même numéro, rôle RBAC différent).
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

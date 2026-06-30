import { Truck, DollarSign, MapPin, Package, Users } from 'lucide-react';
import imgCamion from '../../assets/camion.png';

export default function TransporterInfoPanel() {
  return (
    <div className="flex flex-col h-full min-h-0">
      <header className="shrink-0 pb-5 border-b border-slate-200 dark:border-white/10">
        <div className="flex items-center gap-3 mb-3">
          <div className="p-2.5 rounded-xl bg-orange-500/10 border border-orange-500/30">
            <img src={imgCamion} alt="" className="w-6 h-6 object-contain mix-blend-multiply dark:mix-blend-screen" draggable={false} />
          </div>
          <div>
            <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-orange-500">Aval · Transporteur</p>
            <h1 className="font-display text-2xl sm:text-3xl font-extrabold text-slate-900 dark:text-white">Le Transporteur</h1>
          </div>
        </div>
        <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed">
          Prestataire logistique sur la bourse intégrée. Paiement du fret <strong>hors plateforme</strong> — contact direct avec l&apos;acheteur.
        </p>
      </header>

      <div className="flex-1 overflow-y-auto py-5 space-y-6 min-h-0">
        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-3">Parcours mockup</h2>
          <ul className="text-xs text-slate-600 dark:text-white/55 space-y-1.5 list-disc list-inside">
            <li>Demandes de transport (acheteurs + OCPV)</li>
            <li>Publier disponibilité véhicule / zone</li>
            <li>Parc auto · tarifs (toggle dans le même écran)</li>
            <li>Marketplace en lecture seule → bascule compte Acheteur</li>
          </ul>
        </section>

        <section>
          <h2 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-2">Fonctionnalités</h2>
          <div className="space-y-2">
            {[
              { icon: MapPin, title: 'Lignes & tarifs', detail: 'Grilles par trajet (départ → arrivée).' },
              { icon: Truck, title: 'Disponibilités', detail: 'Publication camion dispo par zone et période.' },
              { icon: Package, title: 'Marketplace OCPV', detail: 'Consultation lots certifiés — achat via rôle Acheteur.' },
              { icon: DollarSign, title: 'Paiement direct', detail: 'Fret négocié et payé hors plateforme AGRILINK.' },
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
              RBAC : même numéro de téléphone possible, comptes Producteur / Acheteur / Transporteur séparés.
            </p>
          </div>
        </section>
      </div>
    </div>
  );
}

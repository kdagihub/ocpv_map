import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
  X,
  ArrowLeft,
  Users,
  Sparkles,
  ExternalLink,
  ChevronRight,
} from 'lucide-react';
import { BOUNDED_CONTEXTS } from './graphData';

const panelVariants = {
  hidden: { opacity: 0, x: 60, scale: 0.96 },
  visible: {
    opacity: 1,
    x: 0,
    scale: 1,
    transition: { type: 'spring', stiffness: 320, damping: 32 },
  },
  exit: { opacity: 0, x: 40, scale: 0.98, transition: { duration: 0.2 } },
};

const itemVariants = {
  hidden: { opacity: 0, y: 12 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.06, duration: 0.35 },
  }),
};

function FeatureCard({ feature, index, iconColor }) {
  const Icon = feature.icon;
  const inner = (
    <motion.div
      custom={index}
      variants={itemVariants}
      initial="hidden"
      animate="visible"
      className="group flex gap-3 p-4 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/10 hover:border-orange-500/40 transition-colors"
    >
      <div className={`shrink-0 p-2 h-fit rounded-lg bg-white dark:bg-white/5 border border-slate-200 dark:border-white/10 ${iconColor}`}>
        <Icon size={18} strokeWidth={1.75} />
      </div>
      <div className="min-w-0 flex-1">
        {feature.group && (
          <span className="text-[9px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-500/80">
            {feature.group}
          </span>
        )}
        <h4 className="text-sm font-semibold text-slate-900 dark:text-white mt-0.5">{feature.title}</h4>
        <p className="text-xs text-slate-500 dark:text-white/50 mt-1 leading-relaxed">{feature.detail}</p>
      </div>
      {feature.demo && (
        <ChevronRight size={14} className="text-orange-500/50 group-hover:text-orange-500 shrink-0 mt-1 transition-colors" />
      )}
    </motion.div>
  );

  if (feature.demo) return <Link to={feature.demo}>{inner}</Link>;
  return inner;
}

export default function NodeDetailPanel({ contextId, onClose }) {
  const ctx = BOUNDED_CONTEXTS[contextId];
  if (!ctx) return null;

  const Icon = ctx.icon;

  return (
    <AnimatePresence>
      <motion.div
        key={contextId}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 z-50 flex items-stretch justify-end"
      >
        <button
          type="button"
          aria-label="Fermer"
          onClick={onClose}
          className="absolute inset-0 bg-black/40 dark:bg-black/70"
        />

        <motion.aside
          variants={panelVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className={`
            relative w-full max-w-lg m-3 sm:m-4 rounded-2xl overflow-hidden
            border ${ctx.border} bg-white dark:bg-[#1a1a1a] shadow-2xl ${ctx.glow}
            flex flex-col max-h-[calc(100vh-1.5rem)]
          `}
        >
          <div className="relative flex flex-col h-full min-h-0">
            <header className="shrink-0 p-6 pb-4 border-b border-slate-200 dark:border-white/10">
              <div className="flex items-start justify-between gap-4">
                <div className="flex items-center gap-4">
                  <div className={`p-3 rounded-2xl border border-slate-200 dark:border-white/10 ${ctx.logoSrc ? 'bg-white dark:bg-white px-2.5' : `bg-slate-100 dark:bg-white/5 ${ctx.iconColor}`}`}>
                    {ctx.logoSrc ? (
                      <img
                        src={ctx.logoSrc}
                        alt="OCPV"
                        className="h-10 w-auto object-contain"
                        draggable={false}
                      />
                    ) : (
                      <Icon size={32} strokeWidth={1.5} />
                    )}
                  </div>
                  <div>
                    <p className={`text-[10px] font-bold uppercase tracking-[0.25em] ${ctx.badgeColor}`}>
                      {ctx.badge}
                    </p>
                    <h2 className="font-display text-2xl font-extrabold text-slate-900 dark:text-white">
                      {ctx.title}
                    </h2>
                    <p className="text-sm text-slate-500 dark:text-white/50 mt-1">{ctx.tagline}</p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={onClose}
                  className="p-2 rounded-lg text-slate-400 dark:text-white/40 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/10 transition-colors"
                >
                  <X size={20} />
                </button>
              </div>
              <p className="mt-4 text-sm text-slate-600 dark:text-white/60 leading-relaxed">{ctx.description}</p>
            </header>

            <div className="flex-1 overflow-y-auto p-6 space-y-6 min-h-0">
              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Users size={14} className="text-green-600 dark:text-green-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
                    Acteurs
                  </h3>
                </div>
                <div className="flex flex-wrap gap-2">
                  {ctx.actors.map((actor, i) => {
                    const ActorIcon = actor.icon;
                    return (
                      <motion.div
                        key={actor.label}
                        custom={i}
                        variants={itemVariants}
                        initial="hidden"
                        animate="visible"
                        className="flex items-center gap-2 px-3 py-2 rounded-xl bg-slate-50 dark:bg-[#121212] border border-slate-200 dark:border-white/10"
                        title={actor.detail}
                      >
                        <ActorIcon size={14} className="text-green-600 dark:text-green-500" />
                        <span className="text-xs font-medium text-slate-700 dark:text-white/80">{actor.label}</span>
                      </motion.div>
                    );
                  })}
                </div>
              </section>

              <section>
                <div className="flex items-center gap-2 mb-3">
                  <Sparkles size={14} className="text-orange-500" />
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40">
                    Fonctionnalités clés
                  </h3>
                </div>
                <div className="space-y-2">
                  {ctx.features.map((feature, i) => (
                    <FeatureCard key={feature.title} feature={feature} index={i + 1} iconColor={ctx.iconColor} />
                  ))}
                </div>
              </section>

              {ctx.demoLinks.length > 0 && (
                <section>
                  <h3 className="text-xs font-bold uppercase tracking-widest text-slate-400 dark:text-white/40 mb-3">
                    Démos interactives
                  </h3>
                  <div className="grid gap-2">
                    {ctx.demoLinks.map((link) => (
                      <Link
                        key={link.path}
                        to={link.path}
                        className="flex items-center justify-between px-4 py-3 rounded-xl bg-orange-500/10 border border-orange-500/40 text-orange-600 dark:text-orange-400 hover:bg-orange-500/20 transition-colors text-sm font-medium"
                      >
                        {link.label}
                        <ExternalLink size={14} />
                      </Link>
                    ))}
                  </div>
                </section>
              )}
            </div>

            <footer className="shrink-0 p-4 border-t border-slate-200 dark:border-white/10">
              <button
                type="button"
                onClick={onClose}
                className="w-full flex items-center justify-center gap-2 px-4 py-3 rounded-xl bg-slate-100 dark:bg-white/5 border border-slate-200 dark:border-white/15 text-slate-800 dark:text-white hover:bg-slate-200 dark:hover:bg-white/10 transition-colors text-sm font-semibold"
              >
                <ArrowLeft size={16} className="text-orange-500" />
                Retour à la vue globale
              </button>
            </footer>
          </div>
        </motion.aside>
      </motion.div>
    </AnimatePresence>
  );
}

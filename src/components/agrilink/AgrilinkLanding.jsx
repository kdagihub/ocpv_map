import { useState, useCallback } from 'react';
import { ReactFlowProvider } from '@xyflow/react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { Building2, Layers } from 'lucide-react';

import logoOcpv from '../../assets/logo_ocpv.png';
import FlowCanvas from './FlowCanvas';
import NodeDetailPanel from './NodeDetailPanel';
import ThemeToggle from './ThemeToggle';

const heroVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: { delay: i * 0.12, duration: 0.7, ease: [0.22, 1, 0.36, 1] },
  }),
};

function AgrilinkLandingInner() {
  const [selectedId, setSelectedId] = useState(null);
  const handleClose = useCallback(() => setSelectedId(null), []);

  return (
    <>
      <header className="fixed top-0 left-0 right-0 z-40 border-b border-slate-200 dark:border-white/5 bg-slate-50/95 dark:bg-[#121212]/95 backdrop-blur-md shadow-sm dark:shadow-none">
        <div className="flex items-center justify-between px-6 py-4 max-w-7xl mx-auto">
          <div className="flex items-center gap-3">
            <img
              src={logoOcpv}
              alt="OCPV — Office d'Aide à la Commercialisation des Produits Vivriers"
              className="h-8 sm:h-10 w-auto rounded-md bg-white px-1.5 py-0.5"
              draggable={false}
            />
            <span className="text-xs font-semibold text-slate-500 dark:text-white/50 tracking-wide hidden sm:inline">
              Office d'aide à la Commercialisation des Produits Vivriers
            </span>
          </div>
          <nav className="flex items-center gap-2">
            <ThemeToggle />
            <Link
              to="/dashboard-hub"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs font-bold text-green-700 dark:text-green-400 bg-green-50 dark:bg-green-500/10 border border-green-200 dark:border-green-500/20 transition-colors"
            >
              <Building2 size={13} />
              <span className="hidden sm:inline">Agent Hub</span>
            </Link>
            <Link
              to="/architecture-v1"
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg text-xs text-slate-500 dark:text-white/50 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-white/5 border border-transparent hover:border-slate-200 dark:hover:border-white/10 transition-colors"
            >
              <Layers size={13} className="text-orange-500" />
              <span className="hidden sm:inline">Démo CP/APE v1</span>
            </Link>
          </nav>
        </div>
      </header>

      <div className="min-h-screen bg-slate-50 text-slate-900 dark:bg-[#121212] dark:text-white transition-colors duration-300 pt-[4.5rem]">
      <main className="relative z-10 max-w-7xl mx-auto px-6 pb-16">
        <section className="pt-8 pb-10 text-center">
          <motion.h1
            custom={0}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="font-display text-5xl sm:text-6xl md:text-7xl font-extrabold tracking-tight text-slate-900 dark:text-white"
          >
            AGRILINK
            <span className="text-orange-500">-CI</span>
          </motion.h1>

          <motion.p
            custom={1}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-5 max-w-3xl mx-auto text-base sm:text-lg text-slate-600 dark:text-white/55 leading-relaxed font-light"
          >
            Modernisation des systèmes de commercialisation des produits vivriers&nbsp;:
            plateforme de digitalisation, sécurisation des flux et pilotage stratégique de
            l&apos;OCPV.
          </motion.p>

          <motion.div
            custom={2}
            variants={heroVariants}
            initial="hidden"
            animate="visible"
            className="mt-8 flex flex-wrap justify-center gap-3"
          >
            {[
              { label: '3 Bounded Contexts', value: 'Amont · OCPV · Aval', color: 'text-green-600 dark:text-green-500' },
              { label: '31 régions', value: 'Couverture nationale', color: 'text-orange-500' },
              { label: 'Tiers de confiance', value: 'Régulation & séquestre P2P', color: 'text-slate-700 dark:text-white' },
            ].map((stat) => (
              <div
                key={stat.label}
                className="px-4 py-2.5 rounded-xl bg-white dark:bg-[#1a1a1a] border border-slate-200 dark:border-white/10 shadow-sm dark:shadow-none"
              >
                <p className="text-[9px] uppercase tracking-widest text-slate-400 dark:text-white/35">{stat.label}</p>
                <p className={`text-xs font-semibold mt-0.5 ${stat.color}`}>{stat.value}</p>
              </div>
            ))}
          </motion.div>
        </section>

        <motion.section
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-sm font-bold uppercase tracking-[0.2em] text-orange-600 dark:text-orange-500/80">
              Cartographie interactive
            </h2>
            <div className="h-px flex-1 mx-4 bg-slate-200 dark:bg-white/10" />
          </div>

          <FlowCanvas selectedId={selectedId} onNodeSelect={setSelectedId} />
        </motion.section>

        <motion.footer
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.9 }}
          className="mt-12 text-center text-[11px] text-slate-400 dark:text-white/25"
        >
          Office d&apos;Aide à la Commercialisation des Produits Vivriers · CIACEMS Technologies
        </motion.footer>
      </main>

      {selectedId && (
        <NodeDetailPanel contextId={selectedId} onClose={handleClose} />
      )}
      </div>
    </>
  );
}

export default function AgrilinkLanding() {
  return (
    <ReactFlowProvider>
      <AgrilinkLandingInner />
    </ReactFlowProvider>
  );
}

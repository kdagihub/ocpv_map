import { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { motion } from 'framer-motion';
import { ChevronRight } from 'lucide-react';
import { BOUNDED_CONTEXTS } from './graphData';

const handleBase =
  '!w-2 !h-2 !border-2 !border-slate-50 dark:!border-[#121212]';

function FlowHandle({ id, type, position, top, left, color = 'orange' }) {
  const bg = color === 'green' ? '!bg-green-500' : '!bg-orange-500';
  return (
    <Handle
      id={id}
      type={type}
      position={position}
      style={{ top, left }}
      className={`${handleBase} ${bg}`}
    />
  );
}

function BoundedContextNode({ data, selected }) {
  const ctx = BOUNDED_CONTEXTS[data.contextId];
  if (!ctx) return null;

  const Icon = ctx.icon;
  const isHub = data.isHub;
  const dimmed = data.dimmed;

  return (
    <>
      {/* Flux vivrier (orange) — côtés hauts */}
      <FlowHandle id="in-left" type="target" position={Position.Left} top="32%" color="orange" />
      <FlowHandle id="out-right" type="source" position={Position.Right} top="32%" color="orange" />

      {/* Flux financier (vert) — côtés bas / latéraux décalés */}
      <FlowHandle id="in-bottom" type="target" position={Position.Bottom} left="42%" color="green" />
      <FlowHandle id="out-bottom" type="source" position={Position.Bottom} left="58%" color="green" />
      <FlowHandle id="in-right-low" type="target" position={Position.Right} top="72%" color="green" />
      <FlowHandle id="out-left-mid" type="source" position={Position.Left} top="58%" color="green" />

      <motion.div
        whileHover={dimmed ? {} : { scale: 1.02 }}
        animate={{
          opacity: dimmed ? 0.25 : 1,
          scale: dimmed ? 0.95 : 1,
        }}
        transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
        className={`
          relative cursor-grab active:cursor-grabbing select-none agrilink-node-card
          w-[260px] rounded-2xl border shadow-md dark:shadow-lg
          ${ctx.cardBg}
          ${ctx.border}
          ${selected ? `ring-2 ${ctx.ring} shadow-2xl ${ctx.glow}` : ''}
          ${isHub ? 'w-[300px]' : ''}
        `}
      >
        {isHub && (
          <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-3 py-0.5 rounded-full bg-orange-500/15 border border-orange-500/50 text-[10px] font-bold uppercase tracking-widest text-orange-600 dark:text-orange-400 whitespace-nowrap">
            Tiers de confiance
          </div>
        )}

        <div className="p-5">
          <div className="flex items-start justify-between gap-3 mb-3">
            <div className="flex items-center gap-3">
              <div className={`p-2.5 rounded-xl bg-slate-100 border border-slate-200 dark:bg-white/5 dark:border-white/10 ${ctx.logoSrc ? 'bg-white dark:bg-white px-2' : ctx.iconColor}`}>
                {ctx.logoSrc ? (
                  <img
                    src={ctx.logoSrc}
                    alt="OCPV"
                    className={`${isHub ? 'h-9' : 'h-7'} w-auto object-contain`}
                    draggable={false}
                  />
                ) : (
                  <Icon size={isHub ? 28 : 22} strokeWidth={1.75} />
                )}
              </div>
              <div>
                <p className={`text-[10px] font-bold uppercase tracking-[0.2em] ${ctx.badgeColor}`}>
                  {ctx.badge}
                </p>
                <h3 className={`font-display font-extrabold text-slate-900 dark:text-white leading-tight ${isHub ? 'text-xl' : 'text-lg'}`}>
                  {ctx.title}
                </h3>
              </div>
            </div>
            <ChevronRight size={16} className="text-orange-500/70 mt-1 shrink-0" />
          </div>

          <p className="text-sm text-slate-600 dark:text-white/60 leading-relaxed line-clamp-2">
            {ctx.tagline}
          </p>

          <div className="mt-4 flex items-center gap-2">
            <span className="text-[10px] text-orange-600 dark:text-orange-400/90 font-medium">
              Cliquer pour explorer
            </span>
            <div className="flex-1 h-px bg-slate-200 dark:bg-white/10" />
          </div>
        </div>
      </motion.div>
    </>
  );
}

export default memo(BoundedContextNode);

import { useCallback, useEffect, useMemo } from 'react';
import {
  ReactFlow,
  Background,
  useNodesState,
  useEdgesState,
  useReactFlow,
} from '@xyflow/react';
import { RotateCcw } from 'lucide-react';
import '@xyflow/react/dist/style.css';

import BoundedContextNode from './BoundedContextNode';
import AnimatedFlowEdge from './AnimatedFlowEdge';
import { INITIAL_NODES, INITIAL_EDGES } from './graphData';
import { useTheme } from '../../context/ThemeContext';

const nodeTypes = { boundedContext: BoundedContextNode };
const edgeTypes = { animatedFlow: AnimatedFlowEdge };

function FlowCanvasInner({ selectedId, onNodeSelect }) {
  const { isDark } = useTheme();
  const { fitView } = useReactFlow();
  const [nodes, setNodes, onNodesChange] = useNodesState(INITIAL_NODES);
  const [edges, , onEdgesChange] = useEdgesState(INITIAL_EDGES);

  useEffect(() => {
    fitView({ padding: 0.32, maxZoom: 1 });
  }, [fitView]);

  const onNodeClick = useCallback(
    (_, node) => {
      onNodeSelect(node.data.contextId);
    },
    [onNodeSelect],
  );

  const handleResetLayout = useCallback(() => {
    setNodes(INITIAL_NODES.map((n) => ({ ...n })));
    requestAnimationFrame(() => fitView({ padding: 0.32, maxZoom: 1, duration: 400 }));
  }, [setNodes, fitView]);

  const styledNodes = useMemo(
    () =>
      nodes.map((n) => ({
        ...n,
        draggable: !selectedId,
        selected: n.data.contextId === selectedId,
        data: {
          ...n.data,
          dimmed: !!selectedId && n.data.contextId !== selectedId,
        },
      })),
    [nodes, selectedId],
  );

  const dimmed = !!selectedId;

  return (
    <div
      className={`relative w-full h-[min(560px,62vh)] min-h-[420px] rounded-2xl border border-slate-200 dark:border-white/10 bg-white dark:bg-[#1a1a1a] overflow-hidden transition-all duration-500 shadow-sm dark:shadow-none ${
        dimmed ? 'opacity-50 scale-[0.98]' : ''
      }`}
    >
      <ReactFlow
        nodes={styledNodes}
        edges={edges}
        onNodesChange={onNodesChange}
        onEdgesChange={onEdgesChange}
        onNodeClick={onNodeClick}
        nodeTypes={nodeTypes}
        edgeTypes={edgeTypes}
        minZoom={0.35}
        maxZoom={1.5}
        nodesDraggable
        nodesConnectable={false}
        elementsSelectable={false}
        panOnDrag
        panOnScroll={false}
        zoomOnScroll
        zoomOnPinch
        preventScrolling={false}
        proOptions={{ hideAttribution: true }}
        className="agrilink-flow"
      >
        <Background
          color={isDark ? '#ffffff' : '#0f172a'}
          gap={28}
          size={1}
          style={{ opacity: isDark ? 0.04 : 0.06 }}
        />
      </ReactFlow>

      <button
        type="button"
        onClick={handleResetLayout}
        title="Réinitialiser la disposition"
        className="absolute top-3 right-3 z-10 flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg text-[10px] font-medium
          text-slate-500 dark:text-white/50 bg-white/90 dark:bg-[#1a1a1a]/90
          border border-slate-200 dark:border-white/10 shadow-sm
          hover:text-orange-600 dark:hover:text-orange-400 hover:border-orange-500/40 transition-colors"
      >
        <RotateCcw size={12} />
        <span className="hidden sm:inline">Réinitialiser</span>
      </button>

      <div className="absolute bottom-3 left-1/2 -translate-x-1/2 pointer-events-none z-10 text-center">
        <div className="flex items-center justify-center gap-4 mb-1">
          <span className="flex items-center gap-1.5 text-[9px] text-slate-500 dark:text-white/40">
            <span className="w-4 h-0.5 bg-orange-500 rounded" /> Flux vivrier
          </span>
          <span className="flex items-center gap-1.5 text-[9px] text-slate-500 dark:text-white/40">
            <span className="w-4 h-0.5 bg-green-500 rounded border-dashed" style={{ borderTop: '1px dashed #22c55e' }} /> Flux financier
          </span>
        </div>
        <p className="text-[10px] text-slate-400 dark:text-white/30 uppercase tracking-[0.2em]">
          Glissez les cartes · Molette pour zoomer
        </p>
        <p className="text-[9px] text-slate-400/70 dark:text-white/20 mt-0.5 normal-case tracking-normal">
          Cliquez sur une carte pour explorer
        </p>
      </div>
    </div>
  );
}

export default function FlowCanvas(props) {
  return <FlowCanvasInner {...props} />;
}

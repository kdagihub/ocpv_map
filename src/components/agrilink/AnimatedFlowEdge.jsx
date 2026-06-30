import { memo } from 'react';
import { BaseEdge, getBezierPath, EdgeLabelRenderer } from '@xyflow/react';

/** Point sur le chemin SVG à la fraction t (0–1) */
function getPointOnPath(pathD, t) {
  if (typeof document === 'undefined') return null;
  const svg = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
  const path = document.createElementNS('http://www.w3.org/2000/svg', 'path');
  path.setAttribute('d', pathD);
  svg.appendChild(path);
  const len = path.getTotalLength();
  const point = path.getPointAtLength(len * t);
  return { x: point.x, y: point.y };
}

function AnimatedFlowEdge({
  id,
  data,
  sourceX,
  sourceY,
  targetX,
  targetY,
  sourcePosition,
  targetPosition,
  label,
  style = {},
  markerEnd,
}) {
  const isFinancial = data?.flow === 'financial';
  const strokeColor = isFinancial ? '#22c55e' : '#f97316';
  const particleColor = isFinancial ? '#22c55e' : '#f97316';

  const [edgePath, midX, midY] = getBezierPath({
    sourceX,
    sourceY,
    sourcePosition,
    targetX,
    targetY,
    targetPosition,
    curvature: data?.curvature ?? 0.25,
  });

  const t = data?.labelPosition ?? 0.5;
  const offsetX = data?.labelOffsetX ?? 0;
  const offsetY = data?.labelOffsetY ?? -28;

  const onPath = getPointOnPath(edgePath, t);
  const labelX = (onPath?.x ?? midX) + offsetX;
  const labelY = (onPath?.y ?? midY) + offsetY;

  const labelClass = isFinancial
    ? 'border-green-500/40 dark:border-green-500/30 text-green-700 dark:text-green-400'
    : 'border-orange-500/40 dark:border-orange-500/30 text-orange-600 dark:text-orange-400';

  return (
    <>
      <BaseEdge
        id={id}
        path={edgePath}
        markerEnd={markerEnd}
        style={{
          stroke: strokeColor,
          strokeWidth: isFinancial ? 1.75 : 2,
          strokeDasharray: isFinancial ? '5 5' : '8 4',
          animation: 'agrilink-dash 1.5s linear infinite',
          opacity: isFinancial ? 0.9 : 1,
          ...style,
        }}
      />
      <circle r="3.5" fill={particleColor} style={{ filter: `drop-shadow(0 0 4px ${particleColor})` }}>
        <animateMotion dur={isFinancial ? '3.5s' : '3s'} repeatCount="indefinite" path={edgePath} />
      </circle>
      {label && (
        <EdgeLabelRenderer>
          <div
            style={{
              position: 'absolute',
              transform: `translate(-50%, -50%) translate(${labelX}px,${labelY}px)`,
              pointerEvents: 'none',
            }}
            className={`agrilink-edge-label px-2.5 py-1 rounded-md bg-white dark:bg-[#1a1a1a] border text-[9px] font-semibold uppercase tracking-wider shadow-md whitespace-nowrap ${labelClass}`}
          >
            {label}
          </div>
        </EdgeLabelRenderer>
      )}
    </>
  );
}

export default memo(AnimatedFlowEdge);

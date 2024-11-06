import React from 'react';
import { Mercator } from '@visx/geo';
import { ParentSize } from '@visx/responsive';
import * as topojson from 'topojson-client';
import { ElectionData } from '../types';
import topology from '../data/us-topo.json';

interface Props {
  width: number;
  height: number;
  data: ElectionData;
  onStateClick: (stateId: string) => void;
}

function BaseMap({ width, height, data, onStateClick }: Props) {
  const centerX = width / 2;
  const centerY = height / 2;
  const scale = Math.min(width, height) * 1.2;

  const { features } = topojson.feature(
    topology as any,
    (topology as any).objects.states
  ) as any;

  const getColor = (stateId: string) => {
    const state = data[stateId];
    if (!state) return '#e5e7eb';
    
    switch (state.winner) {
      case 'democrat':
        return '#3b82f6';
      case 'republican':
        return '#ef4444';
      default:
        return '#e5e7eb';
    }
  };

  return (
    <svg width={width} height={height}>
      <rect width={width} height={height} fill="#f9fafb" rx={14} />
      <Mercator
        data={features}
        scale={scale}
        translate={[centerX, centerY]}
      >
        {(mercator) => (
          <g>
            {mercator.features.map(({ feature, path }, i) => (
              <path
                key={i}
                d={path || ''}
                fill={getColor(feature.id)}
                stroke="#fff"
                strokeWidth={0.5}
                onClick={() => onStateClick(feature.id)}
                className="cursor-pointer hover:opacity-80 transition-opacity"
              />
            ))}
          </g>
        )}
      </Mercator>
    </svg>
  );
}

export function USMap(props: Omit<Props, 'width' | 'height'>) {
  return (
    <ParentSize>
      {({ width, height }) => (
        <BaseMap width={width} height={height} {...props} />
      )}
    </ParentSize>
  );
}
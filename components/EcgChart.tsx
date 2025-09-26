import React from 'react';
import { LineChart, Line, YAxis, CartesianGrid, ResponsiveContainer, XAxis } from 'recharts';
import { HeartCondition } from '../types';
import { ECG_WAVEFORM_DATA } from '../constants';

interface EcgChartProps {
  condition: HeartCondition;
}

const CustomGrid: React.FC<any> = ({ width, height, x, y }) => {
  // Major grid lines
  const majorLines = [];
  for (let i = y; i <= y + height; i += 25) {
    majorLines.push(<line key={`major-h-${i}`} x1={x} y1={i} x2={x + width} y2={i} stroke="rgba(255, 80, 80, 0.2)" strokeWidth={1} />);
  }
  for (let i = x; i <= x + width; i += 25) {
    majorLines.push(<line key={`major-v-${i}`} x1={i} y1={y} x2={i} y2={y + height} stroke="rgba(255, 80, 80, 0.2)" strokeWidth={1} />);
  }
  
  // Minor grid lines
  const minorLines = [];
  for (let i = y; i <= y + height; i += 5) {
    minorLines.push(<line key={`minor-h-${i}`} x1={x} y1={i} x2={x + width} y2={i} stroke="rgba(255, 80, 80, 0.1)" strokeWidth={1} />);
  }
  for (let i = x; i <= x + width; i += 5) {
    minorLines.push(<line key={`minor-v-${i}`} x1={i} y1={y} x2={i} y2={y + height} stroke="rgba(255, 80, 80, 0.1)" strokeWidth={1} />);
  }
  
  return (
    <g>
      {minorLines}
      {majorLines}
    </g>
  );
};

export const EcgChart: React.FC<EcgChartProps> = React.memo(function EcgChart({ condition }) {
  const data = ECG_WAVEFORM_DATA[condition];

  return (
    <div className="w-full h-48 sm:h-64 lg:h-full relative">
       <div className="absolute top-2 left-4 z-10 font-mono text-ecg-line">
            <p className="text-sm">II</p>
       </div>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data}>
          <CartesianGrid content={<CustomGrid />} />
          <YAxis domain={[-2, 2]} hide={true} />
          <XAxis dataKey="time" hide={true} />
          <Line
            type="monotone"
            dataKey="value"
            stroke="hsl(120, 100%, 60%)"
            strokeWidth={2}
            dot={false}
            isAnimationActive={false}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
});
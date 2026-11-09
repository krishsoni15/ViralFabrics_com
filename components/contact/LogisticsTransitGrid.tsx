import React from 'react';
import { Plane, Anchor, TrainTrack } from 'lucide-react';

export interface TransitHub {
  title: string;
  detail: string;
  icon: React.ComponentType<{ className?: string }>;
}

const TRANSIT_HUBS: TransitHub[] = [
  {
    title: 'Surat Airport (STV)',
    detail: '14 km • 25 mins direct via Ring Road',
    icon: Plane,
  },
  {
    title: 'Hazira Ocean Port',
    detail: '25 km • Direct sea container sailings',
    icon: Anchor,
  },
  {
    title: 'Surat Railway Station',
    detail: '10 km • Overnight express from Mumbai',
    icon: TrainTrack,
  },
];

export const LogisticsTransitGrid: React.FC = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
      {TRANSIT_HUBS.map((hub) => {
        const Icon = hub.icon;
        return (
          <div
            key={hub.title}
            className="p-4 sm:p-5 rounded-2xl bg-white border border-[#D8E6F3] flex items-center gap-4 shadow-sm hover:shadow-md hover:-translate-y-1 hover:border-[#1665C1]/40 transition-all duration-300"
          >
            <div className="w-11 h-11 rounded-xl bg-[#EAF2F8] text-[#1665C1] flex items-center justify-center shrink-0">
              <Icon className="w-5 h-5 stroke-[2]" />
            </div>
            <div>
              <p className="font-sans text-[12px] font-bold text-[#113259] uppercase tracking-wide">
                {hub.title}
              </p>
              <p className="font-sans text-[11.5px] text-slate-600">{hub.detail}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
};


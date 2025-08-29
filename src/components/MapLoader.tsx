'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';
import { IAsset } from '@/models/Asset';

interface OptimalSite {
  name: string;
  location: { lat: number, lng: number };
  score: number;
  reasons: string[];
}

interface MapLoaderProps {
  assets: IAsset[];
  status: 'loading' | 'success' | 'error' | 'no-data';
  selectedAsset: IAsset | null;
  optimalSites: OptimalSite[];
}

export default function MapLoader({ assets, status, selectedAsset, optimalSites }: MapLoaderProps) {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => (
          <div className="h-full w-full flex items-center justify-center bg-gray-200">
            <p className="text-gray-700 text-lg">Initializing Map...</p>
          </div>
        ),
        ssr: false,
      }),
    []
  );

  return <div className="h-full w-full"><Map assets={assets} status={status} selectedAsset={selectedAsset} optimalSites={optimalSites} /></div>;
}
'use client';

import dynamic from 'next/dynamic';
import { useMemo } from 'react';

export default function MapLoader() {
  const Map = useMemo(
    () =>
      dynamic(() => import('@/components/Map'), {
        loading: () => (
            <div className="h-full w-full flex items-center justify-center">
                <p className="text-gray-700 text-lg">Loading Map...</p>
            </div>
        ),
        ssr: false,
      }),
    []
  );

  // Pass h-full down to the Map component
  return <div className="h-full w-full"><Map /></div>;
}
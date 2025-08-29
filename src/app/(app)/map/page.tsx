'use client';

import { useState, useEffect, useMemo } from 'react';
import MapLoader from "@/components/MapLoader";
import AssetSidebar from '@/components/AssetSidebar';
import { IAsset } from '@/models/Asset'; // Ensure this import is present

interface ApiResponse {
  success: boolean;
  data: IAsset[];
}

interface OptimalSite {
  name: string;
  location: { lat: number, lng: number };
  score: number;
  reasons: string[];
}

const ALL_ASSET_TYPES = ['Renewable', 'Hydrogen', 'Demand'];

export default function MapPage() {
  const [allAssets, setAllAssets] = useState<IAsset[]>([]);
  const [selectedAsset, setSelectedAsset] = useState<IAsset | null>(null);
  const [status, setStatus] = useState<'loading' | 'success' | 'error' | 'no-data'>('loading');
  const [filters, setFilters] = useState<string[]>(ALL_ASSET_TYPES);
  const [optimalSites, setOptimalSites] = useState<OptimalSite[]>([]);
  const [isAnalysisLoading, setIsAnalysisLoading] = useState(false);

  useEffect(() => {
    const fetchAssets = async () => {
      setStatus('loading');
      try {
        const response = await fetch('/api/assets');
        const result: ApiResponse = await response.json();
        if (result.success) {
          setAllAssets(result.data);
          setStatus(result.data.length > 0 ? 'success' : 'no-data');
        } else {
          setStatus('error');
        }
      } catch (error) {
        setStatus('error');
      }
    };
    fetchAssets();
  }, []);

  const handleFilterChange = (assetType: string) => {
    setFilters(prevFilters => {
      if (prevFilters.includes(assetType)) {
        return prevFilters.filter(f => f !== assetType);
      } else {
        return [...prevFilters, assetType];
      }
    });
  };

  const filteredAssets = useMemo(() => {
    // This correctly returns a variable of type IAsset[]
    return allAssets.filter(asset => filters.includes(asset.assetType));
  }, [allAssets, filters]);


  const handleAssetClick = (asset: IAsset) => {
    setSelectedAsset(asset);
  };

  const handleRunOptimization = async () => {
    setIsAnalysisLoading(true);
    setOptimalSites([]);
    try {
      const response = await fetch('/api/optimize');
      const result = await response.json();
      if (result.success) {
        setOptimalSites(result.data);
      }
    } catch (error) {
      console.error("Failed to run optimization:", error);
    } finally {
      setIsAnalysisLoading(false);
    }
  };

  return (
    <div className="flex h-full w-full">
      {(status === 'success' || status === 'no-data' || status === 'loading') && (
        <AssetSidebar
          assets={filteredAssets} // This is of type IAsset[]
          filters={filters}
          isAnalysisLoading={isAnalysisLoading}
          onAssetClick={handleAssetClick}
          onFilterChange={handleFilterChange}
          onRunOptimization={handleRunOptimization}
        />
      )}

      <div className="flex-grow h-full">
        <MapLoader
          assets={filteredAssets}
          status={status === 'loading' && allAssets.length === 0 ? 'loading' : 'success'}
          selectedAsset={selectedAsset}
          optimalSites={optimalSites}
        />
      </div>
    </div>
  );
}
'use client';

import { useState, useEffect, ChangeEvent } from 'react';
import { IAsset } from '@/models/Asset';
import ScoreGauge from '@/components/ScoreGauge';
import StatCard from '@/components/StatCard';

// Define the structure for our rich data
interface Metric { icon: string; label: string; value: string; unit: string; }
interface Analysis { name: string; score: number; metrics: Metric[]; distance?: number; }
interface ComparisonResult { isOptimal: boolean; userAssetProxyAnalysis: Analysis; bestSiteAnalysis: Analysis; }

export default function DashboardPage() {
    const [userAssets, setUserAssets] = useState<IAsset[]>([]);
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isComparing, setIsComparing] = useState(false);
    const [error, setError] = useState('');

    useEffect(() => {
        const fetchUserAssets = async () => {
            try {
                const response = await fetch('/api/assets');
                const result = await response.json();
                if (result.success) setUserAssets(result.data);
                else throw new Error('Failed to fetch user assets.');
            } catch (err) {
                setError('Could not load your assets. Please try again later.');
            } finally {
                setIsLoading(false);
            }
        };
        fetchUserAssets();
    }, []);

    const handleSelectChange = async (e: ChangeEvent<HTMLSelectElement>) => {
        const assetId = e.target.value;
        setSelectedAssetId(assetId);
        setComparisonResult(null);

        if (!assetId) return;

        const selectedAsset = userAssets.find(asset => (asset._id as string).toString() === assetId);
        if (!selectedAsset) return;

        setIsComparing(true);
        setError('');
        try {
            const response = await fetch('/api/compare-nearby', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({
                    latitude: selectedAsset.location.coordinates[1],
                    longitude: selectedAsset.location.coordinates[0],
                }),
            });
            const result = await response.json();
            if (result.success) {
                setComparisonResult(result.data);
            } else {
                setError('Could not perform comparison for this asset.');
            }
        } catch (err) {
            setError('An error occurred during comparison.');
        } finally {
            setIsComparing(false);
        }
    };

    if (isLoading) return <div className="p-8 text-center text-gray-600">Loading Your Assets...</div>;

    return (
        <div className=" min-h-full p-8  bg-gradient-to-tl from-gray-700 to-gray-400">
          <div className="max-w-7xl w-full mx-auto">
            <div className="mb-10 max-w-7xl mx-auto p-6 rounded-xl shadow-md bg-gradient-to-br from-gray-800 to-gray-700">
                <header className="text-center mb-10 bg-white/20 border py-4 border-white/30 rounded-xl">
                    <h1 className="text-4xl font-extrabold text-white tracking-tight">Analysis Dashboard</h1>
                    <p className="mt-2 text-lg text-white/80">
                    Compare your asset's potential against the nearest and best optimized zones.
                    </p>
                </header>

              
                  <label htmlFor="asset-select" className="block text-lg font-semibold text-white mb-2">
                      1. Select Your Asset to Analyze
                  </label>
                  <select id="asset-select" value={selectedAssetId} onChange={handleSelectChange} className="block w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                      <option value="" className="bg-gray-700 text-white">Choose an asset</option>
                      {userAssets.length > 0 ? (
                          userAssets.map(asset => (<option key={String(asset._id)} value={String(asset._id)} className="bg-gray-700 text-white">{asset.name}</option>))
                      ) : (<option disabled>You have no assets to compare. Add one first!</option>)}
                  </select>
              </div>

              {isComparing && <p className="text-center text-gray-800 font-semibold text-lg">Analyzing location...</p>}
              {error && <p className="text-center text-red-600 font-semibold">{error}</p>}

              {comparisonResult && (
                  comparisonResult.isOptimal ? (
                      <div className="bg-green-100 border-l-4 border-green-600 text-green-800 p-6 rounded-r-lg shadow-lg max-w-2xl mx-auto text-center">
                          <h2 className="font-bold text-2xl">🎉 Excellent Location!</h2>
                          <p className="mt-2 text-lg">Your asset is located within a prime optimization zone. The nearest high-potential site is <span className='font-semibold'>{comparisonResult.userAssetProxyAnalysis.name}</span>, only {comparisonResult.userAssetProxyAnalysis.distance} km away.</p>
                      </div>
                  ) : (
                      <div>
                          <h2 className="text-3xl font-bold text-white text-center mb-8">2. Comparison Result</h2>
                          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
                              {/* Your Asset Card */}
                              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border-t-4 border-blue-500">
                                  <h3 className="font-bold text-2xl text-white">Your Asset's Area Potential</h3>
                                  <p className="text-sm text-white/80 font-medium">Based on nearest data from: {comparisonResult.userAssetProxyAnalysis.name} (~{comparisonResult.userAssetProxyAnalysis.distance} km away)</p>
                                  <div className="flex flex-col items-center my-6">
                                      <ScoreGauge score={comparisonResult.userAssetProxyAnalysis.score} colorClass="text-blue-500"/>
                                      <p className="text-md text-white mt-2 font-semibold">Potential Score</p>
                                  </div>
                                  <div className="space-y-3">
                                    {comparisonResult.userAssetProxyAnalysis.metrics.map(metric => (
                                      <StatCard key={metric.label} {...metric} colorClass="text-blue-500"/>
                                    ))}
                                  </div>
                              </div>
                              {/* Recommended Optimal Site Card */}
                              <div className="bg-gradient-to-br from-gray-800 to-gray-700 p-6 rounded-xl shadow-lg border-t-4 border-green-500">
                                <h3 className="font-bold text-2xl text-white">Best Optimized Zone</h3>
                                <p className="text-sm text-white/80 font-medium">Top-rated location from dataset: {comparisonResult.bestSiteAnalysis.name}</p>
                                <div className="flex flex-col items-center my-6">
                                    <ScoreGauge score={comparisonResult.bestSiteAnalysis.score} colorClass="text-green-500"/>
                                    <p className="text-md text-white mt-2 font-semibold">Potential Score</p>
                                </div>
                                <div className="space-y-3">
                                  {comparisonResult.bestSiteAnalysis.metrics.map(metric => (
                                    <StatCard key={metric.label} {...metric} colorClass="text-green-500" />
                                  ))}
                                </div>
                                
                              </div>
                              <div className="col-span-2 bg-green-50 p-4 rounded-xl w-full">
                                  <h4 className="font-bold text-lg text-green-800">Recommendation</h4>
                                  <p className="text-green-900 mt-2 text-sm">
                                    While your area has potential, relocating or expanding towards the best-optimized zone could significantly improve performance due to superior environmental conditions.
                                  </p>
                              </div>
                          </div>
                      </div>
                  )
              )}
          </div>
        </div>
    );
}
'use client';

import { useState, ChangeEvent } from 'react';
import { IAsset } from '@/models/Asset';

interface OptimalSite {
  name: string;
  location: { lat: number, lng: number };
  score: number;
  reasons: string[];
}

interface ComparisonResult {
    userAsset: IAsset;
    bestSite: OptimalSite;
}

interface DashboardClientProps {
    userAssets: IAsset[];
    bestOptimizedSite: OptimalSite | null;
}

// This component handles all the user interaction (state, dropdowns, etc.)
export default function DashboardClient({ userAssets, bestOptimizedSite }: DashboardClientProps) {
    const [selectedAssetId, setSelectedAssetId] = useState<string>('');
    const [comparisonResult, setComparisonResult] = useState<ComparisonResult | null>(null);

    const handleSelectChange = (e: ChangeEvent<HTMLSelectElement>) => {
        const assetId = e.target.value;
        setSelectedAssetId(assetId);

        if (assetId && bestOptimizedSite) {
            const selected = userAssets.find(asset => (asset._id as string).toString() === assetId);
            if (selected) {
                setComparisonResult({ userAsset: selected, bestSite: bestOptimizedSite });
            }
        } else {
            setComparisonResult(null);
        }
    };

    return (
        <div className="bg-gray-50 flex-grow">
          <div className="container mx-auto px-6 py-12">
            <div className="max-w-4xl mx-auto">
                <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Asset Comparison Dashboard</h1>
                <p className="text-center text-gray-600 mb-8">
                  Select one of your saved assets to compare its potential against the top-performing location from our optimized dataset.
                </p>

                <div className="mb-10">
                    <label htmlFor="asset-select" className="block text-sm font-medium text-gray-700 mb-2">
                        Select Your Asset to Analyze:
                    </label>
                    <select
                        id="asset-select"
                        value={selectedAssetId}
                        onChange={handleSelectChange}
                        className="block w-full p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"
                    >
                        <option value="">-- Choose an asset --</option>
                        {userAssets.length > 0 ? (
                            userAssets.map(asset => (
                                <option key={(asset._id as string).toString()} value={(asset._id as string).toString()}>
                                    {asset.name}
                                </option>
                            ))
                        ) : (
                            <option disabled>You have no assets to compare. Add one first!</option>
                        )}
                    </select>
                </div>

                {comparisonResult && (
                    <div>
                        <h2 className="text-2xl font-bold text-gray-800 text-center mb-6">Comparison Result</h2>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                            <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
                                <h3 className="font-bold text-xl text-gray-800">Your Asset: {comparisonResult.userAsset.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Location: {comparisonResult.userAsset.location.coordinates[1].toFixed(2)}, {comparisonResult.userAsset.location.coordinates[0].toFixed(2)}
                                </p>
                                <p className="font-semibold text-lg text-blue-600">Potential Analysis:</p>
                                <p className="text-gray-700 mt-2">
                                    This tool analyzes your asset's location against key environmental factors. While specific data for this exact point isn't in our model, its viability depends on local conditions for solar, wind, and water.
                                </p>
                            </div>
                            <div className="bg-green-50 p-6 rounded-lg shadow-md border-2 border-green-500">
                                <h3 className="font-bold text-xl text-green-800">⭐ Recommended Optimal Site: {comparisonResult.bestSite.name}</h3>
                                <p className="text-sm text-gray-500 mb-4">
                                    Score: <span className="font-bold text-2xl text-green-600">{comparisonResult.bestSite.score}</span>
                                </p>
                                <p className="font-semibold text-lg text-green-700">Key Strengths:</p>
                                <ul className="list-disc list-inside mt-2 text-green-800">
                                    {comparisonResult.bestSite.reasons.map(reason => <li key={reason}>{reason}</li>)}
                                </ul>
                            </div>
                        </div>
                    </div>
                )}
            </div>
          </div>
        </div>
    );
}
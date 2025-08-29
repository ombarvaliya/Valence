'use client';
import { IAsset } from '@/models/Asset'; // Ensure this import is present

// This interface defines the expected types for the props
interface Props {
  assets: IAsset[]; // It expects an array of IAsset
  filters: string[];
  isAnalysisLoading: boolean;
  onAssetClick: (asset: IAsset) => void;
  onFilterChange: (assetType: string) => void;
  onRunOptimization: () => void;
}

const ASSET_TYPES = ['Renewable', 'Hydrogen', 'Demand'];

const AssetSidebar = ({ assets, filters, isAnalysisLoading, onAssetClick, onFilterChange, onRunOptimization }: Props) => {

  const getTypeColor = (assetType: IAsset['assetType']) => {
    const colors = {
      Renewable: 'bg-green-500',
      Hydrogen: 'bg-blue-500',
      Demand: 'bg-orange-500',
    };
    return colors[assetType] || 'bg-gray-500';
  };

  return (
    <aside className="bg-white w-full md:w-80 lg:w-96 p-4 shadow-lg z-10 overflow-y-auto h-full flex flex-col">
      <h2 className="text-2xl font-bold text-gray-800 mb-4">Controls</h2>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-700 mb-3">Filters</h3>
        <div className="space-y-2">
          {ASSET_TYPES.map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer">
              <input
                type="checkbox"
                checked={filters.includes(type)}
                onChange={() => onFilterChange(type)}
                className="h-5 w-5 rounded border-gray-300 text-green-600 focus:ring-green-500"
              />
              <span className="text-gray-800">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="mb-6 p-4 bg-gray-50 rounded-lg border">
        <h3 className="font-semibold text-gray-700 mb-3">Analysis</h3>
        <button
          onClick={onRunOptimization}
          disabled={isAnalysisLoading}
          className="w-full bg-green-600 text-white font-bold py-2 px-4 rounded-lg hover:bg-green-700 transition-colors disabled:bg-gray-400 disabled:cursor-not-allowed"
        >
          {isAnalysisLoading ? 'Analyzing...' : 'Find Optimal Zones'}
        </button>
      </div>

      <h2 className="text-xl font-bold text-gray-800 mb-4">Asset List</h2>
      <div className="space-y-3 flex-grow overflow-y-auto">
        {assets.length === 0 ? (
          <p className="text-gray-500">No assets match the current filters.</p>
        ) : (
          assets.map((asset) => (
            <div
              key={String(asset._id)}
              onClick={() => onAssetClick(asset)}
              className="p-3 bg-gray-50 rounded-lg shadow-sm hover:shadow-md hover:bg-gray-100 cursor-pointer transition-all border border-gray-200"
            >
              <div className="flex items-center space-x-3">
                <div className={`w-3 h-3 rounded-full ${getTypeColor(asset.assetType)}`}></div>
                <div>
                  <h3 className="font-semibold text-gray-900">{asset.name}</h3>
                  <p className="text-sm text-gray-600">{asset.assetType}</p>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default AssetSidebar;
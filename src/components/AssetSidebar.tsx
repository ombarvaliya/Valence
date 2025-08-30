'use client';
import { IAsset } from '@/models/Asset';

interface Props {
  assets: IAsset[];
  filters: string[];
  isAnalysisLoading: boolean;
  onAssetClick: (asset: IAsset) => void;
  onFilterChange: (assetType: string) => void;
  onRunOptimization: () => void;
}

const ASSET_TYPES = ['Renewable', 'Hydrogen', 'Demand'];

// AssetTypeBadge component with a color scheme matching the new theme
const AssetTypeBadge = ({ assetType }: { assetType: IAsset['assetType'] }) => {
  const typeStyles = {
    Renewable: 'bg-green-200 text-green-900',
    Hydrogen: 'bg-sky-200 text-sky-900', // Using sky for contrast
    Demand: 'bg-amber-200 text-amber-900',
  };

  return (
    <span className={`px-2 py-1 text-xs font-medium rounded-full ${typeStyles[assetType] || 'bg-gray-200 text-gray-800'}`}>
      {assetType}
    </span>
  );
};


const AssetSidebar = ({ assets, filters, isAnalysisLoading, onAssetClick, onFilterChange, onRunOptimization }: Props) => {
  return (
    // Main sidebar container with a dark teal background
    <aside className="bg-gray-800 text-slate-200 w-full md:w-80 lg:w-96 p-6 shadow-lg z-10 overflow-y-auto h-full flex flex-col space-y-8">

      {/* Section 1: Filters */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Filters</h3>
        <div className="space-y-3">
          {ASSET_TYPES.map((type) => (
            <label key={type} className="flex items-center space-x-3 cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.includes(type)}
                onChange={() => onFilterChange(type)}
                // Styled checkbox with a mint green accent
                className="h-5 w-5 rounded border-gray-600 bg-gray-700 text-green-500 focus:ring-green-500 focus:ring-2 focus:ring-offset-gray-800"
              />
              <span className="text-slate-300 group-hover:text-white transition-colors">{type}</span>
            </label>
          ))}
        </div>
      </div>

      <hr className="border-gray-700" />

      {/* Section 2: Analysis */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Analysis</h3>
        <button
          onClick={onRunOptimization}
          disabled={isAnalysisLoading}
          // Primary button with a vibrant green accent
          className="w-full bg-[#406D32] text-white font-bold py-2.5 px-4 rounded-lg hover:bg-[#406D32]/60 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2 focus:ring-offset-gray-800"
        >
          {isAnalysisLoading ? 'Analyzing...' : 'Find Optimal Zones'}
        </button>
      </div>

      <hr className="border-gray-700" />

      {/* Section 3: Asset List */}
      <div className="flex flex-col flex-grow min-h-0">
        <h2 className="text-lg font-bold text-white mb-4">Asset List</h2>
        <div className="space-y-2 flex-grow overflow-y-auto pr-2 -mr-2"> {/* Padding for scrollbar */}
          {assets.length === 0 ? (
            <p className="text-gray-400">No assets match the current filters.</p>
          ) : (
            assets.map((asset) => (
              <div
                key={String(asset._id)}
                onClick={() => onAssetClick(asset)}
                // Asset list items with a subtle hover effect
                className="p-4 bg-gray-700/50 rounded-lg hover:bg-gray-700 cursor-pointer transition-colors"
              >
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold text-white">{asset.name}</h3>
                  <AssetTypeBadge assetType={asset.assetType} />
                </div>
              </div>
            ))
          )}
        </div>
      </div>
    </aside>
  );
};

export default AssetSidebar;
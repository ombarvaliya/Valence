'use client';

import { useState, FormEvent } from 'react';
import { useRouter } from 'next/navigation';

export default function AddAssetPage() {
  // ... (all your useState hooks remain the same)
  const [name, setName] = useState('');
  const [assetType, setAssetType] = useState<'Renewable' | 'Hydrogen' | 'Demand'>('Renewable');
  const [latitude, setLatitude] = useState('');
  const [longitude, setLongitude] = useState('');
  const [capacity, setCapacity] = useState('');
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsError(false);
    setMessage('Submitting...');
    setIsSubmitting(true);

    const newAsset = {
      name,
      assetType,
      location: {
        type: 'Point',
        coordinates: [parseFloat(longitude), parseFloat(latitude)],
      },
      capacity,
    };

    try {
      const response = await fetch('/api/assets', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newAsset),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Asset added successfully! Redirecting...');
        setIsSubmitting(false);

        // --- THIS IS THE CRUCIAL FIX ---
        // 1. We push the user to the map page.
        router.push('/map');
        // 2. We then tell the router to refresh, which forces a new data fetch.
        router.refresh();

      } else {
        setIsError(true);
        setMessage(result.message || 'Failed to add asset.');
        setIsSubmitting(false);
      }
    } catch (error) {
      setIsError(true);
      setMessage('An error occurred. Please try again.');
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-gray-50 flex-grow">
      <div className="container mx-auto px-6 py-12">
        <div className="max-w-2xl mx-auto">
            <h1 className="text-3xl font-bold text-gray-800 mb-4 text-center">Add a New Asset</h1>
            <p className="text-center text-gray-600 mb-8">
              Contribute to the map by entering the details for new infrastructure.
            </p>

            <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md">
              {/* ... All your form inputs remain exactly the same ... */}
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700">Asset Name</label>
                <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500"/>
              </div>
              <div>
                <label htmlFor="assetType" className="block text-sm font-medium text-gray-700">Asset Type</label>
                <select id="assetType" value={assetType} onChange={(e) => setAssetType(e.target.value as any)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500">
                  <option value="Renewable">Renewable</option>
                  <option value="Hydrogen">Hydrogen</option>
                  <option value="Demand">Demand</option>
                </select>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude (North/South)</label>
                  <input type="number" step="any" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 23.0225"/>
                </div>
                <div>
                  <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude (East/West)</label>
                  <input type="number" step="any" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 72.5714"/>
                </div>
              </div>
              <div>
                <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity (Optional)</label>
                <input type="text" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="e.g., 50MW"/>
              </div>
              <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
                {isSubmitting ? 'Submitting...' : 'Add Asset'}
              </button>
              {message && <p className={`mt-4 text-center text-sm font-semibold ${isError ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
            </form>
        </div>
      </div>
    </div>
  );
}
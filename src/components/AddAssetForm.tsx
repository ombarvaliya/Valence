'use client';

import { useState, FormEvent } from 'react';

export default function AddAssetForm() {
  const [name, setName] = useState('');
  const [assetType, setAssetType] = useState<'Renewable' | 'Hydrogen' | 'Demand'>('Renewable');
  const [longitude, setLongitude] = useState('');
  const [latitude, setLatitude] = useState('');
  const [capacity, setCapacity] = useState('');
  
  const [message, setMessage] = useState('');
  const [isError, setIsError] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newAsset),
      });

      const result = await response.json();

      if (response.ok) {
        setMessage('Asset added successfully! You can now see it on the map.');
        // Clear form
        setName('');
        setAssetType('Renewable');
        setLongitude('');
        setLatitude('');
        setCapacity('');
      } else {
        setIsError(true);
        setMessage(result.message || 'Failed to add asset. Please check your inputs.');
      }
    } catch (error) {
      setIsError(true);
      setMessage('An error occurred. Please try again.');
    } finally {
        setIsSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6 bg-white p-8 rounded-lg shadow-md max-w-2xl mx-auto">
      <div>
        <label htmlFor="name" className="block text-sm font-medium text-gray-700">Asset Name</label>
        <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Solar Plant"/>
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
          <label htmlFor="longitude" className="block text-sm font-medium text-gray-700">Longitude</label>
          <input type="number" step="any" id="longitude" value={longitude} onChange={(e) => setLongitude(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="24.2229"/>
        </div>
        <div>
          <label htmlFor="latitude" className="block text-sm font-medium text-gray-700">Latitude</label>
          <input type="number" step="any" id="latitude" value={latitude} onChange={(e) => setLatitude(e.target.value)} required className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="69.6669"/>
        </div>
      </div>
      
      <div>
        <label htmlFor="capacity" className="block text-sm font-medium text-gray-700">Capacity (Optional)</label>
        <input type="text" id="capacity" value={capacity} onChange={(e) => setCapacity(e.target.value)} className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="150MW"/>
      </div>
      
      <button type="submit" disabled={isSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400 disabled:cursor-not-allowed">
        {isSubmitting ? 'Submitting...' : 'Add Asset'}
      </button>

      {message && (
        <p className={`mt-4 text-center text-sm ${isError ? 'text-red-600' : 'text-green-600'}`}>
          {message}
        </p>
      )}
    </form>
  );
}
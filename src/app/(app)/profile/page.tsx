import { getServerSession } from 'next-auth/next';
import { authOptions } from '@/app/api/auth/[...nextauth]/route';
import { getUserAssets } from '@/lib/data';
import { IAsset } from '@/models/Asset';
import Link from 'next/link';
import { redirect } from 'next/navigation';

export default async function ProfilePage() {
  const session = await getServerSession(authOptions);

  if (!session?.user?.id) {
    redirect('/login');
  }

  const userAssets: IAsset[] = await getUserAssets(session.user.id);

  const totalAssets = userAssets.length;
  const assetCounts = userAssets.reduce((acc, asset) => {
    acc[asset.assetType] = (acc[asset.assetType] || 0) + 1;
    return acc;
  }, { Renewable: 0, Hydrogen: 0, Demand: 0 });

  const recentAssets = userAssets
    // .sort((a, b) => new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime())
    .slice(0, 5); // Get the 5 most recent assets

  return (
    <div className="bg-gradient-to-tl from-gray-700 to-gray-400 min-h-full p-4 ">
      <div className="max-w-7xl mx-auto p-8 shadow-lg border border-0 rounded-xl bg-gradient-to-br from-gray-800 to-gray-700">
        <header className="mb-10">
          <div className="bg-white/20 border border-white/30 p-6 rounded-xl shadow-md flex items-center space-x-6">
            <div className="h-20 w-20 bg-[#406D32] rounded-full flex items-center justify-center text-white text-4xl font-bold">
              {session.user.name?.charAt(0).toUpperCase()}
            </div>
            <div>
              <h1 className="text-4xl font-extrabold text-white tracking-tight">{session.user.name}</h1>
              <p className="text-lg text-white/80">{session.user.email}</p>
            </div>
          </div>
        </header>

        <main>
          <section>
            <h2 className="text-2xl font-bold text-white mb-4">Your Asset Portfolio</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <div className="bg-indigo-100 p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800">Total Assets</h3>
                <p className="text-5xl font-extrabold text-gray-600 mt-2">{totalAssets}</p>
              </div>
              <div className="bg-green-100 p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800">Renewable</h3>
                <p className="text-5xl font-extrabold text-gray-600 mt-2">{assetCounts.Renewable}</p>
              </div>
              <div className="bg-sky-100 p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800">Hydrogen</h3>
                <p className="text-5xl font-extrabold text-gray-600 mt-2">{assetCounts.Hydrogen}</p>
              </div>
              <div className="bg-amber-100 p-6 rounded-xl shadow-md border border-white/30 flex flex-col items-center">
                <h3 className="text-xl font-bold text-gray-800">Demand</h3>
                <p className="text-5xl font-extrabold text-gray-600 mt-2">{assetCounts.Demand}</p>

              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="text-2xl font-bold text-white mb-4">Recent Activity</h2>
            <div className="bg-white/20 border border-white/30 p-6 rounded-xl shadow-md">
              {recentAssets.length > 0 ? (
                <ul className="divide-y divide-gray-200">
                  {recentAssets.map(asset => (
                    <li key={String(asset._id)} className="py-4 flex justify-between items-center">
                      <div>
                        <p className="text-lg font-semibold text-white">{asset.name}</p>
                        <p className="text-sm text-gray-400">{asset.assetType} - Added on {new Date().toLocaleDateString()}</p>
                      </div>
                      <Link href={`/map?assetId=${asset._id}`} className="text-green-900/60 hover:text-green-800 font-semibold">
                        View on Map →
                      </Link>
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="text-gray-500 text-center py-4">You haven't added any assets yet.</p>
              )}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
}
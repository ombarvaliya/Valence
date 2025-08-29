import Link from 'next/link';
import UserButton from './UserButton';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md z-20 relative">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/map" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
          Valence
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/map" className="hover:text-green-300 transition-colors hidden sm:block">Map</Link>
          <Link href="/dashboard" className="hover:text-green-300 transition-colors hidden sm:block">Dashboard</Link>
          {/* This link now points to the simple form */}
          <Link href="/add-asset" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Add Asset
          </Link>
          <UserButton />
        </nav>
      </div>
    </header>
  );
}
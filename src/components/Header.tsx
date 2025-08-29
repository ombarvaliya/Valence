import Link from 'next/link';
import UserButton from './UserButton';

export default function Header() {
  return (
    <header className="bg-gray-900 text-white shadow-md z-20 relative">
      <div className="container mx-auto px-6 py-4 flex justify-between items-center">
        <Link href="/map" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
          <img src="/public/ligo-withoutBg.png"></img>
        </Link>
        <nav className="flex items-center space-x-6">
          <Link href="/map" className="hover:text-green-300 transition-colors hidden sm:block">Map</Link>
          <Link href="/dashboard" className="hover:text-green-300 transition-colors hidden sm:block">Dashboard</Link>
          <Link href="/add-asset" className="hover:text-green-300 transition-colors hidden sm:block">Add Asset</Link>
          <UserButton />
        </nav>
      </div>
    </header>
  );
}
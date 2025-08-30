import Link from 'next/link';
import UserButton from './UserButton';

export default function Header() {
  return (
    <header className="bg-gray-800 p-2 border border-0 border-b-1 text-white z-20 relative flex flex-col items-center">
      <div className="max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto h-16 flex justify-between items-center">
        <div className="container mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/map" className="text-2xl font-bold text-green-400 hover:text-green-300 transition-colors">
            <img src="./logo-withoutBg.png" className="h-8"></img>
          </Link>
          <nav className="flex items-center space-x-6">
            <Link href="/map" className="hover:text-green-300 transition-colors hidden sm:block">Map</Link>
            <Link href="/dashboard" className="hover:text-green-300 transition-colors hidden sm:block">Dashboard</Link>
            <Link href="/add-asset" className="hover:text-green-300 transition-colors hidden sm:block">Add Asset</Link>
            <div className="h-10 border-l border-white/30"></div>
            <UserButton />
          </nav>
        </div>
      </div>
    </header>
  );
}
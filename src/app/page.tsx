import Link from 'next/link';

export default function LandingPage() {
  return (
    <div className="bg-gray-900 text-white min-h-screen flex flex-col">
      <header className="container mx-auto px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold text-green-400">Valence</h1>
        <nav className="space-x-4">
          <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
            Login
          </Link>
          <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
            Sign Up
          </Link>
        </nav>
      </header>
      <main className="flex-grow flex items-center">
        <div className="container mx-auto px-6 text-center">
          <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">
            The Future of <span className="text-green-400">Green Energy</span>, Mapped.
          </h2>
          <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-8">
            Valence is a cutting-edge platform providing data-driven intelligence to map, analyze, and optimize green hydrogen infrastructure.
          </p>
          <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">
            Get Started for Free
          </Link>
        </div>
      </main>
      <footer className="container mx-auto px-6 py-4 text-center text-gray-500 text-sm">
        &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
      </footer>
    </div>
  );
}
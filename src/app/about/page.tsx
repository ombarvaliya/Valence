import Link from 'next/link';
import Image from 'next/image';

export default function AboutPage() {
  return (
    <div className="min-h-screen flex flex-col bg-[#192313] text-white">
      {/* Consistent Public Header */}
      <div className="p-2">
        <header className="fixed top-2 z-50 w-full max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm">
          <Link href="/">
            <Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} />
          </Link>
          <nav className="space-x-6 flex items-center">
            <Link href="/about" className="text-green-400 font-semibold transition-colors hover:text-white">
              About Us
            </Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Sign Up
            </Link>
          </nav>
        </header>
      </div>

      {/* Main Content */}
      <main className="flex-grow">
        {/* Hero Section */}
        <div className="bg-[url('/bgImg.png')] bg-cover bg-center text-center py-40 px-6">
          <h1 className="text-5xl md:text-7xl font-extrabold leading-tight">
            About <span className="text-green-400">Valence</span>
          </h1>
          <p className="mt-4 text-lg md:text-xl text-gray-300 max-w-3xl mx-auto">
            We're a team of innovators passionate about leveraging technology to build a sustainable energy future.
          </p>
        </div>

        {/* Content Sections */}
        <section className="py-20 px-6 w-full bg-gradient-to-b from-[#2D4323] to-[#192313]">
          <div className="max-w-5xl mx-auto space-y-12">

            {/* Our Mission Card */}
            <div className="bg-white/10 p-10 border border-white/30 rounded-xl text-center">
              <h2 className="text-3xl font-bold text-green-500">Our Mission</h2>
              <p className="mt-4 text-lg text-gray-200 leading-relaxed">
                To accelerate the global transition to green hydrogen by providing a powerful, intuitive, and data-centric platform. We empower planners, investors, and policymakers to make informed decisions that optimize the placement and development of critical hydrogen infrastructure, replacing speculation with strategy.
              </p>
            </div>

            {/* Our Story Card */}
            <div className="bg-white/10 p-10 border border-white/30 rounded-xl text-center">
              <h2 className="text-3xl font-bold text-green-500">Our Story</h2>
              <p className="mt-4 text-lg text-gray-200 leading-relaxed">
                Valence was born from a shared passion for technology and a sustainable future. What started as a group project quickly evolved into a mission: to create a tool that could genuinely contribute to the clean energy transition. We are a team led by <span className="font-semibold text-white">Vandan Kambodi</span>, driven by the challenge of solving real-world problems. This platform is the result of countless hours of collaboration, coding, and a firm belief that data, when visualized effectively, can change the world.
              </p>
            </div>

          </div>
        </section>
      </main>

      <footer className="bg-[#192313] py-8 text-center text-gray-400 text-sm">
        &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
      </footer>
    </div>
  );
}
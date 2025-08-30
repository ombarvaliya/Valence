'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';

export default function PublicLayout({ children }: { children: React.ReactNode }) {
  const { scrollY } = useScroll();
  const [scrolled, setScrolled] = useState(false);

  useMotionValueEvent(scrollY, "change", (latest) => {
    setScrolled(latest > 50);
  });

  return (
    <div className="min-h-screen flex flex-col bg-[#121A0E] text-white">
      <motion.header
        className="fixed top-0 z-50 w-full p-2 transition-colors duration-300"
        animate={{ 
          backgroundColor: scrolled ? 'rgba(18, 26, 14, 0.8)' : 'rgba(18, 26, 14, 0)',
        }}
      >
        <div
          className="max-w-7xl bg-white/5 border rounded-xl border-white/20 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm transition-shadow duration-300"
          style={{
            boxShadow: scrolled ? '0 4px 30px rgba(0, 0, 0, 0.1)' : 'none',
          }}
        >
          <Link href="/">
            <Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} />
          </Link>
          <nav className="space-x-6 flex items-center">
            <Link href="/about" className="text-gray-200 hover:text-white font-semibold transition-colors">
              About Us
            </Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">
              Contact Us
            </Link>
            {/* --- YOUR CORRECTED AUTH LINKS --- */}
            <Link href="/auth?mode=login" className="text-gray-300 hover:text-white transition-colors">
              Login
            </Link>
            <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-2 px-4 rounded-lg transition-colors">
              Sign Up
            </Link>
          </nav>
        </div>
      </motion.header>

      <main className="flex-grow">
        {children}
      </main>

      <footer className="bg-gradient-to-t from-[#192313] to-[#121A0E] py-8 text-center text-gray-400 text-sm border-t border-white/10">
        &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
      </footer>
    </div>
  );
}
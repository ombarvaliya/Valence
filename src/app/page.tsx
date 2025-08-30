'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

// --- Professional SVG Icon Components (Replaces Emojis) ---
const ProblemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const SolutionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-2h2v-2h2v-2h2v2h2v2h2a6 6 0 017-7z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.002 3.002 0 015.288 0M12 14a4 4 0 100-8 4 4 0 000 8z" /></svg>;
const ImpactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 11l-.244-1.463a2 2 0 011.944-2.366L12 7l2.563-.199a2 2 0 011.944 2.366L16.263 11m-8.526 0l-1.313 7.879A2 2 0 007.879 21h8.242a2 2 0 001.944-2.121L16.263 11" /></svg>;

export default function LandingPage() {
  // Variants for staggering grid animations
  const gridContainerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const gridItemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <div className="min-h-screen flex flex-col bg-[#192313] text-white">
      <div className="p-2 bg-[url('/bgImg.png')] bg-cover bg-center min-h-screen flex flex-col items-center">
        <header className="fixed top-2 z-50 w-full max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm">
          <Link href="/"><Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} /></Link>
          <nav className="space-x-6 flex items-center">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/auth?mode=login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white/80 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</Link>
          </nav>
        </header>
        <main className="flex-grow flex items-center">
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="container mx-auto px-6 text-center"
          >
            <h2 className="text-5xl md:text-6xl font-extrabold leading-tight mb-4">The Future of <span className="text-green-400">Green Energy</span>, Mapped.</h2>
            <p className="text-lg md:text-xl text-gray-300 max-w-3xl mx-auto mb-8">Valence is a cutting-edge platform providing data-driven intelligence to map, analyze, and optimize green hydrogen infrastructure.</p>
            <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white font-bold py-4 px-8 rounded-lg text-lg transition-transform transform hover:scale-105">Get Started for Free</Link>
          </motion.div>
        </main>
      </div>

      {/* --- PROBLEM SECTION (Corrected for Centering) --- */}
      <section className="py-20 w-full bg-gradient-to-b from-[#2D4323] to-[#192313]">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="bg-white/10 py-8 px-4 border border-white/30 rounded-xl flex flex-col items-center max-w-6xl mx-auto text-center">
                    <div className="text-green-500"><ProblemIcon /></div>
                    <h2 className="text-3xl font-bold text-white mt-4">Problem</h2>
                    <p className="mt-4 text-lg max-w-5xl text-gray-300">The hydrogen economy is growing rapidly, but poor infrastructure planning can lead to redundant investments, high costs, and missed opportunities.</p>
                </div>
            </AnimatedSection>
        </div>
      </section>

      {/* --- SOLUTION SECTION (Corrected for Centering) --- */}
      <section className="py-20 w-full bg-gradient-to-b from-[#192313] to-[#121A0E]">
        <div className="container mx-auto px-6">
            <AnimatedSection>
                <div className="bg-white/10 py-8 px-4 border border-white/30 rounded-xl flex flex-col items-center max-w-6xl mx-auto text-center">
                    <div className="text-green-500"><SolutionIcon /></div>
                    <h2 className="text-3xl font-bold text-white mt-4">Solution</h2>
                    <p className="mt-4 text-lg max-w-5xl text-gray-300">An interactive map-based tool that visualizes infrastructure and recommends optimal site selection using data-driven insights.</p>
                </div>
            </AnimatedSection>
        </div>
      </section>

      <section className="mx-auto w-full bg-gradient-to-b from-[#121A0E] to-[#2D4323]">
        <div className="py-20 px-6 max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-green-500 inline-block"><KeyIcon /></div>
              <h2 className="text-4xl font-bold text-white mt-4">Core Features</h2>
            </div>
          </AnimatedSection>
          <motion.div
            className="grid gap-8 md:grid-cols-2 lg:grid-cols-4 text-center text-white"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={gridItemVariants} whileHover={{ y: -8, scale: 1.05 }} className="p-6 bg-white/10 border border-white/30 rounded-xl">
              <h3 className="font-semibold text-lg">Interactive GIS Map</h3>
              <p className="text-sm mt-2 text-gray-400">Visualize plants, pipelines, storage, and transport hubs.</p>
            </motion.div>
            <motion.div variants={gridItemVariants} whileHover={{ y: -8, scale: 1.05 }} className="p-6 bg-white/10 border border-white/30 rounded-xl">
              <h3 className="font-semibold text-lg">Data-Driven Optimization</h3>
              <p className="text-sm mt-2 text-gray-400">Our backend suggests the best new project locations.</p>
            </motion.div>
            <motion.div variants={gridItemVariants} whileHover={{ y: -8, scale: 1.05 }} className="p-6 bg-white/10 border border-white/30 rounded-xl">
              <h3 className="font-semibold text-lg">Real-Time Insights</h3>
              <p className="text-sm mt-2 text-gray-400">Layer renewable energy potential, demand, and logistics.</p>
            </motion.div>
            <motion.div variants={gridItemVariants} whileHover={{ y: -8, scale: 1.05 }} className="p-6 bg-white/10 border border-white/30 rounded-xl">
              <h3 className="font-semibold text-lg">Private Asset Management</h3>
              <p className="text-sm mt-2 text-gray-400">Securely add and manage your own infrastructure data.</p>
            </motion.div>
          </motion.div>
        </div>
      </section>

      <section className="py-16 px-6 text-center bg-gradient-to-b from-[#2D4323] to-[#192313]">
        <AnimatedSection>
          <div className="text-green-500 inline-block"><UsersIcon /></div>
          <h2 className="text-3xl font-bold text-white mt-4">Designed For</h2>
          <motion.ul
            className="mt-6 grid gap-4 md:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.li variants={gridItemVariants} className="p-4 bg-white/10 border border-white/30 rounded-xl">Urban & Regional Planners</motion.li>
            <motion.li variants={gridItemVariants} className="p-4 bg-white/10 border border-white/30 rounded-xl">Energy Companies & Investors</motion.li>
            <motion.li variants={gridItemVariants} className="p-4 bg-white/10 border border-white/30 rounded-xl">Policy Analysts & Regulators</motion.li>
            <motion.li variants={gridItemVariants} className="p-4 bg-white/10 border border-white/30 rounded-xl">Project Developers</motion.li>
          </motion.ul>
        </AnimatedSection>
      </section>

      <section className="w-full mx-auto bg-gradient-to-b from-[#192313] to-[#121A0E]">
        <div className="py-20 px-6 max-w-6xl mx-auto">
          <AnimatedSection>
            <div className="text-center mb-16">
              <div className="text-green-500 inline-block"><ImpactIcon /></div>
              <h2 className="text-4xl font-bold text-white mt-4">Impact</h2>
            </div>
          </AnimatedSection>
          <motion.div
            className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 text-center"
            variants={gridContainerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.2 }}
          >
            <motion.div variants={gridItemVariants} className="p-6 bg-white/10 border border-white/30 rounded-xl"><p className="font-semibold">Directs capital to high-yield projects</p></motion.div>
            <motion.div variants={gridItemVariants} className="p-6 bg-white/10 border border-white/30 rounded-xl"><p className="font-semibold">Prevents redundant investments</p></motion.div>
            <motion.div variants={gridItemVariants} className="p-6 bg-white/10 border border-white/30 rounded-xl"><p className="font-semibold">Accelerates Net Zero adoption</p></motion.div>
            <motion.div variants={gridItemVariants} className="p-6 bg-white/10 border border-white/30 rounded-xl"><p className="font-semibold">Enables smarter collaboration</p></motion.div>
          </motion.div>
        </div>
      </section>

      <section className="relative bg-[url('/bgImg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">Ready to Shape the Future of Energy?</h2>
              <p className="mt-4 text-lg text-gray-300">Join Valence today. Start mapping your assets, gain data-driven insights, and become a key player in the green hydrogen revolution.</p>
              <div className="mt-10 flex justify-center gap-4">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/auth?mode=signup" className="block bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg">Get Started Now</Link>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Link href="/about" className="block bg-transparent border-2 border-white text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg hover:bg-white hover:text-[#192313] transition-colors duration-300">Learn More</Link>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <footer className="bg-[#192313] w-full px-6 py-8 text-center text-white/50 text-sm flex flex-col items-center">
        <div className="grid grid-cols-4 gap-12 w-full max-w-7xl">
          <div className="w-full">
            <img src="/logo-withoutBg.png" className="h-8"></img>
            <></>
          </div>
          <div className="w-full">
            <img src="/logo-withoutBg.png" className="h-8"></img>
            <></>
          </div>
          <div className="w-full">
            <img src="/logo-withoutBg.png" className="h-8"></img>
            <></>
          </div>
          <div className="w-full">
                        <img src="/logo-withoutBg.png" className="h-8"></img>
            <></>
          </div>
        </div>
        &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
      </footer>
    </div>
  );
}

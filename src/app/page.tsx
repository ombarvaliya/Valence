'use client';

import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';
import AnimatedSection from '../components/AnimatedSection';

// --- YOUR SVG ICONS - UNCHANGED ---
const ProblemIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" /></svg>;
const SolutionIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M5 13l4 4L19 7" /></svg>;
const KeyIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 7a2 2 0 012 2m4 0a6 6 0 01-7.743 5.743L11 17H9v2H7v2H5v-2H3v-2H1v-2h2v-2h2v-2h2v2h2v2h2a6 6 0 017-7z" /></svg>;
const UsersIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a3.002 3.002 0 015.288 0M12 14a4 4 0 100-8 4 4 0 000 8z" /></svg>;
const ImpactIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-10 w-10" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3.055 11H5a2 2 0 012 2v1a2 2 0 002 2h10a2 2 0 002-2v-1a2 2 0 012-2h1.945M7.737 11l-.244-1.463a2 2 0 011.944-2.366L12 7l2.563-.199a2 2 0 011.944 2.366L16.263 11m-8.526 0l-1.313 7.879A2 2 0 007.879 21h8.242a2 2 0 001.944-2.121L16.263 11" /></svg>;

// --- SVG ICONS for the NEW FOOTER ---
const TwitterIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M8.29 20.251c7.547 0 11.675-6.253 11.675-11.675 0-.178 0-.355-.012-.53A8.348 8.348 0 0022 5.92a8.19 8.19 0 01-2.357.646 4.118 4.118 0 001.804-2.27 8.224 8.224 0 01-2.605.996 4.107 4.107 0 00-6.993 3.743 11.65 11.65 0 01-8.457-4.287 4.106 4.106 0 001.27 5.477A4.072 4.072 0 012.8 9.71v.052a4.105 4.105 0 003.292 4.022 4.095 4.095 0 01-1.853.07 4.108 4.108 0 003.834 2.85A8.233 8.233 0 012 18.407a11.616 11.616 0 006.29 1.84" /></svg>;
const LinkedInIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
const GithubIcon = () => <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 24 24"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.088c-3.338.724-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;

export default function LandingPage() {
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
        {/* --- YOUR HEADER - UNCHANGED --- */}
        <header className="fixed top-2 z-50 w-full max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm">
            <Link href="/"><Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} /></Link>
            <nav className="space-x-6 flex items-center">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
              <Link href="/auth?mode=login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white/80 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</Link>
            </nav>
        </header>
        {/* --- YOUR HERO SECTION - UNCHANGED --- */}
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

      {/* --- NEW, REDESIGNED PROBLEM & SOLUTION SECTION --- */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#2D4323] to-[#192313]">
          <div className="container mx-auto max-w-5xl text-center">
            <AnimatedSection>
                <h2 className="text-4xl font-bold text-white">From Complexity to Clarity</h2>
                <p className="mt-4 text-lg text-gray-400 max-w-3xl mx-auto">
                    The green hydrogen economy is a puzzle of immense potential and significant challenges. We built Valence to solve it.
                </p>
            </AnimatedSection>
            <div className="mt-16 grid md:grid-cols-2 gap-8 text-left">
                <AnimatedSection delay={0.3}>
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full">
                        <div className="text-red-400 mb-4"><ProblemIcon /></div>
                        <h3 className="text-2xl font-semibold text-white">The Problem</h3>
                        <p className="mt-4 text-gray-300">
                            Disjointed data, redundant investments, and a lack of clear visualization tools hinder progress, making strategic planning nearly impossible.
                        </p>
                    </div>
                </AnimatedSection>
                <AnimatedSection delay={0.5}>
                    <div className="bg-white/5 p-8 rounded-xl border border-white/10 h-full">
                         <div className="text-green-400 mb-4"><SolutionIcon /></div>
                         <h3 className="text-2xl font-semibold text-white">Our Solution</h3>
                         <p className="mt-4 text-gray-300">
                            A unified, map-based platform that visualizes every asset and recommends optimal new sites using data-driven insights, turning chaos into actionable strategy.
                         </p>
                    </div>
                </AnimatedSection>
            </div>
          </div>
      </section>

      {/* --- YOUR FEATURES SECTION - UNCHANGED, BUT ANIMATED --- */}
      <section className="mx-auto w-full bg-gradient-to-b from-[#192313] to-[#121A0E]">
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

      {/* --- YOUR USERS SECTION - UNCHANGED, BUT ANIMATED --- */}
      <section className="py-16 px-6 text-center bg-gradient-to-b from-[#121A0E] to-[#2D4323]">
        <AnimatedSection>
          <div className="text-green-500 inline-block"><UsersIcon /></div>
          <h2 className="text-3xl font-bold text-white mt-4">Designed For</h2>
          <p className="mt-4 text-gray-300">Our platform is designed for</p>
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

      {/* --- YOUR IMPACT SECTION - UNCHANGED, BUT ANIMATED --- */}
      <section className="w-full mx-auto bg-gradient-to-b from-[#2D4323] to-[#192313]">
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

      {/* --- YOUR FINAL CTA SECTION - UNCHANGED, BUT ANIMATED --- */}
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

      {/* --- NEW, PROFESSIONAL FOOTER --- */}
      <footer className="bg-gradient-to-t from-[#192313] to-[#121A0E] text-gray-300 border-t border-white/10">
        <AnimatedSection>
          <div className="container mx-auto py-12 px-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              
              <div className="col-span-1 md:col-span-2">
                <Link href="/" className="inline-block mb-4">
                  <Image src="/logo-withoutBg.png" alt="Valence Logo" width={120} height={34} />
                </Link>
                <p className="max-w-xs text-gray-400">
                  Mapping the future of sustainable energy with data-driven intelligence.
                </p>
              </div>

              <div>
                <h3 className="font-semibold text-white tracking-wider uppercase">Quick Links</h3>
                <ul className="mt-4 space-y-2">
                  <li><Link href="/about" className="hover:text-green-400 transition-colors">About Us</Link></li>
                  <li><Link href="/map" className="hover:text-green-400 transition-colors">Platform</Link></li>
                  <li><Link href="/contact" className="hover:text-green-400 transition-colors">Contact</Link></li>
                </ul>
              </div>

              <div>
                <h3 className="font-semibold text-white tracking-wider uppercase">Legal</h3>
                <ul className="mt-4 space-y-2">
                  <li><a href="#" className="hover:text-green-400 transition-colors">Privacy Policy</a></li>
                  <li><a href="#" className="hover:text-green-400 transition-colors">Terms of Service</a></li>
                </ul>
              </div>

            </div>

            <div className="mt-12 pt-8 border-t border-white/10 flex flex-col sm:flex-row justify-between items-center">
              <p className="text-sm text-gray-500">
                &copy; {new Date().getFullYear()} Valence. All Rights Reserved.
              </p>
              <div className="flex space-x-4 mt-4 sm:mt-0">
                <a href="https://twitter.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><TwitterIcon /></a>
                <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><LinkedInIcon /></a>
                <a href="https://github.com" target="_blank" rel="noopener noreferrer" className="text-gray-400 hover:text-white transition-colors"><GithubIcon /></a>
              </div>
            </div>
          </div>
        </AnimatedSection>
      </footer>
    </div>
  );
}
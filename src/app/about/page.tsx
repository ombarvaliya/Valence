'use client';

import Link from 'next/link';
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from 'framer-motion';
import { useState } from 'react';
import PublicLayout from '@/components/PublicLayout';
import AnimatedSection from '@/components/AnimatedSection';

// --- UPDATED TEAM MEMBER DATA ---
const teamMembers = [
  {
    name: 'Vandan Kambodi',
    role: 'Project Lead & Full-Stack Architect',
    imageUrl: '/team/vandan-kambodi.jpg', // Path relative to the 'public' folder
    linkedin: 'https://linkedin.com/in/vandankambodi',
  },
  {
    name: 'Om Barvaliya',
    role: 'Data Scientist & Backend Engineer',
    imageUrl: '/team/om-barvaliya.jpg',
    linkedin: 'https://linkedin.com/in/ombarvaliya',
  },
  {
    name: 'Vaibhav Surani',
    role: 'UI/UX Designer & Frontend Specialist',
    imageUrl: '/team/vaibhav-surani.jpg',
    linkedin: 'https://linkedin.com/in/vaibhavsurani',
  },
  {
    name: 'Purvik Anghan',
    role: 'Geospatial Analyst & Frontend Developer',
    imageUrl: '/team/purvik-anghan.jpg',
    linkedin: 'https://linkedin.com/in/purvikanghan',
  },
];

export default function AboutPage() {
  // --- LOGIC FOR SCROLL INDICATOR ---
  const [showScrollIndicator, setShowScrollIndicator] = useState(true);
  const { scrollY } = useScroll();

  useMotionValueEvent(scrollY, "change", (latest) => {
    if (latest > 50) {
      setShowScrollIndicator(false);
    }
  });
  // --- END LOGIC ---

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { staggerChildren: 0.1 } }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { y: 0, opacity: 1 }
  };

  return (
    <PublicLayout>
      {/* Full-Screen Hero Section */}
      <section className="relative h-screen flex flex-col items-center justify-center text-center bg-[url('/bgImg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-black/70"></div>

        <motion.div 
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 px-6"
        >
          <h1 className="text-5xl md:text-7xl font-extrabold tracking-tighter leading-tight mb-4">
            We're mapping the<br/> <span className="text-green-400">next generation of energy</span>.
          </h1>
        </motion.div>

        <AnimatePresence>
          {showScrollIndicator && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1, transition: { delay: 1, duration: 0.5 } }}
              exit={{ opacity: 0 }} // Fades out smoothly
              className="absolute bottom-10 left-1/2 -translate-x-1/2 z-10"
            >
              <div className="flex flex-col items-center space-y-2">
                <span className="text-sm text-gray-300">Scroll Down</span>
                <motion.svg
                  animate={{ y: [0, 8, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
                  className="w-6 h-6 text-gray-300" 
                  fill="none" 
                  viewBox="0 0 24 24" 
                  stroke="currentColor"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </motion.svg>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Our Story Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#121A0E] to-[#192313]">
        <div className="container mx-auto max-w-4xl text-center">
          <AnimatedSection>
            <h2 className="text-4xl font-bold text-white">Our Story</h2>
            <p className="mt-6 text-xl text-gray-300 leading-relaxed">
              Valence began not in a boardroom, but as a collaborative university project fueled by a shared passion for a sustainable future. We saw a critical gap between the potential of green hydrogen and the practical tools needed to realize it. This platform is our answer—a fusion of data science, geospatial technology, and a commitment to accelerating the clean energy transition.
            </p>
          </AnimatedSection>
        </div>
      </section>

      {/* Meet the Team Section */}
      <section className="py-24 px-6 bg-gradient-to-b from-[#192313] to-[#121A0E]">
          <div className="container mx-auto max-w-6xl">
            <AnimatedSection>
                <div className="text-center mb-16">
                    <h2 className="text-4xl font-bold text-white">Meet the Innovators</h2>
                    <p className="mt-2 text-lg text-gray-400">The team dedicated to bringing Valence to life.</p>
                </div>
            </AnimatedSection>
            <motion.div 
              className="grid gap-10 md:grid-cols-2 lg:grid-cols-4"
              variants={containerVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
            >
              {teamMembers.map((member) => (
                <motion.div 
                  key={member.name} 
                  variants={itemVariants} 
                  className="text-center flex flex-col items-center"
                >
                  <a 
                    href={member.linkedin} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="block w-40 h-40 rounded-full mb-4 overflow-hidden border-2 border-white/20 hover:border-green-400 transition-all duration-300 transform hover:scale-110 shadow-lg"
                  >
                    <img 
                      src={member.imageUrl} 
                      alt={`Photo of ${member.name}`}
                      className="w-full h-full object-cover" 
                    />
                  </a>
                  <h3 className="font-semibold text-xl text-white">{member.name}</h3>
                  <p className="text-sm mt-1 text-green-400">{member.role}</p>
                </motion.div>
              ))}
            </motion.div>
          </div>
      </section>

      {/* Final CTA Section */}
       <section className="relative bg-[url('/bgImg.png')] bg-cover bg-center">
        <div className="absolute inset-0 bg-gradient-to-t from-[#121A0E] via-black/80 to-transparent"></div>
        <div className="relative container mx-auto px-6 py-24 text-center">
          <AnimatedSection>
            <div className="max-w-4xl mx-auto">
              <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                Join Us in Building a Sustainable Future
              </h2>
              <p className="mt-4 text-lg text-gray-300">
                Explore the platform, analyze the data, and become part of the solution.
              </p>
              <div className="mt-10">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.98 }} className="inline-block">
                  <Link href="/signup" className="bg-green-600 text-white font-bold text-lg px-8 py-4 rounded-xl shadow-lg shadow-green-500/20 hover:bg-green-700 transition-all duration-300">
                    Get Started Now
                  </Link>
                </motion.div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>
    </PublicLayout>
  );
}
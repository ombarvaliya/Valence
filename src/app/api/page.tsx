'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { motion } from 'framer-motion';

// SVG Icon Components (remain the same)
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-3 text-green-400 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
      // --- THIS IS THE CRUCIAL FIX ---
      // The fetch URL is now corrected to point to the correct API route.
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, message }),
      });

      const result = await response.json();

      if (response.ok) {
        setStatus({ submitting: false, success: true, error: '' });
        setName('');
        setEmail('');
        setMessage('');
        setTimeout(() => setStatus({ submitting: false, success: false, error: '' }), 5000);
      } else {
        setStatus({ submitting: false, success: false, error: result.message || 'An error occurred.' });
      }
    } catch (err) {
        setStatus({ submitting: false, success: false, error: 'Could not connect to the server. Please try again.' });
    }
  };

  return (
    <div className="bg-[#121A0E] min-h-screen flex flex-col items-center text-white">
      <div className="p-2 w-full">
        <header className="fixed top-2 z-50 w-full max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm">
            <Link href="/"><Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} /></Link>
            <nav className="space-x-6 flex items-center">
              <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
              <Link href="/contact" className="text-green-400 font-semibold transition-colors hover:text-white">Contact Us</Link>
              <Link href="/auth?mode=login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
              <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white/80 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</Link>
            </nav>
        </header>
      </div>

      <main className="container mx-auto px-6 pt-32 pb-16 flex-grow flex items-center justify-center">
        <motion.div 
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="w-full max-w-5xl"
        >
          <div className="text-center mb-12">
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight">Get In Touch</h1>
            <p className="mt-4 text-lg text-gray-300">Have a question, feedback, or a partnership inquiry? We'd love to hear from you.</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-white/5 border border-white/20 rounded-2xl shadow-2xl backdrop-blur-lg">
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white">Contact Information</h2>
                <p className="mt-2 text-gray-400 leading-relaxed">Reach out to us directly through the following channels. We aim to respond within 24-48 hours.</p>
              </div>
              <div className="space-y-4 text-left">
                <div className="flex items-start">
                  <MailIcon/>
                  <div>
                    <h3 className="font-semibold text-white">Email</h3>
                    <a href="mailto:valence.contactus@gmail.com" className="text-green-400 hover:underline">valence.contactus@gmail.com</a>
                  </div>
                </div>
                <div className="flex items-start">
                  <LocationIcon /> 
                  <div>
                    <h3 className="font-semibold text-white">Our Office</h3>
                    <p className="text-gray-400">123 Tech Park, Piplod, <br />Surat, Gujarat, 395007, India</p>
                  </div>
                </div>
                 <div className="flex items-start">
                  <CallIcon/>
                  <div>
                    <h3 className="font-semibold text-white">Phone</h3>
                    <a href="tel:+911234567890" className="text-gray-400 hover:underline">+91 12345 67890</a>
                  </div>
                </div>
              </div>
            </div>

            <div>
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-300">Full Name</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-300">Email Address</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-300">Message</label>
                  <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-4 py-2 bg-white/10 border border-white/30 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-green-500"></textarea>
                </div>
                <button type="submit" disabled={status.submitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
                {status.success && <p className="text-green-400 font-semibold text-center mt-2">Message sent successfully! Please check your inbox.</p>}
                {status.error && <p className="text-red-400 font-semibold text-center mt-2">{status.error}</p>}
              </form>
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
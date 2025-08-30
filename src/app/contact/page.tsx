'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo-withoutBg.png';
import bgImg from '../../../public/bgImg.png';

const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const CallIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" /></svg>;
const MailIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>;

export default function ContactPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');
  const [status, setStatus] = useState({ submitting: false, success: false, error: '' });

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setStatus({ submitting: true, success: false, error: '' });

    try {
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
        } else {
            setStatus({ submitting: false, success: false, error: result.message || 'An error occurred.' });
        }
    } catch (err) {
        setStatus({ submitting: false, success: false, error: 'Could not connect to the server. Please try again.' });
    }
  };

  return (
    <div className="p-2 bg-[url('/bgImg.png')] bg-cover bg-center min-h-screen flex flex-col items-center">
      {/* Public Header */}
        <header className="fixed top-2 z-50 w-full max-w-7xl bg-white/20 border rounded-xl border-white/30 container mx-auto px-6 py-4 flex justify-between items-center backdrop-blur-sm">
          <Link href="/"><Image src="/logo-withoutBg.png" alt="Valence Logo" width={100} height={28} /></Link>
          <nav className="space-x-6 flex items-center">
            <Link href="/about" className="text-gray-300 hover:text-white transition-colors">About Us</Link>
            <Link href="/contact" className="text-gray-300 hover:text-white transition-colors">Contact Us</Link>
            <Link href="/auth?mode=login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/auth?mode=signup" className="bg-green-600 hover:bg-green-700 text-white/80 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</Link>
          </nav>
        </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-16 mt-10">
        <div className="max-w-4xl mx-auto">
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 p-8 bg-gradient-to-br from-[#192313] to-[#2D4323] rounded-xl shadow-lg">
            
            <header className="col-span-2 text-center text-white bg-white/20 border border-white/30 rounded-xl py-4">
              <h1 className="text-4xl font-bold tracking-tight ">Get In Touch</h1>
              <p className="mt-4 text-lg text-white/80">
                We'd love to hear from you.
              </p>
            </header>

          
            {/* Company Description and Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-white">About Valence</h2>
                <p className="mt-2 text-white/80 leading-relaxed">
                  Valence is a forward-thinking technology company dedicated to accelerating the global transition to green energy. Our flagship platform provides the tools to map, manage, and visualize renewable energy and hydrogen infrastructure. Based in **Surat, Gujarat**, we are at the heart of India's industrial growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-white">Our Office</h3>
                <address className="mt-2 not-italic text-white/80 space-y-2">
                  <p className="flex flex-row"><LocationIcon /> 123 Tech Park, Piplod, <br />Surat, Gujarat, 395007, India</p>
                  <p className="flex flex-row"><MailIcon/> <a href="mailto:hello@valence.dev" className="text-green-600 hover:underline">hello@valence.dev</a></p>
                  <p className="flex flex-row"><CallIcon/> <a href="tel:+911234567890" className="text-green-600 hover:underline">+91 12345 67890</a></p>
                </address>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-white">Full Name</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-white">Email Address</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-white">Message</label>
                  <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:border-green-500"></textarea>
                </div>
                <button type="submit" disabled={status.submitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:bg-gray-400">
                  {status.submitting ? 'Sending...' : 'Send Message'}
                </button>
                {status.success && <p className="text-green-600 font-semibold text-center mt-2">Message sent successfully!</p>}
                {status.error && <p className="text-red-600 font-semibold text-center mt-2">{status.error}</p>}
              </form>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
'use client';

import { useState, FormEvent } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import logo from '../../../public/logo-withoutBg.png';
import bgImg from '../../../public/bgImg.png';


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
    <div 
        style={{ backgroundImage: `url(${bgImg.src})` }}
        className="bg-cover bg-center min-h-screen"
    >
      {/* Public Header */}
      <header className="w-full max-w-7xl mx-auto px-6 py-4 flex justify-between items-center mt-2 bg-white/10 border border-white/20 rounded-xl backdrop-blur-sm text-white">
        <Link href="/">
            <Image src={logo} alt="Valence Logo" width={112} height={32} priority />
        </Link>
        <nav className="space-x-6 flex items-center">
            <Link href="/contact" className="text-white font-semibold border-b-2 border-green-400">Contact Us</Link>
            <Link href="/login" className="text-gray-300 hover:text-white transition-colors">Login</Link>
            <Link href="/signup" className="bg-green-600 hover:bg-green-700 font-bold py-2 px-4 rounded-lg transition-colors">Sign Up</Link>
        </nav>
      </header>
      
      {/* Main Content */}
      <main className="container mx-auto px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <header className="text-center mb-12 text-white">
            <h1 className="text-5xl font-extrabold tracking-tight">Get In Touch</h1>
            <p className="mt-4 text-lg text-gray-300">
              We'd love to hear from you.
            </p>
          </header>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white p-8 rounded-2xl shadow-lg">
            {/* Company Description and Details */}
            <div className="space-y-8">
              <div>
                <h2 className="text-2xl font-bold text-gray-800">About Valence</h2>
                <p className="mt-2 text-gray-700 leading-relaxed">
                  Valence is a forward-thinking technology company dedicated to accelerating the global transition to green energy. Our flagship platform provides the tools to map, manage, and visualize renewable energy and hydrogen infrastructure. Based in **Surat, Gujarat**, we are at the heart of India's industrial growth.
                </p>
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-800">Our Office</h3>
                <address className="mt-2 not-italic text-gray-700 space-y-2">
                  <p>📍 123 Tech Park, Piplod, <br />Surat, Gujarat, 395007, India</p>
                  <p>📧 <a href="mailto:hello@valence.dev" className="text-green-600 hover:underline">hello@valence.dev</a></p>
                  <p>📞 <a href="tel:+911234567890" className="text-green-600 hover:underline">+91 12345 67890</a></p>
                </address>
              </div>
            </div>

            {/* Contact Form */}
            <div>
              <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700">Full Name</label>
                  <input type="text" id="name" value={name} onChange={(e) => setName(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
                  <input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} required className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"/>
                </div>
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700">Message</label>
                  <textarea id="message" value={message} onChange={(e) => setMessage(e.target.value)} required rows={5} className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500"></textarea>
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
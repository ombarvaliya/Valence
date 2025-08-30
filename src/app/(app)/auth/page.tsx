'use client';

import { useState, FormEvent, useEffect, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';


function AuthComponent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [isSignUp, setIsSignUp] = useState(searchParams.get('mode') === 'signup');

  // This effect ensures the panel switches if the user navigates with browser buttons.
  useEffect(() => {
    setIsSignUp(searchParams.get('mode') === 'signup');
  }, [searchParams]);


  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginError, setLoginError] = useState('');
  const [isLoginSubmitting, setIsLoginSubmitting] = useState(false);

  const [signupName, setSignupName] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupError, setSignupError] = useState('');
  const [isSignupSubmitting, setIsSignupSubmitting] = useState(false);

  useEffect(() => {
    const navbarSelector = 'header';
    const navbar = document.querySelector(navbarSelector) as HTMLElement | null;
    if (navbar) {
      navbar.style.display = 'none';
    }
    return () => {
      if (navbar) {
        navbar.style.display = 'block';
      }
    };
  }, []);

  const handleLoginSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsLoginSubmitting(true);
    setLoginError('');

    const result = await signIn('credentials', {
      redirect: false,
      email: loginEmail,
      password: loginPassword,
    });

    if (result?.error) {
      setLoginError('Invalid credentials. Please try again.');
      setIsLoginSubmitting(false);
    } else if (result?.ok) {
      router.push('/map');
    } else {
      setLoginError('An unknown error occurred.');
      setIsLoginSubmitting(false);
    }
  };

  const handleSignupSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSignupSubmitting(true);
    setSignupError('');

    const response = await fetch('/api/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ name: signupName, email: signupEmail, password: signupPassword }),
    });

    const data = await response.json();

    if (response.ok) {
      setIsSignUp(false);
      setLoginEmail(signupEmail);
    } else {
      setSignupError(data.message || 'An error occurred during sign up.');
      setIsSignupSubmitting(false);
    }
  };

  return (
    <div className="bg-[url('/bgImg.png')] bg-cover bg-center min-h-screen flex items-center justify-center p-4 font-sans">
      <div className="w-full max-w-4xl min-h-[400px] relative bg-[#141d10] rounded-2xl shadow-2xl flex overflow-hidden">
        
        <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-[#192313] to-[#2D4323] ">
            <div className="text-center mb-6 border border-white/30 bg-white/20 p-4 rounded-xl">
              <h2 className="text-3xl font-bold text-white">Create Account</h2>
            </div>
            <form onSubmit={handleSignupSubmit} className="space-y-4">
              <div>
                <label htmlFor="signupName" className="block text-sm font-medium text-white/80">Name</label>
                <input type="text" id="signupName" value={signupName} onChange={(e) => setSignupName(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Virat Sharma"/>
              </div>
              <div>
                <label htmlFor="signupEmail" className="block text-sm font-medium text-white/80">Email</label>
                <input type="email" id="signupEmail" value={signupEmail} onChange={(e) => setSignupEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="viratsharma5@gmail.com"/>
              </div>
              <div>
                <label htmlFor="signupPassword" className="block text-sm font-medium text-white/80">Password</label>
                <input type="password" id="signupPassword" value={signupPassword} onChange={(e) => setSignupPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="A Strong Password"/>
              </div>
              {signupError && <p className="text-red-400 text-sm text-center">{signupError}</p>}
              <button type="submit" disabled={isSignupSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                {isSignupSubmitting ? 'Creating...' : 'Sign Up'}
              </button>
            </form>
        </div>


        <div className="w-1/2 p-8 flex flex-col justify-center bg-gradient-to-br from-[#192313] to-[#2D4323]">
            <div className="text-center mb-6 border border-white/30 bg-white/20 rounded-xl p-4">
              <h2 className="text-3xl font-bold text-white">Log In</h2>
            </div>
            <form onSubmit={handleLoginSubmit} className="space-y-4">
              <div>
                <label htmlFor="loginEmail" className="block text-sm font-medium text-white/80">Email</label>
                <input type="email" id="loginEmail" value={loginEmail} onChange={(e) => setLoginEmail(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="viratsharma@gmail.com"/>
              </div>
              <div>
                <label htmlFor="loginPassword" className="block text-sm font-medium text-white/80">Password</label>
                <input type="password" id="loginPassword" value={loginPassword} onChange={(e) => setLoginPassword(e.target.value)} required className="mt-1 block w-full px-3 py-2 bg-white/10 text-white border border-white/20 rounded-md shadow-sm focus:outline-none focus:ring-green-500 focus:border-green-500" placeholder="Check Your Remembarance"/>
              </div>
              {loginError && <p className="text-red-400 text-sm text-center">{loginError}</p>}
              <button type="submit" disabled={isLoginSubmitting} className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500 disabled:opacity-50">
                {isLoginSubmitting ? 'Logging In...' : 'Log In'}
              </button>
            </form>
        </div>

        <div className={`absolute top-0 left-0 w-1/2 h-full transition-transform duration-700 ease-in-out ${isSignUp ? 'translate-x-full' : 'translate-x-0'}`}>
          <div className="bg-gradient-to-br from-[#2D4323] to-[#406D32] relative h-full w-full rounded-2xl flex flex-col items-center justify-center text-center p-8 text-white">
            
            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-500 ease-in-out ${isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <Link href="/" className="inline-block mb-12">
                <img src="/logo-withoutBg.png" className="w-28 mx-auto" alt="Valence Logo"/>
              </Link>
              <h2 className="text-3xl font-bold">Welcome Back!</h2>
              <p className="mt-2 max-w-xs mx-auto">Already have an account? Log in to access your projects and insights.</p>
              <button onClick={() => setIsSignUp(false)} className="mt-6 px-8 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Log In
              </button>
            </div>

            <div className={`absolute top-0 left-0 w-full h-full flex flex-col items-center justify-center p-8 transition-opacity duration-500 ease-in-out ${!isSignUp ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
              <Link href="/" className="inline-block mb-12">
                <img src="/logo-withoutBg.png" className="w-28 mx-auto" alt="Valence Logo"/>
              </Link>
              <h2 className="text-3xl font-bold">New Here?</h2>
              <p className="mt-2 max-w-xs mx-auto">Sign up to map, analyze, and optimize the future of green energy infrastructure.</p>
              <button onClick={() => setIsSignUp(true)} className="mt-6 px-8 py-2 border-2 border-white rounded-full font-semibold hover:bg-white hover:text-green-600 transition-colors">
                Sign Up
              </button>
            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
}

// This wrapper component is necessary for useSearchParams to work correctly in the App Router.
export default function AuthPageWrapper() {
  return (
    <Suspense fallback={<div className="bg-gray-900 min-h-screen"></div>}>
      <AuthComponent />
    </Suspense>
  );
}


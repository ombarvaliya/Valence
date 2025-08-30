'use client';

import { useSession, signOut } from 'next-auth/react';
import Link from 'next/link';

export default function UserButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center space-x-4">
      <Link href="/profile" className="text-gray-300 hover:text-white transition-colors hidden sm:block">
        <span className="">{session.user?.name}</span>
      </Link>

      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-700/70 hover:bg-red-900 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Logout
      </button>
    </div>
  );
}
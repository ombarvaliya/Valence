'use client';

import { useSession, signOut } from 'next-auth/react';

export default function UserButton() {
  const { data: session } = useSession();

  if (!session) return null;

  return (
    <div className="flex items-center space-x-4">
      <span className="text-gray-300 hidden sm:block">
        Welcome, {session.user?.name}
      </span>
      <button
        onClick={() => signOut({ callbackUrl: '/' })}
        className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-lg transition-colors"
      >
        Sign Out
      </button>
    </div>
  );
}
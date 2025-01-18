'use client';

import Link from 'next/link';
import { Home } from 'lucide-react';
import { usePathname } from 'next/navigation';

export default function HomeButton() {
  const pathname = usePathname();

  if (pathname === '/') {
    return null;
  }

  return (
    <Link href="/" className="fixed right-4 top-[5dvh] z-10">
      <button
        className="bg-white bg-opacity-70 hover:bg-opacity-100 text-gray-800 font-bold py-2 px-4 rounded-full transition-all duration-300 shadow-md hover:shadow-lg"
        aria-label="Вернуться на главную"
      >
        <Home size={24} />
      </button>
    </Link>
  );
}

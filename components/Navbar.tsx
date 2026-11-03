'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useState } from 'react';
import { Menu, X, PlusCircle, Bookmark, User, LogOut, ShieldCheck } from 'lucide-react';

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const pathname = usePathname();

  // Temporary mock auth state (we will connect BetterAuth later)
  const isAuthenticated = true; 
  const user = { name: 'Alex Rivera', email: 'alex@studiospace.io', image: '' };

  const isActive = (path: string) => pathname === path;

  return (
    <nav className="sticky top-0 z-50 bg-white/80 dark:bg-zinc-900/80 backdrop-blur-md border-b border-zinc-200 dark:border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="bg-amber-500 text-white p-2 rounded-lg font-bold text-xl tracking-wider">
              SS
            </div>
            <span className="text-xl font-extrabold text-zinc-900 dark:text-white tracking-tight">
              Studio<span className="text-amber-500">Space</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <div className="hidden md:flex items-center space-x-8 font-medium text-sm">
            <Link href="/" className={`transition-colors ${isActive('/') ? 'text-amber-500 font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-amber-500'}`}>
              Home
            </Link>
            <Link href="/studios" className={`transition-colors ${isActive('/studios') ? 'text-amber-500 font-semibold' : 'text-zinc-600 dark:text-zinc-300 hover:text-amber-500'}`}>
              Explore Studios
            </Link>
            <Link href="/how-it-works" className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors">
              How It Works
            </Link>
            <Link href="/about" className="text-zinc-600 dark:text-zinc-300 hover:text-amber-500 transition-colors">
              About Us
            </Link>
          </div>

          {/* Right Action / Auth Section */}
          <div className="hidden md:flex items-center space-x-4">
            {isAuthenticated ? (
              <div className="relative">
                <button 
                  onClick={() => setDropdownOpen(!dropdownOpen)}
                  className="flex items-center gap-2 focus:outline-none bg-zinc-100 dark:bg-zinc-800 p-2 rounded-full border border-zinc-200 dark:border-zinc-700"
                >
                  <div className="w-8 h-8 rounded-full bg-amber-500 text-white flex items-center justify-center font-bold text-sm">
                    {user.name.charAt(0)}
                  </div>
                  <span className="text-sm font-medium text-zinc-800 dark:text-zinc-200 pr-2">{user.name}</span>
                </button>

                {/* Dropdown Menu */}
                {dropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-800 rounded-xl shadow-xl border border-zinc-100 dark:border-zinc-700 py-2 z-50">
                    <div className="px-4 py-2 border-b border-zinc-100 dark:border-zinc-700">
                      <p className="text-xs text-zinc-500 dark:text-zinc-400">Signed in as</p>
                      <p className="text-sm font-semibold text-zinc-800 dark:text-zinc-200 truncate">{user.email}</p>
                    </div>
                    <Link href="/add-studio" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-amber-50 dark:hover:bg-zinc-700">
                      <PlusCircle className="w-4 h-4 text-amber-500" /> Add New Studio
                    </Link>
                    <Link href="/my-listings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-amber-50 dark:hover:bg-zinc-700">
                      <ShieldCheck className="w-4 h-4 text-amber-500" /> My Studio Listings
                    </Link>
                    <Link href="/my-bookings" onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 px-4 py-2.5 text-sm text-zinc-700 dark:text-zinc-200 hover:bg-amber-50 dark:hover:bg-zinc-700">
                      <Bookmark className="w-4 h-4 text-amber-500" /> My Bookings
                    </Link>
                    <div className="border-t border-zinc-100 dark:border-zinc-700 my-1"></div>
                    <button onClick={() => setDropdownOpen(false)} className="flex items-center gap-2 w-full text-left px-4 py-2.5 text-sm text-red-600 hover:bg-red-50 dark:hover:bg-zinc-700">
                      <LogOut className="w-4 h-4" /> Sign Out
                    </button>
                  </div>
                )}
              </div>
            ) : (
              <div className="flex items-center gap-3">
                <Link href="/login" className="text-sm font-semibold text-zinc-700 dark:text-zinc-200 hover:text-amber-500 px-3 py-2">
                  Sign In
                </Link>
                <Link href="/register" className="bg-amber-500 hover:bg-amber-600 text-white text-sm font-semibold px-4 py-2 rounded-xl shadow-md transition-all">
                  Register
                </Link>
              </div>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden flex items-center">
            <button onClick={() => setIsOpen(!isOpen)} className="text-zinc-600 dark:text-zinc-300 focus:outline-none">
              {isOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>

        </div>
      </div>

      {/* Mobile Menu */}
      {isOpen && (
        <div className="md:hidden bg-white dark:bg-zinc-900 border-b border-zinc-200 dark:border-zinc-800 px-4 pt-2 pb-4 space-y-2">
          <Link href="/" onClick={() => setIsOpen(false)} className="block py-2 text-zinc-700 dark:text-zinc-200">Home</Link>
          <Link href="/studios" onClick={() => setIsOpen(false)} className="block py-2 text-zinc-700 dark:text-zinc-200">Explore Studios</Link>
          <Link href="/add-studio" onClick={() => setIsOpen(false)} className="block py-2 text-zinc-700 dark:text-zinc-200">Add New Studio</Link>
          <Link href="/my-listings" onClick={() => setIsOpen(false)} className="block py-2 text-zinc-700 dark:text-zinc-200">My Listings</Link>
          <Link href="/my-bookings" onClick={() => setIsOpen(false)} className="block py-2 text-zinc-700 dark:text-zinc-200">My Bookings</Link>
        </div>
      )}
    </nav>
  );
}
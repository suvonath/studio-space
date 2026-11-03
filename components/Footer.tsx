'use client'
import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="bg-zinc-900 text-zinc-400 py-12 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <div className="bg-amber-500 text-white p-1.5 rounded-lg font-bold text-lg">SS</div>
            <span className="text-lg font-bold text-white tracking-tight">Studio<span className="text-amber-500">Space</span></span>
          </div>
          <p className="text-sm text-zinc-400 leading-relaxed">
            The premier peer-to-peer workspace sharing marketplace connecting filmmakers, photographers, and musicians with world-class facilities.
          </p>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Explore</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/studios" className="hover:text-amber-400 transition-colors">All Workspaces</Link></li>
            <li><Link href="/how-it-works" className="hover:text-amber-400 transition-colors">How It Works</Link></li>
            <li><Link href="/add-studio" className="hover:text-amber-400 transition-colors">Host Your Studio</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Categories</h3>
          <ul className="space-y-2 text-sm">
            <li><Link href="/studios?category=Photo+Studio" className="hover:text-amber-400 transition-colors">Photo Studios</Link></li>
            <li><Link href="/studios?category=Sound+Stage" className="hover:text-amber-400 transition-colors">Sound Stages</Link></li>
            <li><Link href="/studios?category=Podcast+Lounge" className="hover:text-amber-400 transition-colors">Podcast Lounges</Link></li>
            <li><Link href="/studios?category=Music+Suite" className="hover:text-amber-400 transition-colors">Music Suites</Link></li>
          </ul>
        </div>

        <div>
          <h3 className="text-white font-semibold text-sm mb-4">Stay Updated</h3>
          <p className="text-sm text-zinc-400 mb-3">Subscribe to our creator newsletter for new venues.</p>
          <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
            <input 
              type="email" 
              placeholder="Enter your email" 
              className="bg-zinc-800 text-sm px-3 py-2 rounded-lg text-white focus:outline-none focus:ring-2 focus:ring-amber-500 w-full"
            />
            <button type="submit" className="bg-amber-500 hover:bg-amber-600 text-white px-4 py-2 rounded-lg text-sm font-semibold transition-all">
              Join
            </button>
          </form>
        </div>
      </div>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 pt-6 border-t border-zinc-800 text-center text-xs text-zinc-500">
        © {new Date().getFullYear()} StudioSpace Platform. All rights reserved.
      </div>
    </footer>
  );
}
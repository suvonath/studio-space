import Link from 'next/link';
import { Search, ShieldCheck, Award, Headphones, Camera, Mic, Music, Palette } from 'lucide-react';

export default function Home() {
  // Sample featured workspaces data for the UI showcase
  const featuredStudios = [
    {
      id: '1',
      name: 'Neon Vault 4K Cinema Soundstage & Cyclorama',
      tagline: 'Step into pre-rigged cyclorama soundstages, 4K multi-cam podcast lounges, and Dolby Atmos mixing suites.',
      category: 'Sound Stage',
      hourlyRate: 135,
      securityDeposit: 150,
      maxCapacity: 30,
      rating: 5.0,
      image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800',
      location: 'Downtown Los Angeles, CA'
    },
    {
      id: '2',
      name: 'Skyline Horizon Rooftop Production Studio',
      tagline: 'An open-air architectural rooftop space with unobstructed views of the city skyline.',
      category: 'Photo Studio',
      hourlyRate: 140,
      securityDeposit: 180,
      maxCapacity: 20,
      rating: 4.9,
      image: 'https://images.unsplash.com/photo-1519741497674-611481863552?auto=format&fit=crop&q=80&w=800',
      location: 'Brooklyn New York, NY'
    },
    {
      id: '3',
      name: 'Velvet Echo Analog Recording & Live Rooms',
      tagline: 'World-class acoustic isolation paired with legendary mixing consoles, outboard gear, and vintage amps.',
      category: 'Music Suite',
      hourlyRate: 110,
      securityDeposit: 120,
      maxCapacity: 15,
      rating: 4.8,
      image: 'https://images.unsplash.com/photo-1525201548942-d8732f6617a0?auto=format&fit=crop&q=80&w=800',
      location: 'Nashville, TN'
    }
  ];

  const categories = [
    { name: 'Photo Studios', icon: Camera, count: '24+ Spaces', slug: 'Photo Studio' },
    { name: 'Sound Stages', icon: Mic, count: '18+ Spaces', slug: 'Sound Stage' },
    { name: 'Podcast Lounges', icon: Headphones, count: '32+ Spaces', slug: 'Podcast Lounge' },
    { name: 'Music Suites', icon: Music, count: '19+ Spaces', slug: 'Music Suite' },
    { name: 'Art Workshops', icon: Palette, count: '15+ Spaces', slug: 'Art Workshop' },
  ];

  return (
    <div className="space-y-16 pb-20">
      
      {/* Hero Section */}
      <section className="relative bg-zinc-900 text-white py-24 px-4 sm:px-6 lg:px-8 overflow-hidden">
        <div className="absolute inset-0 opacity-40 bg-cover bg-center" style={{ backgroundImage: `url('https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1600')` }}></div>
        <div className="absolute inset-0 bg-gradient-to-r from-zinc-950 via-zinc-900/90 to-transparent"></div>
        
        <div className="relative max-w-7xl mx-auto space-y-6">
          <div className="inline-flex items-center gap-2 bg-amber-500/20 text-amber-400 px-3 py-1 rounded-full text-xs font-semibold tracking-wide border border-amber-500/30">
            <Award className="w-3.5 h-3.5" /> NEXT-GEN CREATIVE STUDIOS
          </div>
          <h1 className="text-4xl sm:text-6xl font-extrabold tracking-tight max-w-2xl leading-tight">
            Reserve Production Spaces Built for <span className="text-amber-500">Visionary Creators</span>
          </h1>
          <p className="text-zinc-300 text-lg max-w-xl leading-relaxed">
            Step into pre-rigged cyclorama soundstages, 4K multi-cam podcast lounges, and Dolby Atmos mixing suites across the continent.
          </p>
          <div className="flex flex-wrap gap-4 pt-4">
            <Link href="/studios" className="bg-amber-500 hover:bg-amber-600 text-white font-semibold px-6 py-3 rounded-xl shadow-lg transition-all flex items-center gap-2">
              <Search className="w-4 h-4" /> Explore All Studios
            </Link>
            <Link href="/add-studio" className="bg-zinc-800 hover:bg-zinc-700 text-white font-semibold px-6 py-3 rounded-xl border border-zinc-700 transition-all">
              Host Your Space
            </Link>
          </div>
        </div>
      </section>

      {/* Browse by Creative Discipline / Categories */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">Curated Production Categories</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Browse by Creative Discipline</h2>
          </div>
          <Link href="/studios" className="text-sm font-semibold text-amber-500 hover:underline">
            View All Workspaces →
          </Link>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-4">
          {categories.map((cat, idx) => {
            const IconComp = cat.icon;
            return (
              <Link 
                key={idx} 
                href={`/studios?category=${encodeURIComponent(cat.slug)}`}
                className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl hover:border-amber-500 transition-all group shadow-sm hover:shadow-md flex flex-col items-center text-center"
              >
                <div className="w-12 h-12 rounded-xl bg-amber-50 dark:bg-zinc-800 text-amber-500 flex items-center justify-center mb-4 group-hover:scale-110 transition-transform">
                  <IconComp className="w-6 h-6" />
                </div>
                <h3 className="font-semibold text-sm text-zinc-800 dark:text-zinc-200 mb-1">{cat.name}</h3>
                <p className="text-xs text-zinc-500">{cat.count}</p>
              </Link>
            );
          })}
        </div>
      </section>

      {/* Featured Creative Workspaces */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-end mb-8">
          <div>
            <p className="text-amber-500 text-xs font-bold uppercase tracking-wider mb-1">Curated Selection (Windowed Limit)</p>
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight">Featured Creative Workspaces</h2>
          </div>
          <Link href="/studios" className="text-sm font-semibold text-amber-500 hover:underline">
            View All Workspaces →
          </Link>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {featuredStudios.map((studio) => (
            <div key={studio.id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="relative h-52">
                <img src={studio.image} alt={studio.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-zinc-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {studio.category}
                </span>
                <span className="absolute top-3 right-3 bg-amber-500 text-white text-xs font-bold px-2.5 py-1 rounded-full flex items-center gap-1 shadow">
                  ★ {studio.rating}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">{studio.location}</p>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white line-clamp-1">{studio.name}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1">{studio.tagline}</p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">${studio.hourlyRate}</span>
                    <span className="text-xs text-zinc-500"> / hr</span>
                  </div>
                  <Link 
                    href={`/studios/${studio.id}`} 
                    className="bg-zinc-900 dark:bg-zinc-800 hover:bg-amber-500 dark:hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Trust & Safety Section */}
      <section className="bg-amber-50 dark:bg-zinc-900/50 border-y border-amber-100 dark:border-zinc-800 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
          <div className="p-6">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">$</div>
            <h3 className="font-bold text-lg mb-2">Host Guarantee</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Comprehensive property & gear protection for every booking.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">✓</div>
            <h3 className="font-bold text-lg mb-2">Verified Workspaces</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Inspected acoustics, power grid, and lighting setups.</p>
          </div>
          <div className="p-6">
            <div className="w-12 h-12 bg-amber-500 text-white rounded-2xl flex items-center justify-center mx-auto mb-4 font-bold text-xl shadow-md">★</div>
            <h3 className="font-bold text-lg mb-2">Creator First</h3>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">Transparent fees, instant booking confirmation, and flexible scheduling.</p>
          </div>
        </div>
      </section>

    </div>
  );
}
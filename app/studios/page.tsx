'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, SlidersHorizontal, Camera, Mic, Headphones, Music, Palette } from 'lucide-react';

export default function ExploreStudios() {
  const [studios, setStudios] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [searchTerm, setSearchTerm] = useState('');

  const categories = ['All', 'Photo Studio', 'Sound Stage', 'Podcast Lounge', 'Music Suite', 'Art Workshop'];

  useEffect(() => {
    fetchStudios();
  }, [selectedCategory]);

  const fetchStudios = async () => {
    setLoading(true);
    try {
      const res = await fetch(`/api/studios?category=${encodeURIComponent(selectedCategory)}`);
      const data = await res.json();
      if (data.success) {
        setStudios(data.data);
      }
    } catch (error) {
      console.error('Failed to fetch studios', error);
    } finally {
      setLoading(false);
    }
  };

  const filteredStudios = studios.filter((studio) =>
    studio.name?.toLowerCase().includes(searchTerm.toLowerCase()) ||
    studio.location?.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Header */}
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight text-zinc-900 dark:text-white">Explore Creative Studios</h1>
        <p className="text-sm text-zinc-500 mt-1">Discover studios for photography, cyclorama stages, podcast hubs, and mixing rooms.</p>
      </div>

      {/* Search & Filter Bar */}
      <div className="flex flex-col md:flex-row gap-4 items-center justify-between bg-white dark:bg-zinc-900 p-4 rounded-2xl border border-zinc-200 dark:border-zinc-800 shadow-sm">
        
        {/* Search Input */}
        <div className="relative w-full md:w-96">
          <Search className="absolute left-3.5 top-3 w-4 h-4 text-zinc-400" />
          <input
            type="text"
            placeholder="Search studios by title, location, etc."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm pl-10 pr-4 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700 focus:outline-none focus:ring-2 focus:ring-amber-500"
          />
        </div>

        {/* Category Pills */}
        <div className="flex flex-wrap gap-2 w-full md:w-auto overflow-x-auto pb-2 md:pb-0">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`text-xs font-semibold px-4 py-2 rounded-xl transition-all whitespace-nowrap ${
                selectedCategory === cat
                  ? 'bg-amber-500 text-white shadow-md'
                  : 'bg-zinc-100 dark:bg-zinc-800 text-zinc-600 dark:text-zinc-300 hover:bg-zinc-200 dark:hover:bg-zinc-700'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

      </div>

      {/* Studios Grid / Loading / Empty States */}
      {loading ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {[1, 2, 3].map((n) => (
            <div key={n} className="bg-zinc-100 dark:bg-zinc-900 h-80 rounded-2xl animate-pulse"></div>
          ))}
        </div>
      ) : filteredStudios.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-lg font-semibold text-zinc-700 dark:text-zinc-300">No creative workspaces found</p>
          <p className="text-sm text-zinc-500 mt-1">Try searching for something else or changing your category filter.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredStudios.map((studio) => (
            <div key={studio._id} className="bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800 overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col">
              <div className="relative h-52">
                <img src={studio.image || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=800'} alt={studio.name} className="w-full h-full object-cover" />
                <span className="absolute top-3 left-3 bg-zinc-900/80 text-white text-xs font-semibold px-3 py-1 rounded-full backdrop-blur-md">
                  {studio.category}
                </span>
              </div>

              <div className="p-5 flex-grow flex flex-col justify-between space-y-4">
                <div>
                  <p className="text-xs text-zinc-500 mb-1">{studio.location || 'Location not specified'}</p>
                  <h3 className="font-bold text-lg text-zinc-900 dark:text-white line-clamp-1">{studio.name}</h3>
                  <p className="text-xs text-zinc-600 dark:text-zinc-400 line-clamp-2 mt-1">{studio.tagline || studio.description}</p>
                </div>

                <div className="pt-4 border-t border-zinc-100 dark:border-zinc-800 flex items-center justify-between">
                  <div>
                    <span className="text-lg font-extrabold text-amber-600 dark:text-amber-400">${studio.hourlyRate}</span>
                    <span className="text-xs text-zinc-500"> / hr</span>
                  </div>
                  <Link 
                    href={`/studios/${studio._id}`} 
                    className="bg-zinc-900 dark:bg-zinc-800 hover:bg-amber-500 dark:hover:bg-amber-500 text-white text-xs font-semibold px-4 py-2.5 rounded-xl transition-all"
                  >
                    View Details
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

    </div>
  );
}
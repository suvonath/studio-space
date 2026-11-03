'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import toast from 'react-hot-toast';
import { PlusCircle } from 'lucide-react';

export default function AddStudio() {
  const router = useRouter();
  const [submitting, setSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    category: 'Photo Studio',
    hourlyRate: '',
    securityDeposit: '',
    maxCapacity: '',
    location: '',
    image: '',
    description: '',
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const res = await fetch('/api/studios', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Studio workspace listed successfully!');
        router.push('/my-listings');
      } else {
        toast.error(data.error || 'Failed to list studio');
      }
    } catch (error) {
      toast.error('An error occurred.');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto px-4 py-12">
      <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-8 rounded-3xl shadow-xl space-y-6">
        <div>
          <h1 className="text-2xl font-extrabold flex items-center gap-2">
            <PlusCircle className="text-amber-500 w-6 h-6" /> List Your Creative Workspace
          </h1>
          <p className="text-sm text-zinc-500 mt-1">Share your photography studio, sound stage, or podcast lounge with creators.</p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Studio / Space Name</label>
            <input
              type="text"
              required
              placeholder="e.g. Neon Vault 4K Cinema Soundstage"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Studio Discipline / Category</label>
              <select
                value={formData.category}
                onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
              >
                <option value="Photo Studio">Photo Studio</option>
                <option value="Sound Stage">Sound Stage</option>
                <option value="Podcast Lounge">Podcast Lounge</option>
                <option value="Music Suite">Music Suite</option>
                <option value="Art Workshop">Art Workshop</option>
              </select>
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Max Creator Capacity</label>
              <input
                type="number"
                required
                min="1"
                placeholder="e.g. 30"
                value={formData.maxCapacity}
                onChange={(e) => setFormData({ ...formData, maxCapacity: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Hourly Rate ($ USD)</label>
              <input
                type="number"
                required
                placeholder="e.g. 135"
                value={formData.hourlyRate}
                onChange={(e) => setFormData({ ...formData, hourlyRate: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
              />
            </div>
            <div>
              <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Security Deposit ($ USD)</label>
              <input
                type="number"
                required
                placeholder="e.g. 150"
                value={formData.securityDeposit}
                onChange={(e) => setFormData({ ...formData, securityDeposit: e.target.value })}
                className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
              />
            </div>
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Location / Full Address</label>
            <input
              type="text"
              required
              placeholder="e.g. Downtown Los Angeles, CA"
              value={formData.location}
              onChange={(e) => setFormData({ ...formData, location: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Studio Image URL</label>
            <input
              type="url"
              required
              placeholder="https://images.unsplash.com/..."
              value={formData.image}
              onChange={(e) => setFormData({ ...formData, image: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <div>
            <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Workspace Overview & Description</label>
            <textarea
              rows={3}
              required
              placeholder="Describe amenities, acoustics, lighting grids..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2.5 rounded-xl border border-zinc-200 dark:border-zinc-700"
            />
          </div>

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all"
          >
            {submitting ? 'Publishing Listing...' : 'Publish Studio Listing'}
          </button>
        </form>
      </div>
    </div>
  );
}
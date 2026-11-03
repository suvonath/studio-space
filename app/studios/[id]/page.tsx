'use client';

import { useState, useEffect } from 'react';
import { useParams } from 'next/navigation';
import { ShieldCheck, Calendar, Clock, Users, DollarSign, CheckCircle2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function StudioDetails() {
  const { id } = useParams();
  const [studio, setStudio] = useState<any>(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Booking Form State
  const [bookingDate, setBookingDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [crewCount, setCrewCount] = useState(1);
  const [productionNotes, setProductionNotes] = useState('');
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (id) fetchStudioDetails();
  }, [id]);

  const fetchStudioDetails = async () => {
    try {
      // If mock ID (1, 2, 3) or MongoDB ID
      const res = await fetch(`/api/studios`);
      const data = await res.json();
      if (data.success) {
        const found = data.data.find((s: any) => s._id === id || s.id === id);
        if (found) setStudio(found);
        else {
          // Fallback mock studio if not found in db yet
          setStudio({
            name: 'Neon Vault 4K Cinema Soundstage & Cyclorama',
            tagline: 'Step into pre-rigged cyclorama soundstages and Dolby Atmos mixing suites.',
            category: 'Sound Stage',
            hourlyRate: 135,
            securityDeposit: 150,
            maxCapacity: 30,
            rating: 5.0,
            location: 'Downtown Los Angeles, CA',
            image: 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200',
            description: 'Massive 3,000 sqft creative soundstage with 22-foot ceilings, automated RGB lighting grid, heavy rigging trusses, and private green room.'
          });
        }
      }
    } catch (error) {
      console.error('Failed to fetch studio details', error);
    } finally {
      setLoading(false);
    }
  };

  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      const bookingData = {
        studioId: id,
        studioName: studio.name,
        bookingDate,
        startTime,
        endTime,
        crewCount,
        productionNotes,
        totalCost: (studio.hourlyRate * 3) + studio.securityDeposit, // estimated or calculated
        status: 'Pending Host Approval',
        createdAt: new Date()
      };

      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData)
      });

      const data = await res.json();
      if (data.success) {
        toast.success('Booking request submitted successfully!');
        setIsModalOpen(false);
      } else {
        toast.error(data.error || 'Failed to book studio');
      }
    } catch (error) {
      toast.error('An error occurred during booking.');
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return <div className="text-center py-32 text-zinc-500">Loading studio workspace details...</div>;
  }

  if (!studio) {
    return <div className="text-center py-32 text-zinc-500">Studio workspace not found.</div>;
  }

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      
      {/* Studio Header */}
      <div>
        <span className="text-xs font-semibold uppercase tracking-wider text-amber-500 bg-amber-50 dark:bg-zinc-800 px-3 py-1 rounded-full">
          {studio.category}
        </span>
        <h1 className="text-3xl sm:text-4xl font-extrabold text-zinc-900 dark:text-white mt-2">{studio.name}</h1>
        <p className="text-sm text-zinc-500 mt-1">{studio.location}</p>
      </div>

      {/* Image Gallery Showcase */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 rounded-2xl overflow-hidden shadow-lg h-96">
          <img src={studio.image || 'https://images.unsplash.com/photo-1598488035139-bdbb2231ce04?auto=format&fit=crop&q=80&w=1200'} alt={studio.name} className="w-full h-full object-cover" />
        </div>

        {/* Pricing & Booking Action Card */}
        <div className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-xl flex flex-col justify-between space-y-6">
          <div className="space-y-4">
            <div className="flex justify-between items-center border-b border-zinc-100 dark:border-zinc-800 pb-4">
              <div>
                <span className="text-3xl font-extrabold text-amber-600 dark:text-amber-400">${studio.hourlyRate}</span>
                <span className="text-xs text-zinc-500"> / hour</span>
              </div>
              <div className="text-right">
                <span className="text-sm font-semibold text-zinc-700 dark:text-zinc-300">★ {studio.rating || '5.0'}</span>
                <p className="text-xs text-zinc-500">Verified Rating</p>
              </div>
            </div>

            <div className="space-y-2 text-xs text-zinc-600 dark:text-zinc-400">
              <div className="flex justify-between">
                <span>Security Deposit:</span>
                <span className="font-semibold">${studio.securityDeposit || 150}</span>
              </div>
              <div className="flex justify-between">
                <span>Max Capacity:</span>
                <span className="font-semibold">{studio.maxCapacity || 20} people</span>
              </div>
              <div className="flex justify-between">
                <span>Cancellation Policy:</span>
                <span className="font-semibold text-emerald-600">Free before confirmation</span>
              </div>
            </div>
          </div>

          <button
            onClick={() => setIsModalOpen(true)}
            className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3.5 rounded-xl shadow-lg transition-all text-center"
          >
            Book Workspace Now
          </button>
        </div>
      </div>

      {/* Overview & Description */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6 bg-white dark:bg-zinc-900 p-8 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <h2 className="text-xl font-bold">Workspace Overview</h2>
          <p className="text-sm text-zinc-600 dark:text-zinc-300 leading-relaxed">
            {studio.description || studio.tagline}
          </p>

          <h3 className="font-bold text-base pt-4 border-t border-zinc-100 dark:border-zinc-800">Included Amenities & Production Gear</h3>
          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm text-zinc-600 dark:text-zinc-400">
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Cyclorama Wall</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> DMX Lighting Grid</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> High-speed Studio Wi-Fi</li>
            <li className="flex items-center gap-2"><CheckCircle2 className="w-4 h-4 text-amber-500" /> Private Green Room</li>
          </ul>
        </div>
      </div>

      {/* Booking Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 backdrop-blur-sm p-4">
          <div className="bg-white dark:bg-zinc-900 rounded-3xl max-w-md w-full p-6 shadow-2xl border border-zinc-200 dark:border-zinc-800 space-y-6">
            <div className="flex justify-between items-center">
              <h3 className="text-lg font-bold">Reserve Creative Slot</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-zinc-400 hover:text-zinc-600">✕</button>
            </div>

            <form onSubmit={handleBookingSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Booking Date</label>
                <input
                  type="date"
                  required
                  value={bookingDate}
                  onChange={(e) => setBookingDate(e.target.value)}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Start Time</label>
                  <input
                    type="time"
                    required
                    value={startTime}
                    onChange={(e) => setStartTime(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">End Time</label>
                  <input
                    type="time"
                    required
                    value={endTime}
                    onChange={(e) => setEndTime(e.target.value)}
                    className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Expected Crew Count</label>
                <input
                  type="number"
                  min="1"
                  value={crewCount}
                  onChange={(e) => setCrewCount(Number(e.target.value))}
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-zinc-600 dark:text-zinc-400 mb-1">Production Requirements / Notes</label>
                <textarea
                  rows={2}
                  value={productionNotes}
                  onChange={(e) => setProductionNotes(e.target.value)}
                  placeholder="e.g. Bringing high-output lighting..."
                  className="w-full bg-zinc-50 dark:bg-zinc-800 text-sm px-3 py-2 rounded-xl border border-zinc-200 dark:border-zinc-700"
                />
              </div>

              <button
                type="submit"
                disabled={submitting}
                className="w-full bg-amber-500 hover:bg-amber-600 text-white font-semibold py-3 rounded-xl shadow transition-all"
              >
                {submitting ? 'Confirming...' : 'Confirm & Send Booking Request'}
              </button>
            </form>
          </div>
        </div>
      )}

    </div>
  );
}
'use client';

import { useState, useEffect } from 'react';
import { Bookmark, Calendar, Clock, Trash2 } from 'lucide-react';
import toast from 'react-hot-toast';

export default function MyBookings() {
  const [bookings, setBookings] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  // Mock initial bookings to match the demo UI showcase if database is empty
  const mockBookings = [
    {
      _id: 'b1',
      studioName: 'Neon Vault 4K Cinema Soundstage & Cyclorama',
      category: 'Sound Stage',
      bookingDate: '2026-10-28',
      startTime: '10:00',
      endTime: '13:00',
      totalCost: 690,
      status: 'Pending Host Approval',
      location: 'Downtown Los Angeles, CA'
    },
    {
      _id: 'b2',
      studioName: 'The Prism Cyclorama Soundstage',
      category: 'Photo Studio',
      bookingDate: '2026-11-05',
      startTime: '14:00',
      endTime: '18:00',
      totalCost: 775,
      status: 'Confirmed Booking',
      location: 'Brooklyn New York, NY'
    }
  ];

  useEffect(() => {
    // For now, load mock bookings or fetched backend data
    setBookings(mockBookings);
    setLoading(false);
  }, []);

  const handleCancelBooking = (id: string) => {
    setBookings(bookings.filter(b => b._id !== id));
    toast.success('Booking cancelled successfully.');
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-8">
      <div>
        <h1 className="text-3xl font-extrabold tracking-tight">My Studio Bookings</h1>
        <p className="text-sm text-zinc-500 mt-1">Manage your upcoming creative slot reservations and production schedules.</p>
      </div>

      {loading ? (
        <div className="text-center py-20 text-zinc-500">Loading your bookings...</div>
      ) : bookings.length === 0 ? (
        <div className="text-center py-20 bg-white dark:bg-zinc-900 rounded-2xl border border-zinc-200 dark:border-zinc-800">
          <p className="text-lg font-semibold">No studio bookings found</p>
          <p className="text-sm text-zinc-500 mt-1">Explore studios and book your first session!</p>
        </div>
      ) : (
        <div className="space-y-4">
          {bookings.map((booking) => (
            <div key={booking._id} className="bg-white dark:bg-zinc-900 border border-zinc-200 dark:border-zinc-800 p-6 rounded-2xl shadow-sm flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div className="space-y-2">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-semibold px-2.5 py-1 rounded-full bg-amber-500/10 text-amber-500 border border-amber-500/20">
                    {booking.status}
                  </span>
                  <span className="text-xs text-zinc-500">ID: #{booking._id}</span>
                </div>
                <h3 className="text-lg font-bold text-zinc-900 dark:text-white">{booking.studioName}</h3>
                <div className="flex flex-wrap gap-4 text-xs text-zinc-500">
                  <span className="flex items-center gap-1"><Calendar className="w-3.5 h-3.5 text-amber-500" /> {booking.bookingDate}</span>
                  <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5 text-amber-500" /> {booking.startTime} - {booking.endTime}</span>
                  <span>📍 {booking.location}</span>
                </div>
              </div>

              <div className="flex items-center gap-4 w-full md:w-auto justify-between md:justify-end border-t md:border-t-0 pt-4 md:pt-0 border-zinc-100 dark:border-zinc-800">
                <div className="text-right">
                  <p className="text-xs text-zinc-500">Total Charged</p>
                  <p className="text-xl font-extrabold text-amber-600 dark:text-amber-400">${booking.totalCost}</p>
                </div>
                <button
                  onClick={() => handleCancelBooking(booking._id)}
                  className="bg-red-50 dark:bg-red-950/30 text-red-600 hover:bg-red-100 text-xs font-semibold px-4 py-2.5 rounded-xl transition-all border border-red-200 dark:border-red-900/50 flex items-center gap-1.5"
                >
                  <Trash2 className="w-4 h-4" /> Cancel Booking
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
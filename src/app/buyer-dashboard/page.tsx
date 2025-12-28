'use client';
import ChatWidget from '@/components/ChatWidget';
import { useSearchParams } from 'next/navigation';

export default function BuyerDashboard() {
  const searchParams = useSearchParams();
  const role = searchParams.get('role') || 'buyer';

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-blue-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl text-white">🛒</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Buyer Dashboard</h1>
              <p className="text-xl text-blue-600">Find your dream car! 🚗</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center py-12">
            <div className="p-8 bg-gradient-to-r from-blue-500/10 to-blue-600/10 rounded-2xl border-2 border-blue-200">
              <div className="text-4xl mb-4">💰</div>
              <h3 className="text-2xl font-bold mb-2">DP Calculator</h3>
              <p>Low downpayment options</p>
            </div>
            <div className="p-8 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl border-2 border-green-200">
              <div className="text-4xl mb-4">📱</div>
              <h3 className="text-2xl font-bold mb-2">Monthly Plans</h3>
              <p>Flexible payment terms</p>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget userRole="buyer" />
    </div>
  );
}

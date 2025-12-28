'use client';
import ChatWidget from '@/components/ChatWidget';

export default function SellerDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-green-50 to-emerald-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-green-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl text-white">💰</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Seller Dashboard</h1>
              <p className="text-xl text-green-600">Sell your car fast! 🚀</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center py-12">
            <div className="p-8 bg-gradient-to-r from-green-500/10 to-green-600/10 rounded-2xl border-2 border-green-200">
              <div className="text-4xl mb-4">📸</div>
              <h3 className="text-2xl font-bold mb-2">Quick Listing</h3>
              <p>3 days max nakabenta!</p>
            </div>
            <div className="p-8 bg-gradient-to-r from-orange-500/10 to-orange-600/10 rounded-2xl border-2 border-orange-200">
              <div className="text-4xl mb-4">💸</div>
              <h3 className="text-2xl font-bold mb-2">Cash Buyers</h3>
              <p>Ready na magbayad!</p>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget userRole="seller" />
    </div>
  );
}
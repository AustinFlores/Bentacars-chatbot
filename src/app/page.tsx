'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import ChatWidget from '@/components/ChatWidget';

export default function LandingPage() {
  const [userRole, setUserRole] = useState<string | null>(null);
  const router = useRouter();

  const fakeLogin = (role: string) => {
    setUserRole(role);
    // Redirect to sample dashboard
    router.push(`/${role}-dashboard`);
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-blue-50">
      <header className="bg-white/80 backdrop-blur-md border-b border-orange-100 sticky top-0 z-50">
        <div className="max-w-6xl mx-auto px-4 py-6 flex justify-between items-center">
          <div className="flex items-center gap-3">
            <div className="w-12 h-12 bg-gradient-to-r from-orange-500 to-yellow-500 rounded-2xl flex items-center justify-center">
              <span className="text-2xl">🚗</span>
            </div>
            <h1 className="text-2xl font-bold bg-gradient-to-r from-orange-600 to-yellow-600 bg-clip-text text-transparent">
              BentaCars
            </h1>
          </div>
          {userRole ? (
            <div className="flex items-center gap-2 bg-green-100 px-4 py-2 rounded-xl text-sm font-bold text-green-800">
              <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
              ✅ Logged in as {userRole}
            </div>
          ) : (
            <div className="text-sm text-gray-500">Visitor Mode</div>
          )}
        </div>
      </header>

      <div className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h2 className="text-5xl md:text-6xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-6">
          Role-Based Chatbot
        </h2>
        
        {!userRole ? (
          <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto mt-12">
            <button
              onClick={() => fakeLogin('buyer')}
              className="group p-8 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-transparent hover:border-blue-200 hover:shadow-2xl hover:-translate-y-2 transition-all bg-gradient-to-r from-blue-50 hover:from-blue-100"
            >
              <div className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r from-blue-500 to-blue-600 shadow-xl group-hover:shadow-2xl">
                <span className="text-2xl font-bold text-white">🛒 Buyer</span>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">Find Cars</p>
              <p className="text-sm text-blue-600 font-medium">DP • Monthly</p>
            </button>

            <button
              onClick={() => fakeLogin('seller')}
              className="group p-8 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-transparent hover:border-green-200 hover:shadow-2xl hover:-translate-y-2 transition-all bg-gradient-to-r from-green-50 hover:from-green-100"
            >
              <div className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r from-green-500 to-green-600 shadow-xl group-hover:shadow-2xl">
                <span className="text-2xl font-bold text-white">💰 Seller</span>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">List Cars</p>
              <p className="text-sm text-green-600 font-medium">Quick Sale</p>
            </button>

            <button
              onClick={() => fakeLogin('agent')}
              className="group p-8 bg-white/70 backdrop-blur-xl rounded-3xl border-2 border-transparent hover:border-purple-200 hover:shadow-2xl hover:-translate-y-2 transition-all bg-gradient-to-r from-purple-50 hover:from-purple-100"
            >
              <div className="w-full h-20 rounded-2xl mb-6 flex items-center justify-center bg-gradient-to-r from-purple-500 to-purple-600 shadow-xl group-hover:shadow-2xl">
                <span className="text-2xl font-bold text-white">👨‍💼 Agent</span>
              </div>
              <p className="text-xl font-bold text-gray-800 mb-2">Dashboard</p>
              <p className="text-sm text-purple-600 font-medium">Manage All</p>
            </button>
          </div>
        ) : (
          <div className="mt-12 p-8 bg-green-50 border-2 border-green-200 rounded-3xl max-w-2xl mx-auto">
            <div className="text-2xl font-bold text-green-800 mb-4">✅ Login Successful!</div>
            <p className="text-lg text-green-700 mb-6">Role: <span className="font-bold capitalize">{userRole}</span></p>
            <button
              onClick={() => setUserRole(null)}
              className="px-6 py-2 bg-gray-500 text-white rounded-xl hover:bg-gray-600"
            >
              Logout (Demo)
            </button>
          </div>
        )}
      </div>

      {/* Always Visible Widget */}
      <ChatWidget userRole={userRole || 'visitor'} />
    </div>
  );
}

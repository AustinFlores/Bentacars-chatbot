'use client';
import ChatWidget from '@/components/ChatWidget';

export default function AgentDashboard() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="bg-white rounded-3xl shadow-2xl p-8 border border-purple-100">
          <div className="flex items-center gap-4 mb-8">
            <div className="w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 rounded-2xl flex items-center justify-center">
              <span className="text-2xl text-white">👨‍💼</span>
            </div>
            <div>
              <h1 className="text-4xl font-bold text-gray-900">Agent Dashboard</h1>
              <p className="text-xl text-purple-600">Manage your deals! 📊</p>
            </div>
          </div>
          <div className="grid md:grid-cols-2 gap-6 text-center py-12">
            <div className="p-8 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-2xl border-2 border-purple-200">
              <div className="text-4xl mb-4">📈</div>
              <h3 className="text-2xl font-bold mb-2">Hot Leads</h3>
              <p>80% closing rate!</p>
            </div>
            <div className="p-8 bg-gradient-to-r from-yellow-500/10 to-yellow-600/10 rounded-2xl border-2 border-yellow-200">
              <div className="text-4xl mb-4">💵</div>
              <h3 className="text-2xl font-bold mb-2">Commissions</h3>
              <p>Track your earnings!</p>
            </div>
          </div>
        </div>
      </div>
      <ChatWidget userRole="agent" />
    </div>
  );
}

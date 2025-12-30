
import React, { useState } from 'react';
import { MOCK_WORKFORCE } from '../constants';

const Workforce: React.FC = () => {
  const [selectedWorker, setSelectedWorker] = useState<typeof MOCK_WORKFORCE[0] | null>(null);
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showScanModal, setShowScanModal] = useState(false);

  const handleProfileClick = (worker: typeof MOCK_WORKFORCE[0]) => {
    setSelectedWorker(worker);
  };

  const handleCloseProfile = () => {
    setSelectedWorker(null);
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-industrial font-bold text-slate-800 tracking-tight">Personnel Roster</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time attendance & productivity metrics</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={() => setShowScanModal(true)}
            className="bg-white border border-slate-200 px-4 py-2.5 rounded font-industrial text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2"
          >
            <i className="fa-solid fa-qrcode"></i> Scan Credentials
          </button>
          <button
            onClick={() => setShowRegisterModal(true)}
            className="bg-[#F5C518] text-[#000] px-6 py-2.5 rounded font-industrial text-xs font-bold hover:bg-yellow-400 shadow-[0_4px_0_#C49D13] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
          >
            <i className="fa-solid fa-user-plus"></i> Register Operator
          </button>
        </div>
      </div>

      {/* Dashboard Summary Row */}
      <div className="bg-slate-900 p-8 rounded border-b-4 border-[#F5C518] shadow-xl grid grid-cols-2 lg:grid-cols-4 gap-8">
        {[
          { label: 'Total On-Site', val: '42', icon: 'fa-users', color: 'text-[#F5C518]' },
          { label: 'Daily Arrival Rate', val: '86%', icon: 'fa-calendar-check', color: 'text-green-500' },
          { label: 'Active Man-Hours', val: '1,240', icon: 'fa-clock', color: 'text-blue-400' },
          { label: 'Critical Absences', val: '04', icon: 'fa-user-minus', color: 'text-red-500' }
        ].map((item, i) => (
          <div key={i} className="flex flex-col">
            <div className="flex items-center gap-2 mb-2">
              <i className={`fa-solid ${item.icon} text-[10px] ${item.color}`}></i>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">{item.label}</span>
            </div>
            <h4 className="text-3xl font-industrial font-bold text-white tracking-tighter">{item.val}</h4>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {MOCK_WORKFORCE.map((worker) => (
          <div key={worker.id} className="bg-white rounded border border-slate-200 flex flex-col group hover:border-[#F5C518] transition-all overflow-hidden shadow-sm">
            <div className="p-6">
              <div className="flex items-start gap-4 mb-6">
                <div className="relative">
                  <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${worker.name}`} alt={worker.name} className="w-14 h-14 rounded bg-slate-100 border border-slate-100 p-1" />
                  <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${worker.attendanceStatus === 'Present' ? 'bg-green-500' :
                      worker.attendanceStatus === 'Late' ? 'bg-amber-500' : 'bg-red-500'
                    }`}></div>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">{worker.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{worker.role}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] ${worker.attendanceStatus === 'Present' ? 'bg-green-100 text-green-700' :
                      worker.attendanceStatus === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {worker.attendanceStatus}
                  </span>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4 pt-4 border-t border-slate-50">
                <div>
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Check-in</p>
                  <p className="text-xs font-bold text-slate-700 font-industrial">{worker.lastCheckIn}</p>
                </div>
                <div className="text-right">
                  <p className="text-[9px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Productivity</p>
                  <div className="flex items-center justify-end gap-1">
                    <span className={`text-sm font-industrial font-bold ${worker.productivityScore > 90 ? 'text-green-600' : 'text-blue-600'}`}>
                      {worker.productivityScore > 0 ? `${worker.productivityScore}%` : 'N/A'}
                    </span>
                    {worker.productivityScore > 0 && <i className="fa-solid fa-arrow-trend-up text-[10px] text-green-500"></i>}
                  </div>
                </div>
              </div>
            </div>

            <button
              onClick={() => handleProfileClick(worker)}
              className="mt-auto w-full py-3 bg-slate-50 text-slate-500 group-hover:bg-[#1A1A1A] group-hover:text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-t border-slate-100 group-hover:border-transparent"
            >
              Field Analytics Profile
            </button>
          </div>
        ))}

        {/* Placeholder for Add Worker */}
        <button
          onClick={() => setShowRegisterModal(true)}
          className="bg-slate-50 border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-white hover:border-[#F5C518] hover:text-[#F5C518] transition-all gap-3 group"
        >
          <i className="fa-solid fa-user-plus text-2xl group-hover:scale-110 transition-transform"></i>
          <span className="font-industrial text-sm font-bold tracking-widest uppercase">Register Worker</span>
        </button>
      </div>

      {/* Worker Profile Modal */}
      {selectedWorker && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={handleCloseProfile}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-200">
              {/* Modal Header */}
              <div className="bg-gradient-to-r from-[#1A1A1A] to-slate-800 p-6 flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <img
                    src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${selectedWorker.name}`}
                    alt={selectedWorker.name}
                    className="w-16 h-16 rounded-full bg-white p-1"
                  />
                  <div>
                    <h3 className="text-xl font-industrial font-bold text-white">{selectedWorker.name}</h3>
                    <p className="text-sm text-slate-400 uppercase tracking-wide">{selectedWorker.role}</p>
                  </div>
                </div>
                <button
                  onClick={handleCloseProfile}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>

              {/* Modal Content */}
              <div className="p-6 space-y-6">
                {/* Status Badge */}
                <div className="flex items-center gap-4">
                  <span className={`px-4 py-2 rounded-full text-sm font-bold ${selectedWorker.attendanceStatus === 'Present' ? 'bg-green-100 text-green-700' :
                      selectedWorker.attendanceStatus === 'Late' ? 'bg-amber-100 text-amber-700' : 'bg-red-100 text-red-700'
                    }`}>
                    {selectedWorker.attendanceStatus}
                  </span>
                  <span className="text-sm text-slate-600">Last check-in: <strong>{selectedWorker.lastCheckIn}</strong></span>
                </div>

                {/* Analytics Grid */}
                <div className="grid grid-cols-2 gap-4">
                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Productivity Score</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-industrial font-bold text-slate-800">{selectedWorker.productivityScore}%</span>
                      <i className="fa-solid fa-arrow-trend-up text-green-500"></i>
                    </div>
                    <div className="mt-2 h-2 bg-slate-200 rounded-full overflow-hidden">
                      <div
                        className="h-full bg-green-500 transition-all"
                        style={{ width: `${selectedWorker.productivityScore}%` }}
                      ></div>
                    </div>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Attendance Rate</p>
                    <div className="flex items-baseline gap-2">
                      <span className="text-3xl font-industrial font-bold text-slate-800">94%</span>
                    </div>
                    <p className="text-xs text-slate-600 mt-2">23/24 days present</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Hours Logged</p>
                    <span className="text-3xl font-industrial font-bold text-slate-800">186.5</span>
                    <p className="text-xs text-slate-600 mt-2">This month</p>
                  </div>

                  <div className="bg-slate-50 p-4 rounded-lg">
                    <p className="text-xs text-slate-500 uppercase tracking-wider mb-2">Safety Score</p>
                    <span className="text-3xl font-industrial font-bold text-green-600">98%</span>
                    <p className="text-xs text-slate-600 mt-2">No violations</p>
                  </div>
                </div>

                {/* Recent Activity */}
                <div>
                  <h4 className="text-sm font-bold text-slate-700 mb-3 uppercase tracking-wide">Recent Activity</h4>
                  <div className="space-y-2">
                    {[
                      { time: '08:30 AM', action: 'Checked in to site', icon: 'fa-right-to-bracket', color: 'text-green-600' },
                      { time: '09:15 AM', action: 'Started Foundation Work - Tower A', icon: 'fa-hammer', color: 'text-blue-600' },
                      { time: '12:30 PM', action: 'Lunch break', icon: 'fa-utensils', color: 'text-amber-600' },
                      { time: '01:00 PM', action: 'Resumed work', icon: 'fa-play', color: 'text-green-600' },
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-center gap-3 p-2 hover:bg-slate-50 rounded">
                        <i className={`fa-solid ${item.icon} ${item.color}`}></i>
                        <span className="text-xs font-bold text-slate-500">{item.time}</span>
                        <span className="text-sm text-slate-700">{item.action}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Actions */}
                <div className="flex gap-3 pt-4 border-t">
                  <button className="flex-1 bg-slate-100 hover:bg-slate-200 text-slate-700 py-3 rounded font-bold text-sm transition-colors">
                    View Full History
                  </button>
                  <button className="flex-1 bg-[#F5C518] hover:bg-yellow-400 text-black py-3 rounded font-bold text-sm transition-colors">
                    Export Report
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Register Modal */}
      {showRegisterModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={() => setShowRegisterModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200">
              <div className="bg-[#F5C518] p-6 flex items-center justify-between">
                <h3 className="text-xl font-industrial font-bold text-black">Register New Worker</h3>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-6">
                <p className="text-slate-600 mb-4">Worker registration functionality coming soon. This will allow you to add new personnel to the system.</p>
                <button
                  onClick={() => setShowRegisterModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Scan Modal */}
      {showScanModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={() => setShowScanModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200">
              <div className="bg-slate-800 p-6 flex items-center justify-between">
                <h3 className="text-xl font-industrial font-bold text-white">Scan QR Code</h3>
                <button
                  onClick={() => setShowScanModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-6 text-center">
                <div className="w-48 h-48 mx-auto bg-slate-100 rounded-lg flex items-center justify-center mb-4">
                  <i className="fa-solid fa-qrcode text-6xl text-slate-400"></i>
                </div>
                <p className="text-slate-600 mb-4">QR code scanner functionality coming soon. This will allow quick credential verification.</p>
                <button
                  onClick={() => setShowScanModal(false)}
                  className="w-full bg-slate-800 hover:bg-slate-700 text-white py-3 rounded font-bold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Workforce;


import React from 'react';
import { MOCK_WORKFORCE } from '../constants';

const Workforce: React.FC = () => {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-industrial font-bold text-slate-800 tracking-tight">Personnel Roster</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Real-time attendance & productivity metrics</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2.5 rounded font-industrial text-xs font-bold text-slate-600 hover:bg-slate-50 shadow-sm flex items-center gap-2">
            <i className="fa-solid fa-qrcode"></i> Scan Credentials
          </button>
          <button className="bg-[#F5C518] text-[#000] px-6 py-2.5 rounded font-industrial text-xs font-bold hover:bg-yellow-400 shadow-[0_4px_0_#C49D13] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2">
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
                   <div className={`absolute -bottom-1 -right-1 w-4 h-4 rounded-full border-2 border-white ${
                     worker.attendanceStatus === 'Present' ? 'bg-green-500' :
                     worker.attendanceStatus === 'Late' ? 'bg-amber-500' : 'bg-red-500'
                   }`}></div>
                </div>
                <div className="overflow-hidden">
                  <h3 className="font-bold text-slate-800 text-sm truncate uppercase tracking-tight">{worker.name}</h3>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2">{worker.role}</p>
                  <span className={`inline-block px-2 py-0.5 rounded text-[8px] font-black uppercase tracking-[0.2em] ${
                    worker.attendanceStatus === 'Present' ? 'bg-green-100 text-green-700' :
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

            <button className="mt-auto w-full py-3 bg-slate-50 text-slate-500 group-hover:bg-[#1A1A1A] group-hover:text-[#F5C518] text-[10px] font-bold uppercase tracking-[0.2em] transition-all border-t border-slate-100 group-hover:border-transparent">
              Field Analytics Profile
            </button>
          </div>
        ))}

        {/* Placeholder for Add Worker */}
        <button className="bg-slate-50 border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center p-8 text-slate-400 hover:bg-white hover:border-[#F5C518] hover:text-[#F5C518] transition-all gap-3 group">
            <i className="fa-solid fa-user-plus text-2xl group-hover:scale-110 transition-transform"></i>
            <span className="font-industrial text-sm font-bold tracking-widest uppercase">Register Worker</span>
        </button>
      </div>
    </div>
  );
};

export default Workforce;


import React from 'react';
import { MOCK_MATERIALS } from '../constants';

const Materials: React.FC = () => {
  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
           <h2 className="text-2xl font-industrial font-bold text-slate-800 tracking-tight">Material Inventory</h2>
           <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Resource allocation & stock tracking</p>
        </div>
        <div className="flex gap-3">
          <button className="bg-white border border-slate-200 px-4 py-2 rounded font-industrial text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm">
            <i className="fa-solid fa-download mr-2"></i> Manifest Export
          </button>
          <button className="bg-[#F5C518] text-[#000] px-6 py-2.5 rounded font-industrial text-xs font-bold hover:bg-yellow-400 shadow-[0_4px_0_#C49D13] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2">
            <i className="fa-solid fa-box-open"></i> Add Stock Entry
          </button>
        </div>
      </div>

      <div className="bg-white rounded border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left border-collapse">
          <thead>
            <tr className="bg-slate-900 text-white font-industrial">
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">Nomenclature</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">Qty On Hand</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">Critical Level</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold">Status</th>
              <th className="px-6 py-4 text-[10px] uppercase tracking-[0.2em] font-bold text-right">Last Audit</th>
              <th className="px-6 py-4"></th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {MOCK_MATERIALS.map((item) => {
              const isLow = item.quantity <= item.reorderLevel;
              return (
                <tr key={item.id} className="hover:bg-slate-50/50 transition-colors group">
                  <td className="px-6 py-4">
                    <p className="font-bold text-slate-800 text-sm group-hover:text-blue-600 transition-colors">{item.itemName}</p>
                    <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">SKU: {item.id.toUpperCase()}</p>
                  </td>
                  <td className="px-6 py-4">
                    <span className="font-industrial text-lg font-bold text-slate-700">{item.quantity}</span>
                    <span className="text-[10px] font-bold text-slate-400 ml-1 uppercase">{item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    <span className="text-xs font-bold text-slate-500 italic">{item.reorderLevel} {item.unit}</span>
                  </td>
                  <td className="px-6 py-4">
                    {isLow ? (
                      <div className="flex items-center gap-2 bg-red-50 text-red-700 px-3 py-1 rounded border border-red-100 w-fit">
                         <i className="fa-solid fa-triangle-exclamation text-[10px] animate-pulse"></i>
                         <span className="text-[10px] font-bold uppercase tracking-widest">Stock Alert</span>
                      </div>
                    ) : (
                      <div className="flex items-center gap-2 bg-green-50 text-green-700 px-3 py-1 rounded border border-green-100 w-fit">
                         <i className="fa-solid fa-circle-check text-[10px]"></i>
                         <span className="text-[10px] font-bold uppercase tracking-widest">Nominal</span>
                      </div>
                    )}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <span className="text-[11px] font-bold text-slate-400 tabular-nums">{item.lastUpdated}</span>
                  </td>
                  <td className="px-6 py-4 text-right">
                    <div className="flex justify-end gap-1 opacity-40 group-hover:opacity-100 transition-opacity">
                      <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded hover:bg-white border border-transparent hover:border-slate-200">
                        <i className="fa-solid fa-edit text-xs"></i>
                      </button>
                      <button className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-600 rounded hover:bg-white border border-transparent hover:border-slate-200">
                        <i className="fa-solid fa-trash text-xs"></i>
                      </button>
                    </div>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Industrial Key Indicators */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-4">
        {[
          { label: 'Total Asset Value', val: '$142.5k', icon: 'fa-dollar-sign', color: 'text-blue-600', trend: '+12%', sub: 'vs baseline' },
          { label: 'Supply Lead Time', val: '4.2d', icon: 'fa-clock-rotate-left', color: 'text-slate-700', trend: '-0.5d', sub: 'efficiency gain' },
          { label: 'Waste Metrics', val: '2.4%', icon: 'fa-dumpster', color: 'text-red-600', trend: '-0.2%', sub: 'reduction target' }
        ].map((k, i) => (
          <div key={i} className="bg-slate-900 p-6 rounded relative overflow-hidden group shadow-lg">
            <div className="relative z-10 flex flex-col h-full">
               <span className="text-[9px] font-bold text-slate-500 uppercase tracking-[0.2em] mb-4 group-hover:text-[#F5C518] transition-colors">{k.label}</span>
               <div className="flex items-baseline gap-2 mb-2">
                 <h4 className="text-4xl font-industrial font-bold text-white tracking-tight">{k.val}</h4>
                 <span className={`text-[10px] font-bold ${k.trend.startsWith('+') ? 'text-green-500' : 'text-blue-400'}`}>{k.trend}</span>
               </div>
               <span className="text-[10px] text-slate-600 font-bold uppercase tracking-widest">{k.sub}</span>
            </div>
            <i className={`fa-solid ${k.icon} absolute -right-2 -bottom-2 text-white/5 text-6xl pointer-events-none group-hover:scale-110 transition-transform`}></i>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Materials;

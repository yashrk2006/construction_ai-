
import React, { useState } from 'react';
import { generateProjectSummary } from '../geminiService';
import { MOCK_TASKS, MOCK_WORKFORCE, COLORS } from '../constants';

const Reports: React.FC = () => {
  const [report, setReport] = useState<string>('');
  const [isGenerating, setIsGenerating] = useState(false);

  const handleGenerateReport = async () => {
    setIsGenerating(true);
    try {
      const summary = await generateProjectSummary(MOCK_TASKS, MOCK_WORKFORCE);
      setReport(summary || '');
    } catch (err) {
      console.error(err);
      alert('Report generation failed. Please check Gemini API availability.');
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-700">
      {/* Configuration Area */}
      <div className="bg-white p-8 rounded border border-slate-200 shadow-sm flex flex-col md:flex-row justify-between items-center gap-6">
        <div className="flex items-center gap-6">
           <div className="w-14 h-14 bg-slate-900 rounded flex items-center justify-center text-[#F5C518] shadow-lg">
              <i className="fa-solid fa-file-invoice text-2xl"></i>
           </div>
           <div>
              <h2 className="text-xl font-industrial font-bold text-slate-800 tracking-tight">Daily Status Architect</h2>
              <p className="text-xs text-slate-500 font-bold uppercase tracking-widest">Generate executive field reports using AI</p>
           </div>
        </div>
        <div className="flex gap-4 w-full md:w-auto">
          <select className="flex-1 md:w-48 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded font-industrial text-xs font-bold uppercase tracking-widest outline-none focus:border-[#F5C518]">
            <option>Today's Shift</option>
            <option>Weekly Recap</option>
            <option>Monthly Audit</option>
          </select>
          <button 
            onClick={handleGenerateReport}
            disabled={isGenerating}
            className="bg-[#1A1A1A] text-white px-8 py-3 rounded font-industrial font-bold text-xs uppercase tracking-[0.2em] hover:bg-black disabled:opacity-50 transition-all flex items-center gap-3 shadow-lg active:translate-y-1"
          >
            {isGenerating ? (
              <div className="w-4 h-4 border-2 border-[#F5C518] border-t-transparent rounded-full animate-spin"></div>
            ) : <i className="fa-solid fa-sparkles text-[#F5C518]"></i>}
            Generate Report
          </button>
        </div>
      </div>

      {report ? (
        <div className="bg-white p-12 rounded shadow-2xl border border-slate-200 relative overflow-hidden group">
          {/* Industrial Header Decor */}
          <div className="absolute top-0 left-0 right-0 h-2 hazard-strip-sm"></div>
          
          {/* Document Header */}
          <div className="flex justify-between items-start mb-12 pb-8 border-b-4 border-slate-900">
            <div>
              <div className="flex items-center gap-2 mb-2">
                 <div className="w-6 h-6 bg-[#F5C518] rounded-sm"></div>
                 <h1 className="text-4xl font-industrial font-bold text-slate-900 tracking-tight uppercase">Daily Field Report</h1>
              </div>
              <p className="text-slate-500 font-bold uppercase tracking-[0.3em] text-xs">BuildSmart Intelligence Systems</p>
            </div>
            <div className="text-right flex flex-col items-end">
              <div className="bg-slate-900 text-[#F5C518] px-4 py-1 font-industrial font-bold text-xs tracking-widest mb-2">
                AUTHENTICATED: {new Date().toLocaleDateString()}
              </div>
              <p className="text-[10px] text-slate-400 font-bold uppercase">ID: BSM-RT-{Date.now().toString().slice(-6)}</p>
            </div>
          </div>

          {/* Site Overview Stats */}
          <div className="grid grid-cols-4 gap-8 mb-12 bg-slate-50 p-6 rounded border border-slate-200">
             <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Project</span>
                <span className="text-xs font-bold text-slate-800">Skyline Tower Ph. II</span>
             </div>
             <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Shift Completion</span>
                <span className="text-xs font-bold text-green-600">68% Total</span>
             </div>
             <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Personnel Count</span>
                <span className="text-xs font-bold text-slate-800">42 On-Site</span>
             </div>
             <div>
                <span className="text-[9px] font-black text-slate-400 uppercase tracking-widest mb-1 block">Safety Incidents</span>
                <span className="text-xs font-bold text-slate-800">00 Logged</span>
             </div>
          </div>

          {/* Report Body */}
          <div className="prose prose-slate max-w-none">
            <h4 className="font-industrial text-slate-900 font-bold text-lg mb-6 flex items-center gap-2">
               <i className="fa-solid fa-robot text-blue-600"></i> AI Generated Summary
            </h4>
            <div className="whitespace-pre-wrap text-slate-700 leading-relaxed text-lg border-l-4 border-slate-100 pl-8 italic">
              {report}
            </div>
          </div>

          {/* Footer / Signature Area */}
          <div className="mt-16 pt-8 border-t border-slate-100 grid grid-cols-1 md:grid-cols-2 gap-12 items-end">
             <div className="space-y-4">
                <div className="h-16 w-48 border-b border-slate-400 flex items-center">
                   <span className="text-slate-300 font-industrial text-xl italic opacity-50">Authorized Sig.</span>
                </div>
                <div>
                   <p className="font-industrial font-bold text-slate-800 text-sm">John Foreman</p>
                   <p className="text-[10px] text-slate-500 font-bold uppercase tracking-widest">Certified Field Manager | LIC# 8893-X</p>
                </div>
             </div>
             <div className="flex items-center justify-end gap-4">
               <button className="px-6 py-3 bg-white border-2 border-slate-200 text-slate-800 rounded font-industrial font-bold text-xs uppercase tracking-widest hover:bg-slate-50 transition-all flex items-center gap-2">
                 <i className="fa-solid fa-file-pdf"></i> Download PDF
               </button>
               <button className="px-8 py-3 bg-[#F5C518] text-[#000] rounded font-industrial font-bold text-xs uppercase tracking-[0.2em] shadow-[0_4px_0_#C49D13] hover:shadow-[0_2px_0_#C49D13] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2">
                 <i className="fa-solid fa-paper-plane"></i> Dispatch to Stakeholders
               </button>
             </div>
          </div>
        </div>
      ) : !isGenerating && (
        <div className="text-center py-32 bg-slate-50 border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center group hover:bg-white hover:border-[#F5C518] transition-all">
          <div className="w-20 h-20 bg-slate-100 rounded-full flex items-center justify-center text-slate-300 mb-6 group-hover:scale-110 transition-transform">
             <i className="fa-solid fa-file-circle-plus text-4xl"></i>
          </div>
          <h3 className="text-lg font-industrial font-bold text-slate-800 tracking-widest uppercase mb-2">No Report Available</h3>
          <p className="text-xs text-slate-400 font-medium max-w-xs">Initialize the AI reporting engine by selecting your shift parameters and clicking generate.</p>
        </div>
      )}
    </div>
  );
};

export default Reports;


import React, { useState, useRef } from 'react';
import { getSafetyAnalysis } from '../geminiService';

const SafetyAI: React.FC = () => {
  const [isAnalyzing, setIsAnalyzing] = useState(false);
  const [analysisResult, setAnalysisResult] = useState<any>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        const result = reader.result as string;
        const base64String = result.split(',')[1];
        setPreviewUrl(result);
        analyzeImage(base64String);
      };
      reader.readAsDataURL(file);
    }
  };

  const analyzeImage = async (base64: string) => {
    setIsAnalyzing(true);
    setAnalysisResult(null);
    try {
      const res = await getSafetyAnalysis(base64);
      setAnalysisResult(res);
    } catch (err) {
      console.error(err);
      alert('AI Inference Error. Please verify your connection or Gemini API key.');
    } finally {
      setIsAnalyzing(false);
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-8 animate-in fade-in zoom-in-95 duration-500">
      {/* Page Header Area */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-[#1A1A1A] text-white p-8 rounded border-b-4 border-[#F5C518] shadow-xl relative overflow-hidden">
          <div className="relative z-10">
            <div className="flex items-center gap-3 mb-4">
               <div className="w-10 h-10 bg-[#F5C518] rounded flex items-center justify-center text-[#000]">
                  <i className="fa-solid fa-camera-retro text-xl"></i>
               </div>
               <h2 className="text-2xl font-industrial font-bold tracking-tight">AI Vision Inspector</h2>
            </div>
            <p className="text-slate-400 text-sm max-w-md mb-8 leading-relaxed">
              Real-time OSHA compliance monitoring. Analyze site photography for PPE violations, equipment misuse, and environmental hazards using Gemini Vision Pro.
            </p>

            <div className="flex flex-wrap gap-4">
              <button 
                onClick={() => fileInputRef.current?.click()}
                className="bg-[#F5C518] text-[#000] px-8 py-3 rounded font-industrial font-bold text-sm shadow-[0_4px_0_#C49D13] hover:shadow-[0_2px_0_#C49D13] hover:translate-y-0.5 active:translate-y-1 active:shadow-none transition-all flex items-center gap-2"
              >
                <i className="fa-solid fa-upload"></i>
                Upload Site Capture
              </button>
              <button className="bg-white/10 hover:bg-white/20 text-white border border-white/10 px-6 py-3 rounded font-industrial font-bold text-sm transition-all flex items-center gap-2">
                <i className="fa-solid fa-video"></i>
                Connect CCTV
              </button>
            </div>
            
            <input 
              type="file" 
              accept="image/*" 
              className="hidden" 
              ref={fileInputRef} 
              onChange={handleFileUpload} 
            />
          </div>
          <i className="fa-solid fa-shield-virus absolute -right-4 -bottom-4 text-white/5 text-[160px] pointer-events-none"></i>
        </div>

        {/* Quick Safety Summary */}
        <div className="bg-white rounded border border-slate-200 p-6 flex flex-col justify-between shadow-sm">
           <div>
              <h3 className="font-industrial text-slate-800 font-bold mb-4 flex items-center gap-2">
                <span className="w-1.5 h-4 bg-blue-600 rounded-full"></span>
                Daily Safety Score
              </h3>
              <div className="flex items-baseline gap-2">
                <span className="text-5xl font-industrial font-bold text-slate-800">92</span>
                <span className="text-slate-400 font-bold uppercase text-[10px]">/ 100</span>
              </div>
              <p className="text-[10px] text-green-600 font-bold uppercase mt-2">
                <i className="fa-solid fa-caret-up mr-1"></i> 3.4% improvement this week
              </p>
           </div>
           
           <div className="space-y-3 mt-6">
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                 <span>Active Hazards</span>
                 <span className="text-red-600">02</span>
              </div>
              <div className="flex justify-between text-[10px] font-bold text-slate-400 uppercase">
                 <span>PPE Inspections</span>
                 <span className="text-blue-600">45</span>
              </div>
           </div>
        </div>
      </div>

      {/* Result Display */}
      {(previewUrl || isAnalyzing) && (
        <div className="grid grid-cols-1 xl:grid-cols-5 gap-8">
          {/* Inspection Viewport */}
          <div className="xl:col-span-3 bg-white rounded border border-slate-200 p-2 shadow-sm">
            <div className="bg-slate-50 border border-slate-200 flex justify-between items-center px-4 py-2 mb-2">
               <span className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Inspection Feed #059</span>
               <div className="flex items-center gap-2">
                  <span className="w-1.5 h-1.5 bg-red-500 rounded-full animate-pulse"></span>
                  <span className="text-[10px] font-bold text-red-500 uppercase">Analytic Overlay Active</span>
               </div>
            </div>
            <div className="relative rounded overflow-hidden aspect-video bg-black flex items-center justify-center">
              {previewUrl && <img src={previewUrl} className="w-full h-full object-contain" alt="Preview" />}
              {isAnalyzing && (
                <div className="absolute inset-0 bg-[#000]/80 flex flex-col items-center justify-center text-[#F5C518] p-6 text-center backdrop-blur-sm">
                  <div className="w-16 h-16 border-4 border-[#F5C518] border-t-transparent rounded-full animate-spin mb-6 shadow-[0_0_20px_rgba(245,197,24,0.4)]"></div>
                  <h3 className="font-industrial text-xl font-bold tracking-widest animate-pulse">Scanning Site Artifacts...</h3>
                  <div className="mt-4 space-y-2 max-w-xs">
                     <div className="h-1 w-full bg-white/10 rounded-full overflow-hidden">
                        <div className="h-full bg-[#F5C518] animate-progress"></div>
                     </div>
                     <p className="text-[10px] text-slate-400 font-bold uppercase tracking-tighter">Comparing frames against OSHA standard 1926</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Audit Results */}
          <div className="xl:col-span-2 space-y-6 h-full flex flex-col">
            <div className="bg-white rounded border border-slate-200 p-6 shadow-sm flex-1">
              <h3 className="font-industrial text-slate-800 font-bold mb-6 flex items-center gap-2 border-b border-slate-100 pb-4">
                <i className="fa-solid fa-microscope text-blue-600"></i>
                Inference Results
              </h3>
              
              {!analysisResult && !isAnalyzing ? (
                <div className="h-full flex flex-col items-center justify-center text-slate-400 py-12 text-center">
                  <i className="fa-solid fa-brain text-5xl mb-4 opacity-10"></i>
                  <p className="text-xs font-bold uppercase tracking-widest">Awaiting field data injection...</p>
                </div>
              ) : analysisResult ? (
                <div className="space-y-6">
                  <div className="flex items-center justify-between p-4 bg-slate-50 rounded border border-slate-100">
                    <span className="text-xs font-bold text-slate-500 uppercase tracking-widest">Compliance Score</span>
                    <span className={`text-3xl font-industrial font-bold ${analysisResult?.complianceScore > 80 ? 'text-green-600' : 'text-red-600'}`}>
                      {analysisResult?.complianceScore ?? 0}%
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h4 className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Incident Flags</h4>
                    {analysisResult?.violations && analysisResult.violations.length > 0 ? analysisResult.violations.map((v: any, i: number) => (
                      <div key={i} className="flex gap-4 p-4 rounded border border-slate-200 bg-white hover:border-[#F5C518] transition-all group">
                        <div className={`mt-1 w-8 h-8 rounded flex items-center justify-center shrink-0 ${v.severity === 'High' ? 'bg-red-100 text-red-600' : 'bg-amber-100 text-amber-600'}`}>
                          <i className="fa-solid fa-exclamation-triangle text-xs"></i>
                        </div>
                        <div>
                          <p className="text-sm font-bold text-slate-800 group-hover:text-blue-600 transition-colors uppercase font-industrial tracking-tight">{v.type}</p>
                          <p className="text-[11px] text-slate-500 leading-relaxed mt-1 italic">{v.description}</p>
                        </div>
                      </div>
                    )) : (
                      <div className="p-4 rounded bg-green-50 border border-green-100 text-green-700 text-xs font-bold flex items-center gap-3">
                        <i className="fa-solid fa-check-double text-lg"></i>
                        SITE SECURE: No active PPE violations detected in this capture.
                      </div>
                    )}
                  </div>

                  <div className="p-4 bg-blue-50/50 rounded border border-blue-100 relative">
                    <span className="text-[9px] font-bold text-blue-600 uppercase tracking-widest mb-1 block">System Summary</span>
                    <p className="text-xs text-slate-700 leading-relaxed italic">
                      "{analysisResult?.summary || 'Analysis complete.'}"
                    </p>
                  </div>

                  <div className="grid grid-cols-2 gap-4 pt-4">
                    <button className="py-3 bg-white border border-slate-200 text-slate-700 rounded font-industrial font-bold text-xs hover:bg-slate-50 shadow-sm">
                      Export Report
                    </button>
                    <button className="py-3 bg-red-600 text-white rounded font-industrial font-bold text-xs hover:bg-red-700 shadow-[0_4px_0_#991B1B] active:translate-y-1 active:shadow-none transition-all">
                      Issue Ticket
                    </button>
                  </div>
                </div>
              ) : null}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SafetyAI;

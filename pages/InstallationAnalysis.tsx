import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

interface Deviation {
    id: string;
    location: string;
    severity: 'low' | 'medium' | 'high' | 'critical';
    issue: string;
    spec: string;
    deviation: number;
    imageUrl?: string;
    timestamp: string;
    coordinates: { lat: number; lng: number };
}

const InstallationAnalysis: React.FC = () => {
    const { t } = useTranslation();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedDeviation, setSelectedDeviation] = useState<Deviation | null>(null);

    // Mock deviations data
    const deviations: Deviation[] = [
        {
            id: 'd1',
            location: 'Floor 3 - Section A',
            severity: 'critical',
            issue: 'Rebar spacing exceeds tolerance',
            spec: 'IS 456:2000 - 150mm spacing required',
            deviation: 12.5,
            timestamp: '2025-01-19 14:30',
            coordinates: { lat: 19.0760, lng: 72.8777 }
        },
        {
            id: 'd2',
            location: 'Floor 2 - Electrical Panel B',
            severity: 'high',
            issue: 'Wire gauge mismatch',
            spec: 'Section 4.2 - 2.5mm² required',
            deviation: 8.2,
            timestamp: '2025-01-19 13:15',
            coordinates: { lat: 19.0762, lng: 72.8779 }
        },
        {
            id: 'd3',
            location: 'Ground Floor - Column C4',
            severity: 'medium',
            issue: 'Pipe offset from centerline',
            spec: 'Tolerance: ±3cm',
            deviation: 5.1,
            timestamp: '2025-01-19 11:45',
            coordinates: { lat: 19.0758, lng: 72.8775 }
        },
        {
            id: 'd4',
            location: 'Floor 4 - HVAC Duct',
            severity: 'low',
            issue: 'Minor alignment deviation',
            spec: 'Alignment tolerance: ±5mm',
            deviation: 3.8,
            timestamp: '2025-01-19 10:20',
            coordinates: { lat: 19.0765, lng: 72.8782 }
        }
    ];

    const getSeverityColor = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-100 text-red-700 border-red-300';
            case 'high': return 'bg-orange-100 text-orange-700 border-orange-300';
            case 'medium': return 'bg-yellow-100 text-yellow-700 border-yellow-300';
            case 'low': return 'bg-blue-100 text-blue-700 border-blue-300';
            default: return 'bg-gray-100 text-gray-700 border-gray-300';
        }
    };

    const getSeverityDot = (severity: string) => {
        switch (severity) {
            case 'critical': return 'bg-red-500';
            case 'high': return 'bg-orange-500';
            case 'medium': return 'bg-yellow-500';
            case 'low': return 'bg-blue-500';
            default: return 'bg-gray-500';
        }
    };

    const criticalCount = deviations.filter(d => d.severity === 'critical').length;
    const highCount = deviations.filter(d => d.severity === 'high').length;
    const totalDeviation = deviations.reduce((sum, d) => sum + d.deviation, 0);
    const avgDeviation = (totalDeviation / deviations.length).toFixed(1);

    return (
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Header with Stats */}
            <div className="bg-gradient-to-r from-red-50 to-orange-50 border-l-4 border-red-500 p-4 md:p-6 rounded-lg">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-xl md:text-2xl font-industrial font-bold text-slate-800 flex items-center gap-2">
                            <i className="fa-solid fa-triangle-exclamation text-red-500"></i>
                            Installation Tolerance Analysis
                        </h2>
                        <p className="text-xs md:text-sm text-slate-600 mt-1">AI-powered deviation detection from technical specifications</p>
                    </div>
                    <div className="flex gap-3 md:gap-4">
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-red-600">{criticalCount}</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Critical</div>
                        </div>
                        <div className="h-12 md:h-14 w-px bg-slate-300"></div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-orange-600">{highCount}</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">High</div>
                        </div>
                        <div className="h-12 md:h-14 w-px bg-slate-300"></div>
                        <div className="text-center">
                            <div className="text-2xl md:text-3xl font-bold text-blue-600">{avgDeviation}%</div>
                            <div className="text-[10px] md:text-xs font-bold text-slate-500 uppercase">Avg Dev</div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Heatmap */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200">
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                        <h3 className="font-industrial font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
                            <i className="fa-solid fa-map-marked-alt text-red-500"></i>
                            Risk Heatmap - Site Overview
                        </h3>
                        <div className="flex gap-2">
                            <button className="px-3 py-1.5 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors">
                                <i className="fa-solid fa-rotate mr-1"></i> Refresh
                            </button>
                            <button className="px-3 py-1.5 bg-slate-200 text-slate-700 text-xs font-bold rounded hover:bg-slate-300 transition-colors">
                                <i className="fa-solid fa-download mr-1"></i> Export
                            </button>
                        </div>
                    </div>
                </div>

                {/* Heatmap Grid */}
                <div className="p-4 md:p-6">
                    <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
                        {/* Site Map Grid */}
                        {['F4-A', 'F4-B', 'F4-C', 'F4-D',
                            'F3-A', 'F3-B', 'F3-C', 'F3-D',
                            'F2-A', 'F2-B', 'F2-C', 'F2-D',
                            'F1-A', 'F1-B', 'F1-C', 'F1-D'].map((zone, idx) => {
                                const hasDeviation = deviations.find(d => d.location.includes(zone.split('-')[0]));
                                const severity = hasDeviation?.severity || 'none';

                                return (
                                    <div
                                        key={idx}
                                        className={`aspect-square rounded border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 ${severity === 'critical' ? 'bg-red-100 border-red-500' :
                                                severity === 'high' ? 'bg-orange-100 border-orange-500' :
                                                    severity === 'medium' ? 'bg-yellow-100 border-yellow-500' :
                                                        'bg-green-50 border-green-200'
                                            }`}
                                    >
                                        <div className="text-[10px] md:text-xs font-bold text-slate-700">{zone}</div>
                                        {hasDeviation && (
                                            <div className={`w-2 h-2 rounded-full mt-1 ${getSeverityDot(severity)}`}></div>
                                        )}
                                    </div>
                                );
                            })}
                    </div>

                    {/* Legend */}
                    <div className="flex flex-wrap gap-3 md:gap-4 text-[10px] md:text-xs font-bold">
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-red-500"></div> Critical (&gt;10%)</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-orange-500"></div> High (7-10%)</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-yellow-500"></div> Medium (5-7%)</div>
                        <div className="flex items-center gap-1"><div className="w-3 h-3 rounded bg-green-200 border border-green-500"></div> Normal</div>
                    </div>
                </div>
            </div>

            {/* Deviations List */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-industrial font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
                        <i className="fa-solid fa-clipboard-list text-orange-500"></i>
                        Detected Deviations
                    </h3>
                </div>

                <div className="divide-y divide-slate-100">
                    {deviations.map((deviation) => (
                        <div
                            key={deviation.id}
                            className="p-4 md:p-6 hover:bg-slate-50 transition-colors cursor-pointer"
                            onClick={() => setSelectedDeviation(deviation)}
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                                {/* Severity Badge */}
                                <div className={`px-3 py-1.5 rounded-lg border-2 text-center shrink-0 ${getSeverityColor(deviation.severity)}`}>
                                    <div className="text-xs md:text-sm font-bold uppercase">{deviation.severity}</div>
                                    <div className="text-lg md:text-xl font-bold">{deviation.deviation}%</div>
                                </div>

                                {/* Details */}
                                <div className="flex-1 min-w-0">
                                    <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-2 mb-2">
                                        <div className="flex-1 min-w-0">
                                            <h4 className="font-bold text-sm md:text-base text-slate-800 truncate">{deviation.issue}</h4>
                                            <p className="text-xs md:text-sm text-slate-600 flex items-center gap-1 mt-0.5">
                                                <i className="fa-solid fa-location-dot text-[10px]"></i>
                                                {deviation.location}
                                            </p>
                                        </div>
                                        <span className="text-[10px] md:text-xs text-slate-400 font-bold shrink-0">{deviation.timestamp}</span>
                                    </div>

                                    <div className="bg-blue-50 border border-blue-200 rounded p-2 md:p-3">
                                        <div className="text-[10px] md:text-xs font-bold text-blue-800 uppercase mb-1">Required  Spec:</div>
                                        <div className="text-xs md:text-sm text-blue-900">{deviation.spec}</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex sm:flex-col gap-2 shrink-0">
                                    <button className="flex-1 sm:flex-none px-3 py-2 bg-red-500 text-white text-xs font-bold rounded hover:bg-red-600 transition-colors whitespace-nowrap">
                                        <i className="fa-solid fa-flag mr-1"></i> Flag
                                    </button>
                                    <button className="flex-1 sm:flex-none px-3 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors whitespace-nowrap">
                                        <i className="fa-solid fa-eye mr-1"></i> Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* AI Analysis Feature Toggle */}
            <div className="bg-gradient-to-r from-purple-50 to-blue-50 border border-purple-200 rounded-lg p-4 md:p-6">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-4">
                    <div className="flex-1">
                        <h3 className="font-bold text-base md:text-lg text-slate-800 mb-1">Real-Time AI Monitoring</h3>
                        <p className="text-xs md:text-sm text-slate-600">Automatically analyze uploaded photos against technical specifications</p>
                    </div>
                    <button className="px-4 md:px-6 py-2 md:py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white font-bold rounded-lg shadow-lg hover:shadow-xl transition-all">
                        <i className="fa-solid fa-robot mr-2"></i>
                        <span className="hidden sm:inline">Enable Auto-Analysis</span>
                        <span className="sm:hidden">Enable AI</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default InstallationAnalysis;

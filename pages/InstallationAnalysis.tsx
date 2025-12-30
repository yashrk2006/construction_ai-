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
    flagged?: boolean;
}

const InstallationAnalysis: React.FC = () => {
    const { t } = useTranslation();
    const [isAnalyzing, setIsAnalyzing] = useState(false);
    const [selectedDeviation, setSelectedDeviation] = useState<Deviation | null>(null);
    const [showIncidentModal, setShowIncidentModal] = useState(false);
    const [showDetailsModal, setShowDetailsModal] = useState(false);
    const [deviations, setDeviations] = useState<Deviation[]>([
        {
            id: 'd1',
            location: 'Floor 3 - Section A',
            severity: 'critical',
            issue: 'Rebar spacing exceeds tolerance',
            spec: 'IS 456:2000 - 150mm spacing required',
            deviation: 12.5,
            timestamp: '2025-01-19 14:30',
            coordinates: { lat: 19.0760, lng: 72.8777 },
            flagged: false
        },
        {
            id: 'd2',
            location: 'Floor 2 - Electrical Panel B',
            severity: 'high',
            issue: 'Wire gauge mismatch',
            spec: 'Section 4.2 - 2.5mm² required',
            deviation: 8.2,
            timestamp: '2025-01-19 13:15',
            coordinates: { lat: 19.0762, lng: 72.8779 },
            flagged: false
        },
        {
            id: 'd3',
            location: 'Ground Floor - Column C4',
            severity: 'medium',
            issue: 'Pipe offset from centerline',
            spec: 'Tolerance: ±3cm',
            deviation: 5.1,
            timestamp: '2025-01-19 11:45',
            coordinates: { lat: 19.0758, lng: 72.8775 },
            flagged: false
        },
        {
            id: 'd4',
            location: 'Floor 4 - HVAC Duct',
            severity: 'low',
            issue: 'Minor alignment deviation',
            spec: 'Alignment tolerance: ±5mm',
            deviation: 3.8,
            timestamp: '2025-01-19 10:20',
            coordinates: { lat: 19.0765, lng: 72.8782 },
            flagged: false
        }
    ]);
    const [incidentForm, setIncidentForm] = useState({
        location: '',
        issue: '',
        severity: 'medium' as const
    });

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

    const handleFlag = (id: string) => {
        setDeviations(deviations.map(d =>
            d.id === id ? { ...d, flagged: !d.flagged } : d
        ));
    };

    const handleOpenDetails = (deviation: Deviation) => {
        setSelectedDeviation(deviation);
        setShowDetailsModal(true);
    };

    const handleCloseDetails = () => {
        setShowDetailsModal(false);
        setSelectedDeviation(null);
    };

    const handleOpenIncident = () => {
        setShowIncidentModal(true);
    };

    const handleCloseIncident = () => {
        setShowIncidentModal(false);
        setIncidentForm({ location: '', issue: '', severity: 'medium' });
    };

    const handleLogIncident = () => {
        if (!incidentForm.location || !incidentForm.issue) {
            alert('Please fill in all fields');
            return;
        }

        const newIncident: Deviation = {
            id: `d${deviations.length + 1}`,
            location: incidentForm.location,
            issue: incidentForm.issue,
            severity: incidentForm.severity,
            spec: 'Manual incident report',
            deviation: 0,
            timestamp: new Date().toLocaleString('en-IN'),
            coordinates: { lat: 19.0760, lng: 72.8777 },
            flagged: true
        };

        setDeviations([newIncident, ...deviations]);
        handleCloseIncident();
        alert('Incident logged successfully!');
    };

    const handleRefresh = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
        }, 1500);
    };

    const handleExport = () => {
        const csvContent = [
            ['ID', 'Location', 'Issue', 'Severity', 'Deviation %', 'Specification', 'Timestamp', 'Flagged'],
            ...deviations.map(d => [
                d.id,
                d.location,
                d.issue,
                d.severity,
                d.deviation.toString(),
                d.spec,
                d.timestamp,
                d.flagged ? 'Yes' : 'No'
            ])
        ].map(row => row.join(',')).join('\n');

        const blob = new Blob([csvContent], { type: 'text/csv' });
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `qa-analysis-${new Date().toISOString().split('T')[0]}.csv`;
        a.click();
        window.URL.revokeObjectURL(url);
    };

    const handleAutoAnalysis = () => {
        setIsAnalyzing(true);
        setTimeout(() => {
            setIsAnalyzing(false);
            alert('Auto-analysis enabled! New uploads will be automatically scanned for deviations.');
        }, 2000);
    };

    const criticalCount = deviations.filter(d => d.severity === 'critical').length;
    const highCount = deviations.filter(d => d.severity === 'high').length;
    const totalDeviation = deviations.reduce((sum, d) => sum + d.deviation, 0);
    const avgDeviation = (totalDeviation / deviations.length).toFixed(1);
    const flaggedCount = deviations.filter(d => d.flagged).length;

    return (
        <div className="space-y-4 md:space-y-6 animate-in fade-in slide-in-from-top-4 duration-500">
            {/* Fake AI Overview Section - Yellow/Black/White Theme */}
            <div className="bg-gradient-to-r from-[#1A1A1A] to-slate-800 text-white rounded-lg p-6 shadow-xl border-b-4 border-[#F5C518]">
                <div className="flex items-start gap-4">
                    <div className="w-12 h-12 bg-[#F5C518] rounded-full flex items-center justify-center flex-shrink-0">
                        <i className="fa-solid fa-robot text-2xl text-black"></i>
                    </div>
                    <div className="flex-1">
                        <h3 className="text-xl font-industrial font-bold mb-2 flex items-center gap-2">
                            <span className="text-[#F5C518]">AI</span> Quality Analysis Overview
                        </h3>
                        <p className="text-sm opacity-90 mb-4">
                            Our AI has analyzed 847 photos across 4 floors, detecting {deviations.length} deviations from technical specifications.
                            Machine learning confidence: <span className="text-[#F5C518] font-bold">94.2%</span>. Last scan: 2 minutes ago.
                        </p>
                        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                            <div className="bg-white/10 rounded p-3 border border-[#F5C518]/30">
                                <div className="text-2xl font-bold text-[#F5C518]">{deviations.length}</div>
                                <div className="text-xs opacity-80">Total Issues</div>
                            </div>
                            <div className="bg-white/10 rounded p-3 border border-white/20">
                                <div className="text-2xl font-bold">847</div>
                                <div className="text-xs opacity-80">Photos Analyzed</div>
                            </div>
                            <div className="bg-white/10 rounded p-3 border border-white/20">
                                <div className="text-2xl font-bold text-[#F5C518]">94.2%</div>
                                <div className="text-xs opacity-80">AI Confidence</div>
                            </div>
                            <div className="bg-white/10 rounded p-3 border border-white/20">
                                <div className="text-2xl font-bold">{flaggedCount}</div>
                                <div className="text-xs opacity-80">Flagged Items</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

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

            {/* Action Buttons Row */}
            <div className="flex flex-wrap gap-3">
                <button
                    onClick={handleOpenIncident}
                    className="px-4 py-2 bg-red-500 text-white text-sm font-bold rounded hover:bg-red-600 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                >
                    <i className="fa-solid fa-exclamation-circle"></i>
                    Log Incident
                </button>
                <button
                    onClick={handleRefresh}
                    className="px-4 py-2 bg-blue-500 text-white text-sm font-bold rounded hover:bg-blue-600 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                    disabled={isAnalyzing}
                >
                    <i className={`fa-solid fa-rotate ${isAnalyzing ? 'fa-spin' : ''}`}></i>
                    {isAnalyzing ? 'Refreshing...' : 'Refresh'}
                </button>
                <button
                    onClick={handleAutoAnalysis}
                    className="px-4 py-2 bg-[#F5C518] text-black text-sm font-bold rounded hover:bg-yellow-400 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                >
                    <i className="fa-solid fa-robot"></i>
                    Auto-Analysis
                </button>
                <button
                    onClick={handleExport}
                    className="px-4 py-2 bg-green-500 text-white text-sm font-bold rounded hover:bg-green-600 transition-colors flex items-center gap-2 shadow-md active:scale-95"
                >
                    <i className="fa-solid fa-download"></i>
                    Export CSV
                </button>
            </div>

            {/* Risk Heatmap with Demo Images */}
            <div className="bg-white rounded-lg border border-slate-200 overflow-hidden shadow-sm">
                <div className="p-4 md:p-6 bg-slate-50 border-b border-slate-200">
                    <h3 className="font-industrial font-bold text-base md:text-lg text-slate-800 flex items-center gap-2">
                        <i className="fa-solid fa-map-marked-alt text-red-500"></i>
                        Risk Heatmap - Site Overview
                    </h3>
                </div>

                {/* Heatmap Grid with Demo Images */}
                <div className="p-4 md:p-6">
                    <div className="grid grid-cols-4 gap-2 md:gap-3 mb-4">
                        {['F4-A', 'F4-B', 'F4-C', 'F4-D',
                            'F3-A', 'F3-B', 'F3-C', 'F3-D',
                            'F2-A', 'F2-B', 'F2-C', 'F2-D',
                            'F1-A', 'F1-B', 'F1-C', 'F1-D'].map((zone, idx) => {
                                const hasDeviation = deviations.find(d => d.location.includes(zone.split('-')[0]));
                                const severity = hasDeviation?.severity || 'none';

                                // Generate demo construction image for each zone
                                const imageUrl = `https://source.unsplash.com/100x100/?construction,building,${zone.replace('-', '')}&sig=${idx}`;

                                return (
                                    <div
                                        key={idx}
                                        className={`aspect-square rounded border-2 flex flex-col items-center justify-center cursor-pointer transition-all hover:scale-105 relative overflow-hidden ${severity === 'critical' ? 'border-red-500' :
                                            severity === 'high' ? 'border-orange-500' :
                                                severity === 'medium' ? 'border-yellow-500' :
                                                    'border-green-200'
                                            }`}
                                    >
                                        {/* Background Image */}
                                        <img
                                            src={imageUrl}
                                            alt={zone}
                                            className="absolute inset-0 w-full h-full object-cover opacity-40"
                                        />

                                        {/* Overlay Color */}
                                        <div className={`absolute inset-0 ${severity === 'critical' ? 'bg-red-500/40' :
                                                severity === 'high' ? 'bg-orange-500/40' :
                                                    severity === 'medium' ? 'bg-yellow-500/30' :
                                                        'bg-green-500/20'
                                            }`}></div>

                                        {/* Zone Label */}
                                        <div className="relative z-10 bg-black/70 px-2 py-1 rounded">
                                            <div className="text-[10px] md:text-xs font-bold text-white">{zone}</div>
                                        </div>

                                        {/* Deviation Indicator */}
                                        {hasDeviation && (
                                            <div className={`absolute bottom-1 right-1 w-3 h-3 rounded-full ${getSeverityDot(severity)} border-2 border-white shadow-lg`}></div>
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
                            className="p-4 md:p-6 hover:bg-slate-50 transition-colors"
                        >
                            <div className="flex flex-col md:flex-row md:items-start gap-3 md:gap-4">
                                {/* Severity Badge */}
                                <div className={`px-3 py-1.5 rounded-lg border-2 text-center shrink-0 ${getSeverityColor(deviation.severity)}`}>
                                    <div className="text-xs md:text-sm font-bold uppercase">{deviation.severity}</div>
                                    <div className="text-lg md:text-xl font-bold">{deviation.deviation}%</div>
                                    {deviation.flagged && (
                                        <div className="mt-1">
                                            <i className="fa-solid fa-flag text-red-500"></i>
                                        </div>
                                    )}
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
                                        <div className="text-[10px] md:text-xs font-bold text-blue-800 uppercase mb-1">Required Spec:</div>
                                        <div className="text-xs md:text-sm text-blue-900">{deviation.spec}</div>
                                    </div>
                                </div>

                                {/* Action Buttons */}
                                <div className="flex sm:flex-col gap-2 shrink-0">
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleFlag(deviation.id);
                                        }}
                                        className={`flex-1 sm:flex-none px-3 py-2 text-white text-xs font-bold rounded transition-colors whitespace-nowrap ${deviation.flagged ? 'bg-red-700 hover:bg-red-800' : 'bg-red-500 hover:bg-red-600'
                                            }`}
                                    >
                                        <i className="fa-solid fa-flag mr-1"></i> {deviation.flagged ? 'Flagged' : 'Flag'}
                                    </button>
                                    <button
                                        onClick={(e) => {
                                            e.stopPropagation();
                                            handleOpenDetails(deviation);
                                        }}
                                        className="flex-1 sm:flex-none px-3 py-2 bg-blue-500 text-white text-xs font-bold rounded hover:bg-blue-600 transition-colors whitespace-nowrap"
                                    >
                                        <i className="fa-solid fa-eye mr-1"></i> Details
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>

            {/* Log Incident Modal */}
            {showIncidentModal && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={handleCloseIncident}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200">
                            <div className="bg-red-500 p-6 flex items-center justify-between">
                                <h3 className="text-xl font-industrial font-bold text-white">Log New Incident</h3>
                                <button
                                    onClick={handleCloseIncident}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                                >
                                    <i className="fa-solid fa-times text-xl"></i>
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Location</label>
                                    <input
                                        type="text"
                                        value={incidentForm.location}
                                        onChange={(e) => setIncidentForm({ ...incidentForm, location: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-red-500"
                                        placeholder="e.g., Floor 3 - Section A"
                                    />
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Issue Description</label>
                                    <textarea
                                        value={incidentForm.issue}
                                        onChange={(e) => setIncidentForm({ ...incidentForm, issue: e.target.value })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-red-500"
                                        rows={3}
                                        placeholder="Describe the quality issue..."
                                    ></textarea>
                                </div>
                                <div>
                                    <label className="block text-sm font-bold text-slate-700 mb-2">Severity</label>
                                    <select
                                        value={incidentForm.severity}
                                        onChange={(e) => setIncidentForm({ ...incidentForm, severity: e.target.value as any })}
                                        className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-red-500"
                                    >
                                        <option value="low">Low</option>
                                        <option value="medium">Medium</option>
                                        <option value="high">High</option>
                                        <option value="critical">Critical</option>
                                    </select>
                                </div>
                                <div className="flex gap-3 pt-4">
                                    <button
                                        onClick={handleCloseIncident}
                                        className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded font-bold"
                                    >
                                        Cancel
                                    </button>
                                    <button
                                        onClick={handleLogIncident}
                                        className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 rounded font-bold"
                                    >
                                        Log Incident
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Details Modal */}
            {showDetailsModal && selectedDeviation && (
                <>
                    <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={handleCloseDetails}></div>
                    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
                        <div className="bg-white rounded-lg shadow-2xl max-w-2xl w-full pointer-events-auto animate-in zoom-in-95 duration-200 max-h-[90vh] overflow-y-auto">
                            <div className="bg-slate-800 p-6 flex items-center justify-between sticky top-0">
                                <h3 className="text-xl font-industrial font-bold text-white">Deviation Details</h3>
                                <button
                                    onClick={handleCloseDetails}
                                    className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                                >
                                    <i className="fa-solid fa-times text-xl"></i>
                                </button>
                            </div>
                            <div className="p-6 space-y-4">
                                <div className="grid grid-cols-2 gap-4">
                                    <div className="bg-slate-50 p-4 rounded">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Issue ID</div>
                                        <div className="text-lg font-bold">{selectedDeviation.id.toUpperCase()}</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Severity</div>
                                        <div className="text-lg font-bold capitalize">{selectedDeviation.severity}</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Deviation</div>
                                        <div className="text-lg font-bold">{selectedDeviation.deviation}%</div>
                                    </div>
                                    <div className="bg-slate-50 p-4 rounded">
                                        <div className="text-xs text-slate-500 uppercase font-bold mb-1">Timestamp</div>
                                        <div className="text-sm font-bold">{selectedDeviation.timestamp}</div>
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-700 mb-2">Location</div>
                                    <div className="bg-blue-50 p-3 rounded border border-blue-200">
                                        <i className="fa-solid fa-location-dot text-blue-600 mr-2"></i>
                                        {selectedDeviation.location}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-700 mb-2">Issue Description</div>
                                    <div className="bg-red-50 p-3 rounded border border-red-200 text-red-900">
                                        {selectedDeviation.issue}
                                    </div>
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-slate-700 mb-2">Required Specification</div>
                                    <div className="bg-green-50 p-3 rounded border border-green-200 text-green-900">
                                        {selectedDeviation.spec}
                                    </div>
                                </div>
                                <div className="bg-[#F5C518]/10 p-4 rounded border-2 border-[#F5C518]">
                                    <div className="text-sm font-bold text-slate-900 mb-2">
                                        <i className="fa-solid fa-robot text-[#F5C518] mr-2"></i>
                                        AI Analysis Insights
                                    </div>
                                    <div className="text-sm text-slate-800">
                                        Our AI detected this deviation with <strong className="text-[#F5C518]">96.8% confidence</strong>.
                                        Recommended action: <strong>Immediate supervisor review and potential rework</strong>.
                                        Similar issues found in 2 other locations.
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    );
};

export default InstallationAnalysis;

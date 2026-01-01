import React from 'react';

interface RiskArea {
    id: string;
    zone: string;
    riskLevel: 'low' | 'medium' | 'high' | 'critical';
    riskScore: number;
    issues: string[];
    lastInspection: string;
}

const RiskHeatmap: React.FC = () => {
    // Mock risk data for different site zones
    const riskAreas: RiskArea[] = [
        { id: '1', zone: 'Foundation Area', riskLevel: 'low', riskScore: 15, issues: [], lastInspection: '2h ago' },
        { id: '2', zone: 'Scaffolding Zone A', riskLevel: 'critical', riskScore: 92, issues: ['Unstable structure', 'Missing safety nets'], lastInspection: '30m ago' },
        { id: '3', zone: 'Electrical Work Area', riskLevel: 'high', riskScore: 78, issues: ['Exposed wiring', 'Water nearby'], lastInspection: '1h ago' },
        { id: '4', zone: 'Storage Yard', riskLevel: 'medium', riskScore: 45, issues: ['Cluttered pathways'], lastInspection: '3h ago' },
        { id: '5', zone: 'Crane Operation Zone', riskLevel: 'medium', riskScore: 52, issues: ['Weather conditions'], lastInspection: '45m ago' },
        { id: '6', zone: 'Ground Floor', riskLevel: 'low', riskScore: 22, issues: [], lastInspection: '1h ago' },
        { id: '7', zone: 'Floor 1-3', riskLevel: 'medium', riskScore: 48, issues: ['Height safety'], lastInspection: '2h ago' },
        { id: '8', zone: 'MEP Installation', riskLevel: 'high', riskScore: 71, issues: ['Confined spaces', 'Heavy machinery'], lastInspection: '40m ago' },
    ];

    const getRiskColor = (level: string) => {
        switch (level) {
            case 'low': return { bg: 'bg-green-100', border: 'border-green-500', text: 'text-green-700', dot: 'bg-green-500' };
            case 'medium': return { bg: 'bg-yellow-100', border: 'border-yellow-500', text: 'text-yellow-700', dot: 'bg-yellow-500' };
            case 'high': return { bg: 'bg-orange-100', border: 'border-orange-500', text: 'text-orange-700', dot: 'bg-orange-500' };
            case 'critical': return { bg: 'bg-red-100', border: 'border-red-500', text: 'text-red-700', dot: 'bg-red-500' };
            default: return { bg: 'bg-gray-100', border: 'border-gray-500', text: 'text-gray-700', dot: 'bg-gray-500' };
        }
    };

    const getRiskIcon = (level: string) => {
        switch (level) {
            case 'low': return 'fa-check-circle';
            case 'medium': return 'fa-exclamation-circle';
            case 'high': return 'fa-exclamation-triangle';
            case 'critical': return 'fa-skull-crossbones';
            default: return 'fa-question-circle';
        }
    };

    const overallRisk = Math.round(riskAreas.reduce((sum, area) => sum + area.riskScore, 0) / riskAreas.length);
    const criticalCount = riskAreas.filter(a => a.riskLevel === 'critical').length;
    const highCount = riskAreas.filter(a => a.riskLevel === 'high').length;

    return (
        <div className="bg-white rounded-lg border border-slate-200 shadow-sm overflow-hidden">
            {/* Header */}
            <div className="p-4 md:p-6 bg-gradient-to-r from-slate-800 to-slate-700 border-b border-slate-600">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#F5C518] rounded-lg flex items-center justify-center">
                            <i className="fa-solid fa-map-location-dot text-black text-lg"></i>
                        </div>
                        <div>
                            <h3 className="font-industrial font-bold text-base md:text-lg text-white">Risk Heatmap - Site Overview</h3>
                            <p className="text-xs text-slate-300">Real-time safety risk monitoring</p>
                        </div>
                    </div>
                    <div className="text-right">
                        <div className="text-[10px] text-slate-400 font-bold uppercase mb-1">Overall Risk</div>
                        <div className={`text-2xl font-industrial font-bold ${overallRisk > 70 ? 'text-red-400' :
                                overallRisk > 50 ? 'text-orange-400' :
                                    overallRisk > 30 ? 'text-yellow-400' :
                                        'text-green-400'
                            }`}>
                            {overallRisk}%
                        </div>
                    </div>
                </div>
            </div>

            {/* Risk Summary Badges */}
            <div className="p-4 bg-slate-50 border-b border-slate-200 grid grid-cols-4 gap-2">
                <div className="text-center">
                    <div className="text-2xl font-bold text-red-600">{criticalCount}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase">Critical</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-orange-600">{highCount}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase">High</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-yellow-600">{riskAreas.filter(a => a.riskLevel === 'medium').length}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase">Medium</div>
                </div>
                <div className="text-center">
                    <div className="text-2xl font-bold text-green-600">{riskAreas.filter(a => a.riskLevel === 'low').length}</div>
                    <div className="text-[9px] text-slate-500 font-bold uppercase">Low</div>
                </div>
            </div>

            {/* Heatmap Grid */}
            <div className="p-4 md:p-6">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {riskAreas.map((area) => {
                        const colors = getRiskColor(area.riskLevel);
                        return (
                            <div
                                key={area.id}
                                className={`${colors.bg} border-2 ${colors.border} rounded-lg p-4 hover:scale-105 transition-all cursor-pointer group relative overflow-hidden`}
                            >
                                {/* Risk Level Indicator */}
                                <div className="absolute top-2 right-2 flex items-center gap-1">
                                    <div className={`w-2 h-2 rounded-full ${colors.dot} animate-pulse`}></div>
                                    <i className={`fa-solid ${getRiskIcon(area.riskLevel)} ${colors.text} text-xs`}></i>
                                </div>

                                {/* Zone Name */}
                                <h4 className={`font-bold text-xs ${colors.text} mb-2 pr-6`}>{area.zone}</h4>

                                {/* Risk Score */}
                                <div className={`text-3xl font-industrial font-bold ${colors.text} mb-1`}>
                                    {area.riskScore}
                                </div>
                                <div className="text-[9px] text-slate-600 font-bold uppercase mb-2">Risk Score</div>

                                {/* Progress Bar */}
                                <div className="h-1.5 bg-white rounded-full overflow-hidden mb-2">
                                    <div
                                        className={`h-full ${colors.dot} transition-all`}
                                        style={{ width: `${area.riskScore}%` }}
                                    ></div>
                                </div>

                                {/* Issues Count */}
                                {area.issues.length > 0 && (
                                    <div className={`text-[10px] ${colors.text} font-bold`}>
                                        <i className="fa-solid fa-warning mr-1"></i>
                                        {area.issues.length} issue{area.issues.length > 1 ? 's' : ''}
                                    </div>
                                )}

                                {/* Last Inspection */}
                                <div className="text-[9px] text-slate-500 mt-1">
                                    <i className="fa-regular fa-clock mr-1"></i>
                                    {area.lastInspection}
                                </div>

                                {/* Hover Tooltip */}
                                {area.issues.length > 0 && (
                                    <div className="absolute inset-0 bg-black/90 opacity-0 group-hover:opacity-100 transition-opacity p-3 rounded-lg flex flex-col justify-center">
                                        <div className="text-[10px] text-white font-bold uppercase mb-2">Issues Found:</div>
                                        <ul className="text-[10px] text-white space-y-1">
                                            {area.issues.map((issue, idx) => (
                                                <li key={idx} className="flex items-start gap-1">
                                                    <i className="fa-solid fa-chevron-right text-[8px] mt-0.5 text-red-400"></i>
                                                    <span>{issue}</span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </div>
                        );
                    })}
                </div>
            </div>

            {/* Legend */}
            <div className="p-4 bg-slate-50 border-t border-slate-200">
                <div className="flex items-center justify-between text-[10px]">
                    <div className="font-bold text-slate-600 uppercase">Risk Levels:</div>
                    <div className="flex gap-4">
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded bg-green-500"></div>
                            <span className="text-slate-600">Low (0-30)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded bg-yellow-500"></div>
                            <span className="text-slate-600">Med (31-60)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded bg-orange-500"></div>
                            <span className="text-slate-600">High (61-80)</span>
                        </div>
                        <div className="flex items-center gap-1">
                            <div className="w-3 h-3 rounded bg-red-500"></div>
                            <span className="text-slate-600">Crit (81-100)</span>
                        </div>
                    </div>
                </div>
            </div>

            {/* Action Footer */}
            <div className="p-4 bg-slate-800 flex items-center justify-between">
                <button className="px-4 py-2 bg-white/10 hover:bg-white/20 text-white text-xs font-bold rounded transition-colors flex items-center gap-2">
                    <i className="fa-solid fa-sync"></i>
                    Refresh Data
                </button>
                <button className="px-4 py-2 bg-[#F5C518] hover:bg-yellow-400 text-black text-xs font-bold rounded transition-colors flex items-center gap-2 shadow-lg">
                    <i className="fa-solid fa-file-export"></i>
                    Export Report
                </button>
            </div>
        </div>
    );
};

export default RiskHeatmap;

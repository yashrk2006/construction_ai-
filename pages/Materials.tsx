
import React, { useState } from 'react';
import { MOCK_MATERIALS } from '../constants';

interface Material {
  id: string;
  itemName: string;
  quantity: number;
  unit: string;
  reorderLevel: number;
  lastUpdated: string;
}

const Materials: React.FC = () => {
  const [materials, setMaterials] = useState<Material[]>(MOCK_MATERIALS);
  const [showAddModal, setShowAddModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [selectedMaterial, setSelectedMaterial] = useState<Material | null>(null);
  const [formData, setFormData] = useState({
    itemName: '',
    quantity: 0,
    unit: 'bags',
    reorderLevel: 0
  });

  const handleAddMaterial = () => {
    const newMaterial: Material = {
      id: `mat${materials.length + 1}`,
      itemName: formData.itemName,
      quantity: formData.quantity,
      unit: formData.unit,
      reorderLevel: formData.reorderLevel,
      lastUpdated: new Date().toLocaleDateString('en-IN')
    };
    setMaterials([...materials, newMaterial]);
    setShowAddModal(false);
    setFormData({ itemName: '', quantity: 0, unit: 'bags', reorderLevel: 0 });
  };

  const handleEditMaterial = () => {
    if (!selectedMaterial) return;

    setMaterials(materials.map(m =>
      m.id === selectedMaterial.id
        ? { ...m, ...formData, lastUpdated: new Date().toLocaleDateString('en-IN') }
        : m
    ));
    setShowEditModal(false);
    setSelectedMaterial(null);
    setFormData({ itemName: '', quantity: 0, unit: 'bags', reorderLevel: 0 });
  };

  const handleDeleteMaterial = (id: string) => {
    if (confirm('Are you sure you want to delete this material?')) {
      setMaterials(materials.filter(m => m.id !== id));
    }
  };

  const handleExport = () => {
    const csvContent = [
      ['SKU', 'Item Name', 'Quantity', 'Unit', 'Reorder Level', 'Status', 'Last Updated'],
      ...materials.map(m => [
        m.id.toUpperCase(),
        m.itemName,
        m.quantity.toString(),
        m.unit,
        m.reorderLevel.toString(),
        m.quantity <= m.reorderLevel ? 'Stock Alert' : 'Nominal',
        m.lastUpdated
      ])
    ].map(row => row.join(',')).join('\n');

    const blob = new Blob([csvContent], { type: 'text/csv' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `materials-inventory-${new Date().toISOString().split('T')[0]}.csv`;
    a.click();
    window.URL.revokeObjectURL(url);
  };

  const openEditModal = (material: Material) => {
    setSelectedMaterial(material);
    setFormData({
      itemName: material.itemName,
      quantity: material.quantity,
      unit: material.unit,
      reorderLevel: material.reorderLevel
    });
    setShowEditModal(true);
  };

  const openAddModal = () => {
    setFormData({ itemName: '', quantity: 0, unit: 'bags', reorderLevel: 0 });
    setShowAddModal(true);
  };

  return (
    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div>
          <h2 className="text-2xl font-industrial font-bold text-slate-800 tracking-tight">Material Inventory</h2>
          <p className="text-xs text-slate-500 font-bold uppercase tracking-widest mt-1">Resource allocation & stock tracking</p>
        </div>
        <div className="flex gap-3">
          <button
            onClick={handleExport}
            className="bg-white border border-slate-200 px-4 py-2 rounded font-industrial text-xs font-bold text-slate-600 hover:bg-slate-50 transition-colors shadow-sm"
          >
            <i className="fa-solid fa-download mr-2"></i> Manifest Export
          </button>
          <button
            onClick={openAddModal}
            className="bg-[#F5C518] text-[#000] px-6 py-2.5 rounded font-industrial text-xs font-bold hover:bg-yellow-400 shadow-[0_4px_0_#C49D13] active:translate-y-0.5 active:shadow-none transition-all flex items-center gap-2"
          >
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
            {materials.map((item) => {
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
                      <button
                        onClick={() => openEditModal(item)}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-blue-600 rounded hover:bg-white border border-transparent hover:border-slate-200"
                      >
                        <i className="fa-solid fa-edit text-xs"></i>
                      </button>
                      <button
                        onClick={() => handleDeleteMaterial(item.id)}
                        className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-red-600 rounded hover:bg-white border border-transparent hover:border-slate-200"
                      >
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
          { label: 'Total Asset Value', val: '₹1.42 Cr', icon: 'fa-indian-rupee-sign', color: 'text-blue-600', trend: '+12%', sub: 'vs baseline' },
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

      {/* Add Material Modal */}
      {showAddModal && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={() => setShowAddModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200">
              <div className="bg-[#F5C518] p-6 flex items-center justify-between">
                <h3 className="text-xl font-industrial font-bold text-black">Add New Material</h3>
                <button
                  onClick={() => setShowAddModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-black/10 transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#F5C518]"
                    placeholder="e.g., Cement, Steel Rods"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#F5C518]"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Unit</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#F5C518]"
                    >
                      <option value="bags">Bags</option>
                      <option value="tons">Tons</option>
                      <option value="units">Units</option>
                      <option value="m³">m³</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Reorder Level</label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-[#F5C518]"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowAddModal(false)}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleAddMaterial}
                    className="flex-1 bg-[#F5C518] hover:bg-yellow-400 text-black py-3 rounded font-bold"
                  >
                    Add Material
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}

      {/* Edit Material Modal */}
      {showEditModal && selectedMaterial && (
        <>
          <div className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200" onClick={() => setShowEditModal(false)}></div>
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none">
            <div className="bg-white rounded-lg shadow-2xl max-w-md w-full pointer-events-auto animate-in zoom-in-95 duration-200">
              <div className="bg-slate-800 p-6 flex items-center justify-between">
                <h3 className="text-xl font-industrial font-bold text-white">Edit Material</h3>
                <button
                  onClick={() => setShowEditModal(false)}
                  className="w-10 h-10 flex items-center justify-center rounded-full hover:bg-white/10 text-white transition-colors"
                >
                  <i className="fa-solid fa-times text-xl"></i>
                </button>
              </div>
              <div className="p-6 space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Item Name</label>
                  <input
                    type="text"
                    value={formData.itemName}
                    onChange={(e) => setFormData({ ...formData, itemName: e.target.value })}
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Quantity</label>
                    <input
                      type="number"
                      value={formData.quantity}
                      onChange={(e) => setFormData({ ...formData, quantity: Number(e.target.value) })}
                      className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Unit</label>
                    <select
                      value={formData.unit}
                      onChange={(e) => setFormData({ ...formData, unit: e.target.value })}
                      className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                    >
                      <option value="bags">Bags</option>
                      <option value="tons">Tons</option>
                      <option value="units">Units</option>
                      <option value="m³">m³</option>
                      <option value="kg">kg</option>
                    </select>
                  </div>
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">Reorder Level</label>
                  <input
                    type="number"
                    value={formData.reorderLevel}
                    onChange={(e) => setFormData({ ...formData, reorderLevel: Number(e.target.value) })}
                    className="w-full px-4 py-2 border border-slate-300 rounded focus:outline-none focus:border-blue-500"
                  />
                </div>
                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setShowEditModal(false)}
                    className="flex-1 bg-slate-200 hover:bg-slate-300 text-slate-700 py-3 rounded font-bold"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={handleEditMaterial}
                    className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 rounded font-bold"
                  >
                    Save Changes
                  </button>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Materials;

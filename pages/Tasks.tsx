
import React, { useState } from 'react';
import { MOCK_TASKS } from '../constants';
import { Task, TaskStatus } from '../types';

const Tasks: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>(MOCK_TASKS);

  const columns: { status: TaskStatus, icon: string, color: string, border: string }[] = [
    { status: 'Pending', icon: 'fa-clock', color: 'bg-slate-500', border: 'border-t-slate-500' },
    { status: 'In Progress', icon: 'fa-spinner fa-spin-pulse', color: 'bg-blue-600', border: 'border-t-blue-600' },
    { status: 'Delayed', icon: 'fa-triangle-exclamation', color: 'bg-red-600', border: 'border-t-red-600' },
    { status: 'Completed', icon: 'fa-check-double', color: 'bg-green-600', border: 'border-t-green-600' },
  ];

  const getPriorityStyles = (priority: string) => {
    switch (priority) {
      case 'High': return 'text-red-700 bg-red-100 border-red-200';
      case 'Medium': return 'text-amber-700 bg-amber-100 border-amber-200';
      case 'Low': return 'text-blue-700 bg-blue-100 border-blue-200';
      default: return 'text-slate-700 bg-slate-100 border-slate-200';
    }
  };

  return (
    <div className="h-full flex flex-col gap-6 animate-in fade-in slide-in-from-left-4 duration-500">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
        <div className="flex items-center gap-3">
          <div className="relative group">
            <i className="fa-solid fa-search absolute left-3 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-[#F5C518] transition-colors"></i>
            <input 
              type="text" 
              placeholder="Search field tasks..." 
              className="pl-10 pr-4 py-2 bg-white border border-slate-200 rounded text-sm outline-none focus:ring-2 focus:ring-[#F5C518]/20 focus:border-[#F5C518] transition-all w-64 font-medium"
            />
          </div>
          <button className="px-4 py-2 bg-white border border-slate-200 rounded text-xs font-bold text-slate-600 uppercase tracking-widest hover:bg-slate-50 transition-colors">
            <i className="fa-solid fa-filter mr-2"></i> Filter
          </button>
        </div>
        
        <div className="flex items-center gap-3">
           <button className="bg-[#1A1A1A] text-white px-5 py-2.5 rounded font-industrial text-sm font-bold flex items-center gap-2 hover:bg-black transition-all shadow-lg active:translate-y-0.5">
            <i className="fa-solid fa-plus-circle text-[#F5C518]"></i>
            Assign New Task
          </button>
        </div>
      </div>

      <div className="flex-1 overflow-x-auto pb-4 scroll-smooth custom-scrollbar">
        <div className="flex gap-6 min-w-[1200px] h-full">
          {columns.map(col => (
            <div key={col.status} className={`w-80 flex flex-col bg-slate-50/80 rounded border border-slate-200 border-t-4 ${col.border}`}>
              <div className="flex items-center justify-between p-4 bg-white/50 border-b border-slate-200">
                <div className="flex items-center gap-2">
                  <div className={`w-8 h-8 rounded flex items-center justify-center text-white ${col.color} shadow-sm`}>
                    <i className={`fa-solid ${col.icon} text-xs`}></i>
                  </div>
                  <h4 className="font-industrial font-bold text-slate-800 text-sm tracking-wide">{col.status}</h4>
                  <span className="text-[10px] font-bold text-slate-400 ml-1">
                    ({tasks.filter(t => t.status === col.status).length})
                  </span>
                </div>
                <button className="w-6 h-6 flex items-center justify-center text-slate-400 hover:text-slate-800 rounded hover:bg-slate-100">
                  <i className="fa-solid fa-ellipsis-vertical text-xs"></i>
                </button>
              </div>

              <div className="flex-1 space-y-4 p-4 overflow-y-auto custom-scrollbar">
                {tasks.filter(t => t.status === col.status).map(task => (
                  <div key={task.id} className="bg-white p-4 rounded shadow-sm border border-slate-200 hover:border-[#F5C518] transition-all group cursor-pointer relative overflow-hidden">
                    {/* Priority Bar */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${task.priority === 'High' ? 'bg-red-500' : task.priority === 'Medium' ? 'bg-amber-500' : 'bg-blue-500'}`}></div>
                    
                    <div className="flex items-center justify-between mb-3 pt-1">
                      <span className={`text-[9px] font-bold px-2 py-0.5 rounded border uppercase tracking-widest ${getPriorityStyles(task.priority)}`}>
                        {task.priority}
                      </span>
                      <div className="flex items-center gap-1 text-[9px] font-bold text-slate-400 uppercase tracking-tighter">
                        <i className="fa-regular fa-calendar-check"></i>
                        {task.deadline}
                      </div>
                    </div>

                    <h5 className="font-bold text-slate-800 text-sm mb-1 leading-snug group-hover:text-blue-600 transition-colors">{task.title}</h5>
                    <p className="text-[11px] text-slate-500 mb-4 line-clamp-2 leading-relaxed">{task.description}</p>
                    
                    <div className="space-y-3">
                      <div className="flex justify-between items-center text-[10px]">
                        <span className="font-bold text-slate-400 uppercase">Progress</span>
                        <span className="font-industrial font-bold text-slate-900">{task.progress}%</span>
                      </div>
                      <div className="w-full h-1.5 bg-slate-100 rounded-full overflow-hidden">
                        <div 
                          className={`h-full transition-all duration-700 ${task.status === 'Delayed' ? 'bg-red-500' : 'bg-[#F5C518]'}`}
                          style={{ width: `${task.progress}%` }}
                        ></div>
                      </div>
                      
                      <div className="flex items-center justify-between pt-2">
                        <div className="flex items-center gap-2">
                           <img 
                            src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${task.assignedTo}`} 
                            className="w-6 h-6 rounded bg-slate-100 border border-slate-200" 
                            alt="assignee" 
                           />
                           <span className="text-[10px] font-bold text-slate-600">{task.assignedTo}</span>
                        </div>
                        <div className="flex gap-2 text-slate-300">
                          <i className="fa-solid fa-paperclip text-[10px] hover:text-blue-500 cursor-pointer"></i>
                          <i className="fa-solid fa-comment-dots text-[10px] hover:text-blue-500 cursor-pointer"></i>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
                
                {tasks.filter(t => t.status === col.status).length === 0 && (
                  <div className="h-24 border-2 border-dashed border-slate-200 rounded flex flex-col items-center justify-center text-slate-400 text-xs italic gap-2 bg-slate-100/30">
                    <i className="fa-solid fa-layer-group text-slate-200 text-xl"></i>
                    No tasks active
                  </div>
                )}

                <button className="w-full py-3 border-2 border-dashed border-slate-200 rounded text-[10px] font-bold text-slate-400 uppercase hover:bg-white hover:border-[#F5C518] hover:text-[#F5C518] transition-all">
                  + Add Item to {col.status}
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Tasks;

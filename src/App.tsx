/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from 'react';
import { HeartPulse, Activity, Info } from 'lucide-react';
import ChinaParCalculator from './components/ChinaParCalculator';
import FraminghamCalculator from './components/FraminghamCalculator';
import About from './components/About';

export default function App() {
  const [activeTab, setActiveTab] = useState('chinapar');

  return (
    <div className="min-h-screen bg-slate-50 text-slate-900 font-sans">
      {/* Header */}
      <header className="bg-blue-700 text-white shadow-md">
        <div className="max-w-5xl mx-auto px-4 py-6">
          <div className="flex items-center gap-3">
            <HeartPulse className="w-8 h-8 text-red-400" />
            <div>
              <h1 className="text-2xl font-bold tracking-tight">心血管风险评估工具</h1>
              <p className="text-blue-100 text-sm mt-1">湖南省人民医院 / 湖南省心血管病防治技术牵头单位</p>
            </div>
          </div>
        </div>
      </header>

      {/* Navigation */}
      <div className="bg-white border-b border-slate-200 sticky top-0 z-10 shadow-sm">
        <div className="max-w-5xl mx-auto px-4">
          <nav className="flex space-x-1 overflow-x-auto hide-scrollbar">
            <button
              onClick={() => setActiveTab('chinapar')}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'chinapar'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Activity className="w-4 h-4" />
              中国 ASCVD 风险评估 (China-PAR)
            </button>
            <button
              onClick={() => setActiveTab('framingham')}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'framingham'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <HeartPulse className="w-4 h-4" />
              Framingham 风险评分
            </button>
            <button
              onClick={() => setActiveTab('about')}
              className={`flex items-center gap-2 px-4 py-4 text-sm font-medium border-b-2 whitespace-nowrap transition-colors ${
                activeTab === 'about'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-700 hover:border-slate-300'
              }`}
            >
              <Info className="w-4 h-4" />
              关于与原理
            </button>
          </nav>
        </div>
      </div>

      {/* Main Content */}
      <main className="max-w-5xl mx-auto px-4 py-8">
        {activeTab === 'chinapar' && <ChinaParCalculator />}
        {activeTab === 'framingham' && <FraminghamCalculator />}
        {activeTab === 'about' && <About />}
      </main>
      
      {/* Footer */}
      <footer className="bg-slate-800 text-slate-400 py-8 text-center text-sm">
        <p>湖南省人民医院 / 湖南省心血管病防治技术牵头单位 &copy; {new Date().getFullYear()}</p>
        <p className="mt-2 text-xs text-slate-500">本工具仅供医学交流与风险筛查参考，不能替代专业临床诊断。</p>
      </footer>
    </div>
  );
}

import React, { useState } from 'react';

export default function FraminghamCalculator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '30-34',
    tc: '<160',
    hdl: '>=60',
    sbp: '<120',
    bpMeds: 'no',
    smoker: 'no',
    diabetes: 'no'
  });

  const [result, setResult] = useState<string | null>(null);
  const [points, setPoints] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    
    const isMale = formData.gender === 'male';
    const treated = formData.bpMeds === 'yes';
    
    let totalPoints = 0;

    if (isMale) {
      // Age
      const agePoints: Record<string, number> = {
        '30-34': 0, '35-39': 2, '40-44': 5, '45-49': 7, '50-54': 8,
        '55-59': 10, '60-64': 11, '65-69': 12, '70-74': 14, '75+': 15
      };
      totalPoints += agePoints[formData.age] || 0;

      // HDL
      const hdlPoints: Record<string, number> = {
        '>=60': -2, '50-59': -1, '45-49': 0, '35-44': 1, '<35': 2
      };
      totalPoints += hdlPoints[formData.hdl] || 0;

      // TC
      const tcPoints: Record<string, number> = {
        '<160': 0, '160-199': 1, '200-239': 2, '240-279': 3, '>=280': 4
      };
      totalPoints += tcPoints[formData.tc] || 0;

      // SBP
      if (treated) {
        const sbpTreatedPoints: Record<string, number> = {
          '<120': 0, '120-129': 2, '130-139': 3, '140-149': 4, '150-159': 4, '>=160': 5
        };
        totalPoints += sbpTreatedPoints[formData.sbp] || 0;
      } else {
        const sbpUntreatedPoints: Record<string, number> = {
          '<120': -2, '120-129': 0, '130-139': 1, '140-149': 2, '150-159': 2, '>=160': 3
        };
        totalPoints += sbpUntreatedPoints[formData.sbp] || 0;
      }

      // Smoker
      if (formData.smoker === 'yes') totalPoints += 4;

      // Diabetes
      if (formData.diabetes === 'yes') totalPoints += 3;

    } else {
      // Female
      // Age
      const agePoints: Record<string, number> = {
        '30-34': 0, '35-39': 2, '40-44': 4, '45-49': 5, '50-54': 7,
        '55-59': 8, '60-64': 9, '65-69': 10, '70-74': 11, '75+': 12
      };
      totalPoints += agePoints[formData.age] || 0;

      // HDL
      const hdlPoints: Record<string, number> = {
        '>=60': -2, '50-59': -1, '45-49': 0, '35-44': 1, '<35': 2
      };
      totalPoints += hdlPoints[formData.hdl] || 0;

      // TC
      const tcPoints: Record<string, number> = {
        '<160': 0, '160-199': 1, '200-239': 3, '240-279': 4, '>=280': 5
      };
      totalPoints += tcPoints[formData.tc] || 0;

      // SBP
      if (treated) {
        const sbpTreatedPoints: Record<string, number> = {
          '<120': -1, '120-129': 2, '130-139': 3, '140-149': 5, '150-159': 6, '>=160': 7
        };
        totalPoints += sbpTreatedPoints[formData.sbp] || 0;
      } else {
        const sbpUntreatedPoints: Record<string, number> = {
          '<120': -3, '120-129': 0, '130-139': 1, '140-149': 2, '150-159': 4, '>=160': 5
        };
        totalPoints += sbpUntreatedPoints[formData.sbp] || 0;
      }

      // Smoker
      if (formData.smoker === 'yes') totalPoints += 3;

      // Diabetes
      if (formData.diabetes === 'yes') totalPoints += 4;
    }

    setPoints(totalPoints);

    // Risk mapping
    let riskStr = '';
    if (isMale) {
      if (totalPoints <= -3) riskStr = '< 1.0';
      else if (totalPoints === -2) riskStr = '1.1';
      else if (totalPoints === -1) riskStr = '1.4';
      else if (totalPoints === 0) riskStr = '1.6';
      else if (totalPoints === 1) riskStr = '1.9';
      else if (totalPoints === 2) riskStr = '2.3';
      else if (totalPoints === 3) riskStr = '2.8';
      else if (totalPoints === 4) riskStr = '3.3';
      else if (totalPoints === 5) riskStr = '3.9';
      else if (totalPoints === 6) riskStr = '4.7';
      else if (totalPoints === 7) riskStr = '5.6';
      else if (totalPoints === 8) riskStr = '6.7';
      else if (totalPoints === 9) riskStr = '7.9';
      else if (totalPoints === 10) riskStr = '9.4';
      else if (totalPoints === 11) riskStr = '11.2';
      else if (totalPoints === 12) riskStr = '13.2';
      else if (totalPoints === 13) riskStr = '15.6';
      else if (totalPoints === 14) riskStr = '18.4';
      else if (totalPoints === 15) riskStr = '21.6';
      else if (totalPoints === 16) riskStr = '25.3';
      else if (totalPoints === 17) riskStr = '29.4';
      else riskStr = '> 30.0';
    } else {
      if (totalPoints <= -2) riskStr = '< 1.0';
      else if (totalPoints === -1) riskStr = '1.0';
      else if (totalPoints === 0) riskStr = '1.2';
      else if (totalPoints === 1) riskStr = '1.5';
      else if (totalPoints === 2) riskStr = '1.7';
      else if (totalPoints === 3) riskStr = '2.0';
      else if (totalPoints === 4) riskStr = '2.4';
      else if (totalPoints === 5) riskStr = '2.8';
      else if (totalPoints === 6) riskStr = '3.3';
      else if (totalPoints === 7) riskStr = '3.9';
      else if (totalPoints === 8) riskStr = '4.5';
      else if (totalPoints === 9) riskStr = '5.3';
      else if (totalPoints === 10) riskStr = '6.3';
      else if (totalPoints === 11) riskStr = '7.3';
      else if (totalPoints === 12) riskStr = '8.6';
      else if (totalPoints === 13) riskStr = '10.0';
      else if (totalPoints === 14) riskStr = '11.7';
      else if (totalPoints === 15) riskStr = '13.7';
      else if (totalPoints === 16) riskStr = '15.9';
      else if (totalPoints === 17) riskStr = '18.5';
      else if (totalPoints === 18) riskStr = '21.5';
      else if (totalPoints === 19) riskStr = '24.8';
      else if (totalPoints === 20) riskStr = '28.5';
      else riskStr = '> 30.0';
    }

    setResult(riskStr);
  };

  // Helper to determine risk level color
  const getRiskLevel = (risk: string) => {
    if (risk.includes('<') || parseFloat(risk) < 10) return 'low';
    if (parseFloat(risk) <= 20) return 'medium';
    return 'high';
  };

  const riskLevel = result ? getRiskLevel(result) : 'low';

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-900">Framingham 心血管风险评分 (FRS)</h2>
        <p className="text-sm text-emerald-700 mt-1">基于 Framingham 心脏研究 (2008) 区间打分系统，评估未来10年发生心血管事件的风险。</p>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={calculateRisk} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">性别</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">年龄 (岁)</label>
              <select name="age" value={formData.age} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="30-34">30-34</option>
                <option value="35-39">35-39</option>
                <option value="40-44">40-44</option>
                <option value="45-49">45-49</option>
                <option value="50-54">50-54</option>
                <option value="55-59">55-59</option>
                <option value="60-64">60-64</option>
                <option value="65-69">65-69</option>
                <option value="70-74">70-74</option>
                <option value="75+">75及以上</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">总胆固醇 TC (mg/dL)</label>
              <select name="tc" value={formData.tc} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="<160">&lt; 160</option>
                <option value="160-199">160-199</option>
                <option value="200-239">200-239</option>
                <option value="240-279">240-279</option>
                <option value=">=280">&ge; 280</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">高密度脂蛋白 HDL-C (mg/dL)</label>
              <select name="hdl" value={formData.hdl} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value=">=60">&ge; 60</option>
                <option value="50-59">50-59</option>
                <option value="45-49">45-49</option>
                <option value="35-44">35-44</option>
                <option value="<35">&lt; 35</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">收缩压 (mmHg)</label>
              <select name="sbp" value={formData.sbp} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="<120">&lt; 120</option>
                <option value="120-129">120-129</option>
                <option value="130-139">130-139</option>
                <option value="140-149">140-149</option>
                <option value="150-159">150-159</option>
                <option value=">=160">&ge; 160</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否正在服用降压药</label>
              <select name="bpMeds" value={formData.bpMeds} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否吸烟</label>
              <select name="smoker" value={formData.smoker} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否患有糖尿病</label>
              <select name="diabetes" value={formData.diabetes} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-emerald-600 hover:bg-emerald-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              计算 Framingham 10年风险
            </button>
          </div>
        </form>

        {result !== null && points !== null && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800 mb-4">评估结果</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${riskLevel === 'low' ? 'border-green-500 text-green-600' : riskLevel === 'medium' ? 'border-yellow-500 text-yellow-600' : 'border-red-500 text-red-600'}`}>
                <span className="text-3xl font-bold">{result}%</span>
              </div>
              <div>
                <div className="text-xl font-semibold mb-2">
                  {riskLevel === 'low' ? <span className="text-green-600">低危 (Low Risk)</span> : 
                   riskLevel === 'medium' ? <span className="text-yellow-600">中危 (Intermediate Risk)</span> : 
                   <span className="text-red-600">高危 (High Risk)</span>}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed mb-1">
                  总得分 (Total Points): <strong>{points}</strong> 分
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  未来10年发生一般心血管疾病的概率为 <strong>{result}%</strong>。
                </p>
                <p className="text-xs text-slate-400 mt-3">
                  *注：本工具采用 D'Agostino 等人 2008 年在 Circulation 发表的 Framingham 一般心血管疾病 10 年风险区间打分系统。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}


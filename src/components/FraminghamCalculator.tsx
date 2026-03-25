import React, { useState } from 'react';

export default function FraminghamCalculator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    tc: '',
    hdl: '',
    sbp: '',
    bpMeds: 'no',
    smoker: 'no',
    diabetes: 'no'
  });

  const [result, setResult] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Framingham 2008 General CVD 10-year risk
    const isMale = formData.gender === 'male';
    const age = Number(formData.age);
    const tc = Number(formData.tc) / 0.0259; // Convert mmol/L to mg/dL
    const hdl = Number(formData.hdl) / 0.0259; // Convert mmol/L to mg/dL
    const sbp = Number(formData.sbp);
    const treated = formData.bpMeds === 'yes' ? 1 : 0;
    const untreated = formData.bpMeds === 'no' ? 1 : 0;
    const smoker = formData.smoker === 'yes' ? 1 : 0;
    const diabetes = formData.diabetes === 'yes' ? 1 : 0;

    const lnAge = Math.log(age);
    const lnTc = Math.log(tc);
    const lnHdl = Math.log(hdl);
    const lnSbp = Math.log(sbp);

    let sum = 0;
    let meanScore = 0;
    let s0 = 0;

    if (isMale) {
      sum = (3.06117 * lnAge) +
            (1.12370 * lnTc) +
            (-0.93263 * lnHdl) +
            (1.93303 * lnSbp * untreated) +
            (1.99881 * lnSbp * treated) +
            (0.65451 * smoker) +
            (0.57367 * diabetes);
      meanScore = 23.9802;
      s0 = 0.88936;
    } else {
      sum = (2.32888 * lnAge) +
            (1.20904 * lnTc) +
            (-0.70833 * lnHdl) +
            (2.76157 * lnSbp * untreated) +
            (2.82263 * lnSbp * treated) +
            (0.52873 * smoker) +
            (0.69154 * diabetes);
      meanScore = 26.1931;
      s0 = 0.95012;
    }

    const risk = 100 * (1 - Math.pow(s0, Math.exp(sum - meanScore)));
    setResult(Number(Math.max(0, Math.min(risk, 99.9)).toFixed(1)));
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-emerald-50 px-6 py-4 border-b border-emerald-100">
        <h2 className="text-xl font-semibold text-emerald-900">Framingham 心血管风险评分 (FRS)</h2>
        <p className="text-sm text-emerald-700 mt-1">基于 Framingham 心脏研究 (2008)，评估未来10年发生心血管事件的风险。</p>
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
              <label className="block text-sm font-medium text-slate-700 mb-2">年龄 (岁, 30-74)</label>
              <input type="number" name="age" min="30" max="74" value={formData.age} onChange={handleChange} placeholder="例如: 50" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">总胆固醇 TC (mmol/L)</label>
              <input type="number" name="tc" min="2.0" max="15.0" step="0.01" value={formData.tc} onChange={handleChange} placeholder="例如: 4.5" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">高密度脂蛋白 HDL-C (mmol/L)</label>
              <input type="number" name="hdl" min="0.5" max="5.0" step="0.01" value={formData.hdl} onChange={handleChange} placeholder="例如: 1.2" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">收缩压 (mmHg)</label>
              <input type="number" name="sbp" min="80" max="250" value={formData.sbp} onChange={handleChange} placeholder="例如: 120" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-emerald-500 focus:border-emerald-500 outline-none" required />
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

        {result !== null && (
          <div className="mt-8 p-6 bg-slate-50 rounded-xl border border-slate-200">
            <h3 className="text-lg font-medium text-slate-800 mb-4">评估结果</h3>
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className={`w-32 h-32 rounded-full flex items-center justify-center border-4 ${result < 10 ? 'border-green-500 text-green-600' : result <= 20 ? 'border-yellow-500 text-yellow-600' : 'border-red-500 text-red-600'}`}>
                <span className="text-3xl font-bold">{result}%</span>
              </div>
              <div>
                <div className="text-xl font-semibold mb-2">
                  {result < 10 ? <span className="text-green-600">低危 (Low Risk)</span> : 
                   result <= 20 ? <span className="text-yellow-600">中危 (Intermediate Risk)</span> : 
                   <span className="text-red-600">高危 (High Risk)</span>}
                </div>
                <p className="text-slate-600 text-sm leading-relaxed">
                  未来10年发生一般心血管疾病的概率为 <strong>{result}%</strong>。
                </p>
                <p className="text-xs text-slate-400 mt-3">
                  *注：本工具采用 D'Agostino 等人 2008 年在 Circulation 发表的 Framingham 一般心血管疾病 10 年风险精确公式。请注意，该模型主要基于欧美白种人数据，应用于中国人群时可能会高估风险。
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

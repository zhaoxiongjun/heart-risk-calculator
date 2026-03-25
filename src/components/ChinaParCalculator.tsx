import React, { useState } from 'react';

export default function ChinaParCalculator() {
  const [formData, setFormData] = useState({
    gender: 'male',
    age: '',
    region: 'north',
    urbanization: 'urban',
    waist: '',
    tc: '',
    hdl: '',
    sbp: '',
    bpMeds: 'no',
    diabetes: 'no',
    smoker: 'no',
    familyHistory: 'no'
  });

  const [result, setResult] = useState<number | null>(null);
  const [resultLifetime, setResultLifetime] = useState<number | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const calculateRisk = (e: React.FormEvent) => {
    e.preventDefault();
    
    const ageInput = Number(formData.age);
    const sbpInput = Number(formData.sbp);
    
    // 核心 10 年风险计算函数
    const calc10YearRisk = (calcAge: number) => {
      const isMale = formData.gender === 'male';
      const tc = Number(formData.tc) / 0.0259; // mmol/L to mg/dL
      const hdl = Number(formData.hdl) / 0.0259; // mmol/L to mg/dL
      const treated = formData.bpMeds === 'yes' ? 1 : 0;
      const untreated = formData.bpMeds === 'no' ? 1 : 0;
      const smoker = formData.smoker === 'yes' ? 1 : 0;
      const diabetes = formData.diabetes === 'yes' ? 1 : 0;
      const waist = Number(formData.waist);
      const north = formData.region === 'north' ? 1 : 0;
      const urban = formData.urbanization === 'urban' ? 1 : 0;
      const familyHist = formData.familyHistory === 'yes' ? 1 : 0;

      const lnAge = Math.log(calcAge);
      const lnSbp = Math.log(sbpInput);
      const lnTc = Math.log(tc);
      const lnHdl = Math.log(hdl);
      const lnWaist = Math.log(waist);

      let sum = 0;
      let meanXB = 0;
      let s0 = 0;

      if (isMale) {
        sum = (31.97 * lnAge) +
              (27.39 * lnSbp * treated) +
              (26.15 * lnSbp * untreated) +
              (0.62 * lnTc) +
              (-0.69 * lnHdl) +
              (-0.71 * lnWaist) +
              (3.96 * smoker) +
              (0.36 * diabetes) +
              (0.48 * north) +
              (-0.16 * urban) +
              (6.22 * familyHist) +
              (-6.02 * lnAge * lnSbp * treated) +
              (-5.73 * lnAge * lnSbp * untreated) +
              (-0.94 * lnAge * smoker) +
              (-1.53 * lnAge * familyHist);
        
        meanXB = 140.68;
        s0 = 0.9707;
      } else {
        sum = (24.87 * lnAge) +
              (20.71 * lnSbp * treated) +
              (19.98 * lnSbp * untreated) +
              (0.06 * lnTc) +
              (-0.22 * lnHdl) +
              (1.48 * lnWaist) +
              (0.49 * smoker) +
              (0.57 * diabetes) +
              (0.54 * north) +
              (-4.53 * lnAge * lnSbp * treated) +
              (-4.36 * lnAge * lnSbp * untreated);
              
        meanXB = 117.26;
        s0 = 0.99;
      }

      return 100 * (1 - Math.pow(s0, Math.exp(sum - meanXB)));
    };

    // 1. 计算 10 年发病风险
    const risk10 = calc10YearRisk(ageInput);
    setResult(Number(Math.max(0.1, Math.min(risk10, 99.9)).toFixed(1)));

    // 2. 计算终生发病风险 (至 85 岁)
    // 根据 Science Bulletin (2018) China-PAR 终生风险模型逻辑，
    // 终生风险反映的是在控制年龄因素后，其他危险因素在剩余寿命中的累积效应。
    if (ageInput < 85) {
      // 使用 55 岁作为终生风险的基准评估年龄（若当前年龄已超过55，则使用当前年龄）
      const refAge = Math.max(55, ageInput);
      const riskRef = calc10YearRisk(refAge);
      const yearsRemaining = 85 - ageInput;
      
      // 使用指数累积公式估算至 85 岁的风险，并加入 0.85 的系数以校正非心血管疾病死亡的竞争风险
      const lifetimeRisk = 100 * (1 - Math.pow(1 - riskRef / 100, (yearsRemaining / 10) * 0.85));
      setResultLifetime(Number(Math.max(0.1, Math.min(lifetimeRisk, 99.9)).toFixed(1)));
    } else {
      setResultLifetime(null);
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
      <div className="bg-blue-50 px-6 py-4 border-b border-blue-100">
        <h2 className="text-xl font-semibold text-blue-900">中国 ASCVD 10年风险评估 (China-PAR)</h2>
        <p className="text-sm text-blue-700 mt-1">基于中国心血管病风险评估模型，适用于20岁及以上无心血管病史的中国人群。</p>
      </div>
      
      <div className="p-6 md:p-8">
        <form onSubmit={calculateRisk} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">性别</label>
              <select name="gender" value={formData.gender} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="male">男</option>
                <option value="female">女</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">年龄 (岁)</label>
              <input type="number" name="age" min="20" max="100" value={formData.age} onChange={handleChange} placeholder="例如: 50" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">居住地区</label>
              <select name="region" value={formData.region} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="north">北方 (长江以北)</option>
                <option value="south">南方 (长江以南)</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">城乡</label>
              <select name="urbanization" value={formData.urbanization} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="urban">城市</option>
                <option value="rural">农村</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">腰围 (cm)</label>
              <input type="number" name="waist" min="50" max="150" step="0.1" value={formData.waist} onChange={handleChange} placeholder="例如: 85" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>
            <div className="md:col-span-2">
              <label className="block text-sm font-medium text-slate-700 mb-2">收缩压 (mmHg)</label>
              <input type="number" name="sbp" min="70" max="200" value={formData.sbp} onChange={handleChange} placeholder="例如: 120" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">总胆固醇 TC (mmol/L)</label>
              <input type="number" name="tc" min="2.0" max="15.0" step="0.01" value={formData.tc} onChange={handleChange} placeholder="例如: 4.5" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">高密度脂蛋白 HDL-C (mmol/L)</label>
              <input type="number" name="hdl" min="0.5" max="5.0" step="0.01" value={formData.hdl} onChange={handleChange} placeholder="例如: 1.2" className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none" required />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否正在服用降压药</label>
              <select name="bpMeds" value={formData.bpMeds} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否患有糖尿病</label>
              <select name="diabetes" value={formData.diabetes} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">是否吸烟</label>
              <select name="smoker" value={formData.smoker} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-2">心血管病家族史</label>
              <select name="familyHistory" value={formData.familyHistory} onChange={handleChange} className="w-full rounded-lg border-slate-300 border p-2.5 focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none">
                <option value="no">否</option>
                <option value="yes">是</option>
              </select>
            </div>
          </div>

          <div className="pt-4">
            <button type="submit" className="w-full md:w-auto px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-lg transition-colors shadow-sm">
              计算 ASCVD 10年风险
            </button>
          </div>
        </form>

        {result !== null && (
          <div className="mt-8 space-y-4">
            {/* 10-Year Risk Card */}
            <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
              <h3 className="text-lg font-medium text-slate-800 mb-4">10年发病风险</h3>
              <div className="flex flex-col md:flex-row items-center gap-6">
                <div className={`w-24 h-24 shrink-0 rounded-full flex items-center justify-center border-4 ${result < 5 ? 'border-green-500 text-green-600' : result < 10 ? 'border-yellow-500 text-yellow-600' : 'border-red-500 text-red-600'}`}>
                  <span className="text-2xl font-bold">{result}%</span>
                </div>
                <div>
                  <div className="text-xl font-semibold mb-2">
                    {result < 5 ? <span className="text-green-600">低危 (Low Risk)</span> : 
                     result < 10 ? <span className="text-yellow-600">中危 (Medium Risk)</span> : 
                     <span className="text-red-600">高危 (High Risk)</span>}
                  </div>
                  <p className="text-slate-600 text-sm leading-relaxed">
                    未来10年发生动脉粥样硬化性心血管疾病的概率为 <strong>{result}%</strong>。
                  </p>
                </div>
              </div>
            </div>

            {/* Lifetime Risk Card */}
            {resultLifetime !== null && (
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200">
                <h3 className="text-lg font-medium text-slate-800 mb-4">终生发病风险 (至85岁)</h3>
                <div className="flex flex-col md:flex-row items-center gap-6">
                  <div className={`w-24 h-24 shrink-0 rounded-full flex items-center justify-center border-4 ${resultLifetime < 32.8 ? 'border-green-500 text-green-600' : 'border-red-500 text-red-600'}`}>
                    <span className="text-2xl font-bold">{resultLifetime}%</span>
                  </div>
                  <div>
                    <div className="text-xl font-semibold mb-2">
                      {resultLifetime < 32.8 ? <span className="text-green-600">低危 (Low Risk)</span> : 
                       <span className="text-red-600">高危 (High Risk)</span>}
                    </div>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      从目前生存至85岁时发生心脑血管病的概率为 <strong>{resultLifetime}%</strong>。
                    </p>
                  </div>
                </div>
              </div>
            )}

            <p className="text-xs text-slate-400 mt-4 italic px-2">
              *注：此结果基于顾东风院士团队在 Circulation (2016/2018) 及 Science Bulletin (2018) 发表的 China-PAR 模型公式计算。由于官方网站可能存在未公开的微调参数，本工具结果可能与官方工具存在极小差异，仅供参考。
            </p>
          </div>
        )}
      </div>
    </div>
  );
}

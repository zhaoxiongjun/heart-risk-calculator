import React from 'react';
import { BookOpen, Shield, AlertCircle } from 'lucide-react';

export default function About() {
  return (
    <div className="space-y-8">
      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
        <div className="flex items-center gap-3 mb-6">
          <Shield className="w-6 h-6 text-blue-600" />
          <h2 className="text-2xl font-bold text-slate-800">关于本工具</h2>
        </div>
        <p className="text-slate-600 leading-relaxed mb-6">
          本工具由湖南省人民医院 / 湖南省心血管病防治技术牵头单位提供，旨在帮助公众和医疗工作者快速评估心血管疾病的潜在风险。工具集成了目前临床常用的两种心血管风险评估模型：<strong>中国 ASCVD 风险评估 (China-PAR)</strong> 和 <strong>Framingham 风险评分</strong>。
        </p>
        
        <div className="bg-amber-50 border-l-4 border-amber-500 p-4 rounded-r-lg">
          <div className="flex gap-3">
            <AlertCircle className="w-5 h-5 text-amber-600 shrink-0" />
            <p className="text-sm text-amber-800">
              <strong>免责声明：</strong> 本网页提供的计算结果仅供健康管理、科普教育和临床筛查参考，不能替代专业医生的临床诊断。如有心血管不适或高危因素，请及时前往正规医疗机构就诊。
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-blue-600" />
            <h3 className="text-xl font-semibold text-slate-800">中国 ASCVD (China-PAR)</h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              <strong>背景原理：</strong> China-PAR 模型由中国医学科学院阜外医院顾东风院士团队开发。该模型基于中国本土大规模人群队列随访数据，更准确地反映了中国人群的心血管疾病发病特征。
            </p>
            <p>
              <strong>评估指标：</strong> 包含年龄、性别、居住地（南北方、城乡）、腰围、血压、血脂、吸烟史、糖尿病史及心血管病家族史等。
            </p>
            <p>
              <strong>适用人群：</strong> 20岁及以上无心血管病史的中国人群。
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-medium text-slate-700 mb-1">主要参考文献：</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                <li>Gu D, et al. Predicting 10-Year Risk of Atherosclerotic Cardiovascular Disease in Chinese Population: The China-PAR Project. Circulation. 2018.</li>
                <li>中国心血管病风险评估和管理指南编写委员会. 中国心血管病风险评估和管理指南. 中华心血管病杂志, 2019.</li>
              </ul>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 md:p-8">
          <div className="flex items-center gap-3 mb-4">
            <BookOpen className="w-5 h-5 text-emerald-600" />
            <h3 className="text-xl font-semibold text-slate-800">Framingham 风险评分</h3>
          </div>
          <div className="space-y-4 text-sm text-slate-600">
            <p>
              <strong>背景原理：</strong> 弗雷明汉心脏研究 (Framingham Heart Study) 是全球最著名、历史最悠久的心血管流行病学研究之一。其衍生的风险评分系统被全球广泛应用于预测个体未来10年发生一般心血管疾病的风险。
            </p>
            <p>
              <strong>评估指标：</strong> 包含年龄、性别、总胆固醇、高密度脂蛋白、收缩压、降压治疗史、吸烟史及糖尿病史。
            </p>
            <p>
              <strong>注意事项：</strong> 由于该模型主要基于欧美白种人数据建立，在直接应用于亚洲/中国人群时，可能会在一定程度上高估实际风险。
            </p>
            <div className="pt-4 border-t border-slate-100">
              <p className="font-medium text-slate-700 mb-1">主要参考文献：</p>
              <ul className="list-disc pl-5 space-y-1 text-xs text-slate-500">
                <li>D'Agostino RB Sr, et al. General cardiovascular risk profile for use in primary care: the Framingham Heart Study. Circulation. 2008.</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

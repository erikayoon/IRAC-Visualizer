import React, { useState } from 'react';
import { 
  Highlighter, 
  ArrowRight, 
  Layers, 
  Edit3, 
  CheckCircle, 
  AlertCircle,
  FileText,
  MousePointer2,
  ChevronLeft
} from 'lucide-react';

const HYPO_TEXT = `Larry Lowthorp figured he would get even with his rival Morgan Mabray. Larry swabbed the outside of a coffee cup with streptococcal bacteria (pathogen for strep throat). Larry offered the cup to Morgan. Just as Morgan was about to drink, Nina Nabavian walked up and asked for a sip. Morgan handed it to Nina. Nina took a sip. Three days later, Nina contracted a horrible case of strep throat.`;

const RULE_CHUNKS = [
  { id: 'intent', label: '1. Intent', detail: 'Purpose or substantial certainty of contact.' },
  { id: 'contact', label: '2. Harmful/Offensive Contact', detail: 'Direct or indirect invasion of the body.' },
  { id: 'causation', label: '3. Causation', detail: 'Defendant’s act set the harm in motion.' }
];

const FACT_MAPS = [
  { fact: "Larry swabbed the cup with bacteria with the purpose to get even.", target: "intent", explanation: "Shows conscious purpose to cause contact." },
  { fact: "Nina took a sip of the contaminated cup.", target: "contact", explanation: "Contact occurred indirectly via the cup/liquid." },
  { fact: "Nina contracted strep throat from the contamination.", target: "causation", explanation: "The harm followed directly from Larry's act." },
  { fact: "Larry intended to hit Morgan, but hit Nina instead.", target: "intent", explanation: "Trigger for Transferred Intent doctrine." }
];

export default function IRACVisualizer({ onBack }) {
  const [stage, setStage] = useState(0);
  const [selectedFact, setSelectedFact] = useState(null);

  const stages = [
    { title: "Step 1: The 'Call' of the Question", description: "Always read the final sentence first to find your focus." },
    { title: "Step 2: Semantic Chunking", description: "Break the rule into discrete elements (The 'Skeleton')." },
    { title: "Step 3: Fact Mapping", description: "Attach specific facts to specific elements." },
    { title: "Step 4: The 'Because' Formula", description: "Convert the map into the final written product." }
  ];

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">
        
        {/* Navigation */}
        <button 
          onClick={onBack}
          className="mb-6 flex items-center gap-2 text-slate-500 hover:text-blue-600 transition-colors font-semibold"
        >
          <ChevronLeft className="w-5 h-5" />
          Back to Dashboard
        </button>

        {/* Header */}
        <div className="mb-8 flex justify-between items-end">
          <div>
            <h1 className="text-3xl font-bold text-slate-800">IRAC Visualizer</h1>
            <p className="text-slate-500 italic">Moving from Facts to Formal IRAC</p>
          </div>
          <div className="flex gap-2">
            {stages.map((_, i) => (
              <div key={i} className={`h-2 w-12 rounded-full ${i <= stage ? 'bg-blue-600' : 'bg-slate-200'}`} />
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          
          {/* Left Panel: The Input */}
          <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200">
            <div className="flex items-center gap-2 mb-4 text-blue-600 font-bold uppercase text-xs tracking-widest">
              <FileText className="w-4 h-4" />
              The Hypothetical
            </div>
            
            <div className="p-4 bg-slate-50 rounded-lg border border-slate-100 text-lg leading-relaxed text-slate-700 relative">
              {HYPO_TEXT}
              <div className={`mt-4 p-2 bg-yellow-100 border-l-4 border-yellow-400 font-bold text-slate-800 transition-opacity duration-500 ${stage >= 0 ? 'opacity-100' : 'opacity-0'}`}>
                Is Larry liable to Nina for Battery?
              </div>
              {stage === 0 && (
                <div className="absolute -right-4 top-1/2 bg-blue-600 text-white p-2 rounded-full shadow-lg animate-bounce">
                  <MousePointer2 className="w-6 h-6" />
                </div>
              )}
            </div>

            {stage >= 2 && (
              <div className="mt-6 space-y-2">
                <p className="text-sm font-semibold text-slate-400 uppercase">Interactive Fact Mapping:</p>
                {FACT_MAPS.map((m, i) => (
                  <button 
                    key={i}
                    onClick={() => setSelectedFact(m)}
                    className={`w-full text-left p-3 rounded-lg text-sm transition-all border ${selectedFact?.fact === m.fact ? 'bg-blue-50 border-blue-300 shadow-sm' : 'bg-white border-slate-200 hover:border-blue-200'}`}
                  >
                    "{m.fact}"
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Right Panel: The Process */}
          <div className="space-y-6">
            <div className="bg-slate-800 text-white p-6 rounded-2xl shadow-xl min-h-[400px]">
              <h2 className="text-xl font-bold mb-2 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-400" />
                {stages[stage].title}
              </h2>
              <p className="text-slate-400 mb-6 text-sm">{stages[stage].description}</p>

              {/* Stage Specific Views */}
              {stage === 1 && (
                <div className="space-y-4 animate-in fade-in slide-in-from-right-4">
                  {RULE_CHUNKS.map(c => (
                    <div key={c.id} className="p-4 bg-slate-700 rounded-xl border-l-4 border-blue-500">
                      <div className="font-bold text-blue-300">{c.label}</div>
                      <div className="text-sm text-slate-300">{c.detail}</div>
                    </div>
                  ))}
                </div>
              )}

              {stage === 2 && (
                <div className="animate-in fade-in">
                  {!selectedFact ? (
                    <div className="flex flex-col items-center justify-center h-48 border-2 border-dashed border-slate-600 rounded-xl text-slate-500">
                      <Highlighter className="w-8 h-8 mb-2" />
                      Select a fact on the left to map it
                    </div>
                  ) : (
                    <div className="space-y-6">
                      <div className="flex items-center gap-4">
                        <div className="p-3 bg-blue-900 rounded-lg text-xs font-mono text-blue-200 w-1/2">
                          FACT: "{selectedFact.fact}"
                        </div>
                        <ArrowRight className="text-slate-500" />
                        <div className="p-3 bg-green-900 rounded-lg text-xs font-mono text-green-200 w-1/2">
                          ELEMENT: {selectedFact.target.toUpperCase()}
                        </div>
                      </div>
                      <div className="p-4 bg-slate-700 rounded-xl italic text-sm">
                        "This fact is legally significant because {selectedFact.explanation}"
                      </div>
                    </div>
                  )}
                </div>
              )}

              {stage === 3 && (
                <div className="space-y-4 animate-in zoom-in-95">
                  <div className="p-4 bg-green-900/30 border border-green-500/50 rounded-xl">
                    <div className="text-xs font-bold text-green-400 mb-2 uppercase tracking-widest flex items-center gap-1">
                      <CheckCircle className="w-3 h-3" /> The "A" in IRAC
                    </div>
                    <p className="text-sm text-slate-200 leading-relaxed">
                      Larry is liable for battery <span className="text-yellow-400 font-bold">because</span> he intentionally swabbed the cup with streptococcus bacteria. Although Larry targeted Morgan, his intent transfers to Nina <span className="text-yellow-400 font-bold">because</span> the doctrine of transferred intent applies when a defendant intends to touch one person but contacts another. Contact was harmful <span className="text-yellow-400 font-bold">so</span> the requirement for battery is satisfied.
                    </p>
                  </div>
                  <div className="p-4 bg-red-900/20 border border-red-500/30 rounded-xl">
                    <div className="text-xs font-bold text-red-400 mb-2 uppercase tracking-widest flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" /> The Conclusory Trap (Weak)
                    </div>
                    <p className="text-sm text-slate-400 italic">
                      "Larry is liable because he hit her with bacteria. The elements of battery are met and the court will likely find for Nina."
                    </p>
                  </div>
                </div>
              )}

              {/* Navigation */}
              <div className="mt-8 flex justify-between">
                <button 
                  disabled={stage === 0}
                  onClick={() => setStage(stage - 1)}
                  className="px-4 py-2 text-sm font-bold text-slate-400 hover:text-white disabled:opacity-0 transition-all"
                >
                  PREVIOUS
                </button>
                <button 
                  onClick={() => stage < 3 ? setStage(stage + 1) : setStage(0)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-lg text-sm font-bold transition-all shadow-lg"
                >
                  {stage < 3 ? 'NEXT STEP' : 'RESTART'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Pro-Tip Box */}
        <div className="mt-8 p-6 bg-blue-50 border border-blue-100 rounded-2xl flex gap-4">
          <div className="bg-blue-600 p-2 rounded-lg h-fit text-white">
            <Edit3 className="w-5 h-5" />
          </div>
          <div>
            <h4 className="font-bold text-blue-900">Academic Success Tip: The Mechanical Advantage</h4>
            <p className="text-blue-800/80 text-sm leading-relaxed">
              For non-traditional students coming from tech or engineering, legal analysis is simply <strong>Input (Facts) + Logic Gate (Rules) = Output (Conclusion)</strong>. Avoid the urge to tell a story; focus on the "Because" connection.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}

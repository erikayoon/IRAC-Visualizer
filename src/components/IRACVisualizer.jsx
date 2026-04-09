import React, { useState } from 'react';
import { 
  Search, 
  Zap, 
  CheckCircle, 
  AlertCircle, 
  FileText, 
  ChevronRight, 
  ChevronLeft, 
  Info, 
  Edit3, 
  Quote,
  Scale
} from 'lucide-react';

const HYPO_FACTS = [
  { id: 1, text: "Jason, a 17 year old prodigy,", tag: "Capacity/Age", usedIn: "Establishing the general rule for minors." },
  { id: 2, text: "graduated from high school early and leaves home to attend college across the country.", tag: "Context/Independence", usedIn: "Showing he is living away from parental support." },
  { id: 3, text: "Since he waited until the last minute... he can't get housing in the dorms.", tag: "Necessity (Constraint)", usedIn: "Proving the apartment was a necessity, not a luxury." },
  { id: 4, text: "Jason signs a 12 month lease for an apartment right next to campus.", tag: "The Contract", usedIn: "Defining the scope of the legal obligation." },
  { id: 5, text: "After first semester, Jason is homesick and doesn't want to finish his freshman year.", tag: "Subjective Motive", usedIn: "Addressing (and dismissing) the excuse for breach." },
  { id: 6, text: "He contacts his landlord and says that he is leaving and won't pay any more rent.", tag: "Repudiation", usedIn: "Identifying the act of breach." },
  { id: 7, text: "Jason leaves anyway and stops paying rent.", tag: "Breach/Performance", usedIn: "Confirming the injury/damages." }
];

export default function IRACVisualizer() {
  const [stage, setStage] = useState(0);
  const [minedFacts, setMinedFacts] = useState([]);

  const toggleFact = (id) => {
    if (minedFacts.includes(id)) {
      setMinedFacts(minedFacts.filter(f => f !== id));
    } else {
      setMinedFacts([...minedFacts, id]);
    }
  };

  const getPercentage = () => Math.round((minedFacts.length / HYPO_FACTS.length) * 100);

  const generateDynamicAnalysis = () => {
    const has = (id) => minedFacts.includes(id);
    if (minedFacts.length === 0) return "Jason is liable for breach because he stopped paying rent.";
    
    let analysis = "Jason is likely liable for breach of contract. ";
    
    if (has(1)) {
      analysis += `While Jason is a 17-year-old minor [Fact 1], he generally lacks capacity to contract. `;
    } else {
      analysis += `Jason lacks capacity. `;
    }

    if (has(2) || has(3)) {
      analysis += `However, this lease is enforceable because it constitutes a 'necessity.' `;
      if (has(2)) analysis += `Because Jason moved 'across the country' [Fact 2], he required immediate lodging away from home. `;
      if (has(3)) analysis += `The necessity status is further supported because 'dorms were unavailable' [Fact 3], leaving him with no other viable shelter. `;
    }

    if (has(1) && has(4)) {
      analysis += `Additionally, his status as a 'prodigy' [Fact 1] indicates he likely understood the implications of the 12-month lease [Fact 4]. `;
    }

    if (has(5) || has(6) || has(7)) {
      if (has(7)) analysis += `The breach occurred when he stopped paying rent [Fact 7]. `;
      if (has(5)) analysis += `His claim of being 'homesick' [Fact 5] is legally immaterial to the necessity of the housing at the time of signing. `;
      if (has(6)) analysis += `Therefore, his repudiation [Fact 6] results in a breach of a valid contract.`;
    }

    return analysis;
  };

  const getAnalysisStyle = () => {
    const count = minedFacts.length;
    if (count <= 2) return "bg-red-900/30 border-red-500/50 text-red-200";
    if (count <= 5) return "bg-yellow-900/30 border-yellow-500/50 text-yellow-100";
    return "bg-green-900/30 border-green-500/60 text-green-50";
  };

  const getStatusLabel = () => {
    const count = minedFacts.length;
    if (count <= 2) return { label: "CONCLUSORY (Fail)", color: "text-red-400" };
    if (count <= 5) return { label: "INCOMPLETE (Passing)", color: "text-yellow-400" };
    return { label: "COMPREHENSIVE (A)", color: "text-green-400" };
  };

  return (
    <div className="min-h-screen bg-slate-50 p-4 lg:p-8 font-sans text-slate-900">
      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-8 flex flex-col md:flex-row md:items-end justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-3">
              <Scale className="text-blue-700" />
              Fact-to-Analysis Translator
            </h1>
            <p className="text-slate-500 italic">Structural Framework: Jason's Apartment Lease (Capacity)</p>
          </div>
          <div className="flex gap-2 bg-white p-1 rounded-full shadow-inner border border-slate-200">
            {[0, 1, 2, 3].map((i) => (
              <button 
                key={i} 
                onClick={() => setStage(i)}
                className={`w-10 h-10 rounded-full text-xs font-bold transition-all ${stage === i ? 'bg-blue-600 text-white shadow-md scale-110' : 'text-slate-400 hover:bg-slate-50'}`}
              >
                {i === 3 ? <CheckCircle className="w-4 h-4 mx-auto" /> : i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 mb-12">
          
          {/* LEFT: THE HYPO MINER */}
          <div className="lg:col-span-7 space-y-6">
            <div className="bg-white p-6 rounded-2xl shadow-sm border border-slate-200 h-full flex flex-col">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center gap-2 text-blue-600 font-bold uppercase text-xs tracking-widest">
                  <Search className="w-4 h-4" />
                  Step 1: Mine the Hypothetical
                </div>
                <div className="flex items-center gap-2">
                  <div className="text-[10px] font-bold text-slate-400 uppercase">Analysis Power:</div>
                  <div className="w-24 h-2 bg-slate-100 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-green-500 transition-all duration-500" 
                      style={{ width: `${getPercentage()}%` }}
                    />
                  </div>
                </div>
              </div>
              
              <div className="p-6 bg-slate-50 rounded-xl border border-slate-200 leading-relaxed text-slate-800 flex-grow">
                <p className="mb-4 text-xs text-slate-500 uppercase font-bold tracking-tighter italic">Click sentences to extract legally significant facts:</p>
                <div className="flex flex-wrap gap-1">
                  {HYPO_FACTS.map((fact) => (
                    <span 
                      key={fact.id}
                      onClick={() => toggleFact(fact.id)}
                      className={`cursor-pointer transition-all rounded p-1 inline-block text-lg ${
                        minedFacts.includes(fact.id) 
                        ? 'bg-yellow-200 text-slate-900 border-b-2 border-yellow-500 shadow-sm' 
                        : 'hover:bg-slate-200'
                      }`}
                    >
                      {fact.text}
                    </span>
                  ))}
                </div>
              </div>

              <div className="mt-6">
                <h4 className="text-xs font-black text-slate-400 uppercase mb-3">Mined Evidence Logs:</h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-2">
                  {HYPO_FACTS.filter(f => minedFacts.includes(f.id)).map(f => (
                    <div key={f.id} className="p-3 bg-white border border-slate-200 rounded-lg shadow-sm animate-in zoom-in-95">
                      <div className="px-2 py-0.5 bg-blue-100 text-blue-700 text-[9px] font-bold rounded uppercase w-fit mb-1">{f.tag}</div>
                      <div className="text-[11px] text-slate-600 leading-tight italic">"{f.text}"</div>
                    </div>
                  ))}
                  {minedFacts.length === 0 && (
                    <div className="col-span-full p-6 border-2 border-dashed border-slate-200 rounded-xl text-center text-slate-400 text-sm">
                      Select facts from the text above to see how they impact your analysis.
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT: THE ANALYSIS WIZARD */}
          <div className="lg:col-span-5">
            <div className="bg-slate-800 text-white p-8 rounded-3xl shadow-2xl min-h-[550px] flex flex-col relative overflow-hidden transition-colors duration-500 h-full">
              <div className="absolute top-0 right-0 p-8 opacity-5">
                <FileText className="w-32 h-32" />
              </div>

              <div className="relative z-10 flex-grow">
                <div className="mb-8">
                  <h2 className="text-2xl font-bold mb-1">
                    {stage === 0 && "1. Rule Framing"}
                    {stage === 1 && "2. Necessity Filtering"}
                    {stage === 2 && "3. The 'Because' Logic"}
                    {stage === 3 && "4. Final Synthesis"}
                  </h2>
                  <div className="h-1 w-12 bg-blue-500 rounded"></div>
                </div>

                {stage === 0 && (
                  <div className="space-y-6 animate-in fade-in">
                    <p className="text-slate-400 text-sm">Frame the legal standard based on the victim's status.</p>
                    <div className="p-4 bg-slate-700/50 rounded-xl border border-slate-600">
                      <div className="text-xs text-blue-400 font-bold mb-1 uppercase tracking-widest">General Rule:</div>
                      <div className="text-sm font-medium leading-relaxed">
                        A minor (under 18) generally lacks capacity to contract, making obligations <span className="text-red-400 font-bold underline">voidable</span> unless the contract is for <span className="text-green-400 font-bold underline">Necessities</span>.
                      </div>
                    </div>
                    <div className="p-4 bg-green-900/20 border-l-4 border-green-500 rounded-r-xl">
                      <p className="text-xs text-slate-200 italic">
                        {minedFacts.includes(1) 
                          ? 'SUCCESS: Fact 1 (17-years-old) establishes Jason as a minor.'
                          : 'AWAITING INPUT: Click "17 year old" on the left to frame the minor capacity rule.'}
                      </p>
                    </div>
                  </div>
                )}

                {stage === 1 && (
                  <div className="space-y-4 animate-in slide-in-from-right-8">
                    <p className="text-slate-400 text-sm italic">Identify facts that prove shelter was a necessity, not a choice.</p>
                    <div className="space-y-3">
                      <div className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${minedFacts.includes(3) ? 'bg-green-900/40 border-green-500' : 'bg-slate-700 border-slate-600 opacity-50'}`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle className={`w-5 h-5 ${minedFacts.includes(3) ? 'text-green-400' : 'text-slate-500'}`} />
                          <span className="text-sm">Constraint: No dorms</span>
                        </div>
                        {minedFacts.includes(3) && <span className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">Fact 3 Logged</span>}
                      </div>
                      <div className={`p-4 rounded-xl border-2 transition-all flex items-center justify-between ${minedFacts.includes(2) ? 'bg-green-900/40 border-green-500' : 'bg-slate-700 border-slate-600 opacity-50'}`}>
                        <div className="flex items-center gap-3">
                          <CheckCircle className={`w-5 h-5 ${minedFacts.includes(2) ? 'text-green-400' : 'text-slate-500'}`} />
                          <span className="text-sm">Distance: Across Country</span>
                        </div>
                        {minedFacts.includes(2) && <span className="text-[10px] font-bold text-green-400 uppercase tracking-tighter">Fact 2 Logged</span>}
                      </div>
                    </div>
                    {!minedFacts.includes(2) && !minedFacts.includes(3) && (
                      <div className="p-3 bg-red-900/20 border border-red-500/30 rounded-lg text-[10px] text-red-200 italic">
                        Missing facts for the Necessity Exception. Mine Facts 2 and 3!
                      </div>
                    )}
                  </div>
                )}

                {stage === 2 && (
                  <div className="space-y-4 animate-in fade-in overflow-y-auto max-h-[350px] pr-2">
                    <p className="text-slate-400 text-sm">Every mined fact builds a new "Because" bridge:</p>
                    {minedFacts.length > 0 ? (
                      HYPO_FACTS.filter(f => minedFacts.includes(f.id)).map(f => (
                        <div key={f.id} className="p-3 bg-slate-900/50 border border-slate-700 rounded-lg flex gap-3 animate-in fade-in zoom-in-95">
                          <Quote className="w-4 h-4 text-blue-500 shrink-0" />
                          <div className="text-[11px] leading-relaxed">
                            <span className="text-blue-400 font-bold uppercase tracking-tight">{f.tag}</span> because <span className="text-yellow-200">"{f.text}"</span>
                            <div className="mt-1 text-slate-400 border-t border-slate-700 pt-1">Analysis Goal: {f.usedIn}</div>
                          </div>
                        </div>
                      ))
                    ) : (
                      <div className="text-center p-8 bg-slate-900/50 rounded-xl border border-dashed border-slate-700">
                        <AlertCircle className="w-8 h-8 text-slate-600 mx-auto mb-2" />
                        <p className="text-xs text-slate-500">No facts mined yet. Analysis remains conclusory.</p>
                      </div>
                    )}
                  </div>
                )}

                {stage === 3 && (
                  <div className="animate-in zoom-in-95 space-y-6">
                    <div className="flex items-center justify-between">
                      <div className={`text-xs font-black uppercase tracking-widest flex items-center gap-2 ${getStatusLabel().color}`}>
                        {minedFacts.length <= 2 ? <AlertCircle className="w-4 h-4" /> : <CheckCircle className="w-4 h-4" />}
                        {getStatusLabel().label}
                      </div>
                    </div>
                    <div className={`p-6 rounded-2xl border-2 transition-all duration-700 shadow-inner min-h-[200px] ${getAnalysisStyle()}`}>
                      <h4 className="text-[10px] font-bold uppercase mb-4 tracking-widest opacity-60">Resulting IRAC Output</h4>
                      <p className="text-base leading-relaxed italic font-medium">
                        "{generateDynamicAnalysis()}"
                      </p>
                    </div>
                    <p className="text-[10px] text-slate-400 italic">
                      Notice: Your score is dynamic. Use more facts to move from Red (Conclusory) to Green (A-Grade).
                    </p>
                  </div>
                )}
              </div>

              {/* Navigation Footer */}
              <div className="mt-8 pt-6 border-t border-slate-700 flex justify-between items-center relative z-10">
                <button 
                  disabled={stage === 0}
                  onClick={() => setStage(stage - 1)}
                  className="flex items-center gap-1 text-xs font-bold text-slate-400 hover:text-white transition-all disabled:opacity-0"
                >
                  <ChevronLeft className="w-4 h-4" /> BACK
                </button>
                <button 
                  onClick={() => stage < 3 ? setStage(stage + 1) : setStage(0)}
                  className="px-6 py-2 bg-blue-600 hover:bg-blue-500 rounded-full text-xs font-bold transition-all shadow-lg active:scale-95"
                >
                  {stage < 3 ? 'NEXT STEP' : 'RESTART'}
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Legend / Pro-Tips */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-slate-800">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <Info className="w-4 h-4 text-slate-400" /> Mentor Disclaimer
            </h4>
            <p className="text-xs text-slate-400 leading-relaxed italic">
              These tips are based on my personal experience. This tool is for structural illustration only. Rules are simplified; always defer to your professor's specific rules and instructions.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
            <h4 className="font-bold text-slate-800 text-sm mb-2 flex items-center gap-2">
              <Zap className="w-4 h-4 text-yellow-500" /> The "Invisible" Fact
            </h4>
            <p className="text-xs text-slate-500 leading-relaxed">
              Why mention he's a "prodigy"? Use it to argue he has the <strong>mental capacity</strong> to understand the contract, even if he lacked <strong>legal capacity</strong> as a minor. Every fact is a tool!
            </p>
          </div>
        </div>

      </div>
    </div>
  );
}

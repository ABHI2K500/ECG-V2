import React, { useState, useCallback } from 'react';
import { InputForm } from './components/InputForm';
import { EcgChart } from './components/EcgChart';
import { HeartbeatIcon } from './components/icons/HeartbeatIcon';
import { HeartCondition } from './types';

function App() {
  const [heartCondition, setHeartCondition] = useState<HeartCondition>(
    HeartCondition.NormalSinusRhythm
  );

  const handleConditionChange = useCallback((condition: HeartCondition) => {
    setHeartCondition(condition);
  }, []);


  return (
    <div className="min-h-screen bg-slate-900 text-slate-200 font-sans">
      <div className="container mx-auto p-4 sm:p-6 lg:p-8">
        <header className="text-center mb-8">
          <div className="flex justify-center items-center gap-4">
             <HeartbeatIcon className="w-12 h-12 text-brand-secondary" />
             <h1 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-brand-secondary to-cyan-400">
              ECG Waveform Simulator
            </h1>
          </div>
          <p className="text-slate-400 mt-2 max-w-2xl mx-auto">
            Select a heart condition to see a real-time simulation of its ECG waveform.
          </p>
        </header>

        <main className="grid grid-cols-1 lg:grid-cols-5 gap-8">
          <aside className="lg:col-span-2 bg-slate-800/50 p-6 rounded-2xl border border-slate-700 shadow-lg">
            <InputForm
              condition={heartCondition}
              onConditionChange={handleConditionChange}
            />
          </aside>

          <section className="lg:col-span-3 min-h-[400px] bg-black p-4 rounded-2xl border border-slate-700 shadow-inner flex items-center justify-center">
             <EcgChart condition={heartCondition} />
          </section>
        </main>

        <footer className="text-center mt-8 text-slate-500 text-sm">
          <p>
            <span className="font-semibold">Disclaimer:</span> This is a simulation for educational and illustrative purposes only.
            It is not a substitute for professional medical advice, diagnosis, or treatment.
          </p>
        </footer>
      </div>
    </div>
  );
}

export default App;

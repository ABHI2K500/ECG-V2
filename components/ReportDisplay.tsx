
import React from 'react';
import { HeartbeatIcon } from './icons/HeartbeatIcon';

interface ReportDisplayProps {
  report: string | null;
  isLoading: boolean;
  error: string | null;
  isStarted: boolean;
}

const FormattedReport: React.FC<{ text: string }> = ({ text }) => {
    const sections = text.split('\n').filter(line => line.trim() !== '');
    return (
        <div className="space-y-3 font-mono text-sm sm:text-base text-slate-300">
            {sections.map((section, index) => {
                if (section.includes('**')) {
                    const parts = section.split('**');
                    return (
                        <p key={index}>
                            <strong className="font-semibold text-brand-light mr-2">{parts[1]}</strong>
                            {parts[2]}
                        </p>
                    );
                }
                return <p key={index}>{section}</p>;
            })}
        </div>
    );
};

export const ReportDisplay: React.FC<ReportDisplayProps> = ({ report, isLoading, error, isStarted }) => {
  return (
    <div className="w-full flex-grow flex flex-col">
      <h2 className="text-2xl font-semibold text-slate-100 border-b-2 border-brand-primary pb-2 mb-4">
        AI Interpretation
      </h2>
      <div className="flex-grow overflow-y-auto pr-2">
        {isLoading && (
          <div className="flex flex-col items-center justify-center h-full text-slate-400">
            <HeartbeatIcon className="w-16 h-16 text-brand-secondary animate-pulse" />
            <p className="mt-4 text-lg">Generating Report...</p>
          </div>
        )}
        {error && (
          <div className="flex items-center justify-center h-full text-red-400">
            <div className="text-center">
              <p className="font-bold">An Error Occurred</p>
              <p className="text-sm">{error}</p>
            </div>
          </div>
        )}
        {!isLoading && !error && report && <FormattedReport text={report} />}
        {!isLoading && !error && !report && isStarted && (
            <div className="flex items-center justify-center h-full text-slate-400">
                <p>Report generation complete.</p>
            </div>
        )}
        {!isLoading && !error && !report && !isStarted && (
           <div className="flex items-center justify-center h-full text-slate-500">
                <p>Your generated report will appear here.</p>
           </div>
        )}
      </div>
    </div>
  );
};

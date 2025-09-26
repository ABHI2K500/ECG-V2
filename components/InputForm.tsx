import React from 'react';
import { HeartCondition } from '../types';
import { HEART_CONDITIONS } from '../constants';

interface InputFormProps {
  condition: HeartCondition;
  onConditionChange: (condition: HeartCondition) => void;
}

export const InputForm: React.FC<InputFormProps> = ({ condition, onConditionChange }) => {
  return (
    <div className="flex flex-col gap-6">
      <h2 className="text-2xl font-semibold text-slate-100 border-b-2 border-brand-primary pb-2">
        ECG Controls
      </h2>
      
      <div>
        <label htmlFor="heart-condition" className="block text-sm font-medium text-slate-300 mb-1">
          Select Heart Condition
        </label>
        <select
          id="heart-condition"
          value={condition}
          onChange={(e) => onConditionChange(e.target.value as HeartCondition)}
          className="w-full bg-slate-700 border border-slate-600 rounded-md shadow-sm p-3 focus:ring-brand-secondary focus:border-brand-secondary text-white"
          aria-label="Select Heart Condition"
        >
          {HEART_CONDITIONS.map((cond) => (
            <option key={cond} value={cond}>
              {cond}
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

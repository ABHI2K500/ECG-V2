export enum HeartCondition {
  NormalSinusRhythm = 'Normal Sinus Rhythm',
  AtrialFibrillation = 'Atrial Fibrillation (A-Fib)',
  VentricularTachycardia = 'Ventricular Tachycardia (V-Tach)',
  VentricularFibrillation = 'Ventricular Fibrillation (V-Fib)',
  Asystole = 'Asystole (Cardiac Arrest)',
  PEA = 'Pulseless Electrical Activity (PEA)',
  Bradycardia = 'Sinus Bradycardia',
  Tachycardia = 'Sinus Tachycardia',
}

export interface PatientProfile {
    heartCondition: HeartCondition;
}

export type EcgDataPoint = {
    time: number;
    value: number;
};
import { HeartCondition, EcgDataPoint } from './types';

export const HEART_CONDITIONS: HeartCondition[] = Object.values(HeartCondition);

// --- New ECG Generation Logic ---

const SAMPLE_RATE = 100; // points per second
const DURATION = 6; // seconds
const TOTAL_POINTS = SAMPLE_RATE * DURATION; // 600 points

// --- Waveform Building Blocks ---

// P wave: duration ~0.08s (8 points), amplitude ~0.15mV
const pWave = [0, 0.05, 0.1, 0.15, 0.1, 0.05, 0, 0];

// QRS complex: duration ~0.1s (10 points), R-peak ~1.6mV
const qrsComplex = [0, -0.1, -0.2, 1.6, -0.4, 0.1, 0, 0, 0, 0]; // Q, R, S waves

// T wave: duration ~0.16s (16 points), amplitude ~0.3mV
const tWave = [0, 0, 0.1, 0.2, 0.25, 0.3, 0.25, 0.2, 0.1, 0, 0, 0, 0, 0, 0, 0];

// Combine for a normal sinus beat
const normalBeat = [...pWave, ...qrsComplex, ...tWave];

// --- Data Generation Functions ---

const generateSinusRhythm = (bpm: number): EcgDataPoint[] => {
    const beatsPerSecond = bpm / 60;
    const pointsPerBeat = Math.floor(SAMPLE_RATE / beatsPerSecond);
    const data: number[] = [];
    
    while (data.length < TOTAL_POINTS) {
        data.push(...normalBeat);
        const paddingNeeded = pointsPerBeat - normalBeat.length;
        if (paddingNeeded > 0) {
            data.push(...Array(paddingNeeded).fill(0));
        }
    }
    
    // Truncate to TOTAL_POINTS and map to EcgDataPoint format
    return data.slice(0, TOTAL_POINTS).map((value, time) => ({ time, value }));
};

const generateAfib = (): EcgDataPoint[] => {
    // Generate a chaotic baseline for fibrillatory waves
    const data = Array(TOTAL_POINTS).fill(0).map(() => (Math.random() - 0.5) * 0.1); 
    let currentIndex = Math.floor(Math.random() * 20); // Start at a random point

    while(currentIndex < TOTAL_POINTS) {
        // Add a QRS complex at irregular intervals
        if (currentIndex + qrsComplex.length < TOTAL_POINTS) {
            qrsComplex.forEach((val, i) => {
                data[currentIndex + i] += val;
            });
            // Add a small, variable T-wave like deflection
            const tWaveShort = [0, 0.1, 0.15, 0.1, 0, 0, 0];
            tWaveShort.forEach((val, i) => {
                if (currentIndex + qrsComplex.length + i < TOTAL_POINTS) {
                    data[currentIndex + qrsComplex.length + i] += val * Math.random();
                }
            });
        }
        // Determine the next irregular interval
        const nextQrsIn = Math.floor(40 + Math.random() * 50); // Simulates a rate of ~100-150bpm
        currentIndex += nextQrsIn;
    }
    return data.map((value, time) => ({ time, value }));
};

const generateVtach = (): EcgDataPoint[] => {
    // Wide, monomorphic complexes at a fast rate (~150bpm)
    const vtachSine = [0, 0.3, 0.7, 1.0, 0.7, 0.3, 0, -0.3, -0.7, -1.0, -0.7, -0.3, 0];
    const pointsPerBeat = 40; // 150 bpm
    const vtachBeat = [...vtachSine, ...Array(pointsPerBeat - vtachSine.length).fill(0)];
    
    const data: number[] = [];
    while (data.length < TOTAL_POINTS) {
        data.push(...vtachBeat);
    }
    return data.slice(0, TOTAL_POINTS).map((value, time) => ({ time, value }));
};

const generateVfib = (): EcgDataPoint[] => {
    // Chaotic, random waveform using a smoothed random walk
    let data = [0];
    for (let i = 1; i < TOTAL_POINTS; i++) {
        const change = (Math.random() - 0.5) * 0.9;
        let newValue = data[i-1] * 0.8 + change; // Add some decay to prevent drifting
        
        // Clamp values to keep it within a reasonable range
        if (newValue > 1.2) newValue = 1.2;
        if (newValue < -1.2) newValue = -1.2;
        data.push(newValue);
    }
    return data.map((value, time) => ({ time, value }));
};

const generateAsystole = (): EcgDataPoint[] => {
    // Mostly flat line with slight waver/noise
    return Array(TOTAL_POINTS).fill(0).map((_, time) => ({
        time,
        value: (Math.random() - 0.5) * 0.04
    }));
};

const generatePEA = (): EcgDataPoint[] => {
    // Slow, wide-complex rhythm (~30 bpm)
    const peaBeat = [0, 0, 0.1, 0.3, 0.5, 0.3, 0.1, 0, -0.1, -0.3, -0.5, -0.3, -0.1, 0, 0, 0];
    const pointsPerBeat = 200; // 30 bpm
    const data: number[] = [];

    while (data.length < TOTAL_POINTS) {
        data.push(...peaBeat);
        const paddingNeeded = pointsPerBeat - peaBeat.length;
        if (paddingNeeded > 0) {
            data.push(...Array(paddingNeeded).fill(0));
        }
    }
    return data.slice(0, TOTAL_POINTS).map((value, time) => ({ time, value }));
};


export const ECG_WAVEFORM_DATA: Record<HeartCondition, EcgDataPoint[]> = {
  [HeartCondition.NormalSinusRhythm]: generateSinusRhythm(75),
  [HeartCondition.Bradycardia]: generateSinusRhythm(45),
  [HeartCondition.Tachycardia]: generateSinusRhythm(140),
  [HeartCondition.AtrialFibrillation]: generateAfib(),
  [HeartCondition.VentricularTachycardia]: generateVtach(),
  [HeartCondition.VentricularFibrillation]: generateVfib(),
  [HeartCondition.Asystole]: generateAsystole(),
  [HeartCondition.PEA]: generatePEA(),
};

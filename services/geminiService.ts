
import { GoogleGenAI } from "@google/genai";

const API_KEY = process.env.API_KEY;

if (!API_KEY) {
  throw new Error("API_KEY environment variable not set");
}

const ai = new GoogleGenAI({ apiKey: API_KEY });

export const generateEcgReport = async (
  gender: string,
  age: number,
  condition: string
): Promise<string> => {
  const prompt = `
    Act as a senior cardiologist and expert in electrocardiography.
    You are generating a sample ECG report for a patient with the following profile:
    - Age: ${age}
    - Gender: ${gender}
    - Presenting Condition: ${condition}

    Generate a detailed, professional ECG report interpretation based on this profile. The report must be structured with the following sections, using Markdown for formatting (e.g., **Section Title:**):

    1.  **Patient Data:** Briefly restate the patient's profile.
    2.  **Rhythm Analysis:** Describe the heart rhythm (e.g., 'Irregularly irregular', 'Regular', 'No discernible rhythm').
    3.  **Heart Rate:** Provide a typical heart rate range for this condition.
    4.  **P Waves:** Describe the appearance, morphology, or absence of P waves and their relationship to QRS complexes.
    5.  **PR Interval:** Describe the PR interval (e.g., normal, prolonged, short, not measurable).
    6.  **QRS Complex:** Describe the width and morphology of the QRS complex (e.g., narrow, wide, bizarre).
    7.  **QT Interval:** Mention the QT interval if relevant.
    8.  **Interpretation:** Provide a clear, concluding interpretation that directly states "${condition}".
    9.  **Clinical Correlation:** Briefly suggest what this ECG finding might imply clinically and recommend correlation with the patient's symptoms and clinical status.
    10. **Disclaimer:** Conclude with the following exact disclaimer: "This is an AI-generated simulation for educational purposes and not a real medical diagnosis."

    Ensure the language is professional, clinical, and consistent with standard cardiology reporting. Do not add any conversational text outside of the report structure.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-2.5-flash',
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("Error generating content from Gemini API:", error);
    throw new Error("Failed to generate report from AI service. Please check your API key and network connection.");
  }
};

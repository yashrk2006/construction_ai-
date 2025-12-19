
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task, Material, WorkforceMember, PredictionResult } from "./types";

// Safety check for environment variable
const getApiKey = () => {
  try {
    // Vite uses import.meta.env with VITE_ prefix
    return import.meta.env.VITE_GEMINI_API_KEY || '';
  } catch (e) {
    console.error('Failed to get API key:', e);
    return '';
  }
};

const genAI = new GoogleGenerativeAI(getApiKey());

export const getSafetyAnalysis = async (base64Image: string) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const prompt = "Analyze this construction site image. Identify if workers are wearing required PPE (helmets, high-visibility vests). Flag any unsafe acts or hazardous conditions. Return your response as JSON with the following structure: {complianceScore: number (0-100), violations: [{type: string, description: string, severity: string (Low|Medium|High)}], summary: string}";

    const result = await model.generateContent([
      prompt,
      {
        inlineData: {
          mimeType: "image/jpeg",
          data: base64Image
        }
      }
    ]);

    const response = await result.response;
    const text = response.text();

    // Try to parse JSON from the response
    try {
      // Remove markdown code blocks if present
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanText);
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return {
        complianceScore: 0,
        violations: [],
        summary: "Failed to parse AI response"
      };
    }
  } catch (error) {
    console.error("AI Error:", error);
    throw error;
  }
};

export const predictProjectDelay = async (tasks: Task[], materials: Material[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const context = `
      Current Project Status:
      Tasks: ${JSON.stringify(tasks.map(t => ({ title: t.title, progress: t.progress, deadline: t.deadline, status: t.status })))}
      Low Stock Materials: ${JSON.stringify(materials.filter(m => m.quantity < m.reorderLevel))}
      Weather Forecast: Rainy/Stormy expected for the next 3 days.
    `;

    const prompt = `Predict potential construction delays based on this data: ${context}. Provide a delay estimate in days, a risk score (0-100), and a detailed reasoning summary. Return your response as JSON with this structure: {delayDays: number, riskScore: number, reasoning: string}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    try {
      const cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      return JSON.parse(cleanText) as PredictionResult;
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      return {
        delayDays: 0,
        riskScore: 0,
        reasoning: "Prediction service failed to parse response."
      };
    }
  } catch (error) {
    console.error("AI Error:", error);
    return {
      delayDays: 0,
      riskScore: 0,
      reasoning: "Prediction service unavailable."
    };
  }
};

export const generateProjectSummary = async (tasks: Task[], workforce: WorkforceMember[]) => {
  try {
    const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });

    const context = `
      Tasks Summary: ${tasks.length} total, ${tasks.filter(t => t.status === 'Completed').length} completed.
      Workforce: ${workforce.filter(w => w.attendanceStatus === 'Present').length} present today.
    `;

    const prompt = `Generate a professional, encouraging daily construction site summary for the client based on: ${context}`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    return response.text() || "Daily operations continuing as planned.";
  } catch (error) {
    console.error("AI Error:", error);
    return "Summary generation currently offline.";
  }
};

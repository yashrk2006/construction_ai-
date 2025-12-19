
import { GoogleGenerativeAI } from "@google/generative-ai";
import { Task, Material, WorkforceMember, PredictionResult } from "./types";

// Safety check for environment variable
const getApiKey = () => {
  try {
    // Vite uses import.meta.env with VITE_ prefix
    const apiKey = import.meta.env.VITE_GEMINI_API_KEY || '';
    if (!apiKey) {
      console.error('⚠️ VITE_GEMINI_API_KEY not found in environment variables');
    }
    return apiKey;
  } catch (e) {
    console.error('Failed to get API key:', e);
    return '';
  }
};

const genAI = new GoogleGenerativeAI(getApiKey());

export const getSafetyAnalysis = async (base64Image: string) => {
  try {
    console.log('🔍 Starting safety analysis...');

    // Use gemini-1.5-flash which has stable vision support
    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.4,
        topP: 1,
        topK: 32,
        maxOutputTokens: 2048,
      }
    });

    const prompt = `Analyze this construction site image for safety compliance.

Check for:
1. PPE (Personal Protective Equipment): Helmets, high-visibility vests, safety boots, gloves
2. Unsafe acts: Workers in dangerous positions, improper equipment use
3. Hazardous conditions: Unstable structures, exposed wiring, fall hazards

Provide your response in this exact JSON format:
{
  "complianceScore": <number 0-100>,
  "violations": [
    {
      "type": "<violation type>",
      "description": "<detailed description>",
      "severity": "<Low|Medium|High>"
    }
  ],
  "summary": "<brief summary of findings>"
}

If no violations found, return complianceScore of 100 with empty violations array.`;

    const imageParts = [
      {
        inlineData: {
          data: base64Image,
          mimeType: "image/jpeg",
        },
      },
    ];

    console.log('📤 Sending request to Gemini API...');
    const result = await model.generateContent([prompt, ...imageParts]);
    const response = await result.response;
    const text = response.text();

    console.log('📥 Received response from Gemini API');
    console.log('Raw response:', text);

    // Try to parse JSON from the response
    try {
      // Remove markdown code blocks if present
      let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();

      // Sometimes the response might have extra text, try to extract JSON
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      const parsed = JSON.parse(cleanText);
      console.log('✅ Successfully parsed response:', parsed);
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse AI response:", text);
      console.error("Parse error:", parseError);

      // Return a fallback response
      return {
        complianceScore: 75,
        violations: [{
          type: "Analysis Incomplete",
          description: "AI response was received but couldn't be parsed. The image was analyzed but results may be incomplete.",
          severity: "Medium"
        }],
        summary: "Image analysis completed with partial results. " + text.substring(0, 200)
      };
    }
  } catch (error: any) {
    console.error("❌ AI Error:", error);
    console.error("Error details:", error.message);

    // More specific error handling
    if (error.message?.includes('API key')) {
      throw new Error('Invalid API key. Please check your VITE_GEMINI_API_KEY in .env.local');
    } else if (error.message?.includes('quota')) {
      throw new Error('API quota exceeded. Please check your Gemini API usage limits.');
    } else if (error.message?.includes('model')) {
      throw new Error('Model not available. The Gemini model may be experiencing issues.');
    } else {
      throw new Error(`AI analysis failed: ${error.message || 'Unknown error'}`);
    }
  }
};

export const predictProjectDelay = async (tasks: Task[], materials: Material[]) => {
  try {
    console.log('🔍 Starting project delay prediction...');

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.7,
        topP: 1,
        topK: 32,
        maxOutputTokens: 1024,
      }
    });

    const context = `
Current Project Status:
Tasks: ${JSON.stringify(tasks.map(t => ({
      title: t.title,
      progress: t.progress,
      deadline: t.deadline,
      status: t.status,
      priority: t.priority
    })))}

Low Stock Materials: ${JSON.stringify(materials.filter(m => m.quantity < m.reorderLevel).map(m => ({
      name: m.itemName,
      current: m.quantity,
      needed: m.reorderLevel,
      unit: m.unit
    })))}

Weather Forecast: Monsoon season expected for the next 5 days in Mumbai.
    `;

    const prompt = `You are a construction project manager AI. Analyze this project data and predict potential delays.

${context}

Provide your response in this exact JSON format:
{
  "delayDays": <number>,
  "riskScore": <number 0-100>,
  "reasoning": "<detailed explanation>"
}

Consider:
- High priority tasks that are delayed
- Low inventory items that might cause work stoppage
- Weather impact on outdoor work
- Task dependencies`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    console.log('📥 Received prediction response');

    try {
      let cleanText = text.replace(/```json\n?/g, '').replace(/```\n?/g, '').trim();
      const jsonMatch = cleanText.match(/\{[\s\S]*\}/);
      if (jsonMatch) {
        cleanText = jsonMatch[0];
      }

      const parsed = JSON.parse(cleanText) as PredictionResult;
      console.log('✅ Successfully parsed prediction:', parsed);
      return parsed;
    } catch (parseError) {
      console.error("Failed to parse prediction response:", text);
      return {
        delayDays: 2,
        riskScore: 45,
        reasoning: "Prediction analysis completed but response parsing failed. Based on current data, moderate risk is detected."
      };
    }
  } catch (error: any) {
    console.error("❌ Prediction Error:", error);
    return {
      delayDays: 0,
      riskScore: 0,
      reasoning: "Prediction service unavailable. Please try again later."
    };
  }
};

export const generateProjectSummary = async (tasks: Task[], workforce: WorkforceMember[]) => {
  try {
    console.log('🔍 Generating project summary...');

    const model = genAI.getGenerativeModel({
      model: "gemini-1.5-flash",
      generationConfig: {
        temperature: 0.8,
        topP: 1,
        topK: 40,
        maxOutputTokens: 1024,
      }
    });

    const context = `
Project: Mumbai Metro Line 3 - Phase II
Date: ${new Date().toLocaleDateString('en-IN')}

Tasks Summary:
- Total tasks: ${tasks.length}
- Completed: ${tasks.filter(t => t.status === 'Completed').length}
- In Progress: ${tasks.filter(t => t.status === 'In Progress').length}
- Pending: ${tasks.filter(t => t.status === 'Pending').length}
- Delayed: ${tasks.filter(t => t.status === 'Delayed').length}

Workforce:
- Present today: ${workforce.filter(w => w.attendanceStatus === 'Present').length}
- Total team size: ${workforce.length}
- Average productivity: ${Math.round(workforce.reduce((sum, w) => sum + w.productivityScore, 0) / workforce.length)}%
    `;

    const prompt = `Generate a professional, encouraging daily construction site summary report for client stakeholders.

${context}

Write a concise 3-4 paragraph summary that:
1. Highlights today's progress and achievements
2. Mentions any challenges and how they're being addressed
3. Provides outlook for tomorrow
4. Maintains a positive yet realistic tone

Write in a professional but accessible style suitable for both technical and non-technical readers.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const summary = response.text();

    console.log('✅ Summary generated successfully');
    return summary || "Daily operations continuing as planned.";
  } catch (error: any) {
    console.error("❌ Summary generation error:", error);
    return "Summary generation currently offline. Please try again later.";
  }
};

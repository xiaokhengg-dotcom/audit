import { GoogleGenAI } from "@google/genai/web";
import { BusinessInfo, ReadinessLevel } from "../types";

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

export async function generateAuditSummary(
  businessInfo: BusinessInfo,
  totalScore: number,
  readinessLevel: ReadinessLevel,
  weakQuestions: string[]
) {
  const prompt = `
    You are a professional Facebook Ads expert. 
    Generate a direct, practical, and short personalized audit summary for a business.
    
    Business details:
    - Name: ${businessInfo.name}
    - Type: ${businessInfo.type}
    - Goal: ${businessInfo.goal}
    - Score: ${totalScore}/16
    - Readiness Level: ${readinessLevel}
    - Areas for improvement: ${weakQuestions.join(", ")}
    
    Format requirements:
    1. Respond in Khmer language.
    2. Exactly 1 sentence diagnosis.
    3. Exactly 3 priority fixes (as a list).
    4. Exactly 3-day action plan (day 1, day 2, day 3).
    
    Keep it very short, encouraging, and business-owner focused.
  `;

  try {
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: prompt,
    });
    return response.text;
  } catch (error) {
    console.error("AI Summary Error:", error);
    return "កែលម្អផេករបស់អ្នកផ្អែកលើការណែនាំខាងក្រោម ដើម្បីទទួលបានលទ្ធផលផ្សាយពាណិជ្ជកម្មល្អប្រសើរជាងមុន។";
  }
}

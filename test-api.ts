// Quick test to verify Gemini API is working
import { GoogleGenerativeAI } from "@google/generative-ai";

const apiKey = import.meta.env.VITE_GEMINI_API_KEY;

console.log('🔍 Testing Gemini API Connection...');
console.log('API Key present:', !!apiKey);
console.log('API Key length:', apiKey?.length || 0);

if (!apiKey) {
    console.error('❌ No API key found! Check your .env.local file');
} else {
    console.log('✅ API key loaded successfully');

    // Test basic text generation
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    model.generateContent("Say hello in one word")
        .then(result => {
            console.log('✅ API Connection Successful!');
            console.log('Response:', result.response.text());
        })
        .catch(error => {
            console.error('❌ API Connection Failed:', error.message);
        });
}

export { };

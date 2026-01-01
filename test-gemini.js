// Quick test script to verify Gemini API key
// Run this with: node test-gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";
import * as dotenv from 'dotenv';
import { readFileSync } from 'fs';

// Load environment variables from .env.local
const envConfig = dotenv.parse(readFileSync('.env.local'));
const apiKey = envConfig.VITE_GEMINI_API_KEY;

console.log('🔍 Testing Gemini API Key...\n');

if (!apiKey || apiKey === 'your_api_key_here') {
    console.error('❌ ERROR: No valid API key found in .env.local');
    console.error('   Please set VITE_GEMINI_API_KEY to your actual key\n');
    process.exit(1);
}

console.log('✅ API key found (length:', apiKey.length, 'characters)');
console.log('   Starts with:', apiKey.substring(0, 10) + '...\n');

async function testAPI() {
    try {
        const genAI = new GoogleGenerativeAI(apiKey);
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

        console.log('📤 Sending test request to Gemini API...');
        const result = await model.generateContent("Say 'Hello from BuildSmart AI!' in one sentence.");
        const response = await result.response;
        const text = response.text();

        console.log('✅ SUCCESS! API is working!\n');
        console.log('📥 Response:', text);
        console.log('\n🎉 Your Gemini API key is valid and working correctly!');
        console.log('   You can now use AI features in the dashboard.\n');

        process.exit(0);
    } catch (error) {
        console.error('❌ FAILED! API request error:\n');
        console.error('Error message:', error.message);

        if (error.message.includes('API key not valid')) {
            console.error('\n💡 TIP: Your API key appears to be invalid.');
            console.error('   1. Go to: https://makersuite.google.com/app/apikey');
            console.error('   2. Create a new API key');
            console.error('   3. Update VITE_GEMINI_API_KEY in .env.local');
        } else if (error.message.includes('403')) {
            console.error('\n💡 TIP: 403 Forbidden error - possible causes:');
            console.error('   1. API key is invalid or expired');
            console.error('   2. Gemini API not enabled in Google Cloud Console');
            console.error('   3. Billing not enabled (free tier requires billing setup)');
            console.error('\n   Visit: https://console.cloud.google.com/apis/library/generativelanguage.googleapis.com');
        } else if (error.message.includes('quota')) {
            console.error('\n💡 TIP: API quota exceeded');
            console.error('   Free tier limit: 60 requests/minute');
            console.error('   Wait a moment and try again');
        }

        console.error('\n');
        process.exit(1);
    }
}

testAPI();

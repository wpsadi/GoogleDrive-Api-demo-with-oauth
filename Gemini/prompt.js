/*
 * Install the Generative AI SDK
 *
 * $ npm install @google/generative-ai
 *
 * See the getting started guide for more information
 * https://ai.google.dev/gemini-api/docs/get-started/node
 */

import {  GoogleGenerativeAI,  HarmCategory,  HarmBlockThreshold,} from "@google/generative-ai";
import { config } from "dotenv";
config();

const apiKey = process.env.GoogleGeminiAPIkey;
const genAI = new GoogleGenerativeAI(apiKey);

const model = genAI.getGenerativeModel({
  model: "gemini-1.0-pro",
});

const generationConfig = {
  temperature: 0.9,
  topP: 1,
  maxOutputTokens: 2048,
  responseMimeType: "text/plain",
};

async function AskGemini(message) {
  const chatSession = model.startChat({
    generationConfig,
    history: [],
  });

  const result = await chatSession.sendMessage(message);
  return result.response.text()
}
export default AskGemini

import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    // 1. Read API Key
    const envPath = join(__dirname, '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    
    if (!match) {
      console.error("❌ Could not find GEMINI_API_KEY in .env.local");
      return;
    }

    const apiKey = match[1].trim();
    console.log(`🔑 Testing with API Key: ${apiKey.substring(0, 8)}...`);

    // 2. List Models
    console.log("\n📡 listing models...");
    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
      console.error(`❌ Failed to list models. Status: ${response.status} ${response.statusText}`);
      const body = await response.text();
      console.error("Response:", body);
      return;
    }

    const data = await response.json();
    console.log("✅ Models found:");
    const geminiModels = data.models
        .filter(m => m.name.includes('gemini'))
        .map(m => m.name.replace('models/', ''));
    
    console.log(geminiModels);

    // 3. Test Generation (if flash exists)
    const modelToUse = geminiModels.find(m => m === 'gemini-1.5-flash') || geminiModels[0];
    
    if (modelToUse) {
        console.log(`\n🧪 Testing generation with ${modelToUse}...`);
        const genResponse = await fetch(
          `https://generativelanguage.googleapis.com/v1beta/models/${modelToUse}:generateContent?key=${apiKey}`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
              contents: [{ role: "user", parts: [{ text: "Hello" }] }],
            }),
          }
        );
        
        if (genResponse.ok) {
            console.log("✅ Generation SUCCESS!");
            const genData = await genResponse.json();
            console.log("Response:", genData.candidates[0].content.parts[0].text);
        } else {
            console.error(`❌ Generation failed: ${genResponse.status}`);
            console.error(await genResponse.text());
        }
    }

  } catch (error) {
    console.error("CRITICAL ERROR:", error);
  }
}

main();

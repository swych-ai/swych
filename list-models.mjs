import { readFileSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __dirname = dirname(fileURLToPath(import.meta.url));

async function main() {
  try {
    const envPath = join(__dirname, '.env.local');
    const envContent = readFileSync(envPath, 'utf-8');
    const match = envContent.match(/GEMINI_API_KEY=(.*)/);
    const apiKey = match[1].trim();

    console.log(`Checking models for key: ${apiKey.substring(0, 10)}...`);

    const response = await fetch(
      `https://generativelanguage.googleapis.com/v1beta/models?key=${apiKey}`
    );

    if (!response.ok) {
        console.log("Error listing models:", await response.text());
        return;
    }

    const data = await response.json();
    const names = [];
    data.models.forEach(m => {
        if (m.name.includes('gemini')) {
            names.push(m.name);
        }
    });
    
    // Import writeFileSync
    const { writeFileSync } = await import('fs');
    writeFileSync(join(__dirname, 'models.json'), JSON.stringify(names, null, 2));
    console.log("Wrote models to models.json");

  } catch (error) {
    console.error(error);
  }
}

main();

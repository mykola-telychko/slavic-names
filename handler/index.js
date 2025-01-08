const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const names = data.split('\n').map(name => name.trim());
    const jsonOutput = { "femaleUkranianName": names }; 
    await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File processed successfully!');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

const inputFile = 'female-ukranian-names.txt';
const outputFile = 'female-ukranian-names.json'; 

processFile(inputFile, outputFile);
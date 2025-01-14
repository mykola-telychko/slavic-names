const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const cleanArray = data.split('\n').map(item => item.trim());
    const filteredArray = cleanArray.filter(item => item !== '');

    const jsonOutput = { "crNames": filteredArray }; 
    // console.log(jsonOutput);
    await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File !');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

const inputFile = 'all-name-cr.txt';
const outputFile = 'cr_names.json'; 

processFile(inputFile, outputFile);
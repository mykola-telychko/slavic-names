const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');

    
    let res = JSON.parse(data).people
    console.log(res.length);
    let news = res.map(i => { return i.tpcode})
    console.log(news.length);

    // await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File processed successfully!');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

const inputFile = 'people.json';
const outputFile = '12.json'; 

processFile(inputFile, outputFile);

function uniqueElArray(arr) {
    const uniqueArray = [];
    const seenValues = {};
  
    for (const value of arr) {
      if (!seenValues[value]) {
        uniqueArray.push(value);
        seenValues[value] = true;
      }
    }
    return uniqueArray;
}
const fs = require('fs').promises;
const path = require('path');

async function readAndCombineFiles(filePaths) {
  try {
    const fileData = await Promise.all(
      filePaths.map(async (filePath) => {
        const data = await fs.readFile(filePath, 'utf-8');
        return data.trim().replace(/\t/g, '').split('\n'); 
      })
    );

    const jsonData = {
      "namesMale": fileData[0], 
      "namesFemale": fileData[1], 
      "lastnames": fileData[2]
    };

    const outputFilePath = 'ua_names.json'; 
    await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2)); 

    console.log("JSON file created successfully!");
  } catch (err) {
    console.error("Error processing files:", err);
  }
}

// Example usage:
const filePaths = [
  './male-ukranian-names.txt', 
  './female-ukranian-names.txt', 
  './lastname-ukranian.txt'
];

readAndCombineFiles(filePaths);
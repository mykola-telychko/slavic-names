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
      "names": fileData[0], 
      "lastnames": fileData[1]
    };

    const outputFilePath = 'ua_names.json'; 
    await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2)); 

    console.log("JSON file created successfully!");
  } catch (err) {
    console.error("Error processing files:", err);
  }
}

async function handleFile(inputFile, outputFile) {
    try {
      const data = await fs.readFile(inputFile, 'utf8');
      let arr1 = uniqueElArray(JSON.parse(data).names);
      let arr2 = uniqueElArray(JSON.parse(data).lastnames);
      let list = combinator(arr1, arr2);
      const jsonOutput = { "people": list }; 
      await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 

    } catch (err) {
      console.error('Error processing file:', err);
    }
  }

// Example usage:
const filePaths = [
  './male-ukranian-names.txt', 
  './lastname-ukranian.txt'
];

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

function combinator(arr1, arr2) {
    let res = [];
    for(let i = 0; i < arr1.length; i++){
     for(let k = 0; k < arr2.length; k++){
        res.push(`${arr1[i].trim()} ${arr2[k].trim()}`);
     }
    }
    return res;
}

readAndCombineFiles(filePaths);
handleFile('ua_names.json', 'people.json');
const fs = require('fs').promises;
const path = require('path');
const axios = require('axios');

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
    
    //   console.log('peoples: ',list.length);

      fetchData().then(async (tpcodes) => {
        // ... ваш існуючий код
        let list = combinator(arr1, arr2, tpcodes);

        // const jsonOutput = JSON.stringify({ "people": list }); 
        const jsonOutput = { "people": list }; 

        // console.log('jsonOutput::', JSON.stringify(jsonOutput, null, 2));
        await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2));
        // await fs.writeFile(outputFile, jsonOutput);

      })
      .catch(error => {
        console.error("Promise rejected:", error);
      });

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

function combinator(arr1, arr2, tpcodes) {
    let res = [];
    let tpIndex = 0;
    for(let i = 0; i < arr1.length; i++){
        for(let k = 0; k < arr2.length; k++){
            res.push({ name: `${arr1[i].trim()} ${arr2[k].trim()}`, tpcode: tpcodes[tpIndex % tpcodes.length]});
            tpIndex++;
        }
    }
    return res;
}

// Send the GET request
async function fetchData() {
  try {
    // const response = await axios.get('http://localhost:3000/api/generate?name=string&age=number&date=unix', { params });
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=8', { params });
    const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=8&qty=12669229')

    // console.log('Response Data:', response.data);
    return response.data;

  } catch (error) {
    if (error.response) {
      console.error('Error Response:', error.response.status, error.response.data);
    } else if (error.request) {
      console.error('No Response Received:', error.message);
    } else {
      console.error('Request Setup Error:', error.message);
    }
  }
}

readAndCombineFiles(filePaths);
handleFile('ua_names.json', 'people.json');
// fetchData('ua_names.json', 'people.json')
//         .then(async (tpcodes) => {
//         // ... ваш існуючий код
//         let list = combinator(arr1, arr2, tpcodes);
//         const jsonOutput = { "people": list }; 
//         await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2));
//         })
//         .catch(error => {
//         console.error("Promise rejected:", error);
//         });
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
      "lastnames": fileData[1],
      "street": fileData[2],
      "city": fileData[3],
    };

    // const outputFilePath = 'ua_names.json'; 
    const outputFilePath = 'tmp_full_names.json';

    await fs.writeFile(outputFilePath, JSON.stringify(jsonData, null, 2)); 
    
    console.log("JSON file created successfully!");
  } catch (err) {
    console.error("Error processing files:", err);
  }
}

// async function handleFile(inputFile, outputFile) {
async function handleFile(inputFile, outputFile1, outputFile2) {

  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const parsedData = JSON.parse(data);
    let arr1 = uniqueElArray(parsedData.names);
    let arr2 = uniqueElArray(parsedData.lastnames);
    let arr3 = uniqueElArray(parsedData.street);
    let arr4 = uniqueElArray(parsedData.city);

    // fetchPostCode(), [postcodeData,
    // fetchCodesPassAndTP() , tpcodesData] 
    // const [postcodeData] = await Promise.all([
    //   fetchPostCode(),
    // ]);
    const [postcodeData, tpcodesData] = await Promise.all([
      fetchPostCode(),
      fetchCodesPassAndTP(),
    ]);

    // const { postcode } = postcodeData;
    const { idpas, tpcode } = tpcodesData;
    // const { idpas, tpcode } = tpcodesData;

    // console.log(tpcodesData );// tpcode + idpas
    // postcodeData
    // console.log( tpcodesData, "\n", postcodeData);


    let list = combinator(arr1, arr2, idpas, tpcode, arr3, arr4, postcodeData);
    let half = chunkArray(list, 810000)

    const jsonOutput1 = { "qty": half[0].length, "people": half[0] }; 
    const jsonOutput2 = { "qty": half[1].length, "people": half[1] }; 
    const jsonOutput3 = { "qty": half[2].length, "people": half[2] }; 
    const jsonOutput4 = { "qty": half[3].length, "people": half[3] }; 
    const jsonOutput5 = { "qty": half[4].length, "people": half[4] }; 
    const jsonOutput6 = { "qty": half[5].length, "people": half[5] }; 
    // const jsonOutput7 = { "qty": half[6].length, "people": half[6] }; 
    // const jsonOutput8 = { "qty": half[7].length, "people": half[7] }; 
    // const jsonOutput9 = { "qty": half[8].length, "people": half[8] }; 
    // const jsonOutput10 = { "qty": half[9].length, "people": half[9] }; 


    // console.log( 'jsonOutput', "\n", half, half.length);
    console.log( 'jsonOutput', "\n",  half.length);

    // for ( let i = 0; i < half.length; i++ ) {
      await fs.writeFile(outputFile1, JSON.stringify(jsonOutput1, null, 2)); 
      await fs.writeFile(outputFile2, JSON.stringify(jsonOutput2, null, 2)); 
      await fs.writeFile('people_sksvcz3.json', JSON.stringify(jsonOutput3, null, 2)); 
      await fs.writeFile('people_sksvcz4.json', JSON.stringify(jsonOutput4, null, 2)); 
      await fs.writeFile('people_sksvcz5.json', JSON.stringify(jsonOutput5, null, 2)); 
      await fs.writeFile('people_sksvcz6.json', JSON.stringify(jsonOutput6, null, 2)); 
      // await fs.writeFile('people_sksvcz7.json', JSON.stringify(jsonOutput7, null, 2)); 
      // await fs.writeFile('people_sksvcz8.json', JSON.stringify(jsonOutput8, null, 2)); 
      // await fs.writeFile('people_ua9.json', JSON.stringify(jsonOutput9, null, 2)); 
      // await fs.writeFile('people_ua10.json', JSON.stringify(jsonOutput10, null, 2)); 

    // }

    // await fs.writeFile(outputFile1, JSON.stringify(jsonOutput1, null, 2)); 
    // await fs.writeFile(outputFile2, JSON.stringify(jsonOutput2, null, 2)); 


  } catch (err) {
    console.error('Error processing file:', err);
  }
}

// Example usage:
// const filePaths = [
//   './male-ukranian-names.txt', 
//   './lastname-ukranian.txt'
// ];
// const filePaths = [
//   './all-name-cr.txt', 
//   './lastname-cr.txt',
//   './addresses.txt',
//   './cities.txt'
// ];
// const filePaths = [
//   './all-name-ua.txt', 
//   './lastname-ua.txt',
//   './addresses.txt',
//   './cities.txt'
// ];

const filePaths = [
  './names-sksvcz.txt', 
  './surename-sksvcz.txt',
  './addresses.txt',
  './cities.txt'
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

function combinator(arr1, arr2, idpas, tpcodes, street, locality, pcode) {
    let res = [];
    let tpIndex = 0;
    for(let i = 0; i < arr1.length; i++){
        for(let k = 0; k < arr2.length; k++){
            res.push({ name: `${arr1[i].trim()} ${arr2[k].trim()}`, 
                       tpcode: idpas[tpIndex % idpas.length], 
                       birthday: getRandomDate('1930-01-01', '2023-12-31'),
                       idpas: tpcodes[tpIndex % tpcodes.length],
                       addres: street[tpIndex % street.length].trim() + ` ` + generateRandomTwoDigitNumber(), 
                       city: locality[tpIndex % locality.length],
                       postcode: pcode[tpIndex % pcode.length],
            });
            tpIndex++;
        }
    }
    return res;
}

// Send request
async function fetchCodesPassAndTP() {
  try {
    // const response = await axios.get('http://localhost:3000/api/generate?name=string&age=number&date=unix', { params });
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=8', { params });
    // const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=7&qty=1480000&type=codes') // cr
    const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=7&qty=12668229&type=codes') // ua
    
    // console.log('fetchCodesPassAndTP:', response.data);
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

// async function fetchTpCode() {
//   try {
//     const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=10&qty=1480000")
//     return response.data;

//   } catch (error) {
//     if (error.response) {
//       console.error('Error Response:', error.response.status, error.response.data);
//     } else if (error.request) {
//       console.error('No Response Received:', error.message);
//     } else {
//       console.error('Request Setup Error:', error.message);
//     }
//   }
// }

async function fetchPostCode() {
  try {
    // const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=5&qty=1480000")
    const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=7&qty=89990&type=codes")
    
    // console.log('fetchPostCode::', response.data);
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

function generateRandomTwoDigitNumber() {
  return Math.floor(Math.random() * 90) + 10;
}

function getRandomDate(startDate, endDate) {
  const start = new Date(startDate).getTime();
  const end = new Date(endDate).getTime();
  const randomTimestamp = Math.random() * (end - start) + start;
  const randomDate = new Date(randomTimestamp);

  return randomDate.toISOString().split('T')[0]; // Extract date in YYYY-MM-DD format
}



readAndCombineFiles(filePaths);
handleFile('tmp_full_names.json', 'people_sksvcz.json', 'people_sksvcz2.json');
// handleFile('tmp_full_names.json', 'people_ua.json', 'people_ua2.json');
// handleFile('tmp_full_names.json', 'people_cr.json');

// from https://github.com/mykola-telychko/assistant-js/blob/main/fn-array.js
const chunkArray = (arr, size) => 
  arr.reduce(
    (acc, _, i) => (
      i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []
  );
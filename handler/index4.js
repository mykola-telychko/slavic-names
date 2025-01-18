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

async function handleFile(inputFile, outputFile) {
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
    const [tpcodesData] = await Promise.all([
      fetchCodesPassAndTP(),
    ]);

    // const { postcode } = postcodeData;
    // const { idpas, tpcode, postcode } = tpcodesData;
    // const { idpas, tpcode } = tpcodesData;

    // console.log(tpcodesData );// tpcode + idpas
    // postcodeData
    console.log( tpcodesData);


    // let list = combinator(arr1, arr2, idpas, tpcode, arr3, arr4, postcode);
    // const jsonOutput = { "qty": list.length, "people": list }; 

    // await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 

  } catch (err) {
    console.error('Error processing file:', err);
  }
}

// Example usage:
// const filePaths = [
//   './male-ukranian-names.txt', 
//   './lastname-ukranian.txt'
// ];
const filePaths = [
  './all-name-cr.txt', 
  './lastname-cr.txt',
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
                       idpas: tpcodes[tpIndex % tpcodes.length],
                       addres: street[tpIndex % street.length], 
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
    // const response = await axios.get("http://localhost:3000/api/generate?number=integer&numlen=7&qty=2000000&type=idpass")
    const response = await axios.get('http://localhost:3000/api/generate?number=integer&numlen=7&qty=1480000&type=codes')
    
    
    console.log('fetchCodesPassAndTP:', response.data);
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

async function fetchTpCode() {
  try {
    const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=10&qty=1480000")
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

async function fetchPostCode() {
  try {
    // const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=5&qty=1480000")
    const response = await axios.get("http://localhost:3001/api/generate?number=integer&numlen=7&qty=1480000&type=codes")
    
    console.log('fetchPostCode::', response.data);
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
handleFile('tmp_full_names.json', 'people_cr.json');
// fetchIdPas('ua_names.json', 'people.json')
//         .then(async (tpcodes) => {
//         let list = combinator(arr1, arr2, tpcodes);
//         const jsonOutput = { "people": list }; 
//         await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2));
//         })
//         .catch(error => {
//         console.error("Promise rejected:", error);
//         });
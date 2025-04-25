const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    // const cleanArray = data.split('\n').map(item => item.trim());
    // const filteredArray = cleanArray.filter(item => item !== '');
    // const filRes  = uniqueElArray(filteredArray);
    // const res = replaceStreets(filRes);
    // const jsonOutput = { "cities": filRes }; 
    let list = JSON.parse(data).list;
    // let chuki = chunkArray(list, 2000000); // -- 
    let chuki = chunkArray(list, 1800000); // ++
    let chukiCount = chuki.length;
    let fileNameList = generateChunkNames(chukiCount);

    for ( let i = 0; i < fileNameList.length; i++ ) {

      // console.log( fileNameList[i], chuki[i]);// 
      // console.log( i );// 

      await fs.writeFile(fileNameList[i], 
        JSON.stringify({"qty": chuki[i].length, "list": chuki[i]}, null, 2)
      ); 
      // node chunk-reader.js > txt.txt
    }
    // console.log( list.length);// 6191130
    // await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File !');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

// const inputFile = 'all-name-cr.txt';
// const outputFile = 'cr_names.json'; 
const inputFile = 'cz_ua_allcomb.json';
const outputFile = 'cts.txt'; 

processFile(inputFile, outputFile);

// from https://github.com/mykola-telychko/assistant-js/blob/main/fn-array.js
const chunkArray = (arr, size) => 
  arr.reduce(
    (acc, _, i) => (
      i % size === 0 ? [...acc, arr.slice(i, i + size)] : acc), []
);

function generateChunkNames(count) {
  if (!Number.isInteger(count) || count < 1) {
    throw new Error('Count must be a positive integer.');
  }
  // Створення масиву для зберігання імен чанків
  const chunkNames = [];
  for (let i = 1; i <= count; i++) {
    // chunkNames.push(`chunk_${i}`);
    chunkNames.push(`cz_ua_chunk_${i}.json`);
  }
  return chunkNames;
}

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
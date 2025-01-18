const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const cleanArray = data.split('\n').map(item => item.trim());
    const filteredArray = cleanArray.filter(item => item !== '');
    const filRes  = uniqueElArray(filteredArray);
    // const res = replaceStreets(filRes);
    const jsonOutput = { "cities": filRes }; 
    // console.log(jsonOutput);

    await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File !');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

// const inputFile = 'all-name-cr.txt';
// const outputFile = 'cr_names.json'; 
const inputFile = 'cities.txt';
const outputFile = 'cts.txt'; 

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

// function replaceStreets(streets) {
//   const streetPrefixes = ['пров.', 'пр.', 'вул.', 'пл.'];

//   return streets.map(street => {
//     const prefix = streetPrefixes.find(prefix => street.endsWith(prefix));
//     if (prefix) {
//       return prefix + ' ' + street.slice(0, -prefix.length);
//     }
//     return street;
//   });
// }
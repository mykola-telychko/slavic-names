const fs = require('fs').promises;

async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    const cleanArray = data.split('\n').map(item => item.trim());
    // console.log(cleanArray.length);

    const filteredArray = cleanArray.filter(item => item !== '');
    const filRes  = uniqueElArray(filteredArray);
    // const res = replaceStreets(filRes);
    // const jsonOutput = { "cities": filRes }; 
    // - sort / words that end in vowels. most likely female names.
    const jsonOutput = sortOnLastChar(filRes)


    await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    console.log('File !');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}

// const inputFile = 'all-name-cr.txt';
// const outputFile = 'cr_names.json'; 
const inputFile = 'tmpcr.txt';
const outputFile = 'croatia.txt'; 

processFile(inputFile, outputFile);

// assistant-js
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


// sort on last char // add rule. words that end in vowels
const arr = ['Nastja', 'Nasuf', 'Natan', 'Natanael', 'Natan'];

function sortOnLastChar(arr){
 return arr.sort((a, b) => {
    const lastA = a.charAt(a.length - 1);
    const lastB = b.charAt(b.length - 1);
  
    if (lastA < lastB) {
      return -1;
    }
    if (lastA > lastB) {
      return 1;
    }
    return 0;
  });
}
// console.log(arr); 
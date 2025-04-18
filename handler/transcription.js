const fs = require('fs').promises;
const path = require('path');
const { unorm } = require('unorm');

const translitMap = {
    'А': 'A', 'а': 'a',
    'Б': 'B', 'б': 'b',
    'В': 'V', 'в': 'v',
    'Г': 'H', 'г': 'h',
    'Ґ': 'G', 'ґ': 'g',
    'Д': 'D', 'д': 'd',
    'Е': 'E', 'е': 'e',
    'Є': 'Ye', 'є': 'ie',
    'Ж': 'Zh', 'ж': 'zh',
    'З': 'Z', 'з': 'z',
    'И': 'Y', 'и': 'y',
    'І': 'I', 'і': 'i',
    'Ї': 'Yi', 'ї': 'i',
    'Й': 'Y', 'й': 'i',
    'К': 'K', 'к': 'k',
    'Л': 'L', 'л': 'l',
    'М': 'M', 'м': 'm',
    'Н': 'N', 'н': 'n',
    'О': 'O', 'о': 'o',
    'П': 'P', 'п': 'p',
    'Р': 'R', 'р': 'r',
    'С': 'S', 'с': 's',
    'Т': 'T', 'т': 't',
    'У': 'U', 'у': 'u',
    'Ф': 'F', 'ф': 'f',
    'Х': 'Kh', 'х': 'kh',
    'Ц': 'Ts', 'ц': 'ts',
    'Ч': 'Ch', 'ч': 'ch',
    'Ш': 'Sh', 'ш': 'sh',
    'Щ': 'Shch', 'щ': 'shch',
    'Ю': 'Yu', 'ю': 'iu',
    'Я': 'Ya', 'я': 'ia',
    'Ь': '', 'ь': '',
    'Ъ': '', 'ъ': '',
    '’': '', 'ʼ': '', "'": ''
};

function transliterate(name) { return name.split('').map(char => translitMap[char] || char).join(''); }

// Припустимо, що у вас є масив українських імен `ukrainianNames`
async function processFile(inputFile, outputFile) {
  try {
    const data = await fs.readFile(inputFile, 'utf8');
    // const data =  fs.readFile(inputFile, 'utf8', console.log);
    const cleanArray = data.split('\n').map(item => item.trim());
    const filteredArray = cleanArray.filter(item => item !== '');
    const filRes  = uniqueElArray(filteredArray);
    const latinNamesSimple = filRes.map(name => transliterate(name.trim())).filter(name => name);

    // console.log('processFile', jsonOutput.length);
    const csvPath = path.join(__dirname, 'ukrainian_names_latin.csv'); // Шлях до файлу CSV
    const csvContent =  latinNamesSimple.map(name => `${name}\n`).join('');

    // await fs.writeFile(outputFile, JSON.stringify(jsonOutput, null, 2)); 
    await fs.writeFile(csvPath, csvContent, { encoding: 'utf-8' }); 

    console.log('File !');
  } catch (err) {
    console.error('Error processing file:', err);
  }
}
const inputFile = 'lastname-bl.txt';
const outputFile = 'ua-n.txt'; 

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
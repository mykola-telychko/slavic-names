const fs = require('fs');

function generateNumberCodes(qtyCharInCode, qtyElements) {
  const characters = '0123456789'; // Використовуємо лише цифри
  const results = [];

  for (let i = 0; i < qtyElements; i++) {
    let code = '';
    for (let j = 0; j < qtyCharInCode; j++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      code += characters[randomIndex];
    }
    results.push(code);
  }

  return results;
}

function writeToFile(codes, filename) {
//   const data = codes.join('\n'); 

  fs.writeFileSync(filename, codes, 'utf8');
  console.log(`Codes written to ${filename}`);
}

try {
      const qtyCharInCode = 5; 
    //   const qtyElements = 41000000; 
    // const qtyCharInCode = 10; 
    const qtyElements = 41000000; 

    const codes = generateNumberCodes(qtyCharInCode, qtyElements);
    //   writeToFile(codes, 'number_codes.txt');
    // console.log(`Codes: ${codes}`, typeof codes, Array.isArray(codes));

    writeToFile(JSON.stringify({tqy: codes.length, "items": codes}), 'number_codes.json');

} catch (error) {
  console.error("Error:", error.message);
}
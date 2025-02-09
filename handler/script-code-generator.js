const fs = require('fs');

function generateCode(qtyCharInCode, qtyElements) {
//   const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

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
  const data = codes.join('\n'); 
  fs.writeFileSync(filename, data, 'utf8');
  console.log(`Codes written to ${filename}`);
}

try {
  const qtyCharInCode = 10; 
  const qtyElements = 10000; 
  const codes = generateCode(qtyCharInCode, qtyElements);
  writeToFile(codes, 'codes.txt');
} catch (error) {
  console.error("Error:", error.message);
}
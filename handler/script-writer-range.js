const fs = require('fs');

function setRangeNumbers(start, end) {
  if (start > end) {
    throw new Error("Start value must be less than or equal to end value.");
  }
  return Array.from({ length: end - start + 1 }, (_, i) => start + i);
}

function writeToFile(numbers, filename) {
  const data = numbers.join(", ");
  fs.writeFileSync(filename, data, "utf8");
  console.log(`Numbers written to ${filename}`);
}

try {
  const numbers = setRangeNumbers(0, 41000000);
  writeToFile(numbers, "numbers.txt");
} catch (error) {
  console.error("Error:", error.message);
}
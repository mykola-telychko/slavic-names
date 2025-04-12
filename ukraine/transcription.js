const fs = require('fs');
const path = require('path');
const { unorm } = require('unorm');

// Мапа для транслітерації українських літер у латинку (спрощений варіант)
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

function transliterate(name) {
    return name.split('').map(char => translitMap[char] || char).join('');
}

// Припустимо, що у вас є масив українських імен `ukrainianNames`
const ukrainianNames = ["Іван", "Петро", "Марія", "Софія", "Андрій", "Олена", "Юрій", "Яна", "Ганна", "Ілля"];

const latinNamesSimple = ukrainianNames.map(name => transliterate(name.trim())).filter(name => name);

// Зберігаємо в CSV
const csvPath = path.join(__dirname, 'ukrainian_names_latin.csv'); // Шлях до файлу CSV
const csvContent = "Latin Name\n" + latinNamesSimple.map(name => `${name}\n`).join('');

fs.writeFileSync(csvPath, csvContent, { encoding: 'utf-8' });

console.log(`CSV файл збережено за шляхом: ${csvPath}`);
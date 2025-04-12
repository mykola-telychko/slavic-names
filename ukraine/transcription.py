# Якщо бібліотека `unidecode` недоступна, зробимо базову транслітерацію вручну (спрощений варіант)
# Мапа для транслітерації українських літер у латинку
translit_map = {
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
}

def transliterate(name):
    return ''.join(translit_map.get(char, char) for char in name)

latin_names_simple = [transliterate(name.strip()) for name in ukrainian_names if name.strip()]

# Зберігаємо в CSV
csv_path = "/mnt/data/ukrainian_names_latin.csv"
with open(csv_path, mode="w", newline='', encoding="utf-8") as file:
    writer = csv.writer(file)
    writer.writerow(["Latin Name"])
    for name in latin_names_simple:
        writer.writerow([name])

csv_path

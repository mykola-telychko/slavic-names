# 🧭 slavic-names

> Collection and generation of Slavic names categorized by region.  
> Includes API access, JSON data generation, and Cyrillic transliteration support.

🔗 **API Example:**  
[`https://data-rand-generator.vercel.app/api/list?people=ua`](https://data-rand-generator.vercel.app/api/list?people=ua)

---

## 🌍 Regions Covered

### East Slavic
- 🇺🇦 Ukraine
- 🇧🇾 Belarus

### West Slavic
- 🇵🇱 Poland
- 🇨🇿 Czech Republic
- 🇸🇰 Slovakia

### South Slavic
- 🇧🇬 Bulgaria
- 🇭🇷 Croatia
- 🇧🇦 Bosnia and Herzegovina
- 🇲🇪 Montenegro
- 🇲🇰 North Macedonia
- 🇷🇸 Serbia
- 🇸🇮 Slovenia

---

## 📦 Features

- 📋 Lists of male & female names by Slavic region
- 🔤 Transliteration for Ukrainian (Cyrillic → Latin)
- ⚠️ Duplicate warning system in name generator
- 📄 Exportable large JSON datasets per region
- 🛠️ Custom `HANDLER.js` to generate full `bigJSON` output

---

## 🧪 API Usage

```bash
GET /api/list?people=ua

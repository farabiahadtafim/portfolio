const fs = require('fs');

const newLabels = [
  { brand: "WOLVES", product: "PINK DRAGON ENERGY" },
  { brand: "CHUG", product: "PARTY PUNCH (LEMONADE, FRUIT PUNCH, WATERMELON LEMONADE)" },
  { brand: "PERSEUS", product: "PERSEUS" },
  { brand: "level", product: "CURB THE CURVE INFUSED WITH LEMON & GINGER" },
  { brand: "LIL POP", product: "CREAM SODA, LEMON SQZ, GINGER, LYCHEE" },
  { brand: "BROTHER BEANS COFFEE", product: "COLD BREW COFFEE BLACK" },
  { brand: "VODN", product: "Pineapple Peach Premium Vodka Seltzer" },
  { brand: "CHUG", product: "PARTY PUNCH (FRUIT PUNCH, LEMONADE, WATERMELON LEMONADE)" },
  { brand: "BOW", product: "RAINBOW BEER" },
  { brand: "HQD", product: "KING OF TASTE" },
  { brand: "DAWN", product: "COCO AZURE ENERGY DRINK" },
  { brand: "FOREPLAY", product: "HARD SELTZER PINEAPPLE" },
  { brand: "WOLVES ENERGY", product: "PINK DRAGON" },
  { brand: "MOROUNA", product: "Heavy Activity Drink MINT" },
  { brand: "Witch's Water", product: "KEY LIME High Seltzer" }
];

let data = fs.readFileSync('src/data/canLabelProjects.ts', 'utf8');

// The file has objects like: "brand": "Can Brand X", "product": "Can Product X"
// Let's replace the first 15

for (let i = 0; i < newLabels.length; i++) {
  const brandRegex = new RegExp(`"brand":\\s*"Can Brand ${i + 1}"`, 'g');
  const productRegex = new RegExp(`"product":\\s*"Can Product ${i + 1}"`, 'g');
  
  data = data.replace(brandRegex, `"brand": "${newLabels[i].brand}"`);
  data = data.replace(productRegex, `"product": "${newLabels[i].product}"`);
}

fs.writeFileSync('src/data/canLabelProjects.ts', data);
console.log('Updated first 15 labels in canLabelProjects.ts');

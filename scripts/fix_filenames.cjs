const fs = require('fs');
let data = fs.readFileSync('src/data/canLabelProjects.ts', 'utf8');
data = data.replace(/Can Label Design_Artboard (\d+)\.webp/g, (match, p1) => {
  if (p1 === '100') return `Can label Design-100.webp`;
  return `Can label Design-${p1.padStart(2, '0')}.webp`;
});
fs.writeFileSync('src/data/canLabelProjects.ts', data);
console.log('Fixed filenames in canLabelProjects.ts');

const fs = require('fs');
const path = require('path');

const file = path.join(__dirname, 'src/data/missions.js');
let content = fs.readFileSync(file, 'utf8');

// Remove icons in ACHIEVEMENTS
content = content.replace(/icon:\s*'[^']+',?\s*/g, '');

// Remove icon in MISSIONS
content = content.replace(/icon:\s*'[^']+',?\s*/g, '');

// Rename indicators
content = content.replace(/research:/g, 'innovation:');
content = content.replace(/budget:/g, 'strategy:');
content = content.replace(/trust:/g, 'publicHealth:');
content = content.replace(/production:/g, 'collaboration:');
// economy is already economy. 
// We need to add risk to the indicators.
content = content.replace(/economy:\s*(-?\d+)\s*\}/g, 'economy: $1, risk: 10 }');

// Update assignTitles logic
content = content.replace(/'research'/g, "'innovation'");
content = content.replace(/'trust'/g, "'publicHealth'");
content = content.replace(/'production'/g, "'collaboration'");
// Update balanced decision maker vals
content = content.replace(/s\.research \|\| 0, s\.budget \|\| 0, s\.trust \|\| 0, s\.production \|\| 0, s\.economy \|\| 0/g, 's.innovation || 0, s.strategy || 0, s.collaboration || 0, s.risk || 0, s.publicHealth || 0, s.economy || 0');

fs.writeFileSync(file, content);
console.log('Done transforming missions.js');

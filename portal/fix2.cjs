const fs = require('fs');
const path = require('path');

function walk(dir) {
  let results = [];
  const list = fs.readdirSync(dir);
  list.forEach(function(file) {
    file = path.join(dir, file);
    const stat = fs.statSync(file);
    if (stat && stat.isDirectory() && !file.includes('node_modules') && !file.includes('dist')) { 
      results = results.concat(walk(file));
    } else { 
      if (file.endsWith('.ts') || file.endsWith('.tsx') || file.endsWith('.js') || file.endsWith('.jsx')) results.push(file);
    }
  });
  return results;
}

const files = walk('D:\\projects\\elo-organico\\portal');
files.forEach(file => {
  const content = fs.readFileSync(file, 'utf8');
  if (content.includes('portalof')) {
    fs.writeFileSync(file, content.replace(/portalof/g, 'instanceof'), 'utf8');
    console.log('Fixed portalof in', file);
  }
});

const fs = require('fs');
const path = require('path');

const rootDir = process.cwd();

function hydrate(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });

  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);

    if (entry.isDirectory()) {
      hydrate(fullPath);
      continue;
    }

    if (entry.name.endsWith('-replace.txt')) {
      const sourceRelPath = fs.readFileSync(fullPath, 'utf8').trim();
      const targetName = entry.name.replace('-replace.txt', '.md');
      const targetPath = path.join(dir, targetName);
      
      let sourcePath = path.resolve(dir, sourceRelPath);

      // Fallback: If not found in current project, check neighboring "tommy-style" directory
      if (!fs.existsSync(sourcePath)) {
        const neighboringTommyPath = path.resolve(sourcePath, '../../tommy-style', path.basename(sourcePath));
        if (fs.existsSync(neighboringTommyPath)) {
          sourcePath = neighboringTommyPath;
        }
      }

      if (fs.existsSync(sourcePath)) {
        fs.copyFileSync(sourcePath, targetPath);
        console.log(`Hydrated: ${targetPath}`);
        fs.unlinkSync(fullPath);
        console.log(`Deleted: ${fullPath}`);
      } else {
        console.error(`Source not found: ${sourcePath}`);
      }
    }
  }
}

console.log(`Starting hydration in ${rootDir}...`);
hydrate(rootDir);
console.log('Done.');

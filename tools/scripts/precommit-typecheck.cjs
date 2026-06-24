const { execSync } = require('child_process');
const path = require('path');

// 1. Get list of staged files
let stagedFiles = [];
try {
  const output = execSync('git diff --cached --name-only', { encoding: 'utf8' });
  stagedFiles = output.split('\n').map(f => f.trim()).filter(Boolean);
} catch (err) {
  console.error('Error getting staged files:', err);
  process.exit(1);
}

if (stagedFiles.length === 0) {
  console.log('No staged files found.');
  process.exit(0);
}

// 2. Check if any TypeScript/JavaScript files are modified
const codeFileExtensions = ['.ts', '.tsx', '.js', '.jsx', '.cts', '.mts', '.cjs', '.mjs'];
const hasCodeChanges = stagedFiles.some(file => {
  const ext = path.extname(file).toLowerCase();
  return codeFileExtensions.includes(ext);
});

if (!hasCodeChanges) {
  console.log('No TypeScript or JavaScript file changes detected. Skipping typecheck.');
  process.exit(0);
}

// 3. Map changed files to workspaces/filters
const filters = new Set();
let runAll = false;

for (const file of stagedFiles) {
  const normalizedFile = file.replace(/\\/g, '/');

  if (!normalizedFile.includes('/')) {
    runAll = true;
    break;
  }

  const parts = normalizedFile.split('/');
  const rootDir = parts[0];

  if (rootDir === 'instance') {
    filters.add('--filter=@elo-instance/*');
  } else if (rootDir === 'studio') {
    filters.add('--filter=@elo-organico/studio');
  } else if (rootDir === 'tools') {
    filters.add('--filter=@elo-organico/tools');
  } else if (rootDir === 'knowledge-base') {
    filters.add('--filter=@elo-organico/knowledge-base');
  } else if (rootDir === 'portal') {
    continue;
  } else {
    runAll = true;
    break;
  }
}

let command = '';
if (runAll) {
  console.log('Global configuration or root changes detected. Running full typecheck (excluding portal)...');
  command = 'pnpm typecheck --filter=!@elo-portal/*';
} else if (filters.size > 0) {
  const filterList = Array.from(filters).join(' ');
  console.log(`Changes detected in specific workspaces. Running typecheck for: ${filterList}...`);
  command = `npx turbo run typecheck ${filterList}`;
} else {
  console.log('No typecheck required for changed files.');
  process.exit(0);
}

try {
  execSync(command, { stdio: 'inherit' });
} catch (err) {
  console.error(`Typecheck failed. Command exited with error.`);
  process.exit(1);
}

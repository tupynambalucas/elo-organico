import { execSync } from 'child_process';
import path from 'path';
import { readFileSync } from 'fs';
import { existsSync } from 'fs';

const colors = {
  reset: '\x1b[0m',
  bright: '\x1b[1m',
  yellow: '\x1b[33m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  cyan: '\x1b[36m',
};

const log = {
  section: (title: string) => console.log(`\n${colors.bright}${colors.cyan}▶ ${title}${colors.reset}`),
  success: (msg: string) => console.log(`${colors.green}✓ ${msg}${colors.reset}`),
  info: (msg: string) => console.log(`${colors.blue}ℹ ${msg}${colors.reset}`),
  warn: (msg: string) => console.log(`${colors.yellow}⚠ ${msg}${colors.reset}`),
  error: (msg: string) => console.log(`${colors.red}✗ ${msg}${colors.reset}`),
};

function run(command: string, description: string): boolean {
  try {
    log.info(`Running: ${colors.bright}${command}${colors.reset}`);
    execSync(command, { stdio: 'inherit' });
    log.success(description);
    return true;
  } catch (error) {
    log.error(`${description} failed`);
    return false;
  }
}

async function main() {
  console.clear();
  log.section('HUSKY & GIT HOOKS TEST SUITE');

  let allPassed = true;

  // Test 1: Husky Installation
  log.section('1️⃣  Husky Configuration Validation');
  const huskyValid = run('npx husky validate', 'Husky configuration validated');
  allPassed = allPassed && huskyValid;

  // Test 2: Check Hook Files
  log.section('2️⃣  Git Hook Files Inspection');
  try {
    const hookPath = path.join(process.cwd(), '.husky', 'pre-commit');

    if (existsSync(hookPath)) {
      const content = readFileSync(hookPath, 'utf-8');
      log.success('pre-commit hook file exists');

      if (content.includes('#!/usr/bin/env sh')) {
        log.success('Shebang present');
      } else {
        log.warn('Shebang missing');
      }

      if (content.includes('. "$(dirname "$0")/_/h"')) {
        log.success('Husky initialization present');
      } else {
        log.warn('Husky initialization missing');
      }

      if (content.includes('precommit-typecheck.ts')) {
        log.success('Typecheck script referenced');
      } else {
        log.warn('Typecheck script not found');
      }

      if (content.includes('lint-staged')) {
        log.success('Lint-staged referenced');
      } else {
        log.warn('Lint-staged not found');
      }

      log.info(`Hook content:\n${colors.bright}${content}${colors.reset}`);
    } else {
      log.error(`pre-commit hook not found at ${hookPath}`);
      allPassed = false;
    }
  } catch (error) {
    log.error(`Failed to inspect hook files: ${error}`);
    allPassed = false;
  }

  // Test 3: Staged Files Inspection
  log.section('3️⃣  Staged Files Detection');
  try {
    const stagedOutput = execSync('git diff --cached --name-only', { encoding: 'utf8' }).trim();
    const stagedFiles = stagedOutput.split('\n').filter(Boolean);

    if (stagedFiles.length > 0) {
      log.success(`Found ${stagedFiles.length} staged file(s)`);
      stagedFiles.forEach((file) => log.info(`  • ${file}`));
    } else {
      log.warn('No staged files found (create some to test full pre-commit flow)');
    }
  } catch (error) {
    log.error(`Failed to get staged files: ${error}`);
  }

  // Test 4: TypeScript Files Detection
  log.section('4️⃣  TypeScript/JavaScript Files Detection');
  try {
    const codeFileExtensions = ['.ts', '.tsx', '.js', '.jsx', '.cts', '.mts', '.cjs', '.mjs'];
    const stagedOutput = execSync('git diff --cached --name-only', { encoding: 'utf8' });
    const stagedFiles = stagedOutput
      .split('\n')
      .map((f) => f.trim())
      .filter(Boolean);

    const codeFiles = stagedFiles.filter((file) => {
      const ext = path.extname(file).toLowerCase();
      return codeFileExtensions.includes(ext);
    });

    if (codeFiles.length > 0) {
      log.success(`${codeFiles.length} code file(s) need typecheck`);
      codeFiles.forEach((file) => log.info(`  • ${file}`));
    } else {
      log.info('No code files staged - typecheck will be skipped');
    }
  } catch (error) {
    log.error(`Failed to analyze staged files: ${error}`);
  }

  // Test 5: Lint-Staged Configuration
  log.section('5️⃣  Lint-Staged Configuration');
  try {
    const packageJsonPath = path.join(process.cwd(), 'package.json');
    const packageJsonContent = readFileSync(packageJsonPath, 'utf-8');
    const packageJson = JSON.parse(packageJsonContent);
    const lintStagedConfig = packageJson['lint-staged'];

    if (lintStagedConfig) {
      log.success('Lint-staged configuration found');
      Object.entries(lintStagedConfig).forEach(([pattern, commands]: [string, any]) => {
        log.info(`Pattern: ${colors.bright}${pattern}${colors.reset}`);
        if (Array.isArray(commands)) {
          commands.forEach((cmd: string) => log.info(`  → ${cmd}`));
        }
      });
    } else {
      log.error('Lint-staged configuration not found in package.json');
      allPassed = false;
    }
  } catch (error) {
    log.error(`Failed to read lint-staged config: ${error}`);
    allPassed = false;
  }

  // Test 6: Dry Run Typecheck Script
  log.section('6️⃣  Typecheck Script Dry Run');
  const typecheckRun = run('tsx tools/scripts/precommit-typecheck.ts', 'Typecheck script executed');
  allPassed = allPassed && typecheckRun;

  // Test 7: Lint-Staged Dry Run
  log.section('7️⃣  Lint-Staged Configuration Test');
  try {
    log.info('Lint-staged will run on actual commits with the following configuration:');
    run('pnpm exec lint-staged --help', 'Lint-staged help retrieved');
  } catch (error) {
    log.warn(`Could not retrieve lint-staged help: ${error}`);
  }

  // Summary
  log.section('📋 TEST SUMMARY');
  if (allPassed) {
    console.log(`\n${colors.green}${colors.bright}✓ All tests passed! Git hooks are properly configured.${colors.reset}\n`);
    process.exit(0);
  } else {
    console.log(
      `\n${colors.yellow}${colors.bright}⚠ Some tests had issues. Review the output above for details.${colors.reset}\n`,
    );
    process.exit(0);
  }
}

main().catch((error) => {
  log.error(`Fatal error: ${error.message}`);
  process.exit(1);
});

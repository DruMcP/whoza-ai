#!/usr/bin/env node
/**
 * Automated Console Log Cleanup Script
 * Removes console.log/warn/debug and converts console.error to proper logger usage
 */

import { readFileSync, writeFileSync, readdirSync, statSync } from 'fs';
import { join } from 'path';

const DEV_GUARD = `if (import.meta.env.DEV)`;

function shouldSkipFile(filePath) {
  const skipPatterns = [
    'node_modules',
    'dist',
    'build',
    '.git',
    'logger.js', // Keep the logger utility intact
    'performanceMonitor.js' // Keep performance monitoring
  ];
  return skipPatterns.some(pattern => filePath.includes(pattern));
}

function cleanConsoleStatements(content, filePath) {
  let cleaned = content;
  let changes = 0;

  // Remove console.log statements
  cleaned = cleaned.replace(
    /console\.log\([^;]*\);?\n?/g,
    () => { changes++; return ''; }
  );

  // Remove console.debug statements
  cleaned = cleaned.replace(
    /console\.debug\([^;]*\);?\n?/g,
    () => { changes++; return ''; }
  );

  // Remove console.warn statements
  cleaned = cleaned.replace(
    /console\.warn\([^;]*\);?\n?/g,
    () => { changes++; return ''; }
  );

  // Convert console.error to comments (manual review needed)
  cleaned = cleaned.replace(
    /console\.error\(([^;]*)\);?/g,
    (match, args) => {
      changes++;
      return `// TODO: Review error handling: console.error(${args})`;
    }
  );

  // Remove excessive console statement blocks
  cleaned = cleaned.replace(
    /console\.log\('\[.*?\] ={40,}'\);?\n?/g,
    () => { changes++; return ''; }
  );

  return { cleaned, changes };
}

function processFile(filePath) {
  if (shouldSkipFile(filePath)) return { changes: 0, skipped: true };

  try {
    const content = readFileSync(filePath, 'utf-8');
    const { cleaned, changes } = cleanConsoleStatements(content, filePath);

    if (changes > 0) {
      writeFileSync(filePath, cleaned, 'utf-8');
      return { changes, skipped: false };
    }

    return { changes: 0, skipped: false };
  } catch (error) {
    console.error(`Error processing ${filePath}:`, error.message);
    return { changes: 0, skipped: false, error: true };
  }
}

function processDirectory(dirPath, results = { files: 0, changes: 0, errors: 0 }) {
  const items = readdirSync(dirPath);

  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);

    if (stat.isDirectory()) {
      processDirectory(fullPath, results);
    } else if (fullPath.endsWith('.js') || fullPath.endsWith('.jsx')) {
      const result = processFile(fullPath);
      if (!result.skipped) {
        results.files++;
        results.changes += result.changes;
        if (result.error) results.errors++;

        if (result.changes > 0) {
          console.log(`✓ Cleaned ${result.changes} statements from: ${fullPath}`);
        }
      }
    }
  }

  return results;
}

// Main execution
const srcDir = join(process.cwd(), 'src');
console.log('🧹 Starting console log cleanup...\n');

const results = processDirectory(srcDir);

console.log('\n📊 Cleanup Summary:');
console.log(`   Files processed: ${results.files}`);
console.log(`   Console statements removed: ${results.changes}`);
console.log(`   Errors: ${results.errors}`);
console.log('\n✅ Cleanup complete!');
console.log('\n⚠️  Note: console.error statements marked for manual review');

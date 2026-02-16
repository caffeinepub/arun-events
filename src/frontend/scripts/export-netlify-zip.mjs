#!/usr/bin/env node

/**
 * Netlify Export Script
 * Builds the production frontend and creates a reproducible ZIP archive
 * for manual Netlify deployment.
 */

import { createWriteStream, existsSync, rmSync, readFileSync } from 'fs';
import { join, dirname, relative } from 'path';
import { fileURLToPath } from 'url';
import { execSync } from 'child_process';
import archiver from 'archiver';
import { readdirSync, statSync } from 'fs';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const FRONTEND_ROOT = join(__dirname, '..');
const DIST_DIR = join(FRONTEND_ROOT, 'dist');
const OUTPUT_ZIP = join(FRONTEND_ROOT, 'netlify-dist.zip');

console.log('🚀 Starting Netlify export workflow...\n');

// Step 1: Clean previous export artifacts
if (existsSync(OUTPUT_ZIP)) {
  console.log('🧹 Cleaning previous export...');
  rmSync(OUTPUT_ZIP);
  console.log('✅ Previous ZIP removed\n');
}

// Step 2: Run production build
console.log('📦 Building production frontend...');
try {
  execSync('npm run build:skip-bindings', {
    cwd: FRONTEND_ROOT,
    stdio: 'inherit'
  });
  console.log('✅ Build completed\n');
} catch (error) {
  console.error('❌ Build failed:', error.message);
  process.exit(1);
}

// Step 3: Verify dist directory exists
if (!existsSync(DIST_DIR)) {
  console.error('❌ dist/ directory not found after build');
  process.exit(1);
}

// Step 4: Verify critical files
console.log('🔍 Verifying critical files...');
const criticalFiles = [
  'index.html',
  'googlecdab296682a0e0eb.html',
  '_redirects'
];

let allFilesPresent = true;
for (const file of criticalFiles) {
  const filePath = join(DIST_DIR, file);
  if (existsSync(filePath)) {
    console.log(`  ✅ ${file}`);
  } else {
    console.log(`  ❌ ${file} - MISSING`);
    allFilesPresent = false;
  }
}

if (!allFilesPresent) {
  console.error('\n❌ Critical files missing from build output');
  process.exit(1);
}

// Step 5: Verify Google Search Console meta tag
console.log('\n🔍 Verifying Google Search Console meta tag...');
const indexHtml = readFileSync(join(DIST_DIR, 'index.html'), 'utf-8');
const EXPECTED_CONTENT = 'vAyoYXts9Vr9bzcf09SiQ9oAHgC6Yd2WRJ-fdyxbOPA';
const META_TAG_PATTERN = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']\s*\/?>/gi;
const matches = [...indexHtml.matchAll(META_TAG_PATTERN)];

if (matches.length === 0 || matches[0][1] !== EXPECTED_CONTENT) {
  console.error('❌ Google Search Console verification tag missing or incorrect');
  process.exit(1);
}
console.log('✅ Google Search Console verification tag present\n');

// Step 6: Create ZIP archive
console.log('📦 Creating ZIP archive...');

const output = createWriteStream(OUTPUT_ZIP);
const archive = archiver('zip', {
  zlib: { level: 9 } // Maximum compression
});

output.on('close', () => {
  const sizeInMB = (archive.pointer() / 1024 / 1024).toFixed(2);
  console.log(`✅ ZIP created: ${relative(process.cwd(), OUTPUT_ZIP)}`);
  console.log(`   Size: ${sizeInMB} MB`);
  console.log(`   Files: ${archive.pointer()} bytes\n`);
  
  console.log('🎉 Export complete!\n');
  console.log('📋 Next steps:');
  console.log('   1. Go to https://app.netlify.com/');
  console.log('   2. Click "Add new site" → "Deploy manually"');
  console.log('   3. Drag and drop: frontend/netlify-dist.zip');
  console.log('   4. Your site will be live in seconds!\n');
  console.log('💡 Or extract the ZIP and drag the contents (not the ZIP itself)');
});

archive.on('error', (err) => {
  console.error('❌ ZIP creation failed:', err);
  process.exit(1);
});

archive.pipe(output);

// Add all files from dist/ to the ZIP root
function addDirectoryToArchive(dirPath, archivePath = '') {
  const items = readdirSync(dirPath);
  
  for (const item of items) {
    const fullPath = join(dirPath, item);
    const stat = statSync(fullPath);
    const archiveItemPath = archivePath ? join(archivePath, item) : item;
    
    if (stat.isDirectory()) {
      addDirectoryToArchive(fullPath, archiveItemPath);
    } else {
      archive.file(fullPath, { name: archiveItemPath });
    }
  }
}

addDirectoryToArchive(DIST_DIR);
archive.finalize();

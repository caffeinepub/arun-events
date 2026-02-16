#!/usr/bin/env node

/**
 * Verification script for Google Search Console meta tag and Netlify deployment requirements
 * Checks that:
 * - The verification meta tag exists in both source and built HTML
 * - The Google HTML verification file is present in dist/
 * - SPA routing support files are present (_redirects and/or netlify.toml)
 */

import { readFileSync, existsSync } from 'fs';
import { join, dirname } from 'path';
import { fileURLToPath } from 'url';

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const EXPECTED_CONTENT = 'vAyoYXts9Vr9bzcf09SiQ9oAHgC6Yd2WRJ-fdyxbOPA';
const META_TAG_PATTERN = /<meta\s+name=["']google-site-verification["']\s+content=["']([^"']+)["']\s*\/?>/gi;

function checkFile(filePath, label) {
  if (!existsSync(filePath)) {
    console.log(`⚠️  ${label} not found: ${filePath}`);
    return false;
  }

  const content = readFileSync(filePath, 'utf-8');
  const matches = [...content.matchAll(META_TAG_PATTERN)];

  if (matches.length === 0) {
    console.log(`❌ ${label}: No google-site-verification meta tag found`);
    return false;
  }

  if (matches.length > 1) {
    console.log(`⚠️  ${label}: Multiple google-site-verification tags found (${matches.length})`);
  }

  const foundContent = matches[0][1];
  if (foundContent !== EXPECTED_CONTENT) {
    console.log(`❌ ${label}: Wrong verification content`);
    console.log(`   Expected: ${EXPECTED_CONTENT}`);
    console.log(`   Found: ${foundContent}`);
    return false;
  }

  console.log(`✅ ${label}: Verification tag correct`);
  return true;
}

function checkFileExists(filePath, label) {
  if (existsSync(filePath)) {
    console.log(`✅ ${label}: Present`);
    return true;
  } else {
    console.log(`❌ ${label}: Missing`);
    return false;
  }
}

console.log('🔍 Verifying Google Search Console meta tag and Netlify requirements...\n');

// Check source file
const sourceHtml = join(__dirname, '..', 'index.html');
const sourceOk = checkFile(sourceHtml, 'Source HTML (index.html)');

// Check built file (if exists)
const distHtml = join(__dirname, '..', 'dist', 'index.html');
const distExists = existsSync(distHtml);

let allChecksPass = sourceOk;

if (distExists) {
  console.log('');
  const distOk = checkFile(distHtml, 'Built HTML (dist/index.html)');
  
  // Check Google HTML verification file in dist
  console.log('');
  const googleHtmlFile = join(__dirname, '..', 'dist', 'googlecdab296682a0e0eb.html');
  const googleHtmlOk = checkFileExists(googleHtmlFile, 'Google HTML verification file (dist/googlecdab296682a0e0eb.html)');
  
  // Check SPA routing support files
  console.log('');
  const redirectsFile = join(__dirname, '..', 'dist', '_redirects');
  const redirectsOk = checkFileExists(redirectsFile, 'SPA routing file (dist/_redirects)');
  
  const netlifyToml = join(__dirname, '..', 'netlify.toml');
  const netlifyTomlOk = checkFileExists(netlifyToml, 'Netlify config (netlify.toml)');
  
  allChecksPass = distOk && googleHtmlOk && redirectsOk && netlifyTomlOk;
  
  if (allChecksPass) {
    console.log('\n✅ All checks passed! Ready for Netlify deployment.');
    process.exit(0);
  } else {
    console.log('\n❌ Verification failed. Please fix the issues above.');
    process.exit(1);
  }
} else {
  console.log('\nℹ️  Built HTML not found (run `npm run build` first)');
  
  if (sourceOk) {
    console.log('✅ Source HTML is correct. Build to verify output.');
    process.exit(0);
  } else {
    console.log('❌ Source HTML verification failed.');
    process.exit(1);
  }
}

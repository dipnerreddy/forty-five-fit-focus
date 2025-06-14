
// Build verification script
// Run this before deploying to ensure everything is configured correctly

const fs = require('fs');
const path = require('path');

console.log('🔍 Checking build configuration...');

// Check if package.json has correct build script
const packagePath = path.join(__dirname, 'package.json');
if (fs.existsSync(packagePath)) {
  const pkg = JSON.parse(fs.readFileSync(packagePath, 'utf8'));
  
  if (pkg.scripts && pkg.scripts.build) {
    console.log('✅ Build script found:', pkg.scripts.build);
  } else {
    console.log('❌ Build script missing in package.json');
    console.log('Please ensure you have: "build": "vite build"');
  }
  
  if (pkg.scripts && pkg.scripts.preview) {
    console.log('✅ Preview script found:', pkg.scripts.preview);
  } else {
    console.log('⚠️  Preview script missing. Add: "preview": "vite preview"');
  }
} else {
  console.log('❌ package.json not found');
}

// Check if dist directory exists (after build)
const distPath = path.join(__dirname, 'dist');
if (fs.existsSync(distPath)) {
  console.log('✅ dist directory exists');
  
  // Check for index.html
  const indexPath = path.join(distPath, 'index.html');
  if (fs.existsSync(indexPath)) {
    console.log('✅ index.html found in dist');
  } else {
    console.log('❌ index.html missing in dist directory');
  }
} else {
  console.log('⚠️  dist directory not found (run build first)');
}

console.log('\n📋 Pre-deployment checklist:');
console.log('1. Run "npm run build" to create production build');
console.log('2. Run "npm run preview" to test the build locally');
console.log('3. Ensure all environment variables are set in Vercel');
console.log('4. Deploy to Vercel');

console.log('\n🔧 Vercel deployment steps:');
console.log('1. Install Vercel CLI: npm i -g vercel');
console.log('2. Login: vercel login');
console.log('3. Deploy: vercel --prod');

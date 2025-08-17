const { exec } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🔍 BookVault Setup Verification');
console.log('===============================\n');

// Check if required directories exist
const requiredDirs = ['Backend', 'Frontend'];
const requiredFiles = {
  'Backend': ['package.json', 'index.js', 'config.js'],
  'Frontend': ['package.json', 'src/App.jsx', 'src/main.jsx']
};

console.log('📁 Checking project structure...');
let structureOk = true;

requiredDirs.forEach(dir => {
  if (!fs.existsSync(dir)) {
    console.log(`❌ Missing directory: ${dir}`);
    structureOk = false;
  } else {
    console.log(`✅ Found directory: ${dir}`);
    
    // Check required files in each directory
    requiredFiles[dir].forEach(file => {
      const filePath = path.join(dir, file);
      if (!fs.existsSync(filePath)) {
        console.log(`❌ Missing file: ${filePath}`);
        structureOk = false;
      } else {
        console.log(`✅ Found file: ${filePath}`);
      }
    });
  }
});

console.log('\n📦 Checking package.json files...');

// Check Backend package.json
try {
  const backendPackage = JSON.parse(fs.readFileSync('Backend/package.json', 'utf8'));
  console.log(`✅ Backend package.json: ${backendPackage.name} v${backendPackage.version}`);
  
  const requiredBackendDeps = ['express', 'mongoose', 'cors', 'jsonwebtoken', 'bcryptjs'];
  requiredBackendDeps.forEach(dep => {
    if (backendPackage.dependencies[dep]) {
      console.log(`✅ Backend dependency: ${dep}`);
    } else {
      console.log(`❌ Missing Backend dependency: ${dep}`);
      structureOk = false;
    }
  });
} catch (error) {
  console.log('❌ Error reading Backend package.json:', error.message);
  structureOk = false;
}

// Check Frontend package.json
try {
  const frontendPackage = JSON.parse(fs.readFileSync('Frontend/package.json', 'utf8'));
  console.log(`✅ Frontend package.json: ${frontendPackage.name} v${frontendPackage.version}`);
  
  const requiredFrontendDeps = ['react', 'react-dom', 'react-router-dom', 'axios'];
  requiredFrontendDeps.forEach(dep => {
    if (frontendPackage.dependencies[dep]) {
      console.log(`✅ Frontend dependency: ${dep}`);
    } else {
      console.log(`❌ Missing Frontend dependency: ${dep}`);
      structureOk = false;
    }
  });
} catch (error) {
  console.log('❌ Error reading Frontend package.json:', error.message);
  structureOk = false;
}

console.log('\n🔧 Checking configuration files...');

// Check Backend config
try {
  const backendConfig = fs.readFileSync('Backend/config.js', 'utf8');
  if (backendConfig.includes('MONGODB_URI') && backendConfig.includes('JWT_SECRET')) {
    console.log('✅ Backend config.js looks good');
  } else {
    console.log('❌ Backend config.js missing required configuration');
    structureOk = false;
  }
} catch (error) {
  console.log('❌ Error reading Backend config.js:', error.message);
  structureOk = false;
}

// Check Frontend configs
try {
  const tailwindConfig = fs.readFileSync('Frontend/tailwind.config.js', 'utf8');
  if (tailwindConfig.includes('daisyui')) {
    console.log('✅ Tailwind config with DaisyUI found');
  } else {
    console.log('❌ Tailwind config missing DaisyUI');
    structureOk = false;
  }
} catch (error) {
  console.log('❌ Error reading Tailwind config:', error.message);
  structureOk = false;
}

console.log('\n📋 Summary:');
if (structureOk) {
  console.log('🎉 All checks passed! Your BookVault project is properly set up.');
  console.log('\n🚀 To start the project:');
  console.log('1. Run: start-project.bat (Windows)');
  console.log('2. Or manually:');
  console.log('   - Backend: cd Backend && npm start');
  console.log('   - Frontend: cd Frontend && npm run dev');
} else {
  console.log('⚠️  Some issues were found. Please fix them before proceeding.');
  console.log('\n💡 Common fixes:');
  console.log('- Run npm install in both Backend and Frontend directories');
  console.log('- Check that all required files exist');
  console.log('- Verify package.json dependencies');
}

console.log('\n📚 Happy coding with BookVault!');

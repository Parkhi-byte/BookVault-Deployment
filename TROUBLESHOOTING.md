# BookVault Troubleshooting Guide

## 🚨 Common Issues and Solutions

### 1. Import/Module Resolution Errors

**Problem**: `Failed to resolve import "./components/AdminDashboard"`

**Solution**: 
- Ensure all component files exist in the correct locations
- Check file extensions (.jsx vs .js)
- Verify import paths are correct
- Run `npm install` in the Frontend directory

### 2. Backend Connection Issues

**Problem**: `Cannot connect to backend server`

**Solutions**:
- Ensure MongoDB is running: `mongod` or `net start MongoDB`
- Check if port 4000 is available
- Verify backend server is started: `cd Backend && npm start`
- Check firewall settings

### 3. Frontend Build Errors

**Problem**: Vite build failures

**Solutions**:
- Clear node_modules: `rm -rf node_modules && npm install`
- Check for syntax errors in components
- Verify all dependencies are installed
- Clear browser cache

### 4. Database Connection Issues

**Problem**: `MongoDB connection error`

**Solutions**:
- Start MongoDB service
- Check connection string in config
- Verify database exists
- Check network connectivity

### 5. Port Conflicts

**Problem**: `Port already in use`

**Solutions**:
- Kill process using the port: `netstat -ano | findstr :4000`
- Change port in .env file
- Use different ports for frontend/backend

### 6. Authentication Issues

**Problem**: Login not working

**Solutions**:
- Check JWT_SECRET in environment
- Verify user exists in database
- Check password hashing
- Clear browser localStorage

### 7. Styling Issues

**Problem**: Tailwind/DaisyUI not working

**Solutions**:
- Verify Tailwind config includes all source files
- Check PostCSS configuration
- Ensure DaisyUI is installed
- Rebuild CSS: `npm run build`

## 🔧 Quick Fixes

### Reset Everything
```bash
# Backend
cd Backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd ../Frontend
rm -rf node_modules package-lock.json
npm install
```

### Check Server Status
```bash
# Backend health check
curl http://localhost:4000/health

# Frontend check
curl http://localhost:5173
```

### Database Reset
```bash
cd Backend
npm run seed
npm run createAdmin
```

## 📱 Platform-Specific Issues

### Windows
- Use `start-project.bat` for easy startup
- Check Windows Defender firewall
- Ensure MongoDB service is running

### macOS/Linux
- Use `./start-project.sh` (if available)
- Check file permissions
- Use `brew services start mongodb-community`

## 🆘 Still Having Issues?

1. **Check the logs**: Look at console output for error messages
2. **Verify setup**: Run `node test-setup.js` to check configuration
3. **Check versions**: Ensure Node.js version is 16+ and npm is up to date
4. **Clear cache**: Clear browser cache and npm cache
5. **Restart everything**: Stop all servers and restart

## 📞 Getting Help

- Check the main README.md for setup instructions
- Review the project structure
- Verify all required files exist
- Check for typos in configuration files

---

**Remember**: Most issues can be resolved by ensuring all dependencies are installed and services are running properly! 🚀

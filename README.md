# BookVault - Your Gateway to Knowledge

A modern, responsive bookstore application built with React, Node.js, and MongoDB. BookVault provides access to both free and paid educational content, making quality learning resources accessible to everyone.

## 🌟 Features

- **Free & Paid Books**: Access to a vast collection of educational content
- **User Authentication**: Secure login/signup system with JWT
- **Admin Dashboard**: Manage books, users, and content
- **Responsive Design**: Works perfectly on all devices
- **Dark/Light Theme**: Toggle between themes for better user experience
- **Search Functionality**: Find books by title, author, or genre
- **Modern UI**: Built with Tailwind CSS and DaisyUI components

## 🚀 Quick Start

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd bookVault
   ```

2. **Install Backend Dependencies**
   ```bash
   cd Backend
   npm install
   ```

3. **Install Frontend Dependencies**
   ```bash
   cd ../Frontend
   npm install
   ```

4. **Environment Setup**
   
   Create a `.env` file in the Backend directory:
   ```env
   PORT=4000
   MongoDBURI=mongodb://localhost:27017/bookVault
   JWT_SECRET=your-super-secret-jwt-key-here-change-in-production
   NODE_ENV=development
   ```

5. **Start MongoDB**
   ```bash
   # Start MongoDB service (Windows)
   net start MongoDB
   
   # Or start MongoDB manually
   mongod
   ```

6. **Run the Application**
   
   **Option 1: Use the startup script (Windows)**
   ```bash
   start-project.bat
   ```
   
   **Option 2: Manual startup**
   
   Terminal 1 (Backend):
   ```bash
   cd Backend
   npm start
   ```
   
   Terminal 2 (Frontend):
   ```bash
   cd Frontend
   npm run dev
   ```

## 📱 Access Points

- **Frontend**: http://localhost:5173 (or similar port)
- **Backend API**: http://localhost:4000
- **Health Check**: http://localhost:4000/health

## 🛠️ Technology Stack

### Frontend
- **React 18** - Modern React with hooks
- **Vite** - Fast build tool and dev server
- **Tailwind CSS** - Utility-first CSS framework
- **DaisyUI** - Component library for Tailwind
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **React Hook Form** - Form handling
- **React Hot Toast** - Toast notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **CORS** - Cross-origin resource sharing

## 🗂️ Project Structure

```
bookVault/
├── Backend/                 # Backend server
│   ├── config.js           # Configuration
│   ├── index.js            # Server entry point
│   ├── middleware/         # Custom middleware
│   ├── models/             # Database models
│   ├── routes/             # API routes
│   ├── controllers/        # Route controllers
│   └── package.json        # Backend dependencies
├── Frontend/               # React application
│   ├── src/
│   │   ├── components/     # Reusable components
│   │   ├── context/        # React context
│   │   ├── home/           # Home page components
│   │   ├── courses/        # Courses page components
│   │   └── main.jsx        # App entry point
│   ├── public/             # Static assets
│   └── package.json        # Frontend dependencies
└── README.md               # This file
```

## 🔐 Authentication

The application uses JWT (JSON Web Tokens) for authentication:

- **Signup**: Create a new account
- **Login**: Access existing account
- **Admin Access**: Special privileges for content management
- **Protected Routes**: Certain pages require authentication

## 📚 Book Management

### Free Books
- Available to all users
- No authentication required
- Accessible immediately

### Paid Books
- Require user authentication
- Payment integration ready
- Secure access control

## 🎨 UI Components

- **Responsive Navbar**: Navigation with theme toggle
- **Book Cards**: Display book information
- **Search Bar**: Find books quickly
- **Admin Dashboard**: Manage content
- **Forms**: User input with validation
- **Modals**: Interactive dialogs

## 🌙 Theme System

- **Light Theme**: Clean, bright interface
- **Dark Theme**: Easy on the eyes
- **Auto-save**: Theme preference is remembered
- **Smooth Transitions**: Elegant theme switching

## 📱 Responsive Design

The application is fully responsive and works on:
- Desktop computers
- Tablets
- Mobile phones
- All screen sizes

## 🚀 Deployment

### Frontend (Vercel/Netlify)
```bash
cd Frontend
npm run build
# Deploy the dist folder
```

### Backend (Heroku/Railway)
```bash
cd Backend
# Set environment variables
# Deploy to your preferred platform
```

## 🔧 Development

### Adding New Features
1. Create feature branch
2. Implement changes
3. Test thoroughly
4. Submit pull request

### Code Style
- Use consistent formatting
- Follow React best practices
- Maintain responsive design
- Add proper error handling

## 🐛 Troubleshooting

### Common Issues

1. **MongoDB Connection Error**
   - Ensure MongoDB is running
   - Check connection string in .env file

2. **Port Already in Use**
   - Change PORT in .env file
   - Kill processes using the port

3. **Module Not Found**
   - Run `npm install` in both directories
   - Clear node_modules and reinstall

4. **Frontend Build Errors**
   - Check for syntax errors
   - Verify all imports are correct
   - Clear browser cache

## 📞 Support

For support and questions:
- Create an issue in the repository
- Contact the development team
- Check the documentation

## 📄 License

This project is licensed under the MIT License.

## 🤝 Contributing

We welcome contributions! Please:
1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Submit a pull request

---

**BookVault** - Making education accessible to everyone, one book at a time. 📚✨

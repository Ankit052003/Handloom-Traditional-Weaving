# Handloom Website

A beautiful and modern full-stack web application for showcasing handloom products with admin authentication and contact management.

## 🌟 Features

- **Responsive Design**: Modern, mobile-friendly interface
- **Admin Authentication**: Secure login system with beautiful two-panel design
- **Contact Management**: Contact form with backend integration
- **Beautiful UI**: Clean design with improved visibility and user experience
- **Full-Stack Architecture**: React frontend with Node.js backend

## 🚀 Tech Stack

### Frontend
- **React.js** - Component-based UI library
- **CSS3** - Modern styling with responsive design
- **React Router** - Client-side routing
- **Context API** - State management

### Backend
- **Node.js** - Server runtime
- **Express.js** - Web framework
- **MongoDB** - Database
- **JWT** - Authentication tokens
- **bcrypt** - Password hashing

## 📁 Project Structure

```
Handloom_Website/
├── client/                     # React frontend
│   ├── src/
│   │   ├── components/         # Reusable components
│   │   │   ├── Admin/         # Admin dashboard components
│   │   │   ├── Auth/          # Authentication components
│   │   │   ├── Common/        # Shared components
│   │   │   └── Layout/        # Layout components
│   │   ├── context/           # React context providers
│   │   ├── hooks/             # Custom React hooks
│   │   ├── pages/             # Page components
│   │   ├── services/          # API services
│   │   ├── styles/            # Global styles
│   │   └── utils/             # Utility functions
│   └── package.json
└── server/                     # Node.js backend
    ├── config/                # Database configuration
    ├── middleware/            # Express middleware
    ├── models/                # Database models
    ├── routes/                # API routes
    ├── server.js              # Entry point
    └── package.json
```

## 🛠️ Installation & Setup

### Prerequisites
- Node.js (v14 or higher)
- npm or yarn
- MongoDB

### Backend Setup
1. Navigate to the server directory:
   ```bash
   cd server
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Create a `.env` file with your environment variables:
   ```env
   PORT=5000
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   ```

4. Start the server:
   ```bash
   npm start
   ```

### Frontend Setup
1. Navigate to the client directory:
   ```bash
   cd client
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Start the development server:
   ```bash
   npm start
   ```

The application will open in your browser at `http://localhost:3000`

## 🎨 UI Features

### Admin Login
- **Two-Panel Design**: Beautiful split-screen layout with form on the left and background image on the right
- **Social Login Options**: Google and Apple login integration ready
- **Responsive**: Adapts to different screen sizes

### Contact Form
- **Improved Visibility**: White background with proper contrast for better readability
- **Centered Layout**: Professional "Get In Touch" heading
- **Form Validation**: Built-in validation for user inputs

### Navigation
- **Clean Design**: Simplified button styling with transparent backgrounds
- **Consistent Branding**: Unified design language across all components

## 📱 Pages

- **Home** - Landing page with hero section
- **About** - Information about the handloom business
- **Articles** - Blog/article management system
- **Contact** - Contact form and information
- **Admin Dashboard** - Admin panel for content management

## 🔐 Authentication

The application includes a secure authentication system with:
- User registration and login
- JWT token-based authentication
- Protected routes for admin access
- Password encryption using bcrypt

## 🌐 API Endpoints

### Authentication
- `POST /api/auth/register` - User registration
- `POST /api/auth/login` - User login

### Articles
- `GET /api/articles` - Get all articles
- `POST /api/articles` - Create new article (admin only)
- `PUT /api/articles/:id` - Update article (admin only)
- `DELETE /api/articles/:id` - Delete article (admin only)

### Contact
- `POST /api/contact` - Submit contact form
- `GET /api/contact` - Get all contact submissions (admin only)

## 🚀 Deployment

### Frontend Deployment
The React app can be deployed to platforms like:
- Vercel
- Netlify
- GitHub Pages

### Backend Deployment
The Node.js server can be deployed to:
- Heroku
- Railway
- DigitalOcean
- AWS

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/new-feature`)
3. Commit your changes (`git commit -m 'Add new feature'`)
4. Push to the branch (`git push origin feature/new-feature`)
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Author

**Ankit Singh**
- GitHub: [@Ankit052003]((https://github.com/Ankit052003/Handloom-Traditional-Weaving))
- Email: ankitaur2022@gmail.com



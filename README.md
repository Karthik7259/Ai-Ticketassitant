# AI Ticket Assistant

A full-stack ticketing system with AI-powered ticket analysis and automated assignment to moderators based on skills matching.

## 🚀 Features

- **User Authentication**: JWT-based authentication with role-based access control
- **Ticket Management**: Create, view, and manage support tickets
- **AI Analysis**: Automatic ticket analysis using Gemini AI for priority assessment and skill matching
- **Smart Assignment**: Automatic assignment to moderators based on required skills
- **Email Notifications**: Automated email notifications for ticket assignments and user signup
- **Admin Panel**: User management and role assignment
- **Real-time Processing**: Background job processing with Inngest

## 🛠️ Tech Stack

### Backend
- **Node.js** with Express.js
- **MongoDB** with Mongoose ODM
- **JWT** for authentication
- **Inngest** for background job processing
- **Gemini AI** for ticket analysis
- **Nodemailer** for email notifications
- **bcrypt** for password hashing

### Frontend
- **React** with Vite
- **React Router** for navigation
- **Tailwind CSS** with DaisyUI for styling

## 📦 Installation

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Gmail API key (for Gemini AI)

### Backend Setup

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd ai-ticket-assistant
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the root directory:
   ```env
   MONGO_URI=mongodb://localhost:27017/ai
   JWT_SECRET=your-jwt-secret-key
   
   # Mailtrap SMTP Configuration
   MAILTRAP_SMTP_HOST=sandbox.smtp.mailtrap.io
   MAILTRAP_SMTP_PORT=2525
   MAILTRAP_SMTP_USER=your-mailtrap-user
   MAILTRAP_SMTP_PASS=your-mailtrap-password
   
   # Gemini AI Configuration
   GEMINI_API_KEY=your-gemini-api-key
   APP_URL=http://localhost:3000
   ```

4. **Start the backend server**
   ```bash
   npm run dev
   ```

5. **Start Inngest development server** (in a separate terminal)
   ```bash
   npm run inngest-dev
   ```

### Frontend Setup

1. **Navigate to frontend directory**
   ```bash
   cd frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Environment Configuration**
   Create a `.env` file in the frontend directory:
   ```env
   VITE_SERVER_URL=http://localhost:3000
   ```

4. **Start the development server**
   ```bash
   npm run dev
   ```

## 🏗️ Project Structure

```
ai-ticket-assistant/
├── controllers/          # API controllers
│   ├── ticket.js        # Ticket management
│   └── user.js          # User authentication & management
├── inngest/             # Background job functions
│   ├── client.js        # Inngest client configuration
│   └── functions/       # Inngest function definitions
├── middlewares/         # Express middlewares
│   └── auth.js          # Authentication middleware
├── models/              # MongoDB schemas
│   ├── ticket.js        # Ticket model
│   └── user.model.js    # User model
├── routes/              # API routes
│   ├── ticket.js        # Ticket routes
│   └── user.js          # User routes
├── Utils/               # Utility functions
│   ├── Aiagent.js       # AI ticket analysis
│   └── mailer.js        # Email service
└── frontend/            # React frontend application
```

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Admin
- `GET /api/auth/users` - Get all users (admin only)
- `POST /api/auth/update-user` - Update user role/skills (admin only)

### Tickets
- `GET /api/tickets` - Get all tickets (filtered by role)
- `GET /api/tickets/:id` - Get specific ticket
- `POST /api/tickets` - Create new ticket

### Background Jobs
- `POST /api/inngest` - Inngest webhook endpoint

## 👥 User Roles

- **User**: Can create and view their own tickets
- **Moderator**: Can view all tickets and get assigned tickets based on skills
- **Admin**: Full access to user management and all tickets

## 🔄 Workflow

1. **User Registration**: New users sign up and receive welcome emails
2. **Ticket Creation**: Users create support tickets
3. **AI Analysis**: Tickets are automatically analyzed for:
   - Priority assessment (low/medium/high)
   - Required skills identification
   - Helpful resolution notes
4. **Smart Assignment**: Tickets are assigned to moderators with matching skills
5. **Email Notifications**: Assigned moderators receive email notifications

## 🚀 Getting Started

1. **Create an Admin User**: Manually update a user's role to "admin" in MongoDB:
   ```javascript
   db.users.updateOne(
     { email: "admin@example.com" },
     { $set: { role: "admin" } }
   )
   ```

2. **Test the System**:
   - Sign up as a regular user
   - Create a ticket
   - Check the Inngest dashboard for background job processing
   - Verify email notifications in Mailtrap

## 📝 Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGO_URI` | MongoDB connection string | ✅ |
| `JWT_SECRET` | Secret key for JWT tokens | ✅ |
| `MAILTRAP_SMTP_HOST` | SMTP host for email service | ✅ |
| `MAILTRAP_SMTP_PORT` | SMTP port | ✅ |
| `MAILTRAP_SMTP_USER` | SMTP username | ✅ |
| `MAILTRAP_SMTP_PASS` | SMTP password | ✅ |
| `GEMINI_API_KEY` | Google Gemini AI API key | ✅ |
| `APP_URL` | Application base URL | ✅ |

## 🛠️ Development Scripts

```bash
# Backend
npm run dev          # Start development server with nodemon
npm run inngest-dev  # Start Inngest development server

# Frontend
npm run dev          # Start Vite development server
npm run build        # Build for production
npm run preview      # Preview production build
```

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Commit your changes
4. Push to the branch
5. Create a Pull Request

## 📄 License

This project is licensed under the ISC License.

## 🐛 Known Issues

- Email notifications require Mailtrap configuration
- AI analysis requires valid Gemini API key
- Inngest dashboard needs to be running for background jobs

## 📞 Support

For support, email your-email@example.com or create an issue in the repository.


# i will start working tomorrow remove .env file from the repo 

# Flood Relief System - Backend

This is the backend API for the Flood Relief System built with Node.js, Express, and MongoDB.

## Prerequisites

- Node.js (v14 or higher)
- MongoDB (local installation or cloud service like MongoDB Atlas)

## Installation

1. **Install Node.js** (if not already installed):
   - Download from [nodejs.org](https://nodejs.org/)
   - Or use a package manager like Chocolatey on Windows

2. **Install MongoDB**:
   - Download from [mongodb.com](https://www.mongodb.com/try/download/community)
   - Follow installation instructions for your OS

3. **Clone or navigate to the project directory**

4. **Install dependencies**:
   ```bash
   npm install
   ```

5. **Set up environment variables**:
   - Copy `.env` file and update values as needed
   - Change `JWT_SECRET` to a secure random string

6. **Start MongoDB service**:
   - On Windows: `net start MongoDB`
   - Or use MongoDB Compass to start the service

7. **Run the server**:
   ```bash
   npm start
   ```
   For development with auto-restart:
   ```bash
   npm run dev
   ```

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `GET /api/auth/user` - Get current user info (requires auth)

### Users
- `GET /api/users` - Get all users (admin)
- `GET /api/users/:id` - Get user by ID

### Requests
- `POST /api/requests` - Create help request (requires auth)
- `GET /api/requests` - Get all requests (requires auth)
- `GET /api/requests/:id` - Get request by ID
- `PUT /api/requests/:id` - Update request status

## Project Structure

```
├── models/
│   ├── User.js
│   └── Request.js
├── routes/
│   ├── auth.js
│   ├── users.js
│   └── requests.js
├── middleware/
│   └── auth.js
├── server.js
├── package.json
├── .env
└── README.md
```

## Next Steps

1. **Update Frontend**: Modify your HTML/JS files to call these API endpoints instead of using localStorage
2. **Add File Upload**: Implement image upload for requests
3. **Add Reviews System**: Create API for reviews
4. **Add Chat System**: Implement real-time chat with Socket.io
5. **Deploy**: Deploy to services like Heroku, DigitalOcean, or AWS

## Technologies Used

- **Node.js** - Runtime environment
- **Express.js** - Web framework
- **MongoDB** - Database
- **Mongoose** - ODM for MongoDB
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing
- **express-validator** - Input validation

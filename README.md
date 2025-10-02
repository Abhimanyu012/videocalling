# 🎥 Video Calling App - Full Stack MERN Application# Videocalling MERN Skeleton



A complete video calling and chat application with friend request system, built with **React**, **Node.js**, **MongoDB**, and **Stream.io**.A minimal MERN stack template to kickstart your videocalling app development.



[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)## Project Structure

[![Node](https://img.shields.io/badge/node-%3E%3D18.0.0-brightgreen.svg)](https://nodejs.org/)

[![React](https://img.shields.io/badge/react-19.1.1-blue.svg)](https://reactjs.org/)```

videocalling/

---├── backend/

│   ├── src/

## ✨ Features│   │   ├── controllers/

│   │   ├── routes/

### 🔐 Authentication & User Management│   │   ├── models/

- User registration and login with JWT│   │   ├── middlewares/

- Profile with language preferences│   │   ├── services/

- Onboarding flow for new users│   │   ├── utils/

- Secure password hashing with bcrypt│   │   ├── validations/

│   │   └── config/

### 👥 Friend System│   ├── src/index.js

- Send friend requests│   └── .env.example

- Accept/decline friend requests└── frontend/

- View incoming and outgoing requests    ├── src/

- Recommended users based on language compatibility    │   ├── components/

- Friends list management    │   ├── pages/

    │   ├── hooks/

### 💬 Real-time Chat    │   ├── context/

- Instant messaging with Stream Chat    │   ├── services/

- Channel-based conversations    │   ├── utils/

- Message history    │   └── styles/

- Online status indicators    ├── index.html

- Beautiful chat interface    ├── src/main.jsx

```

### 📹 Video Calling

- High-quality video calls with Stream Video SDK## Getting Started

- WebRTC peer-to-peer connections

- Camera and microphone controls### Backend (Node.js 18+)

- Screen sharing capability

- Multiple participants support```bash

- Call controls (mute, video on/off, end call)npm init -y

npm install express mongoose cors dotenv zod jsonwebtoken bcryptjs morgan

### 🎨 UI/UXnpm install --save-dev nodemon

- Modern, responsive design with Tailwind CSS# Copy .env.example to .env and configure your environment variables

- Beautiful gradients and animationsnpm run dev

- Toast notifications for user feedback```

- Loading states and error handling

- Mobile-friendly interface### Frontend (Vite + React)



---```bash

npm create vite@latest . -- --template react

## 🚀 Quick Startnpm install

npm run dev

### Prerequisites```



- **Node.js** (v18 or higher)> **Note:**  

- **MongoDB** (local or Atlas)> Set `CORS_ORIGIN` in your backend `.env` file to match your Vite dev server URL.

- **Stream.io account** (free tier available)

- **npm** or **yarn**

### Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/Abhimanyu012/videocalling.git
   cd videocalling
   ```

2. **Set up Backend**
   ```bash
   cd backend
   npm install
   
   # Create .env file (if not exists)
   cp .env.example .env
   # Then edit .env with your credentials
   ```

3. **Set up Frontend**
   ```bash
   cd ../frontend
   npm install
   
   # Create .env file (if not exists)
   cp .env.example .env
   # Then edit .env with your Stream API key
   ```

4. **Get Stream.io Credentials**
   - Go to [Stream.io Dashboard](https://getstream.io/dashboard/)
   - Sign up for free account
   - Create a new app
   - Copy **API Key** and **API Secret**
   - Add to `.env` files:
     - Backend: `STREAM_API_KEY` and `STREAM_API_SECRET`
     - Frontend: `VITE_STREAM_API_KEY` (same as backend STREAM_API_KEY)

5. **Start MongoDB**
   ```bash
   # Using systemd
   sudo systemctl start mongod
   
   # OR using Docker
   docker run -d -p 27017:27017 --name mongodb mongo
   ```

6. **Run the Application**
   ```bash
   # Terminal 1 - Backend
   cd backend
   npm start
   
   # Terminal 2 - Frontend
   cd frontend
   npm run dev
   ```

7. **Open your browser**
   ```
   http://localhost:5173
   ```

---

## 📖 Usage Guide

### Creating Accounts

1. **First User (John)**
   - Open http://localhost:5173
   - Click "Sign Up"
   - Enter details: name, email, password
   - Complete onboarding with language preferences

2. **Second User (Jane)**
   - Open **Incognito window**
   - Go to http://localhost:5173
   - Sign up with different email
   - Complete onboarding

### Sending Friend Requests

1. Go to **Home** page
2. Scroll to **"People You May Know"** section
3. Find a user with matching languages
4. Click **purple "Add Friend"** button
5. See toast: "Friend request sent!"

### Accepting Friend Requests

1. Click **"Notifications"** in sidebar
2. View **"Incoming Friend Requests"**
3. Click **green "Accept"** button
4. User is now in your friends list

### Starting a Chat

1. Go to **Home** page
2. Find friend in **"Your Friends"** section (top)
3. Click **blue "Chat"** button
4. Type message and press Enter
5. Messages appear instantly in real-time

### Making a Video Call

**Method 1: From Home Page**
1. Find friend in "Your Friends"
2. Click **green "Call"** button
3. Allow camera/microphone permissions
4. Wait for friend to join

**Method 2: From Chat**
1. Open chat with friend
2. Click **📹 video icon** in top-right
3. Allow camera/microphone
4. Start calling!

### Call Controls

- **🎤 Microphone** - Toggle mute/unmute
- **📹 Camera** - Toggle video on/off
- **🔊 Audio** - Control volume
- **📱 Screen Share** - Share your screen
- **❌ End Call** - Leave the call

---

## 🏗️ Project Structure

```
videocallling/
├── backend/
│   ├── src/
│   │   ├── controllers/     # Request handlers
│   │   │   ├── auth.controller.js
│   │   │   ├── user.controller.js
│   │   │   └── chat.controller.js
│   │   ├── models/          # Database schemas
│   │   │   ├── user.model.js
│   │   │   └── friendRequest.model.js
│   │   ├── routes/          # API routes
│   │   │   ├── auth.route.js
│   │   │   ├── users.route.js
│   │   │   └── chat.route.js
│   │   ├── middlewares/     # Auth middleware
│   │   │   └── auth.middleware.js
│   │   ├── utils/           # Utilities
│   │   │   └── stream.js
│   │   ├── config/          # Configuration
│   │   │   └── db.js
│   │   └── server.js        # Entry point
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   └── package.json
│
├── frontend/
│   ├── src/
│   │   ├── pages/           # Page components
│   │   │   ├── HomePage.jsx
│   │   │   ├── ChatPage.jsx
│   │   │   ├── CallPage.jsx
│   │   │   ├── NotificationPage.jsx
│   │   │   ├── LoginPage.jsx
│   │   │   ├── SignupPage.jsx
│   │   │   └── OnboardingPage.jsx
│   │   ├── components/      # Reusable components
│   │   │   ├── Layout.jsx
│   │   │   ├── Sidebar.jsx
│   │   │   ├── FriendListCard.jsx
│   │   │   ├── FriendsCard.jsx
│   │   │   └── ...
│   │   ├── contexts/        # React contexts
│   │   │   └── StreamContext.jsx
│   │   ├── hooks/           # Custom hooks
│   │   ├── lib/             # API client
│   │   │   ├── api.js
│   │   │   └── axios.js
│   │   ├── App.jsx
│   │   └── main.jsx
│   ├── .env                 # Environment variables
│   ├── .env.example         # Environment template
│   └── package.json
│
├── start-app.sh             # Startup script
└── README.md
```

---

## 🔌 API Endpoints

### Authentication
```
POST   /api/auth/signup        # Register new user
POST   /api/auth/login         # Login user
POST   /api/auth/logout        # Logout user
POST   /api/auth/onboard       # Complete onboarding
GET    /api/auth/me            # Get current user
```

### Users & Friends
```
GET    /api/users                          # Get recommended users
GET    /api/users/friends                  # Get friends list
POST   /api/users/friend-request/:id       # Send friend request
PUT    /api/users/friend-request/:id/accept # Accept friend request
GET    /api/users/friend-request           # Get incoming requests
GET    /api/users/outgoing-friend-request  # Get outgoing requests
```

### Chat
```
GET    /api/chat/token         # Get Stream.io token
```

---

## 🛠️ Tech Stack

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB ODM
- **JWT** - Authentication
- **bcryptjs** - Password hashing
- **Stream Chat** - Real-time messaging
- **Stream Video** - Video calling

### Frontend
- **React 19** - UI library
- **Vite** - Build tool
- **React Router v7** - Routing
- **TanStack Query** - Data fetching
- **Axios** - HTTP client
- **Tailwind CSS** - Styling
- **DaisyUI** - UI components
- **Stream Chat React** - Chat UI
- **Stream Video React SDK** - Video UI
- **Lucide React** - Icons
- **React Hot Toast** - Notifications

---

## 🎨 Environment Variables

### Backend (.env)
```bash
PORT=5000
NODE_ENV=development
MONGO_URI=mongodb://localhost:27017/videocalling
JWT_SECRET_KEY=your_secret_key
STREAM_API_KEY=your_stream_api_key        # From Stream.io
STREAM_API_SECRET=your_stream_api_secret  # From Stream.io
CORS_ORIGIN=http://localhost:5173
```

### Frontend (.env)
```bash
VITE_STREAM_API_KEY=your_stream_api_key   # Same as backend STREAM_API_KEY!
VITE_API_URL=http://localhost:5000
```

**⚠️ Important:** Both `STREAM_API_KEY` (backend) and `VITE_STREAM_API_KEY` (frontend) must have the **same value** from your Stream.io dashboard.

---

## 🧪 Testing

### Manual Testing Flow

1. **Create 2 test accounts**
   - User 1: john@example.com (normal window)
   - User 2: jane@example.com (incognito window)

2. **Complete onboarding for both**
   - Set language preferences (e.g., English ↔ Spanish)
   - Add bio and location

3. **Test friend request system**
   - John sends request to Jane
   - Jane accepts request
   - Both see each other in "Your Friends" section

4. **Test chat functionality**
   - John clicks blue "Chat" button on Jane's card
   - Send messages back and forth
   - Verify real-time delivery (no refresh needed)

5. **Test video calling**
   - John clicks green "Call" button or 📹 icon in chat
   - Jane joins the call
   - Test camera/mic controls
   - End call successfully

---

## 🐛 Troubleshooting

### Chat Not Loading
**Problem:** Chat page shows loading spinner forever

**Solutions:**
1. Check Stream.io credentials in both `.env` files
2. Verify API keys match (backend and frontend)
3. Restart both servers after adding credentials
4. Check browser console (F12) for errors

### Video Call Not Starting
**Problem:** Call doesn't connect or video is black

**Solutions:**
1. **Allow permissions:** Click "Allow" when browser asks for camera/microphone
2. **Use Chrome/Edge:** Better WebRTC support than Firefox/Safari
3. **Check credentials:** Verify Stream.io keys in `.env` files
4. **Test connection:** Check internet connection stability

### Friend Request Button Not Working
**Problem:** Clicking "Add Friend" does nothing

**Solutions:**
1. **Check backend:** Ensure backend server is running on port 5000
2. **Check MongoDB:** Verify MongoDB is connected
3. **Check console:** Open browser console (F12) for errors
4. **Check terminal:** Look at backend terminal for error messages

### Messages Not Appearing
**Problem:** Send message but other user doesn't see it

**Solutions:**
1. Verify both users are in the same channel
2. Check Stream.io connection in browser console
3. Refresh the page
4. Verify Stream.io dashboard shows activity

### "Cannot Find Chat/Call Buttons"
**Problem:** Can't see Chat or Call buttons

**Solutions:**
1. **Accept friend request first:** Buttons only appear for accepted friends
2. **Look in "Your Friends" section:** Not in "People You May Know"
3. **Check top of Home page:** "Your Friends" is at the top
4. **Refresh page:** Sometimes needs a refresh after accepting

### "Cannot Find Module" Errors
**Problem:** Import errors when starting servers

**Solutions:**
```bash
# Backend
cd backend
rm -rf node_modules package-lock.json
npm install

# Frontend
cd frontend
rm -rf node_modules package-lock.json
npm install --legacy-peer-deps
```

---

## 📍 UI Navigation Guide

### Home Page (`/`)
```
┌─────────────────────────────────────┐
│  YOUR FRIENDS (1)                   │
│  ┌───────────────────────────────┐ │
│  │ 👤 Jane Smith        🟢       │ │
│  │ 📍 Spain                      │ │
│  │ 🇪🇸 Spanish → 🇬🇧 English    │ │
│  │                                │ │
│  │ [💬 Chat]    [📹 Call]        │ │ ← Click here!
│  │   (Blue)      (Green)         │ │
│  └───────────────────────────────┘ │
│                                     │
│  PEOPLE YOU MAY KNOW                │
│  ┌───────────────────────────────┐ │
│  │ 👤 John Doe                   │ │
│  │ [➕ Add Friend]               │ │ ← Send request
│  └───────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Notifications Page (`/notifications`)
- **Incoming Requests:** Accept/decline friend requests
- **Outgoing Requests:** See pending requests you sent

### Chat Page (`/chat`)
- **Left sidebar:** Channel list with all conversations
- **Right side:** Active chat with messages
- **Top-right:** 📹 and 📞 icons to start video/voice call

### Call Page (`/call`)
- **Large screen:** Friend's video feed
- **Small corner:** Your video preview
- **Bottom controls:** Mic, camera, audio, screen share, end call

---

## 🚀 Deployment

### Backend Deployment (Render, Railway, Heroku)

1. Set environment variables on your hosting platform
2. Ensure MongoDB connection string is production-ready (MongoDB Atlas)
3. Set `NODE_ENV=production`
4. Update `CORS_ORIGIN` to your frontend production URL
5. Deploy backend

### Frontend Deployment (Vercel, Netlify)

1. Update `VITE_API_URL` to production backend URL
2. Set `VITE_STREAM_API_KEY` in environment variables
3. Build: `npm run build`
4. Deploy `dist` folder

### Environment Checklist for Production
- [ ] Change `JWT_SECRET_KEY` to strong random string
- [ ] Use MongoDB Atlas or production database
- [ ] Update CORS origin to production frontend URL
- [ ] Use HTTPS for both frontend and backend
- [ ] Enable secure cookies (`secure: true` in production)
- [ ] Set up monitoring and logging
- [ ] Configure rate limiting
- [ ] Enable compression

---

## 📊 Features Checklist

- [x] User authentication (signup, login, logout)
- [x] JWT token-based auth with HTTP-only cookies
- [x] User onboarding with language preferences
- [x] Profile with avatar, bio, location
- [x] Friend request system (send, accept, decline)
- [x] View incoming and outgoing requests
- [x] Friends list with populated data
- [x] Recommended users based on languages
- [x] Real-time chat with Stream Chat
- [x] Video calling with Stream Video SDK
- [x] Camera and microphone controls
- [x] Screen sharing
- [x] Beautiful UI with Tailwind CSS
- [x] Toast notifications
- [x] Loading states
- [x] Error handling
- [x] Responsive design

**Total:** 17/17 features ✅

---

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the project
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

---

## 📝 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Abhimanyu Kumar**
- GitHub: [@Abhimanyu012](https://github.com/Abhimanyu012)
- Repository: [videocalling](https://github.com/Abhimanyu012/videocalling)

---

## 🙏 Acknowledgments

- [Stream.io](https://getstream.io/) - For amazing Chat and Video SDKs
- [React](https://reactjs.org/) - UI library
- [Tailwind CSS](https://tailwindcss.com/) - Styling framework
- [MongoDB](https://www.mongodb.com/) - Database

---

## 📞 Support

If you have any questions or need help:
1. Check the troubleshooting section above
2. Open an issue on GitHub
3. Check [Stream.io documentation](https://getstream.io/docs/)

---

## 🎯 Quick Commands Reference

```bash
# Start MongoDB
sudo systemctl start mongod

# Start Backend (Terminal 1)
cd backend && npm start

# Start Frontend (Terminal 2)
cd frontend && npm run dev

# Install dependencies
npm install                    # Backend
npm install --legacy-peer-deps # Frontend

# Build for production
npm run build                  # Frontend

# Use startup script (if available)
./start-app.sh                 # Starts both servers
```

---

## ⚡ Performance Tips

1. **Use Chrome/Edge** for best WebRTC performance
2. **Close unnecessary tabs** during video calls
3. **Use wired internet** for stable connections
4. **Clear browser cache** if experiencing issues
5. **Use incognito window** for testing second user
6. **Test locally** before deploying

---

## 🔐 Security Best Practices

- ✅ Passwords are hashed with bcrypt before storing
- ✅ JWT tokens stored in HTTP-only cookies (XSS protection)
- ✅ SameSite cookies enabled (CSRF protection)
- ✅ All routes protected with authentication middleware
- ✅ Environment variables for sensitive data
- ✅ Input validation on all endpoints
- ✅ CORS configured for specific origins
- ✅ MongoDB injection prevention with Mongoose

---

## 🎉 Success!

If you've followed all steps, you should now have:
- ✅ Working authentication system
- ✅ Friend request functionality
- ✅ Real-time chat
- ✅ Video calling capabilities
- ✅ Beautiful responsive UI

**Open http://localhost:5173 and start testing!** 🚀

---

**Made with ❤️ using MERN Stack + Stream.io**

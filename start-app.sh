#!/bin/bash

# 🚀 Video Calling App - Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting Video Calling App..."
echo ""

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Check if MongoDB is running
echo "📦 Checking MongoDB..."
if systemctl is-active --quiet mongod; then
    echo -e "${GREEN}✅ MongoDB is running${NC}"
else
    echo -e "${RED}❌ MongoDB is not running!${NC}"
    echo "Starting MongoDB..."
    sudo systemctl start mongod
    sleep 2
fi

echo ""
echo "🔧 Starting Backend Server..."
echo -e "${BLUE}Backend will run on: http://localhost:5000${NC}"
cd /home/abcd/Desktop/videocallling/backend
gnome-terminal -- bash -c "npm start; exec bash" &
sleep 3

echo ""
echo "🎨 Starting Frontend Server..."
echo -e "${BLUE}Frontend will run on: http://localhost:5173${NC}"
cd /home/abcd/Desktop/videocallling/frontend
gnome-terminal -- bash -c "npm run dev; exec bash" &
sleep 3

echo ""
echo -e "${GREEN}✅ Both servers are starting!${NC}"
echo ""
echo "📍 Access the app at:"
echo "   👉 http://localhost:5173"
echo ""
echo "🛑 To stop servers:"
echo "   - Close the terminal windows"
echo "   - Or press Ctrl+C in each terminal"
echo ""
echo "📚 Next steps:"
echo "   1. Open browser: http://localhost:5173"
echo "   2. Create 2 accounts (use incognito for 2nd)"
echo "   3. Complete onboarding for both"
echo "   4. Send & accept friend request"
echo "   5. Click Chat button to message"
echo "   6. Click Call button for video call"
echo ""
echo "📖 Read START_HERE.md for detailed instructions"
echo ""
echo "🎉 Happy testing!"

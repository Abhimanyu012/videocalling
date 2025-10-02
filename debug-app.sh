#!/bin/bash

# Video Calling App - Debugging & Testing Script
# This script helps identify issues with friends, chat, and video calls

echo "======================================"
echo "VIDEO CALLING APP - DEBUG SCRIPT"
echo "======================================"
echo ""

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Check if servers are running
echo "1. Checking if servers are running..."
echo "--------------------------------------"

# Check Backend
if curl -s http://localhost:5000/api/auth/me > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Backend server is running on port 5000"
else
    echo -e "${RED}✗${NC} Backend server is NOT running"
    echo "   Run: cd backend && npm run dev"
fi

# Check Frontend
if curl -s -I http://localhost:5173 > /dev/null 2>&1; then
    echo -e "${GREEN}✓${NC} Frontend server is running on port 5173"
else
    echo -e "${RED}✗${NC} Frontend server is NOT running"
    echo "   Run: cd frontend && npm run dev"
fi

echo ""
echo "2. Checking Environment Configuration..."
echo "--------------------------------------"

# Check Backend .env
if [ -f "backend/.env" ]; then
    echo -e "${GREEN}✓${NC} Backend .env file exists"
    
    # Check required variables
    if grep -q "STREAM_API_KEY=" backend/.env; then
        BACKEND_KEY=$(grep "STREAM_API_KEY=" backend/.env | cut -d '=' -f2)
        echo -e "   STREAM_API_KEY: ${BACKEND_KEY:0:15}..."
    else
        echo -e "${RED}✗${NC} STREAM_API_KEY missing in backend/.env"
    fi
    
    if grep -q "STREAM_API_SECRET=" backend/.env; then
        echo -e "${GREEN}✓${NC} STREAM_API_SECRET is set"
    else
        echo -e "${RED}✗${NC} STREAM_API_SECRET missing in backend/.env"
    fi
    
    if grep -q "MONGO_URI=" backend/.env; then
        echo -e "${GREEN}✓${NC} MONGO_URI is set"
    else
        echo -e "${RED}✗${NC} MONGO_URI missing in backend/.env"
    fi
else
    echo -e "${RED}✗${NC} Backend .env file NOT found"
fi

# Check Frontend .env
if [ -f "frontend/.env" ]; then
    echo -e "${GREEN}✓${NC} Frontend .env file exists"
    
    if grep -q "VITE_STREAM_API_KEY=" frontend/.env; then
        FRONTEND_KEY=$(grep "VITE_STREAM_API_KEY=" frontend/.env | cut -d '=' -f2)
        echo -e "   VITE_STREAM_API_KEY: ${FRONTEND_KEY:0:15}..."
        
        # Compare keys
        if [ "$BACKEND_KEY" = "$FRONTEND_KEY" ]; then
            echo -e "${GREEN}✓${NC} Stream API keys match!"
        else
            echo -e "${RED}✗${NC} Stream API keys DO NOT match!"
            echo "   Backend: ${BACKEND_KEY:0:15}..."
            echo "   Frontend: ${FRONTEND_KEY:0:15}..."
        fi
    else
        echo -e "${RED}✗${NC} VITE_STREAM_API_KEY missing in frontend/.env"
    fi
else
    echo -e "${RED}✗${NC} Frontend .env file NOT found"
fi

echo ""
echo "3. Common Issues and Solutions"
echo "--------------------------------------"
echo ""
echo "${YELLOW}Issue: Friends not showing${NC}"
echo "  Solution:"
echo "  1. Check backend logs for 'Getting friends for user'"
echo "  2. Open browser console (F12) and look for 'Fetching friends'"
echo "  3. Make sure friend request was accepted by BOTH users"
echo "  4. Refresh the page after accepting friend request"
echo ""
echo "${YELLOW}Issue: Chat not working${NC}"
echo "  Solution:"
echo "  1. Open browser console (F12)"
echo "  2. Look for 'Stream clients initialized and ready'"
echo "  3. If you see 'Chat not initialized', wait 10 seconds"
echo "  4. Check that Stream API keys match in both .env files"
echo "  5. Verify you're clicking chat with an actual friend"
echo ""
echo "${YELLOW}Issue: Video call not working${NC}"
echo "  Solution:"
echo "  1. Allow camera/microphone permissions in browser"
echo "  2. Check browser console for errors"
echo "  3. Make sure you're calling from chat or friends list"
echo "  4. Verify Stream Video client is initialized"
echo ""
echo "4. Testing Workflow"
echo "--------------------------------------"
echo "To properly test the app:"
echo ""
echo "Step 1: Create two accounts"
echo "  • Open http://localhost:5173 in two different browsers"
echo "  • Or use incognito/private mode for second account"
echo ""
echo "Step 2: Complete onboarding for both"
echo "  • Fill in all required fields"
echo "  • Choose languages, location, bio"
echo ""
echo "Step 3: Send friend request"
echo "  • User A: Find User B in 'People You May Know'"
echo "  • User A: Click 'Add Friend' button"
echo "  • Check browser console for confirmation"
echo ""
echo "Step 4: Accept friend request"
echo "  • User B: Click 'Friend Requests' button at top"
echo "  • User B: Click 'Accept' on User A's request"
echo "  • Check backend logs for 'Friend request accepted'"
echo ""
echo "Step 5: Verify friends appear"
echo "  • Refresh both browsers"
echo "  • Both should see each other in 'Your Friends' section"
echo "  • Count should show (1)"
echo ""
echo "Step 6: Test chat"
echo "  • Click 'Chat' button next to friend's name"
echo "  • Wait for 'Stream clients initialized' in console"
echo "  • Channel should appear in left sidebar"
echo "  • Send a message"
echo ""
echo "Step 7: Test video call"
echo "  • From friends list, click 'Call' button"
echo "  • OR from chat page, click video icon"
echo "  • Allow camera/microphone permissions"
echo "  • Should see your video"
echo ""
echo "5. Detailed Logs Location"
echo "--------------------------------------"
echo "Backend logs:"
echo "  • Terminal where you ran 'cd backend && npm run dev'"
echo "  • Look for emoji indicators: ✅ (success) ❌ (error) 🔄 (processing)"
echo ""
echo "Frontend logs:"
echo "  • Browser Developer Tools (F12)"
echo "  • Console tab"
echo "  • Look for emoji indicators same as above"
echo ""
echo "Network requests:"
echo "  • Browser Developer Tools (F12)"
echo "  • Network tab"
echo "  • Filter by 'api' to see API calls"
echo "  • Check for failed requests (red)"
echo ""
echo "======================================"
echo "Debugging script completed!"
echo "======================================"
echo ""
echo "💡 TIP: Keep both terminal (backend) and browser console"
echo "   (F12) open while testing to see real-time logs"
echo ""

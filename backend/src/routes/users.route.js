import express from 'express';

import { protectRoute } from '../middlewares/auth.middleware.js';
import { getRecommendedUsers, getFriends, sendFriendRequest, acceptFriendRequest, getFriendRequest, getOutgoingFriendRequest } from '../controllers/user.controllers.js';
const router = express.Router();

router.use(protectRoute)
router.get("/", getRecommendedUsers)
router.get("/friends", getFriends)

router.post("/friend-request/:id", sendFriendRequest)
router.put("/friend-request/:id/accept", acceptFriendRequest)

router.get("/friend-request/", getFriendRequest)
router.get("/outgoing-friend-request/", getOutgoingFriendRequest)


export default router;  
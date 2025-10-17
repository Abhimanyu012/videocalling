import FriendRequest from "../models/friendRequest.model.js";
import { User } from "../models/user.model.js";

/**
 * Get recommended users (not friends, not self, onboarded)
 */
export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;

        const recommendedUsers = await User.find({
            $and: [
                { _id: { $ne: currentUserId } },
                { _id: { $nin: currentUser.friends } },
                { isOnboarded: true }
            ]
        }).select("-password");

        res.status(200).json({ recommendedUsers });
    } catch (error) {
        console.error("❌ Error in getRecommendedUsers controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Get all friends of the current user
 */
export const getFriends = async (req, res) => {
    try {
        // console.log('🔄 Getting friends for user:', req.user.id);
        
        const user = await User.findById(req.user.id)
            .select("friends")
            .populate("friends", "fullName profilePic nativeLanguage learningLanguage location bio");
        
        if (!user) {
            console.log('❌ User not found:', req.user.id);
            return res.status(404).json({ message: "User not found" });
        }

        // console.log('✅ Found', user.friends.length, 'friends for user:', req.user.id);
        // console.log('Friends:', user.friends.map(f => ({ id: f._id, name: f.fullName })));
        
        res.status(200).json(user.friends);
    } catch (error) {
        console.error("❌ Error in getFriends controller:", error.message);
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Send a friend request to another user
 */
export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id;
        const { id: recipientId } = req.params;

        // Validation: Cannot send request to self
        if (myId === recipientId) {
            return res.status(400).json({ message: "You cannot send a friend request to yourself" });
        }

        // Check if recipient exists
        const recipient = await User.findById(recipientId);
        if (!recipient) {
            return res.status(404).json({ message: "Recipient not found" });
        }

        // Check if already friends
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({ message: "You are already friends with this user" });
        }

        // Check for existing friend request (bidirectional)
        const existingRequest = await FriendRequest.findOne({
            $or: [
                { sender: myId, recipient: recipientId },
                { sender: recipientId, recipient: myId }
            ]
        });

        if (existingRequest) {
            return res.status(400).json({ message: "A friend request already exists between you and this user" });
        }

        // Create friend request
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        });

        res.status(201).json({ friendRequest });
    } catch (error) {
        console.error("❌ Error in sendFriendRequest controller:", error.message);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Accept a friend request
 */
export const acceptFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params;
        console.log('🔄 Accepting friend request:', requestId, 'by user:', req.user.id);
        
        // Find friend request
        const friendRequest = await FriendRequest.findById(requestId);
        if (!friendRequest) {
            console.log('❌ Friend request not found:', requestId);
            return res.status(404).json({ message: "Friend request not found" });
        }

        console.log('📝 Friend request details:', {
            sender: friendRequest.sender,
            recipient: friendRequest.recipient,
            status: friendRequest.status
        });

        // Verify authorization (only recipient can accept)
        if (friendRequest.recipient.toString() !== req.user.id) {
            console.log('❌ Unauthorized: User', req.user.id, 'trying to accept request for', friendRequest.recipient);
            return res.status(403).json({ message: "You are not authorized to accept this request" });
        }

        // Update friend request status
        console.log('🔄 Updating friend request status to accepted');
        friendRequest.status = "accepted";
        await friendRequest.save();

        // Add users to each other's friends list
        console.log('🔄 Adding users to each other\'s friends list');
        const sender = await User.findByIdAndUpdate(
            friendRequest.sender,
            { $addToSet: { friends: friendRequest.recipient } },
            { new: true }
        );

        const recipient = await User.findByIdAndUpdate(
            friendRequest.recipient,
            { $addToSet: { friends: friendRequest.sender } },
            { new: true }
        );

        console.log('✅ Friend request accepted successfully');
        console.log('Sender friends count:', sender.friends.length);
        console.log('Recipient friends count:', recipient.friends.length);

        res.status(200).json({ message: "Friend request accepted successfully" });
    } catch (error) {
        console.error("❌ Error in acceptFriendRequest controller:", error.message);
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Get incoming and accepted friend requests
 */
export const getFriendRequest = async (req, res) => {
    try {
        // Get incoming pending friend requests
        const incomingRequest = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage");

        // Get accepted friend requests where current user was the sender
        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted"
        }).populate("recipient", "fullName profilePic");

        res.status(200).json({ incomingRequest, acceptedReqs });
    } catch (error) {
        console.error("❌ Error in getFriendRequest controller:", error.message);
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};

/**
 * Get outgoing pending friend requests
 */
export const getOutgoingFriendRequest = async (req, res) => {
    try {
        const outgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending"
        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage");

        res.status(200).json(outgoingRequest);
    } catch (error) {
        console.error("❌ Error in getOutgoingFriendRequest controller:", error.message);
        console.error(error);
        res.status(500).json({ message: "Internal Server Error" });
    }
};
import FriendRequest from "../models/friendRequest.model.js";
import { User } from "../models/user.model.js";

export const getRecommendedUsers = async (req, res) => {
    try {
        const currentUserId = req.user.id;
        const currentUser = req.user;
        const recommendedUsers = await User.find({
            $and: [
                {
                    _id: { $ne: currentUserId }
                },
                {
                    _id: { $nin: currentUser.friends }
                },
                {
                    isOnboarded: true
                }
            ]
        }).select("-password");
        res.status(200).json({ recommendedUsers });
    } catch (error) {
        console.log("Error in getRecommendedUser controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const getFriends = async (req, res) => {
    // Implement getFriends logic here or remove if unused

    try {
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage")
        res.status(200).json(user.friends)
    } catch (error) {
        console.log("Error in getFriends controller", error.message)
        res.status(500).json({ message: "Internal Server Error" });
    }
};

export const sendFriendRequest = async (req, res) => {
    try {
        const myId = req.user.id
        const { id: recipientId } = req.params

        if (myId == recipientId) {
            return res.status(400).json({ message: "You can't send friend request to yourself" })
        }
        const recipient = await User.findById(recipientId)
        if (!recipient) {
            return res.status(400).json({ message: "Recipient not found " })
        }
        if (recipient.friends.includes(myId)) {
            return res.status(400).json({
                message: "You are already friends with this user"
            })
        }
        const existingRequest = await FriendRequest.findOne({
            $or: [
                {
                    sender: myId,
                    recipient: recipientId
                },
                {
                    sender: recipientId,
                    recipient: myId
                }
            ]
        })
        if (existingRequest) {
            return res.status(400).json({
                message: "a friend request already exists between you and this user"
            })
        }
        const friendRequest = await FriendRequest.create({
            sender: myId,
            recipient: recipientId
        })
        res.status(201).json({
            friendRequest
        })
    } catch (error) {
        console.error("Error in sendFriendRequest controller", error.message)
        res.status(500).json({
            message: "Internal server error "
        })
    }
}

export const acceptFriendRequest = async (req, res) => {
    try {
        const { id: requestId } = req.params
        const friendRequest = await FriendRequest.findById(requestId)
        if (!friendRequest) {
            return res.status(404).json({
                message: "Friend request not found "
            })
        }
        if (friendRequest.recipient.toString() !== req.user.id) {
            return res.status(403).json({
                message: "You are not authorized to accept his request"
            })
        }
        friendRequest.status = "accepted"
        await friendRequest.save()

        //add eachother id in both of friends array 
        await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {
                friends: friendRequest.recipient
            }
        })
        await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {
                friends: friendRequest.sender
            }
        })
        res.status(200).json({
            message: "friend request accepted "
        })

    } catch (error) {
        console.log("Error in acceptFriendRequest controller", error)
        res.status(500).json({
            message: "Internal server error "
        })
    }
}

export const getFriendRequest = async (req, res) => {
    try {
        const incomingRequest = await FriendRequest.find({
            recipient: req.user.id,
            status: "pending"
        }).populate("sender", "fullName profilePic nativeLanguage learningLanguage")
        const acceptedReqs = await FriendRequest.find({
            sender: req.user.id,
            status: "accepted",

        }).populate("recipient", "fullName profilePic");
        res.status(200).json({
            incomingRequest, acceptedReqs
        })
    } catch (error) {
        console.log("Error in getFriendRequest controller", error)
        res.status(500).json({
            message: "Internal server error "
        })
    }

}
export const getOutgoingFriendRequest = async (req, res) => {
    try {
        const OutgoingRequest = await FriendRequest.find({
            sender: req.user.id,
            status: "pending",

        }).populate("recipient", "fullName profilePic nativeLanguage learningLanguage")
        res.status(200).json(OutgoingRequest)
    }  catch (error) {
        console.log("Error in getOutgoingFriendRequest controller", error)
        res.status(500).json({
            message: "Internal server error "
        })
    }
}
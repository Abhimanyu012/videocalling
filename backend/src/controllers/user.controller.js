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
    try {
        console.log('🔄 Getting friends for user:', req.user.id)
        const user = await User.findById(req.user.id).select("friends").populate("friends", "fullName profilePic nativeLanguage learningLanguage location bio")
        
        if (!user) {
            console.log('❌ User not found:', req.user.id)
            return res.status(404).json({ message: "User not found" })
        }

        console.log('✅ Found', user.friends.length, 'friends for user:', req.user.id)
        console.log('Friends:', user.friends.map(f => ({ id: f._id, name: f.fullName })))
        
        res.status(200).json(user.friends)
    } catch (error) {
        console.log("❌ Error in getFriends controller:", error.message)
        console.error(error)
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
        console.log('🔄 Accepting friend request:', requestId, 'by user:', req.user.id)
        
        const friendRequest = await FriendRequest.findById(requestId)
        if (!friendRequest) {
            console.log('❌ Friend request not found:', requestId)
            return res.status(404).json({
                message: "Friend request not found "
            })
        }

        console.log('📝 Friend request details:', {
            sender: friendRequest.sender,
            recipient: friendRequest.recipient,
            status: friendRequest.status
        })

        if (friendRequest.recipient.toString() !== req.user.id) {
            console.log('❌ Unauthorized: User', req.user.id, 'trying to accept request for', friendRequest.recipient)
            return res.status(403).json({
                message: "You are not authorized to accept this request"
            })
        }

        console.log('🔄 Updating friend request status to accepted')
        friendRequest.status = "accepted"
        await friendRequest.save()

        //add each other's id in both friends arrays
        console.log('🔄 Adding users to each other\'s friends list')
        const sender = await User.findByIdAndUpdate(friendRequest.sender, {
            $addToSet: {
                friends: friendRequest.recipient
            }
        }, { new: true })

        const recipient = await User.findByIdAndUpdate(friendRequest.recipient, {
            $addToSet: {
                friends: friendRequest.sender
            }
        }, { new: true })

        console.log('✅ Friend request accepted successfully')
        console.log('Sender friends count:', sender.friends.length)
        console.log('Recipient friends count:', recipient.friends.length)

        res.status(200).json({
            message: "Friend request accepted successfully"
        })

    } catch (error) {
        console.log("❌ Error in acceptFriendRequest controller:", error.message)
        console.error(error)
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
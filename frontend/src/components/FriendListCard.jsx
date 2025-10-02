import { MapPin, MessageCircle, Video } from "lucide-react"
import { useNavigate } from "react-router-dom"
import { useStream } from "../contexts/StreamContext"
import { toast } from "react-hot-toast"

const getLanguageFlag = (language) => {
    const flags = {
        'English': '🇬🇧', 'Spanish': '🇪🇸', 'French': '🇫🇷', 'German': '🇩🇪',
        'Italian': '🇮🇹', 'Portuguese': '🇵🇹', 'Russian': '🇷🇺', 'Chinese': '🇨🇳'
    }
    return flags[language] || '🌍'
}

const FriendListCard = ({ friend }) => {
    const navigate = useNavigate()
    const { chatClient } = useStream()

    const handleStartChat = async () => {
        if (!chatClient) {
            toast.error("Chat not ready")
            return
        }
        try {
            const channelId = [chatClient.userID, friend._id].sort().join('-')
            const channel = chatClient.channel('messaging', channelId, {
                members: [chatClient.userID, friend._id],
                name: friend.fullName,
            })
            await channel.watch()
            toast.success(`Chat with ${friend.fullName}`)
            navigate('/chat')
        } catch (error) {
            toast.error("Failed to start chat")
        }
    }

    const handleStartCall = () => {
        const channelId = [chatClient?.userID, friend._id].sort().join('-')
        navigate(`/call?callId=${channelId}&friendId=${friend._id}`)
    }

    return (
        <div className="group bg-base-200 border border-base-300 rounded-xl p-4 hover:shadow-lg hover:border-primary transition-all">
            <div className="flex items-start gap-4">
                <div className="relative flex-shrink-0">
                    {friend.profilePic ? (
                        <img src={friend.profilePic} alt={friend.fullName} className="w-16 h-16 rounded-full object-cover shadow-md ring-2 ring-base-300" />
                    ) : (
                        <div className="w-16 h-16 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center text-primary-content text-xl font-bold shadow-md ring-2 ring-base-300">
                            {friend.fullName?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                    <div className="absolute -bottom-0.5 -right-0.5 w-4 h-4 bg-success border-2 border-base-100 rounded-full"></div>
                </div>
                <div className="flex-1 min-w-0">
                    <h3 className="font-semibold text-base-content text-base mb-1 truncate">{friend.fullName}</h3>
                    {friend.location && (
                        <div className="flex items-center gap-1 text-xs text-base-content/70 mb-2">
                            <MapPin className="w-3 h-3" />
                            <span className="truncate">{friend.location}</span>
                        </div>
                    )}
                    {friend.nativeLanguage && friend.learningLanguage && (
                        <div className="flex items-center gap-1.5 text-xs mb-3">
                            <span className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-md font-medium">
                                {getLanguageFlag(friend.nativeLanguage)} {friend.nativeLanguage}
                            </span>
                            <span className="text-base-content/50">↔</span>
                            <span className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-md font-medium">
                                {getLanguageFlag(friend.learningLanguage)} {friend.learningLanguage}
                            </span>
                        </div>
                    )}
                    <div className="flex gap-2">
                        <button onClick={handleStartChat} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-primary hover:bg-primary-focus text-primary-content rounded-lg text-xs font-medium transition-colors">
                            <MessageCircle className="w-3.5 h-3.5" />
                            Chat
                        </button>
                        <button onClick={handleStartCall} className="flex-1 flex items-center justify-center gap-1.5 px-3 py-1.5 bg-success hover:bg-success-focus text-success-content rounded-lg text-xs font-medium transition-colors">
                            <Video className="w-3.5 h-3.5" />
                            Call
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FriendListCard

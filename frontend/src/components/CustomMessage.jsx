import { useState } from 'react'
import { 
    MessageSimple,
    useMessageContext,
    useChannelStateContext
} from 'stream-chat-react'
import { 
    ThumbsUp, 
    Heart, 
    Smile, 
    Copy, 
    Reply, 
    MoreVertical,
    Check,
    CheckCheck
} from 'lucide-react'

const CustomMessage = (props) => {
    const { message, isMyMessage } = useMessageContext()
    const [showReactions, setShowReactions] = useState(false)
    const [copiedMessageId, setCopiedMessageId] = useState(null)

    const quickReactions = ['👍', '❤️', '😂', '😮', '😢', '🙏']

    const handleCopyMessage = () => {
        if (message.text) {
            navigator.clipboard.writeText(message.text)
            setCopiedMessageId(message.id)
            setTimeout(() => setCopiedMessageId(null), 2000)
        }
    }

    const handleReaction = async (emoji) => {
        try {
            // Add reaction logic here if needed
            setShowReactions(false)
        } catch (error) {
            console.error('Error adding reaction:', error)
        }
    }

    return (
        <div className={`group relative ${isMyMessage() ? 'flex justify-end' : 'flex justify-start'} mb-4`}>
            <div className={`max-w-[70%] ${isMyMessage() ? 'items-end' : 'items-start'} flex flex-col`}>
                {/* Message Bubble */}
                <div 
                    className={`relative px-4 py-2.5 rounded-2xl shadow-sm ${
                        isMyMessage() 
                            ? 'bg-primary text-primary-content rounded-br-sm' 
                            : 'bg-base-200 border border-base-300 text-base-content rounded-bl-sm'
                    }`}
                >
                    {/* Message Text */}
                    {message.text && (
                        <p className="text-sm leading-relaxed break-words">
                            {message.text}
                        </p>
                    )}

                    {/* Message Status (for own messages) */}
                    {isMyMessage() && (
                        <div className="flex items-center justify-end gap-1 mt-1">
                            {message.status === 'sending' && (
                                <span className="text-xs opacity-70">Sending...</span>
                            )}
                            {message.status === 'received' && (
                                <Check className="w-3 h-3 opacity-70" />
                            )}
                            {message.status === 'sent' && (
                                <CheckCheck className="w-3 h-3 opacity-70" />
                            )}
                        </div>
                    )}

                    {/* Quick Action Buttons (shown on hover) */}
                    <div 
                        className={`absolute ${
                            isMyMessage() ? 'left-0 -translate-x-full' : 'right-0 translate-x-full'
                        } top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity duration-200`}
                    >
                        <div className="flex items-center gap-1 mx-2">
                            <button
                                onClick={() => setShowReactions(!showReactions)}
                                className="p-1.5 bg-base-200 hover:bg-base-300 border border-base-300 rounded-full transition-all hover:scale-110"
                                title="React"
                            >
                                <Smile className="w-3.5 h-3.5 text-base-content" />
                            </button>
                            <button
                                onClick={handleCopyMessage}
                                className="p-1.5 bg-base-200 hover:bg-base-300 border border-base-300 rounded-full transition-all hover:scale-110"
                                title="Copy"
                            >
                                <Copy className="w-3.5 h-3.5 text-base-content" />
                            </button>
                        </div>
                    </div>

                    {/* Quick Reactions Popup */}
                    {showReactions && (
                        <div 
                            className={`absolute ${
                                isMyMessage() ? 'right-0' : 'left-0'
                            } -top-12 bg-base-200 border border-base-300 rounded-full shadow-lg px-2 py-1.5 flex items-center gap-1 z-10`}
                        >
                            {quickReactions.map((emoji, index) => (
                                <button
                                    key={index}
                                    onClick={() => handleReaction(emoji)}
                                    className="text-lg hover:scale-125 transition-transform"
                                >
                                    {emoji}
                                </button>
                            ))}
                        </div>
                    )}
                </div>

                {/* Timestamp */}
                <div className={`flex items-center gap-2 mt-1 px-2 ${isMyMessage() ? 'flex-row-reverse' : 'flex-row'}`}>
                    <span className="text-xs text-base-content/70">
                        {new Date(message.created_at).toLocaleTimeString([], { 
                            hour: '2-digit', 
                            minute: '2-digit' 
                        })}
                    </span>
                    {copiedMessageId === message.id && (
                        <span className="text-xs text-success font-medium">Copied!</span>
                    )}
                </div>

                {/* Reactions Display */}
                {message.reaction_counts && Object.keys(message.reaction_counts).length > 0 && (
                    <div className={`flex gap-1 mt-1 ${isMyMessage() ? 'justify-end' : 'justify-start'}`}>
                        {Object.entries(message.reaction_counts).map(([type, count]) => (
                            <div 
                                key={type}
                                className="flex items-center gap-1 px-2 py-0.5 bg-base-200 border border-base-300 rounded-full text-xs"
                            >
                                <span>{type}</span>
                                <span className="text-base-content/70">{count}</span>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    )
}

export default CustomMessage

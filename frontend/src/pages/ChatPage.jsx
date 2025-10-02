import { useEffect, useState } from 'react'
import { 
    Chat, 
    Channel, 
    MessageInput, 
    MessageList, 
    Thread, 
    Window, 
    ChannelList,
    MessageSimple,
    useChannelStateContext,
    Avatar
} from 'stream-chat-react'
import { useStream } from '../contexts/StreamContext'
import { 
    MessageCircle, 
    Video, 
    Phone, 
    Search, 
    MoreVertical,
    ArrowLeft,
    Users,
    Bell,
    Hash,
    Clock
} from 'lucide-react'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-hot-toast'
import ChatEmptyState from '../components/ChatEmptyState'
import ThemeSelector from '../components/ThemeSelector'
import 'stream-chat-react/dist/css/v2/index.css'

// Modern Channel Preview Component
const CustomChannelPreview = (props) => {
    const { channel, activeChannel, setActiveChannel } = props
    const isActive = channel?.id === activeChannel?.id
    const members = Object.values(channel.state?.members || {})
    const otherMember = members.find(member => member.user?.id !== channel._client.userID)
    const unreadCount = channel.state?.unreadCount || 0
    const lastMessage = channel.state?.messages[channel.state?.messages.length - 1]
    const isOnline = otherMember?.user?.online

    const formatTime = (date) => {
        if (!date) return ''
        const messageDate = new Date(date)
        const now = new Date()
        const diffInHours = Math.floor((now - messageDate) / (1000 * 60 * 60))
        
        if (diffInHours < 1) {
            const diffInMinutes = Math.floor((now - messageDate) / (1000 * 60))
            return diffInMinutes < 1 ? 'Just now' : `${diffInMinutes}m`
        } else if (diffInHours < 24) {
            return `${diffInHours}h`
        } else {
            return messageDate.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })
        }
    }

    return (
        <div
            onClick={() => setActiveChannel(channel)}
            className={`relative flex items-center gap-3 p-4 cursor-pointer transition-all duration-300 border-b border-base-300/50 hover:bg-base-300/30 group ${
                isActive ? 'bg-primary/5 border-l-4 border-l-primary' : 'border-l-4 border-l-transparent'
            }`}
        >
            {/* Avatar with online status */}
            <div className="relative flex-shrink-0">
                <div className="w-12 h-12 rounded-full overflow-hidden ring-2 ring-base-300 group-hover:ring-primary/30 transition-all">
                    {otherMember?.user?.image ? (
                        <img 
                            src={otherMember.user.image} 
                            alt={otherMember.user.name || 'User'} 
                            className="w-full h-full object-cover"
                        />
                    ) : (
                        <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-semibold text-lg">
                            {(otherMember?.user?.name || 'U')[0].toUpperCase()}
                        </div>
                    )}
                </div>
                {isOnline && (
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-success rounded-full border-2 border-base-200"></div>
                )}
            </div>

            {/* Message preview content */}
            <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between mb-1">
                    <h3 className={`font-semibold text-sm truncate ${isActive ? 'text-primary' : 'text-base-content'} ${unreadCount > 0 ? 'font-bold' : ''}`}>
                        {otherMember?.user?.name || 'Unknown User'}
                    </h3>
                    {lastMessage?.created_at && (
                        <span className={`text-xs flex-shrink-0 ml-2 ${isActive ? 'text-primary' : 'text-base-content/70'}`}>
                            {formatTime(lastMessage.created_at)}
                        </span>
                    )}
                </div>
                
                <div className="flex items-center justify-between">
                    <p className={`text-sm truncate flex-1 ${unreadCount > 0 ? 'font-semibold text-base-content' : 'text-base-content/70'}`}>
                        {lastMessage?.text || 'No messages yet'}
                    </p>
                    
                    {unreadCount > 0 && (
                        <span className="flex-shrink-0 ml-2 min-w-[20px] h-5 px-1.5 flex items-center justify-center bg-primary text-primary-content text-xs font-bold rounded-full">
                            {unreadCount > 99 ? '99+' : unreadCount}
                        </span>
                    )}
                </div>
            </div>
        </div>
    )
}

// Modern Channel Header Component
const CustomChannelHeader = ({ onBack, onVideoCall, onVoiceCall }) => {
    const { channel } = useChannelStateContext()
    const members = Object.values(channel.state?.members || {})
    const otherMember = members.find(member => member.user?.id !== channel._client.userID)
    const [showMenu, setShowMenu] = useState(false)
    const isOnline = otherMember?.user?.online

    return (
        <div className="flex-shrink-0 bg-base-200/80 backdrop-blur-sm border-b-2 border-base-300/50 px-4 py-3 shadow-sm relative z-40">
            <div className="flex items-center justify-between gap-3">
                {/* Left section - User info */}
                <div className="flex items-center gap-3 flex-1 min-w-0">
                    {/* Back button - mobile only */}
                    <button 
                        onClick={onBack}
                        className="lg:hidden flex-shrink-0 w-9 h-9 flex items-center justify-center rounded-full hover:bg-base-300 active:scale-95 transition-all"
                        title="Back to conversations"
                    >
                        <ArrowLeft className="w-5 h-5 text-base-content" />
                    </button>

                    {/* Avatar */}
                    <div className="relative flex-shrink-0">
                        <div className="w-10 h-10 rounded-full overflow-hidden ring-2 ring-base-300">
                            {otherMember?.user?.image ? (
                                <img 
                                    src={otherMember.user.image} 
                                    alt={otherMember.user.name || 'User'} 
                                    className="w-full h-full object-cover"
                                />
                            ) : (
                                <div className="w-full h-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-content font-semibold">
                                    {(otherMember?.user?.name || 'U')[0].toUpperCase()}
                                </div>
                            )}
                        </div>
                        {isOnline && (
                            <div className="absolute bottom-0 right-0 w-3 h-3 bg-success rounded-full border-2 border-base-200"></div>
                        )}
                    </div>

                    {/* User name and status */}
                    <div className="flex-1 min-w-0">
                        <h2 className="font-bold text-base-content truncate text-sm">
                            {otherMember?.user?.name || 'Unknown User'}
                        </h2>
                        <p className="text-xs text-base-content/70 flex items-center gap-1">
                            {isOnline ? (
                                <>
                                    <span className="w-1.5 h-1.5 bg-success rounded-full animate-pulse"></span>
                                    Active now
                                </>
                            ) : (
                                <>
                                    <Clock className="w-3 h-3" />
                                    Offline
                                </>
                            )}
                        </p>
                    </div>
                </div>

                {/* Right section - Action buttons */}
                <div className="flex items-center gap-1.5 flex-shrink-0">
                    {/* Theme Selector */}
                    <div className="mr-1">
                        <ThemeSelector />
                    </div>

                    <button 
                        onClick={onVoiceCall}
                        className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-success/10 hover:bg-success hover:scale-110 transition-all group"
                        title="Voice Call"
                    >
                        <Phone className="w-4 h-4 lg:w-5 lg:h-5 text-success group-hover:text-success-content" />
                    </button>
                    
                    <button 
                        onClick={onVideoCall}
                        className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full bg-primary/10 hover:bg-primary hover:scale-110 transition-all group"
                        title="Video Call"
                    >
                        <Video className="w-4 h-4 lg:w-5 lg:h-5 text-primary group-hover:text-primary-content" />
                    </button>

                    {/* More options menu */}
                    <div className="relative z-50">
                        <button 
                            onClick={() => setShowMenu(!showMenu)}
                            className="w-9 h-9 lg:w-10 lg:h-10 flex items-center justify-center rounded-full hover:bg-base-300 active:scale-95 transition-all"
                            title="More options"
                        >
                            <MoreVertical className="w-5 h-5 text-base-content" />
                        </button>

                        {showMenu && (
                            <>
                                <div 
                                    className="fixed inset-0 z-[100]" 
                                    onClick={() => setShowMenu(false)}
                                ></div>
                                <div className="absolute right-0 top-full mt-2 w-48 bg-base-200 rounded-lg shadow-2xl border border-base-300 py-2 z-[110]">
                                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-base-300 transition-colors flex items-center gap-3 text-base-content">
                                        <Users className="w-4 h-4" />
                                        View Profile
                                    </button>
                                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-base-300 transition-colors flex items-center gap-3 text-base-content">
                                        <Bell className="w-4 h-4" />
                                        Notifications
                                    </button>
                                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-base-300 transition-colors flex items-center gap-3 text-base-content">
                                        <Hash className="w-4 h-4" />
                                        Search in Chat
                                    </button>
                                    <div className="my-1 h-px bg-base-300"></div>
                                    <button className="w-full px-4 py-2.5 text-left text-sm hover:bg-error/10 transition-colors flex items-center gap-3 text-error">
                                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                        </svg>
                                        Delete Chat
                                    </button>
                                </div>
                            </>
                        )}
                    </div>
                </div>
            </div>
        </div>
    )
}

const ChatPage = () => {
    const { chatClient, isInitialized } = useStream()
    const [activeChannel, setActiveChannel] = useState(null)
    const [showChannelList, setShowChannelList] = useState(true)
    const [searchQuery, setSearchQuery] = useState('')
    const navigate = useNavigate()

    const filters = { 
        type: 'messaging', 
        members: { $in: [chatClient?.userID] } 
    }
    
    const sort = { last_message_at: -1 }
    const options = { limit: 30, state: true, watch: true, presence: true }

    useEffect(() => {
        if (chatClient && isInitialized) {
            console.log('✅ Chat client ready:', chatClient.userID)
        }
    }, [chatClient, isInitialized])

    const handleChannelSelect = (channel) => {
        console.log('📱 Channel selected:', channel.id)
        setActiveChannel(channel)
        setShowChannelList(false)
    }

    const handleBackToList = () => {
        setShowChannelList(true)
        setActiveChannel(null)
    }

    const handleStartVideoCall = () => {
        if (!activeChannel) {
            toast.error('No active channel')
            return
        }
        console.log('📹 Starting video call for channel:', activeChannel.id)
        navigate(`/call?channel=${activeChannel.id}`)
    }

    const handleStartVoiceCall = () => {
        if (!activeChannel) {
            toast.error('No active channel')
            return
        }
        console.log('📞 Starting voice call for channel:', activeChannel.id)
        toast.success('Voice call feature coming soon!')
        // navigate(`/call?channel=${activeChannel.id}&videoOff=true`)
    }

    if (!isInitialized || !chatClient) {
        return (
            <div className="h-screen w-screen flex items-center justify-center bg-base-100">
                <div className="flex flex-col items-center gap-4">
                    <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
                    <p className="text-base-content/70 text-lg font-medium">Connecting to chat...</p>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen w-screen bg-base-100 overflow-hidden">
            <Chat client={chatClient} theme="str-chat__theme-light">
                <div className="flex h-full w-full">
                    {/* Sidebar - Channel List */}
                    <div className={`${showChannelList ? 'flex' : 'hidden'} lg:flex w-full lg:w-80 xl:w-96 bg-base-200 border-r-2 border-base-300/50 flex-col flex-shrink-0 shadow-lg`}>
                        {/* Sidebar Header - Fixed */}
                        <div className="flex-shrink-0 bg-gradient-to-r from-primary via-primary to-secondary p-4 shadow-md">
                            <div className="flex items-center gap-3 mb-4">
                                <button 
                                    onClick={() => navigate('/')}
                                    className="w-9 h-9 flex items-center justify-center rounded-full bg-primary-content/20 hover:bg-primary-content/30 active:scale-95 transition-all backdrop-blur-sm"
                                    title="Back to Home"
                                >
                                    <ArrowLeft className="w-5 h-5 text-primary-content" />
                                </button>
                                
                                <div className="flex-1 min-w-0">
                                    <div className="flex items-center gap-2">
                                        <div className="w-10 h-10 bg-primary-content/20 rounded-xl flex items-center justify-center backdrop-blur-sm">
                                            <MessageCircle className="w-6 h-6 text-primary-content" />
                                        </div>
                                        <div>
                                            <h1 className="text-xl font-bold text-primary-content">Messages</h1>
                                            <p className="text-xs text-primary-content/90">Stay connected</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            
                            {/* Modern Search Bar */}
                            <div className="relative">
                                <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                                    <Search className="w-4 h-4 text-base-content/60" />
                                </div>
                                <input
                                    type="text"
                                    placeholder="Search conversations..."
                                    value={searchQuery}
                                    onChange={(e) => setSearchQuery(e.target.value)}
                                    className="w-full pl-10 pr-4 py-2.5 bg-base-100 text-base-content placeholder:text-base-content/60 rounded-lg border-2 border-transparent focus:border-primary focus:outline-none focus:ring-4 focus:ring-primary/20 transition-all"
                                />
                            </div>
                        </div>

                        {/* Channel List - Scrollable */}
                        <div className="flex-1 overflow-y-auto overflow-x-hidden bg-base-200">
                            <ChannelList
                                filters={filters}
                                sort={sort}
                                options={options}
                                Preview={(previewProps) => (
                                    <CustomChannelPreview 
                                        {...previewProps} 
                                        activeChannel={activeChannel}
                                        setActiveChannel={handleChannelSelect}
                                    />
                                )}
                            />
                        </div>
                    </div>

                    {/* Main Chat Area */}
                    <div className={`${showChannelList ? 'hidden' : 'flex'} lg:flex flex-1 flex-col bg-base-100 min-w-0 h-full`}>
                        {activeChannel ? (
                            <Channel channel={activeChannel} Message={MessageSimple}>
                                <Window>
                                    <CustomChannelHeader 
                                        onBack={handleBackToList}
                                        onVideoCall={handleStartVideoCall}
                                        onVoiceCall={handleStartVoiceCall}
                                    />
                                    
                                    <MessageList />
                                    
                                    <div className="flex-shrink-0">
                                        <MessageInput 
                                            grow
                                            mentionAllAppUsers={false}
                                            focus
                                        />
                                    </div>
                                </Window>
                                
                                <Thread />
                            </Channel>
                        ) : (
                            <ChatEmptyState onShowChannelList={() => setShowChannelList(true)} />
                        )}
                    </div>
                </div>
            </Chat>
        </div>
    )
}

export default ChatPage
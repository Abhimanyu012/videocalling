import { MessageCircle, Video, Phone, Users, Sparkles } from 'lucide-react'

const ChatEmptyState = ({ onShowChannelList }) => {
    const features = [
        {
            icon: MessageCircle,
            title: 'Instant Messaging',
            description: 'Send text messages in real-time'
        },
        {
            icon: Video,
            title: 'Video Calls',
            description: 'Face-to-face conversations'
        },
        {
            icon: Phone,
            title: 'Voice Calls',
            description: 'Crystal clear audio chats'
        },
        {
            icon: Users,
            title: 'Group Chats',
            description: 'Chat with multiple friends'
        }
    ]

    return (
        <div className="flex-1 flex items-center justify-center bg-base-100 p-8">
            <div className="max-w-2xl w-full text-center">
                {/* Animated Icon */}
                <div className="relative mb-12 inline-block">
                    {/* Main Circle */}
                    <div className="relative w-40 h-40 mx-auto">
                        <div className="absolute inset-0 bg-primary/20 rounded-full animate-pulse"></div>
                        <div className="absolute inset-4 bg-primary rounded-full flex items-center justify-center shadow-2xl">
                            <MessageCircle className="w-16 h-16 text-primary-content animate-bounce" />
                        </div>
                    </div>
                    
                    {/* Floating Icons */}
                    <div className="absolute -top-4 -right-4 w-16 h-16 bg-success rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.2s' }}>
                        <Video className="w-8 h-8 text-success-content" />
                    </div>
                    <div className="absolute -bottom-4 -left-4 w-12 h-12 bg-accent rounded-full flex items-center justify-center shadow-lg animate-bounce" style={{ animationDelay: '0.4s' }}>
                        <Sparkles className="w-6 h-6 text-accent-content" />
                    </div>
                    <div className="absolute top-1/2 -right-12 w-10 h-10 bg-secondary rounded-full flex items-center justify-center shadow-lg animate-pulse">
                        <Phone className="w-5 h-5 text-secondary-content" />
                    </div>
                </div>

                {/* Heading */}
                <h2 className="text-4xl md:text-5xl font-bold text-base-content mb-4">
                    Start a Conversation
                </h2>
                <p className="text-lg text-base-content opacity-70 mb-12 max-w-md mx-auto">
                    Select a friend from your conversations to start chatting, 
                    or make a video call to connect instantly!
                </p>

                {/* Mobile Button */}
                <button 
                    onClick={onShowChannelList}
                    className="lg:hidden mb-12 btn btn-primary btn-lg"
                >
                    View My Conversations
                </button>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                    {features.map((feature, index) => {
                        const Icon = feature.icon
                        return (
                            <div 
                                key={index}
                                className="card bg-base-200 shadow-md hover:shadow-xl border border-base-300 transition-all duration-300 hover:-translate-y-1"
                            >
                                <div className="card-body p-6">
                                    <div className="w-12 h-12 mb-4 bg-primary rounded-xl flex items-center justify-center shadow-lg">
                                        <Icon className="w-6 h-6 text-primary-content" />
                                    </div>
                                    <h3 className="card-title text-base text-base-content">
                                        {feature.title}
                                    </h3>
                                    <p className="text-sm text-base-content opacity-70">
                                        {feature.description}
                                    </p>
                                </div>
                            </div>
                        )
                    })}
                </div>

                {/* Tips */}
                <div className="alert alert-info shadow-lg">
                    <div className="flex items-start gap-4">
                        <div className="w-10 h-10 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                            <Sparkles className="w-5 h-5 text-primary-content" />
                        </div>
                        <div className="text-left">
                            <h4 className="font-semibold text-base-content mb-2">💡 Pro Tip</h4>
                            <p className="text-sm text-base-content opacity-80">
                                Click on any conversation to send instant messages, share files, 
                                or start a video call with just one click!
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ChatEmptyState

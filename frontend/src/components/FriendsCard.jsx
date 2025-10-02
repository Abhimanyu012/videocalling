import { UserPlus, Check, MapPin, User } from "lucide-react"

// Language to country flag emoji mapping
const getLanguageFlag = (language) => {
    const languageFlags = {
        'English': '🇬🇧',
        'Spanish': '🇪🇸',
        'French': '🇫🇷',
        'German': '🇩🇪',
        'Italian': '🇮🇹',
        'Portuguese': '🇵🇹',
        'Russian': '🇷🇺',
        'Chinese': '🇨🇳',
        'Japanese': '🇯🇵',
        'Korean': '🇰🇷',
        'Arabic': '🇸🇦',
        'Hindi': '🇮🇳',
        'Turkish': '🇹🇷',
        'Dutch': '🇳🇱',
        'Polish': '🇵🇱',
        'Swedish': '🇸🇪',
        'Norwegian': '🇳🇴',
        'Danish': '🇩🇰',
        'Finnish': '🇫🇮',
        'Greek': '🇬🇷',
        'Czech': '🇨🇿',
        'Thai': '🇹🇭',
        'Vietnamese': '🇻🇳',
        'Indonesian': '🇮🇩',
        'Malay': '🇲🇾',
        'Hebrew': '🇮🇱',
        'Ukrainian': '🇺🇦',
    }
    return languageFlags[language] || '🌍'
}

const FriendsCard = ({ user, onSendFriendRequest, isPending, isRequestSent }) => {
    return (
        <div className="group relative bg-gradient-to-br from-base-100 to-base-200 border border-base-300 rounded-xl p-5 hover:shadow-xl hover:border-primary transition-all duration-300">
            <div className="flex flex-col items-center text-center gap-4">
                {/* Avatar */}
                <div className="relative">
                    {user.profilePic ? (
                        <img 
                            src={user.profilePic} 
                            alt={user.fullName || user.name}
                            className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-base-100"
                        />
                    ) : (
                        <div className="w-20 h-20 bg-gradient-to-br from-primary via-secondary to-accent rounded-full flex items-center justify-center text-primary-content text-2xl font-bold shadow-lg ring-4 ring-base-100">
                            {user.fullName?.charAt(0).toUpperCase() || user.name?.charAt(0).toUpperCase() || 'U'}
                        </div>
                    )}
                    <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-4 border-base-100 rounded-full"></div>
                </div>

                {/* User Info */}
                <div className="flex-1 w-full space-y-3">
                    <div>
                        <h3 className="font-semibold text-base-content text-lg mb-1 truncate">
                            {user.fullName || user.name}
                        </h3>
                        {user.location && (
                            <div className="flex items-center justify-center gap-1 text-xs text-base-content/60">
                                <MapPin className="w-3 h-3" />
                                <span>{user.location}</span>
                            </div>
                        )}
                    </div>
                    
                    {/* Languages */}
                    {user.nativeLanguage && user.learningLanguage && (
                        <div className="flex items-center justify-center gap-2 text-xs">
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-primary/10 text-primary rounded-full font-medium">
                                <span className="text-base">{getLanguageFlag(user.nativeLanguage)}</span>
                                <span>{user.nativeLanguage}</span>
                            </div>
                            <span className="text-base-content/40">→</span>
                            <div className="flex items-center gap-1.5 px-2.5 py-1.5 bg-secondary/10 text-secondary rounded-full font-medium">
                                <span className="text-base">{getLanguageFlag(user.learningLanguage)}</span>
                                <span>{user.learningLanguage}</span>
                            </div>
                        </div>
                    )}
                    
                    {/* Bio */}
                    {user.bio && (
                        <p className="text-xs text-base-content/70 line-clamp-2 px-2">
                            "{user.bio}"
                        </p>
                    )}
                </div>

                {/* Action Button */}
                <button 
                    onClick={() => onSendFriendRequest(user._id)}
                    disabled={isPending || isRequestSent}
                    className={`w-full px-4 py-2.5 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 ${
                        isRequestSent
                            ? 'bg-green-50 text-green-700 border-2 border-green-200 cursor-not-allowed'
                            : 'bg-gradient-to-r from-blue-500 to-blue-600 text-white hover:from-blue-600 hover:to-blue-700 shadow-md hover:shadow-lg active:scale-95'
                    } disabled:opacity-60`}
                >
                    {isRequestSent ? (
                        <>
                            <Check className="w-4 h-4" />
                            Request Sent
                        </>
                    ) : (
                        <>
                            <UserPlus className="w-4 h-4" />
                            Add Friend
                        </>
                    )}
                </button>
            </div>
        </div>
    )
}

export default FriendsCard
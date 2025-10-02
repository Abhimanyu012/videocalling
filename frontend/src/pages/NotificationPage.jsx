import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { getFriendRequests, acceptFriendRequest } from "../lib/api"
import { Bell, Check, X, UserPlus, CheckCircle, MapPin } from "lucide-react"
import { toast } from "react-hot-toast"

// Language to country flag emoji mapping
const getLanguageFlag = (language) => {
    const languageFlags = {
        'English': '🇬🇧', 'Spanish': '🇪🇸', 'French': '🇫🇷', 'German': '🇩🇪',
        'Italian': '🇮🇹', 'Portuguese': '🇵🇹', 'Russian': '🇷🇺', 'Chinese': '🇨🇳',
        'Japanese': '🇯🇵', 'Korean': '🇰🇷', 'Arabic': '🇸🇦', 'Hindi': '🇮🇳',
        'Turkish': '🇹🇷', 'Dutch': '🇳🇱', 'Polish': '🇵🇱', 'Swedish': '🇸🇪',
        'Norwegian': '🇳🇴', 'Danish': '🇩🇰', 'Finnish': '🇫🇮', 'Greek': '🇬🇷',
        'Czech': '🇨🇿', 'Thai': '🇹🇭', 'Vietnamese': '🇻🇳', 'Indonesian': '🇮🇩',
        'Malay': '🇲🇾', 'Hebrew': '🇮🇱', 'Ukrainian': '🇺🇦',
    }
    return languageFlags[language] || '🌍'
}

const NotificationPage = () => {
    const queryClient = useQueryClient()

    const { data, isLoading } = useQuery({
        queryKey: ["friendRequests"],
        queryFn: getFriendRequests
    })

    const { mutate: acceptRequest, isPending } = useMutation({
        mutationFn: acceptFriendRequest,
        onSuccess: () => {
            toast.success("Friend request accepted!")
            queryClient.invalidateQueries({ queryKey: ["friendRequests"] })
            queryClient.invalidateQueries({ queryKey: ["friends"] })
        },
        onError: (error) => {
            toast.error(error.response?.data?.message || "Failed to accept request")
        }
    })

    const incomingRequests = data?.incomingRequest || []
    const acceptedRequests = data?.acceptedReqs || []

    if (isLoading) {
        return (
            <div className="min-h-screen bg-base-100 flex items-center justify-center">
                <div className="loading loading-spinner loading-lg text-primary"></div>
            </div>
        )
    }

    return (
        <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
            <div className="container mx-auto max-w-6xl">
                {/* Header */}
                <div className="mb-8 bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
                    <div className="flex items-center gap-4">
                        <div className="p-3 bg-primary rounded-xl shadow-md">
                            <Bell className="w-6 h-6 text-primary-content" />
                        </div>
                        <div>
                            <h1 className="text-2xl sm:text-3xl font-bold text-base-content">Notifications</h1>
                            <p className="text-sm text-base-content opacity-60 mt-1">
                                Manage your friend requests
                            </p>
                        </div>
                    </div>
                </div>

                {/* Incoming Friend Requests */}
                <div className="mb-8 bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
                    <div className="flex items-center gap-3 mb-6">
                        <UserPlus className="w-5 h-5 text-primary" />
                        <h2 className="text-xl font-bold text-base-content">
                            Incoming Requests ({incomingRequests.length})
                        </h2>
                    </div>

                    {incomingRequests.length === 0 ? (
                        <div className="text-center py-12">
                            <UserPlus className="mx-auto h-12 w-12 text-base-content opacity-40 mb-4" />
                            <p className="text-base-content opacity-60">No pending friend requests</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
                            {incomingRequests.map((request) => (
                                <div
                                    key={request._id}
                                    className="bg-gradient-to-br from-white to-slate-50 border border-slate-200 rounded-xl p-5 hover:shadow-lg transition-all duration-300"
                                >
                                    <div className="flex flex-col items-center text-center gap-4">
                                        {/* Avatar */}
                                        <div className="relative">
                                            {request.sender.profilePic ? (
                                                <img
                                                    src={request.sender.profilePic}
                                                    alt={request.sender.fullName}
                                                    className="w-20 h-20 rounded-full object-cover shadow-lg ring-4 ring-base-100"
                                                />
                                            ) : (
                                                <div className="w-20 h-20 bg-gradient-to-br from-primary to-secondary rounded-full flex items-center justify-center text-primary-content text-2xl font-bold shadow-lg ring-4 ring-base-100">
                                                    {request.sender.fullName?.charAt(0).toUpperCase() || 'U'}
                                                </div>
                                            )}
                                            <div className="absolute -bottom-1 -right-1 w-6 h-6 bg-success border-4 border-base-100 rounded-full"></div>
                                        </div>

                                        {/* User Info */}
                                        <div className="flex-1 w-full">
                                            <h3 className="font-semibold text-base-content text-lg mb-1 truncate">
                                                {request.sender.fullName}
                                            </h3>

                                            {/* Languages */}
                                            {request.sender.nativeLanguage && request.sender.learningLanguage && (
                                                <div className="flex items-center justify-center gap-2 text-xs mb-2">
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                                                        <span className="text-base">{getLanguageFlag(request.sender.nativeLanguage)}</span>
                                                        <span>{request.sender.nativeLanguage}</span>
                                                    </div>
                                                    <span className="text-base-content opacity-40">→</span>
                                                    <div className="flex items-center gap-1 px-2 py-1 bg-secondary/10 text-secondary rounded-full font-medium">
                                                        <span className="text-base">{getLanguageFlag(request.sender.learningLanguage)}</span>
                                                        <span>{request.sender.learningLanguage}</span>
                                                    </div>
                                                </div>
                                            )}

                                            <p className="text-xs text-base-content opacity-60">
                                                Sent {new Date(request.createdAt).toLocaleDateString()}
                                            </p>
                                        </div>

                                        {/* Action Buttons */}
                                        <div className="flex gap-2 w-full">
                                            <button
                                                onClick={() => acceptRequest(request._id)}
                                                disabled={isPending}
                                                className="flex-1 btn btn-success btn-sm gap-2"
                                            >
                                                <Check className="w-4 h-4" />
                                                Accept
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Accepted Requests */}
                <div className="bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
                    <div className="flex items-center gap-3 mb-6">
                        <CheckCircle className="w-5 h-5 text-success" />
                        <h2 className="text-xl font-bold text-base-content">
                            Accepted Requests ({acceptedRequests.length})
                        </h2>
                    </div>

                    {acceptedRequests.length === 0 ? (
                        <div className="text-center py-12">
                            <CheckCircle className="mx-auto h-12 w-12 text-base-content opacity-40 mb-4" />
                            <p className="text-base-content opacity-60">No accepted requests yet</p>
                        </div>
                    ) : (
                        <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                            {acceptedRequests.map((request) => (
                                <div
                                    key={request._id}
                                    className="bg-success/10 border border-success/30 rounded-xl p-4 text-center"
                                >
                                    {request.recipient.profilePic ? (
                                        <img
                                            src={request.recipient.profilePic}
                                            alt={request.recipient.fullName}
                                            className="w-16 h-16 mx-auto rounded-full object-cover shadow-md mb-3"
                                        />
                                    ) : (
                                        <div className="w-16 h-16 mx-auto bg-success rounded-full flex items-center justify-center text-success-content text-xl font-bold shadow-md mb-3">
                                            {request.recipient.fullName?.charAt(0).toUpperCase() || 'U'}
                                        </div>
                                    )}
                                    <h4 className="font-semibold text-base-content text-sm truncate">
                                        {request.recipient.fullName}
                                    </h4>
                                    <p className="text-xs text-success mt-1 flex items-center justify-center gap-1">
                                        <CheckCircle className="w-3 h-3" />
                                        Accepted
                                    </p>
                                </div>
                            ))}
                        </div>
                    )}
                </div>
            </div>
        </div>
    )
}

export default NotificationPage
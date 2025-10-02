import { useEffect, useState } from 'react'
import { useSearchParams, useNavigate } from 'react-router-dom'
import {
    CallControls,
    CallingState,
    SpeakerLayout,
    StreamCall,
    StreamTheme,
    useCallStateHooks,
    ParticipantView,
} from '@stream-io/video-react-sdk'
import { useStream } from '../contexts/StreamContext'
import { 
    Video, 
    Phone, 
    PhoneOff, 
    Mic, 
    MicOff, 
    VideoOff, 
    Monitor, 
    Users,
    MessageSquare,
    Settings,
    Maximize2,
    Minimize2,
    Grid3x3,
    LayoutGrid,
    User,
    Clock,
    WifiOff,
    Wifi,
    Volume2,
    VolumeX
} from 'lucide-react'
import { toast } from 'react-hot-toast'
import '@stream-io/video-react-sdk/dist/css/styles.css'

const CallPage = () => {
    const { videoClient, isInitialized } = useStream()
    const [searchParams] = useSearchParams()
    const navigate = useNavigate()
    const [call, setCall] = useState(null)
    const [isCreatingCall, setIsCreatingCall] = useState(false)

    const callId = searchParams.get('channel') || searchParams.get('callId')
    const friendId = searchParams.get('friendId')

    useEffect(() => {
        if (!isInitialized || !videoClient || !callId) return

        const initCall = async () => {
            setIsCreatingCall(true)
            try {
                const newCall = videoClient.call('default', callId)
                
                // Join or create the call
                await newCall.join({ create: true })
                
                setCall(newCall)
            } catch (error) {
                console.error('Error initializing call:', error)
            } finally {
                setIsCreatingCall(false)
            }
        }

        initCall()

        return () => {
            if (call) {
                call.leave()
            }
        }
    }, [videoClient, isInitialized, callId])

    const handleLeaveCall = async () => {
        if (call) {
            await call.leave()
        }
        navigate('/chat')
    }

    if (!isInitialized || !videoClient || isCreatingCall) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-500 mx-auto mb-4"></div>
                    <p className="text-white text-lg">Starting call...</p>
                </div>
            </div>
        )
    }

    if (!call) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center">
                <div className="text-center">
                    <Video className="w-16 h-16 text-red-500 mx-auto mb-4" />
                    <p className="text-white text-lg">Unable to initialize call</p>
                    <button
                        onClick={() => navigate('/chat')}
                        className="mt-4 px-6 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors"
                    >
                        Back to Chat
                    </button>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800">
            <StreamCall call={call}>
                <StreamTheme>
                    <CallUI onLeave={handleLeaveCall} />
                </StreamTheme>
            </StreamCall>
        </div>
    )
}

const CallUI = ({ onLeave }) => {
    const { useCallCallingState, useParticipants, useLocalParticipant, useMicrophoneState, useCameraState } = useCallStateHooks()
    const callingState = useCallCallingState()
    const participants = useParticipants()
    const localParticipant = useLocalParticipant()
    const { microphone, isMute: isMicMuted } = useMicrophoneState()
    const { camera, isMute: isCameraMuted } = useCameraState()
    
    const [callDuration, setCallDuration] = useState(0)
    const [isFullScreen, setIsFullScreen] = useState(false)
    const [showSettings, setShowSettings] = useState(false)
    const [showParticipants, setShowParticipants] = useState(false)
    const [viewMode, setViewMode] = useState('speaker') // 'speaker' or 'grid'
    const [networkStatus, setNetworkStatus] = useState('good')

    // Call duration timer
    useEffect(() => {
        if (callingState === CallingState.JOINED) {
            const timer = setInterval(() => {
                setCallDuration(prev => prev + 1)
            }, 1000)
            return () => clearInterval(timer)
        }
    }, [callingState])

    // Format call duration
    const formatDuration = (seconds) => {
        const hrs = Math.floor(seconds / 3600)
        const mins = Math.floor((seconds % 3600) / 60)
        const secs = seconds % 60
        if (hrs > 0) {
            return `${hrs}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`
        }
        return `${mins}:${secs.toString().padStart(2, '0')}`
    }

    // Toggle fullscreen
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen()
            setIsFullScreen(true)
        } else {
            document.exitFullscreen()
            setIsFullScreen(false)
        }
    }

    // Toggle microphone
    const toggleMic = async () => {
        try {
            if (isMicMuted) {
                await microphone.enable()
                toast.success('Microphone enabled')
            } else {
                await microphone.disable()
                toast.success('Microphone muted')
            }
        } catch (error) {
            toast.error('Failed to toggle microphone')
            console.error('Mic toggle error:', error)
        }
    }

    // Toggle camera
    const toggleCamera = async () => {
        try {
            if (isCameraMuted) {
                await camera.enable()
                toast.success('Camera enabled')
            } else {
                await camera.disable()
                toast.success('Camera disabled')
            }
        } catch (error) {
            toast.error('Failed to toggle camera')
            console.error('Camera toggle error:', error)
        }
    }

    if (callingState === CallingState.JOINING) {
        return (
            <div className="h-screen bg-gradient-to-br from-slate-900 via-blue-900 to-slate-900 flex items-center justify-center">
                <div className="text-center">
                    <div className="relative">
                        <div className="animate-spin rounded-full h-20 w-20 border-4 border-blue-200 border-t-blue-500 mx-auto mb-6"></div>
                        <Video className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-8 h-8 text-blue-400" />
                    </div>
                    <h3 className="text-2xl font-bold text-white mb-2">Joining Call</h3>
                    <p className="text-blue-200">Connecting you to the video call...</p>
                    <div className="mt-6 flex items-center justify-center gap-1">
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                        <div className="w-2 h-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                    </div>
                </div>
            </div>
        )
    }

    if (callingState === CallingState.JOINED) {
        return (
            <div className="h-screen bg-gradient-to-br from-slate-900 to-slate-800 flex flex-col overflow-hidden">
                {/* Top Bar - Fixed */}
                <div className="bg-slate-900/95 backdrop-blur-md border-b border-slate-700/50 px-4 sm:px-6 py-3 flex-shrink-0">
                    <div className="flex items-center justify-between">
                        {/* Left Section - Call Info */}
                        <div className="flex items-center gap-3 sm:gap-4">
                            <div className="hidden sm:flex w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-600 rounded-xl items-center justify-center shadow-lg">
                                <Video className="w-5 h-5 text-white" />
                            </div>
                            <div>
                                <h2 className="text-white font-semibold text-sm sm:text-base flex items-center gap-2">
                                    Video Call
                                    <span className="hidden sm:inline-block px-2 py-0.5 bg-green-500/20 text-green-400 text-xs rounded-full font-medium">
                                        Live
                                    </span>
                                </h2>
                                <div className="flex items-center gap-3 text-xs text-slate-400">
                                    <span className="flex items-center gap-1">
                                        <Clock className="w-3 h-3" />
                                        {formatDuration(callDuration)}
                                    </span>
                                    <span className="hidden sm:flex items-center gap-1">
                                        <Users className="w-3 h-3" />
                                        {participants.length} {participants.length === 1 ? 'participant' : 'participants'}
                                    </span>
                                </div>
                            </div>
                        </div>

                        {/* Right Section - Status & Actions */}
                        <div className="flex items-center gap-2 sm:gap-3">
                            {/* Network Status */}
                            <div className="hidden md:flex items-center gap-1.5 px-3 py-1.5 bg-slate-800/50 rounded-lg">
                                {networkStatus === 'good' ? (
                                    <Wifi className="w-4 h-4 text-green-400" />
                                ) : (
                                    <WifiOff className="w-4 h-4 text-red-400" />
                                )}
                                <span className="text-xs text-slate-300">
                                    {networkStatus === 'good' ? 'Stable' : 'Poor'}
                                </span>
                            </div>

                            {/* Participants Button */}
                            <button
                                onClick={() => setShowParticipants(!showParticipants)}
                                className="p-2 sm:p-2.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                title="Participants"
                            >
                                <Users className="w-4 h-4 sm:w-5 sm:h-5 text-slate-300" />
                            </button>

                            {/* View Mode Toggle */}
                            <button
                                onClick={() => setViewMode(viewMode === 'speaker' ? 'grid' : 'speaker')}
                                className="hidden sm:flex p-2.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                title={viewMode === 'speaker' ? 'Grid View' : 'Speaker View'}
                            >
                                {viewMode === 'speaker' ? (
                                    <Grid3x3 className="w-5 h-5 text-slate-300" />
                                ) : (
                                    <LayoutGrid className="w-5 h-5 text-slate-300" />
                                )}
                            </button>

                            {/* Fullscreen Toggle */}
                            <button
                                onClick={toggleFullScreen}
                                className="hidden lg:flex p-2.5 bg-slate-800/50 hover:bg-slate-700/50 rounded-lg transition-all"
                                title={isFullScreen ? 'Exit Fullscreen' : 'Fullscreen'}
                            >
                                {isFullScreen ? (
                                    <Minimize2 className="w-5 h-5 text-slate-300" />
                                ) : (
                                    <Maximize2 className="w-5 h-5 text-slate-300" />
                                )}
                            </button>
                        </div>
                    </div>
                </div>

                {/* Main Video Area - Flexible */}
                <div className="flex-1 relative min-h-0 p-2 sm:p-4">
                    <div className="h-full w-full rounded-xl overflow-hidden bg-slate-900 shadow-2xl">
                        <SpeakerLayout participantsBarPosition="bottom" />
                    </div>

                    {/* Participants Sidebar - Overlay on mobile */}
                    {showParticipants && (
                        <>
                            {/* Backdrop */}
                            <div 
                                className="absolute inset-0 bg-black/50 lg:hidden z-40"
                                onClick={() => setShowParticipants(false)}
                            ></div>
                            
                            {/* Sidebar */}
                            <div className="absolute right-0 top-0 bottom-0 w-80 bg-slate-900/95 backdrop-blur-md border-l border-slate-700/50 p-4 z-50 overflow-y-auto">
                                <div className="flex items-center justify-between mb-4">
                                    <h3 className="text-white font-semibold flex items-center gap-2">
                                        <Users className="w-5 h-5" />
                                        Participants ({participants.length})
                                    </h3>
                                    <button
                                        onClick={() => setShowParticipants(false)}
                                        className="p-2 hover:bg-slate-800 rounded-lg transition-colors"
                                    >
                                        <span className="text-slate-400 text-xl">×</span>
                                    </button>
                                </div>
                                <div className="space-y-2">
                                    {participants.map((participant) => (
                                        <div 
                                            key={participant.sessionId}
                                            className="p-3 bg-slate-800/50 rounded-lg flex items-center gap-3"
                                        >
                                            <div className="w-10 h-10 bg-gradient-to-br from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
                                                <User className="w-5 h-5 text-white" />
                                            </div>
                                            <div className="flex-1 min-w-0">
                                                <p className="text-white text-sm font-medium truncate">
                                                    {participant.name || 'Guest'}
                                                    {participant.isLocalParticipant && (
                                                        <span className="ml-2 text-xs text-blue-400">(You)</span>
                                                    )}
                                                </p>
                                                <div className="flex items-center gap-2 mt-0.5">
                                                    {!participant.isSpeaking ? (
                                                        <Mic className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <MicOff className="w-3 h-3 text-red-400" />
                                                    )}
                                                    {participant.publishedTracks.includes('video') ? (
                                                        <Video className="w-3 h-3 text-green-400" />
                                                    ) : (
                                                        <VideoOff className="w-3 h-3 text-red-400" />
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </>
                    )}
                </div>

                {/* Bottom Controls - Fixed */}
                <div className="bg-slate-900/95 backdrop-blur-md border-t border-slate-700/50 px-4 sm:px-6 py-4 flex-shrink-0">
                    <div className="max-w-4xl mx-auto">
                        <div className="flex items-center justify-center gap-3 sm:gap-4">
                            {/* Microphone Control */}
                            <button
                                onClick={toggleMic}
                                className={`p-3 sm:p-4 rounded-full transition-all transform hover:scale-105 ${
                                    isMicMuted 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                                title={isMicMuted ? 'Unmute' : 'Mute'}
                            >
                                {isMicMuted ? (
                                    <MicOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                ) : (
                                    <Mic className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                )}
                            </button>

                            {/* Camera Control */}
                            <button
                                onClick={toggleCamera}
                                className={`p-3 sm:p-4 rounded-full transition-all transform hover:scale-105 ${
                                    isCameraMuted 
                                        ? 'bg-red-500 hover:bg-red-600' 
                                        : 'bg-slate-700 hover:bg-slate-600'
                                }`}
                                title={isCameraMuted ? 'Turn on camera' : 'Turn off camera'}
                            >
                                {isCameraMuted ? (
                                    <VideoOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                ) : (
                                    <Video className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                                )}
                            </button>

                            {/* Screen Share */}
                            <button
                                className="hidden sm:flex p-4 bg-slate-700 hover:bg-slate-600 rounded-full transition-all transform hover:scale-105"
                                title="Share screen"
                                onClick={() => toast.success('Screen sharing coming soon!')}
                            >
                                <Monitor className="w-6 h-6 text-white" />
                            </button>

                            {/* End Call */}
                            <button
                                onClick={onLeave}
                                className="p-3 sm:p-4 bg-red-500 hover:bg-red-600 rounded-full transition-all transform hover:scale-105 shadow-lg"
                                title="End call"
                            >
                                <PhoneOff className="w-5 h-5 sm:w-6 sm:h-6 text-white" />
                            </button>

                            {/* Chat Toggle */}
                            <button
                                className="hidden sm:flex p-4 bg-slate-700 hover:bg-slate-600 rounded-full transition-all transform hover:scale-105"
                                title="Chat"
                                onClick={() => toast.success('In-call chat coming soon!')}
                            >
                                <MessageSquare className="w-6 h-6 text-white" />
                            </button>

                            {/* Settings */}
                            <button
                                onClick={() => setShowSettings(!showSettings)}
                                className="hidden md:flex p-4 bg-slate-700 hover:bg-slate-600 rounded-full transition-all transform hover:scale-105"
                                title="Settings"
                            >
                                <Settings className="w-6 h-6 text-white" />
                            </button>
                        </div>

                        {/* Quick Stats */}
                        <div className="mt-3 flex items-center justify-center gap-4 text-xs text-slate-400">
                            <span className="flex items-center gap-1.5">
                                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                                Connected
                            </span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">HD Quality</span>
                            <span className="hidden sm:inline">•</span>
                            <span className="hidden sm:inline">End-to-end encrypted</span>
                        </div>
                    </div>
                </div>
            </div>
        )
    }

    return (
        <div className="h-screen bg-gradient-to-br from-slate-900 via-red-900 to-slate-900 flex items-center justify-center">
            <div className="text-center p-8">
                <div className="w-20 h-20 bg-red-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                    <PhoneOff className="w-10 h-10 text-red-400" />
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Call Ended</h3>
                <p className="text-slate-300 mb-6">
                    Duration: {formatDuration(callDuration)}
                </p>
                <button
                    onClick={onLeave}
                    className="px-6 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-xl font-semibold transition-all transform hover:scale-105 shadow-lg"
                >
                    Back to Chat
                </button>
            </div>
        </div>
    )
}

export default CallPage
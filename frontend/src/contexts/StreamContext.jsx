import { createContext, useContext, useEffect, useState } from 'react'
import { StreamChat } from 'stream-chat'
import { StreamVideo, StreamVideoClient } from '@stream-io/video-react-sdk'
import { useQuery } from '@tanstack/react-query'
import { getStreamToken } from '../lib/api'
import useAuthUser from '../hooks/useAuthUser'

const StreamContext = createContext()

export const useStream = () => {
    const context = useContext(StreamContext)
    if (!context) {
        throw new Error('useStream must be used within StreamProvider')
    }
    return context
}

export const StreamProvider = ({ children }) => {
    const { authUser } = useAuthUser()
    const [chatClient, setChatClient] = useState(null)
    const [videoClient, setVideoClient] = useState(null)
    const [isInitialized, setIsInitialized] = useState(false)

    const { data: tokenData } = useQuery({
        queryKey: ['streamToken'],
        queryFn: getStreamToken,
        enabled: !!authUser,
    })

    useEffect(() => {
        if (!authUser || !tokenData?.token) {
            console.log('Stream: Waiting for auth user or token', { 
                hasAuthUser: !!authUser, 
                hasToken: !!tokenData?.token 
            })
            return
        }

        const initializeStream = async () => {
            try {
                const apiKey = import.meta.env.VITE_STREAM_API_KEY

                if (!apiKey) {
                    console.error('❌ Stream API key is missing in environment variables')
                    return
                }

                console.log('🔄 Initializing Stream clients...', {
                    userId: authUser._id,
                    userName: authUser.fullName,
                    apiKeyPrefix: apiKey.substring(0, 8) + '...'
                })

                // Initialize Chat Client
                const chatClientInstance = StreamChat.getInstance(apiKey)
                
                console.log('🔄 Connecting Stream Chat user...')
                await chatClientInstance.connectUser(
                    {
                        id: authUser._id,
                        name: authUser.fullName,
                        image: authUser.profilePic,
                    },
                    tokenData.token
                )
                console.log('✅ Stream Chat connected successfully')
                setChatClient(chatClientInstance)

                // Initialize Video Client
                console.log('🔄 Initializing Stream Video client...')
                const videoClientInstance = new StreamVideoClient({
                    apiKey,
                    user: {
                        id: authUser._id,
                        name: authUser.fullName,
                        image: authUser.profilePic,
                    },
                    token: tokenData.token,
                })
                console.log('✅ Stream Video initialized successfully')
                setVideoClient(videoClientInstance)

                setIsInitialized(true)
                console.log('✅ All Stream clients initialized and ready')
            } catch (error) {
                console.error('❌ Error initializing Stream:', error)
                console.error('Error details:', {
                    message: error.message,
                    code: error.code,
                    statusCode: error.statusCode
                })
            }
        }

        initializeStream()

        return () => {
            console.log('🔄 Cleaning up Stream clients...')
            if (chatClient) {
                chatClient.disconnectUser()
                    .then(() => console.log('✅ Chat client disconnected'))
                    .catch(err => console.error('❌ Error disconnecting chat:', err))
                setChatClient(null)
            }
            if (videoClient) {
                videoClient.disconnectUser()
                    .then(() => console.log('✅ Video client disconnected'))
                    .catch(err => console.error('❌ Error disconnecting video:', err))
                setVideoClient(null)
            }
            setIsInitialized(false)
        }
    }, [authUser, tokenData])

    const value = {
        chatClient,
        videoClient,
        isInitialized,
    }

    return (
        <StreamContext.Provider value={value}>
            {videoClient ? (
                <StreamVideo client={videoClient}>{children}</StreamVideo>
            ) : (
                children
            )}
        </StreamContext.Provider>
    )
}

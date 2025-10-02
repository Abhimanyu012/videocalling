import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useEffect, useState } from "react"
import { getUserFriends, getRecommendedUsers as fetchRecommendedUsers, getOutgoingFriendRequests, sendFriendRequest as sendFriendRequestAPI } from "../lib/api"
import { Link } from "react-router-dom"
import { UserIcon, UsersIcon } from "lucide-react"
import { toast } from "react-hot-toast"
import FriendsCard from "../components/FriendsCard"
import FriendListCard from "../components/FriendListCard"

const HomePage = () => {

  const queryClient = useQueryClient()

  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set())
  
  const { data: friends = [], isLoading: loadingFriends, error: friendsError } = useQuery({
    queryKey: ["friends"],
    queryFn: async () => {
      console.log('🔄 Fetching friends...')
      const result = await getUserFriends()
      console.log('✅ Friends fetched:', result.length, 'friends')
      return result
    }
  })
  
  const { data: getRecommendedUsers = [], isLoading: loadingRecommended } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      console.log('🔄 Fetching recommended users...')
      const result = await fetchRecommendedUsers()
      console.log('✅ Recommended users fetched:', result.length, 'users')
      return result
    }
  })
  
  const { data: outgoingFriendRequests = [], isLoading: loadingOutgoing } = useQuery({
    queryKey: ["outgoingFriendRequests"],
    queryFn: async () => {
      console.log('🔄 Fetching outgoing friend requests...')
      const result = await getOutgoingFriendRequests()
      console.log('✅ Outgoing requests fetched:', result.length, 'requests')
      return result
    }
  })

  const { mutate: sendFriendRequest, isPending } = useMutation({
    mutationFn: sendFriendRequestAPI,
    onSuccess: () => {
      toast.success("Friend request sent!")
      queryClient.invalidateQueries({
        queryKey: ["outgoingFriendRequests"]
      })
      queryClient.invalidateQueries({
        queryKey: ["users"]
      })
    },
    onError: (error) => {
      toast.error(error.response?.data?.message || "Failed to send friend request")
    }
  })

  useEffect(() => {
    const outgoingIds = new Set()
    if (outgoingFriendRequests && outgoingFriendRequests.length > 0) {
      outgoingFriendRequests.forEach((req) => {
        // Use recipient._id to track which users we've sent requests to
        if (req.recipient && req.recipient._id) {
          outgoingIds.add(req.recipient._id)
        }
      })
      setOutgoingRequestsIds(outgoingIds)
      console.log('📤 Outgoing request IDs:', Array.from(outgoingIds))
    }
  }, [outgoingFriendRequests])

  useEffect(() => {
    if (friendsError) {
      console.error('❌ Error loading friends:', friendsError)
      toast.error('Failed to load friends')
    }
  }, [friendsError])

  if (loadingFriends || loadingRecommended || loadingOutgoing) {
    return (
      <div className="min-h-screen bg-base-100 flex items-center justify-center">
        <div className="text-center">
          <div className="loading loading-spinner loading-lg text-primary mb-4"></div>
          <p className="text-base-content opacity-60">Loading...</p>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-base-100 p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto max-w-6xl">
        {/* Header Section */}
        <div className="mb-8 bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
            <h2 className="text-2xl sm:text-3xl font-bold tracking-tight text-base-content">Your Friends</h2>
            <Link
              to="/notifications"
              className="btn btn-outline btn-sm flex items-center gap-2"
            >
              <UsersIcon className="mr-2 size-4" />
              Friend Requests
            </Link>
          </div>
        </div>
        {/* Friends List Section */}
        <div className="mb-8 bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
          <h2 className="text-xl font-bold text-base-content mb-6">Your Friends ({friends.length})</h2>
          {friends.length === 0 ? (
            <div className="text-center py-12">
              <UserIcon className="mx-auto h-12 w-12 text-base-content opacity-40 mb-4" />
              <p className="text-base-content opacity-60">No friends yet. Add some from recommendations below!</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {friends.map((friend) => (
                <FriendListCard key={friend._id} friend={friend} />
              ))}
            </div>
          )}
        </div>

        {/* Recommended Users Section */}
        <div className="bg-base-200 rounded-2xl shadow-lg p-6 border border-base-300">
          <h2 className="text-xl font-bold text-base-content mb-6">People You May Know</h2>

          {getRecommendedUsers.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-base-content opacity-60">No recommendations available</p>
            </div>
          ) : (
            <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
              {getRecommendedUsers.map((user) => (
                <FriendsCard
                  key={user._id}
                  user={user}
                  onSendFriendRequest={sendFriendRequest}
                  isPending={isPending}
                  isRequestSent={outgoingRequestsIds.has(user._id)}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

export default HomePage
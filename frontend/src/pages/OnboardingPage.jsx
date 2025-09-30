import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { completeOnBoarding } from '../lib/api.js'
import { CameraIcon } from 'lucide-react'

const OnboardingPage = () => {
  const {authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [formState,setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    profilePic: authUser?.profilePic || "",
    location: authUser?.location || "",
  })
  

  const { mutate: onBoardingMutation } = useMutation({

    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile updated successfully")
      queryClient.invalidateQueries({
        queryKey: ["authUser"]
      })
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    onBoardingMutation(formState)
  }



  return (
    <div className='min-h-screen bg-base-100 flex items-center justify-center'>
      <div className='card bg-base-100 w-full max-w-3xl shadow-xl'>
        <div className='card-body p-6 sm:p-8'>
          <h1 className=" text-2xl  sm:text-3xl font-bold text-center mb-6">Complete Your Profile</h1>
          <form className=" space-y-6" onSubmit={handleSubmit}>
            {/*profile page container */}

            <div className="flex flex-col items-center justify-center space-y-4">
              {/* image preview */}
              <div className="size-32 rounded-full bg-base-300 overflow-hidden">
              {formState.profilePic ? (
                <img
                  src={formState.profilePic}
                  alt="Profile preview"
                  className="object-cover w-full h-full"
                />
              ) : (
                <div className="w-full h-full flex items-center justify-center text-gray-400">
                  <CameraIcon className='size-8 text-base-content opacity-40'/>
                </div>
              )}
              </div>
            </div>

            {/* Add form fields */}
            <div className="space-y-4">
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Full Name"
                value={formState.fullName}
                onChange={e => setFormState(prev => ({ ...prev, fullName: e.target.value }))}
                name="fullName"
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Bio"
                value={formState.bio}
                onChange={e => setFormState(prev => ({ ...prev, bio: e.target.value }))}
                name="bio"
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Native Language"
                value={formState.nativeLanguage}
                onChange={e => setFormState(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                name="nativeLanguage"
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Learning Language"
                value={formState.learningLanguage}
                onChange={e => setFormState(prev => ({ ...prev, learningLanguage: e.target.value }))}
                name="learningLanguage"
              />
              <input
                type="text"
                className="input input-bordered w-full"
                placeholder="Location"
                value={formState.location}
                onChange={e => setFormState(prev => ({ ...prev, location: e.target.value }))}
                name="location"
              />
              {/* Optionally, add a profilePic URL input */}
             
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4">
              Save Profile
            </button>
          </form>

        </div>
      </div>
    </div>
  )
}


export default OnboardingPage
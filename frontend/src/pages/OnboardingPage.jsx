import { useState } from 'react'
import useAuthUser from '../hooks/useAuthUser'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import toast from 'react-hot-toast'
import { completeOnBoarding } from '../lib/api.js'
import { CameraIcon, LoaderIcon, MapIcon, MapPinIcon, ShipWheelIcon, ShuffleIcon } from 'lucide-react'
import { LANGUAGES } from '../constants';


const OnboardingPage = () => {
  const { authUser } = useAuthUser()
  const queryClient = useQueryClient()

  const [formState, setFormState] = useState({
    fullName: authUser?.fullName || "",
    bio: authUser?.bio || "",
    nativeLanguage: authUser?.nativeLanguage || "",
    learningLanguage: authUser?.learningLanguage || "",
    profilePic: authUser?.profilePic || "",
    location: authUser?.location || "",
  })

  const { mutate: onBoardingMutation, isPending } = useMutation({
    mutationFn: completeOnBoarding,
    onSuccess: () => {
      toast.success("Profile Onboarded successfully")
      queryClient.invalidateQueries({
        queryKey: ["authUser"]
      })
    }
  })
  const handleSubmit = (e) => {
    e.preventDefault()
    onBoardingMutation(formState)
  }
  const handleRandomavtar = () => {
    const idx = Math.floor(Math.random() * 100 + 1)
    const randomAvatar = `https://avatar.iran.liara.run/public/${idx}.png`
    setFormState({ ...formState, profilePic: randomAvatar })
    toast.success('Avatar changed succesfully')
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
                    <CameraIcon className='size-8 text-base-content opacity-40' />
                  </div>
                )}
              </div>
            </div>

            {/* Generate Random Avatar */}
            <div className="flex justify-center mt-4">
              <button
                type="button"
                onClick={handleRandomavtar}
                className="btn btn-accent flex items-center gap-2 px-4 py-2 rounded-full shadow hover:scale-105 transition-transform"
              >
                <ShuffleIcon className="size-5" />
                <span>Generate Random Avatar</span>
              </button>
            </div>
            <div className="space-y-4">
              <div>
                <label className="block mb-1 font-medium" htmlFor="fullName">Full Name</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Full Name"
                  value={formState.fullName}
                  onChange={e => setFormState(prev => ({ ...prev, fullName: e.target.value }))}
                  name="fullName"
                  id="fullName"
                />
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="bio">Bio</label>
                <input
                  type="text"
                  className="input input-bordered w-full"
                  placeholder="Bio"
                  value={formState.bio}
                  onChange={e => setFormState(prev => ({ ...prev, bio: e.target.value }))}
                  name="bio"
                  id="bio"
                />
              </div>
              {/* languages */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block mb-1 font-medium" htmlFor="nativeLanguage">Native Language</label>
                  <select
                    className="select select-bordered w-full"
                    value={formState.nativeLanguage}
                    onChange={e => setFormState(prev => ({ ...prev, nativeLanguage: e.target.value }))}
                    name="nativeLanguage"
                    id="nativeLanguage"
                  >
                    <option value="">Select Native Language</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
                <div>
                  <label className="block mb-1 font-medium" htmlFor="learningLanguage">Learning Language</label>
                  <select
                    className="select select-bordered w-full"
                    value={formState.learningLanguage}
                    onChange={e => setFormState(prev => ({ ...prev, learningLanguage: e.target.value }))}
                    name="learningLanguage"
                    id="learningLanguage"
                  >
                    <option value="">Select Learning Language</option>
                    {LANGUAGES.map(lang => (
                      <option key={lang} value={lang.toLowerCase()}>{lang}</option>
                    ))}
                  </select>
                </div>
              </div>
              <div>
                <label className="block mb-1 font-medium" htmlFor="location">Location</label>
                <div className="relative">
                  <input
                    type="text"
                    className="input input-bordered w-full pl-10"
                    placeholder="Location"
                    value={formState.location}
                    onChange={e => setFormState(prev => ({ ...prev, location: e.target.value }))}
                    name="location"
                    id="location"
                  />
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content opacity-60">
                    <MapPinIcon className="size-5" />
                  </span>
                </div>
              </div>
            </div>

            <button type="submit" className="btn btn-primary w-full mt-4 " disabled={isPending}>
              {isPending ? (
                <><LoaderIcon className="animate-spin size-5 mr-2" />
                  Onboarding...
                </>
              ) : (
                <><ShipWheelIcon className="size-5 mr-2" />
                  Complete OnBoarding
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}

export default OnboardingPage
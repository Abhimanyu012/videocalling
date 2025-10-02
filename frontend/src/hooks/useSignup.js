import { useMutation, useQueryClient } from "@tanstack/react-query";
import { signup } from "../lib/api";

const useSignup = () => {
    const queryClient = useQueryClient()

    const { mutate, isPending, error } = useMutation({
        mutationFn: signup,
        onSuccess: (data) => {
            console.log("Signup successful:", data);
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            })
        }
    })

    return { isPending, error, signupMutation: mutate }
}

export default useSignup
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../lib/api";


const useLogout = () => {
    const queryClient = useQueryClient();
    const { mutate: logoutMutation, isPending, error } = useMutation({
        mutationFn: logout,
        onSuccess: () => {
            queryClient.setQueryData(["authUser"], null);
            queryClient.invalidateQueries({
                queryKey: ["authUser"]
            });
        }
    })
    return { logoutMutation, isPending, error }
}

export default useLogout




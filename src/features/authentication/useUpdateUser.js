import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateUser } from "../../services/apiAuth";

export function useUpdateUser() {
  const queryClient = useQueryClient();
  const { isLoading: isUpdating, mutate: updatingUser } = useMutation({
    mutationFn: updateUser,
    onSuccess: (user) => {
      toast.success("User updated successfully!");
      //  queryClient.setQueryData(["user"], user);
      queryClient.invalidateQueries({
        queryKey: ["user"],
      });
    },
    onError: (error) => {
      toast.error("There was an error while updating the user.");
    },
  });
  return { isUpdating, updatingUser };
}

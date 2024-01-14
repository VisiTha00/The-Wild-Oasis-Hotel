import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createAndEditCabin } from "../../services/apiCabins";
import toast from "react-hot-toast";

export function useUpdateCabin() {
  const queryClient = useQueryClient();
  const { isLoading: isEditing, mutate: editMutate } = useMutation({
    mutationFn: ({ newCabin, id }) => createAndEditCabin(newCabin, id), // mutationFn: (data) => createCabin(data),
    onSuccess: () => {
      toast.success("Cabin updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["cabins"],
      });
    },
    onError: (error) => {
      toast.error("There was an error while updating the cabin.");
    },
  });
  return { isEditing, editMutate };
}

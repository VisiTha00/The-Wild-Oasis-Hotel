import { useMutation, useQueryClient } from "@tanstack/react-query";
import toast from "react-hot-toast";
import { updateSetting } from "../../services/apiSettings";

export function useUpdateSetting() {
  const queryClient = useQueryClient();
  const { isLoaading: isUpdating, mutate: updateMutate } = useMutation({
    mutationFn: updateSetting,
    onSuccess: () => {
      toast.success("Settings updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["settings"],
      });
    },
    onError: (error) => {
      toast.error("There was an error while updating the settings.");
    },
  });
  return { isUpdating, updateMutate };
}

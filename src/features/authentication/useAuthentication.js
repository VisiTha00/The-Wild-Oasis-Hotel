import { useMutation, useQueryClient } from "@tanstack/react-query";
import { loginUser } from "../../services/apiAuth";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";

export function useAuthentication() {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const { isLoading, mutate: loginFunction } = useMutation({
    mutationFn: ({ email, password }) => loginUser({ email, password }),
    onSuccess: (user) => {
      queryClient.setQueryData(["user"], user.user); //Here we store the user data in the cache to improve the performance of the application
      navigate("/", { replace: true });
    },
    onError: (error) => {
      toast.error("Provided credentials are invalid.");
    },
  });
  return { isLoading, loginFunction };
}

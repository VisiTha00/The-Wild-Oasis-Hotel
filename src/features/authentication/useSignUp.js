import { useMutation } from "@tanstack/react-query";
import { signUpUser } from "../../services/apiAuth";
import toast from "react-hot-toast";

export function useSignUp() {
  const { isLoading, mutate: signUp } = useMutation({
    mutationFn: signUpUser,
    onSuccess: (data) => {
      console.log(data);
      toast.success(
        "Account created successfully! Please verify your account by clicking the link sent to your email"
      );
    },
    onError: (error) => {
      console.log(error);
      toast.error("There was an error creating the user");
    },
  });
  return { isLoading, signUp };
}

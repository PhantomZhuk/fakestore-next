import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useLogin = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      email,
      password,
    }: {
      email: string;
      password: string;
    }) => {
      const res = await axios.post("/api/auth/login", { email, password });
      queryClient.setQueryData(["user"], res.data.user);
      queryClient.setQueryData(["accessToken"], res.data.accessToken);
      return res.data;
    },
    mutationKey: ["login"],
    onSuccess: (data) => {
      router.replace("/");
      console.log("Login successful", data);
    },
    onError: (error) => {
      console.log("Login error", error);
    },
  });
};

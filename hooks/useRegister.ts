import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";
import { useRouter } from "next/navigation";

export const useRegister = () => {
  const router = useRouter();
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      fullName,
      email,
      password,
    }: {
      fullName: string;
      email: string;
      password: string;
    }) => {
      const res = await axios.post("/api/auth/register", {
        fullName,
        email,
        password,
      });
      queryClient.setQueryData(["user"], res.data.user);
      queryClient.setQueryData(["accessToken"], res.data.accessToken);
      return res.data;
    },
    mutationKey: ["register"],
    onSuccess: (data) => {
      router.replace("/");
      console.log("Register successful", data);
    },
    onError: (error) => {
      console.log("Register error", error);
    },
  });
};

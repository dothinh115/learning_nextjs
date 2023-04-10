import { API } from "@/utils/config";
import { LoginInterface } from "@/utils/types/authType";
import useSWR, { SWRConfiguration } from "swr";

export const useAuth = (option?: SWRConfiguration) => {
  const {
    data: profile,
    error,
    mutate,
    isLoading,
  } = useSWR("/users/getCurrentUserInfo", {
    revalidateOnFocus: false,
    dedupingInterval: 1000 * 60 * 60, //lấy cache trả ra trong 1 tiếng
    ...option,
  });

  const firstLoading = profile === undefined && error === undefined;

  const login = async (payload: LoginInterface) => {
    await API.post("/users/signIn", payload);
  };

  const logout = async () => {
    await API.get("/users/signOut");
  };

  return {
    profile: profile?.data,
    error,
    isLoading,
    login,
    logout,
    firstLoading,
    mutate,
  };
};

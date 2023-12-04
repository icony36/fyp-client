import { useQuery } from "@tanstack/react-query";
import { fetchUser } from "../../services/user";

export const useFetchProfile = (options = {}) => {
  const {
    data: profile,
    isLoading: isFetching,
    status: profileStatus,
  } = useQuery({
    queryKey: ["profile"],
    queryFn: () => fetchUser(options.id),
    enabled: options?.enabled,
  });

  return { profile, isFetching, profileStatus };
};

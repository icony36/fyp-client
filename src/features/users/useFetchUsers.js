import { useQuery } from "@tanstack/react-query";
import { fetchUsers } from "../../services/user";

export const useFetchUsers = (options = {}) => {
  const {
    data: users,
    isLoading: isFetching,
    status: usersStatus,
  } = useQuery({
    queryKey: ["users"],
    queryFn: fetchUsers,
    enabled: options?.enabled,
  });

  return { users, isFetching, usersStatus };
};

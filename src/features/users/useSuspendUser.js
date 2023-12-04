import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { suspendUser as apiSuspendUser } from "../../services/user";

export const useSuspendUser = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const {
    mutate: suspendUser,
    isLoading: isSuspending,
    status: suspendUserStatus,
  } = useMutation({
    mutationFn: ({ userData, id }) => apiSuspendUser(userData, id),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'todos' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { suspendUser, isSuspending, suspendUserStatus };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";

import { suspendUser as apiSuspendUser } from "../../services/user";
import { useToast } from "../../hooks/useToast";

export const useSuspendUser = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: suspendUser,
    isLoading: isSuspending,
    status: suspendUserStatus,
  } = useMutation({
    mutationFn: ({ userData, id }) => apiSuspendUser(userData, id),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'users' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { suspendUser, isSuspending, suspendUserStatus };
};

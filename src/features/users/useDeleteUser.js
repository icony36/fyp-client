import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { deleteUser as apiDeleteUser } from "../../services/user";

export const useDeleteUser = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const {
    mutate: deleteUser,
    isLoading: isDeleting,
    status: deleteUserStatus,
  } = useMutation({
    mutationFn: apiDeleteUser,
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

  return { deleteUser, isDeleting, deleteUserStatus };
};

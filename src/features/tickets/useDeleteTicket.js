import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteTicket as apiDeleteTicket } from "../../services/ticket";
import { useToast } from "../../hooks/useToast";

export const useDeleteTicket = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: deleteTicket,
    isLoading: isDeleting,
    status: deleteTicketStatus,
  } = useMutation({
    mutationFn: apiDeleteTicket,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'tickets' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["tickets"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteTicket, isDeleting, deleteTicketStatus };
};

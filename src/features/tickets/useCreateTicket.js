import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createTicket as apiCreateTicket } from "../../services/ticket";
import { useToast } from "../../hooks/useToast";

export const useCreateTicket = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: createTicket,
    isLoading: isCreating,
    status: createTicketStatus,
  } = useMutation({
    mutationFn: apiCreateTicket,
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

  return { createTicket, isCreating, createTicketStatus };
};

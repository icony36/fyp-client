import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateTicket } from "../../services/ticket";
import { useToast } from "../../hooks/useToast";

export const useEditTicket = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: editTicket,
    isLoading: isEditing,
    status: editTicketStatus,
  } = useMutation({
    mutationFn: ({ ticketData, id }) => updateTicket(ticketData, id),
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

  return { editTicket, isEditing, editTicketStatus };
};

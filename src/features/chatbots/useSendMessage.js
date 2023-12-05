import { useMutation, useQueryClient } from "@tanstack/react-query";

import { sendMessage as apiSendMessage } from "../../services/rasa";
import { useToast } from "../../hooks/useToast";

export const useSendMessage = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: sendMessage,
    isLoading: isSending,
    status: sendMessageStatus,
  } = useMutation({
    mutationFn: apiSendMessage,
    onSuccess: (data) => {
      // Invalidate the query to refetch the 'knowledges' query after successful mutation
      // queryClient.invalidateQueries({ queryKey: ["knowledges"] });
      queryClient.setQueryData(["messages"], data.text);

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { sendMessage, isSending, sendMessageStatus };
};

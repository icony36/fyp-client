import { useMutation, useQueryClient } from "@tanstack/react-query";

import { deleteKnowledge as apiDeleteKnowledge } from "../../services/knowledge";
import { useToast } from "../../hooks/useToast";

export const useDeleteKnowledge = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: deleteKnowledge,
    isLoading: isDeleting,
    status: deleteKnowledgeStatus,
  } = useMutation({
    mutationFn: apiDeleteKnowledge,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'knowledges' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["knowledges"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { deleteKnowledge, isDeleting, deleteKnowledgeStatus };
};

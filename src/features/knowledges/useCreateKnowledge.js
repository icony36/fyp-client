import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createKnowledge as apiCreateKnowledge } from "../../services/knowledge";
import { useToast } from "../../hooks/useToast";

export const useCreateKnowledge = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: createKnowledge,
    isLoading: isCreating,
    status: createKnowledgeStatus,
  } = useMutation({
    mutationFn: apiCreateKnowledge,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'users' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["knowledges"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createKnowledge, isCreating, createKnowledgeStatus };
};

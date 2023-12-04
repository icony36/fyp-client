import { useMutation, useQueryClient } from "@tanstack/react-query";

import { updateKnowledge } from "../../services/knowledge";
import { useToast } from "../../hooks/useToast";

export const useEditKnowledge = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: editKnowledge,
    isLoading: isEditing,
    status: editKnowledgeStatus,
  } = useMutation({
    mutationFn: ({ knowledgeData, id }) => updateKnowledge(knowledgeData, id),
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

  return { editKnowledge, isEditing, editKnowledgeStatus };
};

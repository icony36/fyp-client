import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../hooks/useToast";

import { updateTrainingData } from "../../services/trainingData";

export const useEditTrainingData = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: editTrainingData,
    isLoading: isEditing,
    status: editTrainingDataStatus,
  } = useMutation({
    mutationFn: (trainingData) => updateTrainingData(trainingData),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'tickets' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["trainingData"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editTrainingData, isEditing, editTrainingDataStatus };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../hooks/useToast";

import { updateOwnStudentProfile } from "../../services/studentProfile";

export const useEditStudentProfile = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: editStudentProfile,
    isLoading: isEditing,
    status: editStudentProfileStatus,
  } = useMutation({
    mutationFn: ({ profileData, id }) =>
      updateOwnStudentProfile(profileData, id),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'profile' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["studentProfile"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editStudentProfile, isEditing, editStudentProfileStatus };
};

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useToast } from "../../hooks/useToast";

import { updateProfile } from "../../services/user";

export const useEditProfile = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: editProfile,
    isLoading: isEditing,
    status: editProfileStatus,
  } = useMutation({
    mutationFn: ({ profileData, id }) => updateProfile(profileData, id),
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'profile' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["profile"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editProfile, isEditing, editProfileStatus };
};

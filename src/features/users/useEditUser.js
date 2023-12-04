import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { updateUser } from "../../services/user";
import { updateStudentProfile } from "../../services/studentProfile";
import { ROLE } from "../../constants";

const handleUpdateUser = async ({ id, profileId, data }) => {
  try {
    const res = await updateUser(data.userData, id);

    if (data.userData.role === ROLE.student) {
      try {
        const studentRes = await updateStudentProfile(
          data.studentData,
          profileId
        );

        return studentRes;
      } catch (err) {
        throw err;
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
};

export const useEditUser = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const {
    mutate: editUser,
    isLoading: isEditing,
    status: editUserStatus,
  } = useMutation({
    mutationFn: handleUpdateUser,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'todos' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { editUser, isEditing, editUserStatus };
};

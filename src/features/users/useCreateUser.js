import { useMutation, useQueryClient } from "@tanstack/react-query";

import { createUser, deleteUser } from "../../services/user";
import { createStudentProfile } from "../../services/studentProfile";
import { ROLE } from "../../constants";
import { useToast } from "../../hooks/useToast";

const handleCreateUser = async (data) => {
  try {
    const res = await createUser(data.userData);

    if (data.userData.role === ROLE.student) {
      try {
        const studentRes = await createStudentProfile({
          ...data.studentData,
          studentId: res.userId,
        });

        return studentRes;
      } catch (err) {
        await deleteUser(res.userId);

        throw err;
      }
    }

    return res;
  } catch (err) {
    throw err;
  }
};

export const useCreateUser = (options = {}) => {
  const { onSuccess } = options;

  const queryClient = useQueryClient();

  const { toast } = useToast();

  const {
    mutate: createUser,
    isLoading: isCreating,
    status: createUserStatus,
  } = useMutation({
    mutationFn: handleCreateUser,
    onSuccess: (data) => {
      toast.success(data.message);

      // Invalidate the query to refetch the 'users' query after successful mutation
      queryClient.invalidateQueries({ queryKey: ["users"] });

      if (onSuccess && typeof onSuccess === "function") onSuccess();
    },
    onError: (err) => {
      toast.error(err.message);
    },
  });

  return { createUser, isCreating, createUserStatus };
};

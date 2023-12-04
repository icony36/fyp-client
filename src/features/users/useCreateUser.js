import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toast } from "react-hot-toast";

import { createUser, deleteUser } from "../../services/user";
import { createStudentProfile } from "../../services/studentProfile";
import { ROLE } from "../../constants";

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

  const {
    mutate: createUser,
    isLoading: isCreating,
    status: createUserStatus,
  } = useMutation({
    mutationFn: handleCreateUser,
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

  return { createUser, isCreating, createUserStatus };
};

import { useQuery } from "@tanstack/react-query";
import { fetchStudentProfileByUser } from "../../services/studentProfile";

export const useFetchStudentProfile = (options = {}) => {
  const {
    data: studentProfile,
    isLoading: isFetching,
    status: studentProfileStatus,
  } = useQuery({
    queryKey: ["studentProfile"],
    queryFn: () => fetchStudentProfileByUser(options.id),
    enabled: options?.enabled,
  });

  return { studentProfile, isFetching, studentProfileStatus };
};

import { useQuery } from "@tanstack/react-query";
import { fetchTrainingData } from "../../services/trainingData";

export const useFetchTrainingData = (options = {}) => {
  const {
    data: trainingData,
    isLoading: isFetching,
    status: trainingDataStatus,
  } = useQuery({
    queryKey: ["trainingData"],
    queryFn: fetchTrainingData,
    enabled: options?.enabled,
  });

  return { trainingData, isFetching, trainingDataStatus };
};

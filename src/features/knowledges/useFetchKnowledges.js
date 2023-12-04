import { useQuery } from "@tanstack/react-query";
import { fetchKnowledges } from "../../services/knowledge";

export const useFetchKnowledges = (options = {}) => {
  const {
    data: knowledges,
    isLoading: isFetching,
    status: knowledgesStatus,
  } = useQuery({
    queryKey: ["knowledges"],
    queryFn: fetchKnowledges,
    enabled: options?.enabled,
  });

  return { knowledges, isFetching, knowledgesStatus };
};

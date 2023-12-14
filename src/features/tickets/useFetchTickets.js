import { useQuery } from "@tanstack/react-query";
import { fetchTickets, fetchTicketByUser } from "../../services/ticket";

export const useFetchTickets = (options = {}) => {
  const { isStudentSession } = options;

  const {
    data: tickets,
    isLoading: isFetching,
    status: ticketsStatus,
  } = useQuery({
    queryKey: ["tickets"],
    queryFn: isStudentSession
      ? () => fetchTicketByUser(options.studentId)
      : fetchTickets,
    enabled: options?.enabled,
    onError: (error) => console.log(error),
  });

  return { tickets, isFetching, ticketsStatus };
};

import { useQuery } from "@tanstack/react-query";
import { getStaysTodayActivity } from "../../services/apiBookings";

export function useTodayActivity() {
  const { isLoading, data } = useQuery({
    queryFn: getStaysTodayActivity,
    queryKey: ["activity"],
  });

  return { isLoading, data };
}

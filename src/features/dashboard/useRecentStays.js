import { useQuery } from "@tanstack/react-query";
import { subDays } from "date-fns";
import { useSearchParams } from "react-router-dom";
import { getStaysAfterDate } from "../../services/apiBookings";

export function useRecentStays() {
  const [searchParams] = useSearchParams();
  const numDays = searchParams.get("last")
    ? Number(searchParams.get("last"))
    : 7;

  const queryDate = subDays(new Date(), numDays).toISOString();
  const { data: recentStays, isLoading } = useQuery({
    queryFn: () => getStaysAfterDate(queryDate),
    queryKey: ["bookings", numDays],
  });

  console.log("stays", recentStays);

  const confirmedStays = recentStays?.filter(
    (stay) => stay.status !== "Unconfirmed"
  );

  return { recentStays, isLoading, confirmedStays };
}

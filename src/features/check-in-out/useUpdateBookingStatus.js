import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateBooking } from "../../services/apiBookings";
import toast from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";

export function useUpdateBookingStatus() {
  const { bookingId } = useParams();
  const queryClient = useQueryClient();
  const navigate = useNavigate();

  const { mutate: updateChecking, isLoading: isUpdating } = useMutation({
    mutationFn: ({ bookingId, updatedValue }) =>
      updateBooking(bookingId, updatedValue),
    onSuccess: () => {
      toast.success("Booking details updated successfully!");
      queryClient.invalidateQueries({
        queryKey: ["bookings", bookingId],
      });
      navigate("/");
    },
    onError: (error) => {
      toast.error("There was an error while updating the data.");
    },
  });

  return { updateChecking, isUpdating };
}

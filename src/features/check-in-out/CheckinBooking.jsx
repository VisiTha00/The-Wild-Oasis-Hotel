import styled from "styled-components";
import BookingDataBox from "../../features/bookings/BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";
import CheckBox from "../../ui/Checkbox";
import Spinner from "../../ui/Spinner";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "../bookings/useBooking";
import { useEffect, useState } from "react";
import { formatCurrency } from "../../utils/helpers";
import { useSettings } from "../settings/useSettings";
import { useUpdateBookingStatus } from "./useUpdateBookingStatus";

const Box = styled.div`
  /* Box */
  background-color: var(--color-grey-0);
  border: 1px solid var(--color-grey-100);
  border-radius: var(--border-radius-md);
  padding: 2.4rem 4rem;
`;

function CheckinBooking() {
  const moveBack = useMoveBack();
  const [confirmPaid, setConfirmPaid] = useState(false);
  const [isPaidForBreakfast, setIsPaidForBreakfast] = useState(false);
  const { booking = {}, isLoading } = useBooking();
  const { isLoading: isLoadingSettings, settings } = useSettings();

  const {
    id: bookingId,
    guests,
    totalPrice,
    numGuests,
    hasBreakfast,
    numNights,
    isPaid,
    extrasPrice,
  } = booking;

  /* const { mutate: updateChecking, isLoading: isUpdating } = useMutation({
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
      toast.error("There was an error while updating the cabin.");
    },
  }); */

  const { updateChecking, isUpdating } = useUpdateBookingStatus(bookingId);

  useEffect(() => {
    if (isPaid) {
      setConfirmPaid(true);
    }
  }, [isPaid]);

  if (isLoading || isUpdating || isLoadingSettings) {
    return <Spinner />;
  }

  const totalBreakfastPrice = numGuests * numNights * settings.breakfastPrice;

  function handleCheckin() {
    if (!confirmPaid) {
      return;
    }
    if (!isPaidForBreakfast && confirmPaid) {
      const updatedValue = { status: "checked-in", isPaid: true };
      updateChecking({ bookingId, updatedValue });
    }
    if (isPaidForBreakfast && confirmPaid) {
      const updatedValue = {
        status: "checked-in",
        isPaid: true,
        hasBreakfast: true,
        extrasPrice: extrasPrice + totalBreakfastPrice,
        totalPrice: totalPrice + totalBreakfastPrice,
      };
      updateChecking({ bookingId, updatedValue });
    }
  }

  return (
    <>
      <Row type="horizontal">
        <Heading as="h1">Check in booking #{bookingId}</Heading>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />
      {hasBreakfast ? (
        ""
      ) : (
        <Box>
          <CheckBox
            checked={isPaidForBreakfast}
            onChange={() => {
              setIsPaidForBreakfast(
                (isPaidForBreakfast) => !isPaidForBreakfast
              );
              setConfirmPaid(false);
            }}
            id={bookingId}
            disabled={isPaidForBreakfast}
          >
            Want to add breakfast for {formatCurrency(totalBreakfastPrice)}
          </CheckBox>
        </Box>
      )}

      <Box>
        <CheckBox
          checked={confirmPaid}
          id={bookingId}
          onChange={() => setConfirmPaid((confirmPaid) => !confirmPaid)}
          disabled={confirmPaid}
        >
          I confirm that {guests.fullName} has paid the total amount of{" "}
          {!isPaidForBreakfast
            ? formatCurrency(totalPrice)
            : `${formatCurrency(
                totalPrice + totalBreakfastPrice
              )} (${formatCurrency(totalPrice)} + ${formatCurrency(
                totalBreakfastPrice
              )})`}
        </CheckBox>
      </Box>
      <ButtonGroup>
        <Button
          variation="primary"
          sizes="medium"
          onClick={handleCheckin}
          disabled={!confirmPaid}
        >
          Check in booking #{bookingId}
        </Button>
        <Button variation="secondary" sizes="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
    </>
  );
}

export default CheckinBooking;

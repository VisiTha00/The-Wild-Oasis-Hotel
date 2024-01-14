import styled from "styled-components";
import { format, isToday } from "date-fns";

import Tag from "../../ui/Tag";
import Table from "../../ui/Table";

import { formatCurrency } from "../../utils/helpers";
import { formatDistanceFromNow } from "../../utils/helpers";
import Menus from "../../ui/Menus";
import {
  HiArrowDownOnSquare,
  HiArrowUpOnSquare,
  HiEye,
  HiTrash,
} from "react-icons/hi2";
import { useNavigate } from "react-router-dom";
import { useCheckOut } from "../check-in-out/useCheckOut";
import Spinner from "../../ui/Spinner";
import { useDeleteBooking } from "./useDeleteBooking";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useState } from "react";

const Cabin = styled.div`
  font-size: 1.6rem;
  font-weight: 600;
  color: var(--color-grey-600);
  font-family: "Sono";
`;

const Stacked = styled.div`
  display: flex;
  flex-direction: column;
  gap: 0.2rem;

  & span:first-child {
    font-weight: 500;
  }

  & span:last-child {
    color: var(--color-grey-500);
    font-size: 1.2rem;
  }
`;

const Amount = styled.div`
  font-family: "Sono";
  font-weight: 500;
`;

function BookingRow({
  booking: {
    id: bookingId,
    created_at,
    startDate,
    endDate,
    numNights,
    numGuests,
    totalPrice,
    status,
    guests: { fullName: guestName, email },
    cabins: { name: cabinName },
  },
}) {
  const navigate = useNavigate();

  const { updateChecking, isUpdating } = useCheckOut(bookingId);
  const { isDeleting, deleteCurrentBooking } = useDeleteBooking();
  const [isClickedDelete, setIsClickedDelete] = useState(false);

  const statusToTagName = {
    Unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isUpdating || isDeleting) {
    return <Spinner />;
  }

  return (
    <>
      <Table.Row>
        <Cabin>{cabinName}</Cabin>

        <Stacked>
          <span>{guestName}</span>
          <span>{email}</span>
        </Stacked>

        <Stacked>
          <span>
            {isToday(new Date(startDate))
              ? "Today"
              : formatDistanceFromNow(startDate)}{" "}
            &rarr; {numNights} night stay
          </span>
          <span>
            {format(new Date(startDate), "MMM dd yyyy")} &mdash;{" "}
            {format(new Date(endDate), "MMM dd yyyy")}
          </span>
        </Stacked>

        <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>

        <Amount>{formatCurrency(totalPrice)}</Amount>
        <Menus.Menu>
          <Menus.Toggle id={bookingId} />
          <Menus.List id={bookingId}>
            <Menus.Button onClick={() => navigate(`${bookingId}`)}>
              <HiEye /> See Details
            </Menus.Button>
            {status === "Unconfirmed" ? (
              <Menus.Button onClick={() => navigate(`/checkin/${bookingId}`)}>
                <HiArrowDownOnSquare /> Check In
              </Menus.Button>
            ) : (
              ""
            )}
            {status === "checked-in" ? (
              <Menus.Button onClick={() => updateChecking(bookingId)}>
                <HiArrowUpOnSquare /> Check Out
              </Menus.Button>
            ) : (
              ""
            )}
            <Menus.Button onClick={() => setIsClickedDelete(true)}>
              <HiTrash /> Delete Booking
            </Menus.Button>
          </Menus.List>
          `
        </Menus.Menu>
      </Table.Row>
      {isClickedDelete ? (
        <Modal onClose={() => setIsClickedDelete(false)}>
          <ConfirmDelete
            onClose={() => setIsClickedDelete(false)}
            resourceName={"booking"}
            onConfirm={() => deleteCurrentBooking(bookingId)}
          />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default BookingRow;

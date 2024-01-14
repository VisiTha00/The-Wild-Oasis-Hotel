import styled from "styled-components";

import BookingDataBox from "./BookingDataBox";
import Row from "../../ui/Row";
import Heading from "../../ui/Heading";
import Tag from "../../ui/Tag";
import ButtonGroup from "../../ui/ButtonGroup";
import Button from "../../ui/Button";
import ButtonText from "../../ui/ButtonText";

import { useMoveBack } from "../../hooks/useMoveBack";
import { useBooking } from "./useBooking";
import Spinner from "../../ui/Spinner";
import { useCheckOut } from "../check-in-out/useCheckOut";
import { useState } from "react";
import Modal from "../../ui/Modal";
import ConfirmDelete from "../../ui/ConfirmDelete";
import { useDeleteBooking } from "./useDeleteBooking";
import { useNavigate } from "react-router-dom";
import Empty from "../../ui/Empty";

const HeadingGroup = styled.div`
  display: flex;
  gap: 2.4rem;
  align-items: center;
`;

function BookingDetail() {
  const { booking = {}, isLoading } = useBooking();
  const moveBack = useMoveBack();
  const { updateChecking, isUpdating } = useCheckOut();
  const [isClickedDelete, setIsClickedDelete] = useState(false);
  const { isDeleting, deleteCurrentBooking } = useDeleteBooking();
  const navigate = useNavigate();
  const statusToTagName = {
    Unconfirmed: "blue",
    "checked-in": "green",
    "checked-out": "silver",
  };

  if (isLoading || isUpdating || isDeleting) {
    return <Spinner />;
  }

  if (!booking) {
    return <Empty />;
  }
  const status = booking.status;

  return (
    <>
      <Row type="horizontal">
        <HeadingGroup>
          <Heading as="h1">Booking #{booking.id}</Heading>
          <Tag type={statusToTagName[status]}>{status.replace("-", " ")}</Tag>
        </HeadingGroup>
        <ButtonText onClick={moveBack}>&larr; Back</ButtonText>
      </Row>

      <BookingDataBox booking={booking} />

      <ButtonGroup>
        {booking.status === "checked-in" ? (
          <Button
            variation="primary"
            sizes="medium"
            onClick={() => updateChecking(booking.id)}
          >
            Check Out
          </Button>
        ) : (
          ""
        )}
        <Button
          variation="danger"
          sizes="medium"
          onClick={() => setIsClickedDelete(true)}
        >
          Delete
        </Button>
        <Button variation="secondary" sizes="medium" onClick={moveBack}>
          Back
        </Button>
      </ButtonGroup>
      {isClickedDelete ? (
        <Modal onClose={() => setIsClickedDelete(false)}>
          <ConfirmDelete
            onClose={() => setIsClickedDelete(false)}
            resourceName={"booking"}
            onConfirm={() => {
              deleteCurrentBooking(booking.id);
              navigate("/bookings");
            }}
            disabled={isDeleting}
          />
        </Modal>
      ) : (
        ""
      )}
    </>
  );
}

export default BookingDetail;

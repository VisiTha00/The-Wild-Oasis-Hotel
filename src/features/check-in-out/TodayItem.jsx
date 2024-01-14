import styled from "styled-components";
import Tag from "../../ui/Tag";
import Button from "../../ui/Button";
import { useNavigate } from "react-router-dom";
import CheckoutButton from "./CheckoutButton";

const StyledTodayItem = styled.li`
  display: grid;
  grid-template-columns: 9rem 1fr 7rem 9rem;
  gap: 1.2rem;
  align-items: center;

  font-size: 1.4rem;
  padding: 0.8rem 0;
  border-bottom: 1px solid var(--color-grey-100);

  &:first-child {
    border-top: 1px solid var(--color-grey-100);
  }
`;

const Guest = styled.div`
  font-weight: 500;
`;

function TodayItem({ booking }) {
  const { id, guests, numNights, status } = booking;
  const navigate = useNavigate();
  return (
    <StyledTodayItem>
      {status === "Unconfirmed" && <Tag type="green">Arriving</Tag>}
      {status === "checked-in" && <Tag type="blue">Departing</Tag>}
      <Guest>{guests.fullName}</Guest>
      <div>
        {numNights} {numNights === 1 ? " Night" : "Nights"}
      </div>
      {status === "Unconfirmed" && (
        <Button
          sizes="small"
          variation="primary"
          onClick={() => navigate(`/checkin/${id}`)}
        >
          Check In
        </Button>
      )}
      {status === "checked-in" && <CheckoutButton bookingId={id} />}
    </StyledTodayItem>
  );
}

export default TodayItem;

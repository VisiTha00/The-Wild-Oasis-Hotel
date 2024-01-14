import styled from "styled-components";
import Button from "../../ui/Button";
import { useCheckOut } from "./useCheckOut";

const StyledSpan = styled.span`
  font-size: 12px;
  font-weight: 600;
`;
function CheckoutButton({ bookingId }) {
  const { updateChecking, isUpdating } = useCheckOut();
  return (
    <Button
      variation="primary"
      size="small"
      onClick={() => updateChecking(bookingId)}
      disabled={isUpdating}
    >
      <StyledSpan>CHECK OUT</StyledSpan>
    </Button>
  );
}

export default CheckoutButton;

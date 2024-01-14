import Row from "../ui/Row";
import Heading from "../ui/Heading";
import UpdateUserDataForm from "../features/authentication/UpdateUserDataForm";
import styled from "styled-components";
import UpdatePasswordForm from "../features/authentication/UpdatePasswordForm";

const StyledAccount = styled.div`
  display: flex;
  flex-direction: column;
  gap: 2rem;
`;

function Account() {
  return (
    <>
      <Heading as="h1">Update your account</Heading>

      <Row>
        <StyledAccount>
          <Heading as="h3">Update user data</Heading>
          <UpdateUserDataForm />
        </StyledAccount>
      </Row>

      <Row>
        <StyledAccount>
          <Heading as="h3">Update password</Heading>
          <UpdatePasswordForm />
        </StyledAccount>
      </Row>
    </>
  );
}

export default Account;

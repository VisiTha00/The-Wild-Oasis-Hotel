import styled from "styled-components";
import { useDarkMode } from "../contexts/darkModeContext";

const StyledLogo = styled.div`
  text-align: center;
  margin-bottom: 2rem;
`;

const Img = styled.img`
  height: 9.6rem;
  width: auto;
`;

function Logo() {
  const { darkModeOn } = useDarkMode();
  return (
    <StyledLogo>
      <Img src={!darkModeOn ? "/logo-light.png" : "logo-dark.png"} alt="Logo" />
    </StyledLogo>
  );
}

export default Logo;

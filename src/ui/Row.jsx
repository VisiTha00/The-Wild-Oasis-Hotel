import styled, { css } from "styled-components";

const Row = styled.div`
  display: flex;
  padding-left: 2%;
  padding-right: 2%;
  ${(props) =>
    props.type === "horizontal" &&
    css`
      align-items: center;
      justify-content: space-between;
      padding-top: 2%;
    `}
  ${(props) =>
    props.type === "vertical" &&
    css`
      flex-direction: column;

      gap: 1.6rem;
    `}
`;

export default Row;

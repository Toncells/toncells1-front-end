import styled from "styled-components";
import theme from "../../constants/theme";
import Cell from "../Cell";

export const Wrapper = styled.div<{
  isSelectMode: boolean;
}>`
  display: flex;
  flex-wrap: wrap;
  width: 380px;
  height: 380px;
  transition: 0.3s;
  transform: ${({ isSelectMode }) => (isSelectMode ? "scale(1.05)" : "none")};
  box-shadow: ${({ isSelectMode }) =>
    isSelectMode ? "0px 0px 25px rgba(0, 0, 0, 0.5)" : "none"};
  position: relative;

  img {
    position: absolute;
    width: 380px;
    height: 380px;
    z-index: 21;
    top: 0;
    image-rendering: pixelated;
    image-rendering: -moz-crisp-edges;
    image-rendering: crisp-edges;
  }

  @media screen and ${theme.device.tablet} {
    width: 320px;
    height: 320px;

    img {
      width: 320px;
      height: 320px;
    }
  }
`;

export const StyledCell = styled(Cell)<{
  isCellSelected?: boolean;
  isCurrentCell?: boolean;
}>`
  width: 95px;
  height: 95px;
  transition: 0.3s;
  transform: ${({ isCellSelected }) =>
    isCellSelected ? "scale(1.1)" : "none"};
  z-index: 22;
  transform: scale(1);

  @media screen and ${theme.device.tablet} {
    width: 80px;
    height: 80px;
  }
`;

// background: ${({ isCurrentCell }) =>
// isCurrentCell ? "rgba(0,0,0,0.6)" : "none"};

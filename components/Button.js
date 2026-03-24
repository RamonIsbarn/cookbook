import styled from "styled-components";

export function StyledButton({ colored, children, onClick, type, className }) {
  return (
    <StyledRegularButton
      $colored={colored}
      onClick={onClick}
      type={type}
      className={className}
    >
      {children}
    </StyledRegularButton>
  );
}

const StyledRegularButton = styled.button`
  font-size: 16px;
  border-radius: 99px;
  border: none;
  padding: 20px;
  cursor: pointer;
  background-color: ${({ $colored }) => ($colored ? "#deb96f" : "#ddd")};
  display: flex;
  align-items: center;
  &:hover {
    background-color: ${({ $colored }) => ($colored ? "#ccaa66" : "#ccc")};
  }
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  margin: auto;
  opacity: 0.7;
  &:hover {
    opacity: 1;
  }
`;

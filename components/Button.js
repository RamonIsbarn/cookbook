import styled from "styled-components";

export const StyledButton = styled.button`
  font-size: 16px;
  border-radius: 99px;
  border: none;
  padding: 20px;
  cursor: pointer;
  background-color: #ddd;
  &:hover {
    background-color: #ccc;
  }
`;

export const StyledIconButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  &:hover {
    opacity: 0.8;
  }
`;

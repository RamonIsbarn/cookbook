import styled from "styled-components";
import { SquarePen } from "lucide-react";
import { StyledIconButton } from "./Button";

export default function IngredientCard({ name, type, amount, onClick }) {
  return (
    <StyledContainer>
      <p>{name}</p>
      <p>{type}</p>
      <p>{amount}</p>
      <StyledIconButton onClick={onClick}>
        <SquarePen />
      </StyledIconButton>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr 1fr;
  border-radius: 99px;
  padding: 10px;
  box-shadow: 0 3px 10px #bbb;
`;

const StyledEditButton = styled(StyledIconButton)`
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

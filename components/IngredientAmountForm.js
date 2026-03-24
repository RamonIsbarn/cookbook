import styled from "styled-components";
import { Plus, Minus } from "lucide-react";
import { StyledButton } from "./Button";
import { useState } from "react";

export default function IngredientAmountForm({
  ingredient,
  onClick,
  ingredientToAdd,
}) {
  return (
    <>
      <h3>{ingredientToAdd.name}</h3>
      <p>{ingredientToAdd.type}</p>
      <p>Amount {ingredientToAdd.amount}</p>
      <StyledButtonContainer>
        <StyledButton
          type="button"
          onClick={() => {
            onClick({
              _id: ingredient[0]._id,
              name: ingredient[0].name,
              type: ingredient[0].type,
              amount: Number(ingredientToAdd.amount) + 1,
            });
          }}
        >
          <Plus />
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => {
            onClick({
              _id: ingredient[0]._id,
              name: ingredient[0].name,
              type: ingredient[0].type,
              amount: Number(ingredientToAdd.amount) - 1,
            });
          }}
        >
          <Minus />
        </StyledButton>
      </StyledButtonContainer>
    </>
  );
}

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-bottom: 20px;
`;

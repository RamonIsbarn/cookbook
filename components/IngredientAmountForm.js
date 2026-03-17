import styled from "styled-components";
import { Plus, Minus } from "lucide-react";
import { StyledButton } from "./Button";
import { useState } from "react";

export default function IngredientAmountForm({
  ingredient,
  onClick,
  ingredientTags,
  onCancel,
}) {
  const [ingredientToAdd, setIngredientToAdd] = useState({
    _id: ingredient[0]._id,
    name: ingredient[0].name,
    type: ingredient[0].type,
    amount: ingredientTags.find(
      (ingredientTag) => ingredientTag._id === ingredient[0]._id
    )
      ? ingredientTags.find(
          (ingredientTag) => ingredientTag._id === ingredient[0]._id
        ).amount
      : 0,
  });
  return (
    <>
      <h3>{ingredientToAdd.name}</h3>
      <p>{ingredientToAdd.type}</p>
      <p>Amount {ingredientToAdd.amount}</p>
      <StyledButtonContainer>
        <StyledButton
          type="button"
          onClick={() => {
            setIngredientToAdd({
              _id: ingredient[0]._id,
              name: ingredient[0].name,
              type: ingredient[0].type,
              amount: ingredientToAdd.amount + 1,
            });
          }}
        >
          <Plus />
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => {
            setIngredientToAdd({
              _id: ingredient[0]._id,
              name: ingredient[0].name,
              type: ingredient[0].type,
              amount: ingredientToAdd.amount - 1,
            });
          }}
        >
          <Minus />
        </StyledButton>
      </StyledButtonContainer>
      <StyledButtonContainerCenter>
        <StyledButton
          onClick={() => {
            onCancel(false);
          }}
        >
          Cancel
        </StyledButton>
        <StyledButton
          type="button"
          onClick={() => {
            onClick([
              ...ingredientTags.filter(
                (ingredient) => ingredient._id !== ingredientToAdd._id
              ),
              ingredientToAdd,
            ]);
            onCancel(false);
          }}
          colored={true}
        >
          Confirm
        </StyledButton>
      </StyledButtonContainerCenter>
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
const StyledButtonContainerCenter = styled(StyledButtonContainer)`
  justify-content: center;
`;

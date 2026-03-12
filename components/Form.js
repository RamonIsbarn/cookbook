import styled from "styled-components";
import { Trash2, Plus, Minus, SquarePen } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import { StyledButton, StyledIconButton } from "./Button";

export default function Form({ onCancel, defaultValues }) {
  const [amountInStock, setAmountInStock] = useState(
    Number(defaultValues.amount)
  );
  const [isEditingType, setIsEditingType] = useState(false);
  const [ingredientType, setIngredientType] = useState(defaultValues.type);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    const response = await fetch(`/api/ingredients/${defaultValues.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...defaultValues, ...data }),
    });

    if (response.ok) {
      mutate(`/api/ingredients`);
      onCancel();
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/ingredients/${defaultValues.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`/api/ingredients`);
      onCancel();
    }
  }

  return (
    <>
      <StyledOverlay />
      <StyledContainer>
        <h3>Update {defaultValues.name}</h3>
        <StyledForm onSubmit={handleSubmit}>
          <StyledFieldset>
            <StyledLabel htmlFor="amount">Amount</StyledLabel>
            <StyledInput
              type="number"
              value={amountInStock}
              readOnly
              inert="true"
              id="amount"
              name="amount"
            ></StyledInput>
            <StyledButtonContainer>
              <StyledAmountButton
                type="button"
                onClick={() => {
                  setAmountInStock(amountInStock + 1);
                }}
              >
                <Plus />
              </StyledAmountButton>
              <StyledAmountButton
                type="button"
                onClick={() => {
                  setAmountInStock(amountInStock - 1);
                }}
              >
                <Minus />
              </StyledAmountButton>
            </StyledButtonContainer>
          </StyledFieldset>
          <StyledFieldset>
            <>
              <StyledLabel>Type</StyledLabel>
              <StyledInput
                type="text"
                name="type"
                value={ingredientType}
                inert="true"
                readOnly
              ></StyledInput>
            </>
            {isEditingType ? (
              <StyledPopUp>
                <StyledLabel htmlFor="type">Edit Type</StyledLabel>
                <StyledEditInput
                  type="text"
                  id="type"
                  value={ingredientType}
                  onChange={(event) => setIngredientType(event.target.value)}
                ></StyledEditInput>
                <StyledButtonContainerCenter>
                  <StyledButton
                    type="button"
                    onClick={() => {
                      setIsEditingType(false);
                      setIngredientType(defaultValues.type);
                    }}
                  >
                    Cancel
                  </StyledButton>
                  <StyledButton
                    type="button"
                    onClick={() => {
                      setIsEditingType(false);
                    }}
                  >
                    Save changes
                  </StyledButton>
                </StyledButtonContainerCenter>
              </StyledPopUp>
            ) : null}
            <StyledButtonContainer>
              <StyledIconButton
                type="button"
                onClick={() => {
                  setIsEditingType(true);
                }}
              >
                <SquarePen />
              </StyledIconButton>
            </StyledButtonContainer>
          </StyledFieldset>
          <StyledFieldset>
            <StyledButtonContainerCenter>
              <StyledButton onClick={onCancel}>Cancel</StyledButton>
              <StyledButton type="submit">Save changes</StyledButton>
            </StyledButtonContainerCenter>
          </StyledFieldset>
        </StyledForm>
        {isDeleting ? (
          <StyledPopUp>
            <p>Are you sure you want to delete {defaultValues.name}</p>
            <StyledButtonContainerCenter>
              <StyledButton
                onClick={() => {
                  setIsDeleting(false);
                }}
              >
                Cancel
              </StyledButton>
              <StyledButton onClick={handleDelete}>Confirm</StyledButton>
            </StyledButtonContainerCenter>
          </StyledPopUp>
        ) : (
          <StyledDeleteButton
            onClick={() => {
              setIsDeleting(true);
            }}
          >
            <Trash2 />
          </StyledDeleteButton>
        )}
      </StyledContainer>
    </>
  );
}

const StyledOverlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  position: absolute;
  top: 0;
  left: 0;
  z-index: 10;
`;
const StyledContainer = styled.div`
  background-color: #fff;
  border-radius: 20px;
  padding: 20px;
  z-index: 15;
  position: absolute;
  width: 95vw;
  top: 50%;
  transform: translateY(-50%);
`;
const StyledForm = styled.form`
  display: flex;
  justify-content: center;
  flex-direction: column;
  gap: 20px;
`;
const StyledFieldset = styled.fieldset`
  margin: 0;
  padding: 0;
  border: none;
  display: flex;
  justify-content: space-around;
  gap: 20px;
  align-items: center;
`;
const StyledDeleteButton = styled(StyledIconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const StyledInput = styled.input`
  border: none;
  appearance: textfield;
  width: 100%;
  font-size: 16px;
`;
const StyledEditInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 20px;
  border-radius: 99px;
  border: 1px solid #000;
  margin: 20px 0;
`;
const StyledAmountButton = styled(StyledButton)`
  display: flex;
  align-items: center;
  width: fit-content;
`;
const StyledLabel = styled.label`
  width: 100%;
  text-align: left;
`;
const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;
`;
const StyledButtonContainerCenter = styled(StyledButtonContainer)`
  justify-content: center;
`;
const StyledPopUp = styled.div`
  position: absolute;
  z-index: 20;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 3px 10px #bbb;
  top: 50%;
  transform: translateY(-50%);
  width: 85vw;
  padding: 20px;
`;

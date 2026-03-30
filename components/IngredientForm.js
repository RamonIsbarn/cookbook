import styled from "styled-components";
import { Trash2, Plus, Minus, SquarePen } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import { StyledButton, StyledIconButton } from "./Button";
import Dialog from "./Dialog";

export default function Form({
  onCancel,
  defaultValues,
  formType,
  onDelete,
  onSubmit,
}) {
  !defaultValues &&
    (defaultValues = { id: "", name: "", type: "", amount: "" });
  const [amountInStock, setAmountInStock] = useState(
    Number(defaultValues.amount)
  );
  const [isEditingType, setIsEditingType] = useState(false);
  const [ingredientType, setIngredientType] = useState(defaultValues.type);

  return (
    <>
      <StyledOverlay />
      <StyledContainer>
        <h3>
          {formType === "edit"
            ? `Update ${defaultValues.name}`
            : "Add new Ingredient"}
        </h3>
        <StyledForm onSubmit={onSubmit}>
          {formType === "edit" ? (
            <>
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
                  <StyledButton
                    type="button"
                    onClick={() => {
                      setAmountInStock(amountInStock + 1);
                    }}
                  >
                    <Plus />
                  </StyledButton>
                  <StyledButton
                    type="button"
                    onClick={() => {
                      setAmountInStock(amountInStock - 1);
                    }}
                  >
                    <Minus />
                  </StyledButton>
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
                {isEditingType && (
                  <StyledPopUp>
                    <StyledLabel htmlFor="type">Edit Type</StyledLabel>
                    <StyledEditInput
                      type="text"
                      id="type"
                      value={ingredientType}
                      onChange={(event) =>
                        setIngredientType(event.target.value)
                      }
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
                        colored={true}
                      >
                        Save changes
                      </StyledButton>
                    </StyledButtonContainerCenter>
                  </StyledPopUp>
                )}
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
              <Dialog buttonText={<Trash2 />} onSubmit={onDelete}>
                <p>Are you sure you want to delete {defaultValues.name}</p>
              </Dialog>
            </>
          ) : (
            <>
              <StyledTextFieldset>
                <StyledLabel htmlFor="name">Name</StyledLabel>
                <StyledTextInput
                  type="text"
                  id="name"
                  name="name"
                ></StyledTextInput>
              </StyledTextFieldset>
              <StyledTextFieldset>
                <StyledLabel htmlFor="type">Type</StyledLabel>
                <StyledTextInput
                  type="text"
                  id="type"
                  name="type"
                ></StyledTextInput>
              </StyledTextFieldset>
            </>
          )}

          <StyledFieldset>
            <StyledButtonContainerCenter>
              <StyledButton onClick={onCancel}>Cancel</StyledButton>
              <StyledButton type="submit" colored={true}>
                {formType === "edit" ? "Save changes" : "Add new"}
              </StyledButton>
            </StyledButtonContainerCenter>
          </StyledFieldset>
        </StyledForm>
      </StyledContainer>
    </>
  );
}

const StyledOverlay = styled.div`
  background-color: #000;
  opacity: 0.5;
  width: 100vw;
  height: 100vh;
  position: fixed;
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
const StyledTextFieldset = styled(StyledFieldset)`
  display: grid;
  grid-template-columns: 1fr 3fr;
`;
const StyledInput = styled.input`
  border: none;
  appearance: textfield;
  width: 100%;
  font-size: 16px;
`;
const StyledTextInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 20px;
  border-radius: 99px;
  border: 1px solid #000;
`;
const StyledEditInput = styled(StyledTextInput)`
  margin: 20px 0;
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

import styled from "styled-components";
import { Trash2, Plus, LucideX } from "lucide-react";
import { useState } from "react";
import { mutate } from "swr";
import { StyledButton, StyledIconButton } from "./Button";
import IngredientAmountForm from "./IngredientAmountForm";

export default function RecipeForm({
  onCancel,
  formType,
  ingredients,
  defaultValues,
}) {
  const [ingredientTags, setIngredientTags] = useState(
    formType === "edit"
      ? defaultValues.ingredients.map((ingredient) => ({
          ...ingredient,
          _id: ingredient.ingredient,
          name: ingredients.find(
            (unsortedIngredient) =>
              unsortedIngredient._id === ingredient.ingredient
          ).name,
          type: ingredients.find(
            (unsortedIngredient) =>
              unsortedIngredient._id === ingredient.ingredient
          ).type,
          amount: ingredient.amount,
        }))
      : []
  );

  const [isEditingIngredients, setIsEditingIngredients] = useState(false);
  const [isEditingIngredientAmount, setIsEditingIngredientAmount] =
    useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleSubmit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);
    data.ingredients = ingredientTags.map((ingredient) =>
      Object.fromEntries([
        ["ingredient", ingredient._id],
        ["amount", ingredient.amount],
      ])
    );

    let response = null;
    if (formType === "edit") {
      response = await fetch(`/api/recipes/${defaultValues._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...defaultValues, ...data }),
      });
    }
    if (formType === "add") {
      response = await fetch(`/api/recipes/`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...data }),
      });
    }
    if (response.ok) {
      mutate(`/api/recipes`);
      onCancel();
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/recipes/${defaultValues._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`/api/recipes`);
      onCancel();
    }
  }

  return (
    <>
      <StyledOverlay />
      <StyledContainer>
        <h3>
          {formType === "edit"
            ? `Update ${defaultValues.name}`
            : "Add new Recipe"}
        </h3>
        <StyledForm onSubmit={handleSubmit}>
          <>
            <StyledFieldset>
              <StyledLabel htmlFor="name">Name</StyledLabel>
              <StyledTextInput
                type="text"
                id="name"
                name="name"
                required
                defaultValue={formType === "edit" ? defaultValues.name : null}
              ></StyledTextInput>
            </StyledFieldset>
            <StyledFieldset>
              <StyledLabel>Ingredients</StyledLabel>
              <StyledTagContainer>
                {ingredientTags.map((ingredient) => (
                  <IngredientTag key={ingredient._id}>
                    <StyledIconButton
                      type="button"
                      onClick={() => {
                        setIsEditingIngredientAmount([ingredient]);
                      }}
                    >
                      {ingredient.name} x {ingredient.amount}
                    </StyledIconButton>
                    <StyledIconButton
                      type="button"
                      onClick={() => {
                        setIngredientTags(
                          ingredientTags.filter(
                            (ingredientTag) =>
                              ingredientTag._id !== ingredient._id
                          )
                        );
                      }}
                    >
                      <LucideX />
                    </StyledIconButton>
                  </IngredientTag>
                ))}
                <StyledButton
                  type="button"
                  onClick={() => {
                    setIsEditingIngredients(true);
                  }}
                  colored={true}
                >
                  <Plus />
                </StyledButton>
              </StyledTagContainer>
              {isEditingIngredients ? (
                <StyledPopUp>
                  <StyledIngredientContainer>
                    {ingredients.map((ingredient) => (
                      <StyledIngredient
                        type="button"
                        key={ingredient._id}
                        onClick={() => {
                          setIsEditingIngredientAmount([ingredient]);
                        }}
                      >
                        {ingredient.name}
                      </StyledIngredient>
                    ))}
                  </StyledIngredientContainer>
                  <StyledCancelButton
                    onClick={() => {
                      setIsEditingIngredients(false);
                    }}
                  >
                    <LucideX />
                  </StyledCancelButton>
                </StyledPopUp>
              ) : null}
              {isEditingIngredientAmount ? (
                <StyledPopUp>
                  <IngredientAmountForm
                    onClick={setIngredientTags}
                    ingredientTags={ingredientTags}
                    onCancel={setIsEditingIngredientAmount}
                    ingredient={isEditingIngredientAmount}
                  />
                </StyledPopUp>
              ) : null}
            </StyledFieldset>
            <StyledFieldset>
              <StyledLabel htmlFor="recipe">Recipe</StyledLabel>
              <StyledTextarea
                type="text"
                id="recipe"
                name="recipe"
                required
                defaultValue={formType === "edit" ? defaultValues.recipe : null}
              ></StyledTextarea>
            </StyledFieldset>
          </>
          <StyledFieldset>
            <StyledButtonContainerCenter>
              <StyledButton onClick={onCancel}>Cancel</StyledButton>
              <StyledButton type="submit" colored={true}>
                {formType === "edit" ? "Save changes" : "Add new"}
              </StyledButton>
            </StyledButtonContainerCenter>
          </StyledFieldset>
        </StyledForm>
        {formType === "edit" ? (
          isDeleting ? (
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
                <StyledButton
                  type="button"
                  onClick={handleDelete}
                  colored={true}
                >
                  Confirm
                </StyledButton>
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
          )
        ) : null}
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
  display: block;
  text-align: left;
`;
const StyledCancelButton = styled(StyledIconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const StyledTextInput = styled.input`
  width: 100%;
  font-size: 16px;
  padding: 20px;
  border-radius: 99px;
  border: 1px solid #000;
`;
const StyledTextarea = styled.textarea`
  width: 100%;
  font-size: 16px;
  border-radius: 35px;
  padding: 10px;
  border: 10px #fff solid;
  outline: 1px solid #000;
  resize: vertical;
  font-family: "Roboto", sans-serif;
  height: 180px;
`;
const StyledLabel = styled.label`
  display: block;
  margin-bottom: 10px;
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
  text-align: center;
`;
const IngredientTag = styled.div`
  display: flex;
  justify-content: center;
  width: fit-content;
  padding: 10px;
  background-color: #deb96f;
  border-radius: 99px;
  height: fit-content;
  &:hover {
    background-color: #ccaa66;
  }
`;
const StyledTagContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-wrap: wrap;
`;
const StyledIngredient = styled(StyledIconButton)`
  font-size: 16px;
  width: 100%;
  justify-content: left;
  padding: 10px;
`;
const StyledIngredientContainer = styled.div`
  max-height: 300px;
  overflow: scroll;
`;
const StyledDeleteButton = styled(StyledIconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;

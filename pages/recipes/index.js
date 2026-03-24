import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import RecipesCard from "@/components/RecipesCard";
import styled from "styled-components";
import RecipeForm from "@/components/RecipeForm";
import { useState } from "react";
import { StyledButton, StyledIconButton } from "@/components/Button";
import { Plus, SlidersHorizontal, Square, SquareCheck } from "lucide-react";
import { mutate } from "swr";
import Dialog from "@/components/Dialog";

export default function RecipesList() {
  const { data: recipes, isLoading, error } = useSWR(`/api/recipes`);
  const {
    data: ingredients,
    ingredientsIsLoading,
    ingredientserror,
  } = useSWR(`/api/ingredients`);
  const [isAdding, setIsAdding] = useState(false);
  const [recipesFilter, setRecipesFilter] = useState(false);
  const [ingredientTags, setIngredientTags] = useState([]);

  if (error || ingredientserror) return <div>failed to load</div>;
  if (isLoading || ingredientsIsLoading || !ingredients)
    return <div>loading...</div>;

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

    response = await fetch(`/api/recipes/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data }),
    });

    if (response.ok) {
      mutate(`/api/recipes`);
      setIsAdding(false);
    }
  }

  function filterRecipes(recipe) {
    if (
      recipe.ingredients.every(
        (recipeIngredient) =>
          ingredients.find(
            (unfilteredIngredient) =>
              unfilteredIngredient._id === recipeIngredient.ingredient
          ).amount <= recipeIngredient.amount
      )
    ) {
      return recipe;
    }
  }

  const filteredRecipes = recipesFilter
    ? recipes.filter(filterRecipes)
    : recipes;

  return (
    <>
      <PageStructure headline="Recipes">
        <StyledDialog buttonText={<SlidersHorizontal />} noSubmit>
          <h3>Filter recipes</h3>
          <StyledFilterButton
            onClick={() => {
              setRecipesFilter(!recipesFilter);
            }}
          >
            {recipesFilter ? <SquareCheck /> : <Square />} Only show available
            recipes
          </StyledFilterButton>
        </StyledDialog>
        <RecipesContainer>
          {filteredRecipes.map((recipe) => {
            return <RecipesCard key={recipe._id} name={recipe.name} />;
          })}
        </RecipesContainer>
        <StyledAddButton
          onClick={() => {
            setIsAdding(true);
          }}
          colored={true}
        >
          <Plus />
        </StyledAddButton>
        {isAdding && (
          <RecipeForm
            onCancel={() => {
              setIsAdding(false);
            }}
            formType="add"
            ingredients={ingredients}
            onSubmit={handleSubmit}
            ingredientTags={ingredientTags}
            setIngredientTags={setIngredientTags}
          ></RecipeForm>
        )}
      </PageStructure>
    </>
  );
}

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;
const StyledAddButton = styled(StyledButton)`
  position: absolute;
  right: 20px;
  bottom: 100px;
`;
const StyledFilterButton = styled(StyledIconButton)`
  margin-bottom: 20px;
  display: flex;
  gap: 5px;
`;
const StyledDialog = styled(Dialog)`
  top: 120px;
`;

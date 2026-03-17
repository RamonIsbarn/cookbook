import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import RecipesCard from "@/components/RecipesCard";
import styled from "styled-components";
import RecipeForm from "@/components/RecipeForm";
import { useState } from "react";
import { StyledButton } from "@/components/Button";
import { Plus } from "lucide-react";

export default function RecipesList() {
  const { data: recipes, isLoading, error } = useSWR(`/api/recipes`);
  const {
    data: ingredients,
    ingredientsIsLoading,
    ingredientserror,
  } = useSWR(`/api/ingredients`);
  const [isAdding, setIsAdding] = useState(false);

  if (error || ingredientserror) return <div>failed to load</div>;
  if (isLoading || ingredientsIsLoading) return <div>loading...</div>;

  return (
    <>
      <PageStructure headline="Recipes">
        <RecipesContainer>
          {recipes.map((recipe) => {
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
        {isAdding ? (
          <RecipeForm
            onCancel={() => {
              setIsAdding(false);
            }}
            formType="add"
            ingredients={ingredients}
          ></RecipeForm>
        ) : null}
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

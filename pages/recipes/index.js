import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import RecipesCard from "@/components/RecipesCard";
import styled from "styled-components";
import RecipeForm from "@/components/RecipeForm";
import { useState } from "react";
import { StyledButton, StyledIconButton } from "@/components/Button";
import { Plus, SlidersHorizontal } from "lucide-react";

export default function RecipesList() {
  const { data: recipes, isLoading, error } = useSWR(`/api/recipes`);
  const {
    data: ingredients,
    ingredientsIsLoading,
    ingredientserror,
  } = useSWR(`/api/ingredients`);
  const [isAdding, setIsAdding] = useState(false);
  const [recipesFilter, setRecipesFilter] = useState("all");
  const [isFiltering, setIsFiltering] = useState(false);

  if (error || ingredientserror) return <div>failed to load</div>;
  if (isLoading || ingredientsIsLoading) return <div>loading...</div>;

  return (
    <>
      <PageStructure headline="Recipes">
        <StyledFilterButton
          onClick={() => {
            setIsFiltering(true);
          }}
        >
          <SlidersHorizontal />
        </StyledFilterButton>
        {isFiltering ? (
          <StyledPopUp>
            <h3>test</h3>
          </StyledPopUp>
        ) : null}
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
const StyledFilterButton = styled(StyledIconButton)`
  position: absolute;
  top: 120px;
  right: 20px;
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

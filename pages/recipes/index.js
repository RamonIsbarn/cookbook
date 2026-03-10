import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import RecipesCard from "@/components/RecipesCard";
import styled from "styled-components";

export default function IngredientsList() {
  const { data: recipes, isLoading, error } = useSWR(`/api/recipes`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <PageStructure headline="Recipes">
        <RecipesContainer>
          {recipes.map((recipe) => {
            return <RecipesCard key={recipe._id} name={recipe.name} />;
          })}
        </RecipesContainer>
      </PageStructure>
    </>
  );
}

const RecipesContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

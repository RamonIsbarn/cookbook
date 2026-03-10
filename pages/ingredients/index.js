import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import IngredientCard from "@/components/IngredientCard";
import styled from "styled-components";

export default function IngredientsList() {
  const { data: ingredients, isLoading, error } = useSWR(`/api/ingredients`);
  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <PageStructure headline="Ingredients">
        <IngredientsContainer>
          {ingredients.map((ingredient) => {
            return (
              <IngredientCard
                key={ingredient._id}
                name={ingredient.name}
                type={ingredient.type}
                amount={ingredient.amount}
              />
            );
          })}
        </IngredientsContainer>
      </PageStructure>
    </>
  );
}

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

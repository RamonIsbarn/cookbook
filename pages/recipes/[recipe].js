import { useRouter } from "next/router";
import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import styled from "styled-components";
import { SquarePen } from "lucide-react";
import { StyledIconButton } from "@/components/Button";
import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";

export default function RecipeDetailPage() {
  const router = useRouter();
  const { recipe } = router.query;
  const {
    data: recipes,
    recipesIsLoading,
    recipesError,
  } = useSWR(`/api/recipes`);
  const {
    data: unfilteredIngredients,
    ingredientsIsLoading,
    ingredientserror,
  } = useSWR(`/api/ingredients`);

  const [isEditingRecipe, setIsEditingRecipe] = useState(false);

  if (recipesError || ingredientserror) return <div>failed to load</div>;
  if (
    recipesIsLoading ||
    ingredientsIsLoading ||
    !recipes ||
    !unfilteredIngredients
  )
    return <div>loading...</div>;

  const currentRecipe = recipes.filter(
    (fetchedRecipe) => fetchedRecipe.name === recipe
  )[0];

  if (!currentRecipe) {
    return (
      <PageStructure>
        <h3>404</h3>
        <p>No Recipe with that name found</p>
        <Link href="/recipes">View all Recipes</Link>
      </PageStructure>
    );
  }

  const filteredIngredients = [...currentRecipe.ingredients].map(
    (ingredientObject) => ({
      ...ingredientObject,
      ingredient: unfilteredIngredients.find(
        (unfilteredIngredient) =>
          unfilteredIngredient._id === ingredientObject.ingredient
      ).name,
      type: unfilteredIngredients.find(
        (unfilteredIngredient) =>
          unfilteredIngredient._id === ingredientObject.ingredient
      ).type,
      _id: ingredientObject.ingredient,
    })
  );

  return (
    <PageStructure headline={recipe}>
      <RecipeContainer>
        <StyledEditButton
          onClick={() => {
            setIsEditingRecipe(true);
          }}
        >
          <SquarePen />
        </StyledEditButton>
        <h3>Ingredients:</h3>
        <StyledList>
          {filteredIngredients.map((ingredient) => {
            return (
              <li key={ingredient.ingredient}>
                {`${ingredient.amount} x ${ingredient.type} ${ingredient.ingredient} - `}
                {unfilteredIngredients.find(
                  (unfilteredIngredient) =>
                    unfilteredIngredient._id === ingredient._id
                ).amount >= ingredient.amount ? (
                  <PositiveIngredientCount>
                    enough in stock
                  </PositiveIngredientCount>
                ) : (
                  <NegativeIngredientCount>
                    not enough in stock
                  </NegativeIngredientCount>
                )}
              </li>
            );
          })}
        </StyledList>
        <h3>Recipe:</h3>
        <p>{currentRecipe.recipe}</p>
      </RecipeContainer>
      {isEditingRecipe ? (
        <RecipeForm
          onCancel={() => {
            setIsEditingRecipe(false);
          }}
          formType="edit"
          ingredients={unfilteredIngredients}
          defaultValues={currentRecipe}
        />
      ) : null}
    </PageStructure>
  );
}

const RecipeContainer = styled.div`
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 10px #bbb;
  text-align: left;
  position: relative;
`;
const StyledEditButton = styled(StyledIconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const PositiveIngredientCount = styled.span`
  padding: 10px;
  background-color: #8cde6f;
  border-radius: 99px;
  display: inline-block;
`;
const NegativeIngredientCount = styled.span`
  padding: 10px;
  background-color: #aaa;
  border-radius: 99px;
  display: inline-block;
`;
const StyledList = styled.ul`
  display: flex;
  flex-direction: column;
  gap: 10px;
  list-style-type: none;
  padding-left: 0;
`;

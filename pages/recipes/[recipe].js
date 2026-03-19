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
        <ul>
          {filteredIngredients.map((ingredient) => {
            return (
              <li key={ingredient.ingredient}>
                {ingredient.amount} x {ingredient.type} {ingredient.ingredient}
              </li>
            );
          })}
        </ul>
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

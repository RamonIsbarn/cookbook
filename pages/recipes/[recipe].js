import { useRouter } from "next/router";
import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import styled from "styled-components";

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

  let ingredientIds = [];
  currentRecipe.ingredients.forEach((ingredient) =>
    ingredientIds.push(ingredient.ingredient)
  );

  const ingredients = ingredientIds.map(
    (ingredient) =>
      unfilteredIngredients.find(
        (unfilteredIngredient) => unfilteredIngredient._id === ingredient
      ).name
  );

  return (
    <PageStructure headline={recipe}>
      <RecipeContainer>
        <h3>Ingredients:</h3>
        <ul>
          {ingredients.map((ingredient) => {
            return <li key={ingredient}>{ingredient}</li>;
          })}
        </ul>
        <h3>Recipe:</h3>
        <p>{currentRecipe.recipe}</p>
      </RecipeContainer>
    </PageStructure>
  );
}

const RecipeContainer = styled.div`
  padding: 20px;
  border-radius: 20px;
  box-shadow: 0 3px 10px #bbb;
  text-align: left;
`;

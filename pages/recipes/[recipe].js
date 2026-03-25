import { useRouter } from "next/router";
import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import styled from "styled-components";
import { SquarePen } from "lucide-react";
import { StyledIconButton } from "@/components/Button";
import { useState } from "react";
import RecipeForm from "@/components/RecipeForm";
import Link from "next/link";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

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

  const { data: session } = useSession();

  const [isEditingRecipe, setIsEditingRecipe] = useState(false);
  const [ingredientTags, setIngredientTags] = useState();

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

    response = await fetch(`/api/recipes/${currentRecipe._id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...currentRecipe, ...data }),
    });

    if (response.ok) {
      mutate(`/api/recipes`);
      setIsEditingRecipe(false);
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/recipes/${currentRecipe._id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`/api/recipes`);
    }
  }

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
        {session && (
          <StyledEditButton
            onClick={() => {
              setIsEditingRecipe(true);
              setIngredientTags(
                currentRecipe.ingredients.map((ingredient) => ({
                  ...ingredient,
                  _id: ingredient.ingredient,
                  name: unfilteredIngredients.find(
                    (unsortedIngredient) =>
                      unsortedIngredient._id === ingredient.ingredient
                  ).name,
                  type: unfilteredIngredients.find(
                    (unsortedIngredient) =>
                      unsortedIngredient._id === ingredient.ingredient
                  ).type,
                  amount: ingredient.amount,
                }))
              );
            }}
          >
            <SquarePen />
          </StyledEditButton>
        )}
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
      {isEditingRecipe && (
        <RecipeForm
          onCancel={() => {
            setIsEditingRecipe(false);
          }}
          formType="edit"
          ingredients={unfilteredIngredients}
          defaultValues={currentRecipe}
          onDelete={handleDelete}
          onSubmit={handleSubmit}
          ingredientTags={ingredientTags}
          setIngredientTags={setIngredientTags}
        />
      )}
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

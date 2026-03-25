import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import IngredientCard from "@/components/IngredientCard";
import styled from "styled-components";
import { useState } from "react";
import Form from "@/components/IngredientForm";
import { StyledButton } from "@/components/Button";
import { Plus } from "lucide-react";
import { mutate } from "swr";
import { useSession } from "next-auth/react";

export default function IngredientsList() {
  const { data: ingredients, isLoading, error } = useSWR(`/api/ingredients`);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);
  const { data: session } = useSession();

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  async function handleAdd(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let response = null;

    response = await fetch(`/api/ingredients/`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...data, amount: 0 }),
    });

    if (response.ok) {
      mutate(`/api/ingredients`);
      setIsEditing(false);
    }
  }

  async function handleEdit(event) {
    event.preventDefault();
    const formData = new FormData(event.target);
    const data = Object.fromEntries(formData);

    let response = null;

    response = await fetch(`/api/ingredients/${isEditing.id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ ...isEditing, ...data }),
    });

    if (response.ok) {
      mutate(`/api/ingredients`);
      setIsEditing(false);
    }
  }

  async function handleDelete() {
    const response = await fetch(`/api/ingredients/${isEditing.id}`, {
      method: "DELETE",
    });
    if (response.ok) {
      mutate(`/api/ingredients`);
      setIsEditing(false);
    }
  }

  return (
    <>
      <PageStructure headline="Ingredients">
        {isEditing && (
          <Form
            onCancel={() => {
              setIsEditing(false);
            }}
            defaultValues={isEditing}
            formType="edit"
            onSubmit={handleEdit}
            onDelete={handleDelete}
          ></Form>
        )}
        <IngredientsContainer>
          {ingredients.map((ingredient) => {
            return (
              <IngredientCard
                key={ingredient._id}
                name={ingredient.name}
                type={ingredient.type}
                amount={ingredient.amount}
                onClick={() => {
                  setIsEditing({
                    id: ingredient._id,
                    name: ingredient.name,
                    type: ingredient.type,
                    amount: ingredient.amount,
                  });
                }}
              />
            );
          })}
        </IngredientsContainer>
        {session && (
          <StyledAddButton
            onClick={() => {
              setIsAdding(true);
            }}
            colored={true}
          >
            <Plus />
          </StyledAddButton>
        )}
        {isAdding && (
          <Form
            onCancel={() => {
              setIsAdding(false);
            }}
            formType="add"
            onSubmit={handleAdd}
          ></Form>
        )}
      </PageStructure>
    </>
  );
}

const IngredientsContainer = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

const StyledAddButton = styled(StyledButton)`
  position: absolute;
  right: 20px;
  bottom: 100px;
`;

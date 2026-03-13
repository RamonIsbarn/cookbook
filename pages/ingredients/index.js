import { PageStructure } from "@/components/PageStructure";
import useSWR from "swr";
import IngredientCard from "@/components/IngredientCard";
import styled from "styled-components";
import { useState } from "react";
import Form from "@/components/Form";
import { StyledButton } from "@/components/Button";
import { Plus } from "lucide-react";

export default function IngredientsList() {
  const { data: ingredients, isLoading, error } = useSWR(`/api/ingredients`);
  const [isEditing, setIsEditing] = useState(false);
  const [isAdding, setIsAdding] = useState(false);

  if (error) return <div>failed to load</div>;
  if (isLoading) return <div>loading...</div>;

  return (
    <>
      <PageStructure headline="Ingredients">
        {isEditing ? (
          <Form
            onCancel={() => {
              setIsEditing(false);
            }}
            defaultValues={isEditing}
            formType="edit"
          ></Form>
        ) : null}
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
        <StyledAddButton
          onClick={() => {
            setIsAdding(true);
          }}
          colored={true}
        >
          <Plus />
        </StyledAddButton>
        {isAdding ? (
          <Form
            onCancel={() => {
              setIsAdding(false);
            }}
            formType="add"
          ></Form>
        ) : null}
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

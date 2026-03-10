import styled from "styled-components";

export default function IngredientCard({ name, type, amount }) {
  return (
    <StyledContainer>
      <p>{name}</p>
      <p>{type}</p>
      <p>{amount}</p>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 99px;
  padding: 10px;
  box-shadow: 0 3px 10px #bbb;
`;

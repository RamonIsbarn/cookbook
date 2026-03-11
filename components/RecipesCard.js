import styled from "styled-components";
import Link from "next/link";

export default function RecipesCard({ name }) {
  return (
    <StyledContainer>
      <StyledLink href={"/recipes/" + name}>{name}</StyledLink>
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr 1fr;
  border-radius: 99px;
  padding: 25px;
  box-shadow: 0 3px 10px #bbb;
`;

const StyledLink = styled(Link)`
  color: #000;
  text-decoration: none;
`;

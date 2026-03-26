import styled from "styled-components";
import { SquarePen } from "lucide-react";
import { StyledIconButton } from "./Button";
import { useSession } from "next-auth/react";

export default function IngredientCard({ name, type, amount, onClick }) {
  const { data: session } = useSession();
  return (
    <StyledContainer $session={session}>
      <p>{name}</p>
      <p>{type}</p>
      <p>{amount}</p>
      {session && (
        <StyledIconButton onClick={onClick}>
          <SquarePen />
        </StyledIconButton>
      )}
    </StyledContainer>
  );
}

const StyledContainer = styled.div`
  display: grid;
  grid-template-columns: ${({ $session }) =>
    $session ? "1fr 1fr 1fr 1fr" : "1fr 1fr 1fr"};
  border-radius: 99px;
  padding: 10px;
  box-shadow: 0 3px 10px #bbb;
`;

const StyledEditButton = styled(StyledIconButton)`
  background-color: #fff;
  border: none;
  cursor: pointer;
`;

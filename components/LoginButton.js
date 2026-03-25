import { useSession, signIn, signOut } from "next-auth/react";
import styled from "styled-components";
import { UserRound } from "lucide-react";
import Dialog from "./Dialog";
import { StyledButton } from "./Button";

export default function LoginButton() {
  const { data: session } = useSession();

  if (session) {
    return (
      <StyledDialog
        buttonText={
          session.user.image ? (
            <StyledImg
              src={session.user.image}
              alt="profile picture of the user"
            />
          ) : (
            <UserRound />
          )
        }
        noSubmit
      >
        <StyledSignOutButton onClick={() => signOut()}>
          Sign out
        </StyledSignOutButton>
      </StyledDialog>
    );
  }
  return (
    <StyledProfileIcon onClick={() => signIn()}>
      <UserRound />
    </StyledProfileIcon>
  );
}

const StyledProfileIcon = styled.button`
  border-radius: 99px;
  background-color: #ddd;
  border: none;
  position: absolute;
  left: 20px;
  cursor: pointer;
  width: 50px;
  aspect-ratio: 1;
  &: hover {
    background-color: #ccc;
    box-shadow: 0 3px 10px #bbb;
  }
`;

const StyledDialog = styled(Dialog)`
  border-radius: 99px;
  background-color: #deb96f;
  border: none;
  position: absolute;
  left: 20px;
  top: unset;
  right: unset;
  opacity: 1;
  cursor: pointer;
  width: 50px;
  aspect-ratio: 1;
  padding: 0;
  overflow: hidden;
  &: hover {
    background-color: #ccaa66;
    box-shadow: 0 3px 10px #bbb;
  }
`;

const StyledSignOutButton = styled(StyledButton)`
  margin: auto;
`;
const StyledImg = styled.img`
  width: 100%;
`;

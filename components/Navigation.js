import styled from "styled-components";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
import { useSession, signIn, signOut } from "next-auth/react";

export default function Navigation() {
  const [navOpen, setNavOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (navOpen) {
      setNavOpen(!navOpen);
    }
  }, [router.asPath]);

  return (
    <>
      <StyledBurgerIcon
        onClick={() => {
          setNavOpen(!navOpen);
        }}
      >
        {navOpen ? "✕" : "☰"}
      </StyledBurgerIcon>
      <StyledNavContainer $navOpen={navOpen}>
        <StyledNavList>
          <StyledNavListItem>
            <StyledLink href="/ingredients">Ingredients</StyledLink>
          </StyledNavListItem>
          <StyledNavListItem>
            <StyledLink href="/recipes">Recipes</StyledLink>
          </StyledNavListItem>
          <StyledNavListItem>
            {session ? (
              <StyledButton onClick={() => signOut()}>Sign out</StyledButton>
            ) : (
              <StyledButton onClick={() => signIn()}>Sign in</StyledButton>
            )}
          </StyledNavListItem>
        </StyledNavList>
      </StyledNavContainer>
    </>
  );
}

const StyledBurgerIcon = styled.button`
  background-color: transparent;
  border: none;
  position: absolute;
  right: 20px;
  font-size: 30px;
  cursor: pointer;
  z-index: 10;
  &:hover {
    opacity: 0.8;
  }
`;

const StyledNavContainer = styled.div`
  position: fixed;
  transition: ease 0.3s;
  right: ${({ $navOpen }) => ($navOpen ? "0" : "100vw")};
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: #deb96f;
  opacity: 0.95;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1;
`;

const StyledNavList = styled.ul`
  list-style-type: none;
  padding: 0;
  text-align: center;
`;

const StyledNavListItem = styled.li`
  margin-bottom: 20px;
`;

const StyledLink = styled(Link)`
  text-decoration: none;
  color: #000;
  font-size: 20px;
  &:hover {
    opacity: 0.8;
  }
`;
const StyledButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
  font-size: 20px;
  font-family: "Roboto", sans-serif;
  &:hover {
    opacity: 0.8;
  }
`;

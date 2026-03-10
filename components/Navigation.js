import styled from "styled-components";
import { useState } from "react";
import Link from "next/link";

export default function Navigation() {
  const [navOpen, setNavOpen] = useState(false);

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
            <StyledLink href="#">Recipes</StyledLink>
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
`;

const StyledNavContainer = styled.div`
  position: fixed;
  transition: ease 0.3s;
  right: ${({ $navOpen }) => ($navOpen ? "0" : "100vw")};
  width: 100vw;
  height: 100vh;
  top: 0;
  background-color: #ccc;
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
`;

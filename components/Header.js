import styled from "styled-components";
import Link from "next/link";
import Navigation from "./Navigation";

export default function Header() {
  return (
    <>
      <StyledHeader>
        <StyledLink href="/">CookBook</StyledLink>
        <Navigation />
      </StyledHeader>
    </>
  );
}

const StyledHeader = styled.div`
  width: 100vw;
  height: 100px;
  border-bottom: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
`;

const StyledLink = styled(Link)`
  font-size: 40px;
  color: #000;
  text-decoration: none;
`;

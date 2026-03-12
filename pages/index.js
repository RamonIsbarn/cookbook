import styled from "styled-components";
import Link from "next/link";
import { PageStructure, SubContainer } from "@/components/PageStructure";
export default function HomePage() {
  return (
    <PageStructure>
      <SubContainer>
        <StyledBox href="/ingredients">View ingredients</StyledBox>
        <StyledBox href="/recipes">View recipes</StyledBox>
      </SubContainer>
    </PageStructure>
  );
}

const StyledBox = styled(Link)`
  width: 50vw;
  aspect-ratio: 1;
  border-radius: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: #000;
  box-shadow: 0 3px 10px #bbb;
  text-decoration: none;
`;

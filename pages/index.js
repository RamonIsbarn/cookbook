import styled from "styled-components";
import Link from "next/link";
import { PageStructure, SubContainer } from "@/components/PageStructure";
export default function HomePage() {
  return (
    <PageStructure>
      <SubContainer>
        <StyledBox href="/ingredients">View ingredients</StyledBox>
        <StyledBox href="#">View recipes</StyledBox>
      </SubContainer>
    </PageStructure>
  );
}
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 100px;
`;

const StyledBox = styled(Link)`
  width: 50vw;
  aspect-ratio: 1;
  background-color: #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

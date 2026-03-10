import styled from "styled-components";
export default function HomePage() {
  return (
    <StyledContainer>
      <StyledBox>
        <p>View ingredients</p>
      </StyledBox>
      <StyledBox>
        <p>View recipes</p>
      </StyledBox>
    </StyledContainer>
  );
}
const StyledContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
  padding-bottom: 100px;
`;

const StyledBox = styled.div`
  width: 50vw;
  aspect-ratio: 1;
  background-color: #ccc;
  border-radius: 15px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

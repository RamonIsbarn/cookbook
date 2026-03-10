import styled from "styled-components";

export default function Footer() {
  return (
    <StyledFooter>
      <p>Copyright 2026</p>
    </StyledFooter>
  );
}

const StyledFooter = styled.div`
  width: 100vw;
  height: 80px;
  position: absolute;
  bottom: 0;
  border-top: 1px solid #ccc;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
`;

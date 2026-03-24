import styled from "styled-components";

export function PageStructure({ headline, children }) {
  return (
    <>
      <ContentWrapper>
        {headline && <h2>{headline}</h2>}
        {children}
      </ContentWrapper>
    </>
  );
}

export function SubContainer({ children }) {
  return (
    <>
      <SubContentWrapper>{children}</SubContentWrapper>
    </>
  );
}

const ContentWrapper = styled.div`
  display: block;
  margin: 20px auto 0 auto;
  padding-bottom: 100px;
  text-align: center;
  max-width: 95vw;
`;

const SubContentWrapper = styled.div`
  display: flex;
  justify-content: center;
  gap: 20px;
`;

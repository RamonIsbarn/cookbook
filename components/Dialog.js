import styled from "styled-components";
import { StyledButton, StyledIconButton } from "./Button";
import { useState } from "react";

export default function Dialog({ children, onSubmit, buttonText, position }) {
  const [isVisible, setIsVisible] = useState(false);

  function handleToggle() {
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
  }
  function handleSubmit() {
    onSubmit();
    setIsVisible(false);
  }

  return (
    <>
      <StyledDialogButton onClick={handleToggle} $position={position}>
        {buttonText}
      </StyledDialogButton>
      {isVisible ? (
        <StyledPopUp>
          {children}
          <StyledButtonContainerCenter>
            <StyledButton type="button" onClick={handleCancel}>
              Cancel
            </StyledButton>
            <StyledButton type="button" onClick={handleSubmit} colored={true}>
              Confirm
            </StyledButton>
          </StyledButtonContainerCenter>
        </StyledPopUp>
      ) : null}
    </>
  );
}

const StyledPopUp = styled.div`
  position: absolute;
  z-index: 20;
  background-color: #fff;
  border-radius: 20px;
  box-shadow: 0 3px 10px #bbb;
  top: 50%;
  transform: translateY(-50%);
  width: 85vw;
  padding: 20px;
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;
`;
const StyledButtonContainerCenter = styled(StyledButtonContainer)`
  justify-content: center;
`;
const StyledDialogButton = styled(StyledIconButton)`
  position: ${({ $position }) =>
    $position === "top-right" ? "absolute" : "static"};
  top: ${({ $position }) => ($position === "top-right" ? "20px" : "auto")};
  right: ${({ $position }) => ($position === "top-right" ? "20px" : "auto")};
`;

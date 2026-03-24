import styled from "styled-components";
import { StyledButton, StyledIconButton } from "./Button";
import { useState } from "react";
import { LucideX } from "lucide-react";

export default function Dialog({
  children,
  className,
  onSubmit,
  onOpen,
  buttonText,
  cancelText,
  confirmText,
  noSubmit,
  buttonBackground,
}) {
  const [isVisible, setIsVisible] = useState(false);

  function handleToggle() {
    onOpen && onOpen();
    setIsVisible(true);
  }

  function handleCancel() {
    setIsVisible(false);
  }
  function handleSubmit() {
    onSubmit && onSubmit();
    setIsVisible(false);
  }

  return (
    <>
      {buttonBackground ? (
        <StyledButton
          className={className}
          onClick={handleToggle}
          type="button"
          colored={true}
        >
          {buttonText}
        </StyledButton>
      ) : (
        <StyledDialogButton
          className={className}
          onClick={handleToggle}
          type="button"
        >
          {buttonText}
        </StyledDialogButton>
      )}
      {isVisible && (
        <>
          <StyledOverlay onClick={handleCancel} />
          <StyledPopUp>
            {children}
            {noSubmit ? (
              <StyledDialogButton onClick={handleCancel}>
                <LucideX />
              </StyledDialogButton>
            ) : (
              <StyledButtonContainer>
                <StyledButton type="button" onClick={handleCancel}>
                  {cancelText ? cancelText : "Cancel"}
                </StyledButton>
                <StyledButton
                  type="button"
                  onClick={handleSubmit}
                  colored={true}
                >
                  {confirmText ? confirmText : "Confirm"}
                </StyledButton>
              </StyledButtonContainer>
            )}
          </StyledPopUp>
        </>
      )}
    </>
  );
}

const StyledPopUp = styled.div`
  position: absolute;
  z-index: 20;
  background-color: #fff;
  border-radius: 20px;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  width: 85vw;
  padding: 20px;
  text-align: center;
`;

const StyledButtonContainer = styled.div`
  width: 100%;
  display: flex;
  justify-content: right;
  gap: 10px;
  justify-content: center;
`;
const StyledDialogButton = styled(StyledIconButton)`
  position: absolute;
  top: 20px;
  right: 20px;
`;
const StyledOverlay = styled.button`
  background-color: rgba(0, 0, 0, 0.5);
  width: 100vw;
  height: 100vh;
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  z-index: 10;
  border: none;
`;

import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "./Portal";

const Background = styled.div`
  display: flex;
  position: fixed;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  left: 0;
  top: 0;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Contents = styled.div`
  margin-top: 50px;
`;

const Child = styled.div`
  position: relative;
  height: 60%;
  width: 60%;
  margin-top: 70px;
  overflow: scroll;
  border-radius: 10px;
  background: #f4f4f4;
`;

const CloseButton = styled.img`
  position: absolute;
  top: 10px;
  right: 20px;
  width: 15px;

  &:hover {
    cursor: pointer;
  }
`;

export default function Modal({ child, onClick }) {
  return (
    <Portal>
      <Background onClick={onClick}>
        <Child onClick={event => event.stopPropagation()}>
          <CloseButton onClick={onClick} src="/img/close.svg" />
          <Contents>{child}</Contents>
        </Child>
      </Background>
    </Portal>
  );
}

Modal.propTypes = {
  child: PropTypes.element,
  onClick: PropTypes.func,
};

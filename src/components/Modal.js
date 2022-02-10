import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

import Portal from "./Portal";

const Background = styled.div`
  display: flex;
  width: 100%;
  height: 100%;
  position: fixed;
  left: 0;
  top: 0;
  align-items: center;
  justify-content: center;
  text-align: center;
  background-color: rgba(0, 0, 0, 0.5);
`;

const Child = styled.div`
  height: 200px;
  width: 500px;
  margin-top: 70px;
  position: relative;
  overflow: scroll;
  background: #f4f4f4;
`;

export default function Modal({ child, onClick }) {
  return (
    <Portal>
      <Background onClick={onClick}>
        <Child onClick={event => event.stopPropagation()}>{child}</Child>
      </Background>
    </Portal>
  );
}

Modal.propTypes = {
  child: PropTypes.element,
  onClick: PropTypes.func,
};
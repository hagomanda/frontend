import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const Container = styled.div`
  width: 400px;
  height: 230px;
  border-radius: 6px;
  background-color: #ffffff;

  div {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    border-radius: 6px;
  }

  .error-message {
    margin: 4px;
  }

  .background {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding: 20px;
    background: ${props => props.background || "#e85e6c"};
  }

  .message {
    margin-top: 15px;
    color: #a6aab6;
    margin: 4px;
  }

  img {
    width: 50px;
    height: 50px;
  }

  button {
    width: 35%;
    height: 40%;
    padding: 8px 15px;
    font-size: 16px;
    border: none;
    border-radius: 6px;
    margin-top: 30px;
    background-color: #374661;
    color: #dce7f3;

    &:hover {
      cursor: pointer;
      background-color: #2d3347;
    }
  }
`;

const Background = styled.div`
  background-color: rgba(0, 0, 0, 0.5);
  position: fixed;
  display: flex;
  justify-content: center;
  align-items: center;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
`;

export default function ErrorModal({ img, background, message, onClick }) {
  return (
    <Background>
      <Container background={background}>
        <div className="background">
          <img src={img ? img : "/img/error.svg"} alt="icon" />
        </div>
        <div>
          <p className="error-message">{message ? "Oooups!" : ""}</p>
          <div className="message">{message ? message : "공유 완료!"}</div>
          <button onClick={onClick}>close</button>
        </div>
      </Container>
    </Background>
  );
}

ErrorModal.propTypes = {
  message: PropTypes.string,
  onClick: PropTypes.func.isRequired,
  img: PropTypes.string.isRequired,
  background: PropTypes.string.isRequired,
};

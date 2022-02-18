import React from "react";
import PropTypes from "prop-types";
import styled from "styled-components";

const Container = styled.div`
  display: flex;
  flex-direction: column;

  div {
    margin-top: 30px;
  }

  button {
    justify-content: center;
    align-items: center;
    width: 30%;
    height: 40px;
    font-size: 25px;
    padding: 1em 2em;
    border-radius: 10px;
    color: rgb(148, 178, 235);
    font-weight: bold;
    font-size: 0.8rem;
    letter-spacing: 2px;
    text-transform: uppercase;
    text-decoration: none;
    background: linear-gradient(
      to right,
      rgba(#b2876f, 0) 25%,
      rgba(#b2876f, 0.8) 75%
    );
    background-position: 1% 50%;
    background-size: 400% 300%;
    border: 1px solid rgb(148, 178, 235);
    cursor: pointer;
    @include transition;

    &:hover {
      color: #0000ff;
      border: 1px solid #0000ff;
      background-position: 99% 50%;
      cursor: pointer;
    }
  }
`;

export default function DeletePopup({ onClick }) {
  return (
    <Container>
      <span>만다라트를 삭제하시겠습니까?</span>
      <div>
        <button onClick={onClick}>Ok</button>
      </div>
    </Container>
  );
}

DeletePopup.propTypes = {
  onClick: PropTypes.func.isRequired,
};

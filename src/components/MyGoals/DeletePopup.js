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
    padding: 1em 2em;
    border-radius: 10px;
    color: rgb(148, 178, 235);
    font-weight: bold;
    font-size: 0.8rem;
    border: 1px solid rgb(148, 178, 235);
    cursor: pointer;

    &:hover {
      border: 1px solid #0000ff;
      color: #0000ff;
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

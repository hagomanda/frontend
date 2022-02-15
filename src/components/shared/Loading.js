import React from "react";
import styled from "styled-components";
import PropTypes from "prop-types";

const LoadingContainer = styled.div`
  width: 100%;
  background-color: #f4f4f4;
  border-radius: 10%;

  span {
    display: block;
    text-align: center;
  }
`;

const Loader = styled.div`
  .lds-ring {
    display: block;
    margin: 0 auto;
    position: relative;
    width: 50px;
    height: 50px;
  }
  .lds-ring div {
    box-sizing: border-box;
    display: block;
    position: absolute;
    width: 35px;
    height: 35px;
    margin: 8px;
    border: 5px solid #fff;
    border-radius: 50%;
    animation: lds-ring 1.2s cubic-bezier(0.5, 0, 0.5, 1) infinite;
    border-color: rgb(148, 178, 235) transparent transparent transparent;
  }
  .lds-ring div:nth-child(1) {
    animation-delay: -0.45s;
  }
  .lds-ring div:nth-child(2) {
    animation-delay: -0.3s;
  }
  .lds-ring div:nth-child(3) {
    animation-delay: -0.15s;
  }
  @keyframes lds-ring {
    0% {
      transform: rotate(0deg);
    }
    100% {
      transform: rotate(360deg);
    }
  }
`;

export default function Loading({ contents = "" }) {
  return (
    <LoadingContainer>
      <span>{contents}</span>
      <Loader>
        <div className="lds-ring">
          <div></div>
          <div></div>
          <div></div>
          <div></div>
        </div>
      </Loader>
    </LoadingContainer>
  );
}

Loading.propTypes = {
  contents: PropTypes.string,
};

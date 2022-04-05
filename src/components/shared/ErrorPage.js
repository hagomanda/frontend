import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import history from "history/browser";

const ErrorPageContainer = styled.div`
  width: 100%;
  padding-top: 10%;
  color: #3c4963;

  div {
    margin: 0 auto;
    text-align: center;
  }

  h1 {
    margin-bottom: 10px;
    font-size: 80px;
  }

  h2 {
    font-size: 20px;
    font-weight: 400;
  }

  a {
    text-decoration: none;
    color: #3c4963;
  }

  a:visited {
    color: #3c4963;
  }
`;

const ErrorNav = styled.ul`
  display: flex;
  justify-content: center;
  margin: 0 auto;
  margin-top: 20px;
  font-size: 14px;

  li {
    cursor: pointer;
    padding: 0 20px;
  }

  li:nth-child(1) {
    border-right: 1px solid #3c4963;
  }
`;

export default function ErrorPage({
  useIcon = true,
  message = "알 수 없는 오류가 발생했습니다.",
  detail = "",
}) {
  const handleBackClick = () => {
    history.back();
  };

  return (
    <ErrorPageContainer>
      {useIcon && (
        <div>
          <h1>(;-;)</h1>
        </div>
      )}
      <div>
        <h2>{message}</h2>
      </div>
      <div>
        <p>{detail}</p>
      </div>
      <ErrorNav>
        <li>
          <Link to="/">처음 화면</Link>
        </li>
        <li onClick={handleBackClick}>뒤로 가기</li>
      </ErrorNav>
    </ErrorPageContainer>
  );
}

ErrorPage.propTypes = {
  useIcon: PropTypes.bool,
  message: PropTypes.string,
  detail: PropTypes.string,
};

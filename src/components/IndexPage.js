import React from "react";
import styled from "styled-components";

const MainHeader = styled.header`
  width: 100%;
  height: 40vh;
  background-image: url("/img/background.jpg");
  background-size: cover;
  background-position: 100% 60%;
`;

const MainImgCover = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: 100%;
  background-color: rgba(0, 0, 0, 0.5);
`;

const WelcomeTextContainer = styled.div`
  color: #ffffff;
  font-size: 25px;
  margin-left: 50px;

  h1 {
    font-size: 35px;
    margin-bottom: 10px;
    margin-top: 0;
  }

  p {
    margin: 0;
  }
`;

const ArticleContainer = styled.article`
  padding: 20px;
  padding-top: 50px;
`;

const ArticleHeader = styled.div`
  font-size: 20px;
  text-align: center;

  h1 {
    font-weight: 400;
    margin: 5px 0;
  }
`;

export default function IndexPage() {
  return (
    <div>
      <MainHeader>
        <MainImgCover>
          <WelcomeTextContainer>
            <h1>HAGOMANDA</h1>
            <p>올해는 꼭 다이어트</p>
            <p>하고 만다</p>
          </WelcomeTextContainer>
        </MainImgCover>
      </MainHeader>
      <section>
        <ArticleContainer>
          <ArticleHeader>
            <h1>HAGOMANDA와 함께</h1>
            <h1>즐거운 계획을 세워 보세요</h1>
          </ArticleHeader>
        </ArticleContainer>
      </section>
    </div>
  );
}

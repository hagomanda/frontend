import React from "react";
import styled from "styled-components";

const Button = styled.div`
  width: 50px;
  height: 50px;
  background-color: rgb(60, 73, 99);
  border-radius: 50%;
  color: #ffffff;
  font-size: 50px;
  text-align: center;
  cursor: pointer;

  span {
    display: block;
    margin: 0 auto;
    user-select: none;
  }
`;

export default function CreateButton() {
  const handleCreateButtonClick = () => {
    console.log("clicked");
  };

  return (
    <Button onClick={handleCreateButtonClick}>
      <span>+</span>
    </Button>
  );
}

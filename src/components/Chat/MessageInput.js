import React, { useState } from "react";
import styled from "styled-components";

const InputContainer = styled.div`
  display: flex;
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 10%;
`;

const TextInput = styled.textarea`
  width: 80%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  box-shadow: 1px 1px 1px rgba(148, 178, 235, 0.5);
  outline: none;
  resize: none;
`;

const Button = styled.button`
  width: 20%;
  height: 100%;
`;

export default function MessageInput() {
  const [message, setMessage] = useState("");

  const handleSendButtonClick = () => {
    // socket 이벤트
    setMessage("");
  };

  return (
    <InputContainer>
      <TextInput
        value={message}
        onChange={event => setMessage(event.target.value)}
        autoFocus={true}
        placeholder="메시지를 입력하세요."
      />
      <Button onClick={handleSendButtonClick}>보내기</Button>
    </InputContainer>
  );
}

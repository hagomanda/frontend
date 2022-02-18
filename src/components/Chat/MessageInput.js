import React, { useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { format } from "date-fns";
import axios from "axios";
import { useSelector } from "react-redux";
import { socketAction } from "../../features/socket";

const InputContainer = styled.div`
  display: flex;
  position: absolute;
  width: 100%;
  bottom: 0;
  height: 10%;
`;

const TextInput = styled.textarea`
  width: 80%;
  height: 100%;
  padding: 10px;
  border: 1px solid #ccc;
  border-bottom-left-radius: 6px;
  box-shadow: 1px 1px 1px rgba(148, 178, 235, 0.5);
  outline: none;
  resize: none;
`;

const Button = styled.button`
  width: 20%;
  height: 100%;
  background-color: rgb(30, 144, 255);
  border: none;
  color: antiquewhite;

  &:hover {
    cursor: pointer;
  }
`;

export default function MessageInput() {
  const user = useSelector(state => state.user.user);
  const [message, setMessage] = useState("");
  const { id } = useParams();

  const currentDate = new Date();
  const createdAt = format(currentDate, "yyyy.MM.dd HH:mm");

  const handleSendButtonClick = async () => {
    await axios.post(`/api/chats/${id}`, {
      id,
      message,
      createdAt,
    });

    socketAction.sendMessage(message, createdAt, user);

    setMessage("");
  };

  const handleSendButtonEnter = event => {
    if (event.key !== "Enter") {
      return;
    }

    if (event.shiftKey && event.key === "Enter") {
      return;
    }

    if (event.key === "Enter" && !event.target.value.length) {
      event.preventDefault();
      return;
    }

    event.preventDefault();
    handleSendButtonClick();
  };

  return (
    <InputContainer>
      <TextInput
        value={message}
        onChange={event => setMessage(event.target.value)}
        onKeyPress={event => handleSendButtonEnter(event)}
        autoFocus={true}
        placeholder="메시지를 입력하세요."
      />
      <Button onClick={handleSendButtonClick} disabled={!message}>
        보내기
      </Button>
    </InputContainer>
  );
}

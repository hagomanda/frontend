import React, { useState } from "react";
import styled from "styled-components";
import Chatroom from "./Chatroom";
import MessageInput from "./MessageInput";

const ChatPageContainer = styled.div`
  position: fixed;
  top: 20%;
`;

const ChatModalContainer = styled.div`
  position: relative;
  visibility: ${props => (props.isOpen ? "visible" : "hidden")};
  width: 300px;
  height: 70vh;
  border: 1px solid #848484;
  border-radius: 6px;
  background-color: #ffffff;
`;

const ChatOpenButton = styled.div`
  position: relative;
  width: 30px;
  height: 30px;
  background: #ffffff;
  overflow: hidden;
  margin: 10px;
  cursor: pointer;

  img {
    width: 100%;
    height: 100%;
    object-fit: cover;
  }
`;

export default function ChatPage() {
  const [isChatOpen, setIsChatOpen] = useState(false);

  return (
    <ChatPageContainer>
      <ChatModalContainer isOpen={isChatOpen}>
        <Chatroom />
        <MessageInput />
      </ChatModalContainer>
      <ChatOpenButton onClick={() => setIsChatOpen(prev => !prev)}>
        <img src="/icons/chat.svg" alt="chat" />
      </ChatOpenButton>
    </ChatPageContainer>
  );
}

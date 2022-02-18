import React, { useState } from "react";
import styled from "styled-components";

import Chatroom from "./Chatroom";
import MessageInput from "./MessageInput";

const ChatPageContainer = styled.div`
  position: fixed;
  bottom: 0;
`;

const ChatModalContainer = styled.div`
  position: relative;
  display: ${props => (props.isOpen ? "block" : "none")};
  width: 300px;
  height: 70vh;
  border: 1px solid #848484;
  border-radius: 6px;
  background-color: #ffffff;
`;

const ChatOpenButton = styled.div`
  width: 30px;
  height: 30px;
  margin: 10px;
  background: #ffffff;
  overflow: hidden;
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

import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

import MessageBox from "./MessageBox";
import { useDispatch, useSelector } from "react-redux";
import { getMessages } from "../../reducers/chatSlice";

const ChatRoomContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
`;

export default function Chatroom() {
  const scrollTarget = useRef();
  const { id } = useParams();
  const messagesEndRef = useRef(null);
  const dispatch = useDispatch();
  const messages = useSelector(state => state.chat.messages);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    dispatch(getMessages({ id, token: null }));
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatRoomContainer ref={scrollTarget}>
      {messages?.map(data => {
        return <MessageBox key={uuidv4()} data={data} />;
      })}
      <div ref={messagesEndRef} />
    </ChatRoomContainer>
  );
}

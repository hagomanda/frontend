import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";
// import { throttle } from "lodash";
import axios from "axios";
import { v4 as uuidv4 } from "uuid";

import { socketAction } from "../../features/socket";
// import Loading from "../shared/Loading";
import MessageBox from "./MessageBox";

const ChatRoomContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
`;

// const TargetDiv = styled.div`
//   width: 100%;
//   height: 10px;
// `;

const getMessages = async (goalId, nextPageToken) => {
  const url = nextPageToken
    ? `/api/chats/${goalId}?nextPageToken=${nextPageToken}`
    : `/api/chats/${goalId}`;
  const { data } = await axios.get(url);
  return data.result;
};

export default function Chatroom() {
  const scrollTarget = useRef();
  // const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  // const [isLoading, setIsLoading] = useState(false);
  // const [token, setToken] = useState("");
  const { id } = useParams();
  const messagesEndRef = useRef(null);

  // const getData = async (id, token) => {
  //   const prevHeight = scrollTarget.current.scrollHeight;

  //   try {
  //     const { messages, nextPageToken } = await getMessages(id, token);
  //     setMessages(prev => messages.concat(prev));
  //     setToken(nextPageToken);
  //     scrollTarget.current.scrollTop =
  //       scrollTarget.current.scrollHeight - prevHeight;
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  // const handleIntersection = async ([entry], observer) => {
  //   if (entry.isIntersecting && !isLoading) {
  //     observer.unobserve(entry.target);
  //     setIsLoading(true);

  //     const nextPageToken = token.length ? token : undefined;
  //     await getData(id, nextPageToken);

  //     setIsLoading(false);

  //     if (nextPageToken) {
  //       observer.observe(entry.target);
  //     }
  //   }
  // };

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  // useEffect(() => {
  //   let observer;

  //   if (target) {
  //     observer = new IntersectionObserver(throttle(handleIntersection, 1000), {
  //       threshold: 1,
  //     });
  //     observer.observe(target);
  //   }

  //   return () => observer && observer.disconnect();
  // }, [target]);

  useEffect(() => {
    async function test() {
      const { messages } = await getMessages(id);
      setMessages(prev => prev.concat(messages));
    }
    test();
    // socket.on("message", ())
    socketAction.takeMessage((message, createdAt, displayName, profile) => {
      setMessages(prev => [
        ...prev,
        { message, createdAt, displayName, profile },
      ]);
    });
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  return (
    <ChatRoomContainer ref={scrollTarget}>
      {/* {isLoading && <Loading />} */}
      {/* <TargetDiv ref={setTarget} /> */}
      {messages.map(data => {
        return <MessageBox key={uuidv4()} data={data} />;
      })}
      <div ref={messagesEndRef} />
    </ChatRoomContainer>
  );
}

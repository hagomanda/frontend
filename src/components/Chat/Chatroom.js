import React, { useEffect, useRef, useState } from "react";
import styled from "styled-components";
import { throttle } from "lodash";

import Loading from "../shared/Loading";
import MessageBox from "./MessageBox";
import axios from "axios";
import { useParams } from "react-router-dom";

const ChatRoomContainer = styled.div`
  width: 100%;
  height: 90%;
  overflow: auto;
`;

const TargetDiv = styled.div`
  width: 100%;
  height: 10px;
`;

const getMessages = async (goalId, nextPageToken) => {
  const url = nextPageToken
    ? `/api/chats/${goalId}?nextPageToken=${nextPageToken}`
    : `/api/chats/${goalId}`;
  const { data } = await axios.get(url);
  return data.result;
};

export default function Chatroom() {
  const scrollTarget = useRef();
  const [target, setTarget] = useState(null);
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [token, setToken] = useState("");
  const { id } = useParams();

  const getData = async (id, token) => {
    const prevHeight = scrollTarget.current.scrollHeight;

    try {
      const { messages, nextPageToken } = await getMessages(id, token);
      setMessages(prev => messages.concat(prev));
      setToken(nextPageToken);
      scrollTarget.current.scrollTop =
        scrollTarget.current.scrollHeight - prevHeight;
    } catch (error) {
      console.error(error);
    }
  };

  const handleIntersection = async ([entry], observer) => {
    if (entry.isIntersecting && !isLoading) {
      observer.unobserve(entry.target);
      setIsLoading(true);

      const nextPageToken = token.length ? token : undefined;
      await getData(id, nextPageToken);

      setIsLoading(false);

      if (nextPageToken) {
        observer.observe(entry.target);
      }
    }
  };

  useEffect(() => {
    let observer;

    if (target) {
      observer = new IntersectionObserver(throttle(handleIntersection, 1000), {
        threshold: 1,
      });
      observer.observe(target);
    }

    return () => observer && observer.disconnect();
  }, [target]);

  return (
    <ChatRoomContainer ref={scrollTarget}>
      {isLoading && <Loading />}
      {<TargetDiv ref={setTarget}></TargetDiv>}
      {messages.map((data, i) => {
        return <MessageBox key={data.createdAt} data={data} />;
      })}
    </ChatRoomContainer>
  );
}

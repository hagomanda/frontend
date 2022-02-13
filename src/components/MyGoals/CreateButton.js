import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import axios from "axios";

import Modal from "../Modal";
import CreateGoal from "./CreateGoal";

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

const createApi = async () => {
  const res = await axios.post("/api/goals/mainGoal");
  return res;
};

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleCreateButtonClick = () => {
    setShowModal(true);
  };

  const handleSubmitButtonClick = async title => {
    const { data } = await createApi(title);
    const { mainGoalId } = data.result;
    setShowModal(false);
    navigate(`/mainGoal/${mainGoalId}`);
  };

  return (
    <>
      {showModal && (
        <Modal
          child={<CreateGoal onClick={handleSubmitButtonClick} />}
          onClick={() => setShowModal(false)}
        />
      )}
      <Button onClick={handleCreateButtonClick}>
        <span>+</span>
      </Button>
    </>
  );
}

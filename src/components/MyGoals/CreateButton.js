import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import { createMandal } from "../../reducers/mandalSlice";
import Modal from "../Modal/Modal";
import CreateGoal from "./CreateGoal";

const Button = styled.div`
  width: 50px;
  height: 50px;
  border-radius: 50%;
  color: #ffffff;
  font-size: 40px;
  cursor: pointer;

  img {
    display: block;
    margin: 0 auto;
    margin-top: -5px;
    user-select: none;
    text-align: center;
    transition: all ease 0.5s;

    :hover {
      transform: rotate(90deg);
    }
  }
`;

export default function CreateButton() {
  const [showModal, setShowModal] = useState(false);
  const createdId = useSelector(state => state.mandal.createMandal);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleCreateButtonClick = () => {
    setShowModal(true);
  };

  const handleSubmitButtonClick = async title => {
    dispatch(createMandal(title));
    setShowModal(false);
  };

  useEffect(() => {
    if (!createdId) {
      return;
    }

    navigate(`/mainGoal/${createdId}`);
  }, [createdId]);

  return (
    <>
      {showModal && (
        <Modal
          child={<CreateGoal onClick={handleSubmitButtonClick} />}
          onClick={() => setShowModal(false)}
        />
      )}
      <Button onClick={handleCreateButtonClick}>
        <img src="/img/circle-plus.svg" alt="create-button" />
      </Button>
    </>
  );
}

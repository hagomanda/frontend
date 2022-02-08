import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import PropTypes from "prop-types";
import axios from "axios";

import Modal from "../Modal";
import DeletePopup from "./DeletePopup";

const ThumbnailContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 30vh;
  height: 30vh;
  margin: 5px;
  text-align: center;
  background-color: rgb(148, 178, 235);
  border-radius: 5px;

  .delete-button {
    display: none;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 0;
    background-color: #000000;
    border-radius: 50%;
    cursor: pointer;

    span {
      display: block;
      color: #ffffff;
      user-select: none;
    }
  }

  .title {
    margin: 2vw;
    font-size: 1.5em;
  }

  &:hover {
    .delete-button {
      display: block;
    }
  }
`;

const deleteGoal = async id => {
  try {
    await axios.delete(`/api/goals/mainGoal/${id}`);
  } catch (error) {
    return error;
  }
};

export default function MyGoalsEntry({ title, id }) {
  const [showModal, setShowModal] = useState(false);
  const navigate = useNavigate();

  const handleConfirmButtonClick = async () => {
    const res = await deleteGoal(id);

    if (res?.result === "ok") {
      setShowModal(false);
      navigate("/main");
      return;
    }

    setShowModal(false);
  };

  const handleDeleteButtonClick = event => {
    event.stopPropagation();
    setShowModal(true);
  };

  const handleContainerClick = () => {
    navigate(`/mainGoal/${id}`);
  };

  return (
    <>
      {showModal && (
        <Modal
          child={<DeletePopup onClick={handleConfirmButtonClick} />}
          onClick={() => setShowModal(false)}
        />
      )}
      <ThumbnailContainer onClick={handleContainerClick}>
        <div className="delete-button" onClick={handleDeleteButtonClick}>
          <span>x</span>
        </div>
        <p className="title">{title}</p>
      </ThumbnailContainer>
    </>
  );
}

MyGoalsEntry.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

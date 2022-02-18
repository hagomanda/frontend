import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { deleteGoal } from "../../reducers/goalListSlice";
import Modal from "../Modal/Modal";
import DeletePopup from "./DeletePopup";

const ThumbnailContainer = styled.div`
  display: flex;
  position: relative;
  justify-content: center;
  align-items: center;
  width: 200px;
  height: 200px;
  margin: 5px;
  text-align: center;
  background-color: rgb(148, 178, 235);
  border-radius: 5px;
  overflow: auto;

  .delete-button {
    display: none;
    position: absolute;
    width: 20px;
    height: 20px;
    top: 0;
    right: 0;
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
    transform: scale(1.01, 1.01);
    cursor: pointer;

    .delete-button {
      display: block;
    }
  }
`;

export default function MyGoalsEntry({ title, id }) {
  const [showModal, setShowModal] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleConfirmButtonClick = async () => {
    dispatch(deleteGoal(id));
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
          width="30%"
          height="20%"
        />
      )}
      <ThumbnailContainer onClick={handleContainerClick}>
        <img
          src="/img/xmark.svg"
          className="delete-button"
          alt="delete-button"
          onClick={handleDeleteButtonClick}
        />
        <p className="title" dangerouslySetInnerHTML={{ __html: title }} />
      </ThumbnailContainer>
    </>
  );
}

MyGoalsEntry.propTypes = {
  title: PropTypes.string,
  id: PropTypes.string.isRequired,
};

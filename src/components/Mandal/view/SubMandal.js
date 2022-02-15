import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import PropTypes from "prop-types";

import { displayMain, displaySub } from "../../../features/viewSlice";
import { showBoxes } from "./utils";
import { VIEW_OPTION } from "../../../constants";
import Modal from "../../Modal";
import Todo from "./Todo";

const BoxContainer = styled.div`
  display: grid;
  height: 100%;
  width: 100%;
  grid-template-columns: 1fr 1fr 1fr;
  grid-template-rows: 1fr 1fr 1fr;
  & :nth-child(n) {
    border: none;
  }
`;

export default function SubMandal({ data, mandalIndex }) {
  const dispatch = useDispatch();
  const [showModal, setShowModal] = useState(false);
  const [boxId, setBoxId] = useState();
  const viewOption = useSelector(state => state.view.option);
  const isEditMode = useSelector(state => state.edit.mode);

  const handleBoxClick = (event, index) => {
    if (viewOption === VIEW_OPTION.FULL_VIEW) {
      mandalIndex <= 4
        ? dispatch(displaySub(mandalIndex))
        : dispatch(displaySub(mandalIndex - 1));
      return;
    }

    if (isEditMode) {
      event.target.children[0]?.focus();
      return;
    }

    if (index === 4) {
      return dispatch(displayMain());
    }

    setBoxId(event.target.id);
    setShowModal(true);
  };

  return (
    <>
      <BoxContainer className="gridContainer">
        {showBoxes(data, handleBoxClick)}
      </BoxContainer>
      {showModal && (
        <Modal
          onClick={() => setShowModal(!showModal)}
          child={
            <Todo
              id={boxId}
              setShowModal={setShowModal}
              showModal={showModal}
            />
          }
        />
      )}
    </>
  );
}

SubMandal.propTypes = {
  data: PropTypes.array.isRequired,
  mandalIndex: PropTypes.number,
};

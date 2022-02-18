import React, { useEffect, useRef } from "react";
import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";

import {
  displayMain,
  displayFull,
  getMandal,
} from "../../reducers/mandalSlice";

import { changeEditMode, leaveEditMode } from "../../reducers/editSlice";
import { initializeShareSuccess } from "../../reducers/shareSlice";

import { VIEW_OPTION } from "../../constants";
import MainMandal from "./view/MainMandal";
import SubMandal from "./view/SubMandal";
import FullView from "./view/FullView";
import ShareButton from "./MandalHeader/ShareButton";
import GoBackButton from "./MandalHeader/GoBackButton";
import ChatPage from "../Chat/ChatPage";
import { socket, socketAction } from "../../features/socket";
import ErrorModal from "../Modal/ErrorModal";

const ButtonsContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 400px;
  height: 50px;
  margin: 10px auto;
`;

const EditButton = styled.img`
  width: 50px;
  height: 50px;
  border-radius: 5px;
  background-color: ${props => props.selected && "rgba(148, 178, 235, 0.5)"};
  cursor: pointer;

  &:hover {
    box-shadow: 0 0 0 3px rgb(148, 178, 235) inset;
  }
`;

const BoxContainer = styled.div`
  margin: 0 auto;
  width: 70vh;
  height: 70vh;
`;

const ToggleButton = styled.input`
  display: none;
  &:checked + label {
    background: #3c4963;
  }

  &:checked + label::after {
    background: #ffffff;
    left: 50px;
  }
`;

const ToggleLabel = styled.label`
  display: inline-block;
  position: relative;
  width: 100px;
  height: 50px;

  background: rgba(148, 178, 235, 0.5);
  border-radius: 25px;
  text-indent: -9999em;
  transition: 0.4s ease-out;
  cursor: pointer;

  &:after {
    position: absolute;
    content: "";
    width: 40px;
    height: 40px;
    background: #ffffff;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    transition: 0.4s ease-out;
  }
`;

export default function MandalPage() {
  const { id } = useParams();
  const dispatch = useDispatch();
  const viewModeButton = useRef();

  const isFetching = useSelector(state => state.mandal.isFetching);
  const viewOption = useSelector(state => state.mandal.option);
  const mandalArray = useSelector(state => state.mandal.displayed);
  const isEditMode = useSelector(state => state.edit.mode);
  const shareSuccessState = useSelector(state => state.share.isShareSuccess);

  socket.on("selectMandalBox", (a, b) => {
    console.log(a, b);
  });

  useEffect(() => {
    if (viewOption !== VIEW_OPTION.MAIN_VIEW) {
      dispatch(displayMain());
    }
    dispatch(getMandal(id));

    return () => {
      dispatch(leaveEditMode());
    };
  }, []);

  useEffect(() => {
    dispatch(getMandal(id));

    if (!isEditMode) {
      return socketAction.leaveMandal();
    }

    socketAction.joinMandal(id);
  }, [isEditMode]);

  useEffect(() => {
    if (viewOption !== VIEW_OPTION.FULL_VIEW) {
      viewModeButton.current.checked = false;
    }
  }, [viewOption]);

  const viewCheckHandler = event => {
    event.target.checked ? dispatch(displayFull()) : dispatch(displayMain());
  };

  const handleEdit = () => {
    dispatch(changeEditMode());
  };

  return (
    <>
      <div>
        <ButtonsContainer>
          <GoBackButton onClick={viewCheckHandler} />
          <div className="tooltip">
            <EditButton
              className="editButton"
              alt="editButton"
              src="/icons/edit.svg"
              onClick={handleEdit}
              selected={isEditMode}
            />
            <span className="tooltiptext">수정하기</span>
          </div>
          <ShareButton />
          <ToggleButton
            type="checkbox"
            id="toggle-slider"
            onChange={viewCheckHandler}
            ref={viewModeButton}
          />
          <ToggleLabel htmlFor="toggle-slider">on/off</ToggleLabel>
        </ButtonsContainer>
      </div>
      {isFetching && <div>Loading...</div>}
      {!isFetching && (
        <BoxContainer>
          {viewOption === VIEW_OPTION.MAIN_VIEW && (
            <MainMandal data={mandalArray} />
          )}
          {viewOption === VIEW_OPTION.SUB_VIEW && (
            <SubMandal data={mandalArray} />
          )}
          {viewOption === VIEW_OPTION.FULL_VIEW && <FullView />}
        </BoxContainer>
      )}
      {isEditMode && <ChatPage />}
      {shareSuccessState && (
        <ErrorModal
          img="/img/success.svg"
          background="#4B89DC"
          onClick={() => dispatch(initializeShareSuccess())}
        />
      )}
    </>
  );
}

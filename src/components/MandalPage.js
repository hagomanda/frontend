import React from "react";
import { useDispatch, useSelector } from "react-redux";
import MainGoalPage from "./MainGoalPage";
import styled from "styled-components";
import { changeToMainGoal, chageToFullView } from "../features/viewSlice";
import { changeEditMode } from "../features/editSlice";

const ButtonsContainer = styled.div`
  display: flex;
`;

const ImageButton = styled.img`
  width: 50px;
  height: 50px;
  cursor: pointer;
`;

const BodyContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 80vh;
`;

const ToggleButton = styled.input`
  display: none;

  &:checked + label {
    background: #96e7ef;
  }

  &:checked + label::after {
    background: #1d6269;
    left: 50px;
  }
`;

const ToggleLabel = styled.label`
  display: inline-block;
  cursor: pointer;
  width: 100px;
  height: 50px;
  text-indent: -9999em;
  background: #dff7fa;
  border-radius: 25px;
  position: relative;
  transition: 0.4s ease-out;

  &:after {
    content: "";
    width: 40px;
    height: 40px;
    background: #a5cace;
    position: absolute;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    transition: 0.4s ease-out;
  }
`;

export default function MandalPage() {
  const dispatch = useDispatch();
  const viewOption = useSelector(state => state.view.option);

  const viewCheckHandler = event => {
    event.target.checked
      ? dispatch(chageToFullView())
      : dispatch(changeToMainGoal());
  };

  const handleEdit = () => {
    dispatch(changeEditMode());
  };
  const handleShare = () => {};
  // view option 에 따라 MainGoal, SubGoal, FullView보여줌
  // 공유, 채팅, 로그아웃, 소켓 설정 예정
  return (
    <>
      <ButtonsContainer>
        <ToggleButton
          type="checkbox"
          id="toggle-slider"
          onChange={viewCheckHandler}
        />
        <ToggleLabel htmlFor="toggle-slider">on/off</ToggleLabel>
        <ImageButton
          className="editButton"
          alt="editButton"
          src="../img/edit.png"
          onClick={handleEdit}
        />
        <ImageButton
          className="shareButton"
          alt="shareButton"
          src="../img/share.png"
          onClick={handleShare}
        />
      </ButtonsContainer>
      <BodyContainer>
        {viewOption === "mainGoal" && <MainGoalPage />}
      </BodyContainer>
    </>
  );
}

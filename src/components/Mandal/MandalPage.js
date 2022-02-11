import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import axios from "axios";

import MainMandal from "./view/MainMandal";
import SubMandal from "./view/SubMandal";

import { changeToMainGoal, changeToFullView } from "../../features/viewSlice";
import { changeEditMode } from "../../features/editSlice";

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
  position: relative;
  width: 100px;
  height: 50px;

  background: #dff7fa;
  border-radius: 25px;
  text-indent: -9999em;
  transition: 0.4s ease-out;
  cursor: pointer;

  &:after {
    position: absolute;
    content: "";
    width: 40px;
    height: 40px;
    background: #a5cace;
    border-radius: 50%;
    top: 5px;
    left: 5px;
    transition: 0.4s ease-out;
  }
`;

export default function MandalPage() {
  const dispatch = useDispatch();
  const view = useSelector(state => state.view);

  useEffect(() => {
    dispatch(changeToMainGoal());
  }, []);

  const viewCheckHandler = event => {
    event.target.checked
      ? dispatch(changeToFullView())
      : dispatch(changeToMainGoal());
  };

  const handleEdit = () => {
    dispatch(changeEditMode());
  };
  const handleShare = async () => {
    await axios.post("/api/goals/mainGoal", {
      title: "123123",
    });
    // await axios.get("api/todos");
  };
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
        {view.option === "mainGoal" && <MainMandal />}
        {view.option === "subGoal" && <SubMandal selected={view.selectedId} />}
      </BodyContainer>
    </>
  );
}

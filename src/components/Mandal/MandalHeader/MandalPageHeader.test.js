import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { useSelector } from "react-redux";
import userEvent from "@testing-library/user-event";
import { useNavigate } from "react-router-dom";

import ShareButton from "./ShareButton";
import GoBackButton from "./GoBackButton";

const mockDispatch = jest.fn();
const goBack = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

jest.mock("react-router-dom", () => ({
  useNavigate: jest.fn(),
}));

describe("뒤로가기 버튼 클릭 테스트", () => {
  it("When state.mandal.option is 'mainGoal'", () => {
    useSelector.mockReturnValueOnce("mainGoal");
    useNavigate.mockReturnValueOnce(() => {
      goBack();
    });

    render(<GoBackButton />);

    userEvent.click(screen.getByText("뒤로가기"));

    expect(goBack).toBeCalled();
  });

  it("When state.mandal.option is 'fullView'", () => {
    useSelector.mockReturnValueOnce("fullView");
    useNavigate.mockReturnValueOnce(() => {
      goBack();
    });

    render(<GoBackButton />);

    userEvent.click(screen.getByText("뒤로가기"));

    expect(goBack).not.toBeCalled();
    expect(mockDispatch).toBeCalled();
  });
});

// eslint-disable-next-line react/display-name
jest.mock("./InviteModal", () => () => {
  const InviteModal = () => <div>Invite Modal</div>;
  return <InviteModal />;
});

describe("공유 버튼 클릭 테스트", () => {
  it("공유 버튼 클릭 테스트", () => {
    const realUseState = React.useState;
    const initialState = [false];
    jest
      .spyOn(React, "useState")
      .mockImplementationOnce(() => realUseState(initialState));

    render(<ShareButton />);

    userEvent.click(screen.getByAltText("share"));

    expect(screen.getByText("Invite Modal")).toBeInTheDocument();
  });
});

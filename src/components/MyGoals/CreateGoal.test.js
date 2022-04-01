import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import CreateGoal from "./CreateGoal";
import CreateButton from "./CreateButton";
import Modal from "../Modal/Modal";

const mockDispatch = jest.fn();
const mockNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("CreateGoal Unit Test", () => {
  beforeEach(() => {
    render(<CreateButton />);
  });

  it("#1. 렌더링 테스트", () => {
    expect(screen.getByAltText("create-button").getAttribute("src")).toBe(
      "/img/circle-plus.svg",
    );
  });

  it("#2. 골 생성 버튼 클릭 시", () => {
    ReactDOM.createPortal = node => node;

    const handleCreateGoal = jest.fn();
    const handleCloseModal = jest.fn();

    userEvent.click(screen.getByAltText("create-button"));
    render(
      <Modal
        child={<CreateGoal onClick={handleCreateGoal} />}
        onClick={handleCloseModal}
      />,
    );

    expect(
      screen.getAllByPlaceholderText("이번에 달성할 목표는..."),
    ).toBeTruthy();
    expect(screen.getAllByRole("button", { name: /만들기/i })).toBeTruthy();
  });
});

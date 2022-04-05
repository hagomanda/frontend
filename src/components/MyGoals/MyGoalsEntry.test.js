import React from "react";
import ReactDOM from "react-dom";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import "@testing-library/jest-dom/extend-expect";

import Modal from "../Modal/Modal";
import MyGoalsEntry from "./MyGoalsEntry";
import DeletePopup from "./DeletePopup";

const mockDispatch = jest.fn();
const mockNavigator = jest.fn();

jest.mock("react-router-dom", () => ({
  ...jest.requireActual("react-router-dom"),
  useNavigate: () => mockNavigator,
}));

jest.mock("react-redux", () => ({
  useDispatch: () => mockDispatch,
}));

describe("MyGoalsEntry Unit Test", () => {
  beforeEach(() => {
    const title = "mockTitle";
    const id = "mockId";

    render(<MyGoalsEntry title={title} id={id} />);
  });

  it("#1. 렌더링 테스트", () => {
    expect(screen.getByText("mockTitle")).toBeInTheDocument();
    expect(screen.getByText("mockTitle").parentElement).toHaveStyle(
      "background-color: rgb(148, 178, 235)",
    );
    expect(screen.getByAltText("delete-button").getAttribute("src")).toBe(
      "/img/xmark.svg",
    );
  });

  it("#2. 골 삭제 버튼을 클릭할 경우", () => {
    ReactDOM.createPortal = node => node;

    const handleDeleteGoal = jest.fn();
    const handleCloseModal = jest.fn();
    render(
      <Modal
        child={<DeletePopup onClick={handleDeleteGoal} />}
        onClick={handleCloseModal}
        width="30%"
        height="20%"
      />,
    );

    expect(
      screen.getByText("만다라트를 삭제하시겠습니까?"),
    ).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Ok" })).toBeInTheDocument();

    userEvent.click(screen.getByRole("button", { name: "Ok" }));
    expect(handleDeleteGoal).toHaveBeenCalledTimes(1);
  });

  it("#3. 골을 클릭할 경우, 해당 골 페이지로 이동", () => {
    userEvent.click(screen.getByText("mockTitle"));
    expect(mockNavigator).toHaveBeenCalledWith("/mainGoal/mockId");
  });
});

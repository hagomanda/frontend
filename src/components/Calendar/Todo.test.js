import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import Todo from "./Todo";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("Todo Unit Test", () => {
  it("#1. 렌더링 테스트", () => {
    const todo = {
      isComplete: false,
      title: "mockTitle",
      memo: "mockMemo",
      _id: "mockId",
    };

    render(<Todo todo={todo} date={"2022-03-01"} color={"red"} />);

    expect(screen.getByText("mockTitle")).toBeInTheDocument();
    expect(screen.getByText("mockTitle").parentElement).toHaveStyle(
      "background-color: red",
    );
    expect(screen.getByAltText("checkButton")).toBeInTheDocument();
    expect(screen.getByAltText("checkButton").getAttribute("src")).toEqual(
      "/img/nounCheck.png",
    );
  });

  it("#2. 완료된 todo인 경우", () => {
    const todo = {
      isComplete: true,
      title: "mockTitle",
      memo: "mockMemo",
      _id: "mockId",
    };

    render(<Todo todo={todo} date={"2022-03-01"} color={"red"} />);

    expect(screen.getByText("mockTitle")).toHaveClass("complete");
    expect(screen.getByAltText("checkButton").getAttribute("src")).toEqual(
      "/img/checkButton.png",
    );
  });

  it("#3. 체크 버튼을 클릭할 경우", () => {
    const todo = {
      isComplete: true,
      title: "mockTitle",
      memo: "mockMemo",
      _id: "mockId",
    };

    render(<Todo todo={todo} date={"2022-03-01"} color={"red"} />);

    fireEvent.click(screen.getByAltText("checkButton"));

    expect(screen.getByAltText("checkButton").getAttribute("src")).toEqual(
      "/img/nounCheck.png",
    );

    fireEvent.click(screen.getByAltText("checkButton"));

    expect(screen.getByAltText("checkButton").getAttribute("src")).toEqual(
      "/img/checkButton.png",
    );
  });
});

import React from "react";
import { useSelector } from "react-redux";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";

import MessageInput from "./MessageInput";

const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("MessageInput Unit Test", () => {
  beforeEach(() => {
    useSelector.mockReturnValueOnce("mock user");
    render(<MessageInput />);
  });

  it("#1. 렌더링 테스트", () => {
    expect(
      screen.getByPlaceholderText("메시지를 입력하세요."),
    ).toBeInTheDocument();
    expect(screen.getByText("보내기")).toBeInTheDocument();
    expect(screen.getByText("보내기")).toBeDisabled();
  });

  it("#2. 메시지 입력 테스트", () => {
    fireEvent.change(screen.getByPlaceholderText("메시지를 입력하세요."), {
      target: { value: "a" },
    });

    expect(screen.getByText("a")).toBeInTheDocument();
    expect(screen.getByText("보내기")).toBeEnabled();
  });

  it("#3. 메시지 보내기 테스트 (1)", () => {
    fireEvent.change(screen.getByPlaceholderText("메시지를 입력하세요."), {
      target: { value: "a" },
    });
    fireEvent.keyPress(screen.getByText("a"), {
      charCode: 13,
    });

    expect(screen.getByPlaceholderText("메시지를 입력하세요.").value).toEqual(
      "",
    );
    expect(mockDispatch).toBeCalled();
  });

  it("#4. 메시지 보내기 테스트 (2)", () => {
    fireEvent.keyPress(screen.getByPlaceholderText("메시지를 입력하세요."), {
      charCode: 13,
    });

    expect(screen.getByPlaceholderText("메시지를 입력하세요.").value).toEqual(
      "",
    );
    expect(mockDispatch).not.toBeCalled();
  });
});

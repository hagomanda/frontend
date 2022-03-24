import React from "react";
import { useSelector } from "react-redux";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { format, add } from "date-fns";

import Day from "./Day";

const date = new Date();
const WEEK = ["일", "월", "화", "수", "목", "금", "토"];
const mockDispatch = jest.fn();

jest.mock("react-redux", () => ({
  useSelector: jest.fn(),
  useDispatch: () => mockDispatch,
}));

describe("Day Unit Test", () => {
  it("#1. 렌더링 테스트", () => {
    const todos = {};

    useSelector.mockReturnValueOnce(todos);

    render(<Day day={WEEK[date.getDay()]} date={format(date, "yyyy-MM-dd")} />);

    expect(screen.getByText(WEEK[date.getDay()])).toBeInTheDocument();
    expect(screen.getByText(format(date, "d"))).toBeInTheDocument();
  });

  it("#2. 해당하는 날짜의 todo만 가져와야 함", () => {
    const today = format(date, "yyyy-MM-dd");
    const nextDay = format(add(date, { days: 1 }), "yyyy-MM-dd");

    const todos = {};
    todos[today] = [
      {
        isComplete: false,
        title: "todayTitle",
        memo: "todayMemo",
        _id: "todayId",
      },
    ];
    todos[nextDay] = [
      {
        isComplete: true,
        title: "nextDayTitle",
        memo: "nextDayMemo",
        _id: "nextDayId",
      },
    ];

    useSelector.mockReturnValueOnce(todos);

    render(<Day day={WEEK[date.getDay()]} date={format(date, "yyyy-MM-dd")} />);

    expect(screen.getByText("todayTitle")).toBeInTheDocument();
    expect(screen.queryByText("nextDayTitle")).not.toBeInTheDocument();
  });
});

import React from "react";
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/extend-expect";
import { format } from "date-fns";

import MessageBox from "./MessageBox";

describe("MessageBox Unit Test", () => {
  it("#1. 렌더링 테스트", () => {
    const mockData = {
      profile: "profileUrl",
      displayName: "userName",
      message: "userMessage",
      createdAt: new Date().toISOString(),
    };
    const date = format(new Date(mockData.createdAt), "yyyy.MM.dd HH:mm");

    render(<MessageBox data={mockData} />);

    expect(screen.getByAltText("profile")).toBeInTheDocument();
    expect(screen.getByText("userName")).toBeInTheDocument();
    expect(screen.getByText("userMessage")).toBeInTheDocument();
    expect(screen.getByText(date)).toBeInTheDocument();
  });
});

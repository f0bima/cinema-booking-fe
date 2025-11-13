import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";
import PasswordInput from "./PasswordInput";

vi.mock("@/common/presentation/component/Input/Input", () => ({
  default: ({ ...props }: any) => <input {...props} data-testid="input" />,
}));

describe("PasswordInput", () => {
  it("should render password input by default", () => {
    render(<PasswordInput />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("type", "password");
  });

  it("should hide password by default (masked) and show real text when toggled", () => {
    render(<PasswordInput defaultValue="123" />);
    const input = screen.getByTestId("input");

    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue("123");

    const toggleIcon = screen.getByTestId("toggle-show-password");

    fireEvent.click(toggleIcon);

    expect(input).toHaveAttribute("type", "text");
    expect(input).toHaveValue("123"); // still same value, just visible now

    fireEvent.click(toggleIcon);

    expect(input).toHaveAttribute("type", "password");
    expect(input).toHaveValue("123");
  });

  it("should toggle input type between password and text when icon is clicked", () => {
    render(<PasswordInput />);
    const input = screen.getByTestId("input");

    const toggleIcon = screen.getByTestId("toggle-show-password");

    fireEvent.click(toggleIcon);
    const closeEyeIcon = screen.getByTestId("close-eye-icon");
    expect(input).toHaveAttribute("type", "text");
    expect(closeEyeIcon).toBeInTheDocument();

    fireEvent.click(toggleIcon);
    const openEyeIcon = screen.getByTestId("open-eye-icon");
    expect(input).toHaveAttribute("type", "password");
    expect(openEyeIcon).toBeInTheDocument();
  });

  it("should forward additional props to Input component", () => {
    render(<PasswordInput placeholder="Enter password" />);
    const input = screen.getByTestId("input");
    expect(input).toHaveAttribute("placeholder", "Enter password");
  });
});

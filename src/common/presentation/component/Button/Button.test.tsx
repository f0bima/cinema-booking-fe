import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import Button from "./Button";

describe("Button", () => {
  it("should render the button with provided text", () => {
    render(<Button>Click Me</Button>);
    const button = screen.getByRole("button", { name: "Click Me" });

    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("should apply default classes", () => {
    render(<Button>Default</Button>);
    const button = screen.getByRole("button", { name: "Default" });

    expect(button.className).toContain("rounded-lg");
    expect(button.className).toContain("bg-indigo-200");
    expect(button.className).toContain("p-2");
  });

  it("should merge custom className using twMerge", () => {
    render(<Button className="bg-red-500">Merged</Button>);
    const button = screen.getByRole("button", { name: "Merged" });

    expect(button.className).toContain("bg-red-500");
    expect(button.className).not.toContain("bg-indigo-200");
  });

  it("should apply hover classes when enabled", () => {
    render(<Button>Hoverable</Button>);
    const button = screen.getByRole("button", { name: "Hoverable" });

    expect(button.className).toContain("hover:bg-indigo-400");
    expect(button.className).toContain("hover:text-white");
  });

  it("should apply disabled styles and not include hover classes", () => {
    render(<Button disabled>Disabled</Button>);
    const button = screen.getByRole("button", { name: "Disabled" });

    expect(button).toBeDisabled();
    expect(button.className).toContain("bg-muted");
    expect(button.className).toContain("cursor-not-allowed");
    expect(button.className).not.toContain("hover:bg-indigo-400");
    expect(button.className).not.toContain("hover:text-white");
  });

  it("should handle click events when enabled", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click</Button>);
    const button = screen.getByRole("button", { name: "Click" });

    fireEvent.click(button);
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should not trigger click events when disabled", () => {
    const handleClick = vi.fn();
    render(
      <Button onClick={handleClick} disabled>
        Disabled
      </Button>,
    );
    const button = screen.getByRole("button", { name: "Disabled" });

    fireEvent.click(button);
    expect(handleClick).not.toHaveBeenCalled();
  });
});

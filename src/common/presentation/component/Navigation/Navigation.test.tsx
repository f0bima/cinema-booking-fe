import { render, screen } from "@testing-library/react";
import Navigation from "./Navigation";
import { describe, it, expect, vi, beforeEach } from "vitest";

vi.mock("@/common/presentation/component/Navigation/Menu", () => ({
  default: vi.fn(({ menu, isActive }: any) => (
    <div data-testid="menu-item">
      <span>{menu.name}</span>
      {isActive && <span data-testid="active-flag">active</span>}
    </div>
  )),
}));

describe("Navigation Component", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders customer menus correctly", () => {
    render(<Navigation currentPathname="/tickets" role="customer" />);

    const menuItems = screen.getAllByTestId("menu-item");
    expect(menuItems).toHaveLength(3);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Tickets")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();

    const activeFlag = screen.getByTestId("active-flag");
    expect(activeFlag).toBeInTheDocument();
  });

  it("renders admin menus correctly", () => {
    render(
      <Navigation currentPathname="/admin/ticket-validations" role="admin" />,
    );

    const menuItems = screen.getAllByTestId("menu-item");
    expect(menuItems).toHaveLength(3);

    expect(screen.getByText("Home")).toBeInTheDocument();
    expect(screen.getByText("Ticket Scanner")).toBeInTheDocument();
    expect(screen.getByText("Profile")).toBeInTheDocument();

    const activeFlag = screen.getByTestId("active-flag");
    expect(activeFlag).toBeInTheDocument();
  });

  it("highlights active menu correctly", () => {
    render(<Navigation currentPathname="/profile" role="customer" />);
    expect(screen.getByTestId("active-flag")).toBeInTheDocument();
  });
});

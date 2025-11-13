import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import StudioCard from "../StudioCard/StudioCard";
import Studios from "./Studios";

vi.mock("../StudioCard/StudioCard", () => ({
  default: vi.fn(() => <div data-testid="studio-card">Mock StudioCard</div>),
}));

describe("Studios Component", () => {
  const now = new Date();

  beforeEach(() => {
    vi.clearAllMocks();
  });
  it("renders 'Studio Empty' when no studios provided", () => {
    render(<Studios studios={[]} baseUrl="/" />);

    expect(screen.getByText("Studio Empty")).toBeInTheDocument();
  });

  it("renders list of StudioCard when studios provided", () => {
    const studios = [
      {
        id: 1,
        name: "Studio 1",
        totalSeats: 20,
        createdAt: now,
        updatedAt: now,
      },
      {
        id: 2,
        name: "Studio 2",
        totalSeats: 10,
        createdAt: now,
        updatedAt: now,
      },
    ];

    render(<Studios studios={studios} baseUrl="/" />);

    const cards = screen.getAllByTestId("studio-card");
    expect(cards).toHaveLength(studios.length);
  });

  it("passes baseUrl and studio props to StudioCard", () => {
    const studios = [
      {
        id: 1,
        name: "Studio 1",
        totalSeats: 20,
        createdAt: now,
        updatedAt: now,
      },
    ];
    const baseUrl = "/admin";

    render(<Studios studios={studios} baseUrl={baseUrl} />);

    const firstCallArgs = (StudioCard as any).mock.calls[0][0];

    expect(firstCallArgs).toEqual(
      expect.objectContaining({
        studio: studios[0],
        baseUrl,
      }),
    );
  });
});

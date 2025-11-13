import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import StudioCard from "./StudioCard";
import { navigate } from "astro:transitions/client";
import type { TStudio } from "@/features/cinema/domain/entity/studio.entity";

vi.mock("astro:transitions/client", () => ({
  navigate: vi.fn(),
}));

describe("StudioCard", () => {
  const now = new Date();
  const studio: TStudio = {
    id: 1,
    name: "Studio 1",
    totalSeats: 20,
    createdAt: now,
    updatedAt: now,
  };

  it("renders studio name and total seats", () => {
    render(<StudioCard studio={studio} />);

    expect(screen.getByText("Studio 1")).toBeInTheDocument();
    expect(screen.getByText("20 Seats")).toBeInTheDocument();
  });

  it("navigates to correct path when clicked (no baseUrl)", () => {
    render(<StudioCard studio={studio} />);
    fireEvent.click(screen.getByText("Studio 1"));

    expect(navigate).toHaveBeenCalledWith("/studio-seats/1");
  });

  it("navigates to correct path when baseUrl is provided", () => {
    render(<StudioCard studio={studio} baseUrl="/admin" />);
    fireEvent.click(screen.getByText("Studio 1"));

    expect(navigate).toHaveBeenCalledWith("/admin/studio-seats/1");
  });

  it("has correct hover styles (visual test hint)", () => {
    render(<StudioCard studio={studio} />);
    const card = screen.getByText("Studio 1").closest(".studio-card");
    expect(card).toHaveClass("cursor-pointer");
  });
});

import type { TSeat } from "@/features/cinema/domain/entity/seat.entity";
import CinemaFloorPlan from "@/features/studioSeats/presentation/components/CinemaFloorPlan/CinemaFloorPlan";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("CinemaFloorPlan Test", () => {
  const seats: TSeat[] = [
    {
      id: 1,
      isAvailable: true,
      seatNumber: "A1",
      studio: {
        id: 1,
        name: "Studio 1",
        createdAt: new Date(),
        totalSeats: 2,
        updatedAt: new Date(),
      },
      studioId: 1,
      studioName: "Studio 1",
      updatedAt: new Date(),

      createdAt: new Date(),
    },
    {
      id: 2,
      isAvailable: true,
      seatNumber: "A2",
      studio: {
        id: 1,
        name: "Studio 1",
        createdAt: new Date(),
        totalSeats: 2,
        updatedAt: new Date(),
      },
      studioId: 1,
      studioName: "Studio 1",
      updatedAt: new Date(),

      createdAt: new Date(),
    },
  ];
  it("Should render cinema floor plan", () => {
    render(<CinemaFloorPlan seats={seats} />);

    expect(screen.getByTestId("cinema-screen")).toBeInTheDocument();
    expect(screen.getByTestId("seat-information")).toBeInTheDocument();
    expect(screen.getByText(/A1/i)).toBeInTheDocument();
    expect(screen.getByText(/A2/i)).toBeInTheDocument();
  });
});

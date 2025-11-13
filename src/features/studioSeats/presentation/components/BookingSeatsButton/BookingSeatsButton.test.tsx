import type { TSeat } from "@/features/cinema/domain/entity/seat.entity";
import BookingSeatsButton from "@/features/studioSeats/presentation/components/BookingSeatsButton/BookingSeatsButton";
import { selectedSeats } from "@/features/studioSeats/presentation/store/seat.store";
import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

describe("BookingSeatsButton test", () => {
  const seats: TSeat[] = [
    {
      id: 1,
      studioId: 1,
      seatNumber: "A1",
      isAvailable: false,
      studio: {
        id: 1,
        name: "Studio 1",
        totalSeats: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      studioName: "Studio 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id: 2,
      studioId: 1,
      seatNumber: "A2",
      isAvailable: false,
      studio: {
        id: 1,
        name: "Studio 1",
        totalSeats: 20,
        createdAt: new Date(),
        updatedAt: new Date(),
      },
      studioName: "Studio 1",
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ];
  beforeEach(() => {
    selectedSeats.set([]);
  });
  it("renders disabled button when no seats selected", () => {
    render(<BookingSeatsButton onBooking={vi.fn()} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Please choose seats");
    expect(button).toBeDisabled();
  });

  it("renders enabled button when seats are selected", () => {
    selectedSeats.set(seats);
    render(<BookingSeatsButton onBooking={vi.fn()} />);
    const button = screen.getByRole("button");
    expect(button).toHaveTextContent("Book 2 seats now");
    expect(button).not.toBeDisabled();
  });

  it("calls onBooking with selected seat IDs", () => {
    const handleBooking = vi.fn();
    selectedSeats.set(seats);

    render(<BookingSeatsButton onBooking={handleBooking} />);
    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(handleBooking).toHaveBeenCalledWith({
      seatIds: [1, 2],
    });
  });
});

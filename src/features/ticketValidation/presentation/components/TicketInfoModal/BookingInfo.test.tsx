import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";
import BookingInfo from "@/features/ticketValidation/presentation/components/TicketInfoModal/BookingInfo";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

describe("BookingInfo component test", () => {
  it("Should display booking info", () => {
    const mockBookingInfo: TBookingValidation = {
      valid: true,
      booking: {
        bookingCode: "3cca9a2a-f64b-4ac2-9437-f5424314ddd0",
        customerName: "John Doe",
        bookingType: "offline",
        studioId: 1,
        seatIds: [2, 3],
      },
    };

    render(<BookingInfo bookingInfo={mockBookingInfo} />);
    // expect(screen.getByText("John Doe")).toBeInTheDocument();

    expect(screen.getByTestId("customer-name")).toHaveTextContent(
      "Name : John Doe",
    );
    expect(screen.getByTestId("ticket-type")).toHaveTextContent(
      "Ticket type : offline",
    );
    expect(screen.getByTestId("studio")).toHaveTextContent("Studio : 1");
    expect(screen.getByTestId("seats")).toHaveTextContent("Seat IDs : 2, 3");
    expect(screen.getByTestId("status")).toHaveTextContent("Valid");
  });
});

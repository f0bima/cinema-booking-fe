import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";
import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";
import Ticket from "@/features/tickets/presentation/components/Ticket/Ticket";
import BookingInfo from "@/features/ticketValidation/presentation/components/TicketInfoModal/BookingInfo";
import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

vi.mock(
  "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer",
  () => ({
    default: ({ open }: { open: boolean }) =>
      open ? <div data-testid="mock-modal">Modal Open</div> : null,
  }),
);

vi.mock(
  "@/features/studioSeats/presentation/components/SeatsConfiguration/Seat",
  () => ({
    default: ({ seatNumber }: any) => (
      <span data-testid="mock-seat">{seatNumber}</span>
    ),
  }),
);
describe("Ticket component test", () => {
  const mockTicket: TTicket = {
    bookingCode: "3cca9a2a-f64b-4ac2-9437-f5424314ddd0",
    id: 1,
    qrCode:
      "data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAQAAAAEAAQMAAABmvDolAAAABlBMVEX///8AAABVwtN+AAADaUlEQVR42uyZMW7zOhCER1DBcm9gXsSQruXCgAS40LVk+CL0DViyEDgPs3LiP696xbN+FmHlKF8Ambs7O7vB7/k9//cZST6eOfCebO6ZMdVoc/8kWZsBBiCsHcONyUgBpC18Zv/VQUDkssIKEI0rUHpR4zNzawt4kAUdM84nw7VLVs7d4cAz81ZB3WTY/HFjABAeT5bpnmxZOyoJjWv3Ix8+DLzSvlyHaMsfH/5dF38V0OkTMNW9QKCUm5h+iMiHgQG2sFq4VX0geat7EnIemgG65OUQZsDmcU+5fOnf3+IQgHyQyn8r55h5u6cMkbe1GQDR065MKzJwMoWbMyLR18MAYJI+cI2cR4WVtDJWKw0BI3EZq2FagWmLCnfEtEYqAY4CXLsUO0XzBL/FRcArmi0AiCyAlelOv0nJfr70FV9qfwDQpTxtsHIdYHNfoR6dwxozZzQDDPAEC9sQcUGXBWDy3jQcBkRMj4oyVdh8BsI8kguf3ynXBIB8OcOBPMljee9mgu72KCAiyGj195QnVlNHthkn/5NWAIBlrMD11cRdcsOuJEcBQ5Rb8ZJUa87lCmR/7WltBhhps5ucNWYvh/4u65XwdmKfB5Itj2qch5jDw0eb6DPOl4i1AAwa/aqpJN02c+6YwyNJzY4DSD5ZdtfHLNnP7pXnhgB5m5gpzfAk60nz3rQdBozJ51Bqci/9M7uH0eSOqTYDSEDcbVVwPp8QtjHhAhi//MPngS7lsJ0sbDLCTFb8CYWjGQDRitzy1fujbrIi4xzz21d/HPDxU5WoIkWX0d9f8b2tLQGKsn7MYT2ZZ9plZC79YUBH46bnejefQ+Wxzu+XbARQXcioa3QFt04TB4mXyTkAUKZtUWrgU2Hm1iVMGlHfJuevA11yx+4vj1HW9K5q7fKXfzgEkFGXIqgjJ5HSh4TwPeM0APjWUSbZTU4uPYkLIsPL5BwAjIT8p5qgrDvR1+hLDzYEuFt+0hdWXLvsJSmT8632nwfG3X+qErPUXnOEy35BO4Bv/uFbNS77ejay9LLN62FApLtirpHLPgymfc349R+QRgBfDenrbCqHO1kQ/xirjwF8xRFt2U4IMyI0maJf2wEU7pPJNnslqC2aVORHPnwW8LSv++aznDvf7NmMt9FqAfg9v+e/n38CAAD//ybdAGKWO7sjAAAAAElFTkSuQmCC",
    bookingType: "offline",
    studioId: 1,
    seatIds: [2, 3],
    status: "active",
    createdAt: new Date(),
    updatedAt: new Date(),
    user: { email: "john@doe.com", id: 1, name: "John Doe" },
  };

  it("Should display ticket info", () => {
    render(<Ticket ticket={mockTicket} />);

    expect(screen.getByTestId("studio")).toHaveTextContent("1");

    expect(screen.getAllByTestId("mock-seat")).toHaveLength(2);
    expect(screen.getByTestId("status")).toHaveTextContent("active");
  });

  it("opens modal when clicked", () => {
    render(<Ticket ticket={mockTicket} />);
    fireEvent.click(screen.getByText("Studio"));
    expect(screen.getByTestId("mock-modal")).toBeInTheDocument();
  });
});

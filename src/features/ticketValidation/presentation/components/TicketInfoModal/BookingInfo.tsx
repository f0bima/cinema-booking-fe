import { Badge } from "@/common/presentation/component/shadcn/ui/badge";
import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";

type Props = { bookingInfo?: TBookingValidation };

const BookingInfo = ({ bookingInfo }: Props) => {
  return (
    <div className="">
      <div className="">
        <p data-testid="customer-name">
          <span className="font-semibold">Name :</span>{" "}
          {bookingInfo.booking.customerName}
        </p>
        <p data-testid="ticket-type">
          <span className="font-semibold">Ticket type :</span>{" "}
          {bookingInfo.booking.bookingType}
        </p>
        <p data-testid="studio">
          <span className="font-semibold">Studio :</span>{" "}
          {bookingInfo.booking.studioId}
        </p>
        <p data-testid="seats">
          <span className="font-semibold">Seat IDs :</span>{" "}
          {bookingInfo.booking.seatIds.join(", ")}
        </p>
      </div>
      <div className="">
        <span className="font-semibold">Status : </span>
        <Badge
          data-testid="status"
          variant={bookingInfo.valid ? "secondary" : "destructive"}
        >
          {bookingInfo.valid ? "Valid" : "Invalid"}
        </Badge>
      </div>
    </div>
  );
};

export default BookingInfo;

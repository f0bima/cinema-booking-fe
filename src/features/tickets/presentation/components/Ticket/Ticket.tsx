import { Badge } from "@/components/ui/badge";
import type { TTicket } from "../../../../booking/domain/entity/ticket.entity";
import Seat from "../../../../studioSeats/presentation/components/SeatsConfiguration/Seat";
import QRCodeViewer from "../QRCodeViewer/QRCodeViewer";

type Props = { ticket: TTicket };

const Ticket = ({ ticket }: Props) => {
  return (
    <div className="ticket flex w-full max-w-sm justify-between gap-2 rounded-lg p-2 shadow-lg">
      <div className="flex flex-col items-center">
        <p>Studio</p>
        <h3 className="text-5xl">{ticket.studioId}</h3>
      </div>
      <div className="grow text-center">
        <p>Seats</p>
        <div className="flex justify-center gap-2">
          {ticket.seatIds.map((seat) => (
            <Seat seatNumber={seat.toString()} />
          ))}
        </div>
      </div>
      <div className="">
        <Badge
          variant={ticket.status === "active" ? "secondary" : "destructive"}
          className="uppercase"
        >
          {ticket.status}
        </Badge>
        <div className="aspect-square w-12">
          <QRCodeViewer qrBase64={ticket.qrCode} />
        </div>
      </div>
    </div>
  );
};

export default Ticket;

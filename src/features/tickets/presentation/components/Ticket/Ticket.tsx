import { Badge } from "@/components/ui/badge";
import type { TTicket } from "../../../../booking/domain/entity/ticket.entity";
import Seat from "../../../../studioSeats/presentation/components/SeatsConfiguration/Seat";
import QRCodeViewer from "../QRCodeViewer/QRCodeViewer";
import QRModalViewer from "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer";
import { useState } from "react";

type Props = { ticket: TTicket };

const Ticket = ({ ticket }: Props) => {
  const [isShowQR, setIsShowQR] = useState<boolean>(false);
  return (
    <>
      <div
        onClick={() => setIsShowQR(true)}
        className="ticket flex w-full cursor-pointer justify-between gap-2 rounded-lg p-2 shadow-lg"
      >
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
        <div className="flex flex-col items-center">
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
      <QRModalViewer
        open={isShowQR}
        qrBase64={ticket.qrCode}
        onOpenChange={setIsShowQR}
      />
    </>
  );
};

export default Ticket;

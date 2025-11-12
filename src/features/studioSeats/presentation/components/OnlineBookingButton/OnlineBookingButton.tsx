import QRModalViewer from "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer";
import { useState } from "react";
import { toast } from "sonner";
import { API } from "../../../../../common/infrastructure/datasource/api";
import { bookingDatasource } from "../../../../booking/infrastructure/datasource/booking.datasource";
import BookingSeatsButton from "../BookingSeatsButton/BookingSeatsButton";
import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";
import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";

type Props = { studioId: number };

const bookingRepo = bookingDatasource({ api: API });

const OnlineBookingButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ticketQRCode, setTicketQRCode] = useState<string>("");

  const onBookingOnlineSeat = ({ seatIds }: { seatIds: number[] }) => {
    PROXY_API.post("/online-bookings", { seatIds, studioId: props.studioId })
      .then((response) => {
        const ticket = response as unknown as TTicket;
        setTicketQRCode(ticket.qrCode);
        setIsOpen(true);
        toast.success("Success booking seats");
      })
      .catch((err) => {
        toast.success(err.data);
      });
  };

  return (
    <>
      <BookingSeatsButton onBooking={onBookingOnlineSeat} />
      <QRModalViewer open={isOpen} qrBase64={ticketQRCode} />
    </>
  );
};

export default OnlineBookingButton;

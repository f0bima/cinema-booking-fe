import { PROXY_API } from "@/common/infrastructure/datasource/proxyApi";
import { errorUtils } from "@/common/libs/utils/error.utils";
import Button from "@/common/presentation/component/Button/Button";
import type { TTicket } from "@/features/booking/domain/entity/ticket.entity";
import QRModalViewer from "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer";
import { navigate } from "astro/virtual-modules/transitions-router.js";
import { useState } from "react";
import { toast } from "sonner";
import BookingSeatsButton from "../BookingSeatsButton/BookingSeatsButton";

type Props = { studioId: number };

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
        const message = errorUtils.getErrorAPIMessage(err);
        toast.error(message);
      });
  };

  return (
    <>
      <BookingSeatsButton onBooking={onBookingOnlineSeat} />
      <QRModalViewer open={isOpen} qrBase64={ticketQRCode}>
        <Button
          onClick={() => {
            navigate("/tickets");
          }}
          className="w-full"
        >
          Goto your tickets
        </Button>
      </QRModalViewer>
    </>
  );
};

export default OnlineBookingButton;

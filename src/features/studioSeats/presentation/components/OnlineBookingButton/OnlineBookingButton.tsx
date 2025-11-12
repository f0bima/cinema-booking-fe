import { onlineBookingSeatUsecase } from "@/features/studioSeats/application/onlineBookingSeat.usecase";
import QRModalViewer from "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer";
import { useState } from "react";
import { toast } from "sonner";
import { API } from "../../../../../common/infrastructure/datasource/api";
import { bookingDatasource } from "../../../../booking/infrastructure/datasource/booking.datasource";
import BookingSeatsButton from "../BookingSeatsButton/BookingSeatsButton";

type Props = { studioId: number };

const bookingRepo = bookingDatasource({ api: API });

const OnlineBookingButton = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ticketQRCode, setTicketQRCode] = useState<string>("");

  const onBookingOnlineSeat = ({ seatIds }: { seatIds: number[] }) => {
    onlineBookingSeatUsecase({ repo: bookingRepo })
      .execute({
        seatIds,
        studioId: props.studioId,
      })
      .then((response) => {
        setTicketQRCode(response.qrCode);
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
      <QRModalViewer isOpen={isOpen} qrBase64={ticketQRCode} />
    </>
  );
};

export default OnlineBookingButton;

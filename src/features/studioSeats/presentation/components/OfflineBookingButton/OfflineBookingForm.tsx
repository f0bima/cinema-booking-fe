import { API } from "@/common/infrastructure/datasource/api";
import Button from "@/common/presentation/component/Button/Button";
import FormMessage from "@/common/presentation/component/FormMessage/FormMessage";
import { bookingDatasource } from "@/features/booking/infrastructure/datasource/booking.datasource";
import { offlineBookingSeatUsecase } from "@/features/studioSeats/application/offlineBookingSeat.usecase";
import {
  offlineBookingSchema,
  type TOfflineBookingRequest,
} from "@/features/studioSeats/presentation/schema/offlineBooking.schema";
import QRModalViewer from "@/features/tickets/presentation/components/QRModalViewer/QRModalViewer";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";

type Props = { studioId: number; seatIds: number[] };

const bookingRepo = bookingDatasource({ api: API });

const OfflineBookingForm = (props: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [ticketQRCode, setTicketQRCode] = useState<string>("");

  const {
    control,
    register,
    setValue,
    formState: { errors, isValid },
  } = useForm({
    resolver: zodResolver(offlineBookingSchema),
    mode: "onChange",
  });

  useEffect(() => {
    setValue("studioId", props.studioId);
    setValue("seatIds", props.seatIds);
  }, []);

  const onBookingOfflineSeats = (bookingRequest: TOfflineBookingRequest) => {
    offlineBookingSeatUsecase({ repo: bookingRepo })
      .execute({
        ...bookingRequest,
      })
      .then((response) => {
        setIsOpen(true);
        console.log(response);
        setTicketQRCode(response.qrCode);
      })
      .catch((err) => toast.error(err.data));
  };
  return (
    <>
      <form onSubmit={control.handleSubmit(onBookingOfflineSeats)}>
        <input placeholder="name" type="text" {...register("customerName")} />
        <FormMessage error={errors.customerName} />
        <input
          placeholder="email"
          type="email"
          {...register("customerEmail")}
        />
        <FormMessage error={errors.customerEmail} />

        <Button type="submit" disabled={!isValid}>
          Booking
        </Button>
      </form>
      <QRModalViewer open={isOpen} qrBase64={ticketQRCode} />
    </>
  );
};

export default OfflineBookingForm;

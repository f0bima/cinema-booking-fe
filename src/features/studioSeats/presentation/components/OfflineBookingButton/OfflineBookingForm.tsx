import { API_GATEWAY } from "@/common/infrastructure/datasource/apiGateway";
import { errorUtils } from "@/common/libs/utils/error.utils";
import Button from "@/common/presentation/component/Button/Button";
import FormGroup from "@/common/presentation/component/FormGroup/FormGroup";
import FormMessage from "@/common/presentation/component/FormMessage/FormMessage";
import Input from "@/common/presentation/component/Input/Input";
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
import { IoPrint } from "react-icons/io5";
import { toast } from "sonner";

type Props = { studioId: number; seatIds: number[] };

const bookingRepo = bookingDatasource({ api: API_GATEWAY });

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
      .catch((err) => {
        const message = errorUtils.getErrorAPIMessage(err);
        toast.error(message);
      });
  };
  return (
    <>
      <form
        onSubmit={control.handleSubmit(onBookingOfflineSeats)}
        className="space-y-4"
      >
        <FormGroup label="Name">
          <Input placeholder="name" type="text" {...register("customerName")} />
          <FormMessage error={errors.customerName} />
        </FormGroup>
        <FormGroup label="Email">
          <Input
            placeholder="email"
            type="email"
            {...register("customerEmail")}
          />
          <FormMessage error={errors.customerEmail} />
        </FormGroup>

        <Button type="submit" disabled={!isValid} className="w-full">
          Booking
        </Button>
      </form>
      <QRModalViewer open={isOpen} qrBase64={ticketQRCode}>
        <div className="flex w-full gap-2">
          <Button
            className="flex flex-1 items-center justify-center gap-2 bg-green-100"
            onClick={() => window.print()}
          >
            <IoPrint />
            <span>Print</span>
          </Button>
          <Button
            onClick={() => {
              window.location.reload();
            }}
            className="w-full flex-1"
          >
            Close
          </Button>
        </div>
      </QRModalViewer>
    </>
  );
};

export default OfflineBookingForm;

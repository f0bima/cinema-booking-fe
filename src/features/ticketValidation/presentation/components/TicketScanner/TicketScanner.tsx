import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";
import TicketInfoModal from "@/features/ticketValidation/presentation/components/TicketInfoModal/TicketInfoModal";
import { Scanner } from "@yudiel/react-qr-scanner";
import { useState } from "react";
import { toast } from "sonner";
import { API_GATEWAY } from "../../../../../common/infrastructure/datasource/apiGateway";
import { zodUtils } from "../../../../../common/libs/utils/zod.utils";
import { bookingDatasource } from "../../../../booking/infrastructure/datasource/booking.datasource";
import { ticketValidationUsecase } from "../../../application/ticketValidation.usecase";
import { ticketSchema } from "../../schema/ticket.schema";
import { errorUtils } from "@/common/libs/utils/error.utils";

type Props = {};

const bookingRepo = bookingDatasource({ api: API_GATEWAY });
const TicketScanner = (props: Props) => {
  const [bookingInfo, setBookingInfo] = useState<TBookingValidation>();
  const [scanningStatus, setScanningStatus] = useState<"scanning" | "iddle">(
    "iddle",
  );
  const onScan = (value: string) => {
    if (bookingInfo || scanningStatus === "scanning") return;
    try {
      const jsonValue = JSON.parse(value);
      const ticketParse = ticketSchema.safeParse(jsonValue);

      if (!ticketParse.success) {
        const messages = zodUtils.getErrorAPIMessages(ticketParse.error);
        toast.error(messages.join(". "));
        return;
      }

      const { bookingCode } = ticketParse.data;

      setScanningStatus("scanning");

      ticketValidationUsecase({ repo: bookingRepo })
        .execute({ bookingCode })
        .then((response) => {
          console.log({ response });
          setBookingInfo(response);
        })
        .catch((err) => {
          console.log({ err });
          const message = errorUtils.getErrorAPIMessage(err);
          toast.error(message);
        })
        .finally(() => setScanningStatus("iddle"));
    } catch {
      toast.error("Not valid Qr Tiket");
    }
  };

  return (
    <div className="overflow-hidden rounded-lg">
      <Scanner
        onScan={(result) => onScan(result[0].rawValue)}
        onError={(error: Object) => console.log((error as any).message)}
      />
      <TicketInfoModal
        bookingInfo={bookingInfo}
        open={!!bookingInfo}
        onOpenChange={(val) => {
          if (!val) setBookingInfo(undefined);
        }}
      />
    </div>
  );
};

export default TicketScanner;

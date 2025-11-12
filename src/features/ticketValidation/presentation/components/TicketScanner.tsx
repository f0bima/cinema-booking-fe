import { Scanner } from "@yudiel/react-qr-scanner";
import { API } from "../../../../common/infrastructure/datasource/api";
import { zodUtils } from "../../../../common/libs/utils/zod.utils";
import { bookingDatasource } from "../../../booking/infrastructure/datasource/booking.datasource";
import { ticketValidationUsecase } from "../../application/ticketValidation.usecase";
import { ticketSchema } from "../schema/ticket.schema";

type Props = {};

const bookingRepo = bookingDatasource({ api: API });
const TicketScanner = (props: Props) => {
  const onScan = (value: string) => {
    try {
      const jsonValue = JSON.parse(value);
      const ticketParse = ticketSchema.safeParse(jsonValue);

      if (!ticketParse.success) {
        const messages = zodUtils.getErrorMessages(ticketParse.error);
        return console.log({ messages });
      }

      const { bookingCode } = ticketParse.data;

      ticketValidationUsecase({ repo: bookingRepo })
        .execute({ bookingCode })
        .then((reponse) => {
          console.log("valid", reponse.valid);
        })
        .catch((err) => {
          console.error(err.data);
        });
    } catch {
      console.error("Not valid Qr Tiket");
    }
  };

  return (
    <Scanner
      onScan={(result) => onScan(result[0].rawValue)}
      onError={(error: Object) => console.log((error as any).message)}
    />
  );
};

export default TicketScanner;

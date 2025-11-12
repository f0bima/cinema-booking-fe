import { API } from "../../../../../common/infrastructure/datasource/api";
import { bookingDatasource } from "../../../../booking/infrastructure/datasource/booking.datasource";
import { onlineBookingSeatUsecase } from "../../../application/onlineBookingSeat.usecase";
import BookingSeatsButton from "../BookingSeatsButton/BookingSeatsButton";

type Props = { studioId: number };

const bookingRepo = bookingDatasource({ api: API });

const OnlineBookingButton = (props: Props) => {
  const onBookingOnlineSeat = ({ seatIds }: { seatIds: number[] }) => {
    console.log(seatIds);
    onlineBookingSeatUsecase({ repo: bookingRepo })
      .execute({
        seatIds,
        studioId: props.studioId,
      })
      .then((response) => {
        console.log(response);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };

  return <BookingSeatsButton onBooking={onBookingOnlineSeat} />;
};

export default OnlineBookingButton;

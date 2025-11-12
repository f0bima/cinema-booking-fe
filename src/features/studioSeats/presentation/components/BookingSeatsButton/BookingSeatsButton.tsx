import { useStore } from "@nanostores/react";
import { useMemo } from "react";
import Button from "../../../../../common/presentation/component/Button/Button";
import { selectedSeats } from "../../store/seat.store";

type Props = {
  onBooking: (params: { seatIds: number[] }) => void;
};
const BookingSeatsButton = (props: Props) => {
  const $selectedSeats = useStore(selectedSeats);

  const label = useMemo(() => {
    const selectedSeatsLength = $selectedSeats.length;
    if (selectedSeatsLength === 0) return "Please choose seats";
    return `Book ${selectedSeatsLength} seat${selectedSeatsLength > 1 ? "s" : ""} now`;
  }, [$selectedSeats]);

  const onBooking = () => {
    props.onBooking({
      seatIds: $selectedSeats.map((selectedSeat) => selectedSeat.id),
    });
  };

  return <Button onClick={onBooking}>{label}</Button>;
};

export default BookingSeatsButton;

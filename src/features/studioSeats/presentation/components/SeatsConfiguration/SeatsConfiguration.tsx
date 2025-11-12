import { useCallback } from "react";
import type { TSeat } from "../../../../cinema/domain/entity/seat.entity";
import { selectedSeats, selectSeat } from "../../store/seat.store";
import Seat, { type ESeatStatus } from "./Seat";
import { useStore } from "@nanostores/react";

type Props = { seats: TSeat[] };

const SeatsConfiguration = ({ seats }: Props) => {
  const $selectedSeats = useStore(selectedSeats);
  const onSeatSelected = useCallback((seat: TSeat) => {
    if (!seat.isAvailable) return;
    selectSeat(seat);
  }, []);

  const getSeatStatus = useCallback(
    (seat: TSeat): ESeatStatus => {
      if (!seat.isAvailable) return "booked";
      const isSeatSelected = $selectedSeats.find(
        (selectedSeat) => selectedSeat.id === seat.id,
      );
      if (isSeatSelected) return "selected";
      return "available";
    },
    [$selectedSeats],
  );

  return (
    <section className="seat-configuration grid grid-cols-4 place-items-center gap-8">
      {seats.map((seat) => (
        <Seat
          key={seat.id}
          status={getSeatStatus(seat)}
          seatNumber={seat.seatNumber}
          onClick={() => onSeatSelected(seat)}
        />
      ))}
    </section>
  );
};

export default SeatsConfiguration;

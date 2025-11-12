import { atom, map } from "nanostores";
import type { TSeat } from "../../../cinema/domain/entity/seat.entity";

export const selectedSeats = atom<TSeat[]>([]);

export const selectSeat = (seat: TSeat) => {
  const addSelectedSeat = () => {
    selectedSeats.set([...currentSelectedSeats, seat]);
  };
  const remomveSelectedSeat = () => {
    selectedSeats.set(
      currentSelectedSeats.filter((currentSeat) => currentSeat.id !== seat.id),
    );
  };

  const currentSelectedSeats = selectedSeats.get();
  const isSeatSelected = currentSelectedSeats.find(
    (currentSeat) => currentSeat.id === seat.id,
  );

  if (!isSeatSelected) addSelectedSeat();
  else remomveSelectedSeat();
};

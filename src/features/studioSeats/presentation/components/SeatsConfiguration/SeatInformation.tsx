import Seat from "./Seat";

const SeatInformation = () => {
  return (
    <div
      data-testid="seat-information"
      className="seat-information flex flex-col items-center gap-4"
    >
      <p className="text-lg font-bold">Seat Information :</p>
      <div className="flex gap-8">
        <Seat status="booked" seatNumber="Booked" />
        <Seat status="selected" seatNumber="Selected" />
        <Seat seatNumber="Available" />
      </div>
    </div>
  );
};

export default SeatInformation;

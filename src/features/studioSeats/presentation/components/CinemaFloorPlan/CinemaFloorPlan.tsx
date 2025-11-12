import type { TSeat } from "../../../../cinema/domain/entity/seat.entity";
import CinemaScreen from "./CinemaScreen";
import SeatInformation from "../SeatsConfiguration/SeatInformation";
import SeatsConfiguration from "../SeatsConfiguration/SeatsConfiguration";

type Props = { seats: TSeat[] };

const CinemaFloorPlan = ({ seats }: Props) => {
  return (
    <div className="flex flex-col items-center gap-12">
      <CinemaScreen className="w-80" />
      <SeatsConfiguration seats={seats} />
      <SeatInformation />
    </div>
  );
};

export default CinemaFloorPlan;

import { MdChair } from "react-icons/md";
import type { TStudio } from "../../../../cinema/domain/entity/studio.entity";
import { navigate } from "astro:transitions/client";

type Props = { baseUrl?: string; studio: TStudio };

const StudioCard = ({ baseUrl = "", ...props }: Props) => {
  const goToSeatDetail = () => {
    navigate(`${baseUrl}/studio-seats/${props.studio.id}`);
  };
  return (
    <div
      onClick={goToSeatDetail}
      className="studio-card cursor-pointer rounded-2xl bg-indigo-200/75 p-4 hover:bg-red-400 hover:text-white"
    >
      <h3 className="text-2xl font-semibold">{props.studio.name}</h3>
      <div className="flex items-center gap-2">
        <MdChair />
        <span>{props.studio.totalSeats} Seats</span>
      </div>
    </div>
  );
};

export default StudioCard;

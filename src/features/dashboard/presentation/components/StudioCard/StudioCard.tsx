import type { TStudio } from "../../../../cinema/domain/entity/studio.entity";

type Props = { studio: TStudio };

const StudioCard = (props: Props) => {
  return (
    <div className="studio-card rounded-2xl bg-indigo-200/75 p-4">
      <h3>{props.studio.name}</h3>
      <div className="">{props.studio.totalSeats}</div>
      <a href={`/studio-seats/${props.studio.id}`}>See detail seats</a>
    </div>
  );
};

export default StudioCard;

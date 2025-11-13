import type { TStudio } from "@/features/cinema/domain/entity/studio.entity";
import StudioCard from "@/features/dashboard/presentation/components/StudioCard/StudioCard";

type Props = { studios: TStudio[]; baseUrl: string };

const Studios = ({ studios, baseUrl }: Props) => {
  if (studios.length === 0) return <p>Studio Empty</p>;
  return (
    <div className="grid grid-cols-2 gap-4">
      {studios.map((studio) => (
        <StudioCard key={studio.id} studio={studio} baseUrl={baseUrl} />
      ))}
    </div>
  );
};

export default Studios;

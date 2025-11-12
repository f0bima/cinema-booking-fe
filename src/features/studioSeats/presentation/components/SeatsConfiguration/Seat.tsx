import { useMemo } from "react";
import { MdChair, MdOutlineChair } from "react-icons/md";
import { twMerge } from "tailwind-merge";

export type ESeatStatus = "booked" | "available" | "selected";

type Props = {
  status?: ESeatStatus;
  seatNumber: string;
  onClick?: () => void;
};

function Seat({ status = "available", seatNumber, onClick }: Props) {
  const textColor = useMemo(() => {
    const textColorMap: Record<ESeatStatus, string> = {
      available: "text-black",
      booked: "text-gray-300",
      selected: "text-green-300",
    };

    return textColorMap[status] ?? "text-black";
  }, [status]);
  return (
    <button
      onClick={onClick}
      className={twMerge(
        "seat flex w-fit flex-col items-center",
        textColor,
        status === "booked" ? "cursor-not-allowed" : "cursor-pointer",

        status !== "booked"
          ? "transition-all hover:scale-110 hover:text-indigo-500"
          : "",
      )}
    >
      <div className={twMerge("text-2xl")}>
        {status !== "available" ? <MdChair /> : <MdOutlineChair />}
      </div>
      <div className="">{seatNumber}</div>
    </button>
  );
}

export default Seat;

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import BookingSeatsButton from "@/features/studioSeats/presentation/components/BookingSeatsButton/BookingSeatsButton";
import OfflineBookingForm from "@/features/studioSeats/presentation/components/OfflineBookingButton/OfflineBookingForm";
import { useState } from "react";

type Props = { studioId: number };

const OfflineBookingButton = ({ studioId }: Props) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [seatIds, setSeatIds] = useState<number[]>([]);

  const onBookingOfflineSeat = ({ seatIds }: { seatIds: number[] }) => {
    setSeatIds(seatIds);
    setIsOpen(seatIds.length > 0);
  };

  return (
    <Dialog open={isOpen} onOpenChange={setIsOpen}>
      <DialogTrigger asChild>
        <BookingSeatsButton onBooking={onBookingOfflineSeat} />
      </DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <DialogHeader>
          <DialogTitle>Customer detail</DialogTitle>
          <DialogDescription>
            Please complete detail of customer.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4">
          <OfflineBookingForm seatIds={seatIds} studioId={studioId} />
        </div>
      </DialogContent>
    </Dialog>
  );
};

export default OfflineBookingButton;

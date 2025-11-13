import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/common/presentation/component/shadcn/ui/dialog";
import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";
import BookingInfo from "@/features/ticketValidation/presentation/components/TicketInfoModal/BookingInfo";
import type { DialogProps } from "@radix-ui/react-dialog";

import React, { type FC } from "react";

type Props = React.ComponentProps<FC<DialogProps>> & {
  bookingInfo?: TBookingValidation;
};

const TicketInfoModal = ({ bookingInfo, ...props }: Props) => {
  return (
    <Dialog {...props}>
      <DialogContent
        className="sm:max-w-[425px]"
        showCloseButton={props.onOpenChange !== undefined}
      >
        <DialogHeader>
          <DialogTitle>Ticket Details</DialogTitle>
          <DialogDescription>Your ticket is valid.</DialogDescription>
        </DialogHeader>
        <div
          id="print-area"
          className="flex w-full items-center justify-center gap-4"
        >
          {bookingInfo && <BookingInfo bookingInfo={bookingInfo} />}
        </div>
        <DialogFooter>{props.children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketInfoModal;

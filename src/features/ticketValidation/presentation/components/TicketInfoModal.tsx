import { Badge } from "@/components/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import type { TBookingValidation } from "@/features/booking/domain/entity/bookingValidation.entity";
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
          <DialogTitle>Your QR booking ticket</DialogTitle>
          <DialogDescription>
            Show your QR booking ticket to our staff
          </DialogDescription>
        </DialogHeader>
        <div
          id="print-area"
          className="flex w-full items-center justify-center gap-4"
        >
          {bookingInfo && (
            <div className="">
              <div className="">
                <p>
                  <span className="font-semibold">Name :</span>{" "}
                  {bookingInfo.booking.customerName}
                </p>
                <p>
                  <span className="font-semibold">Ticket type :</span>{" "}
                  {bookingInfo.booking.bookingType}
                </p>
                <p>
                  <span className="font-semibold">Studio :</span>{" "}
                  {bookingInfo.booking.studioId}
                </p>
                <p>
                  <span className="font-semibold">Seat IDs :</span>{" "}
                  {bookingInfo.booking.seatIds.join(", ")}
                </p>
              </div>
              <div className="">
                <span className="font-semibold">Status : </span>
                <Badge
                  variant={bookingInfo.valid ? "secondary" : "destructive"}
                >
                  {bookingInfo.valid ? "Valid" : "Invalid"}
                </Badge>
              </div>
            </div>
          )}
        </div>
        <DialogFooter>{props.children}</DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default TicketInfoModal;

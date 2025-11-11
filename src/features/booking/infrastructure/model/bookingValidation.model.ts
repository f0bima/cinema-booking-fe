export type TBookingValidationModel = {
  booking: {
    bookingCode: string;
    bookingType: "online" | "offline";
    customerName: string;
    seatIds: number[];
    studioId: number;
  };
  valid: boolean;
};

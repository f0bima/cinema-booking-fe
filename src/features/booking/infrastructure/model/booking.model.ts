export type TTicketModel = {
  id: number;
  booking_code: string;
  user_id: number;
  user_name: string;
  user_email: string;
  studio_id: number;
  seat_ids: number[];
  qr_code: string;
  booking_type: "online" | "offline";
  status: "active" | "used";
  created_at: Date;
  updated_at: Date;
};
export type TBookingModel = {
  booking: TTicketModel;
  qrCode: string;
};

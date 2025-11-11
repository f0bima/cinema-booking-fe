import type { TBooking } from "../../domain/entity/booking.entity";
import type { TBookingModel } from "../model/booking.model";

const toBookingEntity = (model: TBookingModel): TBooking => {
  const booking = model.booking;
  return {
    id: booking.id,
    user: {
      email: booking.user_email,
      id: booking.user_id,
      name: booking.user_name,
    },
    bookingCode: booking.booking_code,
    bookingType: booking.booking_type,
    qrCode: booking.qr_code,
    seatIds: booking.seat_ids,
    studioId: booking.studio_id,
    status: booking.status,
    createdAt: booking.created_at,
    updatedAt: booking.updated_at,
  };
};

export const bookingMapper = {
  toEntity: toBookingEntity,
};
